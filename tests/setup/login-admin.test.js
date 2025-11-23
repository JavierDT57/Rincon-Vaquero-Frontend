import { test, expect } from "@playwright/test";

test("login admin setup", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Iniciar sesión" }).click();

  await page.getByTestId("login-email").fill("gofavan449@aikunkun.com");
  await page.getByTestId("login-password").fill("Javier123$");
  await page.getByTestId("login-submit").click();

  // esperar a que AuthContext cargue
  await page.waitForTimeout(1000);

  await page.context().storageState({ path: "tests/storage/admin.json" });
});
