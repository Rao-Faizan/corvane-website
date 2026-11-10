import { Container } from "./Container";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <article className="bg-paper pt-36 pb-24 sm:pt-44">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-8">Legal</p>
        <h1 className="text-headline font-semibold">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        <p className="mt-10 text-lead text-muted">{intro}</p>
        <div className="mt-14 space-y-12">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-muted">
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
