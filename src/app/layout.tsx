import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner";
import {
  COMPANY_NAME,
  INSTAGRAM_URL,
  SITE_URL,
  siteConfig,
} from "@/lib/site-config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Título e descrição citam os serviços reais do site (PSCIP, CERCON) em vez
// de texto genérico. Template: páginas filhas fornecem só a parte
// específica do título — o sufixo da marca entra uma única vez aqui.
const title = "Projeto de Incêndio e Regularização CBMGO | Town Fire Engenharia";
const description =
  "Projetos de incêndio, PSCIP, regularização junto ao CBMGO, CERCON, vistorias e laudos para comércios, condomínios, galpões e indústrias em Goiânia e região.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${COMPANY_NAME}`,
  },
  description,
  authors: [{ name: COMPANY_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/symbol-color.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2B1C14",
  colorScheme: "light",
};

// JSON-LD global: só Organization + WebSite. Person (João/Jefferson) vive em
// src/app/page.tsx, perto de onde aparecem visualmente (AuthoritySection);
// Service + BreadcrumbList vivem em cada página orgânica. Nada de
// LocalBusiness/ProfessionalService/rating/review/oferta enquanto não
// existir endereço comercial público real — endereço residencial nunca
// entra aqui.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: COMPANY_NAME,
      alternateName: "Town Fire",
      url: SITE_URL,
      telephone: "+5562992292257",
      logo: `${SITE_URL}/brand/symbol-color.svg`,
      sameAs: [INSTAGRAM_URL],
      areaServed: siteConfig.serviceCities.map((name) => ({
        "@type": "City",
        name,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY_NAME,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // O script inline abaixo acrescenta `.js` antes da hidratação, então o
      // className do servidor difere do cliente por definição.
      suppressHydrationWarning
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        {/* Marca `.js` antes do primeiro paint: só então o CSS esconde os
            blocos com Reveal. Sem JavaScript nada fica oculto. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-parchment text-charcoal">
        {children}
        <Analytics />
        <ConsentBanner />
      </body>
    </html>
  );
}
