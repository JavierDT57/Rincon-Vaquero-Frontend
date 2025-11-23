import { test, expect } from "@playwright/test";

test("Error al registrar", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("link", { name: "Iniciar sesión" }).click();
  await page.getByRole("button", { name: "Crear cuenta nueva" }).click();

  const randomEmail = `test_${Date.now()}@mail.com`;

  await page.getByTestId("register-nombre").fill("Javier");
  await page.getByTestId("register-apellidos").fill("Dolores Tolentino");
  await page.getByTestId("register-email").fill(randomEmail);
  await page.getByTestId("register-password").fill("Javier117$");
  await page.getByTestId("register-confirm").fill("Javier117$$");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  // Mensaje de error del frontend
  await expect(page.getByTestId("register-error")).toBeVisible();
  

  // Redirección 
  await expect(page).toHaveURL(/register/);
});


