import { useEffect, useRef, type ElementType } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useRotatingHeadline } from '@/hooks/useRotatingHeadline'

export interface ScrollRotatingHeadlineProps {
  lines: string[]
  trigger: string | Element | null
  scrollStart?: string
  scrollEnd?: string
  /** Show subtle 01/04 progress counter below headline */
  showProgress?: boolean
  className?: string
  lineClassName?: string
  as?: 'h1' | 'h2' | 'h3'
}

function lineStyles(opacity: number, y: number, blur: number) {
  return {
    opacity,
    transform: `translateY(${y}px)`,
    filter: blur > 0 ? `blur(${blur}px)` : 'none',
  }
}

export function ScrollRotatingHeadline({
  lines,
  trigger,
  scrollStart = 'top top',
  scrollEnd = '+=100%',
  showProgress = false,
  className = '',
  lineClassName = '',
  as: Tag = 'h1',
}: ScrollRotatingHeadlineProps) {
  const reducedMotion = useReducedMotion()
  const liveRef = useRef<HTMLSpanElement>(null)
  const displayLines = reducedMotion ? [lines[0] ?? ''] : lines
  const { activeIndex, nextIndex, crossfade } = useRotatingHeadline({
    lineCount: displayLines.length,
    trigger,
    scrollStart,
    scrollEnd,
    enabled: !reducedMotion,
  })

  const currentLine = displayLines[activeIndex] ?? displayLines[0] ?? ''

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = currentLine
    }
  }, [currentLine])

  const Heading = Tag as ElementType
  const progressLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(displayLines.length).padStart(2, '0')}`

  if (reducedMotion || displayLines.length <= 1) {
    return (
      <div className={className}>
        <Heading className="relative">{displayLines[0]}</Heading>
        {showProgress && displayLines.length > 1 && (
          <p className="mt-4 font-sans text-xs tracking-widest text-white/40" aria-hidden="true">
            01 / {String(displayLines.length).padStart(2, '0')}
          </p>
        )}
      </div>
    )
  }

  const outgoingOpacity = 1 - crossfade
  const incomingOpacity = crossfade
  const outgoingY = -24 * crossfade
  const incomingY = 24 * (1 - crossfade)
  const outgoingBlur = 4 * crossfade
  const incomingBlur = 4 * (1 - crossfade)

  return (
    <div className={className}>
      <span ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true">
        {currentLine}
      </span>

      <Heading className="relative min-h-[1.2em]" aria-hidden="true">
        {displayLines.map((line, index) => {
          let opacity = 0
          let y = 24
          let blur = 4

          if (index === activeIndex && crossfade === 0) {
            opacity = 1
            y = 0
            blur = 0
          } else if (index === activeIndex) {
            opacity = outgoingOpacity
            y = outgoingY
            blur = outgoingBlur
          } else if (index === nextIndex && crossfade > 0) {
            opacity = incomingOpacity
            y = incomingY
            blur = incomingBlur
          }

          return (
            <span
              key={`${index}-${line}`}
              className={`absolute inset-x-0 top-0 block text-balance ${lineClassName}`}
              style={lineStyles(opacity, y, blur)}
              role="presentation"
            >
              {line}
            </span>
          )
        })}
      </Heading>

      {showProgress && (
        <p className="mt-4 font-sans text-xs tracking-widest text-white/40" aria-hidden="true">
          {progressLabel}
        </p>
      )}
    </div>
  )
}
