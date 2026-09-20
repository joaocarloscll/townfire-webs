"use client";

import { requestConsentReopen } from "@/lib/consent";

export function ConsentPreferencesLink({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={requestConsentReopen}
      className={className}
    >
      Preferências de privacidade
    </button>
  );
}
