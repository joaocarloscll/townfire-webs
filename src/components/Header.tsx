import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { WhatsAppLink } from "./WhatsAppLink";

export const NAV = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#metodo", label: "Como funciona" },
  { href: "#engenheiros", label: "Engenheiros" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-brass/30 bg-espresso/95 backdrop-blur supports-[backdrop-filter]:bg-espresso/90 relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:gap-6 lg:px-8 xl:px-10">
        <Link
          href="#top"
          className="flex min-h-[44px] shrink-0 items-center gap-3"
        >
          <Image
            src="/brand/logo-horizontal-white.svg"
            alt="Town Fire"
            width={160}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm text-blush/90 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <WhatsAppLink
            intent="institutional_header"
            placement="home_header"
            className="hidden min-h-[44px] items-center rounded-full bg-rose px-5 font-display text-xs font-semibold uppercase tracking-[0.04em] text-espresso transition-colors hover:bg-rose-strong sm:inline-flex"
          >
            Falar com a Town Fire
          </WhatsAppLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
