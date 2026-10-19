# Guia editorial do blog Town Fire

Fonte única das regras do blog. A publicação automática (rotina agendada) lê
este arquivo antes de escrever. As regras duras estão também em
`src/lib/blog-rules.ts` e **derrubam o `next build`** se violadas, o que
impede o merge. Para mudar uma regra dura, edite o validador; para mudar tom
ou estrutura, edite este guia.

## Para quem escrevemos

Dono de comércio, galpão ou imóvel em Goiás que **não entende de bombeiros** e
tem uma pergunta concreta: "o que eu faço agora?". Secundário: contador,
corretor, arquiteto e administrador que orientam clientes.

Sempre a ordem da marca: **situação, risco, caminho, próximo passo**. O leitor
é o protagonista. A Town Fire é quem organiza o caminho, nunca o assunto.

## Como o texto deve soar

- Fale com "você". Frases curtas, uma ideia por frase. Média abaixo de 23
  palavras (o validador mede).
- Direto e humano: comece pela situação do leitor, não por definição de
  dicionário. Pode usar pergunta, "repare que", "calma". Varie o ritmo: uma
  frase longa, duas curtas.
- Exemplos concretos, sempre marcados como hipótese ("Imagine uma pessoa que
  alugou uma sala..."). Nunca "atendemos um cliente que...", porque não há
  caso autorizado (ver `PRODUCT.md`).
- Sem frases de efeito vazias, sem tom de propaganda, sem exclamação, sem
  emoji, sem "Em resumo", "vale ressaltar", "no mundo atual", "descubra como".
  O validador barra os cacoetes mais comuns, mas o objetivo é escrever como
  uma pessoa que explica algo a outra, não passar no filtro.
- Evite sequências de três adjetivos e listas que repetem a mesma estrutura de
  frase em todos os itens. Quebre o padrão.
- Travessão (—): no máximo 6 por post. Prefira ponto ou vírgula.
- Não invente experiência pessoal ("na minha carreira", "já vi 200 casos").
  O texto é da marca, na voz da marca.

## Estrutura e diagramação

Um post lido por quem tem pressa. Tudo escaneável:

1. Abertura de 2 parágrafos curtos: a situação do leitor e por que importa.
2. `##` com 5 a 8 seções. Títulos em linguagem de busca ("Passo a passo...",
   "O que fazer se...", "Erros comuns...", "Checklist...").
3. Pelo menos uma **lista numerada** (passo a passo), com a ação em
   **negrito** no começo de cada item.
4. Pelo menos uma **tabela** ou um **checklist** (`- [ ] item`).
5. Caixas de destaque com `> **Dica:**`, `> **Atenção:**`, `> **Exemplo:**`.
6. **Negrito** só em termos-chave, não em frases inteiras.
7. Termine com checklist ou próximo passo. O CTA de WhatsApp, as perguntas
   rápidas, as fontes e os "continue lendo" já saem do template.
8. Tamanho: de 800 a 2.600 palavras (alvo 1.000 a 1.500).

## Palavras-chave (SEO)

- `keywords[0]` é a principal: frase que uma pessoa realmente digitaria no
  Google. Precisa aparecer no `title` ou na `description` e nas primeiras 170
  palavras do texto.
- As outras 2 a 7 são variações e perguntas relacionadas. Use no corpo de
  forma natural, sem repetir à força.
- `title`: 30 a 70 caracteres, com a palavra-chave perto do começo.
  `description`: 110 a 165 caracteres, uma promessa clara do que o leitor
  leva.
- Links internos: 2 a 4 por post, só para rotas existentes (o validador
  confere): páginas de serviço e outros guias.
- Links externos: só `.gov.br`, `abnt.org.br` e `townfire.com.br`.

## O que NUNCA entra (o validador barra)

- Preço, valor em reais, tabela de preços.
- Prazo numérico ("em 15 dias"), limite de área ("até 750 m²"), taxa.
  Diga que o prazo está no documento ou na norma vigente.
- Número de norma, lei ou decreto que não esteja em `KNOWN_NORMS`
  (`blog-rules.ts`). Hoje: NT-01/2026, NT-44/2025, NT-45/2026. Para liberar
  outra, confirme o número e o link oficial e acrescente à lista.
- Promessa de aprovação ("aprovação garantida"), frases vazias de marca
  ("somos especialistas", "equipe altamente qualificada").
- Acusação a terceiros: negligência, culpa, irresponsabilidade, etc.
- Prova social inventada, cliente, depoimento, número de atendimentos.

Se um fato específico não pôde ser confirmado em fonte oficial **durante a
sessão**, não o afirme. Escreva "consulte a norma vigente" e aponte a fonte.
Esta é uma regra de segurança do blog: o site trata de regularização, e um
dado errado vira problema real para o leitor e para a Town Fire.

## Posts de notícia (`format: noticia`)

Uma notícia serve de **gancho** para ensinar o que o leitor pode conferir no
imóvel dele. Nunca para comentar o caso.

Antes de escolher uma notícia:

1. Busque (WebSearch) incêndios ou ocorrências ligadas a edificações,
   comércio, galpão ou ao Corpo de Bombeiros, de preferência em Goiás, e
   aceite casos nacionais conhecidos se não houver local.
2. **Só use o fato se pelo menos 2 publicações independentes o confirmarem**
   com a mesma data e os mesmos números. Se as datas ou os dados divergirem,
   descarte e escreva um guia no lugar.
3. A notícia precisa ter até 120 dias (o validador confere `news.date`).
4. Descarte casos com mortes graves, crianças, ou investigação criminal em
   andamento. Tragédia não é conteúdo.

Como escrever:

- Descreva o fato em **poucas linhas**, sem copiar o texto da reportagem,
  atribuindo de forma geral ("a imprensa noticiou", "segundo o noticiado").
  Não cite o veículo no texto.
- Sem nome de empresa, de pessoa, de rua ou de proprietário. Use "um
  depósito em Goiânia".
- **Nunca afirme a causa.** Diga que a causa ainda não está confirmada ou
  depende de perícia (o validador exige isso).
- **Nunca comente a situação legal do imóvel do caso** (se tinha ou não
  certificado, se estava vencido, irregular). Seria acusação sem prova.
- Em vez de "o que deveria ter sido feito" naquele local, escreva "o que todo
  [tipo de imóvel] pode conferir". Medidas em termos gerais, sem afirmar que
  faltavam no caso.
- A fonte (`news.sourceUrl`) fica **só no frontmatter**, para auditoria. Ela
  não aparece no site. A seção "Onde conferir" mostra apenas fontes oficiais
  (CBMGO, `.gov.br`).

## Imagens

- **Capa:** gerada por código em `src/app/blog/[slug]/opengraph-image.tsx`
  (paleta da marca, motivo de degraus). Não é preciso fazer nada.
- **Imagens no texto:** só se ajudarem (diagrama de etapas, comparação).
  Crie um SVG em `public/blog/img/<nome>.svg` com as cores da marca (Espresso
  `#2B1C14`, Rosa `#D4748C`, Pérgamo `#F5F2EC`, Latão `#D2B48C`) e use
  `![descrição](/blog/img/<nome>.svg)`. Sem foto de banco de imagens: a marca
  proíbe foto genérica de engenheiro, capacete, extintor ou escudo.

## Modelo do arquivo

`content/blog/<slug>.md`, com o slug em kebab-case sem acento.

```markdown
---
title: "Título de 30 a 70 caracteres"
description: "De 110 a 165 caracteres."
date: "AAAA-MM-DD"            # data de hoje; nunca no futuro
category: regularizacao       # regularizacao | projeto-pscip | cercon | comercio | veiculos-eletricos | fotovoltaico | vistoria-laudo | noticia
format: guia                  # guia | noticia
intent: regularizacao_cbmgo   # chave de WHATSAPP_INTENTS em src/lib/whatsapp.ts
keywords:
  - palavra-chave principal
  - variação
  - variação
summary:                      # 3 a 8 passos curtos (até 90 caracteres)
  - "Passo 1"
  - "Passo 2"
  - "Passo 3"
faq:                          # 3 a 5, respostas de 40 a 420 caracteres
  - q: "Pergunta?"
    a: "Resposta."
sources:                      # pelo menos 1, https .gov.br, abnt.org.br ou townfire.com.br
  - label: "Nome da fonte"
    url: "https://www.bombeiros.go.gov.br/"
# só para format: noticia
# news:
#   date: "AAAA-MM-DD"
#   place: "Cidade/UF"
#   sourceUrl: "https://..."   # auditoria, não aparece no site
---
```

Cuidado com o YAML: texto com `:` precisa de aspas (`"Passo: algo"`).

## Fluxo de publicação (feito pela rotina)

1. Ler `content/blog/_plano.md`, escolher o próximo tema não publicado (ou
   uma notícia, conforme a regra do plano).
2. Escrever `content/blog/<slug>.md` seguindo este guia.
3. `npm run build`. Se o validador acusar algo, corrigir o texto (não afrouxar
   a regra) e rodar de novo.
4. Marcar o tema como publicado em `content/blog/_plano.md`.
5. Branch, commit, push, PR.
6. Esperar o status da Vercel ficar `success` e então fazer o merge
   (squash). Se falhar, ler o erro, corrigir e tentar de novo; se falhar de
   novo, deixar o PR aberto e avisar.
