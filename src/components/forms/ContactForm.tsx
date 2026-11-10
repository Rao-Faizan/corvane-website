"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import {
  countries,
  inquirySchema,
  inquiryTypes,
  type Inquiry,
  type InquiryInput,
  type InquiryType,
} from "@/lib/inquiry/schema";
import { cn } from "@/lib/utils";

import { CheckboxField, SelectField, TextAreaField, TextField } from "./fields";

export interface ContactFormProps {
  products: { slug: string; name: string }[];
  defaultInquiryType?: InquiryType;
  defaultProduct?: string;
  /** "demo" hides the inquiry type selector (fixed to Product Demo). */
  variant?: "contact" | "demo";
  submitLabel?: string;
}

type Status =
  | { state: "idle" }
  | { state: "success" }
  | { state: "error"; message: string };

const errorMessages: Record<string, string> = {
  not_configured:
    "Online submissions aren't enabled yet, so your message was not sent. Please try again later.",
  delivery_failed: "We couldn't deliver your message just now, so it was not sent. Please try again in a few minutes.",
  rate_limited: "You've sent several messages in a short time. Please wait a few minutes and try again.",
  validation_failed: "Some details need attention. Please check the highlighted fields.",
  forbidden: "Your submission was blocked. Please reload the page and try again.",
};

export function ContactForm({
  products,
  defaultInquiryType = "general",
  defaultProduct = "",
  variant = "contact",
  submitLabel,
}: ContactFormProps) {
  const formId = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      phone: "",
      country: "" as InquiryInput["country"],
      product: products.some((p) => p.slug === defaultProduct) ? defaultProduct : "",
      inquiryType: variant === "demo" ? "demo" : defaultInquiryType,
      message: "",
      consent: false,
    },
  });

  // Record when the user first interacts (minimum fill-time spam check).
  const markStarted = () => {
    if (startedAt === null) setStartedAt(Date.now());
  };

  const onSubmit = async (values: Inquiry, event?: BaseSyntheticEvent) => {
    const form = event?.target instanceof HTMLFormElement ? event.target : null;
    const honeypotValue = form ? String(new FormData(form).get("website") ?? "") : "";
    setStatus({ state: "idle" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypotValue,
          startedAt: startedAt ?? undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
      };
      if (res.ok && data.ok) {
        setStatus({ state: "success" });
        reset();
        setStartedAt(null);
        return;
      }
      if (data.fieldErrors) {
        for (const [field, message] of Object.entries(data.fieldErrors)) {
          if (field in values) setError(field as keyof InquiryInput, { message });
        }
      }
      setStatus({
        state: "error",
        message: errorMessages[data.error ?? ""] ?? "Something went wrong, so your message was not sent. Please try again.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "We couldn't reach our server, so your message was not sent. Check your connection and try again.",
      });
    }
  };

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-[4px] border border-line bg-paper p-8 sm:p-10">
        <CheckCircle2 aria-hidden className="size-8 text-accent-strong" />
        <h3 className="mt-6 text-title font-semibold">Thank you. Your message has been received.</h3>
        <p className="mt-3 text-muted">A member of our team will review it and reply to the email address you provided.</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="link-underline mt-8 text-sm font-semibold text-accent-strong"
        >
          Send another message
        </button>
      </div>
    );
  }

  const ids = (name: string) => `${formId}-${name}`;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onFocus={markStarted}
      aria-describedby={status.state === "error" ? ids("status") : undefined}
      className="relative grid gap-x-6 gap-y-6 sm:grid-cols-2"
    >
      <TextField id={ids("name")} label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
      <TextField
        id={ids("email")}
        label="Work email"
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <TextField id={ids("company")} label="Company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
      <TextField
        id={ids("phone")}
        label="Phone number"
        optional
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <SelectField id={ids("country")} label="Country" error={errors.country?.message} {...register("country")}>
        <option value="" disabled>
          Select country
        </option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </SelectField>
      <SelectField id={ids("product")} label="Interested product" optional error={errors.product?.message} {...register("product")}>
        <option value="">Not sure yet</option>
        {products.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.name}
          </option>
        ))}
      </SelectField>

      {variant === "contact" ? (
        <SelectField
          id={ids("type")}
          label="Inquiry type"
          error={errors.inquiryType?.message}
          className="sm:col-span-2"
          {...register("inquiryType")}
        >
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </SelectField>
      ) : (
        <input type="hidden" {...register("inquiryType")} />
      )}

      <TextAreaField
        id={ids("message")}
        label={variant === "demo" ? "What would you like to see?" : "Message"}
        rows={5}
        error={errors.message?.message}
        className="sm:col-span-2"
        {...register("message")}
      />

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={ids("website")}>Website</label>
        <input id={ids("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <CheckboxField id={ids("consent")} error={errors.consent?.message} className="sm:col-span-2" {...register("consent")}>
        I agree that Corvane may use these details to respond to my inquiry, as described in the{" "}
        <Link href="/privacy-policy" className="font-semibold text-accent-strong underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </CheckboxField>

      <div className="flex flex-col gap-4 sm:col-span-2">
        {status.state === "error" && (
          <p id={ids("status")} role="alert" className="rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {status.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-ink px-7 font-semibold text-white transition-colors hover:bg-[#1d2a3f] disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:self-start",
          )}
        >
          {isSubmitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {isSubmitting ? "Sending…" : (submitLabel ?? (variant === "demo" ? "Request a Demo" : "Send Message"))}
        </button>
      </div>
    </form>
  );
}
