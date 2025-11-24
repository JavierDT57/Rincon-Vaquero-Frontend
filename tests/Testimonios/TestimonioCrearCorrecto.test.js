import { test, expect } from "@playwright/test";

test.describe("Testimonios - Crear testimonio (correcto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Crear un testimonio correctamente", async ({ page }) => {
    // Ir al home autenticado
    await page.goto("http://localhost:5173/");

    // Abrir modal
    await page.getByTestId("btn-compartir-experiencia").click();

    // Llenar campos
    await page.getByTestId("input-nombre").fill("Test Playwright");
    await page.getByTestId("input-localidad").fill("Rincón Vaquero");
    await page.getByTestId("textarea-comentario").fill("Testimonio de prueba");
    
    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/rio1.jpg");

    // Publicar
    await page.getByTestId("btn-publicar").click();

    // El modal debe cerrar
    await expect(page.getByTestId("btn-publicar")).not.toBeVisible({
      timeout: 8000,
    });

  });
});
