import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Z_INDEX } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { CausticsLayer } from '@/components/layers/CausticsLayer'

interface WaterLayerProps {
  className?: string
  caustics?: boolean
}

const WAVE_PATHS = [
  'M0,40 Q90,20 180,40 Q270,60 360,40 Q450,20 540,40 Q630,60 720,40 Q810,20 900,40 Q990,60 1080,40 Q1170,20 1260,40 Q1350,60 1440,40 L1440,80 L0,80 Z',
  'M0,42 Q90,55 180,38 Q270,25 360,45 Q450,58 540,35 Q630,22 720,42 Q810,55 900,38 Q990,25 1080,45 Q1170,58 1260,35 Q1350,22 1440,42 L1440,80 L0,80 Z',
]

export function WaterLayer({ className = '', caustics = true }: WaterLayerProps) {
  const waveRef = useRef<SVGPathElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const wave = waveRef.current
    if (!wave || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.to(wave, {
        attr: { d: WAVE_PATHS[1] },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex: Z_INDEX.river }}
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a6b6b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1a4a4a" />
          </linearGradient>
        </defs>
        <rect width="1440" height="400" fill="url(#riverGrad)" />
      </svg>

      <svg
        className="water-shimmer absolute bottom-[10%] left-0 w-[200%]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path ref={waveRef} d={WAVE_PATHS[0]} fill="rgba(184,205,212,0.3)" />
      </svg>

      <CausticsLayer enabled={caustics} />

      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] opacity-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(184,205,212,0.4))',
          transform: 'scaleY(-1)',
        }}
      />
    </div>
  )
}
