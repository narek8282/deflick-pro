import { expect, test } from "@playwright/test";

test("homepage renders the required editorial flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /DEFLICK \/ PRODUCTION \+ POST/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "From first treatment to final master." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Selected work" })).toBeVisible();
  await expect(page.getByText("Clients and cultural partners")).toBeVisible();
});

test("work index filters and project pages are reachable", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("button", { name: "Commercial" }).click();
  await expect(page.getByRole("link", { name: /Fashion Week Motion/i })).toBeVisible();
  await page.getByRole("link", { name: /Fashion Week Motion/i }).click();
  await expect(page.getByRole("heading", { name: /Fashion Week Motion/i }).first()).toBeVisible();
  await expect(page.getByText("DeFlick role")).toBeVisible();
});

test("admin login works with owner credentials", async ({ page }) => {
  await page.goto("/admin");
  await page.getByLabel("Login").fill("admin");
  await page.getByLabel("Password").fill("admin");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: /Content, projects, clients/i })).toBeVisible();
  await expect(page.getByText("Save locally")).toBeVisible();
  await page.getByPlaceholder("New project title").fill("Morning Test Film");
  await page.getByRole("button", { name: "Create draft" }).click();
  await expect(page.getByText("Draft created: Morning Test Film")).toBeVisible();
  await expect(page.locator('input[value="Morning Test Film"]')).toBeVisible();
});

test("contact form validates and shows a clear state", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Test Producer");
  await page.getByLabel("Email").fill("producer@example.com");
  await page.getByLabel("Project").fill("A commercial film inquiry for DeFlick production.");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByText(/Inquiry received/i)).toBeVisible();
});
