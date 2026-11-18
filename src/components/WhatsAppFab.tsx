"use client";

import { useEffect, useState } from "react";
import { WhatsAppLink } from "./WhatsAppLink";
import { WhatsAppIcon } from "./WhatsAppIcon";
import type { WhatsappIntent } from "@/lib/whatsapp";

// Só aparece depois que o visitante começou a rolar: a primeira tela já tem o
// botão principal e o cabeçalho com o CTA.
const SCROLL_THRESHOLD = 360;

/**
 * Atalho flutuante para o WhatsApp, discreto de propósito:
 * - botão redondo pequeno, na paleta da marca (sem verde, sem pulso);
 * - respeita a safe area do iOS e fica longe da barra de navegação;
 * - fica visível durante toda a rolagem; só sai de cena no topo da página,
 *   quando o rodapé está na tela (para não cobrir os contatos) e enquanto o
 *   banner de consentimento está aberto;
 * - `inert` enquanto escondido: não recebe foco nem toque.
 */
export function WhatsAppFab({
  intent = "institutional_general",
  placement = "home_fab",
  label = "Falar com a Town Fire pelo WhatsApp",
  hideOnMobile = false,
}: {
  intent?: WhatsappIntent;
  placement?: string;
  label?: string;
  // Esconde abaixo de 768 px, quando a página usa a barra fixa no lugar dele.
  hideOnMobile?: boolean;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) =>
      setFooterInView(entry.isIntersecting)
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const show = scrolled && !footerInView;

  return (
    <div
      inert={!show}
      data-fab
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-[calc(1.5rem+env(safe-area-inset-right))] print:hidden ${hideOnMobile ? "max-md:hidden" : ""} [:root[data-consent-open]_&]:pointer-events-none [:root[data-consent-open]_&]:opacity-0 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <WhatsAppLink
        intent={intent}
        placement={placement}
        aria-label={label}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/50 bg-espresso-2 text-rose shadow-[0_6px_18px_rgba(43,28,20,0.28)] transition-colors hover:bg-espresso hover:text-rose-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose sm:h-[52px] sm:w-[52px]"
      >
        <WhatsAppIcon />
      </WhatsAppLink>
    </div>
  );
}
