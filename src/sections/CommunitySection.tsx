import { ScrollRevealText } from '@/components/text/ScrollRevealText'
import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { PARALLAX_RATIOS, Z_INDEX } from '@/lib/constants'

export function CommunitySection() {
  return (
    <section
      id="community"
      aria-label="The People"
      className="relative -mt-[10vh] min-h-[100vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-community-amber/30 via-[#8a6040]/40 to-canopy-shadow/60" />

      <ParallaxLayer speed={PARALLAX_RATIOS.slow} trigger="#community" zIndex={Z_INDEX.canopy}>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Village silhouettes */}
          <rect x="400" y="280" width="80" height="120" fill="#5a4030" opacity="0.5" />
          <polygon points="400,280 440,240 480,280" fill="#5a4030" opacity="0.5" />
          <rect x="520" y="300" width="60" height="100" fill="#4a3525" opacity="0.4" />
          <polygon points="520,300 550,270 580,300" fill="#4a3525" opacity="0.4" />
          {/* Canoe on water */}
          <ellipse cx="900" cy="370" rx="60" ry="12" fill="#3a2a1a" opacity="0.6" />
          <path d="M870,365 Q900,350 930,365" stroke="#5a4030" strokeWidth="3" fill="none" opacity="0.5" />
        </svg>
      </ParallaxLayer>

      <div
        className="relative flex min-h-[100vh] items-center justify-center px-6"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRevealText animation="fadeUp" trigger="#community">
          <div className="max-w-lg text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-community-warm text-balance">
              Stories older than maps.
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-community-warm/70 md:text-lg">
              Along the Rio Negro, communities have lived with the river for generations.
              We visit with respect — to listen, not to spectacle.
            </p>
          </div>
        </ScrollRevealText>
      </div>
    </section>
  )
}
