import { clamp } from './math'

const BLOCK = 7
const DURATION = 750

/**
 * Cobre o elemento com chiado em blocos que somem aos poucos,
 * como um canal entrando em sintonia.
 */
export function playTuneEffect(el: HTMLElement): void {
  const rect = el.getBoundingClientRect()
  if (!rect.width) return

  const cols = Math.ceil(rect.width / BLOCK)
  const rows = Math.ceil(rect.height / BLOCK)
  const canvas = document.createElement('canvas')
  canvas.width = cols
  canvas.height = rows
  canvas.className = 'tune-c'
  canvas.setAttribute('aria-hidden', 'true')
  el.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas.remove()

  const n = cols * rows
  const order = [...Array(n).keys()]
  for (let i = n - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const alive = new Uint8Array(n).fill(1)
  const image = ctx.createImageData(cols, rows)
  const t0 = performance.now()

  const step = (t: number) => {
    const p = clamp((t - t0) / DURATION)
    const kill = Math.floor(n * p * p)
    for (let i = 0; i < kill; i++) alive[order[i]] = 0
    for (let i = 0; i < n; i++) {
      const v = Math.random() * 200 + 30
      image.data[i * 4] = image.data[i * 4 + 1] = image.data[i * 4 + 2] = v
      image.data[i * 4 + 3] = alive[i] ? 255 : 0
    }
    ctx.putImageData(image, 0, 0)
    if (p < 1) requestAnimationFrame(step)
    else canvas.remove()
  }
  step(t0)
}
