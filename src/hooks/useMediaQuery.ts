import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** True on small screens or modest hardware — used to drop parallax. */
export function useLowPower() {
  const small = useMediaQuery('(max-width: 767px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const weakCpu = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4
  return small || reduce || weakCpu
}
