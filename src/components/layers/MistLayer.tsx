import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MistLayerProps {
  trigger: string
  sheets?: number
}

const MIST_SHEETS = [
  {
    blur: 20,
    opacity: 0.9,
    background:
      'linear-gradient(to top, rgba(240,248,245,0.9) 0%, rgba(240,248,245,0.4) 40%, transparent 100%)',
    yFrom: 100,
    yTo: -60,
  },
  {
    blur: 30,
    opacity: 0.5,
    background:
      'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.5) 0%, transparent 70%)',
    yFrom: 80,
    yTo: -40,
    height: '50%',
  },
  {
    blur: 15,
    opacity: 0.35,
    background:
      'radial-gradient(ellipse at 30% 80%, rgba(255,255,255,0.3) 0%, transparent 60%)',
    yFrom: 120,
    yTo: -100,
    height: '40%',
  },
]

export function MistLayer({ trigger, sheets = 3 }: MistLayerProps) {
  const mistRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const activeSheets = MIST_SHEETS.slice(0, Math.min(sheets, MIST_SHEETS.length))

  useEffect(() => {
    const mist = mistRef.current
    if (!mist || reducedMotion) return

    const ctx = gsap.context(() => {
      const sheetEls = mist.querySelectorAll('[data-mist-sheet]')
      sheetEls.forEach((sheet, index) => {
        const config = activeSheets[index]
        if (!config) return
        gsap.fromTo(
          sheet,
          { opacity: config.opacity * 0.3, y: config.yFrom },
          {
            opacity: config.opacity,
            y: config.yTo,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, mist)

    return () => ctx.revert()
  }, [trigger, reducedMotion, activeSheets])

  return (
    <div
      ref={mistRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: Z_INDEX.mist }}
      aria-hidden="true"
    >
      {activeSheets.map((sheet, index) => (
        <div
          key={index}
          data-mist-sheet
          className="absolute inset-x-0 bottom-0"
          style={{
            height: sheet.height ?? '100%',
            background: sheet.background,
            filter: `blur(${sheet.blur}px)`,
          }}
        />
      ))}
    </div>
  )
}
