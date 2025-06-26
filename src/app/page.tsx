import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { HoroscopePredictions } from '@/components/sections/horoscope-predictions';
import { ZodiacSigns } from '@/components/sections/zodiac-signs';
import { ZodiacElements } from '@/components/sections/zodiac-elements';
import { LoveCompatibility } from '@/components/sections/love-compatibility';
import { OtherSystems } from '@/components/sections/other-systems';
import { WhyBelieve } from '@/components/sections/why-believe';
import { InterestingFacts } from '@/components/sections/interesting-facts';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <HoroscopePredictions />
        <ZodiacSigns />
        <ZodiacElements />
        <LoveCompatibility />
        <OtherSystems />
        <WhyBelieve />
        <InterestingFacts />
      </main>
      <Footer />
    </div>
  );
}
