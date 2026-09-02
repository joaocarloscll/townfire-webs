import { WhatsAppLink } from "./WhatsAppLink";
import type { WhatsappIntent } from "@/lib/whatsapp";

const PARTNERS: {
  title: string;
  text: string;
  cta: string;
  intent: WhatsappIntent;
}[] = [
  {
    title: "Contabilidades",
    text: "Você cuida da empresa. A Town Fire assume a conversa técnica sobre o imóvel e mantém o parceiro informado.",
    cta: "Sou contador",
    intent: "accounting_partner",
  },
  {
    title: "Arquitetura",
    text: "A Town Fire entra na disciplina de incêndio e regularização preservando a relação do arquiteto com o cliente.",
    cta: "Sou arquiteto",
    intent: "architect_partner",
  },
  {
    title: "Imobiliárias e corretores",
    text: "Uma leitura prévia pode revelar exigências relevantes antes de decisões de ocupação ou locação.",
    cta: "Trabalho com imóveis",
    intent: "realestate_partner",
  },
  {
    title: "Construtoras, instaladores e facilities",
    text: "Escopos complementares com fronteiras claras entre projeto, regularização, execução e operação.",
    cta: "Quero conversar sobre parceria",
    intent: "builder_partner",
  },
];

export function PartnersSection() {
  return (
    <section id="parceiros" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose">
          Parcerias
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
          Seu cliente precisa regularizar o imóvel. Você já sabe quem chamar.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {PARTNERS.map((partner) => (
            <div key={partner.title} className="border-t border-brass/40 pt-6">
              <h3 className="font-display text-lg font-semibold text-espresso">
                {partner.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal/70">
                {partner.text}
              </p>
              <WhatsAppLink
                intent={partner.intent}
                placement={`partner_${partner.intent}`}
                className="mt-4 inline-block rounded-full border border-espresso px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-espresso hover:text-parchment"
              >
                {partner.cta}
              </WhatsAppLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
