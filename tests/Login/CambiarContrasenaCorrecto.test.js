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

test("Cambiar contraseña (correcto)", async ({ page }) => {
  const email = "yasidaf476@bablace.com";
  const newPass = `NewPass${Date.now()}$`;

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Iniciar sesión" }).click();
  await page.getByRole("button", { name: "¿Olvidaste tu contraseña?" }).click();

  await page.getByTestId("reset-email").fill(email);
  await page.getByTestId("reset-send").click();

  await page.waitForTimeout(700);

  const token = await getResetToken(email);
  console.log("TOKEN OBTENIDO:", token);

  await page.getByTestId("reset-token").fill(String(token));
  await page.getByTestId("reset-verify").click();

  // Paso 3
  await expect(
    page.getByText("Ingresa tu nueva contraseña", { exact: false })
  ).toBeVisible({
    timeout: 15000,
  });

  // contraseñas
  await page.getByTestId("reset-newpass").fill(newPass);
  await page.getByTestId("reset-confirmpass").fill(newPass);

  await page.getByTestId("reset-save").click();

  await expect(page.getByTestId("reset-success")).toBeVisible({
    timeout: 15000,
  });

  console.log("✔ Contraseña cambiada correctamente:", newPass);
});
