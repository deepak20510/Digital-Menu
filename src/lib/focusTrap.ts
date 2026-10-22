import type { KeyboardEvent as ReactKeyboardEvent } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/** Keeps Tab / Shift+Tab inside `container`. Returns a keydown handler. */
export function trapTab(container: HTMLElement | null, e: KeyboardEvent | ReactKeyboardEvent) {
  if (e.key !== 'Tab' || !container) return
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (n) => !n.hasAttribute('hidden') && n.getAttribute('aria-hidden') !== 'true' && (n.offsetParent !== null || n === document.activeElement),
  )
  if (nodes.length === 0) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
    e.preventDefault()
    first.focus()
  }
}
