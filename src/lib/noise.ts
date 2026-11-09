const SIZE = 128
let texture: HTMLCanvasElement | null = null

/** Textura de chiado compartilhada (gerada uma única vez). */
export function getNoiseTexture(): HTMLCanvasElement {
  if (texture) return texture
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const data = ctx.createImageData(SIZE, SIZE)
    for (let i = 0; i < data.data.length; i += 4) {
      const v = Math.random() * 255
      data.data[i] = data.data[i + 1] = data.data[i + 2] = v
      data.data[i + 3] = 255
    }
    ctx.putImageData(data, 0, 0)
  }
  texture = canvas
  return canvas
}

/** Expõe a textura como variável CSS --noise para os efeitos de hover. */
export function installNoiseVariable(root: HTMLElement = document.documentElement): void {
  root.style.setProperty('--noise', `url(${getNoiseTexture().toDataURL()})`)
}
