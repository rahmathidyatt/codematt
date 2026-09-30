import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/fixtures",
  testMatch: "gallery.spec.ts",
  use: {
    baseURL: "http://127.0.0.1:3001",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command:
      "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
