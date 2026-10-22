import { motion, useReducedMotion } from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'
import { business } from '../data/business'
import { images } from '../data/images'
import { SectionHeading } from '../components/SectionHeading'
import { EASE_OUT } from '../lib/motion'
import { scrollToId } from '../lib/scroll'

function Detail({ label, children, pending }: { label: string; children: ReactNode; pending?: boolean }) {
  return (
    <div className="border-t border-ivory/15 py-6">
      <dt className="label text-bronze-light">{label}</dt>
      <dd className={`mt-3 leading-relaxed ${pending ? 'text-ivory/70 italic' : 'text-ivory'}`}>{children}</dd>
    </div>
  )
}

const PENDING = 'Awaiting verified details from Cafe In'

export function VisitUsSection() {
  const { address, directionsUrl, mapEmbedUrl, phone, email, hours, socials } = business
  const reduceMotion = useReducedMotion()

  const toMenu = (e: MouseEvent) => {
    e.preventDefault()
    scrollToId('menu')
  }

  return (
    <section id="visit" aria-labelledby="visit-title" className="relative overflow-hidden bg-espresso-2 py-24 sm:py-32 lg:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="visit-title" eyebrow="Visit Us" title="Pull up" italic="a chair." />
          <motion.dl
            className="mt-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <Detail label="Address" pending={!address}>
              {address ?? PENDING}
            </Detail>
            <Detail label="Opening hours" pending={!hours}>
              {hours ? (
                <ul className="space-y-1">
                  {hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-6">
                      <span>{h.days}</span>
                      <span className="text-ivory/70">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                PENDING
              )}
            </Detail>
            <Detail label="Contact" pending={!phone && !email}>
              {phone || email ? (
                <span className="flex flex-col gap-1">
                  {phone && (
                    <a className="link-underline w-fit" href={`tel:${phone.replace(/\s/g, '')}`}>
                      {phone}
                    </a>
                  )}
                  {email && (
                    <a className="link-underline w-fit" href={`mailto:${email}`}>
                      {email}
                    </a>
                  )}
                </span>
              ) : (
                PENDING
              )}
            </Detail>
            {socials.length > 0 && (
              <Detail label="Follow">
                <span className="flex flex-wrap gap-5">
                  {socials.map((s) => (
                    <a key={s.href} className="link-underline" href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ))}
                </span>
              </Detail>
            )}
          </motion.dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {directionsUrl && (
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                Get directions <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href="#menu" onClick={toMenu} className={directionsUrl ? 'btn btn-ghost' : 'btn btn-primary'}>
              Explore the menu
            </a>
          </div>
        </div>

        <motion.div
          className="relative min-h-[380px] overflow-hidden lg:col-span-6 lg:col-start-7 lg:min-h-[560px]"
          initial={reduceMotion ? false : { opacity: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {mapEmbedUrl ? (
            <iframe
              title="Map showing Cafe In"
              src={mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.4] sepia-[0.2]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <>
              <img
                src={images.diningRoom.src}
                alt=""
                loading="lazy"
                className="frame-img absolute inset-0 scale-105 opacity-40 blur-[2px]"
                style={{ objectPosition: images.diningRoom.focus }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-2 via-espresso-2/70 to-espresso-2/30" />
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ivory opacity-[0.12]">
                <defs>
                  <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-bronze/60" />
                  <span className="h-3 w-3 rounded-full bg-bronze" />
                </span>
                <p className="display mt-6 text-3xl text-ivory italic">Map coming soon</p>
                <p className="mt-3 max-w-xs text-sm text-ivory-2">
                  An interactive map and directions link appear here once Cafe In confirms its official address.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
