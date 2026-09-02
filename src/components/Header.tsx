import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { WhatsAppLink } from "./WhatsAppLink";

const NAV = [
  { href: "#situacao", label: "Sua situação" },
  { href: "#metodo", label: "Método" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#autoridade", label: "Quem somos" },
  { href: "#parceiros", label: "Parceiros" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brass/30 bg-espresso/95 backdrop-blur supports-[backdrop-filter]:bg-espresso/90 relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:gap-6 lg:px-8 xl:px-10">
        <Link href="#top" className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-horizontal-white.svg"
            alt="Town Fire"
            width={160}
            height={36}
            priority
            className="h-8 w-auto"
          />
          <span className="hidden border-l border-brass/40 pl-3 font-body text-xs leading-tight text-blush/70 xl:block">
            Engenharia de incêndio
            <br />e regularização
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
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
            intent="hero"
            placement="header"
            className="hidden rounded-full bg-rose px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.04em] text-espresso transition-colors hover:bg-rose-strong sm:inline-block"
          >
            Falar com a Town Fire
          </WhatsAppLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
