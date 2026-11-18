"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppLink } from "./WhatsAppLink";
import { WhatsAppIcon } from "./WhatsAppIcon";
import type { WhatsappIntent } from "@/lib/whatsapp";

const FIELD = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

/**
 * Barra fixa de WhatsApp no rodapé, só no celular (< 768 px). No celular ela
 * assume o papel do botão flutuante (WhatsAppFab, que a página esconde abaixo
 * de 768 px).
 *
 * - Sem animação, sem pulso e sem abertura automática.
 * - Safe area do iPhone no padding inferior.
 * - Reserva no fim da página o espaço da própria barra (altura medida, em
 *   --tf-bar-h), para o rodapé e seus links continuarem acessíveis.
 * - Convive com o banner de consentimento: o banner publica a altura em
 *   --tf-consent-h e a barra fica empilhada logo acima dele. Os dois podem ser
 *   lidos e acionados.
 * - Some (visibility) enquanto um campo de formulário está focado, para não
 *   disputar a área de digitação com o teclado virtual.
 */
export function MobileWhatsAppBar({
  intent,
  placement,
  label = "Falar com um engenheiro",
  ariaLabel = "Falar com um engenheiro pelo WhatsApp",
}: {
  intent: WhatsappIntent;
  placement: string;
  label?: string;
  ariaLabel?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const root = document.documentElement;
    const publish = () =>
      root.style.setProperty("--tf-bar-h", `${bar.getBoundingClientRect().height}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--tf-bar-h");
    };
  }, []);

  useEffect(() => {
    const onIn = (e: FocusEvent) => {
      if (e.target instanceof Element && e.target.matches(FIELD)) setTyping(true);
    };
    const onOut = (e: FocusEvent) => {
      const next = e.relatedTarget;
      if (next instanceof Element && next.matches(FIELD)) return;
      setTyping(false);
    };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  return (
    <>
      {/* Espaço reservado: barra + banner de consentimento, quando aberto. */}
      <div
        aria-hidden
        data-mobile-bar-spacer
        className="h-[calc(var(--tf-bar-h,calc(4.5rem+env(safe-area-inset-bottom)))+var(--tf-consent-h,0px))] md:hidden print:hidden"
      />
      <div
        ref={barRef}
        data-mobile-bar
        inert={typing}
        style={{ bottom: "var(--tf-consent-h, 0px)" }}
        className={`fixed inset-x-0 z-40 border-t border-brass/30 bg-espresso px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden print:hidden [:root[data-consent-open]_&]:pb-3 ${
          typing ? "invisible" : ""
        }`}
      >
        <WhatsAppLink
          intent={intent}
          placement={placement}
          aria-label={ariaLabel}
          className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-rose px-4 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-espresso hover:bg-rose-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment min-[360px]:text-sm min-[360px]:tracking-[0.03em]"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          {label}
        </WhatsAppLink>
      </div>
    </>
  );
}
