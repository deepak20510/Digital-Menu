import { motion, useReducedMotion } from 'motion/react'
import type { ElementType } from 'react'
import { EASE_OUT } from '../lib/motion'

interface Props {
  text: string
  as?: ElementType
  className?: string
  /** Extra classes for each word */
  wordClassName?: string
  delay?: number
  stagger?: number
  /** When provided, the animation follows this flag instead of scroll position */
  play?: boolean
}

/**
 * Masked word-by-word rise. Inspired by React Bits' text animations, written
 * natively on Motion so no second animation library is needed.
 */
export function RevealText({ text, as: Tag = 'span', className = '', wordClassName = '', delay = 0, stagger = 0.07, play }: Props) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')
  if (reduceMotion) {
    return (
      <Tag className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline">
          {words.map((word, i) => (
            <span key={i} className={`inline-block ${wordClassName}`}>
              {word}{i < words.length - 1 ? '\u00a0' : ''}
            </span>
          ))}
        </span>
      </Tag>
    )
  }
  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { animate: play ? 'show' : 'hidden' }
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {words.map((w, i) => (
          <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{
                hidden: { y: '110%', opacity: 0 },
                show: { y: '0%', opacity: 1, transition: { duration: 1.05, ease: EASE_OUT } },
              }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
