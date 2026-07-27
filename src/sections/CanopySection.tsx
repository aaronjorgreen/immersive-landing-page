import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { MistLayer } from '@/components/layers/MistLayer'
import { CanopySwayLayer } from '@/components/layers/CanopySwayLayer'
import { ParticleField } from '@/components/layers/ParticleField'
import { ScrollRevealText } from '@/components/text/ScrollRevealText'
import { PARALLAX_RATIOS, Z_INDEX } from '@/lib/constants'
import { getHeadlines } from '@/lib/content'
import { useMotionFeatures } from '@/app/MotionProvider'

export function CanopySection() {
  const { canopy } = getHeadlines()
  const motion = useMotionFeatures()

  return (
    <section
      id="canopy"
      aria-label="The Canopy"
      className="relative -mt-[25vh] min-h-[120vh] overflow-hidden"
    >
      {/* Background canopy layer — slow parallax */}
      <ParallaxLayer speed={PARALLAX_RATIOS.slow} trigger="#canopy" zIndex={Z_INDEX.canopy}>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f2419" />
              <stop offset="100%" stopColor="#1a3d2e" />
            </linearGradient>
          </defs>
          <rect width="1440" height="600" fill="url(#canopyGrad)" />
          <path
            d="M0,400 Q180,320 360,380 Q540,280 720,350 Q900,300 1080,370 Q1260,310 1440,380 L1440,600 L0,600 Z"
            fill="#1a3d2e"
            opacity="0.8"
          />
          <path
            d="M0,450 Q200,380 400,420 Q600,350 800,400 Q1000,360 1200,430 Q1320,390 1440,420 L1440,600 L0,600 Z"
            fill="#0f2419"
            opacity="0.6"
          />
        </svg>
      </ParallaxLayer>

      {/* Mid canopy silhouettes — medium parallax */}
      <ParallaxLayer speed={PARALLAX_RATIOS.medium} trigger="#canopy" zIndex={Z_INDEX.canopy + 1}>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[
            'M100,500 L100,280 Q130,240 160,280 L160,500',
            'M350,500 L350,220 Q390,170 430,220 L430,500',
            'M620,500 L620,260 Q660,210 700,260 L700,500',
            'M900,500 L900,200 Q950,140 1000,200 L1000,500',
            'M1200,500 L1200,270 Q1240,220 1280,270 L1280,500',
          ].map((d, i) => (
            <path key={i} d={d} fill="#0a1a12" opacity="0.7" />
          ))}
        </svg>
      </ParallaxLayer>

      <MistLayer trigger="#canopy" sheets={motion.mistSheets} />

      {motion.treeSway && <CanopySwayLayer />}

      {motion.particles && (
        <ParticleField count={motion.particleCount} color="rgba(61, 139, 90, 0.4)" />
      )}

      <div
        className="relative flex min-h-[120vh] items-center justify-center px-6"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRevealText animation="fadeUp" trigger="#canopy">
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] text-canopy-mist text-balance text-center">
            {canopy.lines[0]}
          </h2>
        </ScrollRevealText>
      </div>
    </section>
  )
}
