import { expect, test } from "@playwright/test";

test("homepage renders the required editorial flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /WE MAKE FILMS MOVE/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "EXPLORE PROJECTS" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "MTS" })).toBeVisible();
  await expect(page.getByText("Golden Apricot").first()).toBeVisible();
});

test("work index filters and project pages are reachable", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("button", { name: "COMMERCIAL" }).click();
  await expect(page.getByRole("link", { name: /Mercedes-Benz/i })).toBeVisible();
  await page.getByRole("link", { name: /MTS/i }).click();
  await expect(page.getByText("DeFlick services")).toBeVisible();
  await expect(page.getByRole("heading", { name: "INFORMATION" })).toBeVisible();
});

test("admin login works with owner credentials", async ({ page }) => {
  await page.goto("/admin");
  await page.getByLabel("Логин").fill("owner");
  await page.getByLabel("Пароль").fill("Narek-Deflick-2026!");
  await page.getByRole("button", { name: "Войти" }).click();
  await expect(page.getByRole("heading", { name: /Контент, проекты, клиенты/i })).toBeVisible();
  await expect(page.getByText("Сохранить черновик")).toBeVisible();
  await page.getByPlaceholder("Название нового проекта").fill("Morning Test Film");
  await page.getByRole("button", { name: "Создать черновик" }).click();
  await expect(page.getByText("Draft created: Morning Test Film")).toBeVisible();
  await expect(page.locator('input[value="Morning Test Film"]')).toBeVisible();
});

test("contact form validates and shows a clear state", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Test Producer");
  await page.getByLabel("Email").fill("producer@example.com");
  await page.getByRole("textbox", { name: "Project" }).fill("A commercial film inquiry for DeFlick production.");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByText(/Inquiry received/i)).toBeVisible();
});
