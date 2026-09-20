// Consentimento de medição (GA4). Duas categorias apenas: necessários
// (sempre ativos, não geram cookie próprio) e medição (opcional). Categoria
// de publicidade só entra quando Google Ads/GTM existirem de fato.
export const CONSENT_STORAGE_KEY = "townfire-consent-v1";
export type ConsentValue = "granted" | "denied";

// Evento disparado sempre que a escolha de consentimento muda (banner ou
// painel de preferências reaberto pelo footer) — Analytics.tsx escuta para
// carregar/atualizar o GA4 sem precisar recarregar a página.
export const CONSENT_CHANGE_EVENT = "townfire:consent-change";
// Evento disparado pelo link "Preferências de privacidade" do footer para
// reabrir o painel mesmo depois de uma escolha já salva.
export const CONSENT_REOPEN_EVENT = "townfire:consent-reopen";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Sem localStorage (modo privado etc.): a escolha só vale para a sessão
    // atual via o evento abaixo, sem quebrar a navegação.
  }
  window.dispatchEvent(
    new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value })
  );
}

export function requestConsentReopen() {
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}
