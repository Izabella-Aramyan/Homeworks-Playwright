 import {test,expect} from '@playwright/test';
// test('Sign in', async ({ page }) => {
//      await page.goto('https://playground.testingart.com/');
//      await page.locator('#email-field').fill("testingart@email.com");
//      await page.locator('#password-field').fill("Testing!123");
//      await page.getByRole('button', { name: 'Sign in' }).click();
//      await expect (page.getByRole('heading', { name: 'Welcome to Automation Testing Playground' })).toBeVisible();
// });


// test('Log out button visibility', async ({ page }) => {
//      await page.goto('https://playground.testingart.com/');
//      await page.locator('#email-field').fill("testingart@email.com");
//      await page.locator('#password-field').fill("Testing!123");
//      await page.getByRole('button', { name: 'Sign in' }).click();
//      await expect (page).toHaveURL('https://playground.testingart.com/'),
//      await expect (page.getByRole('button', {name:'Logout'})).toBeVisible();
// })
// ;


// test('Error message visibility', async ({ page }) => {
//      await page.goto('https://playground.testingart.com/');
//      await page.locator('#email-field').fill("testingrt@email.com");
//      await page.locator('#password-field').fill("Testng!123");
//      await page.getByRole('button', { name: 'Sign in' }).click();
//      const errorMessage = page.getByText('Invalid Email or Password');
//      await expect(errorMessage).toBeVisible();
//      await expect(errorMessage).toHaveText('Invalid Email or Password')
// });


// // without hard code
// // test('Log in without hard code', async ({ page }) => {
// //      await page.goto('https://playground.testingart.com/');
// //      const longUserEmail = page.getByText('email: testingart@email.com');
// //      await expect(longUserEmail).toBeVisible();
// //      const longUserPassword = page.getByText('password: Testing!123');
// //      await expect(longUserPassword).toBeVisible();
// //      const trimUsername = (await longUserEmail.textContent())?.trim(); //I write this due to reading some lessons about it.
// //      const trimPassword = (await longUserPassword.textContent())?.trim();
// //      const username = trimUsername?.replace('email: ', ''); //I write this due to reading some lessons about it.
// //      const password = trimPassword?.replace('password: ', '');
// //      await page.locator('#email-field').fill(username!);
// //      await page.locator('#password-field').fill(password!);
// //      await page.getByRole('button', { name: 'Sign in' }).click();
// //      await expect (page.getByAltText('Logo')).toBeVisible();

// // });


// // test('Login with empty email field', async ({ page }) => {
// //   const url = 'https://playground.testingart.com/';
// //   const emailSelector = '#email-field';
// //   const passwordSelector = '#password-field';
// //   const signInButton = page.getByRole('button', { name: 'Sign in' });
// //   const passwordValue = 'Testng!123';
// //   const expectedError = 'Invalid Email or Password';

// //   await page.goto(url);
// //   await page.locator(emailSelector).fill('');
// //   await page.locator(passwordSelector).fill(passwordValue);
// //   await signInButton.click();

// //   const errorMessage = page.getByText(expectedError);
// //   await expect(errorMessage).toBeVisible();
// // });



// // test('Login with invalid email format', async ({ page }) => {
// //   const url = 'https://playground.testingart.com/';
// //   const emailSelector = '#email-field';
// //   const passwordSelector = '#password-field';
// //   const signInButtonName = 'Sign in';
// //   const invalidEmail = 'invalid-email';
// //   const validPassword = 'Testng!123';
// //   const expectedErrorText = 'Invalid Email or Password';

// //   await page.goto(url);
// //   await page.locator(emailSelector).fill(invalidEmail);
// //   await page.locator(passwordSelector).fill(validPassword);
// //   await page.getByRole('button', { name: signInButtonName }).click();

// //   const errorMessage = page.getByText(expectedErrorText);
// //   await expect(errorMessage).toBeVisible();
// // });



// const url = 'https://playground.testingart.com/';
// const emailSelector = '#email-field';
// const passwordSelector = '#password-field';
// const signInButtonName = 'Sign in';
// const expectedErrorText = 'Invalid Email or Password';

// test.beforeEach(async ({ page }) => {
//   await page.goto(url);
// });

// test('Log in without hard code', async ({ page }) => {
//   const longUserEmail = page.getByText('email: testingart@email.com');
//   await expect(longUserEmail).toBeVisible();
//   const longUserPassword = page.getByText('password: Testing!123');
//   await expect(longUserPassword).toBeVisible();

//   const username = (await longUserEmail.textContent())?.trim().replace('email: ', '');
//   const password = (await longUserPassword.textContent())?.trim().replace('password: ', '');

//   await page.locator(emailSelector).fill(username!);
//   await page.locator(passwordSelector).fill(password!);
//   await page.getByRole('button', { name: signInButtonName }).click();

//   await expect(page.getByAltText('Logo')).toBeVisible();
// });


// test('Login with empty email field', async ({ page }) => {
//   const passwordValue = 'Testng!123';

//   await page.locator(emailSelector).fill('');
//   await page.locator(passwordSelector).fill(passwordValue);
//   await page.getByRole('button', { name: signInButtonName }).click();

//   const errorMessage = page.getByText(expectedErrorText);
//   await expect(errorMessage).toBeVisible();
// });



// test('Login with invalid email format', async ({ page }) => {
//   const invalidEmail = 'dfsf.com';
//   const validPassword = 'Testng!123';

//   await page.locator(emailSelector).fill(invalidEmail);
//   await page.locator(passwordSelector).fill(validPassword);
//   await page.getByRole('button', { name: signInButtonName }).click();

//   const errorMessage = page.getByText(expectedErrorText);
//   await expect(errorMessage).toBeVisible();
// });






// //Testing alert(); prompt(), confirm() dialogs on https://the-internet.herokuapp.com/javascript_alerts




// test.describe('JavaScript Alerts Tests', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
//   });

// test('Alert', async ({ page }) => {
//      const button1 = page.getByRole('button', { name: 'Click for JS Alert' });
//      await expect(button1).toBeVisible();
//      page.on('dialog', async name =>{
//           expect(name.message()).toBe('I am a JS Alert'); 
//     await name.accept();   
// });
//     await button1.click();
//     const resultMessage = page.locator('#result');
//     await expect(resultMessage).toHaveText('You successfully clicked an alert');
// });




// test('Confirm', async ({ page }) => {
//      const button2 = page.getByRole('button', { name: 'Click for JS Confirm' });
//      await expect(button2).toBeVisible();
//     page.on('dialog', async dialog=>{
//      expect(dialog.message()).toBe('I am a JS Confirm');
//      await dialog.dismiss();
//     });
//     await button2.click();
//     const resultName=page.locator('#result');
//      await expect(resultName).toHaveText('You clicked: Cancel');
// });
     

    

// test('Prompt',async({page})=>{
//      const button3 = page.getByRole('button', { name: 'Click for JS Prompt' });
//      await expect(button3).toBeVisible();
//      page.on('dialog', async dialog=>{
//           expect(dialog.message()).toBe('I am a JS prompt');
//           await dialog.dismiss();
// });
// await button3.click();
// const resultText = page.locator('#result');
//     await expect(resultText).toHaveText('You entered: null');
// });
// });

















