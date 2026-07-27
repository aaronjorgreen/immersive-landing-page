import { ScrollProvider } from '@/app/ScrollProvider'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { HeroSection } from '@/sections/HeroSection'
import { CanopySection } from '@/sections/CanopySection'
import { RiverSection } from '@/sections/RiverSection'
import { WildlifeSection } from '@/sections/WildlifeSection'
import { ExpeditionsSection } from '@/sections/ExpeditionsSection'
import { CommunitySection } from '@/sections/CommunitySection'
import { DepthsSection } from '@/sections/DepthsSection'
import { CTASection } from '@/sections/CTASection'

export default function App() {
  return (
    <ScrollProvider>
      <div className="relative overflow-x-hidden">
        <ScrollHint />
        <main className="relative">
          <HeroSection />
          <CanopySection />
          <div className="section-lazy">
            <RiverSection />
            <WildlifeSection />
            <ExpeditionsSection />
            <CommunitySection />
            <DepthsSection />
            <CTASection />
          </div>
        </main>
      </div>
    </ScrollProvider>
  )
}
