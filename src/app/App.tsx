import { ScrollProvider } from '@/app/ScrollProvider'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { HeroSection } from '@/sections/HeroSection'
import { CanopySection } from '@/sections/CanopySection'
import { RiverSection } from '@/sections/RiverSection'
import { WildlifeSection } from '@/sections/WildlifeSection'
import { CommunitySection } from '@/sections/CommunitySection'
import { DepthsSection } from '@/sections/DepthsSection'
import { SectionPlaceholder } from '@/sections/SectionPlaceholder'
import { SECTION_HEIGHTS } from '@/lib/constants'

export default function App() {
  return (
    <ScrollProvider>
      <div className="relative overflow-x-hidden">
        <ScrollHint />
        <main className="relative">
          <HeroSection />
          <CanopySection />
          <RiverSection />
          <WildlifeSection />
          <CommunitySection />
          <DepthsSection />
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
