const FAQS = [
  {
    q: "Toda análise depende de visita ao imóvel?",
    a: "Depende do caso. Ocupação, área, cidade, risco e norma aplicável mudam o que é necessário — o diagnóstico inicial já indica os próximos passos.",
  },
  {
    q: "Vocês garantem a aprovação do projeto?",
    a: "Não. Nenhuma engenharia pode prometer aprovação garantida. O que garantimos é um caminho tecnicamente sustentável e acompanhado até o fim.",
  },
  {
    q: "A Town Fire atende só segurança contra incêndio?",
    a: "Incêndio é a porta de entrada principal hoje. A atuação da Town Fire é pensada para abranger conformidade predial de forma mais ampla ao longo do tempo.",
  },
  {
    q: "Como funciona o primeiro contato?",
    a: "Você envia a situação do imóvel pelo formulário ou WhatsApp, entendemos o cenário e retornamos com o caminho recomendado.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function FaqSection() {
  return (
    <section id="faq" className="bg-parchment py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
          Perguntas frequentes
        </h2>

        <div className="mt-12 divide-y divide-brass/30 border-y border-brass/30">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold text-espresso marker:content-none">
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl font-normal text-rose transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/75">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
