import { NextResponse, type NextRequest } from "next/server";

import { getPublicSlugs, type Collection } from "@/lib/content/slugs";

/**
 * Returns a genuine HTTP 404 for unknown product / case study / article slugs.
 * Rewriting to a path with no route renders the branded not-found page with
 * status 404 before any streaming begins.
 */
export const config = {
  matcher: ["/products/:slug", "/case-studies/:slug", "/insights/:slug"],
};

export async function proxy(request: NextRequest) {
  const [, collection, slug] = request.nextUrl.pathname.split("/");
  if (!collection || !slug) return NextResponse.next();

  const slugs = await getPublicSlugs();
  if (!slugs) return NextResponse.next(); // fail open: the page still 404s (soft) if needed

  if (!slugs[collection as Collection]?.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}
