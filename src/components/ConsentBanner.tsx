"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_REOPEN_EVENT,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/consent";

/**
 * Banner de consentimento de medição — discreto, duas escolhas com peso
 * visual equivalente (sem dark pattern), reaberto pelo link "Preferências
 * de privacidade" do footer via CONSENT_REOPEN_EVENT.
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // localStorage só existe no cliente: decidir a visibilidade inicial no
    // render (server ou lazy initializer) causaria mismatch de hidratação,
    // então a leitura tem que acontecer aqui, uma vez, após montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(getStoredConsent() === null);

    const onReopen = () => setOpen(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
  }, []);

  if (!open) return null;

  function choose(value: "granted" | "denied") {
    setStoredConsent(value);
    setOpen(false);
  }

  return (
    <div
      role="region"
      aria-label="Preferências de privacidade"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brass/30 bg-espresso text-parchment"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="max-w-xl text-sm leading-relaxed text-parchment/80">
          Usamos medição do Google para entender como o site é utilizado e
          quais canais geram contatos. Você pode permitir essa medição ou
          continuar sem ela.{" "}
          <Link
            href="/politica-de-privacidade"
            className="underline decoration-parchment/40 underline-offset-2 hover:text-white"
          >
            Política de Privacidade
          </Link>
          .
        </p>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {/* Peso visual equivalente entre as duas escolhas: ambos os
              botões são preenchidos e com borda, mesmo tamanho de fonte e
              altura — só a cor muda. Nada de "outline fraco vs. preenchido
              forte", que leria como a recusa estar escondida. */}
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-parchment/40 bg-parchment/10 px-5 font-display text-xs font-semibold uppercase tracking-[0.04em] text-parchment transition-colors hover:bg-parchment/15"
          >
            Continuar sem medição
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-rose bg-rose px-5 font-display text-xs font-semibold uppercase tracking-[0.04em] text-espresso transition-colors hover:bg-rose-strong"
          >
            Permitir medição
          </button>
        </div>
      </div>
    </div>
  );
}
