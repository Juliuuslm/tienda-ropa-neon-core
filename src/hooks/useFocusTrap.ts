import { useEffect, useRef } from 'react'

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus the first element when trap is activated
    if (firstElement) {
      firstElement.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const closeButton = containerRef.current?.querySelector(
          'button[aria-label="Cerrar modal"]'
        ) as HTMLButtonElement
        closeButton?.click()
      }
    }

    containerRef.current.addEventListener('keydown', handleKeyDown)
    containerRef.current.addEventListener('keydown', handleEscape)

    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown)
      containerRef.current?.removeEventListener('keydown', handleEscape)
    }
  }, [isActive])

  return containerRef
}
