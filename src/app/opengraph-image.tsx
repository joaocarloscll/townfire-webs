import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#2B1C14",
          color: "#F5F2EC",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#D2B48C",
            display: "flex",
          }}
        >
          Town Fire
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 960,
            display: "flex",
          }}
        >
          Seu imóvel precisa estar apto. O caminho até lá não precisa ser
          complicado.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            color: "#D4748C",
            display: "flex",
          }}
        >
          Projeta · Regulariza · Aprova
        </div>
      </div>
    ),
    { ...size }
  );
}
