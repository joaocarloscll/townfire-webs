"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/site-config";
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
  type ConsentValue,
} from "@/lib/consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Expira os cookies do GA4 no domínio atual (o único ao alcance do site —
// não existe acesso a cookies de outros domínios/subdomínios do Google).
function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter(Boolean);
  for (const name of names) {
    if (name === "_ga" || name === "_gid" || name.startsWith("_ga_")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

/**
 * GA4 sob Google Consent Mode v2: define os quatro sinais como "denied" por
 * padrão assim que a página carrega (antes de qualquer script do Google),
 * e só carrega o gtag.js quando o visitante permite medição. Publicidade
 * (ad_storage/ad_user_data/ad_personalization) fica sempre "denied" nesta
 * etapa — não existe Google Ads/GTM ainda.
 */
export function Analytics() {
  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };

    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    const applyConsent = (value: ConsentValue | null) => {
      if (value === "granted") {
        window.gtag("consent", "update", { analytics_storage: "granted" });
        setLoadScript(true);
      } else if (value === "denied") {
        window.gtag("consent", "update", { analytics_storage: "denied" });
        clearAnalyticsCookies();
      }
    };

    applyConsent(getStoredConsent());

    const onChange = (event: Event) =>
      applyConsent((event as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  // O script, uma vez carregado, permanece montado: revogar consentimento
  // atualiza o sinal (acima) em vez de remover a tag — é assim que o
  // Consent Mode do Google é projetado para funcionar.
  if (!loadScript) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        window.gtag("js", new Date());
        window.gtag("config", GA_MEASUREMENT_ID);
      }}
    />
  );
}
