export const clamp = (v: number, min = 0, max = 1): number => Math.max(min, Math.min(max, v))

/** Módulo que sempre devolve valor positivo, para canais circulares (1..total). */
export const wrapIndex = (value: number, total: number): number =>
  ((((value - 1) % total) + total) % total) + 1
