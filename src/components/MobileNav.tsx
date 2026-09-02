"use client";

import { useState } from "react";

const NAV = [
  { href: "#situacao", label: "Sua situação" },
  { href: "#metodo", label: "Método" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#autoridade", label: "Quem somos" },
  { href: "#parceiros", label: "Parceiros" },
  { href: "#faq", label: "FAQ" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5"
      >
        <span
          aria-hidden
          className={`h-px w-6 bg-parchment transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          aria-hidden
          className={`h-px w-6 bg-parchment transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-t border-brass/30 bg-espresso px-6 py-6"
        >
          <ul className="flex flex-col gap-5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base text-blush/90"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
