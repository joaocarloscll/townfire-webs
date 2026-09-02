// Domínio final ainda não definido — trocar antes de publicar (afeta SEO,
// OG tags, sitemap e JSON-LD).
export const SITE_URL = "https://townfire.com.br";

// Dados operacionais reais ainda não confirmados pelo cliente (ver PRODUCT.md
// "Capabilities and Constraints"). Placeholders explícitos — substituir antes
// de publicar, nunca preencher com dado inventado. CNPJ: cliente ainda não
// tem, por isso não aparece em lugar nenhum do site (nada de placeholder).
export const siteConfig = {
  whatsappNumber: "5562992292257",
  whatsappDisplay: "+55 62 99229-2257",
  email: "[EMAIL A DEFINIR]",
  instagram: "[INSTAGRAM A DEFINIR]",
  serviceArea: "Goiânia, Anápolis e região (área de atendimento a confirmar)",
} as const;

export function whatsappHref(prefilledMessage: string) {
  const base = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : "#contato";
  if (!siteConfig.whatsappNumber) return base;
  return `${base}?text=${encodeURIComponent(prefilledMessage)}`;
}
