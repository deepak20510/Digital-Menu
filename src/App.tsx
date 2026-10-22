import { MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ProductDetailModal } from './components/ProductDetailModal'
import { HeroSection } from './sections/HeroSection'
import { SignatureSpecials } from './sections/SignatureSpecials'
import { MenuSection } from './sections/MenuSection'
import { AboutSection } from './sections/AboutSection'
import { GallerySection } from './sections/GallerySection'
import { ReviewsSection } from './sections/ReviewsSection'
import { VisitUsSection } from './sections/VisitUsSection'
import { initSmoothScroll, scrollToId } from './lib/scroll'
import type { MenuItem } from './data/menu'

export default function App() {
  const [selected, setSelected] = useState<MenuItem | null>(null)

  useEffect(() => initSmoothScroll(), [])

  // Honour deep links such as /#menu once content has rendered
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    // Jump once web fonts have settled the layout, so the section lands exactly
    let cancelled = false
    const fonts = document.fonts?.ready ?? Promise.resolve()
    fonts.then(() => requestAnimationFrame(() => !cancelled && scrollToId(id, { immediate: true })))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
        <a
          href="#menu"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('menu')
          }}
          className="label fixed top-3 left-3 z-[90] -translate-y-24 rounded-full bg-bronze px-5 py-3 text-espresso focus:translate-y-0"
        >
          Skip to menu
        </a>

        <div className="grain">
          <Navbar />
          <main>
            <HeroSection />
            <SignatureSpecials onSelect={setSelected} />
            <MenuSection onSelect={setSelected} />
            <AboutSection />
            <GallerySection />
            <ReviewsSection />
            <VisitUsSection />
          </main>
          <Footer />
        </div>

        <ProductDetailModal item={selected} onClose={() => setSelected(null)} />
    </MotionConfig>
  )
}
