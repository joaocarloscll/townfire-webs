const STEPS = [
  "Entender o imóvel",
  "Definir o caminho",
  "Desenvolver a solução",
  "Conduzir a regularização",
  "Manter o processo legível",
];

export function JourneyGraphic() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      <svg
        viewBox="0 0 320 400"
        className="h-full w-full"
        role="img"
        aria-label="Jornada Town Fire em cinco etapas, de um imóvel pendente até a conformidade"
      >
        <line
          x1="40"
          y1="40"
          x2="40"
          y2="360"
          stroke="var(--tf-brass)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        {STEPS.map((label, i) => {
          const y = 40 + i * 80;
          const isLast = i === STEPS.length - 1;
          return (
            <g key={label}>
              <circle
                cx="40"
                cy={y}
                r={isLast ? 9 : 6}
                fill={isLast ? "var(--tf-rose)" : "transparent"}
                stroke={isLast ? "var(--tf-rose)" : "var(--tf-brass)"}
                strokeWidth="1.5"
              />
              <text
                x="66"
                y={y - 8}
                className="font-display"
                fill="var(--tf-brass)"
                fontSize="11"
                letterSpacing="0.08em"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
              <text
                x="66"
                y={y + 12}
                className="font-body"
                fill={isLast ? "#F5F2EC" : "#F5F2EC"}
                fillOpacity={isLast ? 1 : 0.85}
                fontSize="15"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
