import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { ConsentPreferencesLink } from "@/components/ConsentPreferencesLink";

const title = "Política de Privacidade";
const description =
  "Como a Town Fire trata as informações de quem visita o site e inicia uma conversa pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/politica-de-privacidade" },
};

const preferencesLinkClassName =
  "text-rose underline decoration-rose/40 underline-offset-2 hover:text-rose-strong";

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
                1. Quem somos
              </h2>
              <p className="mt-3">
                A Town Fire Engenharia é uma empresa de engenharia voltada à
                segurança contra incêndio e à regularização de edificações.
                Esta política explica como as informações relacionadas ao uso
                deste site e aos contatos iniciados por meio dele podem ser
                tratadas.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                2. Quais informações podem ser tratadas
              </h2>
              <p className="mt-3">Dependendo da sua interação, podem existir:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  dados técnicos de navegação, somente depois que você permite
                  a medição (ver seção 4);
                </li>
                <li>página acessada e origem da visita;</li>
                <li>interação com as páginas do site;</li>
                <li>identificadores técnicos de campanha, quando existentes;</li>
                <li>
                  uma referência curta gerada quando você inicia uma conversa
                  pelo WhatsApp a partir de um botão do site;
                </li>
                <li>
                  as informações que você mesmo decide enviar na conversa de
                  WhatsApp, como cidade, atividade, área do imóvel e
                  documentos.
                </li>
              </ul>
              <p className="mt-3">
                A infraestrutura que hospeda o site pode registrar informações
                técnicas básicas de acesso, independentemente da medição
                opcional — isso é necessário para qualquer site funcionar e é
                diferente do Google Analytics, que só é usado com a sua
                permissão.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                3. Para que utilizamos essas informações
              </h2>
              <p className="mt-3">
                As informações podem ser utilizadas para responder
                solicitações, compreender a situação apresentada pelo
                interessado, avaliar o desempenho das páginas, identificar
                quais canais geram contatos e melhorar a experiência e a
                comunicação da Town Fire.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                4. Medição e cookies
              </h2>
              <p className="mt-3">
                O site utiliza o Google Analytics somente quando o visitante
                permite a medição. Essa ferramenta ajuda a compreender, de
                forma agregada, como as páginas são utilizadas e quais canais
                originam acessos e contatos.
              </p>
              <p className="mt-3">
                Os recursos de medição permanecem desativados enquanto essa
                autorização não for concedida. A escolha pode ser alterada a
                qualquer momento pelo link{" "}
                <ConsentPreferencesLink className={preferencesLinkClassName} />{" "}
                disponível no site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                5. Contato pelo WhatsApp
              </h2>
              <p className="mt-3">
                Ao clicar em um botão de WhatsApp do site, você é
                redirecionado ao serviço do WhatsApp (Meta). A partir desse
                momento, o tratamento das suas informações também está
                sujeito às políticas da própria plataforma. A Town Fire
                recebe as informações que você decide enviar na conversa.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                6. Compartilhamento com fornecedores
              </h2>
              <p className="mt-3">
                A Town Fire não comercializa dados pessoais. O
                compartilhamento acontece apenas com os provedores usados
                para operar o site (hospedagem, medição e comunicação via
                WhatsApp), e com órgãos públicos quando o próprio serviço
                contratado exige, como no protocolo de processos junto ao
                Corpo de Bombeiros.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                7. Escolha e preferências de privacidade
              </h2>
              <p className="mt-3">
                Na primeira visita, um aviso permite permitir ou recusar a
                medição do site. Você pode mudar de ideia a qualquer momento
                pelo link{" "}
                <ConsentPreferencesLink className={preferencesLinkClassName} />{" "}
                no rodapé do site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                8. Direitos do titular
              </h2>
              <p className="mt-3">
                Você pode pedir confirmação de tratamento, acesso, correção ou
                eliminação dos seus dados, conforme a Lei Geral de Proteção de
                Dados. O pedido pode ser feito pelo WhatsApp oficial{" "}
                {WHATSAPP_DISPLAY}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-espresso">
                9. Atualizações desta política
              </h2>
              <p className="mt-3">
                Esta política pode ser atualizada para refletir mudanças no
                site ou nas ferramentas utilizadas. A versão vigente é sempre
                a publicada nesta página.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
