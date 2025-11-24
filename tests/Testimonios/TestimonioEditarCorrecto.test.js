// tests/Testimonios/TestimonioEditarCorrecto.test.js
import { test, expect } from "@playwright/test";

test.describe("Testimonios - Editar testimonio (correcto)", () => {
  // Usamos la sesión del admin
  test.use({ storageState: "tests/storage/admin.json" });

  test("Editar un testimonio correctamente desde el panel admin", async ({ page }) => {
    // 1) Ir al home autenticado y luego al panel de administración
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();

    // 2) Ir a la pestaña "Testimonios"
    await page.getByRole("button", { name: "Testimonios" }).click();

    // 3) Tomar el primer botón de editar testimonio
    const editarBtn = page.getByTestId("btn-editar-testimonio").first();
    await editarBtn.waitFor({ state: "visible", timeout: 12000 });
    await editarBtn.click();

    // 4) Editar campos en el modal
    await page.getByTestId("input-nombre").fill("Playwright Editado");
    await page.getByTestId("input-localidad").fill("PlayCity");
    await page
      .getByTestId("select-calificacion")
      .selectOption("4"); // rating 4

    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/rio1.jpg"); // imagen válida y ligera

    await page
      .getByTestId("textarea-comentario")
      .fill("Comentario editado por Playwright");

    // 5) Enviar formulario
    await page.getByTestId("btn-publicar").click();

    // 6) El modal debe cerrarse (el botón ya no debe estar visible)
    await expect(page.getByTestId("btn-publicar")).not.toBeVisible({
      timeout: 8000,
    });

    // 7) Debe aparecer el banner global de éxito
    const successBanner = page.getByTestId("admin-success");
    await expect(successBanner).toBeVisible({ timeout: 8000 });
    await expect(successBanner).toContainText(
      "Testimonio actualizado correctamente."
    );
  });
});
