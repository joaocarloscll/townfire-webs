import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site-config";

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

// Metadados canônicos V6 (01_ESTRATEGIA_COPY/site_architecture_master_v6.md
// e 03_SEO_GEO_AI/technical_seo_manifest_v6.yaml).
const title = "Town Fire | Engenharia de Incêndio e Regularização";
const description =
  "Projetos de segurança contra incêndio, regularização e tratamento de exigências para comércios, galpões e indústrias em Goiânia, Anápolis e região.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Town Fire",
  },
  description,
  authors: [{ name: "Town Fire" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Town Fire",
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

// Fontes: 06_TECHNICAL_TEMPLATES/structured-data/{organization,localbusiness}.jsonld
// e 16_AUTORIDADE_EQUIPE/person_*.schema.json. Campos sem dado real confirmado
// (email, endereço, redes) são omitidos em vez de preenchidos com placeholder,
// porque JSON-LD é lido por máquina e um placeholder ali lê como dado inventado.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Town Fire",
      url: SITE_URL,
      description,
      telephone: "+5562992292257",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Town Fire",
      url: SITE_URL,
      description,
      telephone: "+5562992292257",
      areaServed: [
        { "@type": "City", name: "Goiânia" },
        { "@type": "City", name: "Anápolis" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Town Fire",
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Person",
      name: "João Carlos Chaves",
      jobTitle: "Engenheiro Civil",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: ["https://www.linkedin.com/in/joaocarloscl/"],
    },
    {
      "@type": "Person",
      name: "Jefferson Jesus",
      jobTitle: "Engenheiro Mecânico",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: ["https://www.linkedin.com/in/jefferson--jesus/"],
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
      </body>
    </html>
  );
}
