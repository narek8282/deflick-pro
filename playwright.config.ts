import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:8177",
    trace: "on-first-retry"
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:8177",
    reuseExistingServer: true,
    timeout: 120000
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } }
  ]
});
