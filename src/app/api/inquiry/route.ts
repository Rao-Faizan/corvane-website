import { NextResponse, type NextRequest } from "next/server";

import { getProducts } from "@/lib/content";
import { configuredChannels, deliverInquiry } from "@/lib/inquiry/deliver";
import { inquiryRequestSchema } from "@/lib/inquiry/schema";
import { checkSpam, createRateLimiter } from "@/lib/inquiry/spam";

const rateLimit = createRateLimiter({
  limit: Number(process.env.INQUIRY_RATE_LIMIT) || 5, // submissions per window, per client
  windowMs: 10 * 60 * 1000,
});
const MAX_BODY_BYTES = 16 * 1024;

function clientKey(req: NextRequest): string {
  // Trust X-Forwarded-For only behind your own reverse proxy (see DEPLOYMENT.md).
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || "unknown";
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; other checks still apply
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return json(403, { error: "forbidden" });

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json(415, { error: "unsupported_media_type" });
  }

  const limit = rateLimit(clientKey(req));
  if (!limit.allowed) {
    return json(429, { error: "rate_limited" }, { "Retry-After": String(limit.retryAfterSeconds) });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "payload_too_large" });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const parsed = inquiryRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json(422, { error: "validation_failed", fieldErrors });
  }

  const { website, startedAt, ...inquiry } = parsed.data;

  const spam = checkSpam({ website, startedAt });
  if (!spam.ok) {
    // Respond like a success so bots learn nothing, but never deliver.
    console.warn(`[inquiry] dropped submission (${spam.reason})`);
    return json(200, { ok: true });
  }

  const products = await getProducts();
  let productName: string | null = null;
  if (inquiry.product) {
    const match = products.find((p) => p.slug === inquiry.product);
    if (!match) return json(422, { error: "validation_failed", fieldErrors: { product: "Select a valid product" } });
    productName = match.name;
  }

  if (configuredChannels().length === 0) {
    console.error("[inquiry] No delivery channel configured. Set RESEND_* or INQUIRY_LOG_FILE (see .env.example).");
    return json(503, { error: "not_configured" });
  }

  const result = await deliverInquiry(inquiry, productName);
  if (!result.delivered) return json(502, { error: "delivery_failed" });

  return json(200, { ok: true });
}
