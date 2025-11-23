import { test, expect } from "@playwright/test";
import sqlite3 from "sqlite3";

// Ruta DB
const DB_PATH = "/home/javierdt57/Documentos/Rincon-Vaquero-Backend/db/rinconvaquero.sqlite";

// Leer token 
function getResetToken(email) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
      if (err) reject(err);
    });

    db.get("SELECT reset_token FROM users WHERE email = ?", [email], (err, row) => {
      db.close();
      if (err) reject(err);
      resolve(row ? row.reset_token : null);
    });
  });
}

test("Verificar Token (correcto)", async ({ page }) => {
  const email = "yasidaf476@bablace.com";

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Iniciar sesión" }).click();
  await page.getByRole("button", { name: "¿Olvidaste tu contraseña?" }).click();

  await page.getByTestId("reset-email").fill(email);
  await page.getByTestId("reset-send").click();

  await page.waitForTimeout(1000);

  // Leer token 
  const token = await getResetToken(email);
  console.log("Token desde DB:", token);

  // Verificar token
  await page.getByTestId("reset-token").fill(String(token));
  await page.getByTestId("reset-verify").click();

  await expect(page.getByTestId("reset-success")).toBeVisible({
    timeout: 15000,
  });
});
