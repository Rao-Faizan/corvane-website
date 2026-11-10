import "server-only";

/**
 * Minimal read-only Sanity client over the HTTP query API (server-side only:
 * used by lib/content and the proxy; never import from client components).
 * Configure with SANITY_PROJECT_ID, SANITY_DATASET and optionally
 * SANITY_API_VERSION / SANITY_READ_TOKEN (server-side only).
 */
export function isSanityConfigured(): boolean {
  return Boolean(process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET);
}

export async function sanityQuery<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!projectId || !dataset) throw new Error("Sanity is not configured");

  const version = process.env.SANITY_API_VERSION ?? "2025-02-19";
  const token = process.env.SANITY_READ_TOKEN;
  // The CDN is only valid for unauthenticated reads.
  const host = token ? "api.sanity.io" : "apicdn.sanity.io";

  const url = new URL(`https://${projectId}.${host}/v${version}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) {
    throw new Error(`Sanity query failed: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { result: T };
  return json.result;
}
