import { ButtonLink } from "./ButtonLink";

interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
}

export function EmptyState({ title, description, ctaLabel, ctaHref, tone = "light" }: EmptyStateProps) {
  const dark = tone === "dark";
  return (
    <div
      className={
        dark
          ? "grid gap-8 border-t border-ink-line pt-10 md:grid-cols-12"
          : "grid gap-8 border-t border-line pt-10 md:grid-cols-12"
      }
    >
      <h3 className="text-title font-semibold md:col-span-5">{title}</h3>
      <div className="md:col-span-6 md:col-start-7">
        <p className={dark ? "text-ink-muted" : "text-muted"}>{description}</p>
        <ButtonLink href={ctaHref} variant={dark ? "ghost-inverse" : "secondary"} className="mt-8">
          {ctaLabel}
        </ButtonLink>
      </div>
    </div>
  );
}
