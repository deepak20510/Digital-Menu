import { images, type ImageAsset } from './images'

export interface GalleryItem {
  image: ImageAsset
  caption: string
  /** Layout slot in the asymmetric grid */
  span: 'tall' | 'wide' | 'square'
}

export const gallery: GalleryItem[] = [
  { image: images.diningRoom, caption: 'The dining room', span: 'wide' },
  { image: images.lantern, caption: 'Lantern light', span: 'tall' },
  { image: images.biscoffCheesecake, caption: 'Biscoff cheesecake', span: 'tall' },
  { image: images.muralWall, caption: 'The botanical wall', span: 'wide' },
  { image: images.buddha, caption: 'Quiet corners', span: 'tall' },
  { image: images.alfredoPenne, caption: 'Penne & a black coffee', span: 'wide' },
]
