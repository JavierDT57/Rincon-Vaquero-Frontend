import { test, expect } from "@playwright/test";

test.describe("Testimonios - Crear testimonio (incorrecto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Debe fallar al crear testimonio con imagen pesada inválida", async ({ page }) => {
    // Ir al home autenticado
    await page.goto("http://localhost:5173/");

    // Abrir modal
    await page.getByTestId("btn-compartir-experiencia").click();

    // Llenar campos 
    await page.getByTestId("input-nombre").fill("Test Error");
    await page.getByTestId("input-localidad").fill("Errorland");
    await page.getByTestId("textarea-comentario").fill("Debe fallar");
    
    // Subir imagen pesada
    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/error.png");

    // Enviar
    await page.getByTestId("btn-publicar").click();

    // VALIDACIÓN
    await expect(page.getByTestId("btn-publicar")).toBeVisible({
      timeout: 6000,
    });


  });
});
