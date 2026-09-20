import type { NextConfig } from "next";

// Headers de segurança de baixo risco, aplicados a todas as rotas. CSP fica
// de fora por enquanto de propósito: o site tem scripts inline (bootstrap
// do .js/JSON-LD), o Next e o GA4/futuro GTM — implementar CSP enforced
// sem antes rodar em Report-Only quebraria alguma dessas peças. Quando for
// feita, deve começar em Report-Only.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
