import { motion, useReducedMotion } from 'motion/react'
import { RevealText } from './RevealText'
import { fadeUp } from '../lib/motion'

interface Props {
  eyebrow: string
  title: string
  italic?: string
  tone?: 'light' | 'dark'
  className?: string
  id?: string
}

export function SectionHeading({ eyebrow, title, italic, tone = 'light', className = '', id }: Props) {
  const reduceMotion = useReducedMotion()
  const accent = tone === 'light' ? 'text-bronze' : 'text-bronze-deep'
  const italicAccent = tone === 'light' ? 'text-ivory-2' : 'text-bronze-deep'
  return (
    <div className={className}>
      <motion.p
        className={`label mb-5 flex items-center gap-3 ${accent}`}
        variants={fadeUp}
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'show'}
        viewport={{ once: true }}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {eyebrow}
      </motion.p>
      <h2 id={id} className="display text-[clamp(2.5rem,7vw,5.6rem)]">
        <RevealText text={title} />
        {italic && (
          <>
            <br />
            <RevealText
              text={italic}
              delay={0.15}
              wordClassName={`italic ${italicAccent}`}
            />
          </>
        )}
      </h2>
    </div>
  )
}
