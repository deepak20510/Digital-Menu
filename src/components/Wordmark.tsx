interface Props {
  className?: string
}

/**
 * Typographic CAFE!N wordmark mirroring the supplied logo, where the "I" is a
 * bronze exclamation mark. Screen readers hear "Cafe In".
 */
export function Wordmark({ className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-baseline font-sans font-semibold tracking-[0.14em] ${className}`}
      aria-label="Cafe In"
      role="img"
    >
      <span aria-hidden="true">CAFE</span>
      <span aria-hidden="true" className="text-bronze">
        !
      </span>
      <span aria-hidden="true">N</span>
    </span>
  )
}
