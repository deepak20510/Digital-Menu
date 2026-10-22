import { categories, formatPrice, type MenuItem } from '../data/menu'
import { ConfirmFlag } from './ConfirmFlag'
import { Modal } from './Modal'

interface Props {
  item: MenuItem | null
  onClose: () => void
}

export function ProductDetailModal({ item, onClose }: Props) {
  const category = item ? categories.find((c) => c.id === item.category) : null
  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      labelledBy="product-title"
      backdropClassName="bg-espresso/60 backdrop-blur-md"
      className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-mocha text-ivory shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.72)] ring-1 ring-ivory/15 sm:max-h-[86vh] sm:rounded-[28px] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)]"
    >
      {item && (
        <div data-lenis-prevent className="grid sm:grid-cols-2">
          <div className="relative aspect-[4/3] bg-mocha sm:aspect-auto sm:min-h-[440px]">
            {/* Sheet grabber (phones) */}
            <span aria-hidden="true" className="absolute top-2.5 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-ivory/70 sm:hidden" />
            {item.image ? (
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                className="frame-img absolute inset-0"
                style={{ objectPosition: item.image.focus }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-end overflow-hidden p-8">
                <div aria-hidden="true" className="absolute -top-20 -right-20 h-72 w-72 rounded-full border border-bronze/30" />
                <div aria-hidden="true" className="absolute -top-6 -right-6 h-44 w-44 rounded-full border border-bronze/20" />
                <p className="label mb-3 text-bronze-light">{item.section}</p>
                <p aria-hidden="true" className="display text-5xl text-ivory italic">
                  {item.name}
                </p>
                <p className="mt-4 text-xs text-ivory/50">Photography for this item has not been supplied yet.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col p-7 sm:p-10">
            <p className="label pr-12 text-bronze">
              {category?.label} · {item.section}
            </p>
            <h3 id="product-title" className="display mt-4 text-4xl sm:text-5xl">
              {item.name}
            </h3>
            <p className="display mt-4 text-3xl text-ivory-2">{formatPrice(item.price)}</p>
            {item.description && <p className="mt-6 leading-relaxed text-ivory-2">{item.description}</p>}
            {item.needsConfirmation && (
              <div className="mt-6 rounded-sm border border-ivory/15 bg-espresso-2 p-4 text-sm text-ivory-2">
              <ConfirmFlag note={item.needsConfirmation} tone="light" />
                <p className="mt-2">{item.needsConfirmation}</p>
              </div>
            )}
            <p className="mt-auto pt-8 text-xs leading-relaxed text-ivory/65">
              Showcase menu — enjoy it at the café. Online ordering is not available.
            </p>
          </div>

          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close details"
            className="glass glass-control absolute top-4 right-4 bg-espresso/75 text-ivory"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>
      )}
    </Modal>
  )
}
