export interface MaskLine {
  text: string
  /** Escala relativa entre as linhas. */
  scale: number
  /** Usa a fonte de OSD (VT323) em vez da display. */
  osd?: boolean
}

const fontOf = (line: MaskLine, size: number) =>
  line.osd
    ? `${size}px VT323, "Courier New", monospace`
    : `900 ${size}px "Big Shoulders Display", Impact, sans-serif`

/**
 * Rasteriza linhas de texto centralizadas em uma máscara binária (1 = texto)
 * do tamanho da tela do televisor.
 */
export function createTextMask(lines: MaskLine[], width: number, height: number): Uint8Array {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const mask = new Uint8Array(width * height)
  if (!ctx) return mask

  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  const base = 100
  const widths = lines.map((l) => {
    ctx.font = fontOf(l, base * l.scale)
    return ctx.measureText(l.text).width
  })
  const totalH = lines.reduce((acc, l) => acc + l.scale * 0.86, 0)
  let size = Math.min(...widths.map((w) => ((width * 0.84) / w) * base))
  size = Math.min(size, (height * 0.74) / totalH)

  let y = (height - totalH * size) / 2
  for (const l of lines) {
    const h = l.scale * size * 0.86
    ctx.font = fontOf(l, l.scale * size)
    y += h
    ctx.fillText(l.text, width / 2, y - h * 0.06)
  }

  const data = ctx.getImageData(0, 0, width, height).data
  for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] > 110 ? 1 : 0
  return mask
}
