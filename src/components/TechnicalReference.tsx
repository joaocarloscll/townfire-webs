// Referência normativa discreta para páginas regulatórias. Sem href quando a
// URL oficial não pôde ser confirmada — nunca inventar link de legislação
// (ver auditoria no PR: acesso a bombeiros.go.gov.br não pôde ser verificado
// a partir deste ambiente).
export function TechnicalReference({
  items,
}: {
  items: { norma: string; titulo: string; url?: string; vigencia?: string }[];
}) {
  return (
    <div className="mt-12 border-t border-brass/25 pt-6">
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/50">
        Referência técnica
      </p>
      <p className="mt-2 text-sm text-charcoal/60">
        Corpo de Bombeiros Militar do Estado de Goiás
      </p>
      <ul className="mt-2 space-y-1 text-sm text-charcoal/60">
        {items.map((item) => (
          <li key={item.norma}>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-charcoal/30 underline-offset-2 hover:text-rose"
              >
                {item.norma} — {item.titulo}
              </a>
            ) : (
              <span>
                {item.norma} — {item.titulo}
              </span>
            )}
            {item.vigencia ? ` (${item.vigencia})` : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
