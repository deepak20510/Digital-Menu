import { motion } from 'motion/react'
import { reviewPlaceholders, reviews } from '../data/reviews'
import { SectionHeading } from '../components/SectionHeading'
import { EASE_OUT } from '../lib/motion'

function PlaceholderTag() {
  return (
    <span className="label inline-flex items-center gap-2 rounded-full border border-dashed border-ivory/45 px-3 py-1.5 text-ivory-2">
      Placeholder
    </span>
  )
}

/**
 * Renders genuine reviews from data/reviews.ts. With none supplied, it shows
 * clearly-labelled placeholder slots — never invented names, quotes or ratings.
 */
export function ReviewsSection() {
  const featured = reviews.find((r) => r.featured) ?? reviews[0]
  const supporting = reviews.filter((r) => r !== featured).slice(0, 3)
  const hasReviews = Boolean(featured)

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-mocha py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(231,222,208,0.12), transparent 65%)' }}
      />
      <div className="container-x relative">
        <SectionHeading id="reviews-title" eyebrow="Guest Notes" title="Kind words," italic="kept close." />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <motion.figure
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <span aria-hidden="true" className="display block text-[8rem] leading-[0.6] text-ivory-2/60">
              “
            </span>
            {hasReviews ? (
              <>
                <blockquote className="display mt-6 text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.1] text-ivory">{featured!.quote}</blockquote>
                <figcaption className="label mt-8 text-ivory/60">
                  {featured!.author}
                  {featured!.source && <span className="text-ivory/65"> · {featured!.source}</span>}
                </figcaption>
              </>
            ) : (
              <>
                <p className="display mt-6 text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.1] text-ivory/75 italic">{reviewPlaceholders.featured}</p>
                <figcaption className="mt-8">
                  <PlaceholderTag />
                </figcaption>
              </>
            )}
          </motion.figure>

          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:pt-24">
            {(hasReviews ? supporting.map((r) => r.quote) : reviewPlaceholders.supporting).map((text, i) => (
              <motion.figure
                key={i}
                className={`p-7 ${hasReviews ? 'border border-ivory/10 bg-espresso/30' : 'border border-dashed border-ivory/20'}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
              >
                {hasReviews ? (
                  <>
                    <blockquote className="leading-relaxed text-ivory/80">{text}</blockquote>
                    <figcaption className="label mt-5 text-ivory/70">{supporting[i].author}</figcaption>
                  </>
                ) : (
                  <>
                    <p className="text-sm leading-relaxed text-ivory/70 italic">{text}</p>
                    <figcaption className="mt-5">
                      <PlaceholderTag />
                    </figcaption>
                  </>
                )}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
