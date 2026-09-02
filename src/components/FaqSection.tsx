const FAQS = [
  {
    q: "Como sei se meu imóvel precisa de projeto ou regularização?",
    a: "Depende de características como uso, área, configuração, ocupação e situação atual. A triagem inicial existe justamente para identificar o caminho correto.",
  },
  {
    q: "Já recebi uma exigência. Vocês conseguem assumir o caso?",
    a: "Podemos analisar o documento e o material disponível para entender a pendência e definir o escopo necessário.",
  },
  {
    q: "Vocês acompanham o processo de regularização?",
    a: "O acompanhamento pode fazer parte do escopo contratado. A proposta deixa claro quais etapas estão incluídas.",
  },
  {
    q: "Atendem comércio e indústria?",
    a: "Sim. A abordagem muda de acordo com o imóvel, a atividade e a complexidade da operação.",
  },
  {
    q: "Posso falar com vocês antes de alugar, comprar ou reformar?",
    a: "Sim. Uma análise anterior à decisão pode ajudar a identificar condicionantes técnicas relevantes.",
  },
  {
    q: "Sou contador, arquiteto ou outro parceiro. Como funciona?",
    a: "A parceria começa por uma conversa sobre perfil de cliente, fluxo de indicação e forma de acompanhamento.",
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
          Perguntas que costumam aparecer antes da primeira conversa.
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
