import { useEffect, useRef } from 'react'
import type { Expedition } from '@/lib/content'
import { formatDuration, formatPriceFrom } from '@/lib/content'
import { PRICING_FOOTNOTE } from '@/lib/constants'
import { useIsMobile } from '@/hooks/useMediaQuery'

interface ExpeditionPanelProps {
  expedition: Expedition | null
  open: boolean
  onClose: () => void
}

export function ExpeditionPanel({ expedition, open, onClose }: ExpeditionPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!open || !expedition) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expedition-panel-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-depths-indigo/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close expedition details"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative ml-auto flex h-full flex-col overflow-y-auto bg-canopy-shadow/95 p-8 shadow-2xl outline-none ${
          isMobile ? 'w-full' : 'w-full max-w-md'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="mb-6 self-end font-sans text-sm text-canopy-mist/50 hover:text-canopy-mist"
        >
          Close
        </button>

        <h2
          id="expedition-panel-title"
          className="font-display text-3xl text-canopy-mist/95"
        >
          {expedition.name}
        </h2>

        <p className="mt-2 font-sans text-sm text-wildlife-accent/80">
          {formatDuration(expedition.durationDays)} · Group {expedition.groupSize[0]}–
          {expedition.groupSize[1]} · {expedition.difficulty}
        </p>

        <p className="mt-6 font-display text-2xl text-arrival-gold/90">
          {formatPriceFrom(expedition.priceFrom, expedition.currency)}
          <span className="ml-1 font-sans text-xs text-canopy-mist/40">{PRICING_FOOTNOTE}</span>
        </p>

        <div className="mt-8">
          <h3 className="font-sans text-xs uppercase tracking-wider text-canopy-mist/50">
            Highlights
          </h3>
          <ul className="mt-3 space-y-2">
            {expedition.highlights.map((h) => (
              <li key={h} className="font-sans text-sm text-canopy-mist/70">
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="font-sans text-xs uppercase tracking-wider text-canopy-mist/50">
            Includes
          </h3>
          <ul className="mt-3 space-y-2">
            {expedition.includes.map((item) => (
              <li key={item} className="font-sans text-sm text-canopy-mist/70">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 font-sans text-xs text-canopy-mist/40">
          Best season: {expedition.season.join(', ')}
        </p>
      </div>
    </div>
  )
}
