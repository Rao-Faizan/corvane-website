import { z } from "zod";

/**
 * Shared inquiry schema — used by the client form AND the API route,
 * so validation rules can never drift apart.
 */

export const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "demo", label: "Product Demo" },
  { value: "enterprise", label: "Enterprise Solution" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];
const inquiryTypeValues = inquiryTypes.map((t) => t.value) as [InquiryType, ...InquiryType[]];

export const countries = [
  "Pakistan",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Other",
] as const;

export function isInquiryType(value: string | null | undefined): value is InquiryType {
  return !!value && (inquiryTypeValues as string[]).includes(value);
}

const trimmed = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, { error: `${label} is required` })
    .min(min, { error: `${label} must be at least ${min} characters` })
    .max(max, { error: `${label} must be ${max} characters or fewer` });

export const inquirySchema = z.object({
  fullName: trimmed(2, 100, "Full name"),
  email: z
    .string()
    .trim()
    .min(1, { error: "Work email is required" })
    .max(160, { error: "Email is too long" })
    .pipe(z.email({ error: "Enter a valid email address" })),
  company: trimmed(2, 120, "Company"),
  phone: z
    .string()
    .trim()
    .max(30, { error: "Phone number is too long" })
    .refine((v) => v === "" || /^\+?[0-9\s().-]{7,30}$/.test(v), { error: "Enter a valid phone number" }),
  country: z.enum(countries, { error: "Select your country" }),
  product: z.string().trim().max(60),
  inquiryType: z.enum(inquiryTypeValues, { error: "Select an inquiry type" }),
  message: trimmed(10, 4000, "Message"),
  consent: z.boolean().refine((v) => v === true, { error: "Please accept the privacy policy to continue" }),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

/** Anti-spam fields sent alongside the inquiry; not part of the business data. */
export const antiSpamSchema = z.object({
  website: z.string().optional(), // honeypot — must be empty
  startedAt: z.number().optional(), // epoch ms when the form was rendered
});

export const inquiryRequestSchema = inquirySchema.extend(antiSpamSchema.shape);
