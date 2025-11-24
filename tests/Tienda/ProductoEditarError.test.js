import { test, expect } from "@playwright/test";

test.describe("Tienda - Editar producto (incorrecto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Error al editar producto con imagen inválida/pesada", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Ir al panel de administración
    await page.getByRole("link", { name: "Administración" }).click();
    await page.getByRole("button", { name: "Tienda" }).click();

    const editarBtn = page.getByTestId("btn-editar-producto").first();
    await editarBtn.waitFor({ state: "visible", timeout: 12000 });
    await editarBtn.click();

    // Editamos lo mínimo y subimos imagen pesada para forzar error
    await page.getByTestId("input-nombre").fill("Producto error PW");
    await page.getByTestId("input-precio").fill("123");
    await page.getByTestId("input-stock").fill("5");
    await page.getByTestId("input-ubicacion").fill("Errorlandia");
    await page.getByTestId("input-lada").click();
    await page.getByTestId("input-telefono").fill("9710000000");

    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/error.png");

    // Por si el modal lanza alert(), lo cerramos
    page.once("dialog", (dialog) => {
      dialog.dismiss().catch(() => {});
    });

    await page.getByTestId("btn-submit-publicacion").click();

    // Banner global de error del AdminPanel
    const errorBanner = page.getByTestId("admin-error");
    await expect(errorBanner).toBeVisible({ timeout: 8000 });
    await expect(errorBanner).toContainText(
      "Error al actualizar el producto."
    );
  });
});
