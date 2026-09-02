# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js + Tailwind CSS (user's explicit choice, for SEO/performance and straightforward Vercel deploy via the installed deploy-to-vercel skill).

## Users

Primary: proprietários e gestores de imóveis comerciais/industriais/de serviços (comércio, indústria, serviços, galpões e depósitos) que precisam abrir, regularizar, ampliar ou adequar um imóvel e não sabem o caminho técnico até a conformidade — muitas vezes chegando com uma exigência recebida (ex.: Corpo de Bombeiros) ou no meio de um processo de abertura/expansão de empresa.

Secondary (B2B, geram indicação/parceria): escritórios de contabilidade, arquitetos, imobiliárias/corretores, construtoras/instaladores/executores, administradoras/facilities e gestores de ativos.

## Product Purpose

A Town Fire é uma empresa de engenharia de conformidade predial. Ela organiza o caminho técnico entre um imóvel pendente e um imóvel apto — diagnóstico, projeto, regularização e acompanhamento até a aprovação. Porta de entrada forte em segurança contra incêndio, com arquitetura de marca aberta a soluções correlatas de engenharia predial no futuro. Sucesso do produto (site) = transformar intenção de busca/indicação em lead qualificado (diagnóstico inicial) sem prometer aprovação garantida.

## Positioning

"A Town Fire organiza o caminho técnico entre um imóvel pendente e um imóvel apto." Não vende documentos, prancha, protocolo, ART ou desenho como tese central — esses são instrumentos; o valor percebido está em clareza, caminho técnico, conformidade, previsibilidade, redução de retrabalho e comunicação constante de "onde estamos e o que vem agora". Assinatura de jornada: **Projeta • Regulariza • Aprova** (não é garantia de aprovação).

## Operating Context

Mercado inicial discutido: Goiânia, Anápolis e região (sujeito a validação operacional — não publicar como fato fechado). Jornada do cliente: situação → diagnóstico → projeto → regularização → acompanhamento de exigências → conformidade. O site deve funcionar como porta de entrada para Google Ads (intenção → landing page → lead qualificado → CRM → venda) e para tráfego direto/indicação de parceiros B2B.

## Capabilities and Constraints

- Site institucional multi-página (não single landing): Home, Soluções, Como funciona, Para empresas, Para parceiros, FAQ, Contato, mais landing pages específicas por intenção/cidade para Google Ads.
- Conversão principal: clique direto para WhatsApp em todo CTA do site (header, hero, cada item de "sua situação", parceiros, CTA final, botão flutuante), cada um com mensagem pré-preenchida contextual ao ponto de clique via `wa.me`. Deliberadamente **sem formulário** — decisão do cliente: preferem clique direto a arriscar abandono de preenchimento.
- WhatsApp oficial confirmado: +55 62 99229-2257 (`src/lib/site-config.ts`). CNPJ ainda não existe (empresa não constituída) — não exibir em nenhum lugar do site, nem como placeholder, até haver um. Ainda não definidos e **não devem ser inventados**: domínio final, e-mail, Instagram, endereço/área de atendimento, responsáveis técnicos/CREA, política de privacidade, stack de formulário/CRM de destino. Usar placeholders claros e visualmente marcados (ex.: `[EMAIL A DEFINIR]`) em vez de dados fictícios.
- Preços, pacotes, prazos-padrão e condições comerciais ainda não definidos — não publicar tabela de preços real nem inventar uma.
- Não prometer aprovação garantida em nenhuma peça de copy.

## Brand Commitments

- Nome fechado: **Town Fire** (não reabrir naming/Ponto Apto).
- Descriptor: **Engenharia de Conformidade Predial**.
- Paleta oficial: Espresso `#2B1C14` (institucional dominante), Rosa Queimado `#D4748C` (destaque/CTA), Rosa Blush `#F6D6DE` (apoio suave), Bege Latão `#D2B48C` (acento editorial), Pérgamo `#F5F2EC` (fundo claro preferencial), Carvão `#2D2D2D` (texto/apoio técnico), Branco `#FFFFFF`.
- Tipografia: Montserrat (títulos/destaques) + Poppins (texto).
- Símbolo: combina edificação/estrutura + chama/proteção + direção/avanço, geométrico e minimalista — deliberadamente fora do universo visual genérico de "bombeiro/extintor/vermelho-preto-amarelo".
- Assets de marca prontos em `_handoff_extracted/TOWN_FIRE_MASTER_HANDOFF_COMPLETO_v3/02_IDENTIDADE_VISUAL/` (logos em todas as variações, favicons, webmanifest, tokens em `00_REFERENCE/town_fire_brand_tokens.json`).
- Personalidade verbal: técnica, segura, objetiva, sofisticada, humana, contemporânea. Regra de comunicação: **situação → impacto/risco → caminho → próximo passo**. Cliente é sempre o protagonista.
- Frases-âncora aprovadas: "Não vendemos documentos. Organizamos o caminho até a conformidade." / "O cliente nunca deveria precisar perguntar: 'e agora?'"
- Proibições explícitas de marca/copy (ver `00_HANDOFF_COMPLETO/12_O_QUE_NAO_FAZER.md`): sem vermelho/preto/amarelo clichê de incêndio, sem capacete/extintor/escudo/chama genérica, sem abrir com "somos especialistas em...", sem foto stock de engenheiro sorrindo como eixo visual, sem virar catálogo técnico, sem inventar prova social, sem frases institucionais vazias ("qualidade, inovação, excelência", "somos referência", "equipe altamente qualificada").
- Método de referência obrigatório para tom/direção: eixo público Tay Dantas / Vinci Society (branding, copy, dobras de site, experiência percebida), complementado por April Dunford (posicionamento), Blair Enns (venda de expertise) e princípios Google Ads (intenção → landing page → conversão). Sem afirmar aprovação/endosso pessoal desses autores, sem copiar material proprietário.

## Evidence on Hand

Nenhum case, cliente autorizado para divulgação, depoimento, foto real de obra, métrica ou credencial publicável foi confirmado ainda — **não fabricar prova social, números ou clientes**. Manual da marca completo e playbook comercial existem em PDF no pacote de handoff (`01_MANUAL_DA_MARCA/`, `03_PLAYBOOK_COMERCIAL/`) como referência de tom, não como fonte de dados factuais publicáveis.

## Product Principles

1. Clareza sobre tecnicismo: o cliente entende o resultado antes de entender a ferramenta técnica.
2. Autoridade tranquila, nunca alarmismo nem promessa absoluta — proteger a credibilidade técnica acima da conversão agressiva.
3. Cada canal/página tem uma função clara na jornada (intenção → landing page → lead → CRM → venda); nunca jogar toda mídia paga na mesma home.
4. Nunca inventar dado, cliente, prova ou preço — placeholder explícito é sempre preferível a dado fictício.
5. Toda peça deve parecer inconfundivelmente Town Fire, nunca "qualquer engenharia genérica".

## Accessibility & Inclusion

Nenhum requisito específico de acessibilidade foi levantado pelo usuário além do padrão esperado de um site institucional público (contraste, navegação por teclado, mobile). Tratar como WCAG AA por padrão até indicação em contrário.
