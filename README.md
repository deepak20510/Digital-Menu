# Cafe In — cinematic website demo

Showcase site for Cafe In (*Coffee • Vibes • Memories*). React 19 + Vite + TypeScript + Tailwind CSS v4, animated with Motion and Lenis smooth scrolling. No ordering, cart or backend: it's a showcase only.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint
```

The intro plays once per browser session. To see it again, open a new tab or clear `sessionStorage`. Links straight to a section (e.g. `/#menu`) skip the intro.

## Where to edit content

| What | File |
| --- | --- |
| Hero copy, address, phone, hours, socials, map | `src/data/business.ts` |
| Menu items, prices, categories | `src/data/menu.ts` |
| Signature Specials selection | `src/data/specials.ts` (list of menu ids) |
| Reviews | `src/data/reviews.ts` |
| Gallery order and captions | `src/data/gallery.ts` |
| Photo registry (alt text, crop focus) | `src/data/images.ts` |

Fields left as `null` are hidden in the UI or shown as clearly labelled placeholders. Menu entries marked `needsConfirmation` show a † / "To confirm" flag.

## Assets

- `photos/`: the nine original screenshots as supplied (unchanged).
- `public/images/`: seven photos, cropped only to remove browser UI and white edges, then saved as WebP.
- `docs/menu-reference/`: the two menu boards that `menu.ts` was transcribed from.

## Still needed from Cafe In

1. Official address, Google Maps link and embed, phone, email, opening hours, social links.
2. Genuine customer reviews (with permission).
3. Higher-resolution originals of the photos. The supplied ones are ~500px screenshots and look soft on large or retina screens.
4. Photos of more dishes. Only Alfredo Penne and Biscoff Cheesecake have real photos.
5. Confirmation that the penne photo is the Alfredo Penne and the cheesecake photo is the Biscoff Cheesecake (matched by appearance).
6. Dessert descriptions (cut off in the menu screenshot) and the full "Beyond Coffee" section (only Hot Chocolate ₹100 is visible).
7. Approval of the provisional hero line "Your moment. Your coffee." and the four featured specials.
