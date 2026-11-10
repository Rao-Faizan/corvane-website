import { readFile } from "node:fs/promises";
import path from "node:path";

import { expect, test, type Page } from "@playwright/test";

const LOG = path.resolve(".data/e2e-inquiries.jsonl");

async function readLog(): Promise<Record<string, unknown>[]> {
  try {
    const text = await readFile(LOG, "utf8");
    return text
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l) as Record<string, unknown>);
  } catch {
    return [];
  }
}

async function fillValid(page: Page, company: string) {
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Work email").fill("test.person@example.com");
  await page.getByLabel("Company").fill(company);
  await page.getByLabel("Country").selectOption("Pakistan");
  await page.getByLabel(/^(Message|What would you like to see\?)$/).fill("Automated end-to-end test submission.");
  await page.getByLabel(/I agree that Corvane/).check();
}

test.describe.configure({ mode: "serial" });

test("contact form shows validation errors and blocks invalid submission", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Full name is required")).toBeVisible();
  await expect(page.getByText("Work email is required")).toBeVisible();
  await expect(page.getByText("Select your country")).toBeVisible();
  await expect(page.getByText("Please accept the privacy policy to continue")).toBeVisible();
  await expect(page.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");

  await page.getByLabel("Work email").fill("not-an-email");
  await page.getByLabel("Work email").blur();
  await expect(page.getByText("Enter a valid email address")).toBeVisible();
});

test("contact form submits and the inquiry is actually recorded", async ({ page }) => {
  const company = `E2E Contact ${Date.now()}`;
  await page.goto("/contact?type=partnership");
  await expect(page.getByLabel("Inquiry type")).toHaveValue("partnership");
  await fillValid(page, company);
  await page.waitForTimeout(3200); // minimum fill time (spam protection)
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("status")).toContainText("Your message has been received");

  const entry = (await readLog()).find((r) => r.company === company);
  expect(entry).toMatchObject({ inquiryType: "partnership", country: "Pakistan", email: "test.person@example.com" });
});

test("demo request from a product page preselects the product", async ({ page }) => {
  const company = `E2E Demo ${Date.now()}`;
  await page.goto("/products/docs");
  await page.getByRole("link", { name: "Request a Demo" }).first().click();
  const form = page.locator("#request-demo");
  await expect(form.getByLabel("Interested product")).toHaveValue("docs");
  await expect(form.getByLabel("Inquiry type")).toHaveCount(0);
  await fillValid(page, company);
  await page.waitForTimeout(3200);
  await form.getByRole("button", { name: "Request a Demo" }).click();
  await expect(form.getByRole("status")).toContainText("received");

  const entry = (await readLog()).find((r) => r.company === company);
  expect(entry).toMatchObject({ inquiryType: "demo", product: "docs", productName: "Corvane Docs" });
});

test.describe("inquiry API", () => {
  const body = {
    fullName: "Api Test",
    email: "api@example.com",
    company: "API Co",
    phone: "",
    country: "Qatar",
    product: "",
    inquiryType: "general",
    message: "Testing the API directly here.",
    consent: true,
  };

  test("rejects invalid payloads with field errors", async ({ request }) => {
    const res = await request.post("/api/inquiry", { data: { ...body, email: "bad" } });
    expect(res.status()).toBe(422);
    expect((await res.json()).fieldErrors.email).toBeTruthy();
  });

  test("rejects unknown products", async ({ request }) => {
    const res = await request.post("/api/inquiry", { data: { ...body, product: "made-up" } });
    expect(res.status()).toBe(422);
  });

  test("rejects non-JSON and cross-origin requests", async ({ request }) => {
    expect((await request.post("/api/inquiry", { form: { a: "b" } })).status()).toBe(415);
    const cross = await request.post("/api/inquiry", { data: body, headers: { Origin: "https://evil.example" } });
    expect(cross.status()).toBe(403);
  });

  test("silently drops honeypot and too-fast submissions", async ({ request }) => {
    const company = `Bot ${Date.now()}`;
    const a = await request.post("/api/inquiry", { data: { ...body, company, website: "http://spam" } });
    const b = await request.post("/api/inquiry", { data: { ...body, company, startedAt: Date.now() } });
    expect(a.status()).toBe(200);
    expect(b.status()).toBe(200);
    expect((await readLog()).some((r) => r.company === company)).toBe(false);
  });

  test("rejects GET", async ({ request }) => {
    expect((await request.get("/api/inquiry")).status()).toBe(405);
  });
});
