import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_URL, siteConfig } from "@/lib/site-config";
import { WHATSAPP_DISPLAY, WHATSAPP_E164 } from "@/lib/whatsapp";
import { ConsentPreferencesLink } from "./ConsentPreferencesLink";

const TECHNICAL_NAV = [
  { href: "/projeto-de-incendio-pscip", label: "Projeto e PSCIP" },
  { href: "/regularizacao-cbmgo-cercon", label: "Regularização CBMGO" },
  {
    href: "/save-carregadores-veiculos-eletricos",
    label: "SAVE e veículos elétricos",
  },
  { href: "/sistema-fotovoltaico-cbmgo", label: "Sistemas fotovoltaicos" },
];

const linkClassName =
  "inline-flex min-h-[32px] items-center text-sm transition-colors hover:text-parchment";

export function Footer() {
  return (
    <footer className="border-t border-brass/25 bg-espresso py-12 text-parchment/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-3 lg:px-10">
        <div>
          <Image
            src="/brand/logo-horizontal-white.svg"
            alt="Town Fire"
            width={140}
            height={32}
            className="h-7 w-auto opacity-90"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Engenharia de incêndio e regularização junto ao CBMGO.
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-parchment/50">
            Atendimento em {siteConfig.serviceCities.join(", ")} e região.
          </p>
        </div>

        <nav aria-label="Serviços" className="flex flex-col gap-1">
          <span className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.1em] text-brass">
            Serviços
          </span>
          {TECHNICAL_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClassName}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1 sm:items-end">
          <a
            href={`tel:+${WHATSAPP_E164}`}
            className={`${linkClassName} text-brass hover:text-brass`}
          >
            {WHATSAPP_DISPLAY}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Instagram
          </a>
          <Link href="/politica-de-privacidade" className={linkClassName}>
            Política de privacidade
          </Link>
          <ConsentPreferencesLink className={linkClassName} />
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl px-6 text-xs text-parchment/40 lg:px-10">
        Do imóvel pendente ao imóvel apto. As análises consideram uso, área,
        ocupação e configuração de cada imóvel. Não há garantia de aprovação.
      </p>
    </footer>
  );
}
