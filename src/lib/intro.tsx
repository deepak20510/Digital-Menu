import { createContext, useContext } from 'react'

/** `ready` flips true when the intro starts handing over to the hero. */
export const IntroContext = createContext({ ready: true })
export const useIntro = () => useContext(IntroContext)

export const INTRO_SEEN_KEY = 'cafein:intro-seen'

/** Decide once, before first paint, whether the intro should play. */
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  // Deep links (e.g. /#menu) go straight to content
  if (window.location.hash && window.location.hash !== '#top') return false
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) !== '1'
  } catch {
    return true
  }
}
