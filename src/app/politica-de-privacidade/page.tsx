import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const title = "Política de Privacidade | Town Fire";
const description =
  "Como a Town Fire trata os dados de quem visita o site e inicia uma conversa pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PoliticaDePrivacidade() {
  return (
    <>
      <main className="flex-1 bg-parchment py-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose"
          >
            Voltar para a home
          </Link>

          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-espresso">
            Política de Privacidade
          </h1>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/80">
            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                Quais dados são tratados
              </h2>
              <p className="mt-3">
                Quando você usa um botão de contato do site, a Town Fire
                registra a origem da visita, a página de entrada, o botão
                utilizado e uma referência curta gerada para aquele contato. Se
                você chegou por um anúncio, os identificadores de campanha do
                Google também ficam nesse registro.
              </p>
              <p className="mt-3">
                Os dados que você envia na conversa de WhatsApp, como cidade,
                atividade, área do imóvel e documentos, são tratados para
                analisar o caso e responder ao seu pedido.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                Para que os dados são usados
              </h2>
              <p className="mt-3">
                Para responder ao contato, avaliar a situação do imóvel,
                elaborar proposta quando for o caso e medir quais anúncios e
                páginas geram contatos reais.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                Compartilhamento
              </h2>
              <p className="mt-3">
                A Town Fire não vende dados pessoais. O compartilhamento
                acontece apenas com os provedores usados para operar o site e a
                comunicação, e com órgãos públicos quando o próprio serviço
                contratado exige, como no protocolo de processos junto ao Corpo
                de Bombeiros.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                Medição e consentimento
              </h2>
              <p className="mt-3">
                O site pode usar ferramentas de medição do Google para entender
                o desempenho das páginas e das campanhas. O uso dessas
                ferramentas respeita a escolha registrada no aviso de
                consentimento exibido na primeira visita.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                Seus direitos
              </h2>
              <p className="mt-3">
                Você pode pedir confirmação de tratamento, acesso, correção ou
                eliminação dos seus dados, conforme a Lei Geral de Proteção de
                Dados. O pedido pode ser feito pelo WhatsApp oficial{" "}
                {WHATSAPP_DISPLAY}.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
