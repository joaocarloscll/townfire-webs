// Consentimento de medição (Google Consent Mode v2).
//
// Duas finalidades independentes, escolhidas pelo visitante:
//   A. analytics: análise de utilização do site (Google Analytics).
//   B. ads: medição dos anúncios do Google e dos contatos que eles geram.
// A personalização de anúncios (ad_personalization) não é pedida e fica sempre
// "denied". O contato pelo WhatsApp não depende de nenhuma escolha.
//
// Modo de operação (inalterado): básico, controlado pelo código do site. Os
// quatro sinais começam "denied" antes de qualquer script do Google; o
// GTM/gtag.js só é carregado depois que ao menos uma finalidade é permitida.

export const CONSENT_STORAGE_KEY = "townfire-consent-v2";
// Chave antiga (uma única opção "medição", só Analytics). Lida apenas para
// preservar a finalidade que ela de fato autorizava.
export const LEGACY_CONSENT_STORAGE_KEY = "townfire-consent-v1";
// Versão do aviso. Sobe quando as finalidades ou o texto mudam de forma que
// exija nova escolha.
export const CONSENT_NOTICE_VERSION = 2;

export type ConsentChoice = { analytics: boolean; ads: boolean };
export type ConsentState = { choice: ConsentChoice; legacy: boolean };

export type ConsentSignals = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "denied";
};

// Evento disparado sempre que a escolha muda (banner ou painel de preferências).
export const CONSENT_CHANGE_EVENT = "townfire:consent-change";
// Evento disparado pelo link "Preferências de privacidade" do rodapé para
// abrir o painel de preferências, mesmo depois de uma escolha já salva.
export const CONSENT_REOPEN_EVENT = "townfire:consent-reopen";

export const NO_CONSENT: ConsentChoice = { analytics: false, ads: false };

/** Mapeamento único entre finalidades escolhidas e os quatro sinais do Google. */
export function consentSignals(choice: ConsentChoice | null): ConsentSignals {
  const analytics = choice?.analytics === true;
  const ads = choice?.ads === true;
  return {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: "denied",
  };
}

export function hasAnyConsent(choice: ConsentChoice | null | undefined): boolean {
  return !!choice && (choice.analytics || choice.ads);
}

// Escolha desta sessão. Garante que o site e a medição autorizada continuem
// funcionando mesmo com o armazenamento do navegador indisponível.
let memoryState: ConsentState | null | undefined;

function readStored(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      const v = JSON.parse(raw) as Partial<ConsentChoice> & { version?: number };
      if (
        v.version === CONSENT_NOTICE_VERSION &&
        typeof v.analytics === "boolean" &&
        typeof v.ads === "boolean"
      ) {
        return { choice: { analytics: v.analytics, ads: v.ads }, legacy: false };
      }
    }
    // Escolha antiga: só Analytics era autorizado ("granted"); publicidade nunca.
    const legacy = window.localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
    if (legacy === "granted" || legacy === "denied") {
      return { choice: { analytics: legacy === "granted", ads: false }, legacy: true };
    }
  } catch {
    // Armazenamento indisponível ou conteúdo inválido: sem escolha salva.
  }
  return null;
}

/** Escolha vigente (memória da sessão primeiro, depois o armazenamento). */
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  if (memoryState !== undefined) return memoryState;
  return readStored();
}

export function saveConsent(choice: ConsentChoice) {
  memoryState = { choice: { analytics: choice.analytics, ads: choice.ads }, legacy: false };
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        version: CONSENT_NOTICE_VERSION,
        analytics: choice.analytics,
        ads: choice.ads,
        decidedAt: new Date().toISOString(),
      })
    );
    window.localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
  } catch {
    // Sem localStorage (modo privado etc.): a escolha vale para a sessão atual.
  }
  window.dispatchEvent(
    new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: memoryState.choice })
  );
}

export function requestConsentReopen() {
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}

/**
 * Script inline do <head>: roda antes de qualquer script do Google e antes da
 * hidratação. Define o estado padrão ("denied" nos quatro sinais) e, se houver
 * escolha válida salva, restaura-a com `consent update` na mesma ordem, antes
 * de qualquer evento. Mantém as mesmas regras de `consentSignals` e da leitura
 * acima (testado em docs/tracking-architecture.md, cenários H e G).
 */
export const CONSENT_BOOTSTRAP_SCRIPT = `(function(){var w=window,k=${JSON.stringify(
  CONSENT_STORAGE_KEY
)},o=${JSON.stringify(LEGACY_CONSENT_STORAGE_KEY)},c=null;w.dataLayer=w.dataLayer||[];w.gtag=w.gtag||function(){w.dataLayer.push(arguments)};function s(a,d){return{analytics_storage:a?"granted":"denied",ad_storage:d?"granted":"denied",ad_user_data:d?"granted":"denied",ad_personalization:"denied"}}try{var v=JSON.parse(w.localStorage.getItem(k)||"null");if(v&&v.version===${CONSENT_NOTICE_VERSION}&&typeof v.analytics==="boolean"&&typeof v.ads==="boolean")c=v;else if(w.localStorage.getItem(o)==="granted")c={analytics:true,ads:false}}catch(e){}w.gtag("consent","default",s(false,false));if(c)w.gtag("consent","update",s(c.analytics,c.ads))})();`;
