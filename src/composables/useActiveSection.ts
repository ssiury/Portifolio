import { onBeforeUnmount, onMounted } from 'vue'
import { CHANNELS } from '@/data/channels'
import { useBroadcast } from '@/stores/broadcast'

/** Atualiza o canal "no ar" de acordo com a seção visível. */
export function useActiveSection(threshold = 0.45) {
  const { setSection } = useBroadcast()
  let frame = 0

  const measure = () => {
    frame = 0
    const limit = window.innerHeight * threshold
    let current = 1
    for (const c of CHANNELS) {
      const el = document.getElementById(c.id)
      if (el && el.getBoundingClientRect().top < limit) current = c.number
    }
    setSection(current)
  }

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(measure)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    measure()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(frame)
  })
}
