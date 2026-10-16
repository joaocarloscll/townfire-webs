# Arquitetura de medição — Town Fire

Divisão de trabalho: o **código do site** (este repositório) emite eventos e
carrega o GTM; a **configuração web** (GTM, GA4, Google Ads, Search Console,
Business Profile) é feita nas contas do Google conforme este documento.

```
Visitante ──► Banner de consentimento ──(aceitou medição)──► carrega GTM
   │                                                            │
   └─ clica em botão [data-event] ─► ClickTracker ─► dataLayer ─┤
                                                                ▼
                                     GTM: triggers ─► tags GA4 / Google Ads
                                                                ▼
                                          GA4 (key events) ─► Google Ads
```

## 1. Contrato de dados (lado código — já implementado)

O site empurra objetos no `window.dataLayer`. Este é o contrato que o GTM
escuta; não renomear sem atualizar o container.

| Evento            | Quando dispara                         | Origem no código                    |
| ----------------- | -------------------------------------- | ----------------------------------- |
| `whatsapp_click`  | Clique em qualquer CTA de WhatsApp     | `WhatsAppLink` (`data-event`)       |
| `phone_click`     | Clique no telefone do rodapé           | `Footer`                            |
| `instagram_click` | Clique no Instagram do rodapé          | `Footer`                            |

Parâmetros de cada evento:

| Parâmetro   | Exemplo                      | Significado                                      |
| ----------- | ---------------------------- | ------------------------------------------------ |
| `placement` | `fotovoltaico_header`        | Qual botão foi clicado (`<página>_<posição>`)    |
| `intent`    | `sistema_fotovoltaico`       | Assunto da mensagem pré-preenchida do WhatsApp   |
| `page_path` | `/sistema-fotovoltaico-cbmgo`| Página onde o clique aconteceu                   |

Valores de `intent`: `institutional_general`, `institutional_header`,
`projeto_pscip`, `regularizacao_cbmgo`, `regularizacao_comercio_goiania`,
`save_veiculos_eletricos`, `sistema_fotovoltaico`, `vistoria_laudo`
(fonte: `src/lib/whatsapp.ts`). `phone_click` e `instagram_click` não têm
`intent` útil (vem `none`).

Consentimento (Consent Mode v2): o site define `analytics_storage`,
`ad_storage`, `ad_user_data` e `ad_personalization` como `denied` e só
atualiza `analytics_storage` para `granted` quando o visitante aceita a
medição. **O container GTM só é carregado depois desse aceite.** Sinais de
publicidade ficam `denied` até existir categoria de publicidade no banner
(decisão em aberto, ver seção 7).

Variável de ambiente: `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` (Vercel → Project →
Settings → Environment Variables; exige novo deploy). Sem ela o site usa o
`gtag.js` direto com o GA4 `G-7VSW42JTD9` e envia os mesmos eventos.

## 2. Google Tag Manager (lado web)

Container: tipo **Web**, nome "townfire.com.br".

**Variáveis (Data Layer Variable, versão 2)**

| Nome         | Chave do dataLayer |
| ------------ | ------------------ |
| `DLV - placement` | `placement`   |
| `DLV - intent`    | `intent`      |
| `DLV - page_path` | `page_path`   |
| `CONST - GA4 ID`  | constante `G-7VSW42JTD9` |

**Acionadores (Custom Event, correspondência exata)**

`CE - whatsapp_click`, `CE - phone_click`, `CE - instagram_click`.

**Tags**

1. `GA4 - Config` — tag do Google com o ID `{{CONST - GA4 ID}}`, acionador
   *Initialization - All Pages*. Como o container só carrega após o aceite,
   não precisa de lógica extra de consentimento, mas mantenha em
   *Configurações de consentimento* o requisito `analytics_storage`.
2. `GA4 - Event - whatsapp_click` — evento GA4, nome `whatsapp_click`,
   parâmetros `placement`, `intent`, `page_path` ← variáveis acima;
   acionador `CE - whatsapp_click`.
3. `GA4 - Event - phone_click` e `GA4 - Event - instagram_click` — idem.
4. *(quando houver anúncios)* `Ads - Conversion - WhatsApp` — tag de
   conversão do Google Ads com `AW-XXXXXXXXX` e rótulo, acionador
   `CE - whatsapp_click`, requisito de consentimento `ad_storage`. Alternativa
   mais simples: importar o key event do GA4 no Google Ads (seção 4) e não
   criar esta tag.

Não ativar o "Click" automático do GTM para links: os eventos acima já
cobrem tudo e evitam contagem duplicada.

## 3. GA4 (property do `G-7VSW42JTD9`)

- **Key events:** marcar `whatsapp_click` (principal) e `phone_click`.
- **Dimensões personalizadas (escopo evento):** `placement`, `intent`
  (parâmetros de evento com o mesmo nome). `page_path` não precisa: o GA4
  já guarda a URL da página.
- **Retenção de dados:** 14 meses.
- **Filtro de tráfego interno:** cadastrar o IP da equipe e ativar o filtro.
- **Vínculos:** Google Ads, Search Console (seção 5).
- Relatórios úteis: Eventos → `whatsapp_click` por `placement` e por
  `intent`; Aquisição → origem/mídia × key events.

## 4. Google Ads

- Ativar **marcação automática** (auto-tagging) na conta.
- Vincular a conta ao GA4 e **importar** `whatsapp_click` como conversão
  ("Contato — WhatsApp", contagem: uma por clique, valor: sem valor ou um
  valor estimado por lead).
- O `gclid` já é registrado no log do `/go/whatsapp` (não vai para a
  mensagem do cliente).
- Limitação conhecida: sem `ad_storage` concedido o Google Ads usa
  modelagem de conversões. Para atribuição melhor é preciso uma categoria de
  publicidade no banner (seção 7).

## 5. Search Console

- Propriedade de **domínio** (`townfire.com.br`) verificada por DNS.
- Enviar `https://www.townfire.com.br/sitemap.xml`.
- Vincular ao GA4 (Admin → Vínculos de produtos → Search Console).

## 6. Google Business Profile

- Link do site com UTM: `?utm_source=google&utm_medium=organic&utm_campaign=gbp`
  (o GA4 passa a separar o tráfego do perfil).
- Link do botão de WhatsApp/mensagem do perfil com
  `?utm_source=google&utm_medium=organic&utm_campaign=gbp_whatsapp`
  apontando para o site, não direto ao `wa.me`, para o clique ser medido.
- Posts do perfil: botão "Saiba mais" com UTM `utm_campaign=gbp_post_<assunto>`.

## 7. Decisões em aberto

1. **Categoria de publicidade no consentimento.** Hoje o banner só tem
   "medição". Para anúncios com remarketing/atribuição completa é preciso
   adicionar uma escolha de publicidade e atualizar `ad_storage`,
   `ad_user_data` e `ad_personalization`. Mudança de código + texto da
   política de privacidade.
2. **WhatsApp na mesma aba ou em nova aba.** O clique passa por
   `/go/whatsapp` (redirect 302). O GA4 envia o evento por beacon na saída
   da página, o que funciona na prática, mas abrir em nova aba
   (`target="_blank"`) elimina o risco de perda de evento.

## 8. Checklist de validação

1. Definir `NEXT_PUBLIC_GTM_ID` na Vercel e fazer deploy.
2. Abrir o site, **aceitar** a medição, e abrir o GTM em *Preview* (Tag
   Assistant) com a URL do site.
3. Clicar em um botão de WhatsApp: no Tag Assistant o evento
   `whatsapp_click` deve aparecer com `placement`, `intent` e `page_path`,
   e a tag `GA4 - Event - whatsapp_click` deve disparar.
4. No GA4 → Admin → DebugView, o evento deve chegar com os parâmetros.
5. **Recusar** a medição (aba anônima): nenhuma requisição para
   `googletagmanager.com` nem `google-analytics.com`.
6. Após 24–48 h, conferir `whatsapp_click` nos relatórios e a conversão no
   Google Ads (se vinculado).
