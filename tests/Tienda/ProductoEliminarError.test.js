import { test, expect } from "@playwright/test";

test.describe("Tienda - Eliminar producto (incorrecto)", () => {
  test.use({ storageState: "tests/storage/admin.json" });

  test("Error al eliminar producto cuando el backend falla", async ({ page }) => {
    // Mock del DELETE /api/tienda/:id para que falle
    await page.route("**/api/tienda/*", async (route) => {
      const request = route.request();
      if (request.method() === "DELETE") {
        return route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            ok: false,
            error: "Mock 500 desde Playwright",
          }),
        });
      }
      return route.continue();
    });

    await page.goto("http://localhost:5173/");

    await page.getByRole("link", { name: "Administración" }).click();
    await page.getByRole("button", { name: "Tienda" }).click();

    const eliminarBtn = page.getByTestId("btn-eliminar-producto").first();
    await eliminarBtn.waitFor({ state: "visible", timeout: 12000 });

    page.once("dialog", (dialog) => {
      dialog.accept().catch(() => {});
    });

    await eliminarBtn.click();

    const errorBanner = page.getByTestId("admin-error");
    await expect(errorBanner).toBeVisible({ timeout: 8000 });
    await expect(errorBanner).toContainText("Error al eliminar el registro.");
  });
});
