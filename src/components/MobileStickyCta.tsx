"use client";

import { useEffect, useState } from "react";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * CTA inferior discreto, só no mobile, que aparece depois que o Hero sai da
 * tela (15_MOBILE_IOS_FIRST/mobile_ios_first_spec_v4.md). Respeita safe area
 * do iOS via env(safe-area-inset-bottom).
 */
export function MobileStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brass/30 bg-espresso/95 backdrop-blur transition-transform duration-200 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppLink
        intent="hero"
        placement="mobile_sticky"
        className="flex items-center justify-center px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.04em] text-rose"
      >
        Falar com a Town Fire
      </WhatsAppLink>
    </div>
  );
}
