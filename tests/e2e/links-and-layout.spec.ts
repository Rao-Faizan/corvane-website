import { expect, test } from "@playwright/test";

import { routes } from "./routes";

test("every internal link and in-page anchor resolves", async ({ page, request }) => {
  const hrefs = new Set<string>();
  const anchors = new Map<string, Set<string>>(); // path -> ids referenced by hash links

  for (const route of routes) {
    await page.goto(route);
    const found = await page.locator("a[href]").evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
    for (const href of found) {
      if (href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:/.test(href)) continue;
      const url = new URL(href, `http://x${route}`);
      hrefs.add(url.pathname + url.search);
      if (url.hash) {
        const set = anchors.get(url.pathname) ?? new Set();
        set.add(url.hash.slice(1));
        anchors.set(url.pathname, set);
      }
    }
  }

  for (const href of hrefs) {
    const res = await request.get(href);
    expect(res.status(), href).toBeLessThan(400);
  }
  for (const [path, ids] of anchors) {
    await page.goto(path);
    for (const id of ids) await expect(page.locator(`[id="${id}"]`), `${path}#${id}`).toHaveCount(1);
  }
});

const widths = [375, 390, 768, 1024, 1440, 1920];
const layoutRoutes = ["/", "/products", "/products/docs", "/solutions", "/industries", "/about", "/contact"];

for (const width of widths) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of layoutRoutes) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${route} @ ${width}px`).toBeLessThanOrEqual(0);
    }
  });
}

test("images have alt text and form controls have labels", async ({ page }) => {
  for (const route of ["/", "/contact", "/products/people"]) {
    await page.goto(route);
    expect(await page.locator("img:not([alt])").count(), route).toBe(0);
    const unlabeled = await page
      .locator("input:not([type=hidden]):not([tabindex='-1']), select, textarea")
      .evaluateAll((els) => els.filter((el) => !(el as HTMLInputElement).labels?.length).map((el) => el.id));
    expect(unlabeled, route).toEqual([]);
  }
});
