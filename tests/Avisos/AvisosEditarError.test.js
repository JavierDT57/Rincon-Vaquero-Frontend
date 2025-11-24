import { test, expect } from "@playwright/test";

test.describe("Avisos - Editar aviso (correcto)", () => {
  // Usamos la sesión de admin guardada
  test.use({ storageState: "tests/storage/admin.json" });

  test("Editar un aviso existente correctamente", async ({ page }) => {
    // 1) Ir al home ya autenticado y entrar al panel admin
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();

    // 2) En el sidebar, seleccionar la pestaña 'Avisos'
    //    (btn-sidebar-item[0] = Usuarios, [1] = Avisos)
    const avisosTab = page.getByTestId("btn-sidebar-item").nth(1);
    await avisosTab.waitFor({ state: "visible", timeout: 12000 });
    await avisosTab.click();

    // 3) Esperar que se renderice la lista de avisos y aparezca el botón de editar
    const editarBtn = page.getByTestId("btn-editar-aviso").first();
    await editarBtn.waitFor({ state: "visible", timeout: 12000 });
    await editarBtn.click();

    // 4) Editar los campos del modal (título, texto e imagen)
    await page
      .getByTestId("aviso-titulo")
      .fill("Aviso editado desde Playwright");
    await page
      .getByTestId("aviso-texto")
      .fill("Texto de aviso editado correctamente desde el test.");
    await page
      .getByTestId("aviso-imagen")
      .setInputFiles("tests/assets/error.png");

    // 5) Guardar cambios
    await page.getByTestId("aviso-submit").click();

    // 6) Validar mensaje de error
    await expect(page.getByTestId("admin-error")).toBeVisible({
      timeout: 8000,
    });
  });
});
