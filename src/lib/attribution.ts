// Parâmetros de identificação de acesso vindos do anúncio: identificadores de
// clique do Google (gclid, gbraid, wbraid) e UTMs.
//
// Regras de tratamento (ver docs/tracking-architecture.md):
// - Antes de qualquer escolha, os valores só ficam na memória da página (não
//   são gravados nem enviados), para sobreviver à navegação interna do site.
// - UTMs só são gravados (sessionStorage) com alguma medição permitida.
// - Identificadores de clique só são gravados, enviados ao /go/whatsapp ou
//   devolvidos à URL com a medição de anúncios permitida.
// - Revogar a finalidade apaga o que ela autorizava.
import { hasAnyConsent, type ConsentChoice } from "@/lib/consent";

export const CLICK_ID_PARAMS = ["gclid", "gbraid", "wbraid"] as const;
export const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const STORAGE_KEY = "townfire-attribution-v1";
const MAX_VALUE_LENGTH = 200;

type Params = Record<string, string>;

let memory: Params = {};

const isClickId = (key: string) => (CLICK_ID_PARAMS as readonly string[]).includes(key);
const isTracked = (key: string) =>
  isClickId(key) || (UTM_PARAMS as readonly string[]).includes(key);

function clean(value: string | null): string | null {
  if (!value) return null;
  const v = value.trim().slice(0, MAX_VALUE_LENGTH);
  return /^[\w.~%+\-:|/ ]+$/.test(v) ? v : null;
}

function readStorage(): Params {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Params) : {};
    const out: Params = {};
    for (const [k, v] of Object.entries(parsed)) if (isTracked(k) && typeof v === "string") out[k] = v;
    return out;
  } catch {
    return {};
  }
}

function writeStorage(params: Params) {
  try {
    if (Object.keys(params).length === 0) window.sessionStorage.removeItem(STORAGE_KEY);
    else window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // Armazenamento indisponível: segue só com a memória da página.
  }
}

/** Parâmetros que a escolha atual permite usar. */
function allowed(params: Params, choice: ConsentChoice | null): Params {
  const out: Params = {};
  for (const [k, v] of Object.entries(params)) {
    if (isClickId(k) ? choice?.ads : hasAnyConsent(choice)) out[k] = v;
  }
  return out;
}

/** Lê a URL atual e guarda em memória o que a página trouxe do anúncio. */
export function captureFromUrl() {
  if (typeof window === "undefined") return;
  const search = new URLSearchParams(window.location.search);
  for (const key of [...CLICK_ID_PARAMS, ...UTM_PARAMS]) {
    const v = clean(search.get(key));
    if (v) memory[key] = v;
  }
}

/** Grava (sessionStorage) apenas o que a escolha permite; remove o resto. */
export function syncStorage(choice: ConsentChoice | null) {
  if (typeof window === "undefined") return;
  writeStorage(allowed({ ...readStorage(), ...memory }, choice));
}

/** Apaga o que a finalidade retirada autorizava, em memória e no armazenamento. */
export function dropRevoked(choice: ConsentChoice | null) {
  memory = allowed(memory, choice);
  syncStorage(choice);
}

/** Parâmetros disponíveis agora para a escolha atual. */
export function currentAttribution(choice: ConsentChoice | null): Params {
  return allowed({ ...readStorage(), ...memory }, choice);
}

/**
 * Acrescenta ao href de um link interno os parâmetros permitidos que ele ainda
 * não tem (sem duplicar nem sobrescrever).
 */
export function withAttribution(href: string, choice: ConsentChoice | null): string {
  const [path, query = ""] = href.split("?");
  const search = new URLSearchParams(query);
  for (const [k, v] of Object.entries(currentAttribution(choice))) {
    if (!search.has(k)) search.set(k, v);
  }
  const qs = search.toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * Com a medição de anúncios permitida, devolve à URL da página os
 * identificadores de clique que a navegação interna descartou, antes de o
 * Google carregar, para que a tag do Google os leia. Não toca em outros
 * parâmetros nem recarrega a página.
 */
export function restoreClickIdsToUrl(choice: ConsentChoice | null) {
  if (typeof window === "undefined" || !choice?.ads) return;
  const url = new URL(window.location.href);
  let changed = false;
  const known = currentAttribution(choice);
  for (const key of [...CLICK_ID_PARAMS, ...UTM_PARAMS]) {
    if (known[key] && !url.searchParams.has(key)) {
      url.searchParams.set(key, known[key]);
      changed = true;
    }
  }
  if (changed) window.history.replaceState(window.history.state, "", url.toString());
}

/** Somente para testes. */
export function resetAttributionMemory() {
  memory = {};
}
