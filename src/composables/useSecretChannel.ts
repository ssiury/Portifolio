import { onBeforeUnmount, onMounted } from 'vue'
import { SECRET_CHANNEL } from '@/data/channels'
import { useBroadcast } from '@/stores/broadcast'

const WINDOW_MS = 1500

/** Digitar o número do canal escondido (ex.: 1 e 3) abre o minijogo. */
export function useSecretChannel() {
  const { selectChannel, openGame } = useBroadcast()
  const code = String(SECRET_CHANNEL)
  let digits = ''
  let lastAt = 0

  const onKey = (e: KeyboardEvent) => {
    if (!/^[0-9]$/.test(e.key)) return
    const target = e.target as HTMLElement | null
    if (target?.closest('input, textarea, [contenteditable]')) return
    const now = Date.now()
    digits = (now - lastAt < WINDOW_MS ? digits : '') + e.key
    lastAt = now
    if (digits.endsWith(code)) {
      digits = ''
      selectChannel(SECRET_CHANNEL, { byUser: true })
      openGame()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKey))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
}
