import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";

interface FinalCTAProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function FinalCTA({
  title = "Let's Build a Smarter Business.",
  description = "Tell us about your operations and goals. We'll show you where better systems and practical AI can make a difference.",
  ctaLabel = "Discuss Your Project",
  ctaHref = "/contact",
}: FinalCTAProps) {
  return (
    <section aria-labelledby="final-cta-title" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 id="final-cta-title" className="reveal text-display font-semibold text-balance lg:col-span-8">
            {title}
          </h2>
          <div className="reveal lg:col-span-4 lg:pb-3">
            <p className="text-lead text-ink-muted">{description}</p>
            <ButtonLink href={ctaHref} variant="inverse" className="mt-8">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
