test('test', async ({ page }) => {

  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'Iniciar sesión' }).getByRole('button').click();

  await page.getByRole('button', { name: 'Crear cuenta nueva' }).click();

  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nombre' }).fill('J');
  await page.getByRole('textbox', { name: 'Nombre' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Javier');

  await page.getByRole('textbox', { name: 'Apellidos' }).click();
  await page.getByRole('textbox', { name: 'Apellidos' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Apellidos' }).fill('D');
  await page.getByRole('textbox', { name: 'Apellidos' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Apellidos' }).fill('Dolores ');
  await page.getByRole('textbox', { name: 'Apellidos' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Apellidos' }).fill('Dolores T');
  await page.getByRole('textbox', { name: 'Apellidos' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Apellidos' }).fill('Dolores Tolentino');

  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('pifap37727@aikunkun.com');

  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('J');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('Javier117$');

  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).click();
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('J');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Confirmar contraseña' }).fill('Javier117$');

  await page.getByRole('button', { name: 'Crear cuenta' }).click();

  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('pifap37727@aikunkun.com');

  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('J');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Javier117$');

  await page.getByRole('main').getByRole('button', { name: 'Iniciar sesión' }).click();

  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Abrir Mapa' }).click();
  const page2 = await page2Promise;

  await page1.goto('https://www.google.com/maps/place/70392+Rinc%C3%B3n+Vaquero,+Oax./@16.762095,-95.032708,17z/data=!3m1!4b1!4m6!3m5!1s0x85eaa0cde7579245:0x7bb87204f3ba92fc!8m2!3d16.7622302!4d-95.0296242!16s%2Fg%2F11hbpdmf8h?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D');

  await page2.goto('https://www.google.com/maps/place/70392+Rinc%C3%B3n+Vaquero,+Oax./@16.762095,-95.032708,17z/data=!3m1!4b1!4m6!3m5!1s0x85eaa0cde7579245:0x7bb87204f3ba92fc!8m2!3d16.7622302!4d-95.0296242!16s%2Fg%2F11hbpdmf8h?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D');

  await page1.goto('https://www.google.com/maps/place/70392+Rinc%C3%B3n+Vaquero,+Oax./@16.762095,-95.032708,17z/data=!3m1!4b1!4m6!3m5!1s0x85eaa0cde7579245:0x7bb87204f3ba92fc!8m2!3d16.7622302!4d-95.0296242!16s%2Fg%2F11hbpdmf8h?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D');

  await page.getByRole('button', { name: 'Compartir mi experiencia' }).click();

  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('V');
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('');
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('J');
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('Javier');

  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('R');
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('Rincon ');
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('Rincon V');
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('Rincon Vaquero');

  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('IMG-20250830-WA0200.jpg');

  await page.locator('textarea').click();
  await page.locator('textarea').press('CapsLock');
  await page.locator('textarea').fill('C');
  await page.locator('textarea').press('CapsLock');
  await page.getByText('C', { exact: true }).fill('Campo mu limpio y grande');

  await page.getByRole('button', { name: 'Publicar' }).click();

  await page.getByRole('link', { name: 'Destinos' }).click();
  await page.getByRole('link', { name: 'Destinos' }).click();

  await page.getByRole('link', { name: 'Tienda' }).click();

  await page.getByRole('link', { name: 'Destinos' }).click();

  await page.getByRole('link', { name: 'Conocer más →' }).first().click();
  await page.getByRole('button', { name: 'Siguiente foto' }).click();
  await page.locator('div').filter({ hasText: /^No hay videos disponibles$/ }).click();

  await page.getByRole('link', { name: 'Tienda' }).click();

  await page.getByRole('button', { name: 'Mis publicaciones' }).click();
  await page.getByRole('button', { name: '+ Crear publicación' }).click();

  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('B');
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('Botes ');

  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('100');

  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('2');

  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('R');
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('Rincon ');
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('Rincon V');
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).fill('Rincon Vaquero');

  await page.getByRole('textbox', { name: 'dígitos' }).click();
  await page.getByRole('textbox', { name: 'dígitos' }).fill('971715574');
  await page.getByRole('textbox', { name: 'dígitos' }).click();
  await page.getByRole('textbox', { name: 'dígitos' }).click();
  await page.getByRole('textbox', { name: 'dígitos' }).click();
  await page.getByRole('textbox', { name: 'dígitos' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'dígitos' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'dígitos' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'dígitos' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'dígitos' }).fill('9717185574');

  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('bote.jpg');

  await page.getByRole('button', { name: 'Publicar' }).click();

  await page.getByRole('button', { name: 'Recargar' }).click();

  await page.getByRole('button', { name: 'Editar' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('Botes ');
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('Botes T');
  await page.getByRole('textbox').first().press('CapsLock');
  await page.getByRole('textbox').first().fill('Botes Tuperware');

  await page.getByRole('button', { name: 'Guardar cambios' }).click();

  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'WhatsApp' }).click();
  const page3 = await page3Promise;

  await page.getByRole('link', { name: 'Avisos' }).click();
  await page.getByRole('link', { name: 'Tradiciones' }).click();

  await page.getByRole('link', { name: 'Conocer más →' }).first().click();

  await page.getByRole('link', { name: 'Tradiciones' }).click();
  await page.getByText('Semana SantaTradición de fe y').click();
  await page.getByRole('link', { name: 'Conocer más →' }).nth(1).click();

  await page.getByRole('link', { name: 'Estadisticas' }).click();

  await page.getByRole('link', { name: 'Inicio' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

});
