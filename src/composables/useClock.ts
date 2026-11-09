import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Hora atual (HH:MM) em um fuso, atualizada periodicamente. */
export function useClock(timeZone: string, intervalMs = 20_000) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  })
  const time = ref('--:--')
  let timer: ReturnType<typeof setInterval> | undefined

  const update = () => {
    time.value = formatter.format(new Date())
  }

  onMounted(() => {
    update()
    timer = setInterval(update, intervalMs)
  })
  onBeforeUnmount(() => clearInterval(timer))

  return time
}
