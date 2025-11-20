import { test, expect } from "@playwright/test";

test("registro exitoso", async ({ page }) => {
  // URL
  await page.goto("http://localhost:5173/");

  //  login
  await page.getByRole("link", { name: "Iniciar sesión" }).click();

  //  registro
  await page.getByRole("button", { name: "Crear cuenta nueva" }).click();

  // formulario 
  await page.getByTestId("register-nombre").fill("Javier");
  await page.getByTestId("register-apellidos").fill("Dolores Tolentino");
  await page.getByTestId("register-email").fill("pifap37727@aikunkun.com");
  await page.getByTestId("register-password").fill("Javier117$");
  await page.getByTestId("register-confirm").fill("Javier117$");

  // Enviar formulario
  await page.getByRole("button", { name: "Crear cuenta" }).click();

  // Validación
  await expect(
    page.getByText("Registro exitoso.", { exact: false })
  ).toBeVisible();

  // redirección al login 
  await page.waitForTimeout(1200);
  await expect(page).toHaveURL(/\/login/);
});
