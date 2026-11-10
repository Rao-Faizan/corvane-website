import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverse" | "ghost-inverse" | "text";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-[#1d2a3f]",
  secondary: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  inverse: "bg-white text-ink hover:bg-accent hover:text-ink",
  "ghost-inverse": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
  text: "px-0! text-accent-strong",
};

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  icon?: boolean;
}

export function ButtonLink({ href, variant = "primary", className, children, icon = true }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.9375rem] font-semibold transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}
