import { WhatsAppLink } from "./WhatsAppLink";

const SEGMENTS = [
  "Comércio",
  "Serviços",
  "Indústrias",
  "Galpões e depósitos",
  "Empresas em implantação",
  "Proprietários e gestores de ativos",
];

export function AudienceSection() {
  return (
    <section className="bg-blush py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
            Seu imóvel precisa acompanhar a operação.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-espresso/70">
            Cada uso muda a leitura técnica. A Town Fire entra para organizar
            essa leitura e conduzir o caminho aplicável ao caso.
          </p>
          <WhatsAppLink
            intent="fit"
            placement="audience_fit"
            className="mt-8 inline-block rounded-full bg-espresso px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.03em] text-parchment transition-colors hover:bg-espresso-2"
          >
            Ver se atendem meu caso
          </WhatsAppLink>
        </div>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-espresso/20 pt-8 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {SEGMENTS.map((segment) => (
            <li key={segment} className="font-display text-lg text-espresso">
              {segment}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
