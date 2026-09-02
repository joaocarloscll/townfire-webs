import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SituationSection } from "@/components/SituationSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { JourneySection } from "@/components/JourneySection";
import { WhyTownFireSection } from "@/components/WhyTownFireSection";
import { PartnersSection } from "@/components/PartnersSection";
import { FaqSection } from "@/components/FaqSection";
import { ConversionSection } from "@/components/ConversionSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <SituationSection />
        <SolutionsSection />
        <JourneySection />
        <WhyTownFireSection />
        <PartnersSection />
        <FaqSection />
        <ConversionSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
