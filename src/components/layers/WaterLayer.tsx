import { Z_INDEX } from '@/lib/constants'

interface WaterLayerProps {
  className?: string
}

export function WaterLayer({ className = '' }: WaterLayerProps) {
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
        <path
          d="M0,40 Q90,20 180,40 Q270,60 360,40 Q450,20 540,40 Q630,60 720,40 Q810,20 900,40 Q990,60 1080,40 Q1170,20 1260,40 Q1350,60 1440,40 L1440,80 L0,80 Z"
          fill="rgba(184,205,212,0.3)"
        />
      </svg>

      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] opacity-20"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(184,205,212,0.4))',
          transform: 'scaleY(-1)',
        }}
      />
    </div>
  )
}
