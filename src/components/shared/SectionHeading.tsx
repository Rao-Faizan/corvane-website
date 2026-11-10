import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "split" | "stack";
  as?: "h1" | "h2";
  className?: string;
}

/**
 * Editorial heading. `split` puts the title left and description right on
 * large screens; `stack` keeps them in one column.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "stack",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "reveal",
        align === "split" ? "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12" : "max-w-3xl",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-7")}>
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <Tag id={id} className="text-headline font-semibold text-balance">
          {title}
        </Tag>
      </div>
      {description && (
        <p
          className={cn(
            "text-lead text-pretty opacity-80",
            align === "split" ? "lg:col-span-5 lg:pb-2" : "mt-6",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
