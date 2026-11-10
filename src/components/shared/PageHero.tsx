import { Container } from "./Container";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

/** Hero for inner pages: large editorial type, hairline rule. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-paper pt-36 pb-16 sm:pt-44 sm:pb-24">
      <Container>
        <p className="eyebrow mb-8">{eyebrow}</p>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h1 className="text-display font-semibold text-balance lg:col-span-8">{title}</h1>
          {description && <p className="text-lead text-muted text-pretty lg:col-span-4 lg:pb-3">{description}</p>}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </Container>
    </section>
  );
}
