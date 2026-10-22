/**
 * Registry of the real Cafe In photographs (public/images).
 * Source files: /photos (Google listing screenshots, ~500px wide).
 * They were cropped only to remove browser UI artifacts and re-encoded as WebP.
 */
export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  /** CSS object-position used when the image is cropped by its frame */
  focus?: string
}

export const images = {
  logo: {
    src: '/images/cafe-in-logo.webp',
    alt: 'Cafe In logo — Coffee • Vibes • Memories. Brew it. Love it. Live it!',
    width: 496,
    height: 336,
  },
  /** The original logo centred on its own beige ground (lighting evened out) for round medallions */
  logoMedallion: {
    src: '/images/cafe-in-logo-medallion.webp',
    alt: 'Cafe In logo — Coffee • Vibes • Memories. Brew it. Love it. Live it!',
    width: 640,
    height: 640,
  },
  lantern: {
    src: '/images/interior-lantern-pendant.webp',
    alt: 'A geometric brass pendant lantern glowing warmly in front of the botanical mural at Cafe In',
    width: 453,
    height: 707,
    focus: '35% 50%',
  },
  diningRoom: {
    src: '/images/interior-dining-room.webp',
    alt: 'The Cafe In dining room: emerald velvet chairs, warm wooden tables, pendant lanterns and a pastel botanical mural',
    width: 494,
    height: 350,
    focus: '50% 55%',
  },
  muralWall: {
    src: '/images/interior-botanical-mural.webp',
    alt: 'A corner of Cafe In with a large tropical-leaf mural, emerald panelling and lanterns over wooden tables',
    width: 500,
    height: 348,
    focus: '40% 50%',
  },
  buddha: {
    src: '/images/decor-golden-buddha.webp',
    alt: 'A golden seated Buddha statue beside pink lilies on a wooden ledge at Cafe In',
    width: 458,
    height: 635,
    focus: '60% 50%',
  },
  alfredoPenne: {
    src: '/images/meal-alfredo-penne.webp',
    alt: 'Penne in a creamy white sauce with olives and peppers, served with a cup of black coffee on a wooden table',
    width: 498,
    height: 346,
    focus: '45% 55%',
  },
  biscoffCheesecake: {
    src: '/images/dessert-biscoff-cheesecake.webp',
    alt: 'A slice of cheesecake dripping with caramel Biscoff sauce on a pale blue plate',
    width: 458,
    height: 639,
    focus: '50% 75%',
  },
} satisfies Record<string, ImageAsset>
