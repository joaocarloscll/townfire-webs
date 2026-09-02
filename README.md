# Town Fire — Site institucional

Next.js + Tailwind. Home institucional em página única, com todos os CTAs
levando direto para o WhatsApp (mensagem pré-preenchida e contextual por
seção, sem formulário).

## Rodando localmente

```bash
npm install
npm run dev
```

## Contexto do projeto

- `PRODUCT.md` — verdades de produto/marca confirmadas, dados pendentes e o
  que não deve ser inventado.
- `.impeccable/surfaces/src-app-page-tsx.md` — contrato de direção visual da
  home.
- `src/lib/site-config.ts` — dados operacionais (WhatsApp, domínio, e-mail,
  Instagram). Placeholders em colchetes ainda precisam ser preenchidos antes
  de publicar.
- `_handoff_extracted/` — pacote de handoff original do cliente (manual da
  marca, identidade visual, direção de site) usado como fonte de verdade.

## Deploy

Projeto pronto para deploy na Vercel (`npm run build` / `next start`).
