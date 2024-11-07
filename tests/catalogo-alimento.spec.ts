import { test, expect } from '@playwright/test';
import { environment as e } from 'src/environments/environment';

test('update Alimento en catalogo', async ({ page }) => {
  await page.goto(e.qa.testUrl + '/inicio');
  await page.locator('mat-card').filter({ hasText: 'CatalogoCatalogo de' }).getByRole('button').click();
  await page.getByLabel('Buscar').click();
  await page.getByPlaceholder('Ingresar busqueda').type('guineo', { delay: 100 });
  await page.getByRole('row', { name: '12058 esa GUINEO MANZANO O' }).locator('a').first().click();
  await page.getByLabel('País *').locator('div').nth(2).click();
  await page.getByRole('option', { name: 'El Salvador' }).locator('span').click();
  await page.locator('div').filter({ hasText: /^Calcio \*$/ }).nth(2).click();
  await page.getByPlaceholder('1900').fill('10');
  await page.locator('div').filter({ hasText: /^Sodio \*$/ }).nth(2).click();
  await page.getByLabel('Sodio *').fill('11');
  await page.getByRole('button', { name: 'Actualizar' }).click();
  await expect(page.getByLabel('Formulario para agregar')).toBeHidden();
  const snack = page.locator('snack-bar-container');
  await expect(snack).toBeVisible();
  await expect(snack).toHaveText('El alimento se modificó correctamenteOK');
});