"use client";

import { useEffect, useState } from "react";
import { WhatsAppLink } from "./WhatsAppLink";
import type { WhatsappIntent } from "@/lib/whatsapp";

// Só aparece depois que o visitante começou a rolar: a primeira tela já tem o
// botão principal e o cabeçalho com o CTA.
const SCROLL_THRESHOLD = 360;

/**
 * Atalho flutuante para o WhatsApp, discreto de propósito:
 * - botão redondo pequeno, na paleta da marca (sem verde, sem pulso);
 * - respeita a safe area do iOS e fica longe da barra de navegação;
 * - sai de cena quando já há um CTA de WhatsApp da página (ou o rodapé) na
 *   tela, quando o banner de consentimento está aberto e antes da rolagem;
 * - `inert` enquanto escondido: não recebe foco nem toque.
 */
export function WhatsAppFab({
  intent = "institutional_general",
  placement = "home_fab",
  label = "Falar com a Town Fire pelo WhatsApp",
}: {
  intent?: WhatsappIntent;
  placement?: string;
  label?: string;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [coveredByPage, setCoveredByPage] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // O cabeçalho é fixo e tem seu próprio CTA: ele não conta como "coberto".
    const targets = [
      ...document.querySelectorAll<HTMLElement>(
        'main a[data-event="whatsapp_click"]'
      ),
      ...document.querySelectorAll<HTMLElement>("footer"),
    ];
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCoveredByPage(visible.size > 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const show = scrolled && !coveredByPage;

  return (
    <div
      inert={!show}
      data-fab
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-[calc(1.5rem+env(safe-area-inset-right))] print:hidden [:root[data-consent-open]_&]:pointer-events-none [:root[data-consent-open]_&]:opacity-0 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <WhatsAppLink
        intent={intent}
        placement={placement}
        aria-label={label}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/50 bg-espresso-2 text-rose shadow-[0_6px_18px_rgba(43,28,20,0.28)] transition-colors hover:bg-espresso hover:text-rose-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose sm:h-[52px] sm:w-[52px]"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          focusable="false"
          className="h-6 w-6 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </WhatsAppLink>
    </div>
  );
}
