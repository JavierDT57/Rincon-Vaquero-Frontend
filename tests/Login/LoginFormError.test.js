import { test, expect } from "@playwright/test";

test("Login correcto", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("link", { name: "Iniciar sesión" }).click();


  await page.getByTestId("login-email").fill("gomelej716@datoinf.com");
  await page.getByTestId("login-password").fill("javier123$$");

  await page.getByTestId("login-submit").click();
    
  // Mensaje de error
  await expect(page.getByTestId("login-error")).toBeVisible();

  // Debe mantenerse en /login
  await expect(page).toHaveURL(/login/);
});