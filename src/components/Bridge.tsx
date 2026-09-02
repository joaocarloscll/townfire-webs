export function Bridge({
  children,
  tone = "light",
}: {
  children: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`mx-auto max-w-md px-6 py-10 text-center font-display text-base font-medium tracking-[-0.01em] ${
        tone === "dark" ? "bg-espresso text-brass" : "bg-parchment text-espresso/70"
      }`}
    >
      {children}
    </p>
  );
}
