// tests/Testimonios/TestimonioEditarError.test.js
import { test, expect } from "@playwright/test";

test.describe("Testimonios - Editar testimonio (error)", () => {
  // Sesión de admin 
  test.use({ storageState: "tests/storage/admin.json" });

  test("Error al editar testimonio usando imagen pesada inválida", async ({ page }) => {
    // 1) Ir al home autenticado y entrar al panel admin
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();

    // Ir a la pestaña Testimonios
    await page.getByRole("button", { name: "Testimonios" }).click();

    // Abrir el modal de edición 
    const editarBtn = page.getByTestId("btn-editar-testimonio").first();
    await editarBtn.waitFor({ state: "visible", timeout: 12000 });
    await editarBtn.click();

    // Editar campos 
    await page.getByTestId("input-nombre").fill("Playwright Error");
    await page.getByTestId("input-localidad").fill("Ciudad Error");
    await page.getByTestId("select-calificacion").selectOption("4");

    // imagen pesada 
    await page
      .getByTestId("input-imagen")
      .setInputFiles("tests/assets/error.png");

    await page
      .getByTestId("textarea-comentario")
      .fill("Intento de edición con imagen demasiado pesada.");

    // 6) Enviar formulario
    await page.getByTestId("btn-publicar").click();

    // error el modal se queda abierto,
    await expect(page.getByTestId("btn-publicar")).toBeVisible({
      timeout: 8000,
    });

    const errorBanner = page.getByTestId("admin-error");
    await expect(errorBanner).toBeVisible({ timeout: 8000 });
    await expect(errorBanner).toContainText("Error guardando cambios.");
  });
});
