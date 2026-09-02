import { whatsappHref } from "@/lib/site-config";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappHref(
        "Olá! Quero analisar a situação do meu imóvel com a Town Fire."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Town Fire no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-rose px-5 py-3.5 font-body text-sm font-semibold text-espresso shadow-[0_12px_28px_-8px_rgba(43,28,20,0.55)] transition-transform hover:scale-[1.03] hover:bg-rose-strong"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.86.5 3.6 1.4 5.1L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.5 22 22 17.52 22 12S17.5 2 12.02 2Zm5.72 14.24c-.24.68-1.4 1.3-1.94 1.36-.5.06-1.12.09-1.8-.11-.42-.13-.96-.3-1.66-.6-2.92-1.26-4.82-4.2-4.97-4.4-.15-.2-1.2-1.6-1.2-3.06 0-1.46.77-2.17 1.04-2.47.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.24.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.61.17.3.75 1.25 1.62 2.03 1.11 1 2.05 1.31 2.35 1.46.3.15.47.13.65-.08.18-.21.75-.87.95-1.17.2-.3.4-.25.65-.15.26.1 1.65.79 1.93.93.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
      </svg>
      WhatsApp
    </a>
  );
}
