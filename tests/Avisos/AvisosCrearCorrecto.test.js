import { test, expect } from "@playwright/test";

test.describe("Avisos - Crear aviso (correcto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Crear aviso correctamente como admin", async ({ page }) => {
    // Abrir directamente la página de avisos 
    await page.goto("http://localhost:5173/avisos");

    // Esperar que el botón + Crear nuevo aviso esté visible
    const crearBtn = page.getByTestId("btn-crear-aviso");
    await crearBtn.waitFor({ state: "visible", timeout: 8000 });

    // Abrir modal
    await crearBtn.click();

    // Llenar formulario
    await page.getByTestId("aviso-titulo").fill("Aviso Playwright Test");
    await page.getByTestId("aviso-texto").fill("Texto de aviso de prueba automatizado");
    await page.getByTestId("aviso-imagen").setInputFiles("tests/assets/campo1.jpeg");

    // Enviar formulario
    await page.getByTestId("aviso-submit").click();

    // Verificar mensaje de éxito
    await expect(page.getByTestId("aviso-success")).toBeVisible({ timeout: 8000 });
  });
});
