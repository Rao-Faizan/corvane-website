import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";

/**
 * Hero visual: CSS-3D architectural stack of system layers.
 * Zero JavaScript, GPU-composited, motion disabled under reduced-motion.
 */
const layers = [
  { label: "Operations", tone: "base" },
  { label: "Data", tone: "base" },
  { label: "Intelligence", tone: "accent" },
  { label: "Decisions", tone: "ink" },
] as const;

function SystemStack() {
  return (
    <div aria-hidden className="hero-stage relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[560px] lg:-mr-8 lg:max-w-[620px]">
      <div className="hero-stack absolute inset-[12%]">
        {layers.map((layer, i) => (
          <div key={layer.label} className="hero-slab" style={{ "--layer": i } as React.CSSProperties}>
            <div
              className={
                layer.tone === "ink"
                  ? "absolute inset-0 rounded-[6px] bg-ink shadow-[0_40px_80px_-30px_rgb(16_24_39/0.55)]"
                  : layer.tone === "accent"
                    ? "absolute inset-0 rounded-[6px] border border-accent/60 bg-white/70"
                    : "absolute inset-0 rounded-[6px] border border-ink/12 bg-white/75"
              }
            >
              {/* inner grid */}
              <div
                className="absolute inset-[10%] opacity-70"
                style={{
                  backgroundImage:
                    layer.tone === "ink"
                      ? "linear-gradient(to right, rgb(255 255 255 / .09) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / .09) 1px, transparent 1px)"
                      : "linear-gradient(to right, rgb(16 24 39 / .08) 1px, transparent 1px), linear-gradient(to bottom, rgb(16 24 39 / .08) 1px, transparent 1px)",
                  backgroundSize: "25% 25%",
                }}
              />
              {layer.tone === "ink" && (
                <>
                  <div className="absolute top-[22%] left-[22%] h-[18%] w-[30%] rounded-[3px] bg-accent" />
                  <div className="absolute top-[22%] left-[58%] h-[18%] w-[20%] rounded-[3px] bg-white/15" />
                  <div className="absolute top-[48%] left-[22%] h-[30%] w-[56%] overflow-hidden rounded-[3px] bg-white/10">
                    <div className="hero-scan absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                  </div>
                </>
              )}
              {layer.tone === "accent" && (
                <div className="absolute top-[30%] left-[30%] size-[14%] rounded-full border-2 border-accent" />
              )}
              <span
                className={
                  "absolute bottom-[6%] left-[8%] text-[11px] font-semibold tracking-[0.16em] uppercase " +
                  (layer.tone === "ink" ? "text-white/70" : "text-ink/45")
                }
              >
                {layer.label}
              </span>
            </div>
          </div>
        ))}
        {/* vertical connectors */}
        <div
          className="absolute top-[20%] left-[80%] h-[2px] w-[2px] bg-accent"
          style={{ transform: "translateZ(0)", boxShadow: "0 0 0 3px rgb(22 166 161 / .2)" }}
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-8">Business Systems. Intelligent Solutions.</p>
          <h1 id="hero-title" className="text-display font-semibold">
            <span className="block">Build Smarter.</span>
            <span className="block">Operate Better.</span>
            <span className="block text-accent-strong">Grow Faster.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lead text-muted text-pretty">
            We design intelligent business systems that simplify operations, connect teams and unlock better
            decisions.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/solutions">Explore Our Solutions</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Talk to Our Team
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <SystemStack />
        </div>
      </Container>
    </section>
  );
}
