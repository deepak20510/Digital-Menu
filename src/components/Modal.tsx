import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { trapTab } from '../lib/focusTrap'
import { useScrollLock } from '../hooks/useScrollLock'
import { EASE_OUT } from '../lib/motion'

interface Props {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
  className?: string
  backdropClassName?: string
  onKeyDown?: (e: KeyboardEvent) => void
}

/** Accessible dialog shell: focus trap, Escape, backdrop click, focus restore. */
export function Modal({ open, onClose, labelledBy, children, className = '', backdropClassName = 'bg-espresso/85 backdrop-blur-sm', onKeyDown }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const restore = document.activeElement as HTMLElement | null
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 40)
    return () => {
      window.clearTimeout(t)
      restore?.focus?.({ preventScroll: true })
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6 ${backdropClassName}`}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE_OUT }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.stopPropagation()
                onClose()
                return
              }
              trapTab(panelRef.current, e)
              onKeyDown?.(e)
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
