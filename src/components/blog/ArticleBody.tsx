import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/blog";

// Texto puro de um nó React, para gerar o id do título (âncora do índice).
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node)
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

// Visual do corpo do post. Só HTML que o próprio Markdown gera: nada de
// HTML cru, nada de script (react-markdown não interpreta HTML por padrão).
const components: Components = {
  h2: ({ children }) => (
    <h2
      id={slugifyHeading(textOf(children))}
      className="mt-14 scroll-mt-24 font-display text-2xl font-bold leading-[1.2] tracking-[-0.01em] text-espresso sm:text-[1.7rem]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-9 font-display text-lg font-semibold leading-snug text-espresso">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-[1.0625rem] leading-[1.75] text-charcoal/85">{children}</p>
  ),
  strong: ({ children }) => <strong className="font-semibold text-espresso">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children, className }) => (
    <ul
      className={
        className?.includes("contains-task-list")
          ? "mt-6 space-y-3 rounded-[12px] border border-brass/40 bg-white/60 p-5"
          : "mt-5 space-y-2.5 [&>li]:relative [&>li]:pl-6 [&>li]:text-[1.0625rem] [&>li]:leading-[1.7] [&>li]:text-charcoal/85 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-[2px] [&>li]:before:bg-rose"
      }
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-6 space-y-5 [counter-reset:step] [&>li]:relative [&>li]:min-h-8 [&>li]:pl-12 [&>li]:text-[1.0625rem] [&>li]:leading-[1.7] [&>li]:text-charcoal/85 [&>li]:[counter-increment:step] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:flex [&>li]:before:h-8 [&>li]:before:w-8 [&>li]:before:items-center [&>li]:before:justify-center [&>li]:before:rounded-full [&>li]:before:bg-espresso [&>li]:before:font-display [&>li]:before:text-sm [&>li]:before:font-semibold [&>li]:before:text-parchment [&>li]:before:content-[counter(step)]">
      {children}
    </ol>
  ),
  li: ({ children, className }) => (
    <li className={className?.includes("task-list-item") ? "flex items-start gap-3 !pl-0 before:!hidden" : undefined}>
      {children}
    </li>
  ),
  input: ({ checked }) => (
    <span
      aria-hidden
      className={`mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${
        checked ? "border-rose bg-rose" : "border-espresso/50 bg-parchment"
      }`}
    />
  ),
  blockquote: ({ children }) => (
    <aside className="mt-8 rounded-r-[12px] border-l-4 border-rose bg-white/70 px-6 py-1 [&_p]:mt-4 [&_p:last-child]:mb-4 [&_p]:text-base [&_p]:leading-[1.7]">
      {children}
    </aside>
  ),
  hr: () => <hr className="my-12 border-brass/40" />,
  a: ({ href = "", children }) => {
    const cls =
      "font-medium text-rose-strong underline decoration-rose/40 underline-offset-[3px] hover:text-espresso";
    if (href.startsWith("/") || href.startsWith("#"))
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="mt-7 overflow-x-auto rounded-[12px] border border-brass/40 bg-white/60">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[0.95rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-espresso text-parchment">{children}</thead>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-[0.08em]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-brass/30 px-4 py-3 align-top leading-relaxed text-charcoal/85">{children}</td>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      className="mt-8 w-full rounded-[12px] border border-brass/40 bg-white"
    />
  ),
  code: ({ children }) => (
    <code className="rounded bg-espresso/10 px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
  ),
};

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </ReactMarkdown>
  );
}
