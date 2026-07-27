import { ScrollProvider } from '@/app/ScrollProvider'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { HeroSection } from '@/sections/HeroSection'
import { CanopySection } from '@/sections/CanopySection'
import { RiverSection } from '@/sections/RiverSection'
import { WildlifeSection } from '@/sections/WildlifeSection'
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
          <RiverSection />
          <WildlifeSection />
          <CommunitySection />
          <DepthsSection />
          <CTASection />
        </main>
      </div>
    </ScrollProvider>
  )
}
