import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Bridge } from "@/components/Bridge";
import { PovSection } from "@/components/PovSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { MethodSection } from "@/components/MethodSection";
import { AuthoritySection } from "@/components/AuthoritySection";
import { ConversionSection } from "@/components/ConversionSection";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { SITE_URL } from "@/lib/site-config";

// Person só entra aqui (não em layout.tsx): João e Jefferson aparecem
// visualmente só na home, em AuthoritySection. Sem CREA, formação
// complementar ou número de registro — não confirmados, não inventados.
const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "João Carlos Chaves",
      jobTitle: "Engenheiro Civil",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: ["https://www.linkedin.com/in/joaocarloscl/"],
    },
    {
      "@type": "Person",
      name: "Jefferson Jesus",
      jobTitle: "Engenheiro Mecânico",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: ["https://www.linkedin.com/in/jefferson--jesus/"],
    },
  ],
};

// Home canônica V6: seis atos. Header, footer e pontes não contam como atos
// (00_COMECE_AQUI/ESTADO_CANONICO_SITE_V6.md).
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Bridge tone="dark">
          Antes de desenhar a solução, existe uma decisão mais importante.
        </Bridge>
        <PovSection />
        <Bridge>A leitura define o trabalho.</Bridge>
        <SolutionsSection />
        <Bridge>
          Cada caso começa em um ponto. O próximo passo fica definido.
        </Bridge>
        <MethodSection />
        <Bridge tone="dark">
          A experiência da Town Fire foi construída em ambientes que cobram
          precisão.
        </Bridge>
        <AuthoritySection />
        <Bridge>
          Seu imóvel já tem uma situação. O próximo passo é localizá-la.
        </Bridge>
        <ConversionSection />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
