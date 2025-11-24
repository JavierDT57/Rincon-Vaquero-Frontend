import { test, expect } from "@playwright/test";

test.describe("Tienda - Editar producto (correcto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Editar un producto de tienda correctamente", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Ir al panel de administración
    await page.getByRole("link", { name: "Administración" }).click();

    // Ir a la pestaña Tienda
    await page.getByRole("button", { name: "Tienda" }).click();

    // Tomar el primer botón de editar producto
    const editarBtn = page.getByTestId("btn-editar-producto").first();
    await editarBtn.waitFor({ state: "visible", timeout: 12000 });
    await editarBtn.click();

    // Editar campos en el modal
    await page.getByTestId("input-nombre").fill("Producto editado PW");
    await page.getByTestId("input-precio").fill("999");
    await page.getByTestId("input-stock").fill("50");
    await page.getByTestId("input-ubicacion").fill("Centro");

    await page.getByTestId("input-lada").click();
    await page.getByTestId("input-telefono").fill("9711112233");

    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/campo1.jpeg");

    // Enviar cambios
    await page.getByTestId("btn-submit-publicacion").click();

    // El modal debe cerrarse
    await expect(page.getByTestId("btn-submit-publicacion")).not.toBeVisible({
      timeout: 8000,
    });

    // Banner global de éxito del AdminPanel
    const successBanner = page.getByTestId("admin-success");
    await expect(successBanner).toBeVisible({ timeout: 8000 });
    await expect(successBanner).toContainText(
      "Producto de tienda actualizado correctamente."
    );
  });
});
