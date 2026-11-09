import { reactive, readonly } from 'vue'
import { CHANNELS, SECRET_CHANNEL, TOTAL_CHANNELS, channelByNumber } from '@/data/channels'
import { wrapIndex } from '@/lib/math'
import { scrollBehavior } from '@/lib/motion'

/** Por quanto tempo a rolagem não mexe no seletor depois que o usuário o girou. */
const USER_DIAL_GRACE_MS = 2500

/**
 * Estado global da "transmissão": canal no seletor, seção visível e minijogo.
 * Pequeno o bastante para dispensar Pinia.
 */
const state = reactive({
  /** Canal selecionado no seletor do televisor. */
  channel: 1,
  /** Seção visível na rolagem. */
  section: 1,
  /** Incrementa quando o televisor deve exibir a prévia do canal atual. */
  previewTick: 0,
  gameOpen: false,
})

let lastUserDial = 0

function selectChannel(n: number, { preview = true, byUser = false } = {}): void {
  state.channel = wrapIndex(n, TOTAL_CHANNELS)
  if (byUser) lastUserDial = Date.now()
  if (preview) state.previewTick++
}

function setSection(n: number): void {
  if (state.section === n) return
  state.section = n
  if (Date.now() - lastUserDial > USER_DIAL_GRACE_MS && state.channel !== SECRET_CHANNEL) {
    selectChannel(n, { preview: false })
  }
}

function scrollToChannel(n: number): void {
  const channel = channelByNumber(n)
  if (!channel) return
  if (n === 1) {
    window.scrollTo({ top: 0, behavior: scrollBehavior() })
    return
  }
  document.getElementById(channel.id)?.scrollIntoView({ behavior: scrollBehavior() })
}

function openGame(): void {
  state.gameOpen = true
}

function closeGame(): void {
  state.gameOpen = false
}

export function useBroadcast() {
  return {
    state: readonly(state),
    channels: CHANNELS,
    selectChannel,
    setSection,
    scrollToChannel,
    openGame,
    closeGame,
  }
}
