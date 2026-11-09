/** Posição do ponteiro na janela, compartilhada pelos efeitos de canvas. */
export const pointer = { x: -9999, y: -9999 }

let installed = false

export function installPointerTracking(): void {
  if (installed) return
  installed = true
  const reset = () => {
    pointer.x = pointer.y = -9999
  }
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    },
    { passive: true },
  )
  document.addEventListener('mouseleave', reset)
  window.addEventListener('touchend', () => setTimeout(reset, 300), { passive: true })
}
