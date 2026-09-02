import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-brass/25 bg-espresso py-12 text-parchment/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 sm:flex-row sm:items-start sm:justify-between lg:px-10">
        <div>
          <Image
            src="/brand/logo-horizontal-white.svg"
            alt="Town Fire"
            width={140}
            height={32}
            className="h-7 w-auto opacity-90"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Engenharia de incêndio e regularização. {siteConfig.serviceArea}.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <span className="text-brass">{WHATSAPP_DISPLAY}</span>
          <Link
            href="/politica-de-privacidade"
            className="inline-flex min-h-[44px] items-center transition-colors hover:text-parchment"
          >
            Política de privacidade
          </Link>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl px-6 text-xs text-parchment/40 lg:px-10">
        Do imóvel pendente ao imóvel apto. As análises consideram uso, área,
        ocupação e configuração de cada imóvel. Não há garantia de aprovação.
      </p>
    </footer>
  );
}
