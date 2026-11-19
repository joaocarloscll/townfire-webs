"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, GTM_ID } from "@/lib/site-config";
import {
  CONSENT_CHANGE_EVENT,
  consentSignals,
  hasAnyConsent,
  readConsent,
  type ConsentChoice,
} from "@/lib/consent";
import {
  captureFromUrl,
  dropRevoked,
  restoreClickIdsToUrl,
  syncStorage,
} from "@/lib/attribution";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const EXPIRED = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

// Expira cookies do Google gravados por este site. O gtag.js usa o domínio
// "pontuado" (ex.: .townfire.com.br), que cobre apex + www; por isso a limpeza
// tenta o host atual e essa variante. Nunca mexe em cookies de google.com.
function expireCookies(matches: (name: string) => boolean) {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter(Boolean);
  const host = window.location.hostname;
  const dotDomain = host.includes(".") ? `.${host}` : null;
  for (const name of names) {
    if (!matches(name)) continue;
    document.cookie = `${name}=; ${EXPIRED}; path=/`;
    if (dotDomain) document.cookie = `${name}=; ${EXPIRED}; path=/; domain=${dotDomain}`;
  }
}

const clearAnalyticsCookies = () =>
  expireCookies((n) => n === "_ga" || n === "_gid" || n.startsWith("_ga_") || n.startsWith("_gat"));

// Cookies de medição de anúncios do Google (conversões e identificadores de clique).
const clearAdsCookies = () =>
  expireCookies((n) => n.startsWith("_gcl_") || n.startsWith("_gac_"));

/**
 * Google Consent Mode v2, modo básico controlado pelo código do site.
 *
 * Quem define o estado inicial é o script inline do <head>
 * (CONSENT_BOOTSTRAP_SCRIPT): `consent default` com os quatro sinais "denied"
 * e, havendo escolha válida salva, `consent update` — tudo antes de qualquer
 * script do Google. Este componente só reage a mudanças (um único dono dos
 * sinais) e carrega o GTM, ou o gtag.js se não houver GTM, quando ao menos uma
 * finalidade é permitida. Ordem: default → update → carregamento → eventos.
 *
 * Revogação: os sinais são atualizados na hora, os cookies da finalidade
 * retirada são apagados e os identificadores de campanha dela são descartados.
 * Se nenhuma finalidade sobrar e as tags já tinham carregado nesta página,
 * recarrega uma única vez: a página volta já com "denied" e o Google nem é
 * requisitado (gtag.js/GTM carregados não se descarregam).
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

    captureFromUrl();

    const load = (choice: ConsentChoice) => {
      syncStorage(choice);
      if (choice.ads) restoreClickIdsToUrl(choice);
      scriptLoadedRef.current = true;
      setLoadScript(true);
    };

    // Restauração: o script do <head> já aplicou default + update. Aqui só se
    // carrega a tag, depois de captureFromUrl e com a URL já completa.
    let applied: ConsentChoice | null = readConsent()?.choice ?? null;
    if (hasAnyConsent(applied)) load(applied as ConsentChoice);

    const onChange = (event: Event) => {
      const next = (event as CustomEvent<ConsentChoice>).detail;
      const prev = applied;
      applied = next;

      // 1. Sinais atualizados antes de qualquer carregamento ou evento.
      window.gtag("consent", "update", consentSignals(next));

      // 2. O que foi retirado deixa de existir no navegador.
      if (prev?.analytics && !next.analytics) clearAnalyticsCookies();
      if (prev?.ads && !next.ads) clearAdsCookies();
      if (!next.analytics && !next.ads) {
        clearAnalyticsCookies();
        clearAdsCookies();
      }
      dropRevoked(next);

      // 3. Carrega a tag, ou volta ao estado sem Google.
      if (hasAnyConsent(next)) load(next);
      else if (scriptLoadedRef.current) window.location.reload();
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!loadScript) return null;

  // Com GTM, o container carrega no lugar do gtag.js e o GA4 é configurado lá
  // dentro. Não existe outro carregamento de GTM ou GA4 no site.
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
