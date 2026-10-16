"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, GTM_ID } from "@/lib/site-config";
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

// Expira os cookies do GA4. gtag.js grava esses cookies com o domínio
// "pontuado" (ex.: .townfire.com.br), que cobre apex + www — por isso a
// limpeza tenta tanto o host atual quanto essa variante. Nunca mexe em
// cookies de google.com (fora do alcance do site) nem em outros cookies.
function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter(Boolean);
  const isAnalyticsCookie = (name: string) =>
    name === "_ga" || name === "_gid" || name.startsWith("_ga_");

  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const host = window.location.hostname;
  const dotDomain = host.includes(".") ? `.${host}` : null;

  for (const name of names) {
    if (!isAnalyticsCookie(name)) continue;
    document.cookie = `${name}=; ${expired}; path=/`;
    if (dotDomain) {
      document.cookie = `${name}=; ${expired}; path=/; domain=${dotDomain}`;
    }
  }
}

/**
 * GA4 sob Google Consent Mode v2: define os quatro sinais como "denied" por
 * padrão assim que a página carrega (antes de qualquer script do Google),
 * e só carrega o gtag.js quando o visitante permite medição. Publicidade
 * (ad_storage/ad_user_data/ad_personalization) fica sempre "denied" até
 * existir uma categoria de publicidade no banner (ver
 * docs/tracking-architecture.md).
 *
 * Revogação (granted → denied): abordagem conservadora. gtag.js, uma vez
 * carregado, continua executando na página atual — atualizar o sinal de
 * consentimento não descarrega o script. Por isso, quando a revogação
 * acontece DEPOIS que o script já rodou nesta página, recarregamos uma
 * única vez: a página volta a carregar já com "denied" salvo, então o
 * gtag.js nem chega a ser requisitado. Sem reload em loop — só dispara
 * quando `scriptLoadedRef` é true, e o valor reseta a cada carregamento
 * novo (contexto de JS novo).
 */
export function Analytics() {
  const [loadScript, setLoadScript] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        // O gtag.js e o GTM só reconhecem comandos empurrados como o objeto
        // `arguments`; um array (rest args) é ignorado silenciosamente.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
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
        scriptLoadedRef.current = true;
        setLoadScript(true);
      } else if (value === "denied") {
        window.gtag("consent", "update", { analytics_storage: "denied" });
        clearAnalyticsCookies();
        if (scriptLoadedRef.current) {
          window.location.reload();
        }
      }
    };

    applyConsent(getStoredConsent());

    const onChange = (event: Event) =>
      applyConsent((event as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!loadScript) return null;

  // Com GTM, o container carrega no lugar do gtag.js e o GA4 passa a ser
  // configurado lá dentro (tag de configuração do GA4 no container).
  if (GTM_ID) {
    return (
      <Script id="gtm-container" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    );
  }

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
