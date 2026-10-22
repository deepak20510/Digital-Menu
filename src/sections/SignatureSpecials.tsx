import { motion } from 'motion/react'
import { featuredItems, specials } from '../data/specials'
import { formatPrice, type MenuItem } from '../data/menu'
import { SectionHeading } from '../components/SectionHeading'
import { RevealImage } from '../components/RevealImage'
import { ConfirmFlag } from '../components/ConfirmFlag'
import { useCarousel } from '../hooks/useCarousel'
import { EASE_OUT } from '../lib/motion'

interface Props {
  onSelect: (item: MenuItem) => void
}

/** Text panels for specials without a real photograph — never stock imagery */
const panelTones = ['bg-mocha', 'bg-espresso-2']
const pad = (n: number) => String(n).padStart(2, '0')

function SpecialCard({ item, index, total, tone, onSelect }: { item: MenuItem; index: number; total: number; tone: string; onSelect: (item: MenuItem) => void }) {
  const label = `${item.name}, ${formatPrice(item.price)}${item.needsConfirmation ? ' (details to be confirmed)' : ''} — view details`
  return (
    <li
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${item.name}`}
      className="w-[min(80vw,340px)] shrink-0 snap-start sm:w-[min(46vw,360px)] lg:w-[clamp(300px,26vw,384px)]"
    >
      <motion.article
        className="group relative flex h-full flex-col rounded-sm ring-bronze ring-offset-4 ring-offset-espresso-2 has-[button:focus-visible]:ring-2"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: Math.min(index, 3) * 0.08 }}
      >
        <div className="relative overflow-hidden rounded-sm shadow-[0_26px_52px_-32px_rgba(0,0,0,0.72)] transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:shadow-[0_34px_64px_-32px_rgba(0,0,0,0.78)]">
          {item.image ? (
            <RevealImage
              image={item.image}
              className="aspect-[4/5]"
              imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
            />
          ) : (
            <div className={`relative flex aspect-[4/5] flex-col justify-end overflow-hidden p-7 text-ivory sm:p-8 ${tone}`}>
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 h-64 w-64 rounded-full border border-bronze/30 transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute -top-2 -right-2 h-40 w-40 rounded-full border border-bronze/20 transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-125"
              />
              <p className="label mb-3 text-bronze-light">From the menu</p>
              <p aria-hidden="true" className="display relative text-[clamp(2.4rem,4vw,3.4rem)] text-ivory italic">
                {item.section}
              </p>
            </div>
          )}
          <span className="glass label pointer-events-none absolute top-4 left-4 rounded-full px-3 py-1.5 text-ivory">{pad(index + 1)}</span>
        </div>

        <div className="flex flex-1 flex-col px-1 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="label text-bronze">{item.section}</p>
              <h3 className="display mt-2 text-[1.9rem] leading-[1.05] sm:text-[2.1rem]">
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  aria-label={label}
                  className="text-left text-ivory after:absolute after:inset-0 after:rounded-sm after:content-[''] focus-visible:outline-none"
                >
                  {item.name}
                </button>
              </h3>
            </div>
            <span className="display shrink-0 pt-5 text-[1.7rem] text-ivory-2">{formatPrice(item.price)}</span>
          </div>
          {/* Two-line slot keeps every card the same height */}
          <p className={`mt-3 line-clamp-2 min-h-[3.25em] text-sm leading-relaxed ${item.description ? 'text-ivory-2' : 'text-ivory/55 italic'}`}>
            {item.description ?? 'Description to be confirmed by Cafe In.'}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-ivory/15 pt-4">
            {item.needsConfirmation ? <ConfirmFlag note={item.needsConfirmation} tone="light" /> : <span />}
            <span className="label inline-flex items-center gap-2 text-ivory/70 transition-colors group-hover:text-ivory">
              View details
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </motion.article>
    </li>
  )
}

function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SignatureSpecials({ onSelect }: Props) {
  const total = featuredItems.length
  const { trackRef, state, step } = useCarousel(total)
  let typographic = 0
  const tones = featuredItems.map((item) => (item.image ? '' : panelTones[typographic++ % panelTones.length]))
  const range = state.first === state.last ? pad(state.first + 1) : `${pad(state.first + 1)}–${pad(state.last + 1)}`
  const canScroll = !(state.atStart && state.atEnd)

  return (
    <section id="specials" aria-labelledby="specials-title" className="relative overflow-hidden bg-espresso-2 py-24 text-ivory sm:py-32 lg:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="specials-title" eyebrow={specials.eyebrow} title={specials.title} italic="at Cafe In." />
          <p className="max-w-sm text-sm leading-relaxed text-ivory-2">{specials.note}</p>
        </div>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label="Signature specials" className="relative mt-12 sm:mt-16">
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label="Signature specials — use the left and right arrow keys to browse"
          data-lenis-prevent-horizontal
          className="carousel-track no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pt-2 pb-8 focus-visible:outline-offset-[-2px] sm:gap-6 lg:gap-8"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              step(1)
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault()
              step(-1)
            }
          }}
        >
          {featuredItems.map((item, i) => (
            <SpecialCard key={item.id} item={item} index={i} total={total} tone={tones[i]} onSelect={onSelect} />
          ))}
        </ul>

        <div className="container-x mt-4 flex items-center gap-5 sm:mt-6">
          <p className="label shrink-0 text-ivory-2 tabular-nums" aria-live="polite">
            <span className="sr-only">Showing </span>
            {range} <span className="text-ivory/45">/ {pad(total)}</span>
          </p>
          {/* Position track: thumb width = share of the row in view */}
          <div aria-hidden="true" className="relative h-px flex-1 bg-ivory/15">
            <span
              className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 rounded-full bg-bronze-deep transition-[transform] duration-300 ease-out"
              style={{
                width: `${state.visible * 100}%`,
                transform: `translate(${(state.progress * (1 - state.visible) * 100) / Math.max(state.visible, 0.0001)}%, -50%)`,
              }}
            />
          </div>
          <div className={`flex shrink-0 gap-3 ${canScroll ? '' : 'invisible'}`}>
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={state.atStart}
              aria-label="Previous specials"
              className="glass glass-control text-ivory"
            >
              <Arrow dir="prev" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={state.atEnd}
              aria-label="Next specials"
              className="glass glass-control text-ivory"
            >
              <Arrow dir="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
