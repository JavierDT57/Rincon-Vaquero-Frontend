import { test, expect } from "@playwright/test";

test.describe("Tienda - Crear publicación (correcto)", () => {
  // Usamos sesión del admin (también sirve como usuario normal)
  test.use({ storageState: "tests/storage/admin.json" });

  test("Crear una publicación de tienda correctamente", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Ir a la sección Tienda
    await page.getByRole("link", { name: "Tienda" }).click();

    // Abrir modal de crear publicación
    await page.getByTestId("btn-crear-publicacion").click();

    // Llenar formulario
    await page.getByTestId("input-nombre").fill("Producto Playwright");
    await page.getByTestId("input-precio").fill("150");
    await page.getByTestId("input-stock").fill("10");
    await page.getByTestId("input-ubicacion").fill("Rincón Vaquero");

    // LADA suele venir con valor por defecto, solo la tocamos
    await page.getByTestId("input-lada").click();
    await page.getByTestId("input-telefono").fill("9717185574");

    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/tlayuda.webp"); // ajusta la ruta si usas otro archivo

    // Enviar formulario
    await page.getByTestId("btn-submit-publicacion").click();

    // El modal debe cerrarse (botón deja de ser visible)
    await expect(page.getByTestId("btn-submit-publicacion")).not.toBeVisible({
      timeout: 8000,
    });
  });
});
