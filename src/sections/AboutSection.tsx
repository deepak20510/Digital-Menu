import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { images } from '../data/images'
import { business } from '../data/business'
import { RevealImage } from '../components/RevealImage'
import { SectionHeading } from '../components/SectionHeading'
import { useLowPower } from '../hooks/useMediaQuery'
import { EASE_OUT } from '../lib/motion'

/**
 * Copy here describes only what the supplied interior photographs show.
 * No founding story, dates, awards or claims — add those only once supplied.
 */
const notes = [
  {
    title: 'The botanical wall',
    body: 'A sweeping mural of tropical leaves in blush, sand and sage gives the room a soft, painterly backdrop.',
  },
  {
    title: 'Emerald & oak',
    body: 'Velvet emerald chairs, warm wooden tables and deep-green panelling keep the space calm and tailored.',
  },
  {
    title: 'Lantern light',
    body: 'Geometric brass lanterns hang low over the tables, casting the warm glow the café is built around.',
  },
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const lowPower = useLowPower()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yPortrait = useTransform(scrollYProgress, [0, 1], [lowPower ? 0 : 24, lowPower ? 0 : -24])

  return (
    <section id="story" ref={ref} aria-labelledby="story-title" className="relative overflow-hidden bg-espresso-2 py-24 text-ivory sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading id="story-title" eyebrow="Our Story" title="A room made" italic="for lingering." />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <figure>
              <RevealImage image={images.muralWall} from="left" className="aspect-[4/3] w-full" />
              <figcaption className="label mt-4 text-ivory/65">The botanical wall, Cafe In</figcaption>
            </figure>
            <ol className="mt-14 grid gap-10 border-t border-ivory/15 pt-10 sm:grid-cols-3 sm:gap-8 lg:mt-16">
              {notes.map((n, i) => (
                <motion.li
                  key={n.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.12 }}
                >
                  <span className="label text-bronze">0{i + 1}</span>
                  <h3 className="display mt-3 text-3xl lg:text-[1.7rem] xl:text-3xl">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-2">{n.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE_OUT }}
              className="space-y-5 text-base leading-relaxed text-ivory-2 sm:text-lg"
            >
              <p className="display text-3xl leading-tight text-ivory">
                Coffee, vibes and memories — the promise on the sign.
              </p>
              <p>
                Inside, Cafe In is warm wood and soft lantern light, emerald velvet and a wall of painted leaves. A place to settle in with an espresso,
                a pasta or a slice of cheesecake, and stay a while.
              </p>
            </motion.div>

            <motion.figure style={{ y: yPortrait }} className="w-[78%] self-end lg:w-full">
              <RevealImage image={images.buddha} className="aspect-[3/4] w-full" delay={0.1} />
              <figcaption className="label mt-4 text-ivory/65">A quiet corner</figcaption>
            </motion.figure>
          </div>
        </div>

        <motion.p
          className="display mt-20 text-center text-[clamp(2rem,5vw,3.6rem)] text-ivory italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {business.motto}
        </motion.p>
      </div>
    </section>
  )
}
