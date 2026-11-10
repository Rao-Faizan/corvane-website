import { describe, expect, it } from "vitest";

import { buildEmail, escapeHtml } from "@/lib/inquiry/deliver";
import { inquiryRequestSchema, inquirySchema, isInquiryType } from "@/lib/inquiry/schema";
import { checkSpam, createRateLimiter, MIN_FILL_MS } from "@/lib/inquiry/spam";

const valid = {
  fullName: "Ayesha Khan",
  email: "ayesha@example.com",
  company: "Example Industries",
  phone: "+92 300 1234567",
  country: "Pakistan",
  product: "people",
  inquiryType: "demo",
  message: "We would like to see the HR system for 400 staff.",
  consent: true,
};

describe("inquiry schema", () => {
  it("accepts a valid inquiry", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("trims whitespace", () => {
    expect(inquirySchema.parse({ ...valid, fullName: "  Ayesha Khan  " }).fullName).toBe("Ayesha Khan");
  });

  it.each([
    ["fullName", ""],
    ["email", "not-an-email"],
    ["company", "x"],
    ["country", "Atlantis"],
    ["inquiryType", "spam"],
    ["message", "short"],
    ["phone", "abc"],
    ["consent", false],
  ])("rejects invalid %s", (field, value) => {
    const r = inquirySchema.safeParse({ ...valid, [field]: value });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0]?.path[0]).toBe(field);
  });

  it("allows an empty optional phone and product", () => {
    expect(inquirySchema.safeParse({ ...valid, phone: "", product: "" }).success).toBe(true);
  });

  it("rejects over-long messages", () => {
    expect(inquirySchema.safeParse({ ...valid, message: "a".repeat(4001) }).success).toBe(false);
  });

  it("request schema accepts anti-spam fields", () => {
    expect(inquiryRequestSchema.safeParse({ ...valid, website: "", startedAt: 1 }).success).toBe(true);
  });

  it("recognises inquiry types", () => {
    expect(isInquiryType("demo")).toBe(true);
    expect(isInquiryType("nope")).toBe(false);
    expect(isInquiryType(null)).toBe(false);
  });
});

describe("spam checks", () => {
  it("flags a filled honeypot", () => {
    expect(checkSpam({ website: "http://spam" })).toEqual({ ok: false, reason: "honeypot" });
  });
  it("flags submissions faster than the minimum fill time", () => {
    const now = 100_000;
    expect(checkSpam({ startedAt: now - MIN_FILL_MS + 1 }, now)).toEqual({ ok: false, reason: "too_fast" });
    expect(checkSpam({ startedAt: now - MIN_FILL_MS }, now)).toEqual({ ok: true });
  });
  it("passes a normal submission", () => {
    expect(checkSpam({ website: "", startedAt: 0 }, 60_000)).toEqual({ ok: true });
  });
});

describe("rate limiter", () => {
  it("limits per key within a window and resets afterwards", () => {
    const take = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(take("a", 0).allowed).toBe(true);
    expect(take("a", 10).allowed).toBe(true);
    const blocked = take("a", 20);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(1);
    expect(take("b", 20).allowed).toBe(true);
    expect(take("a", 1001).allowed).toBe(true);
  });
});

describe("email building", () => {
  it("escapes HTML in user input", () => {
    expect(escapeHtml(`<script>"x"&'y'</script>`)).toBe(
      "&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;",
    );
    const { html, text, subject } = buildEmail(
      inquirySchema.parse({ ...valid, message: "<img src=x onerror=alert(1)>" }),
      "Corvane People",
    );
    expect(html).not.toContain("<img");
    expect(text).toContain("<img src=x"); // plain-text part keeps content verbatim
    expect(subject).toContain("Product Demo");
  });
});
