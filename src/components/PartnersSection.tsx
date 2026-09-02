import { whatsappHref } from "@/lib/site-config";

const PARTNERS = [
  "Contabilidades",
  "Arquitetos",
  "Imobiliárias e corretores",
  "Construtoras e instaladores",
  "Administradoras e facilities",
];

export function PartnersSection() {
  return (
    <section id="parceiros" className="bg-parchment py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10">
        <div>
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
            Você ajuda empresas a nascer. Nós ajudamos o imóvel delas a ficar
            apto.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal/75">
            Trabalhamos junto de quem já está ao lado do cliente no processo
            de abertura, expansão ou regularização — encaminhando o imóvel
            pelo caminho técnico enquanto vocês seguem cuidando do restante.
          </p>
          <a
            href={whatsappHref(
              "Olá! Represento um escritório/empresa parceira e quero falar com a Town Fire sobre indicações."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border border-espresso px-7 py-3.5 font-body text-sm font-medium text-espresso transition-colors hover:bg-espresso hover:text-parchment"
          >
            Quero ser parceiro
          </a>
        </div>

        <ul className="flex flex-col justify-center gap-4 border-t border-brass/40 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {PARTNERS.map((partner) => (
            <li
              key={partner}
              className="font-display text-lg text-espresso"
            >
              {partner}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
