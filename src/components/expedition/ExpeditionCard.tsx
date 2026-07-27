import type { Expedition } from '@/lib/content'
import { formatDuration, formatPriceFrom } from '@/lib/content'
import { PRICING_FOOTNOTE } from '@/lib/constants'

interface ExpeditionCardProps {
  expedition: Expedition
  focused?: boolean
  onSelect?: (expedition: Expedition) => void
  compact?: boolean
}

export function ExpeditionCard({
  expedition,
  focused = false,
  onSelect,
  compact = false,
}: ExpeditionCardProps) {
  return (
    <article
      data-expedition-card
      data-expedition-id={expedition.id}
      className={`rounded-sm border transition-all duration-500 ${
        focused
          ? 'border-arrival-gold/60 bg-canopy-shadow/40 scale-[1.02] shadow-lg shadow-arrival-gold/10'
          : 'border-canopy-mist/15 bg-canopy-shadow/20 scale-100 opacity-70'
      } ${compact ? 'p-5' : 'p-8'}`}
    >
      <header>
        <h3 className="font-display text-[clamp(1.3rem,2.5vw,1.8rem)] text-canopy-mist/95">
          {expedition.name}
        </h3>
        <p className="mt-1 font-sans text-xs uppercase tracking-wider text-wildlife-accent/80">
          {formatDuration(expedition.durationDays)} · {expedition.difficulty}
        </p>
      </header>

      <p className="mt-4 font-display text-lg text-arrival-gold/90">
        {formatPriceFrom(expedition.priceFrom, expedition.currency)}
        <span className="ml-1 font-sans text-xs text-canopy-mist/40">{PRICING_FOOTNOTE}</span>
      </p>

      <ul className="mt-4 space-y-2">
        {expedition.highlights.map((highlight) => (
          <li key={highlight} className="font-sans text-sm text-canopy-mist/60">
            {highlight}
          </li>
        ))}
      </ul>

      {onSelect && (
        <button
          type="button"
          onClick={() => onSelect(expedition)}
          className="mt-6 font-sans text-xs uppercase tracking-wider text-arrival-gold/70 transition-colors hover:text-arrival-gold"
        >
          View details →
        </button>
      )}
    </article>
  )
}
