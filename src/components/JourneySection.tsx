const STEPS = [
  {
    title: "Entendemos o imóvel",
    text: "Levantamos o que ele é hoje: uso, ocupação, área e histórico.",
  },
  {
    title: "Identificamos o caminho",
    text: "Cruzamos o cenário real com o que a norma aplicável exige.",
  },
  {
    title: "Desenvolvemos a solução",
    text: "Projetamos tecnicamente o que sustenta a regularização.",
  },
  {
    title: "Acompanhamos as exigências",
    text: "Conduzimos a interlocução com os órgãos até cada pendência ser resolvida.",
  },
  {
    title: "Buscamos a conformidade",
    text: "Você chega ao final do processo sabendo exatamente o que foi feito.",
  },
];

export function JourneySection() {
  return (
    <section id="como-funciona" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
          Como funciona
        </h2>

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t-2 border-espresso pt-5">
              <span className="font-display text-2xl font-bold text-rose">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-espresso">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
