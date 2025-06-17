import { test, expect } from '@playwright/test';
test('Sorting Order ascending', async ({ page }) => {
  await page.goto("https://www.zigzag.am/");
  const searchField = page.locator('[id="search"]');
  await searchField.fill("Phone");
  await searchField.press('Enter');
  await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
  //click on drowpdown
  await page.locator('button:has(div.filter-option-inner-inner)').click();
  // Click the 3rd option (low to high)
  await page.locator('a[role="option"].dropdown-item').nth(2).click();
  await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/index/?q=Phone&product_list_order=price&product_list_dir=asc')
});//general assertion


test('Sorting Order descending', async ({ page }) => {
  await page.goto("https://www.zigzag.am/");
  const searchField = page.locator('[id="search"]');
  await searchField.fill("Phone");
  await searchField.press('Enter');
  await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
  //click on drowpdown
  await page.locator('button:has(div.filter-option-inner-inner)').click();
  // Click the 3rd option (low to high)
  await page.locator('a[role="option"].dropdown-item').nth(1).click();
  await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/index/?q=Phone&product_list_order=price&product_list_dir=desc')
});//general assertion



test('Basket button functionality', async ({ page }) => {
  await page.goto("https://www.zigzag.am/");
  const searchField = page.locator('[id="search"]');
  await searchField.fill("Phone");
  await searchField.press('Enter');
  await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
  await page.locator('[id^="product-item-info"]').nth(2).hover();
  await page.locator('[class*="tocart"]').nth(2).click();
  await page.locator('[class*="basket_btn"]').click();//basket icon
  //const itemName=page.getByRole('link',{name:'Hama Mini Stylus for Tablet,phones (119446)'}).click();
  await page.locator('a.action.primary.viewcart').click();
  const priceName = page.locator('.cart-totals');
  await expect(priceName).toContainText('200 ֏');
});





test('Verify search button functionality', async ({ page }) => {
  await page.goto("https://www.zigzag.am/");
  const searchButton = page.locator('button[aria-label="Search"]')
  await expect(searchButton).toBeDisabled();
  const inputField = page.locator('input#search')
  await inputField.fill('Sony')
  await expect.soft(inputField).toHaveValue('Sony');
  await expect.soft(searchButton).toBeEnabled();
});  //soft assertions



test('Delete one item from basket', async ({ page }) => {
  await page.goto("https://www.zigzag.am/");
  const searchField1 = page.locator('[id="search"]');
  //fill the input field
  await searchField1.fill("Phone");
  //Press Enter
  await searchField1.press('Enter');
  await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');

  //Hover the second element
  const random_third_product = page.locator('[id^="product-item-info"]').nth(2);
  await random_third_product.hover();
  //Add the second element to the basket
  await random_third_product.locator('[class*="tocart"]').click();
  //Close the modal
  const closeIcon = page.locator('.modal-inner-wrap button.action-close')
  await closeIcon.click();
  //Hover and Add the 3rd item to the basket
  const random_thourth_product = page.locator('[id^="product-item-info"]').nth(3);
  await random_thourth_product.hover();
  await random_thourth_product.locator('[class*="tocart"]').click();

  //Wait for the second item to be added to the basket    
  await page.waitForSelector('div.minicart-items-wrapper');

  const cartProductNames = await page
    .locator('div.minicart-items-wrapper li.product-item strong.product-item-name > a')
    .allTextContents();

  // Verify the 2 items are present in the basket// Soft assertions
  expect.soft(cartProductNames).toContain('Hama Mini Stylus for Tablet,phones (119446)');
  expect.soft(cartProductNames).toContain('Panasonic KX-TGE510RUS');

  //delete the first item
  await page.locator('li.product-item', { hasText: 'Panasonic KX-TGE510RUS' })
    .locator('a.action.delete')
    .click();

  const confirmButton = page.locator('.action-primary.action-accept'); // "Yes" button
  await expect.soft(confirmButton).toBeVisible();

  // Click the "Yes" button to confirm deletion
  await confirmButton.click();
  await page.waitForTimeout(2000);

  // Verify the deleted item is no longer present
  const updatedCartProductNames = await page.locator('li.item.product.product-item strong.product-item-name > a').allTextContents();
  expect.soft(updatedCartProductNames).not.toContain('Panasonic KX-TGE510RUS');
});






test('Order the items', async ({ page }) => {
  await page.goto("https://www.zigzag.am/");
  const category1 = page.locator('ul.short_list a[href*="computers-notebooks-tablets"]');
  await category1.nth(0).click();
  await expect(page).toHaveURL('https://www.zigzag.am/am/computers-notebooks-tablets.html');
  const random_second_product = page.locator('[id^="product-item-info"]').nth(1);
  await random_second_product.hover();
  //Add the second element from laptop section to the basket
  await random_second_product.locator('[class*="tocart"]').click();
  //Check that modal opens
  const modal = page.locator('div.modal-inner-wrap')
  await expect.soft(modal).toBeVisible();
  //Close the modal
  const closeIcon = page.locator('.modal-header button.action-close');
  await closeIcon.first().click();
  //Go to another tab nd ad the item to the basket
  const category2 = page.locator('ul.short_list a[href*="phones-and-communication"]');
  await category2.nth(0).click();
  await expect(page).toHaveURL('https://www.zigzag.am/am/phones-and-communication.html');
  const random_second_product2 = page.locator('[id^="product-item-info"]').nth(1);
  await random_second_product2.hover();
  //add the second element from phones to the baasket
  await random_second_product2.locator('[class*="tocart"]').click();
  //Wait for the second item to be added to the basket    
  await page.waitForSelector('div.minicart-items-wrapper');
  //Close the modal again
  const closeIcon2 = page.locator('.modal-inner-wrap button.action-close')
  await closeIcon2.first().click();
  //Click on basket button to see the added items
  const basketButton = page.locator('.basket_btn');
  await basketButton.click();
  const categoryLaptop = page.locator('a[href*="honor-choice-headphones-black-ros-me01"]');
  const price1 = page.locator('li.item .price-container .price-wrapper .price');
  const categoryPhone = page.locator('a[href*="elac-debut-db53-black"]');
  //Verify that elemenst are in the basket
  const price2 = page.locator('li.item .price-container .price-wrapper .price');
  await expect.soft(category1).toHaveText('Honor Choice Headphones Black /ROS-ME01');
  await expect.soft(category2).toHaveText('ELAC DEBUT DB53 black');
  await page.locator('a.action.primary.viewcart').click();//click on basket inside the modal
  await expect(page).toHaveURL('https://www.zigzag.am/am/checkout/cart/')
  // Select all price elements inside [sum_block]
  const itemPrices = page.locator('.price_block .price');
  // Assert and log item's prices
  await expect.soft(itemPrices.nth(0)).toBeVisible();
  await expect.soft(itemPrices.nth(1)).toBeVisible();
  //Check the titles of the items
  const productName1 = page.locator('a[href*="elac-debut-db53-black"]');
  const productName2 = page.locator(' a[href*="honor-choice-headphones-black-ros-me01"]')
  await expect.soft(productName1).toBeVisible();
  await expect.soft(productName2).toBeVisible();
  const grandTotal = page.locator('tr.grand.totals .price');
  // Wait until it's visible
  await expect(grandTotal).toBeVisible();
  // Get the text (e.g., "266,900 ֏")
  const totalText = await grandTotal.textContent();
  //Click on "Continue" button
  const continueButton = page.locator('button[data-role="proceed-to-checkout"]');
  await expect.soft(continueButton).toBeVisible();
  await continueButton.click();
  await expect(page).toHaveURL('https://www.zigzag.am/am/checkout/');
  //Fill in the input fields of delivery
  const emailInput = page.locator('input#customer-email');
  await emailInput.fill('testing1@example.com');
  //Check the option
  const firstRadio = page.locator('input#ctype_1');
  await expect.soft(firstRadio).toBeChecked();
  //Fill in the required fields

  const nameInput = page.locator('input#O1K852B');
  await nameInput.fill('Izabella');

  const surnameInput = page.locator('input#O1K852B');
  await surnameInput.fill('Aramyan');

  //Region
  await page.locator('button[data-id="Y6CQJ7N"]').click();
  await page.locator('ul.dropdown-menu.inner.show > li').nth(5).click();


  const address = page.locator('input#O1K852B');
  await expect.soft(address).toBeFocused();
  await address.fill('Norashen');


  const phoneNumber = page.locator('input#O1K852B');
  await expect.soft(phoneNumber).toBeFocused();
  await phoneNumber.fill('011111111');

  await page.locator('button[data-id="Q6YM6Y3"]').click(); // open dropdown
  await page.locator('ul.dropdown-menu li :has-text("11")').click;

  await page.click('button[data-id="FRW2C1E"]');
  await page.click('ul.dropdown-menu.inner.show li:has-text("5")');
  await page.click('button[data-id="TMXQIQU"]');
  await page.click('ul.dropdown-menu.inner.show li :has-text("2022")');

  const finalTotalPrice = page.locator('tr.totals.sub td.amount span.price');
  await expect.soft(finalTotalPrice).toBeVisible();
});