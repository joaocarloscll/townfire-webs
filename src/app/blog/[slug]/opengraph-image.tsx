import { ImageResponse } from "next/og";
import { CATEGORY_LABELS, getAllPosts, getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Guia Town Fire";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// Capa gerada por código na paleta da marca (Espresso, Rosa, Latão): motivo de
// degraus subindo, a ideia de "caminho até a conformidade". Sem foto genérica,
// sem capacete nem extintor (ver PRODUCT.md).
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Guias Town Fire";
  const label = post ? CATEGORY_LABELS[post.category] : "Guias";
  const kicker = post?.format === "noticia" ? "Na notícia" : `Guia · ${label}`;
  const fontSize = title.length <= 48 ? 70 : title.length <= 66 ? 60 : 52;

  const steps = [
    { h: 70, c: "#F6D6DE", o: 0.35 },
    { h: 130, c: "#D2B48C", o: 0.6 },
    { h: 200, c: "#D4748C", o: 0.85 },
    { h: 280, c: "#D4748C", o: 1 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#2B1C14",
          color: "#F5F2EC",
          padding: "70px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 760, justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#D2B48C",
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 34,
                fontSize,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(245,242,236,0.6)" }}>
            Town Fire Engenharia · townfire.com.br/blog
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 70,
            display: "flex",
            alignItems: "flex-end",
            gap: 14,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 62,
                height: s.h,
                background: s.c,
                opacity: s.o,
                borderRadius: 6,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
