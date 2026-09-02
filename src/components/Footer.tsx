import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

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
            Engenharia de Conformidade Predial. {siteConfig.serviceArea}.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:text-right">
          <span className="col-span-2 text-brass sm:col-span-1">
            {siteConfig.whatsappDisplay}
          </span>
          <span className="col-span-2 sm:col-span-1">{siteConfig.email}</span>
          <span className="col-span-2 sm:col-span-1">
            {siteConfig.instagram}
          </span>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl px-6 text-xs text-parchment/40 lg:px-10">
        Town Fire — Projeta · Regulariza · Aprova. As análises consideram
        ocupação, área, cidade, risco e norma aplicável de cada imóvel; não
        há garantia de aprovação.
      </p>
    </footer>
  );
}
