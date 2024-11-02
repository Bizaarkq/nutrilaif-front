import { test, expect } from '@playwright/test';
import { environment as e } from 'src/environments/environment';

test('iniciar sesion', async ({ page }) => {
    await page.goto(e.qa.testUrl + '/auth/login');
    //Insert user code in input
    await page.fill('input[formcontrolname="username"]', e.qa.testUser)
    //Insert password in input
    await page.fill('input[formcontrolname="password"]', e.qa.testPassword)
    //Click in button
    await page.click('button:has-text("Iniciar Sesión")');
    // check if the user is logged in verifying the url
    await expect(page).toHaveURL(/\/inicio/);
    // check if the local storage has the token
    const token = await page.evaluate(() => localStorage.getItem('access_token'));
    expect(token).toBeTruthy();
});