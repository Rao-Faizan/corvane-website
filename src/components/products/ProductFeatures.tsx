import type { Feature } from "@/types/content";

/** Renders a numbered feature grid. Returns nothing when there is no verified data. */
export function FeatureGrid({ items }: { items: Feature[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-px overflow-hidden rounded-[4px] bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <li key={f.title} className="reveal bg-paper p-7 lg:p-9">
          <span className="text-sm font-semibold text-accent-strong tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 text-xl font-semibold">{f.title}</h3>
          <p className="mt-3 text-muted">{f.description}</p>
        </li>
      ))}
    </ul>
  );
}

/** Verified features only — the section disappears when the list is empty. */
export function ProductFeatures({ features }: { features: Feature[] }) {
  if (features.length === 0) return null;
  return (
    <section aria-labelledby="features-title" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <p className="eyebrow mb-6">Features</p>
        <h2 id="features-title" className="text-headline font-semibold">
          Key capabilities
        </h2>
        <div className="mt-14">
          <FeatureGrid items={features} />
        </div>
      </div>
    </section>
  );
}
