import { ScrollProvider } from '@/app/ScrollProvider'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { HeroSection } from '@/sections/HeroSection'
import { SectionPlaceholder } from '@/sections/SectionPlaceholder'
import { SECTION_HEIGHTS } from '@/lib/constants'

export default function App() {
  return (
    <ScrollProvider>
      <div className="relative overflow-x-hidden">
        <ScrollHint />
        <main className="relative">
          <HeroSection />
          <SectionPlaceholder
            id="canopy"
            label="Act 2 — The Canopy"
            height={SECTION_HEIGHTS.canopy}
            className="-mt-[20vh] bg-gradient-to-b from-canopy-shadow via-canopy-deep to-canopy-shadow"
          />
          <SectionPlaceholder
            id="river"
            label="Act 3 — The River"
            height={SECTION_HEIGHTS.river}
            className="-mt-[15vh] bg-gradient-to-b from-river-reed via-river-teal to-river-teal"
          />
          <SectionPlaceholder
            id="wildlife"
            label="Act 4 — The Wildlife"
            height={SECTION_HEIGHTS.wildlife}
            className="-mt-[10vh] bg-gradient-to-b from-canopy-deep to-wildlife-accent/30"
          />
          <SectionPlaceholder
            id="community"
            label="Act 5 — The People"
            height={SECTION_HEIGHTS.community}
            className="-mt-[10vh] bg-gradient-to-b from-community-amber/40 to-community-warm/20"
          />
          <SectionPlaceholder
            id="depths"
            label="Act 6 — The Depths"
            height={SECTION_HEIGHTS.depths}
            className="-mt-[10vh] bg-depths-indigo"
          />
          <SectionPlaceholder
            id="arrival"
            label="Act 7 — The Arrival"
            height={SECTION_HEIGHTS.cta}
            className="-mt-[10vh] bg-gradient-to-b from-arrival-teal to-arrival-gold"
          />
        </main>
      </div>
    </ScrollProvider>
  )
}
