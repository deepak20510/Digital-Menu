import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useDeferredValue, useMemo, useState } from 'react'
import { categories, menuItems, type CategoryId, type MenuItem } from '../data/menu'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { EASE_OUT } from '../lib/motion'

interface Props {
  onSelect: (item: MenuItem) => void
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

/** Groups items by the café's own section names, preserving menu order. */
function groupBySection(items: MenuItem[]) {
  const groups = new Map<string, MenuItem[]>()
  for (const item of items) {
    const list = groups.get(item.section) ?? []
    list.push(item)
    groups.set(item.section, list)
  }
  return Array.from(groups, ([section, list]) => ({ section, items: list }))
}

const counts = Object.fromEntries(
  categories.map((c) => [c.id, menuItems.filter((m) => m.category === c.id).length]),
) as Record<CategoryId, number>

export function MenuSection({ onSelect }: Props) {
  const [active, setActive] = useState<CategoryId>('beverages')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const q = normalize(deferredQuery.trim())
  const searching = q.length > 0

  const results = useMemo(() => {
    const list = searching
      ? menuItems.filter((m) => normalize(`${m.name} ${m.section} ${m.description ?? ''}`).includes(q))
      : menuItems.filter((m) => m.category === active)
    return groupBySection(list)
  }, [active, q, searching])

  const total = results.reduce((n, g) => n + g.items.length, 0)
  const activeCategory = categories.find((c) => c.id === active)!

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-espresso py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="menu-title" eyebrow="The Menu" title="Poured, pressed" italic="& plated." className="lg:col-span-7" />
          <p className="max-w-md text-sm leading-relaxed text-ivory/60 lg:col-span-5 lg:justify-self-end">
            Names and prices are transcribed from the supplied menu. Descriptions are preview copy awaiting Cafe In’s confirmation. Tap any item for details.
          </p>
        </div>

        {/* Search + status */}
        <div className="mt-14 flex flex-col-reverse gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p aria-live="polite" className="label text-ivory/70">
            {searching ? `${total} ${total === 1 ? 'result' : 'results'} for “${deferredQuery.trim()}” across the menu` : activeCategory.blurb}
          </p>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search the menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ivory/65">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="m20 20-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search latte, penne, cheesecake…"
              className="min-h-11 w-full rounded-full border border-ivory/20 bg-transparent pr-4 pl-11 text-sm text-ivory placeholder:text-ivory/60 focus:border-bronze focus:outline-none"
            />
          </label>
        </div>

        {/* Category filter — the only sticky control, to stay light on mobile */}
        <div className="sticky top-[80px] z-20 mt-6 lg:top-[92px]">
          <LayoutGroup>
            <div role="group" aria-label="Menu categories" className="glass no-scrollbar flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1.5">
              {categories.map((c) => {
                const isActive = !searching && c.id === active
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActive(c.id)
                      setQuery('')
                    }}
                    className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.74rem] active:scale-[0.97] sm:px-5 sm:text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-[color,transform] duration-300 ${
                      isActive ? 'text-espresso' : 'text-ivory/80 hover:text-ivory'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="menu-pill"
                        className="absolute inset-0 -z-0 rounded-full bg-bronze"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                                        <span className="relative">
                      <span className="sm:hidden">{c.short}</span>
                      <span className="hidden sm:inline">{c.label}</span>
                    </span>
                    <span className={`relative text-[0.65rem] ${isActive ? 'text-espresso/80' : 'text-ivory/65'}`}>{counts[c.id]}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={searching ? 'search' : active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mt-4"
          >
            {total === 0 ? (
              <div className="flex flex-col items-start gap-6 border border-dashed border-ivory/15 px-6 py-16 sm:items-center sm:text-center">
                <p className="display text-4xl italic text-ivory">Nothing by that name — yet.</p>
                <p className="max-w-md text-sm text-ivory/60">
                  No menu item matches “{deferredQuery.trim()}”. Try a different word, or browse a category.
                </p>
                <button type="button" onClick={() => setQuery('')} className="btn btn-ghost">
                  Clear search
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-16">
                {results.map((group) => (
                  <div key={group.section} className="grid gap-4 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <h3 className="label flex items-center gap-3 pt-6 text-bronze lg:sticky lg:top-[168px]">
                        <span aria-hidden="true" className="h-px w-6 bg-current" />
                        {group.section}
                      </h3>
                    </div>
                    <div className="grid gap-x-14 md:grid-cols-2 lg:col-span-9">
                      {group.items.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: EASE_OUT, delay: Math.min(i * 0.04, 0.4) }}
                        >
                          <ProductCard item={item} onSelect={onSelect} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex flex-col gap-2 border-t border-ivory/15 pt-6 text-xs leading-relaxed text-ivory/70 sm:flex-row sm:justify-between">
          <p>
            <span className="text-bronze-light">†</span> Details awaiting confirmation from Cafe In.
          </p>
          <p>Showcase menu only — no online ordering.</p>
        </div>
      </div>
    </section>
  )
}
