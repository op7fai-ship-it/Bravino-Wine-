import Hero from '@/components/Hero';
import AcolhimentoSection from '@/components/AcolhimentoSection';
import UnidadesSection from '@/components/UnidadesSection';
import VinhosSection from '@/components/VinhosSection';
import GourmetSection from '@/components/GourmetSection';
import EventosSection from '@/components/EventosSection';
import ConviteFinalSection from '@/components/ConviteFinalSection';
import FooterSection from '@/components/FooterSection';
import SectionCorkBurst from '@/components/SectionCorkBurst';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="relative" data-burst-root>
        <div className="absolute inset-0 z-[5]">
          <SectionCorkBurst />
        </div>

        <div data-burst-section>
          <AcolhimentoSection />
        </div>
        <div data-burst-section>
          <UnidadesSection />
        </div>
        <div data-burst-section>
          <VinhosSection />
        </div>
        <div data-burst-section>
          <GourmetSection />
        </div>
        <div data-burst-section>
          <EventosSection />
        </div>
        <div data-burst-section>
          <ConviteFinalSection />
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
