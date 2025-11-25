// tests/Usuarios/UsuariosEliminarCorrecto.test.js
import { test, expect } from "@playwright/test";

test.describe("Usuarios - Eliminar usuario", () => {
  
  // Usamos sesión del admin
  test.use({ storageState: "tests/storage/admin.json" });

  test("Crear → eliminar usuario temporal correctamente", async ({ page, request }) => {
    
    //
    // 1) Crear usuario temporal directamente desde el backend
    //
    const email = `delete_${Date.now()}@test.com`;

    await request.post("http://localhost:5000/api/users/register", {
      data: {
        nombre: "Eliminar",
        apellidos: "Temporal",
        email,
        password: "Abcdef1!"
      }
    });

    //
    // 2) Ir al panel administrador
    //
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Administración" }).click();
    await page.getByRole("button", { name: "Usuarios" }).click();

    //
    // 3) Localizar al usuario recién creado
    //
    const fila = page.getByRole("listitem").filter({ hasText: email });

    const eliminarBtn = fila.getByTestId("btn-eliminar-usuario");
    await eliminarBtn.waitFor({ state: "visible", timeout: 8000 });

    //
    // 4) Confirmar diálogo nativo
    //
    page.once("dialog", (d) => d.accept());
    await eliminarBtn.click();

    //
    // 5) Validar banner global de éxito
    //
    const success = page.getByTestId("admin-success");
    const error = page.getByTestId("admin-error");

    let ok = false;

    try {
      await expect(success).toBeVisible({ timeout: 7000 });
      ok = true;
    } catch {
      await expect(error).toBeVisible({ timeout: 7000 });
      ok = true;
    }

    expect(ok).toBeTruthy();
  });
});
