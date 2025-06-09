import{test,expect} from '@playwright/test';

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


//Zigzag


test('Serach phone item',async ({page})=>{
 await page.goto("https://www.zigzag.am/")
 const searchField=page.locator('[id="search"]')
 await searchField.fill("Phone")
 await searchField.press('Enter');
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone')
await page.locator( '[id^="product-item-info"]').nth(1).hover(); 
await page.locator('[class*="tocart"]').nth(1).click();
const modalName=page.locator('.modal-inner-wrap')
await expect (modalName.nth(0)).toBeVisible();
const itemName=page.getByRole('link',{name:'Nothing CMF Phone 1'})
await expect(itemName).toContainText('Nothing CMF Phone 1');
 });


test('Basket button functionality',async ({page})=>{
 await page.goto("https://www.zigzag.am/");
 const searchField=page.locator('[id="search"]');
 await searchField.fill("Phone");
 await searchField.press('Enter');
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
await page.locator( '[id^="product-item-info"]').nth(2).hover(); 
await page.locator('[class*="tocart"]').nth(2).click();
await page.locator('[class*="basket_btn"]').click();//basket icon
const basketName=page.locator('.modal-inner-wrap');
await expect (basketName.nth(0)).toBeVisible();//modal to be visible
const itemName=page.getByRole('link',{name:'Hama Mini Stylus for Tablet,phones (119446)'});
await expect(itemName).toBeFocused();
await page.locator('.action.primary.viewcart').click();//basket icon
const priceName=page.locator('.cart-totals');
await expect (priceName).toContainText('200 ֏');
});




test('Delete one item from basket',async ({page})=>{
await page.goto("https://www.zigzag.am/");
 const searchField1=page.locator('[id="search"]');
 await searchField1.fill("Phone");
 await searchField1.press('Enter');
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
const random_third_product = page.locator( '[id^="product-item-info"]').nth(2);
await random_third_product.hover();

await random_third_product.locator('[class*="tocart"]').click();
const closeIcon= page.locator('.modal-inner-wrap button.action-close')
await closeIcon.click();

// await page.locator('.modal-inner-wrap').nth(2).click();
const random_thourth_product = page.locator( '[id^="product-item-info"]').nth(3);
await random_thourth_product.hover();
await random_thourth_product.locator('[class*="tocart"]').click();
const item1=page.locator('.product-itexm-details').filter({ hasText: 'Hama Mini Stylus for Tablet,phones (119446)'});
const item2=page.locator('.product-item-details').filter({ hasText: 'Panasonic KX-TGE510RUS'});
const button1 = page.locator('.action-primary.action-accept');//Yes button
await expect(button1).toBeVisible();
page.on('dialog', async name =>{
          expect(name.message()).toBe('.modal-content').nth(6); 
    await name.accept();   
});
    await button1.click();
    await expect(item1).toHaveCount(0);
});





test('Sorting Order',async ({page})=>{
 await page.goto("https://www.zigzag.am/");
 const searchField=page.locator('[id="search"]');
 await searchField.fill("Phone");
 await searchField.press('Enter');
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
const buttonName= page.locator('button:has(div.filter-option-inner-inner)').click();
await page.locator('[role="listbox"]').nth(2).click();
await page.locator('[role="dropdown-menu.inner"]').nth(2).click();
await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/index/?q=Phone&product_list_order=price&product_list_dir=asc')
});




