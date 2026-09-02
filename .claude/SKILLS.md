# Skills/plugins deste projeto

Este projeto foi construído com algumas skills e plugins do Claude Code que
não vêm por padrão. Para não depender só da máquina onde foram instalados,
o que dá pra tornar portável via git está aqui dentro de `.claude/`.

## O que está aqui e por quê

| Item | Onde | Tipo | Portabilidade |
|---|---|---|---|
| `impeccable` | `.claude/skills/impeccable/` | skill "crua" (pasta de arquivos, não plugin de marketplace) | **100% — já commitada, funciona em qualquer máquina só de abrir o repo** |
| `grill-me` | `.claude/skills/grill-me/` | idem | idem |
| `mattpocock-skills` | plugin, marketplace `claude-plugins-official` | plugin | **Registrado em `.claude/settings.json`** — veja abaixo |
| `ponytail` | plugin, marketplace `ponytail` | plugin | **Registrado em `.claude/settings.json`** — veja abaixo |

## Skills "cruas" (pasta em `.claude/skills/`)

Essas viajam 100% com o `git clone`. O Claude Code lê qualquer pasta dentro
de `.claude/skills/<nome>/SKILL.md` automaticamente, sem instalação nenhuma.
`impeccable` foi usada pra desenhar/construir o site (paleta, tipografia,
estrutura da home, revisão de acabamento); `grill-me` serve pra
estress-testar decisões/planos fazendo perguntas difíceis.

## Plugins (marketplace)

Plugins não são pastas simples — o código deles é baixado de um repositório
GitHub pela própria ferramenta. `.claude/settings.json` já declara:

- `extraKnownMarketplaces`: de onde vêm (`anthropics/claude-plugins-official`
  e `DietrichGebert/ponytail`)
- `enabledPlugins`: que `mattpocock-skills` e `ponytail` devem estar ligados

Isso faz o Claude Code **reconhecer automaticamente** que este projeto quer
esses plugins assim que você abrir a pasta em qualquer máquina — mas o
download/instalação em si costuma pedir uma confirmação de segurança na
primeira vez (é assim que a ferramenta evita instalar código de terceiros
sem você saber). Depois de confirmar uma vez, fica instalado nessa máquina.

`ponytail` é o modo "faça a versão mais enxuta que funciona" (estava ativo
o tempo todo na construção deste site). `mattpocock-skills` traz várias
skills de fluxo de trabalho (`grilling`, `tdd`, `research`, `domain-modeling`
etc.) — só `grill-me`, que vem de um pacote separado
(`mattpocock/skills` no GitHub), foi commitada à parte porque é uma skill
solta, não parte desse plugin.

## Resumo pra outra máquina

1. `git clone` + abrir o projeto no Claude Code → `impeccable` e `grill-me`
   já funcionam, sem fazer nada.
2. Na primeira vez que uma skill do `mattpocock-skills` ou `ponytail` for
   necessária, o Claude Code vai propor instalar o plugin (por causa do
   `.claude/settings.json`) — só aceitar.
3. Se preferir instalar manualmente antes: `/plugin marketplace add
   anthropics/claude-plugins-official` e `/plugin marketplace add
   DietrichGebert/ponytail`, depois `/plugin install mattpocock-skills` e
   `/plugin install ponytail`.
