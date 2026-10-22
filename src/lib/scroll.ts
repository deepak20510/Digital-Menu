import Lenis from 'lenis'

let lenis: Lenis | null = null
let lockCount = 0

/** Starts Lenis smooth scrolling unless the user prefers reduced motion. */
export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  try {
    lenis = new Lenis({ autoRaf: true, lerp: 0.1, smoothWheel: true })
  } catch {
    lenis = null // native scrolling keeps working
  }
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string, { immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    // Sticky-nav clearance comes from the sections' CSS scroll-margin-top
    lenis.scrollTo(el, immediate ? { immediate: true, force: true } : { duration: 1.4 })
  } else {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce || immediate ? 'auto' : 'smooth', block: 'start' })
  }
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`)
}

/** Nested-safe page scroll lock for overlays (menu, modal, lightbox, intro). */
export function lockScroll() {
  lockCount++
  if (lockCount === 1) {
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    lenis?.start()
    document.documentElement.style.overflow = ''
  }
}
