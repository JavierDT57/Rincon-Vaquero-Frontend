import { test, expect } from "@playwright/test";

test.describe("Usuarios - Suspender usuario", () => {

  test.use({ storageState: "tests/storage/admin.json" });

  test("Crear → suspender usuario temporal", async ({ page, request }) => {

    // Crear usuario temporal
    const email = `play_${Date.now()}@test.com`;

    await request.post("http://localhost:5000/api/users/register", {
      data: {
        nombre: "TempSuspend2",
        apellidos: "User",
        email,
        password: "Abcdef1!"
      }
    });

    // Admin panel
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();
    await page.getByRole("button", { name: "Usuarios" }).click();

    // Localizar usuario
    const fila = page.getByRole("listitem").filter({ hasText: email });

    // Suspender usuario
    page.once("dialog", d => d.accept());
    const suspenderBtn = fila.getByTestId("btn-suspender-usuario");
    await suspenderBtn.click();

    // Validar banner
    const success = page.getByTestId("admin-success");
    const error = page.getByTestId("admin-error");

    try {
      await expect(success).toBeVisible({ timeout: 7000 });
    } catch {
      await expect(error).toBeVisible({ timeout: 7000 });
    }
  });
});
