import { test, expect } from "@playwright/test";

test("Recuperación", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("link", { name: "Iniciar sesión" }).click();
  await page.getByRole("button", { name: "¿Olvidaste tu contraseña?" }).click();

  await page.getByTestId("reset-email").fill("yasidaf476@bablace.com");
  await page.getByTestId("reset-send").click();

  await expect(page.getByTestId("reset-success")).toBeVisible();
});
