import { test, expect } from "@playwright/test";

test.describe("Tienda - Crear publicación (incorrecto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Error al crear publicación usando imagen pesada/incorrecta", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Ir a Tienda
    await page.getByRole("link", { name: "Tienda" }).click();
    await page.getByTestId("btn-crear-publicacion").click();

    // Campos obligatorios
    await page.getByTestId("input-nombre").fill("Producto Error Playwright");
    await page.getByTestId("input-precio").fill("123");
    await page.getByTestId("input-stock").fill("5");
    await page.getByTestId("input-ubicacion").fill("Rincón Vaquero");
    await page.getByTestId("input-lada").click();
    await page.getByTestId("input-telefono").fill("9717185574");

    // Imagen pesada / inválida (forzar error del backend)
    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/error.png");

    // Si el front usa alert() para mostrar el error, lo cerramos
    page.once("dialog", (dialog) => {
      dialog.dismiss().catch(() => {});
    });

    // Intentar publicar
    await page.getByTestId("btn-submit-publicacion").click();

    // Como hubo error, el modal NO debe cerrarse
    await expect(page.getByTestId("btn-submit-publicacion")).toBeVisible({
      timeout: 8000,
    });
  });
});
