import { test as setup } from '@playwright/test';
import { environment as e } from 'src/environments/environment';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, request }) => {
  // Send authentication request. Replace with your own.
  const response = await request.post(e.authUrl + '/api/login', {
    form: {
      'codigo': e.qa.testUser,
      'password': e.qa.testPassword
    }
  });

  if(!response.ok()) {
    throw new Error('Error en la autenticación: ${response.status()} ${response.statusText()}');
  }

  const responseJson = await response.json();
  const token = responseJson.access_token;
  
  // Save the token to local storage
  await page.goto(e.qa.testUrl + '/auth/login');
  await page.evaluate(token => {
    localStorage.setItem('access_token', token);
  }, token);

  await page.context().storageState({ path: authFile });
});