/**
 * Lightweight spam protection: honeypot, minimum fill time and a
 * fixed-window rate limit per client key.
 *
 * The rate limiter is in-memory, so it is per process. For multi-instance
 * deployments, use a shared store or reverse-proxy limits (docs/DEPLOYMENT.md).
 * To add a CAPTCHA (e.g. Cloudflare Turnstile), verify the token in `checkSpam`.
 */

export const MIN_FILL_MS = 3000;

export type SpamVerdict = { ok: true } | { ok: false; reason: "honeypot" | "too_fast" };

export function checkSpam(input: { website?: string; startedAt?: number }, now = Date.now()): SpamVerdict {
  if (input.website && input.website.trim() !== "") return { ok: false, reason: "honeypot" };
  if (typeof input.startedAt === "number" && now - input.startedAt < MIN_FILL_MS) {
    return { ok: false, reason: "too_fast" };
  }
  return { ok: true };
}

interface Window {
  count: number;
  resetAt: number;
}

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, Window>();

  return function take(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
    // Opportunistic cleanup keeps memory bounded.
    if (hits.size > 5000) {
      for (const [k, w] of hits) if (w.resetAt <= now) hits.delete(k);
    }
    const current = hits.get(key);
    if (!current || current.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }
    if (current.count >= limit) {
      return { allowed: false, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) };
    }
    current.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  };
}
