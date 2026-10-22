export const EASE_CINEMA = [0.76, 0, 0.24, 1] as const
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

export const stagger = (s = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: delay } },
})
