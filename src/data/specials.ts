/**
 * Signature Specials — a curated selection from the real menu.
 * Edit `ids` to change what is featured; content is pulled from menu.ts.
 * Items with a real photograph get a photographic panel; others get a
 * typographic panel (no stock imagery is ever substituted).
 */
import { menuItems, type MenuItem } from './menu'

export const specials = {
  eyebrow: 'Signature Specials',
  title: 'Worth the detour',
  note: 'Demo selection drawn from the Cafe In menu — the café can swap these at any time.',
  ids: ['biscoff-cheesecake', 'alfredo-penne', 'biscoff-latte', 'vietnamese-iced-coffee'],
}

export const featuredItems: MenuItem[] = specials.ids
  .map((id) => menuItems.find((m) => m.id === id))
  .filter((m): m is MenuItem => Boolean(m))
