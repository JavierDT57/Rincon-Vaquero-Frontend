import { test, expect } from "@playwright/test";

test.describe("Dashboard - Editar estadísticas (correcto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Editar estadísticas correctamente", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();
    await page.getByRole("button", { name: "Estadísticas" }).click();

    // ---- 1) Editar inputs ----
    const mas = page.getByTestId("input-estadistica-POBMAS");
    const fem = page.getByTestId("input-estadistica-POBFEM");

    await mas.fill("");               // aseguramos cambio real
    await mas.type("160", { delay: 50 });

    await fem.fill("");
    await fem.type("130", { delay: 50 });

    // ---- 2) ESPERAR a que el botón se habilite ----
    const btnGuardar = page.getByTestId("btn-guardar-estadisticas");

    await expect(btnGuardar).toBeEnabled({
      timeout: 8000,
    });

    // ---- 3) Guardar ----
    await btnGuardar.click();

    // ---- 4) Validar Éxito ----
    await expect(page.getByTestId("admin-success")).toBeVisible({
      timeout: 8000,
    });
  });
});
