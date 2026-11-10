import { ImageResponse } from "next/og";

export const alt = "Corvane Consulting — Business Systems. Intelligent Solutions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typographic social card shared by all pages unless a route overrides it. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#101827",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 44, background: "#FFFFFF", borderRadius: 5, display: "flex", position: "relative" }}>
            <div style={{ position: "absolute", right: 6, bottom: 6, width: 10, height: 10, background: "#16A6A1" }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>Corvane</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Build Smarter.</div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Operate Better.</div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1, color: "#16A6A1" }}>
            Grow Faster.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#A3ACBD" }}>Business Systems. Intelligent Solutions.</div>
      </div>
    ),
    size,
  );
}
