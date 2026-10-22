interface Props {
  note: string
  tone?: 'light' | 'dark'
}

/** Small visible marker for data that still needs the café's confirmation. */
export function ConfirmFlag({ note, tone = 'light' }: Props) {
  return (
    <span
      title={note}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] ${
        tone === 'light' ? 'border-bronze/50 text-bronze-light' : 'border-bronze-deep/50 text-bronze-deep'
      }`}
    >
      <span aria-hidden="true">†</span> To confirm
      <span className="sr-only">: {note}</span>
    </span>
  )
}
