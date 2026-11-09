import { ref } from 'vue'

/**
 * Copia texto para a área de transferência. Se a API não estiver disponível,
 * seleciona o conteúdo do elemento para o usuário copiar manualmente.
 */
export function useCopyToClipboard(resetMs = 2200) {
  const status = ref<'idle' | 'copied' | 'selected'>('idle')
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy(text: string, fallbackEl?: HTMLElement | null) {
    try {
      await navigator.clipboard.writeText(text)
      status.value = 'copied'
    } catch {
      if (fallbackEl) {
        const range = document.createRange()
        range.selectNodeContents(fallbackEl)
        const selection = getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      status.value = 'selected'
    }
    clearTimeout(timer)
    timer = setTimeout(() => (status.value = 'idle'), resetMs)
  }

  return { status, copy }
}
