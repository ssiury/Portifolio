import type { Channel } from '@/types/content'
import { padChannel } from '@/data/channels'
import { pointer } from '@/lib/pointer'
import { createTextMask } from './textMask'

const W = 200
const H = 150
/** Quanto tempo a prévia de um canal fica na tela antes de voltar ao nome. */
const PREVIEW_MS = 2600
/** Raio (em pixels da tela, ao quadrado) da área que treme sob o cursor. */
const SHAKE_RADIUS_SQ = 42 * 42
/** Amplitude máxima do tremor coerente do quadro. */
const SHAKE_PX = 2.5
/** Amplitude da vibração individual de cada pixel. */
const JITTER_PX = 3

interface SignalOptions {
  channels: readonly Channel[]
  secretChannel: number
  reducedMotion: boolean
  /** Chamado quando a prévia termina e a tela volta à imagem inicial. */
  onRevert?: () => void
}

/**
 * Renderiza a tela do televisor: texto do canal sobre chiado analógico,
 * com aberração cromática, faixa rolante, glitch periódico e interferência
 * perto do ponteiro.
 */
export class TvSignal {
  private readonly ctx: CanvasRenderingContext2D
  private readonly image: ImageData
  private masks = new Map<string, Uint8Array>()
  private maskKey = 'name'
  private gain = 1
  private gainTarget = 0.05
  private revertAt = 0

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly options: SignalOptions,
  ) {
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D indisponível')
    this.ctx = ctx
    this.image = ctx.createImageData(W, H)
    this.buildMasks()
  }

  /** Recria as máscaras (ex.: depois que as fontes web carregarem). */
  buildMasks(): void {
    const { channels, secretChannel } = this.options
    const masks = new Map<string, Uint8Array>()
    masks.set(
      'name',
      createTextMask(
        [
          { text: 'IURY', scale: 1 },
          { text: 'SOUSA', scale: 1 },
        ],
        W,
        H,
      ),
    )
    for (const c of channels) {
      if (c.number === 1) continue
      masks.set(
        `ch${c.number}`,
        createTextMask(
          [
            { text: `CH ${padChannel(c.number)}`, scale: 0.42, osd: true },
            { text: c.name.toUpperCase(), scale: 1 },
          ],
          W,
          H,
        ),
      )
    }
    masks.set('none', createTextMask([{ text: 'SEM SINAL', scale: 0.55, osd: true }], W, H))
    masks.set(
      'secret',
      createTextMask(
        [
          { text: `CANAL ${secretChannel}`, scale: 0.5, osd: true },
          { text: 'SINTONIA', scale: 0.8 },
          { text: 'aperte OK', scale: 0.32, osd: true },
        ],
        W,
        H,
      ),
    )
    this.masks = masks
  }

  /** Mostra a prévia de um canal. */
  show(channel: number): void {
    const { channels, secretChannel } = this.options
    this.gain = Math.max(this.gain, 0.95)
    this.revertAt = 0
    if (channel === 1) {
      this.maskKey = 'name'
      this.gainTarget = 0.05
    } else if (channels.some((c) => c.number === channel)) {
      this.maskKey = `ch${channel}`
      this.gainTarget = 0.05
      this.revertAt = performance.now() + PREVIEW_MS
    } else if (channel === secretChannel) {
      this.maskKey = 'secret'
      this.gainTarget = 0.22
    } else {
      this.maskKey = 'none'
      this.gainTarget = 0.7
    }
  }

  /** Rajada de chiado (apertar OK em canal sem sinal). */
  burst(): void {
    this.gain = 1
  }

  render(t: number): void {
    const mask = this.masks.get(this.maskKey)
    if (!mask) return
    const { reducedMotion } = this.options

    if (this.revertAt && t > this.revertAt) {
      this.revertAt = 0
      this.maskKey = 'name'
      this.gain = 0.9
      this.options.onRevert?.()
    }
    this.gain += (this.gainTarget - this.gain) * 0.07

    const r = this.canvas.getBoundingClientRect()
    const lx = ((pointer.x - r.left) / r.width) * W
    const ly = ((pointer.y - r.top) / r.height) * H
    const inside = !reducedMotion && lx > -30 && lx < W + 30 && ly > -30 && ly < H + 30
    const glitch = !reducedMotion && t % 7000 < 180
    const roll = ((t / 30) % (H + 40)) - 20
    const d = this.image.data
    const g = this.gain
    // tremor coerente do quadro: a região sob o cursor inteira chacoalha junto
    const shakeX = (Math.random() - 0.5) * 2 * SHAKE_PX
    const shakeY = (Math.random() - 0.5) * 2 * SHAKE_PX

    for (let y = 0; y < H; y++) {
      const off = glitch ? Math.round(Math.sin(y * 0.4 + t * 0.03) * 7) : 0
      const band = Math.abs(y - roll) < 7 ? 14 : 0
      const row = y * W

      for (let x = 0; x < W; x++) {
        const i = (row + x) * 4
        let near = 0
        if (inside) {
          const dx = x - lx
          const dy = y - ly
          const dd = dx * dx + dy * dy
          if (dd < SHAKE_RADIUS_SQ) near = 1 - dd / SHAKE_RADIUS_SQ
        }
        let sx = x + off
        let sy = y
        if (near) {
          // deslocamento do quadro + vibração individual de cada pixel
          sx += Math.round(near * (shakeX + (Math.random() - 0.5) * JITTER_PX))
          sy += Math.round(near * (shakeY + (Math.random() - 0.5) * JITTER_PX))
        }
        const srcRow = sy >= 0 && sy < H ? sy * W : -1
        const n = g + near * 0.12
        if (Math.random() < n * 0.82) {
          const v = Math.random() * (120 + 135 * n)
          d[i] = d[i + 1] = d[i + 2] = v
        } else {
          const R = srcRow >= 0 && sx - 1 >= 0 && sx - 1 < W ? mask[srcRow + sx - 1] : 0
          const G = srcRow >= 0 && sx >= 0 && sx < W ? mask[srcRow + sx] : 0
          const B = srcRow >= 0 && sx + 1 >= 0 && sx + 1 < W ? mask[srcRow + sx + 1] : 0
          d[i] = (R ? 236 : 13) + band
          d[i + 1] = (G ? 244 : 17) + band
          d[i + 2] = (B ? 236 : 15) + band
        }
        d[i + 3] = 255
      }
    }
    this.ctx.putImageData(this.image, 0, 0)
  }
}
