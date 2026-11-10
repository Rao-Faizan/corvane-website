import { expect, test } from "@playwright/test";

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("products dropdown works with keyboard and closes on Escape", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const trigger = nav.getByRole("button", { name: "Products" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: /Corvane Docs/ })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();

    await trigger.click();
    await nav.getByRole("link", { name: /Corvane Vision/ }).click();
    await expect(page).toHaveURL(/\/products\/vision$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Corvane Vision");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("primary links navigate and mark the current page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Solutions" }).click();
    await expect(page).toHaveURL(/\/solutions$/);
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Solutions" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu opens, navigates and closes", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await dialog.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("hero CTAs are visible and usable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Explore Our Solutions" })).toBeInViewport();
    await page.getByRole("link", { name: "Talk to Our Team", exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
