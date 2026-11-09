/** Preferência do sistema por menos movimento (avaliada uma vez no carregamento). */
export const prefersReducedMotion: boolean =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const scrollBehavior = (): ScrollBehavior => (prefersReducedMotion ? 'auto' : 'smooth')
