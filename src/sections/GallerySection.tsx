import { useState } from 'react'
import { gallery } from '../data/gallery'
import { Lightbox } from '../components/Lightbox'
import { RevealImage } from '../components/RevealImage'
import { SectionHeading } from '../components/SectionHeading'

/** Asymmetric desktop placement per position; mobile stacks with alternating offsets */
const desktopSlots = [
  'lg:col-span-7',
  'lg:col-span-4 lg:col-start-9 lg:mt-28',
  'lg:col-span-4 lg:col-start-2 lg:-mt-20',
  'lg:col-span-6 lg:col-start-7 lg:mt-10',
  'lg:col-span-4 lg:-mt-10',
  'lg:col-span-7 lg:col-start-6 lg:mt-32',
]
const ratio = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' }

export function GallerySection() {
  const [index, setIndex] = useState<number | null>(null)
  let tallCount = 0

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-espresso py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="gallery-title" eyebrow="Gallery" title="Moments" italic="in amber." />
          <p className="max-w-sm text-sm leading-relaxed text-ivory/60">
            Real photographs from Cafe In. Select any frame to view it larger — use the arrow keys or swipe to move through.
          </p>
        </div>

        <ul className="mt-16 flex flex-col gap-8 sm:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {gallery.map((g, i) => {
            const mobile = g.span === 'tall' ? `w-[78%] ${tallCount++ % 2 ? 'self-start' : 'self-end'}` : 'w-full'
            return (
              <li key={g.image.src} className={`${mobile} lg:w-auto lg:self-auto ${desktopSlots[i] ?? 'lg:col-span-6'}`}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group block w-full text-left"
                  aria-label={`Open image: ${g.caption}`}
                >
                  <span className="relative block overflow-hidden">
                    <RevealImage
                      image={g.image}
                      from={i % 2 ? 'right' : 'bottom'}
                      className={ratio[g.span]}
                      imgClassName="transition-[transform,filter] duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] group-hover:brightness-110"
                    />
                    <span
                      aria-hidden="true"
                      className="glass label absolute right-4 bottom-4 rounded-full px-3.5 py-2 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      View
                    </span>
                  </span>
                  <span className="mt-3 flex items-center justify-between">
                    <span className="label text-ivory/75">{g.caption}</span>
                    <span className="label text-ivory/55">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <Lightbox items={gallery} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  )
}
