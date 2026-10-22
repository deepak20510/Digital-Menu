import { memo } from 'react'
import { formatPrice, type MenuItem } from '../data/menu'

interface Props {
  item: MenuItem
  onSelect: (item: MenuItem) => void
}

/** Editorial menu line: name, dotted leader, price, description. Whole card is clickable. */
export const ProductCard = memo(function ProductCard({ item, onSelect }: Props) {
  return (
    <article className="group relative flex gap-5 py-6 ring-bronze ring-offset-4 ring-offset-espresso-2 has-[button:focus-visible]:ring-2">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-ivory/10"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
      />

      {item.image && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm sm:h-24 sm:w-24">
          <img
            src={item.image.src}
            alt=""
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
            decoding="async"
            className="frame-img transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-110"
            style={{ objectPosition: item.image.focus }}
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="display min-w-0 text-[1.65rem] leading-tight text-ivory transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-1 sm:text-[1.9rem]">
            <button
              type="button"
              onClick={() => onSelect(item)}
              aria-label={`${item.name}, ${formatPrice(item.price)}${item.needsConfirmation ? ' (details to be confirmed)' : ''} — view details`}
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {item.name}
            </button>
            {item.needsConfirmation && (
              <sup aria-hidden="true" className="ml-1 font-sans text-xs text-bronze-light" title={item.needsConfirmation}>
                †
              </sup>
            )}
          </h4>
          <span aria-hidden="true" className="mb-1.5 hidden flex-1 border-b border-dotted border-ivory/25 sm:block" />
          <span className="ml-auto shrink-0 font-sans text-base font-medium tracking-wide text-bronze-light">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description ? (
          <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ivory/60">{item.description}</p>
        ) : (
          <p className="mt-2 text-sm text-ivory/65 italic">Description to be confirmed by Cafe In.</p>
        )}
      </div>
    </article>
  )
})
