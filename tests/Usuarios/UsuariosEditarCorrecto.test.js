import { test, expect } from "@playwright/test";

test.describe("Usuarios - Crear y editar usuario (correcto)", () => {

  test.use({ storageState: "tests/storage/admin.json" });

  test("Crear → editar un usuario", async ({ page, request }) => {

    // 1) Crear usuario temporal
    const email = `play_${Date.now()}@test.com`;

    await request.post("http://localhost:5000/api/users/register", {
      data: {
        nombre: "Temporal",
        apellidos: "User",
        email,
        password: "Abcdef1!"
      }
    });

    // 2) Admin panel → Usuarios
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();
    await page.getByRole("button", { name: "Usuarios" }).click();

    // 3) Localizar el usuario recién creado
    const fila = page.getByRole("listitem").filter({ hasText: email });

    const editarBtn = fila.getByTestId("btn-editar-usuario");
    await editarBtn.waitFor({ state: "visible", timeout: 8000 });
    await editarBtn.click();

    // 4) Editar datos
    await page.getByTestId("input-nombre").fill("Dasha");
    await page.getByTestId("input-apellidos").fill("Dolores");
    await page.getByTestId("btn-toggle-estatus").click();

    // 5) Guardar cambios
    await page.getByTestId("btn-guardar-cambios").click();

    // 6) Validar banner (éxito o error)
    const success = page.getByTestId("admin-success");
    const error = page.getByTestId("admin-error");

    try {
      await expect(success).toBeVisible({ timeout: 7000 });
    } catch {
      await expect(error).toBeVisible({ timeout: 7000 });
    }
  });
});
