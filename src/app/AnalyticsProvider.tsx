import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { ANALYTICS_EVENTS, SECTION_IDS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const SECTIONS = Object.values(SECTION_IDS)

const SCROLL_DEPTH_MILESTONES = [0.25, 0.5, 0.75, 1] as const

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const progress = useScrollProgress()
  const firedDepths = useRef<Set<number>>(new Set())
  const firedSections = useRef<Set<string>>(new Set())
  const firedHeadlines = useRef<Set<number>>(new Set())

  useEffect(() => {
    SCROLL_DEPTH_MILESTONES.forEach((milestone) => {
      if (progress >= milestone && !firedDepths.current.has(milestone)) {
        firedDepths.current.add(milestone)
        trackEvent(ANALYTICS_EVENTS.scrollDepth, { depth: milestone * 100 })
      }
    })
  }, [progress])

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return

        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          onEnter: () => {
            if (!firedSections.current.has(id)) {
              firedSections.current.add(id)
              trackEvent(ANALYTICS_EVENTS.sectionEnter, { section: id })
            }
          },
        })
      })

      const hero = document.getElementById(SECTION_IDS.hero)
      if (hero) {
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: () => (window.innerWidth < 768 ? '+=60%' : '+=100%'),
          scrub: true,
          onUpdate: (self) => {
            const lineCount = window.innerWidth < 768 ? 3 : 4
            const index = Math.min(Math.floor(self.progress * lineCount), lineCount - 1)
            if (!firedHeadlines.current.has(index)) {
              firedHeadlines.current.add(index)
              trackEvent(ANALYTICS_EVENTS.heroHeadlineView, { index })
            }
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return children
}
