import { test, expect } from "@playwright/test";

test.describe("Tienda - Eliminar producto (correcto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Eliminar un producto correctamente desde el panel admin", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.getByRole("link", { name: "Administración" }).click();
    await page.getByRole("button", { name: "Tienda" }).click();

    const eliminarBtn = page.getByTestId("btn-eliminar-producto").first();
    await eliminarBtn.waitFor({ state: "visible", timeout: 12000 });

    // Confirmar el diálogo de confirm()
    page.once("dialog", (dialog) => {
      dialog.accept().catch(() => {});
    });

    await eliminarBtn.click();

    const successBanner = page.getByTestId("admin-success");
    await expect(successBanner).toBeVisible({ timeout: 8000 });
    await expect(successBanner).toContainText(
      "Producto eliminado correctamente."
    );
  });
});
