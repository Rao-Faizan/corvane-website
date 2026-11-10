import { Container } from "@/components/shared/Container";

/**
 * Credibility strip. No verified client logos or statistics exist yet,
 * so this states Corvane's value proposition instead of numbers.
 * Replace with verified proof points once approved.
 */
const pillars = [
  {
    title: "One partner, connected systems",
    text: "HR, sales, reporting, workflow, documents and AI planned as one coherent architecture.",
  },
  {
    title: "Built around your operations",
    text: "Every engagement starts with how your organisation actually works, not with a template.",
  },
  {
    title: "AI where it earns its place",
    text: "We apply AI to specific, practical problems with clear ownership and human oversight.",
  },
  {
    title: "Pakistan and GCC focus",
    text: "We work with mid-market and enterprise organisations across Pakistan and the GCC.",
  },
];

export function Credibility() {
  return (
    <section aria-label="Why organisations work with Corvane" className="border-y border-line bg-paper">
      <Container>
        <ul className="grid divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className={
                "reveal py-10 sm:px-8 lg:py-14 " +
                (i % 2 === 0 ? "sm:pl-0" : "") +
                (i < 2 ? " border-b border-line sm:border-b lg:border-b-0" : i === 2 ? " border-b border-line sm:border-b-0" : "")
              }
            >
              <p className="text-[0.8125rem] font-semibold text-accent-strong tabular-nums">0{i + 1}</p>
              <h2 className="mt-4 text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 text-[0.9375rem] text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
