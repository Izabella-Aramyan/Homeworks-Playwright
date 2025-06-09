import{test,expect} from '@playwright/test';
    

test('Basket button functionality',async ({page})=>{
 await page.goto("https://www.zigzag.am/");
 const searchField=page.locator('[id="search"]');
 await searchField.fill("Phone");
 await searchField.press('Enter');
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
await page.locator( '[id^="product-item-info"]').nth(2).hover(); 
await page.locator('[class*="tocart"]').nth(2).click();
await page.locator('[class*="basket_btn"]').click();//basket icon
//const itemName=page.getByRole('link',{name:'Hama Mini Stylus for Tablet,phones (119446)'}).click();
await page.locator('a.action.primary.viewcart').click();
const priceName=page.locator('.cart-totals');
await expect (priceName).toContainText('200 ֏');
});




test('Sorting Order',async ({page})=>{
 await page.goto("https://www.zigzag.am/");
 const searchField=page.locator('[id="search"]');
 await searchField.fill("Phone");
 await searchField.press('Enter');
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
//click on drowpdown
await page.locator('button:has(div.filter-option-inner-inner)').click();
// Click the 3rd option (low to high)
await page.locator('a[role="option"].dropdown-item').nth(2).click();
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/index/?q=Phone&product_list_order=price&product_list_dir=asc')
});




    test('Delete one item from basket',async ({page})=>{
await page.goto("https://www.zigzag.am/");
 const searchField1=page.locator('[id="search"]');
 //fill the input field
 await searchField1.fill("Phone");
 //Press Enter
 await searchField1.press('Enter');
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');

//Hover the second element
const random_third_product = page.locator( '[id^="product-item-info"]').nth(2);
await random_third_product.hover();
//Add the second element to the basket
await random_third_product.locator('[class*="tocart"]').click();
//Close the modal
const closeIcon= page.locator('.modal-inner-wrap button.action-close')
await closeIcon.click();
//Hover and Add the 3rd item to the basket
const random_thourth_product = page.locator( '[id^="product-item-info"]').nth(3);
await random_thourth_product.hover();
await random_thourth_product.locator('[class*="tocart"]').click();

//Wait for the second item to be added to the basket    
await page.waitForSelector('div.minicart-items-wrapper');

const cartProductNames = await page
    .locator('div.minicart-items-wrapper li.product-item strong.product-item-name > a')
    .allTextContents();

// Verify the 2 items are present in the basket
expect(cartProductNames).toContain('Hama Mini Stylus for Tablet,phones (119446)');
expect(cartProductNames).toContain('Panasonic KX-TGE510RUS');

//delete the first item
await page.locator('li.product-item', { hasText: 'Panasonic KX-TGE510RUS' })
  .locator('a.action.delete')
  .click();

const confirmButton = page.locator('.action-primary.action-accept'); // "Yes" button
await expect(confirmButton).toBeVisible();

// Click the "Yes" button to confirm deletion
await confirmButton.click();
await page.waitForTimeout(2000);

// Verify the deleted item is no longer present
const updatedCartProductNames = await page.locator('li.item.product.product-item strong.product-item-name > a').allTextContents();
expect(updatedCartProductNames).not.toContain('Panasonic KX-TGE510RUS');
});



test('Filtering categories of an item',async({page})=>{
await page.goto("https://www.zigzag.am/");
await page.locator('div.custom_container ul.short_list li.category-item.first.parent a.submenu_btn').click();
await page.locator('div.price_limits input.price_to_input.range_from').fill('50.000')
await page.locator('div.price_limits input.price_from_input.range_to').fill('100.000')
await page.locator('#wp_ln_attr_4291_45573 a').click();//that is a href contains the name
await expect (page).toHaveURL('https://www.zigzag.am/am/only-on-line.html?manufacturer=45573')
});


test('Verify search button functionality',async({page})=>{
await page.goto("https://www.zigzag.am/");
const searchButton=page.locator('button[aria-label="Search"]')
await expect (searchButton).toBeDisabled();
const inputField= page.locator('input#search')
await inputField.fill('Sony')
await expect(inputField).toHaveValue('Sony');
 await expect(searchButton).toBeEnabled();
});














//Zangak

test('Serach books',async ({page})=>{
await page.goto("https://zangakbookstore.am/")
await page.locator('.search-string-form input').fill('Ուիլյամ Սարոյան');
const secondSearchIcon = page.locator('.fal.fa-search').nth(1);
await secondSearchIcon.waitFor({ state: 'visible' });
await secondSearchIcon.click();
await expect(page).toHaveURL('https://zangakbookstore.am/search?q=%D5%88%D6%82%D5%AB%D5%AC%D5%B5%D5%A1%D5%B4+%D5%8D%D5%A1%D6%80%D5%B8%D5%B5%D5%A1%D5%B6')
await page.getByText('The Human Comedy', { exact: true }).click();
await expect(page).toHaveURL('https://zangakbookstore.am/the-human-comedy')
});




