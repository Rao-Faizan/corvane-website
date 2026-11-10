import type { ProductVisualKind } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Abstract schematic illustrations, one per product family.
 * These are deliberately NOT screenshots and make no claim about the real UI.
 * Replace with approved product screenshots once verified.
 */

const INK = "#101827";
const ACCENT = "#16A6A1";

interface Palette {
  bg: string;
  line: string;
  soft: string;
  strong: string;
}

const palettes: Record<"light" | "dark", Palette> = {
  light: { bg: "#F4F5F7", line: "#D5D9E0", soft: "#E3E6EB", strong: INK },
  dark: { bg: "#162033", line: "rgba(255,255,255,0.14)", soft: "rgba(255,255,255,0.08)", strong: "#FFFFFF" },
};

function People({ c }: { c: Palette }) {
  const nodes = [
    [200, 58],
    [110, 130],
    [290, 130],
    [60, 202],
    [160, 202],
    [240, 202],
    [340, 202],
  ];
  return (
    <>
      <path
        d="M200 58v36M110 130V94h180v36M110 130v36M60 202v-36h100v36M290 130v36M240 202v-36h100v36"
        fill="none"
        stroke={c.line}
        strokeWidth="1.5"
      />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 32} y={y - 16} width="64" height="32" rx="3" fill={i === 0 ? c.strong : c.soft} />
          <circle cx={x - 18} cy={y} r="6" fill={i === 0 ? ACCENT : c.line} />
          <rect x={x - 8} y={y - 3} width="30" height="6" rx="1" fill={i === 0 ? "rgba(255,255,255,0.5)" : c.line} />
        </g>
      ))}
    </>
  );
}

function Sales({ c }: { c: Palette }) {
  const cols = [3, 2, 3, 1];
  return (
    <>
      {cols.map((count, ci) => {
        const x = 34 + ci * 86;
        return (
          <g key={ci}>
            <rect x={x} y="40" width="72" height="6" rx="1" fill={c.line} />
            {Array.from({ length: count }).map((_, ri) => (
              <rect
                key={ri}
                x={x}
                y={60 + ri * 54}
                width="72"
                height="44"
                rx="3"
                fill={ci === 3 ? c.strong : c.soft}
                stroke={ci === 3 ? "none" : c.line}
              />
            ))}
            {ci === 3 && <rect x={x + 10} y="76" width="24" height="6" rx="1" fill={ACCENT} />}
          </g>
        );
      })}
      <path d="M106 82h14M192 82h14M278 82h14" stroke={ACCENT} strokeWidth="1.5" />
    </>
  );
}

function Insights({ c }: { c: Palette }) {
  const bars = [62, 94, 78, 120, 104, 146, 132];
  return (
    <>
      {[60, 105, 150, 195].map((y) => (
        <line key={y} x1="36" x2="364" y1={y} y2={y} stroke={c.soft} strokeWidth="1" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={48 + i * 46} y={210 - h} width="22" height={h} rx="2" fill={i === 5 ? c.strong : c.line} />
      ))}
      <polyline
        points="59,140 105,118 151,126 197,92 243,100 289,58 335,70"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="289" cy="58" r="5" fill={ACCENT} />
    </>
  );
}

function Workflow({ c }: { c: Palette }) {
  return (
    <>
      <path d="M92 130h56M232 130h40M300 102V70h40M300 158v32h40" fill="none" stroke={c.line} strokeWidth="1.5" />
      <rect x="28" y="106" width="64" height="48" rx="3" fill={c.soft} stroke={c.line} />
      <rect x="148" y="106" width="84" height="48" rx="3" fill={c.strong} />
      <rect x="162" y="126" width="40" height="6" rx="1" fill={ACCENT} />
      <rect x="276" y="106" width="48" height="48" rx="3" fill={c.soft} stroke={c.line} transform="rotate(45 300 130)" />
      <rect x="340" y="54" width="40" height="32" rx="3" fill={c.soft} stroke={c.line} />
      <rect x="340" y="174" width="40" height="32" rx="3" fill={c.soft} stroke={c.line} />
      <circle cx="120" cy="130" r="4" fill={ACCENT} />
    </>
  );
}

function Docs({ c }: { c: Palette }) {
  return (
    <>
      <rect x="64" y="34" width="132" height="192" rx="3" fill={c.soft} stroke={c.line} />
      {[62, 80, 98, 132, 150, 168, 186].map((y, i) => (
        <rect key={y} x="82" y={y} width={i % 3 === 2 ? 60 : 96} height="6" rx="1" fill={c.line} />
      ))}
      <rect x="76" y="124" width="108" height="22" rx="2" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <rect x="60" y="112" width="140" height="2" fill={ACCENT} opacity="0.7" />
      <path d="M200 135h40" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="3 4" />
      <rect x="244" y="82" width="104" height="106" rx="3" fill={c.strong} />
      {[100, 124, 148].map((y) => (
        <g key={y}>
          <rect x="258" y={y} width="28" height="6" rx="1" fill="rgba(255,255,255,0.35)" />
          <rect x="294" y={y} width="40" height="6" rx="1" fill={ACCENT} opacity={y === 124 ? 1 : 0.55} />
        </g>
      ))}
    </>
  );
}

function Brain({ c }: { c: Palette }) {
  return (
    <>
      <rect x="48" y="42" width="190" height="40" rx="3" fill={c.soft} stroke={c.line} />
      <rect x="64" y="58" width="120" height="7" rx="1" fill={c.line} />
      <rect x="162" y="100" width="190" height="62" rx="3" fill={c.strong} />
      <rect x="178" y="116" width="140" height="7" rx="1" fill="rgba(255,255,255,0.4)" />
      <rect x="178" y="132" width="96" height="7" rx="1" fill="rgba(255,255,255,0.4)" />
      <g>
        <rect x="178" y="176" width="70" height="20" rx="10" fill="none" stroke={ACCENT} strokeWidth="1.5" />
        <rect x="256" y="176" width="70" height="20" rx="10" fill="none" stroke={c.line} strokeWidth="1.5" />
      </g>
      <rect x="48" y="212" width="304" height="18" rx="2" fill={c.soft} stroke={c.line} />
      <circle cx="338" cy="221" r="4" fill={ACCENT} />
    </>
  );
}

function Vision({ c }: { c: Palette }) {
  return (
    <>
      <rect x="36" y="34" width="328" height="192" rx="3" fill={c.soft} stroke={c.line} />
      {[100, 166, 232, 298].map((x) => (
        <line key={x} x1={x} x2={x} y1="34" y2="226" stroke={c.line} strokeWidth="0.75" opacity="0.6" />
      ))}
      <rect x="76" y="92" width="74" height="96" fill="none" stroke={ACCENT} strokeWidth="2" />
      <rect x="76" y="78" width="46" height="14" fill={ACCENT} />
      <rect x="216" y="116" width="98" height="64" fill="none" stroke={c.strong} strokeWidth="2" />
      <rect x="216" y="102" width="40" height="14" fill={c.strong} />
      {[
        [36, 34],
        [364, 34],
        [36, 226],
        [364, 226],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x + (x < 200 ? 12 : -12)} ${y}H${x}V${y + (y < 130 ? 12 : -12)}`}
          fill="none"
          stroke={c.strong}
          strokeWidth="2"
        />
      ))}
    </>
  );
}

const drawings: Record<ProductVisualKind, (props: { c: Palette }) => React.JSX.Element> = {
  people: People,
  sales: Sales,
  insights: Insights,
  workflow: Workflow,
  docs: Docs,
  brain: Brain,
  vision: Vision,
};

interface ProductVisualProps {
  kind: ProductVisualKind;
  tone?: "light" | "dark";
  className?: string;
}

export function ProductVisual({ kind, tone = "light", className }: ProductVisualProps) {
  const c = palettes[tone];
  const Drawing = drawings[kind] ?? Workflow; // fallback if CMS content omits the illustration
  return (
    <svg
      viewBox="0 0 400 260"
      role="img"
      aria-label="Abstract illustration"
      className={cn("block h-auto w-full", className)}
      style={{ background: c.bg }}
    >
      <Drawing c={c} />
    </svg>
  );
}
