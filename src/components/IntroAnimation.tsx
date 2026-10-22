import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { images } from '../data/images'
import { business } from '../data/business'
import { EASE_CINEMA, EASE_OUT } from '../lib/motion'
import { lockScroll, unlockScroll } from '../lib/scroll'
import { INTRO_SEEN_KEY } from '../lib/intro'

/** Total time on screen before the curtain lifts (ms) */
const HOLD_MS = 2900
const HOLD_REDUCED_MS = 1100
/** Never wait longer than this for the lantern photo */
const IMAGE_TIMEOUT_MS = 1200

interface Props {
  /** Fires when the curtain starts lifting — the hero begins its entrance */
  onReveal: () => void
  /** Fires once the overlay has fully left */
  onDone: () => void
}

const letters = ['C', 'A', 'F', 'E', '!', 'N']

/**
 * "The Cinematic Reveal" — near-black room, warm glow, a lantern photograph
 * unmasking from a slit of light, the CAFE!N wordmark rising letter by letter,
 * then the curtain lifts into the hero. ~3.6s; skippable; reduced-motion aware.
 */
export function IntroAnimation({ onReveal, onDone }: Props) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [imgState, setImgState] = useState<'loading' | 'ready' | 'skip'>('loading')
  const revealed = useRef(false)
  const skipRef = useRef<HTMLButtonElement>(null)

  const finish = useCallback(() => {
    if (revealed.current) return
    revealed.current = true
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1')
    } catch {
      /* storage unavailable — fine */
    }
    onReveal()
    setVisible(false)
  }, [onReveal])

  // Lock scroll while the overlay is up
  useEffect(() => {
    lockScroll()
    return unlockScroll
  }, [])

  // Lantern image: wait briefly, then continue without it
  useEffect(() => {
    const img = new Image()
    let settled = false
    const timer = window.setTimeout(() => {
      if (!settled) setImgState('skip')
      settled = true
    }, IMAGE_TIMEOUT_MS)
    img.onload = () => {
      if (!settled) setImgState('ready')
      settled = true
    }
    img.onerror = () => {
      if (!settled) setImgState('skip')
      settled = true
    }
    img.src = images.lantern.src
    return () => window.clearTimeout(timer)
  }, [])

  // Timeline starts as soon as the image question is settled
  useEffect(() => {
    if (imgState === 'loading') return
    const t = window.setTimeout(finish, reduce ? HOLD_REDUCED_MS : HOLD_MS)
    return () => window.clearTimeout(t)
  }, [imgState, reduce, finish])

  // Escape skips; focus the skip control for keyboard users
  useEffect(() => {
    skipRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  const go = imgState !== 'loading'
  const showImg = imgState === 'ready'

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-espresso"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: reduce ? 0.5 : 1.1, ease: EASE_CINEMA }}
          aria-label="Cafe In introduction"
          role="region"
        >
          {/* Warm atmospheric light */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 45%, rgba(117,81,61,0.30) 0%, rgba(48,35,30,0.4) 45%, rgba(48,35,30,0) 75%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: go ? 1 : 0 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
          />

          <div className="relative flex flex-col items-center">
            {/* Lantern unmasking from a slit of light */}
            {showImg && (
              <motion.div
                aria-hidden="true"
                className="relative h-[46vh] max-h-[440px] w-[min(62vw,280px)] overflow-hidden"
                initial={reduce ? { opacity: 0 } : { clipPath: 'inset(50% 49% 50% 49%)', opacity: 0.6 }}
                animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                transition={{ duration: 1.6, ease: EASE_CINEMA, delay: 0.25 }}
              >
                <motion.img
                  src={images.lantern.src}
                  alt=""
                  className="frame-img"
                  style={{ objectPosition: images.lantern.focus }}
                  initial={reduce ? false : { scale: 1.35, filter: 'brightness(0.4)' }}
                  animate={reduce ? undefined : { scale: 1.05, filter: 'brightness(1)' }}
                  transition={{ duration: 2.6, ease: EASE_OUT, delay: 0.25 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/30" />
              </motion.div>
            )}

            {/* Wordmark */}
            <p
              className={`flex items-baseline font-sans font-semibold tracking-[0.14em] text-ivory ${
                showImg ? '-mt-10 text-[clamp(3rem,14vw,7.5rem)]' : 'text-[clamp(3.4rem,16vw,9rem)]'
              }`}
              aria-label="Cafe In"
            >
              {letters.map((l, i) => (
                <span key={i} aria-hidden="true" className="inline-block overflow-hidden leading-[1.05]">
                  <motion.span
                    className={`inline-block ${l === '!' ? 'text-bronze-light' : ''}`}
                    initial={reduce ? { opacity: 0 } : { y: '105%' }}
                    animate={go ? (reduce ? { opacity: 1 } : { y: '0%' }) : undefined}
                    transition={{ duration: 1.1, ease: EASE_OUT, delay: (showImg ? 1.0 : 0.3) + i * 0.07 }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </p>

            <motion.p
              className="label mt-4 text-ivory-2"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={go ? { opacity: 1, letterSpacing: '0.32em' } : undefined}
              transition={{ duration: 1.4, ease: EASE_OUT, delay: showImg ? 1.55 : 0.8 }}
            >
              {business.tagline}
            </motion.p>
          </div>

          <button
            ref={skipRef}
            type="button"
            onClick={finish}
            className="label absolute right-5 bottom-6 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-ivory/25 px-5 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory sm:top-6 sm:bottom-auto"
          >
            Skip intro <span aria-hidden="true">→</span>
          </button>

          {/* Progress hairline */}
          {!reduce && go && (
            <motion.span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-mocha"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD_MS / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
