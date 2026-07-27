import { ScrollProvider } from '@/app/ScrollProvider'
import { AnalyticsProvider } from '@/app/AnalyticsProvider'
import { MotionProvider } from '@/app/MotionProvider'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { MiniNav } from '@/components/ui/MiniNav'
import { StructuredData } from '@/components/seo/StructuredData'
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
      <MotionProvider>
      <AnalyticsProvider>
        <StructuredData />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-arrival-gold focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-depths-indigo"
        >
          Skip to main content
        </a>
        <div className="relative overflow-x-hidden">
        <ScrollHint />
        <MiniNav />
        <main id="main-content" className="relative">
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
      </AnalyticsProvider>
      </MotionProvider>
    </ScrollProvider>
  )
}
