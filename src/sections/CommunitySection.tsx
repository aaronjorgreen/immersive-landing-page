import { useState } from 'react'
import { ScrollRevealText } from '@/components/text/ScrollRevealText'
import { GuideBio } from '@/components/ui/GuideBio'
import { ParallaxLayer } from '@/components/layers/ParallaxLayer'
import { CTA_LABELS, PARALLAX_RATIOS, Z_INDEX } from '@/lib/constants'
import { getGuides, getHeadlines, getSectionContent } from '@/lib/content'

export function CommunitySection() {
  const { community } = getHeadlines()
  const { community: communityContent } = getSectionContent()
  const guides = getGuides()
  const [showBios, setShowBios] = useState(false)

  return (
    <section
      id="community"
      aria-label="The People"
      className="relative -mt-[10vh] min-h-[110vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-community-amber/30 via-[#8a6040]/40 to-canopy-shadow/60" />

      <ParallaxLayer speed={PARALLAX_RATIOS.slow} trigger="#community" zIndex={Z_INDEX.canopy}>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect x="400" y="280" width="80" height="120" fill="#5a4030" opacity="0.5" />
          <polygon points="400,280 440,240 480,280" fill="#5a4030" opacity="0.5" />
          <rect x="520" y="300" width="60" height="100" fill="#4a3525" opacity="0.4" />
          <polygon points="520,300 550,270 580,300" fill="#4a3525" opacity="0.4" />
          <ellipse cx="900" cy="370" rx="60" ry="12" fill="#3a2a1a" opacity="0.6" />
          <path d="M870,365 Q900,350 930,365" stroke="#5a4030" strokeWidth="3" fill="none" opacity="0.5" />
        </svg>
      </ParallaxLayer>

      <div
        className="relative flex min-h-[110vh] flex-col items-center justify-center px-6 py-20"
        style={{ zIndex: Z_INDEX.typography }}
      >
        <ScrollRevealText animation="fadeUp" trigger="#community">
          <div className="max-w-lg text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-community-warm text-balance">
              {community.headline}
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-community-warm/70 md:text-lg">
              {community.body}
            </p>
            <p className="mt-4 font-sans text-sm text-community-warm/50">
              Operating since {communityContent.operatingSince} · {communityContent.pledge}
            </p>
            <button
              type="button"
              onClick={() => setShowBios((v) => !v)}
              className="mt-8 font-sans text-sm text-community-warm/70 transition-colors hover:text-community-warm"
              aria-expanded={showBios}
            >
              {CTA_LABELS.meetGuides}
            </button>
          </div>
        </ScrollRevealText>

        {showBios && (
          <div className="mt-12 grid w-full max-w-2xl gap-8 md:grid-cols-2">
            {guides.map((guide) => (
              <GuideBio key={guide.id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
