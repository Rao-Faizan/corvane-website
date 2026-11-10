import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * PROVISIONAL wordmark — replace with the approved Corvane logo
 * (see docs/PRODUCT_CONTENT_REQUIREMENTS.md).
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label="Corvane Consulting — home" className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark light={light} />
      <span className={cn("text-[1.1875rem] font-bold tracking-[-0.03em]", light ? "text-white" : "text-ink")}>
        Corvane
      </span>
    </Link>
  );
}

export function LogoMark({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={cn("size-7 shrink-0", className)}>
      <rect width="28" height="28" rx="3" fill={light ? "#FFFFFF" : "#101827"} />
      <path
        d="M19 8.5h-6.5a5.5 5.5 0 0 0 0 11H19"
        fill="none"
        stroke={light ? "#101827" : "#FFFFFF"}
        strokeWidth="2.6"
      />
      <rect x="17.5" y="17.5" width="5" height="5" fill="#16A6A1" />
    </svg>
  );
}
