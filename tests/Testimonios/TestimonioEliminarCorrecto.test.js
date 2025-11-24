// tests/Testimonios/TestimonioEliminarCorrecto.test.js
import { test, expect } from "@playwright/test";

test.describe("Testimonios - Eliminar testimonio (correcto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Eliminar un testimonio correctamente desde el panel admin", async ({ page }) => {
    // 1) Ir al home autenticado y luego al panel de administración
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();

    // 2) Ir a la pestaña "Testimonios"
    await page.getByRole("button", { name: "Testimonios" }).click();

    // 3) Esperar a que exista al menos un botón de eliminar
    const deleteBtn = page.getByTestId("btn-eliminar-testimonio").first();
    await deleteBtn.waitFor({ state: "visible", timeout: 12000 });

    // 4) Aceptar el dialog de confirmación
    page.once("dialog", (dialog) => {
      // console.log("Dialog:", dialog.message());
      dialog.accept().catch(() => {});
    });

    // 5) Click en eliminar
    await deleteBtn.click();

    // 6) Validar mensaje global de éxito
    const successBanner = page.getByTestId("admin-success");
    await expect(successBanner).toBeVisible({
      timeout: 8000,
    });
    await expect(successBanner).toContainText(
      "Testimonio eliminado correctamente."
    );
  });
});
