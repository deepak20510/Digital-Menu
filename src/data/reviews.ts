/**
 * Customer reviews.
 *
 * No genuine reviews were supplied, so `reviews` is empty and the section
 * renders clearly-labelled placeholders. To go live, add real reviews with
 * permission, e.g.:
 *   { quote: '…', author: 'Name', source: 'Google', featured: true }
 */
export interface Review {
  quote: string
  author: string
  source?: string
  featured?: boolean
}

export const reviews: Review[] = []

export const reviewPlaceholders = {
  featured: 'A featured guest review will appear here once Cafe In shares a genuine quote.',
  supporting: [
    'Supporting review slot — awaiting a genuine customer review.',
    'Supporting review slot — awaiting a genuine customer review.',
  ],
}
