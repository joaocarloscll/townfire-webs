import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/lib/site-config";

// Quando uma página define `openGraph`, o Next substitui o objeto inteiro do
// layout (tipo, locale, siteName e a imagem do opengraph-image.tsx somem), e
// o `twitter` herdado fica com o título genérico da home. Este helper repete
// o que a página precisa para o compartilhamento (WhatsApp, LinkedIn, X)
// sair completo, com título, descrição e imagem da própria página.
export function pageSocial({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = {
    url: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: COMPANY_NAME,
  };
  return {
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: COMPANY_NAME,
      url: `${SITE_URL}${path}`,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
