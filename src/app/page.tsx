import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Bridge } from "@/components/Bridge";
import { SituationSection } from "@/components/SituationSection";
import { PovSection } from "@/components/PovSection";
import { MethodSection } from "@/components/MethodSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { AudienceSection } from "@/components/AudienceSection";
import { AuthoritySection } from "@/components/AuthoritySection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { PartnersSection } from "@/components/PartnersSection";
import { FaqSection } from "@/components/FaqSection";
import { ConversionSection } from "@/components/ConversionSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { MobileStickyCta } from "@/components/MobileStickyCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Bridge tone="dark">Onde seu imóvel está hoje?</Bridge>
        <SituationSection />
        <Bridge>A resposta depende do imóvel. E isso muda tudo.</Bridge>
        <PovSection />
        <Bridge>É daí que nasce o caminho Town Fire.</Bridge>
        <MethodSection />
        <Bridge tone="dark">A sequência é clara. O ponto de entrada muda conforme o caso.</Bridge>
        <SolutionsSection />
        <Bridge>O tipo de negócio muda. A necessidade de clareza permanece.</Bridge>
        <AudienceSection />
        <AuthoritySection />
        <Bridge>Boa engenharia também precisa ser fácil de acompanhar.</Bridge>
        <ExperienceSection />
        <PartnersSection />
        <FaqSection />
        <ConversionSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <MobileStickyCta />
    </>
  );
}
