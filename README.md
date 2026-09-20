# Town Fire — Site institucional

Next.js + Tailwind. Site multi-página, com todos os CTAs levando direto para
o WhatsApp (mensagem pré-preenchida e contextual por seção, sem formulário).

## Rotas

- `/` — home institucional: marca, tese, visão geral dos serviços e
  conversão. Ponto de entrada principal.
- `/projeto-de-incendio-pscip` — página orgânica sobre projeto de incêndio e
  PSCIP.
- `/regularizacao-cbmgo-cercon` — página orgânica de autoridade temática
  sobre regularização junto ao CBMGO e CERCON (inclui Licenciamento
  Facilitado).
- `/save-carregadores-veiculos-eletricos` — página orgânica sobre
  regularização de sistemas de recarga de veículos elétricos (SAVE).
- `/sistema-fotovoltaico-cbmgo` — página orgânica sobre segurança contra
  incêndio em sistemas fotovoltaicos.
- `/regularizacao-comercio-corpo-de-bombeiros-goiania` — landing comercial,
  mais curta e focada em comércio + Goiânia + WhatsApp, para mídia paga.
  Função distinta da página orgânica de regularização (ver decisão de
  index/noindex no histórico de PRs).
- `/politica-de-privacidade` — política de privacidade.

CTA principal em todas as rotas é o WhatsApp, via `/go/whatsapp` (gera
`lead_ref`, registra atribuição com fallback de referer, redireciona para o
`wa.me` oficial).

## Rodando localmente

```bash
npm install
npm run dev
```

## Contexto do projeto

- `PRODUCT.md` — verdades de produto/marca confirmadas e o que não deve ser
  inventado.
- `.impeccable/surfaces/src-app-page-tsx.md` — contrato de direção visual da
  home.
- `src/lib/site-config.ts` — dados operacionais (WhatsApp, domínio,
  Instagram, áreas de atendimento).
- `src/lib/consent.ts` + `src/components/Analytics.tsx` +
  `src/components/ConsentBanner.tsx` — consentimento de medição (GA4 só
  carrega depois que o visitante permite).
- `_handoff_extracted/` — pacote de handoff original do cliente (manual da
  marca, identidade visual, direção de site) usado como fonte de verdade.

## Deploy

Projeto pronto para deploy na Vercel (`npm run build` / `next start`).
