import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL, siteConfig } from "@/lib/site-config";

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

const title = "Town Fire — Engenharia de Conformidade Predial";
const description =
  "A Town Fire organiza o caminho técnico entre um imóvel pendente e um imóvel apto. Diagnóstico, projeto e regularização com clareza do início ao fim.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Town Fire",
  },
  description,
  keywords: [
    "engenharia de conformidade predial",
    "projeto de incêndio",
    "regularização de imóvel",
    "PPCI",
    "conformidade predial Goiânia",
    "vistoria do corpo de bombeiros",
  ],
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
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Town Fire",
  description,
  slogan: "Projeta · Regulariza · Aprova",
  url: SITE_URL,
  areaServed: siteConfig.serviceArea,
  knowsAbout: [
    "Engenharia de conformidade predial",
    "Segurança contra incêndio",
    "Regularização predial",
    "Projeto de prevenção e combate a incêndio",
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
