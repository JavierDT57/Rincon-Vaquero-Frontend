import { test, expect } from "@playwright/test";

test.describe("Avisos - Eliminar aviso (incorrecto / cancelado)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("No debe eliminar aviso si se cancela el diálogo", async ({ page }) => {
    // 1) Ir al panel admin
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();

    // 2) Seleccionar Avisos
    const avisosTab = page.getByTestId("btn-sidebar-item").nth(1);
    await avisosTab.click();

    // 3) Contar avisos actuales
    const itemsAntes = await page.getByRole("listitem").count();

    // 4) Preparar handler del confirm -> cancelar
    page.once("dialog", async (dialog) => {
      console.log("Dialog message:", dialog.message());
      await dialog.dismiss(); // ❌ CANCELAR
    });

    // 5) Intentar eliminar el primero
    const eliminarBtn = page.getByTestId("btn-eliminar-aviso").first();
    await eliminarBtn.click();

    // 6) Esperar un poquito que recargue UI si fuera necesario
    await page.waitForTimeout(800);

    // 7) Contar avisos nuevamente
    const itemsDespues = await page.getByRole("listitem").count();

    // ⚠ Debe haber exactamente la misma cantidad
    expect(itemsDespues).toBe(itemsAntes);

    // ⚠ NO debe aparecer mensaje de éxito
    await expect(page.getByTestId("admin-success")).not.toBeVisible();
  });
});
