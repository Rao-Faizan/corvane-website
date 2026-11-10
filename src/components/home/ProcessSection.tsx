import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const processSteps = [
  { title: "Discover", text: "We map your processes, systems, data and goals with the people who run them." },
  { title: "Design", text: "We define the target solution, scope and success measures before building anything." },
  { title: "Build", text: "We configure products and develop what's needed, in short iterations you can review." },
  { title: "Integrate", text: "We connect the solution to your existing systems and prepare your teams to use it." },
  { title: "Improve", text: "We measure adoption and results, then refine the solution as your needs evolve." },
];

export function ProcessSection() {
  return (
    <Section labelledBy="process-title">
      <SectionHeading
        id="process-title"
        eyebrow="Our approach"
        title="Discover. Design. Build. Integrate. Improve."
        description="A structured approach that keeps every engagement tied to business outcomes."
        align="split"
      />
      <ol className="mt-16 grid gap-px overflow-hidden rounded-[4px] bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <li key={step.title} className="reveal group relative flex flex-col bg-paper p-7 lg:min-h-[340px] lg:p-8">
            <span className="text-sm font-semibold text-accent-strong tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <div className="mt-10 h-px w-full bg-line lg:mt-auto">
              <div
                className="h-px bg-accent transition-[width] duration-700 ease-[var(--ease-out-quart)] group-hover:w-full"
                style={{ width: `${((i + 1) / processSteps.length) * 100}%` }}
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-3 text-[0.9375rem] text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
