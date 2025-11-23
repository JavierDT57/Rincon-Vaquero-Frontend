import { test, expect } from "@playwright/test";
import sqlite3 from "sqlite3";

const DB_PATH = "/home/javierdt57/Documentos/Rincon-Vaquero-Backend/db/rinconvaquero.sqlite";

function getResetToken(email) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY);
    db.get("SELECT reset_token FROM users WHERE email = ?", [email], (err, row) => {
      db.close();
      if (err) reject(err);
      resolve(row ? row.reset_token : null);
    });
  });
}

test("Cambiar contraseña (error — contraseñas no coinciden)", async ({ page }) => {
  const email = "yasidaf476@bablace.com";

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Iniciar sesión" }).click();
  await page.getByRole("button", { name: "¿Olvidaste tu contraseña?" }).click();

  // solicitar código
  await page.getByTestId("reset-email").fill(email);
  await page.getByTestId("reset-send").click();

  await page.waitForTimeout(700);

  // Leer token 
  const token = await getResetToken(email);
  console.log("TOKEN OBTENIDO:", token);

  // Paso 2 
  await page.getByTestId("reset-token").fill(String(token));
  await page.getByTestId("reset-verify").click();

  // Paso 3
  await expect(
    page.getByText("Ingresa tu nueva contraseña", { exact: false })
  ).toBeVisible({ timeout: 15000 });

  // Escribir contraseñas diferentes
  await page.getByTestId("reset-newpass").fill("Nueva123$");
  await page.getByTestId("reset-confirmpass").fill("Otra123$");

  // Guardar
  await page.getByTestId("reset-save").click();

  // mensaje de error
  await expect(page.getByTestId("reset-error")).toBeVisible({
    timeout: 8000,
  });
});
