// Regras editoriais do blog. Rodam no build (via getAllPosts em blog.ts): um
// post que viole qualquer regra derruba o `next build`, o deploy da Vercel
// fica vermelho e o PR não é mesclado. É o que torna a publicação automática
// segura num site de regularização de bombeiros, onde um dado errado
// (norma, prazo, valor, culpa de terceiros) vira problema real.
//
// Princípio: o blog explica o caminho e nunca afirma o que não foi
// confirmado. Número de norma, prazo, preço e área só entram se estiverem na
// lista de confirmados abaixo; o resto o leitor confere na fonte oficial.

export const CATEGORY_LABELS = {
  regularizacao: "Regularização",
  "projeto-pscip": "Projeto e PSCIP",
  cercon: "CERCON",
  comercio: "Comércio",
  "veiculos-eletricos": "Veículos elétricos",
  fotovoltaico: "Fotovoltaico",
  "vistoria-laudo": "Vistoria e laudo",
  noticia: "Na notícia",
} as const;
export type CategoryKey = keyof typeof CATEGORY_LABELS;

// Normas confirmadas nas páginas de serviço do site (com link oficial).
// Para liberar outra, confirme o número na fonte oficial e acrescente aqui.
export const KNOWN_NORMS = ["NT-01/2026", "NT-44/2025", "NT-45/2026"];

// Hosts aceitos nas fontes e nos links externos do corpo do texto.
const ALLOWED_HOST_SUFFIXES = [".gov.br", "abnt.org.br", "townfire.com.br"];

const BANNED_PHRASES: Array<[RegExp, string]> = [
  [/garantia de aprova/i, "promessa de aprovação"],
  [/aprova[cç][aã]o garantida/i, "promessa de aprovação"],
  [/100\s?%\s*garantid/i, "promessa absoluta"],
  [/somos especialistas/i, "frase vazia de marca"],
  [/equipe altamente qualificada/i, "frase vazia de marca"],
  [/somos refer[eê]ncia/i, "frase vazia de marca"],
  [/qualidade,\s*inova[cç][aã]o/i, "frase vazia de marca"],
  [/\bexcel[eê]ncia\b/i, "frase vazia de marca"],
  // Culpa e acusação a terceiros: o blog nunca aponta culpados.
  [/\b(neglig[eê]nci\w*|neglig[eê]nte|culpad[oa]s?|culpa|irrespons[aá]ve\w*|criminos\w*|omiss[aã]o)\b/i, "acusação a terceiros"],
];

// Cacoetes de texto genérico. Falhar aqui força um texto direto e natural.
const GENERIC_PHRASES: RegExp[] = [
  /[eé] importante ressaltar/i,
  /vale (a pena )?(ressaltar|destacar|lembrar que)/i,
  /\bem resumo\b/i,
  /\bem suma\b/i,
  /no mundo atual/i,
  /nos dias de hoje/i,
  /em um cen[aá]rio/i,
  /mergulh(e|ar|amos)/i,
  /desvend(ar|ando|e)/i,
  /neste (artigo|guia|post)[, ]+(vamos|voc[eê] vai|iremos)/i,
  /sem mais delongas/i,
  /\bdescubra (como|tudo|os segredos|o segredo|agora)/i,
  /fique por dentro/i,
  /n[aã]o [eé] segredo/i,
  /de forma (eficaz|eficiente|robusta)/i,
  /\brobust[oa]s?\b/i,
  /\bplenamente\b/i,
  /\bpotencializ\w+/i,
  /\balavanc\w+/i,
  /jornada rumo/i,
  /\bcrucial\b/i,
  /\bfundamental\b/i,
];

export type RawFrontmatter = {
  title?: unknown;
  description?: unknown;
  date?: unknown;
  updated?: unknown;
  category?: unknown;
  format?: unknown;
  keywords?: unknown;
  intent?: unknown;
  summary?: unknown;
  faq?: unknown;
  sources?: unknown;
  news?: unknown;
};

export type PostInput = {
  slug: string;
  fm: RawFrontmatter;
  body: string;
  knownRoutes: Set<string>;
  intents: string[];
  now: Date;
};

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

const words = (s: string) => s.split(/\s+/).filter(Boolean);

function isIso(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function hostAllowed(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    return ALLOWED_HOST_SUFFIXES.some(
      (suffix) => u.hostname === suffix.replace(/^\./, "") || u.hostname.endsWith(suffix)
    );
  } catch {
    return false;
  }
}

export function validatePost({ slug, fm, body, knownRoutes, intents, now }: PostInput): string[] {
  const e: string[] = [];
  const err = (m: string) => e.push(m);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) err(`slug "${slug}" deve ser kebab-case ASCII`);

  // --- metadados ---
  const title = typeof fm.title === "string" ? fm.title : "";
  const description = typeof fm.description === "string" ? fm.description : "";
  if (title.length < 30 || title.length > 70) err(`title deve ter 30-70 caracteres (tem ${title.length})`);
  if (description.length < 110 || description.length > 165)
    err(`description deve ter 110-165 caracteres (tem ${description.length})`);

  if (!isIso(fm.date)) err("date deve ser uma string ISO entre aspas (AAAA-MM-DD)");
  else {
    const d = new Date(`${fm.date}T12:00:00Z`);
    if (d.getTime() > now.getTime() + 36 * 3600 * 1000) err(`date ${fm.date} está no futuro`);
  }
  if (fm.updated !== undefined) {
    if (!isIso(fm.updated)) err("updated deve ser AAAA-MM-DD entre aspas");
    else if (isIso(fm.date) && fm.updated < fm.date) err("updated não pode ser anterior a date");
  }

  if (typeof fm.category !== "string" || !(fm.category in CATEGORY_LABELS))
    err(`category inválida (use: ${Object.keys(CATEGORY_LABELS).join(", ")})`);
  const format = fm.format;
  if (format !== "guia" && format !== "noticia") err('format deve ser "guia" ou "noticia"');
  if (format === "noticia" && fm.category !== "noticia") err('posts format "noticia" usam category "noticia"');
  if (format === "guia" && fm.category === "noticia") err('category "noticia" é só para format "noticia"');

  if (typeof fm.intent !== "string" || !intents.includes(fm.intent))
    err(`intent inválido (use: ${intents.join(", ")})`);

  const rawKeywords = Array.isArray(fm.keywords) ? fm.keywords : [];
  const keywords = rawKeywords.filter((k) => typeof k === "string");
  if (keywords.length !== rawKeywords.length)
    err('keywords: todo item deve ser texto (coloque entre aspas se tiver ":")');
  if (keywords.length < 3 || keywords.length > 8) err("keywords: de 3 a 8 itens (a primeira é a principal)");

  const rawSummary = Array.isArray(fm.summary) ? fm.summary : [];
  const summary = rawSummary.filter((k) => typeof k === "string");
  if (summary.length !== rawSummary.length)
    err('summary: todo passo deve ser texto (coloque entre aspas se tiver ":")');
  if (summary.length < 3 || summary.length > 8) err("summary: de 3 a 8 passos curtos");
  if (summary.some((s) => (s as string).length > 90)) err("summary: cada passo com até 90 caracteres");

  const faq = Array.isArray(fm.faq) ? (fm.faq as Array<{ q?: unknown; a?: unknown }>) : [];
  if (faq.length < 3 || faq.length > 5) err("faq: de 3 a 5 perguntas");
  faq.forEach((f, i) => {
    const q = typeof f.q === "string" ? f.q : "";
    const a = typeof f.a === "string" ? f.a : "";
    if (!q || q.length > 120) err(`faq[${i}].q vazia ou acima de 120 caracteres`);
    if (a.length < 40 || a.length > 420) err(`faq[${i}].a deve ter 40-420 caracteres`);
  });

  const sources = Array.isArray(fm.sources) ? (fm.sources as Array<{ label?: unknown; url?: unknown }>) : [];
  if (sources.length < 1) err("sources: pelo menos 1 fonte oficial");
  sources.forEach((s, i) => {
    if (typeof s.label !== "string" || !s.label) err(`sources[${i}].label ausente`);
    if (typeof s.url !== "string" || !hostAllowed(s.url))
      err(`sources[${i}].url deve ser https de domínio .gov.br, abnt.org.br ou townfire.com.br`);
  });

  // --- notícia: fonte guardada só nos metadados, nunca exibida ---
  if (format === "noticia") {
    const n = fm.news as { date?: unknown; place?: unknown; sourceUrl?: unknown } | undefined;
    if (!n || typeof n !== "object") err("news ausente (date, place, sourceUrl)");
    else {
      if (!isIso(n.date)) err("news.date deve ser AAAA-MM-DD entre aspas");
      else if (isIso(fm.date)) {
        const diff = (new Date(`${fm.date}T12:00:00Z`).getTime() - new Date(`${n.date}T12:00:00Z`).getTime()) / 86400000;
        if (diff < 0) err("news.date posterior à date do post");
        if (diff > 120) err("news.date com mais de 120 dias: a notícia precisa ser recente");
      }
      if (typeof n.place !== "string" || n.place.trim().length < 3) err("news.place (cidade/UF) ausente");
      if (typeof n.sourceUrl !== "string" || !/^https:\/\//.test(n.sourceUrl))
        err("news.sourceUrl deve ser https (guardada para auditoria, não aparece no site)");
    }
    if (!/(noticiad|noticiou|segundo a imprensa|a imprensa)/i.test(body))
      err('post de notícia deve atribuir o fato de forma geral ("a imprensa noticiou", "segundo a imprensa")');
    // Nunca afirmar causa: ou o texto diz que a causa não está confirmada, ou a
    // notícia não entra.
    if (!/(causa[^.]{0,60}(investig|apurad|per[ií]cia|n[aã]o (foi|estava|est[aá]|era)\s+(confirmad|divulgad|conhecid)|ainda n[aã]o)|ainda n[aã]o se sabe)/i.test(body))
      err("post de notícia deve dizer que a causa ainda não está confirmada (nunca afirme causa)");
    // Nunca comentar a situação legal do imóvel do caso noticiado: seria
    // acusação sem prova.
    const legal = body.match(/(vencid[oa]s?|sem (avcb|cercon|alvar[aá]|licen[cç]a|certificado)|irregular\w*|clandestin\w*|descumpr\w*)/i);
    if (legal) err(`post de notícia não comenta a situação legal do imóvel do caso ("${legal[0]}")`);
  }

  // --- corpo ---
  const text = body.replace(/```[\s\S]*?```/g, " ");
  const plain = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]/g, " ");
  const wc = words(plain).length;
  if (wc < 800) err(`corpo com ${wc} palavras (mínimo 800)`);
  if (wc > 2600) err(`corpo com ${wc} palavras (máximo 2600)`);

  const h2 = (body.match(/^## .+$/gm) ?? []).length;
  if (h2 < 4) err(`use pelo menos 4 títulos "##" (tem ${h2})`);
  if (/^# [^#]/m.test(body)) err('não use "#" no corpo: o título da página já é o H1');
  if (!/^\s*1\. /m.test(body)) err("inclua ao menos uma lista numerada (passo a passo)");

  if (keywords[0]) {
    const k = norm(keywords[0] as string);
    if (!norm(title).includes(k) && !norm(description).includes(k))
      err("a palavra-chave principal (keywords[0]) deve aparecer no title ou na description");
    const first = norm(words(plain).slice(0, 170).join(" "));
    if (!first.includes(k)) err("a palavra-chave principal deve aparecer nas primeiras 170 palavras");
  }

  // legibilidade: frases curtas
  const sentences = plain.split(/[.!?]+(?:\s|$)/).map((s) => words(s).length).filter((n) => n > 2);
  const avg = sentences.reduce((a, b) => a + b, 0) / Math.max(sentences.length, 1);
  if (avg > 23) err(`frases longas demais: média de ${avg.toFixed(1)} palavras (máximo 23). Quebre as frases.`);

  const dashes = (body.match(/—/g) ?? []).length;
  if (dashes > 6) err(`${dashes} travessões (—) no corpo; máximo 6. Use vírgula ou ponto.`);
  if (/!/.test(plain)) err("sem exclamações no corpo");
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(body)) err("sem emojis no corpo");

  for (const [re, why] of BANNED_PHRASES) {
    const m = body.match(re) ?? description.match(re) ?? title.match(re);
    if (m) err(`trecho proibido "${m[0]}" (${why})`);
  }
  for (const re of GENERIC_PHRASES) {
    const m = body.match(re);
    if (m) err(`cacoete de texto genérico: "${m[0]}". Reescreva de forma direta.`);
  }

  // dados que não podem ser inventados
  if (/R\$/.test(body)) err("sem valores em reais (preço não é publicado)");
  const num = body.match(/\b\d+\s*(dias?|semanas?|meses|m[eê]s|anos?)\b/i);
  if (num) err(`sem prazo numérico ("${num[0]}"). Diga que o prazo está no documento ou na norma vigente.`);
  const area = body.match(/\b\d+([.,]\d+)?\s*(m²|m2|metros quadrados)/i);
  if (area) err(`sem limite de área numérico ("${area[0]}")`);

  const normRefs = [...body.matchAll(/\bNT[-\s]?(\d{1,3})\s*\/\s*(\d{4})/gi)].map(
    (m) => `NT-${m[1].padStart(2, "0")}/${m[2]}`
  );
  for (const r of new Set(normRefs)) if (!KNOWN_NORMS.includes(r)) err(`norma ${r} não está na lista de confirmadas (blog-rules.ts)`);
  const law = body.match(/\b(Lei|Decreto|Portaria|Resolu[cç][aã]o|Instru[cç][aã]o Normativa)\b\s*(n[ºo°.]*\s*)?\d/i);
  if (law) err(`citação legal "${law[0]}" não confirmada. Remeta o leitor à fonte oficial sem citar o número.`);

  // links do corpo
  for (const m of body.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const url = m[1];
    if (url.startsWith("/")) {
      const p = url.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
      if (!knownRoutes.has(p)) err(`link interno desconhecido: ${url}`);
    } else if (/^https?:\/\//.test(url)) {
      if (!hostAllowed(url)) err(`link externo não permitido: ${url}`);
    } else if (!url.startsWith("#") && !url.startsWith("mailto:")) err(`link inválido: ${url}`);
  }
  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g))
    if (!/^\/blog\/img\/[a-z0-9-]+\.(svg|png|jpg|webp)$/.test(m[1])) err(`imagem fora de /blog/img/: ${m[1]}`);

  return e;
}
