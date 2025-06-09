//books.am

// import {test,expect} from '@playwright/test';

// test('search input is visible', async ({ page }) => {
//   await page.goto('https://www.books.am/');
  
//   const searchInput = page.locator("#search");
//   await expect(searchInput).toBeVisible(); 
// });




// working with https://books.toscrape.com
//getByRole()

// test('the button is clickable', async ({ page }) => {
//   await page.goto('https://books.toscrape.com/'); 
//   await page.locator('a[href="catalogue/page-2.html"]').click();
//   await expect(page).toHaveURL('https://books.toscrape.com/catalogue/page-2.html');
// });




// test('Verify user can navigate to "The Requiem Red" book page', async ({ page }) => {
//   await page.goto('https://books.toscrape.com/');
//   await page.getByTitle('The Requiem Red').click();
//   await expect(page).toHaveTitle(/The Requiem Red/);
// });



//tripadvisor.com

// test('Logo image', async ({ page }) => {
//   await page.goto('https://www.tripadvisor.com/TravelersChoice-Hotels');
//   await page.getByAltText('Tripadvisor').click();
//   await expect(page).toHaveURL('https://www.tripadvisor.com/')
// });



// test('Sign in', async ({ page }) => {
//      await page.goto('https://www.tripadvisor.com/');
//      await page.getByRole('link', { name: 'Sign in' }).click();
//      await page.getByRole('button', { name: 'Continue with email' }).click();
//     //  await page.locator('#regSignIn.email').getByPlaceholder('Email').fill('Username');
//     // await page.locator('#regSignIn\.email').fill('Username');
//     await page.getByRole('textbox', { name: 'Email address' }).fill("Name");
//     //  await page.locator('#regSignIn.password').getByPlaceholder('Password').fill('Password12345');
//      await page.locator('#regSignIn.password').fill('Password12345');
//      await page.getByRole('button', { name: 'Sign in' }).click();
//      const message=page.locator('.body_text');
//      await expect(message).toBeVisible();
//      await expect(message).toHaveText('E-mail address is either invalid or starts with a generic alias to which we cannot send.')
// });


// test('Sign in', async ({ page }) => {
//      await page.goto('https://playground.testingart.com/');
//      await page.locator('#email-field').fill("testingart@email.com");
//      await page.locator('#password-field').fill("Testing!123");
//      await page.getByRole('button', { name: 'Sign in' }).click();
//      await expect(page).toHaveURL('https://playground.testingart.com/');
// });





// test('Sign in', async ({ page }) => {
//      await page.goto('https://playground.testingart.com/');
//      await page.locator('#email-field').fill("testingrt@email.com");
//      await page.locator('#password-field').fill("Testng!123");
//      await page.getByRole('button', { name: 'Sign in' }).click();
//      const errorMessage = page.getByText('Invalid Email or Password');
//      await expect(errorMessage).toBeVisible();
// await expect(errorMessage).toHaveText('Invalid Email or Password')
// });





//failed

// test('search and click Selva restaurant on Tripadvisor', async ({ page }) => {
//   await page.goto('https://www.tripadvisor.com/');
//   await page.getByRole('link', { name: 'Restaurants' }).click();
//   await page.getByPlaceholder('Places to go, things to do, hotels...').fill('Paris');
//   await page.getByPlaceholder('Places to go, things to do, hotels...').press('Enter');
//   await page.locator('.FGwzt.ukgoS').click();
//   await page.getByRole('button', { name: 'Save' })
//   await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
// });




// test('Logo check', async ({ page }) => {
//   await page.goto('https://www.tripadvisor.com/');
//   await page.getByAltText('Tripadvisor').click();
//   //lawait expect(searchInput).toBeVisible();
// });




// test('Verify that the user can change the website language', async ({ page }) => {
//   await page.goto('https://www.tripadvisor.com/');
//   const language = page.locator('button[data-automation="desktop-cart-and-profile"]');
//   await language.click();
//   const languageButton=page.locator('button[data-automation="pos-selection-single-button_France"]');
//   await languageButton.click();
//   await expect(page).toHaveURL('https://www.tripadvisor.fr/')
// });






// //booking.com

// test('Validate flight search functionality with all required inputs', async ({ page }) => {
//   await page.goto('https://www.booking.com/');
//   await page.getByPlaceholder("Where are you going?").fill("Rome")
//   await page.getByTestId("date-display-field-start").click();
//    await page.getByTestId("date-display-field-end").click();
//   await page.locator('[data-date="2025-08-01"]').click();
//   await page.locator('[data-date="2025-08-15"]').click();
//   await page.getByLabel("Number of travellers and rooms").click();
//   await page.getByRole('button', { name: 'Search' }).click();
//   await expect(page).toHaveURL('https://www.booking.com/searchresults.en-gb.html?ss=Rome&efdco=1&label=en-am-booking-desktop-lSGcHqfUscfUaeSJJ1JK8QS652828998673%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9070053%3Ali%3Adec%3Adm&aid=2311236&lang=en-gb&sb=1&src_elem=sb&src=index&dest_id=-126693&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=en&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=c9c290d1983a00e6&ac_meta=GhBjOWMyOTBkMTk4M2EwMGU2IAAoATICZW46BFJvbWVAAEoAUAA%3D&checkin=2025-08-01&checkout=2025-08-15&group_adults=2&no_rooms=1&group_children=0')
// });





