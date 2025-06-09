import {test,expect} from '@playwright/test';
test('Sign in', async ({ page }) => {
     await page.goto('https://playground.testingart.com/');
     await page.locator('#email-field').fill("testingart@email.com");
     await page.locator('#password-field').fill("Testing!123");
     await page.getByRole('button', { name: 'Sign in' }).click();
     await expect (page.getByRole('heading', { name: 'Welcome to Automation Testing Playground' })).toBeVisible();
});


test('Log out button visibility', async ({ page }) => {
     await page.goto('https://playground.testingart.com/');
     await page.locator('#email-field').fill("testingart@email.com");
     await page.locator('#password-field').fill("Testing!123");
     await page.getByRole('button', { name: 'Sign in' }).click();
     await expect (page).toHaveURL('https://playground.testingart.com/'),
     await expect (page.getByRole('button', {name:'Logout'})).toBeVisible();
})
;


test('Error message visibility', async ({ page }) => {
     await page.goto('https://playground.testingart.com/');
     await page.locator('#email-field').fill("testingrt@email.com");
     await page.locator('#password-field').fill("Testng!123");
     await page.getByRole('button', { name: 'Sign in' }).click();
     const errorMessage = page.getByText('Invalid Email or Password');
     await expect(errorMessage).toBeVisible();
     await expect(errorMessage).toHaveText('Invalid Email or Password')
});


test('Log in process without hard coding', async ({ page }) => {
     await page.goto('https://playground.testingart.com/');
     const username = page.getByText('testingart@email.com');
     await expect(username).toBeVisible();
     const password = page.getByText('Testing!123');
     await expect(password).toBeVisible();
     await page.locator('#email-field').fill('username.textContent()');
     await page.locator('#password-field').fill('password.textConten()');
     await page.getByRole('button', { name: 'Sign in' }).click();
     await expect(page).toHaveURL('https://playground.testingart.com/')
});


// without hard code
test('Log in without hard code', async ({ page }) => {
     await page.goto('https://playground.testingart.com/');
     const longUserEmail = page.getByText('email: testingart@email.com');
});


test('Login with empty email field', async ({ page }) => {
  const url = 'https://playground.testingart.com/';
  const emailSelector = '#email-field';
  const passwordSelector = '#password-field';
  const signInButton = page.getByRole('button', { name: 'Sign in' });
  const passwordValue = 'Testng!123';
  const expectedError = 'Invalid Email or Password';

  await page.goto(url);
  await page.locator(emailSelector).fill('');
  await page.locator(passwordSelector).fill(passwordValue);
  await signInButton.click();

  const errorMessage = page.getByText(expectedError);
  await expect(errorMessage).toBeVisible();
});



test('Login with invalid email format', async ({ page }) => {
  const url = 'https://playground.testingart.com/';
  const emailSelector = '#email-field';
  const passwordSelector = '#password-field';
  const signInButtonName = 'Sign in';
  const invalidEmail = 'invalid-email';
  const validPassword = 'Testng!123';
  const expectedErrorText = 'Invalid Email or Password';

  await page.goto(url);
  await page.locator(emailSelector).fill(invalidEmail);
  await page.locator(passwordSelector).fill(validPassword);
  await page.getByRole('button', { name: signInButtonName }).click();

  const errorMessage = page.getByText(expectedErrorText);
  await expect(errorMessage).toBeVisible();
});












