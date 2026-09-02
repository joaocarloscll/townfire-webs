/**
 * Estrutura linear incompleta do hero (09_DIRECAO_VISUAL_MIDIA):
 * linhas técnicas em Brass, traço Rosa encontrando a primeira direção.
 * Decorativo por decisão de projeto — nenhuma informação essencial vive
 * dentro do SVG (critério de aceite do pacote V6).
 */
export function JourneyGraphic() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      <svg viewBox="0 0 320 400" className="h-full w-full" aria-hidden focusable="false">
        <g stroke="var(--tf-brass)" strokeWidth="1" opacity="0.45">
          <path d="M40 40 V300 H250" fill="none" />
          <path d="M90 90 V300" fill="none" strokeDasharray="2 7" />
          <path d="M140 140 V300" fill="none" strokeDasharray="2 7" />
          <path d="M190 190 V300" fill="none" strokeDasharray="2 7" />
          <path d="M40 90 H250" fill="none" strokeDasharray="2 7" />
          <path d="M40 190 H250" fill="none" strokeDasharray="2 7" />
        </g>

        <path
          d="M40 340 H160 V240"
          fill="none"
          stroke="var(--tf-rose)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="160" cy="240" r="6" fill="var(--tf-rose)" />
      </svg>
    </div>
  );
}
