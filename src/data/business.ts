/**
 * Configurable business information.
 *
 * Anything set to `null` has NOT been supplied/verified yet. The UI hides it or
 * shows a clearly-labelled placeholder. Never fill these with guesses.
 */
export interface OpeningHours {
  days: string
  hours: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface BusinessInfo {
  name: string
  tagline: string
  motto: string
  hero: { eyebrow: string; headline: [string, string]; copy: string }
  address: string | null
  /** e.g. "https://maps.google.com/?q=..." — official link from the café */
  directionsUrl: string | null
  /** Google Maps embed src (https://www.google.com/maps/embed?pb=...) */
  mapEmbedUrl: string | null
  phone: string | null
  email: string | null
  hours: OpeningHours[] | null
  socials: SocialLink[]
}

export const business: BusinessInfo = {
  name: 'Cafe In',
  // From the supplied logo
  tagline: 'Coffee • Vibes • Memories',
  motto: 'Brew it. Love it. Live it!',
  hero: {
    eyebrow: 'Coffee • Vibes • Memories',
    // Provisional hero copy — edit freely
    headline: ['Your moment.', 'Your coffee.'],
    copy: 'Lantern light, emerald velvet and a menu poured with care — from the first espresso to the last slice of cheesecake.',
  },
  address: null,
  directionsUrl: null,
  mapEmbedUrl: null,
  phone: null,
  email: null,
  hours: null,
  socials: [],
}
