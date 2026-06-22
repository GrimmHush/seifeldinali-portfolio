import { test, expect } from "@playwright/test";

test("landing renders the thesis and key sections", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Seifeldin Ali/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Production generalist",
  );
  // Through-lines: the stack timeline and selected work are present.
  await expect(page.getByText("Stack evolution · 2020 → 2026")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Octavia Carbon" })).toBeVisible();
});

test("a case study opens from the work grid", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Octavia Carbon/ }).click();
  await expect(page).toHaveURL(/\/work\/octavia-carbon$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Octavia Carbon");
  await expect(page.getByText("Key decisions")).toBeVisible();
  await expect(page.getByRole("link", { name: /Visit live site/ })).toBeVisible();
});

test("engineering page embeds the live demo", async ({ page }) => {
  await page.goto("/engineering");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("inventory-ledger");
  await expect(
    page.locator('iframe[title="inventory-ledger — live offline-first demo"]'),
  ).toBeVisible();
});

test("primary navigation works", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
});
