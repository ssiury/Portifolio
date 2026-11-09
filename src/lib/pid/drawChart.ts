import { clamp } from '@/lib/math'
import type { SimulationResult } from './simulate'

export interface ChartFrame {
  run: { result: SimulationResult; progress: number; done: boolean } | null
  noise: HTMLCanvasElement
  reducedMotion: boolean
}

const PHOS = '#7dffa1'
const TARGET = '#f0cc00'

/** Desenha o gráfico ângulo × tempo, a antena e o chiado proporcional ao erro. */
export function drawChart(canvas: HTMLCanvasElement, { run, noise, reducedMotion }: ChartFrame) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const pw = Math.round(rect.width * dpr)
  const ph = Math.round(rect.height * dpr)
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw
    canvas.height = ph
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const w = rect.width
  const h = rect.height

  ctx.fillStyle = '#0b0e0d'
  ctx.fillRect(0, 0, w, h)

  const pl = 44
  const pr = 16
  const pt = 40
  const pb = 34
  const X = (s: number) => pl + (s / 10) * (w - pl - pr)
  const Y = (v: number) => pt + (1 - v / 1.6) * (h - pt - pb)

  // grade
  ctx.strokeStyle = '#1d2622'
  ctx.lineWidth = 1
  ctx.font = '12px VT323, monospace'
  ctx.fillStyle = '#8fa396'
  for (let s = 0; s <= 10; s += 2) {
    ctx.beginPath()
    ctx.moveTo(X(s), pt)
    ctx.lineTo(X(s), h - pb)
    ctx.stroke()
    ctx.fillText(`${s}s`, X(s) - 6, h - pb + 16)
  }
  for (const v of [0, 0.5, 1, 1.5]) {
    ctx.beginPath()
    ctx.moveTo(pl, Y(v))
    ctx.lineTo(w - pr, Y(v))
    ctx.stroke()
    ctx.fillText(`${Math.round(v * 60)}°`, 6, Y(v) + 4)
  }

  // faixa de acomodação e alvo
  ctx.fillStyle = 'rgba(125,255,161,.08)'
  ctx.fillRect(pl, Y(1.02), w - pl - pr, Y(0.98) - Y(1.02))
  ctx.strokeStyle = TARGET
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(pl, Y(1))
  ctx.lineTo(w - pr, Y(1))
  ctx.stroke()
  ctx.setLineDash([])
  ctx.fillStyle = TARGET
  ctx.fillText('torre · 60°', w - pr - 70, Y(1) - 6)

  // resposta
  let error = 1
  let current = 0
  if (run) {
    const { samples, dt } = run.result
    const count = Math.max(1, Math.floor(samples.length * run.progress))
    ctx.strokeStyle = PHOS
    ctx.lineWidth = 2.2
    ctx.shadowColor = PHOS
    ctx.shadowBlur = 8
    ctx.beginPath()
    for (let k = 0; k < count; k += 4) {
      const v = clamp(samples[k], -0.1, 1.6)
      if (k) ctx.lineTo(X(k * dt), Y(v))
      else ctx.moveTo(X(0), Y(v))
    }
    ctx.stroke()
    ctx.shadowBlur = 0
    current = samples[count - 1]
    error = Math.abs(1 - current)
    ctx.fillStyle = PHOS
    ctx.beginPath()
    ctx.arc(X((count - 1) * dt), Y(clamp(current, -0.1, 1.6)), 4, 0, Math.PI * 2)
    ctx.fill()
  }

  // antena
  const cx = w - 70
  const cy = pt + 44
  const R = 30
  ctx.strokeStyle = '#2c3430'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI)
  ctx.stroke()
  const aTarget = Math.PI + (60 / 180) * Math.PI
  const aCurrent = Math.PI + ((clamp(current, -0.2, 1.8) * 60) / 180) * Math.PI
  ctx.strokeStyle = TARGET
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(aTarget) * R, cy + Math.sin(aTarget) * R)
  ctx.stroke()
  ctx.strokeStyle = '#e6f0e8'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(aCurrent) * (R - 4), cy + Math.sin(aCurrent) * (R - 4))
  ctx.stroke()
  ctx.fillStyle = '#8fa396'
  ctx.fillText('antena', cx - 16, cy + 16)

  // chiado proporcional ao erro
  const alpha = run ? clamp(error * 1.4, 0, 0.85) : 0.55
  if (alpha > 0.01 && !reducedMotion) {
    const pattern = ctx.createPattern(noise, 'repeat')
    if (pattern) {
      ctx.globalAlpha = alpha
      ctx.save()
      ctx.translate(Math.random() * 128, Math.random() * 128)
      ctx.fillStyle = pattern
      ctx.fillRect(-128, -128, w + 256, h + 256)
      ctx.restore()
      ctx.globalAlpha = 1
    }
  }

  // status
  ctx.font = '20px VT323, monospace'
  ctx.fillStyle = PHOS
  const status = run
    ? run.done
      ? run.result.passed
        ? 'SINAL TRAVADO'
        : 'SEM SINAL'
      : 'SINTONIZANDO…'
    : 'AJUSTE Kp · Ki · Kd E TRANSMITA'
  ctx.fillText(status, 14, 24)
}
