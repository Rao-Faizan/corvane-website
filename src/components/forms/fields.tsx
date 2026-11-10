import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const controlClass = (invalid: boolean) =>
  cn(
    "block w-full rounded-[4px] border bg-white px-4 text-[1rem] text-text transition-colors placeholder:text-muted/70",
    "focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0",
    invalid ? "border-red-600" : "border-[#cfd4dc] hover:border-ink/50",
  );

interface FieldShellProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

function FieldShell({ id, label, optional, error, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-text">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const a11y = (id: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

type BaseProps = { id: string; label: string; optional?: boolean; error?: string; className?: string };

export function TextField({ id, label, optional, error, className, ...props }: BaseProps & ComponentPropsWithRef<"input">) {
  return (
    <FieldShell id={id} label={label} optional={optional} error={error} className={className}>
      <input id={id} className={cn(controlClass(!!error), "h-12")} aria-required={!optional} {...a11y(id, error)} {...props} />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  optional,
  error,
  className,
  ...props
}: BaseProps & ComponentPropsWithRef<"textarea">) {
  return (
    <FieldShell id={id} label={label} optional={optional} error={error} className={className}>
      <textarea
        id={id}
        className={cn(controlClass(!!error), "min-h-32 resize-y py-3")}
        aria-required={!optional}
        {...a11y(id, error)}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  optional,
  error,
  className,
  children,
  ...props
}: BaseProps & ComponentPropsWithRef<"select">) {
  return (
    <FieldShell id={id} label={label} optional={optional} error={error} className={className}>
      <div className="relative">
        <select
          id={id}
          className={cn(controlClass(!!error), "h-12 appearance-none pr-10")}
          aria-required={!optional}
          {...a11y(id, error)}
          {...props}
        >
          {children}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
      </div>
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  error,
  className,
  children,
  ...props
}: { id: string; error?: string; className?: string; children: ReactNode } & ComponentPropsWithRef<"input">) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#101827]"
          aria-required
          {...a11y(id, error)}
          {...props}
        />
        <label htmlFor={id} className="text-sm text-muted">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
