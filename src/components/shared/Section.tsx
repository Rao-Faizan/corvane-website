import { cn } from "@/lib/utils";

import { Container } from "./Container";

type Tone = "paper" | "mist" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-text",
  mist: "bg-mist text-text",
  ink: "bg-ink text-white",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: React.ReactNode;
}

export function Section({ id, tone = "paper", className, containerClassName, labelledBy, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 sm:py-28 lg:py-36", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
