import { useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'

export interface RotatingHeadlineState {
  activeIndex: number
  nextIndex: number
  /** 0 = fully on active line, 1 = fully on next line */
  crossfade: number
  /** Normalised scroll progress 0–1 within the trigger range */
  progress: number
}

const DEFAULT_CROSSFADE_PORTION = 0.15

/**
 * Maps normalised scroll progress (0–1) to active headline index and crossfade amount.
 * Each line occupies an equal segment; the last 15% of each segment crossfades to the next.
 */
export function computeRotatingHeadline(
  progress: number,
  lineCount: number,
  crossfadePortion = DEFAULT_CROSSFADE_PORTION,
): RotatingHeadlineState {
  if (lineCount <= 0) {
    return { activeIndex: 0, nextIndex: 0, crossfade: 0, progress: 0 }
  }

  if (lineCount === 1) {
    return { activeIndex: 0, nextIndex: 0, crossfade: 0, progress: progress }
  }

  const clamped = Math.min(Math.max(progress, 0), 1)
  const scaled = clamped * lineCount
  const activeIndex = Math.min(Math.floor(scaled), lineCount - 1)
  const nextIndex = Math.min(activeIndex + 1, lineCount - 1)
  const segmentProgress = scaled - activeIndex

  let crossfade = 0
  if (nextIndex !== activeIndex && segmentProgress >= 1 - crossfadePortion) {
    crossfade = (segmentProgress - (1 - crossfadePortion)) / crossfadePortion
  }

  return { activeIndex, nextIndex, crossfade, progress: clamped }
}

interface UseRotatingHeadlineOptions {
  lineCount: number
  trigger: string | Element | null
  scrollStart?: string
  scrollEnd?: string
  crossfadePortion?: number
  enabled?: boolean
}

/**
 * Subscribes to ScrollTrigger scrub progress for a trigger element and returns headline state.
 */
export function useRotatingHeadline({
  lineCount,
  trigger,
  scrollStart = 'top top',
  scrollEnd = '+=100%',
  crossfadePortion = DEFAULT_CROSSFADE_PORTION,
  enabled = true,
}: UseRotatingHeadlineOptions): RotatingHeadlineState {
  const [state, setState] = useState<RotatingHeadlineState>(() =>
    computeRotatingHeadline(0, lineCount, crossfadePortion),
  )

  useEffect(() => {
    if (!enabled || !trigger || lineCount <= 0) {
      setState(computeRotatingHeadline(0, lineCount, crossfadePortion))
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
            onUpdate: (self) => {
              setState(computeRotatingHeadline(self.progress, lineCount, crossfadePortion))
            },
          },
        },
      )
    })

    return () => ctx.revert()
  }, [trigger, scrollStart, scrollEnd, lineCount, crossfadePortion, enabled])

  return state
}
