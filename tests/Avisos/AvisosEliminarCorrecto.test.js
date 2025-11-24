import { test, expect } from "@playwright/test";

test.describe("Avisos - Eliminar aviso (correcto)", () => {
  // Usamos la sesión de admin guardada
  test.use({ storageState: "tests/storage/admin.json" });

  test("Eliminar un aviso existente correctamente", async ({ page }) => {
    // 1) Ir al home ya autenticado y entrar al panel admin
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();

    // 2) En el sidebar, seleccionar la pestaña 'Avisos'
    //    (btn-sidebar-item[0] = Usuarios, [1] = Avisos)
    const avisosTab = page.getByTestId("btn-sidebar-item").nth(1);
    await avisosTab.waitFor({ state: "visible", timeout: 12000 });
    await avisosTab.click();

    // 3) Preparar el handler del diálogo de confirmación ANTES del click
    page.once("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      // Aquí queremos ELIMINAR, así que aceptamos
      await dialog.accept();
      // si quisieras probar el caso de "Cancelar", usarías:
      // await dialog.dismiss();
    });

    // 4) Click en el botón eliminar (primer aviso)
    const eliminarBtn = page.getByTestId("btn-eliminar-aviso").first();
    await eliminarBtn.waitFor({ state: "visible", timeout: 12000 });
    await eliminarBtn.click();

    // 5) Validar mensaje de éxito
    await expect(page.getByTestId("admin-success")).toBeVisible({
      timeout: 8000,
    });
  });
});
