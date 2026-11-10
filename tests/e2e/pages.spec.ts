import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { routes } from "./routes";

for (const route of routes) {
  test.describe(`page ${route}`, () => {
    test("renders with metadata and without console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));

      const res = await page.goto(route, { waitUntil: "networkidle" });
      expect(res?.status()).toBe(200);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Corvane/);
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
      expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(
        new RegExp(`${route === "/" ? "/?" : route}$`),
      );
      expect(await page.locator('meta[property="og:title"]').getAttribute("content")).toBeTruthy();
      expect(await page.locator('meta[property="og:image"]').count()).toBeGreaterThan(0);
      expect(await page.locator("html").getAttribute("lang")).toBe("en");

      // Internal readiness labels must never leak to the public site.
      const text = await page.locator("body").innerText();
      expect(text).not.toMatch(/development-required|not-approved|production-ready|demo-ready|lorem ipsum/i);

      expect(errors, errors.join("\n")).toEqual([]);
    });

    test("has no serious accessibility violations", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(
        serious,
        serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`).join("\n"),
      ).toEqual([]);
    });
  });
}

test("unknown routes and slugs show the 404 page", async ({ page }) => {
  for (const path of ["/does-not-exist", "/products/not-a-product", "/case-studies/unknown", "/insights/unknown"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page isn't here.");
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  }
});

test("unknown routes and slugs return a real HTTP 404 (not a soft 404)", async ({ request }) => {
  for (const path of ["/does-not-exist", "/products/not-a-product", "/case-studies/unknown", "/insights/unknown"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
  expect((await request.get("/products/people")).status()).toBe(200);
});

test("robots.txt blocks crawling unless indexing is enabled, sitemap lists public pages", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of routes) expect(sitemap).toContain(`<loc>http://localhost:3000${route === "/" ? "" : route}`);
});

test("security headers are set", async ({ request }) => {
  const res = await request.get("/");
  expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  expect(res.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(res.headers()["x-powered-by"]).toBeUndefined();
});
