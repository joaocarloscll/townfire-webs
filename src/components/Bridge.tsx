// Ponte entre atos: faixa de largura total, texto contido no centro.
export function Bridge({
  children,
  tone = "light",
}: {
  children: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={tone === "dark" ? "bg-espresso" : "bg-parchment"}>
      <p
        className={`mx-auto max-w-md px-6 py-12 text-center font-display text-base font-medium tracking-[-0.01em] ${
          tone === "dark" ? "text-brass" : "text-espresso/70"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
