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

const title = "Town Fire | Engenharia de Incêndio e Regularização Predial";
const description =
  "A Town Fire lê a situação do imóvel, define o caminho técnico e conduz projetos, regularização e exigências até a conformidade.";

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
      "@type": "Person",
      name: "Jefferson Jesus",
      jobTitle: "Engenheiro Mecânico",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: ["https://www.linkedin.com/in/jefferson--jesus/"],
    },
    {
      "@type": "Person",
      name: "João Carlos Chaves",
      jobTitle: "Engenheiro Civil",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      sameAs: ["https://www.linkedin.com/in/joaocarloscl/"],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
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
