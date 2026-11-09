import type { Directive } from 'vue'
import { playTuneEffect } from '@/lib/tune'
import { prefersReducedMotion } from '@/lib/motion'

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.unobserve(entry.target)
        playTuneEffect(entry.target as HTMLElement)
      }
    },
    { threshold: 0.6 },
  )
  return observer
}

/** v-tune: o título "entra em sintonia" na primeira vez que aparece na tela. */
export const vTune: Directive<HTMLElement> = {
  mounted(el) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
