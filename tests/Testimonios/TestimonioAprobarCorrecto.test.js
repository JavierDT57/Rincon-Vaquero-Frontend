// tests/Testimonios/TestimonioAprobarCorrecto.test.js
import { test, expect } from "@playwright/test";

test.describe("Testimonios - Aprobar testimonio (correcto)", () => {
  // Usamos sesión del admin (ya autenticado)
  test.use({ storageState: "tests/storage/admin.json" });

  test("Aprobar un testimonio pendiente existente", async ({ page }) => {
    // 1) Ir al home autenticado
    await page.goto("http://localhost:5173/");

    // 2) Ir al panel de administración
    await page.getByRole("link", { name: "Administración" }).click();

    // 3) Ir a la pestaña "Testimonios"
    await page.getByRole("button", { name: "Testimonios" }).click();

    // 4) Asegurarnos de que el filtro esté en "Pendientes"
    //    (el select que maneja tStatus)
    const selectStatus = page.getByRole("combobox");
    await selectStatus.selectOption("pending");

    // 5) Tomar el PRIMER botón "Aprobar" de la lista
    const aprobarBtn = page.getByTestId("btn-aprobar-testimonio").first();

    // Esperar a que exista y sea visible (por si tarda en cargar la lista)
    await aprobarBtn.waitFor({ state: "visible", timeout: 12000 });

    // 6) Hacer clic para aprobar
    await aprobarBtn.click();

    // 7) Validar banner global de éxito
    const successBanner = page.getByTestId("admin-success");
    await expect(successBanner).toBeVisible({ timeout: 8000 });
    await expect(successBanner).toContainText(
      "Testimonio aprobado correctamente."
    );

  });
});
