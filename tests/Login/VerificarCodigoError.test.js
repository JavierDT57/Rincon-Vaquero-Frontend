import { test, expect } from "@playwright/test";
import sqlite3 from "sqlite3";

// Ruta db
const DB_PATH = "/home/javierdt57/Documentos/Rincon-Vaquero-Backend/db/rinconvaquero.sqlite";

// Obtener token
function getResetToken(email) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
      if (err) reject(err);
    });

    db.get(
      "SELECT reset_token FROM users WHERE email = ?",
      [email],
      (err, row) => {
        db.close();
        if (err) reject(err);
        resolve(row ? row.reset_token : null);
      }
    );
  });
}

test("Verificar Token", async ({ page }) => {
  const email = "yasidaf476@bablace.com";

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Iniciar sesión" }).click();
  await page.getByRole("button", { name: "¿Olvidaste tu contraseña?" }).click();

  await page.getByTestId("reset-email").fill(email);
  await page.getByTestId("reset-send").click();

  await page.waitForTimeout(500);

  // Leer token 
  const realToken = await getResetToken(email);
  console.log("Token :", realToken);

  // Ingresar un token erroneo
  const fakeToken = "000000"; 
  await page.getByTestId("reset-token").fill(fakeToken);

  // Verificar token
  await page.getByTestId("reset-verify").click();

  // Esperar mensaje
  await expect(page.getByTestId("reset-error")).toBeVisible({ timeout: 5000 });
});
