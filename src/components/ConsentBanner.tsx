"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CONSENT_REOPEN_EVENT,
  NO_CONSENT,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/consent";

const BUTTON =
  "inline-flex min-h-[44px] items-center justify-center rounded-full border px-3 text-center font-display text-[0.6875rem] font-semibold uppercase leading-tight tracking-[0.03em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 sm:text-xs sm:tracking-[0.04em]";

/**
 * Aviso de consentimento (Consent Mode v2) com duas finalidades separadas:
 * análise de utilização do site e medição dos anúncios do Google. O contato
 * pelo WhatsApp não depende de escolha. As ações têm peso visual equivalente
 * (sem dark pattern); "Escolher preferências" abre um modal nativo (<dialog>),
 * com foco preso, Esc para fechar e devolução do foco ao controle de origem.
 *
 * Escolha antiga (versão anterior do aviso, só Analytics): vale apenas o que
 * ela de fato autorizava e o aviso reaparece, sem bloquear a navegação.
 */
export function ConsentBanner() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [legacy, setLegacy] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInitial, setDialogInitial] = useState<ConsentChoice>(NO_CONSENT);
  const [dialogKey, setDialogKey] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  const openDialog = () => {
    // Controles desmarcados quando não há escolha válida; com escolha (inclusive
    // antiga), mostram apenas o que foi realmente autorizado.
    setDialogInitial(readConsent()?.choice ?? NO_CONSENT);
    setDialogKey((k) => k + 1);
    setDialogOpen(true);
  };

  useEffect(() => {
    // localStorage só existe no cliente: a leitura acontece aqui, uma vez, após
    // montar, para não gerar diferença de hidratação.
    const state = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBannerOpen(state === null || state.legacy);
    setLegacy(state?.legacy === true);

    window.addEventListener(CONSENT_REOPEN_EVENT, openDialog);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, openDialog);
  }, []);

  // Sinaliza ao resto da página (botão flutuante, barra de WhatsApp) que o
  // aviso está aberto e publica sua altura (--tf-consent-h), para a barra fixa
  // do celular ficar empilhada acima dele sem sobrepor.
  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute("data-consent-open", bannerOpen);
    const el = bannerRef.current;
    if (!bannerOpen || !el) {
      root.style.removeProperty("--tf-consent-h");
      return () => root.removeAttribute("data-consent-open");
    }
    const publish = () =>
      root.style.setProperty("--tf-consent-h", `${el.getBoundingClientRect().height}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--tf-consent-h");
      root.removeAttribute("data-consent-open");
    };
  }, [bannerOpen]);

  function choose(choice: ConsentChoice) {
    saveConsent(choice);
    setBannerOpen(false);
    setLegacy(false);
    setDialogOpen(false);
  }

  return (
    <>
      {bannerOpen && (
        <div
          ref={bannerRef}
          role="region"
          aria-label="Aviso de privacidade"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-brass/30 bg-espresso text-parchment"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
            <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-parchment/80 sm:text-sm">
              Usamos ferramentas do Google para entender o uso do site e medir
              quais anúncios geram contatos. Você pode escolher quais medições
              permitir. O contato pelo WhatsApp funciona com qualquer escolha.
              {legacy &&
                " Sua escolha anterior continua valendo até você confirmar a nova."}{" "}
              <Link
                href="/politica-de-privacidade"
                className="underline decoration-parchment/40 underline-offset-2 hover:text-white"
              >
                Política de Privacidade
              </Link>
              .
            </p>

            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
              {/* Peso visual equivalente entre aceitar e recusar: ambos
                  preenchidos, mesma altura e fonte; só a cor muda. */}
              <button
                type="button"
                onClick={() => choose({ analytics: true, ads: true })}
                className={`${BUTTON} border-rose bg-rose text-espresso hover:bg-rose-strong focus-visible:outline-parchment`}
              >
                Permitir as duas medições
              </button>
              <button
                type="button"
                onClick={() => choose(NO_CONSENT)}
                className={`${BUTTON} border-parchment/40 bg-parchment/10 text-parchment hover:bg-parchment/15 focus-visible:outline-parchment`}
              >
                Continuar sem medição
              </button>
              <button
                type="button"
                onClick={openDialog}
                className="col-span-2 inline-flex min-h-[44px] items-center justify-center px-2 font-display text-xs font-semibold uppercase tracking-[0.04em] text-parchment underline decoration-parchment/50 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment"
              >
                Escolher preferências
              </button>
            </div>
          </div>
        </div>
      )}

      <PreferencesDialog
        key={dialogKey}
        open={dialogOpen}
        initial={dialogInitial}
        onSave={choose}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}

function PreferencesDialog({
  open,
  initial,
  onSave,
  onClose,
}: {
  open: boolean;
  initial: ConsentChoice;
  onSave: (choice: ConsentChoice) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [ads, setAds] = useState(initial.ads);

  // showModal() prende o foco no diálogo, fecha com Esc e, ao fechar, devolve o
  // foco ao elemento que estava focado antes (o controle de origem).
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="consent-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-[20px] border border-brass/40 bg-parchment p-0 text-charcoal backdrop:bg-espresso/70"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6">
        <h2
          id="consent-dialog-title"
          className="font-display text-xl font-bold text-espresso"
        >
          Preferências de privacidade
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
          Escolha quais medições do Google você permite. O contato pelo WhatsApp
          funciona com qualquer escolha, e você pode mudar de ideia quando quiser
          pelo link “Preferências de privacidade” no rodapé.
        </p>

        <div className="mt-5 space-y-3">
          <PurposeRow
            id="consent-analytics"
            checked={analytics}
            onChange={setAnalytics}
            title="Análise de utilização do site"
            description="Google Analytics. Mostra, de forma agregada, quais páginas são visitadas e quais botões são clicados. Grava cookies de análise neste navegador."
          />
          <PurposeRow
            id="consent-ads"
            checked={ads}
            onChange={setAds}
            title="Medição dos anúncios do Google"
            description="Google Ads. Permite saber quais anúncios levaram a um contato pelo WhatsApp. Grava cookies de conversão e envia ao Google o clique no botão e o identificador do anúncio. Não usamos para personalizar anúncios."
          />
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onSave({ analytics, ads })}
            className={`${BUTTON} border-rose bg-rose text-espresso hover:bg-rose-strong focus-visible:outline-espresso`}
          >
            Salvar preferências
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`${BUTTON} border-espresso/40 bg-transparent text-espresso hover:bg-espresso/10 focus-visible:outline-espresso`}
          >
            Cancelar
          </button>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-charcoal/60">
          Detalhes na{" "}
          <Link
            href="/politica-de-privacidade"
            className="underline decoration-charcoal/40 underline-offset-2 hover:text-espresso"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </dialog>
  );
}

function PurposeRow({
  id,
  checked,
  onChange,
  title,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-4 rounded-[12px] border border-brass/40 bg-white/60 p-4"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#c05f78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
      />
      <span>
        <span className="block font-display text-sm font-semibold text-espresso">
          {title}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
          {description}
        </span>
      </span>
    </label>
  );
}
