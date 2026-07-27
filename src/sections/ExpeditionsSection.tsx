import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { ExpeditionCard } from '@/components/expedition/ExpeditionCard'
import { ExpeditionPanel } from '@/components/expedition/ExpeditionPanel'
import { ScrollRotatingHeadline } from '@/components/text/ScrollRotatingHeadline'
import { Z_INDEX } from '@/lib/constants'
import { getExpeditions, getHeadlines, type Expedition } from '@/lib/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ExpeditionsSection() {
  const expeditions = getExpeditions()
  const { seasonality } = getHeadlines()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [focusedId, setFocusedId] = useState<string>(expeditions[0]?.id ?? '')
  const [selectedExpedition, setSelectedExpedition] = useState<Expedition | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  const headlineLines = expeditions.map((e) => e.name)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards || reducedMotion) return

    const cardEls = cards.querySelectorAll('[data-expedition-card]')

    const ctx = gsap.context(() => {
      cardEls.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            const id = card.getAttribute('data-expedition-id')
            if (id) setFocusedId(id)
          },
          onEnterBack: () => {
            const id = card.getAttribute('data-expedition-id')
            if (id) setFocusedId(id)
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, expeditions.length])

  const handleSelect = (expedition: Expedition) => {
    setSelectedExpedition(expedition)
    setPanelOpen(true)
  }

  return (
    <section
      ref={sectionRef}
      id="expeditions"
      aria-label="Expeditions"
      className="relative -mt-[10vh] min-h-[120vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a4a2a] via-canopy-deep to-canopy-shadow" />

      <div
        className="relative mx-auto flex min-h-[120vh] max-w-5xl flex-col justify-center px-6 py-24"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRotatingHeadline
          lines={headlineLines}
          trigger="#expeditions"
          scrollStart="top 70%"
          scrollEnd="bottom 30%"
          className="mb-4 text-center"
          lineClassName="font-display text-[clamp(1.8rem,5vw,3rem)] text-canopy-mist/90"
          as="h2"
        />

        <p className="mb-12 text-center font-sans text-sm text-canopy-mist/50">
          {seasonality}
        </p>

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-3">
          {expeditions.map((expedition) => (
            <ExpeditionCard
              key={expedition.id}
              expedition={expedition}
              focused={focusedId === expedition.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <ExpeditionPanel
        expedition={selectedExpedition}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
    </section>
  )
}
