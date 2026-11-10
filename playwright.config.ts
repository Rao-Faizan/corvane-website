import path from "node:path";

import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

/**
 * E2E tests run against the PRODUCTION build: `npm run build` first.
 * Inquiries are written to a local JSONL file so submission can be verified
 * without email credentials.
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: `http://127.0.0.1:${PORT}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // The real deployment artifact: the standalone server (`npm run build` first).
    command: "node .next/standalone/server.js",
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    // The standalone server chdirs into .next/standalone, so pass an absolute path.
    env: {
      PORT: String(PORT),
      HOSTNAME: "127.0.0.1",
      INQUIRY_LOG_FILE: path.resolve(".data/e2e-inquiries.jsonl"),
      INQUIRY_RATE_LIMIT: "100",
    },
  },
});
