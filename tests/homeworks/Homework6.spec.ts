import { test, expect } from '@playwright/test';
test('Order the items', async ({ page }) => {
    await page.goto("https://www.zigzag.am/");
    const productName_1 = 'ELAC DEBUT DB53 black'
    const productName_2 = 'Marshall Major V Cream (1006833)'
    const expectedTotalPrice = '322,900 ֏'


    const category1 = page.locator('ul.short_list a[href*="computers-notebooks-tablets"]');
    await category1.nth(0).click()
    const allTab1Products = page.locator('.block_inner.product-item-details');
    const product1 = allTab1Products.filter({ hasText: productName_1 });
    const price1 = await product1.locator('.price').innerText();

    //Add the firts item to basket
    await product1.hover();
    await product1.locator('.add_to_cart').click();

    const basketModal = page.locator(".mpquickcart-block");
    await expect(basketModal).toBeVisible();
    const productItem = basketModal.locator('.minicart-items').filter({ hasText: productName_1 });

    //Check it's name and price
    const actualProductName = await productItem.locator('.product-item-name').innerText();
    const actualProductPrice = await productItem.locator('.price-container').innerText();
    const totalPrice = await basketModal.locator('.amount').last().innerText();

    expect.soft(actualProductName).toBe(productName_1);
    expect.soft(actualProductPrice).toBe(price1);
    expect.soft(totalPrice).toBe(price1);

    //Close modal
    const closeIcon = page.locator('.modal-header button.action-close');
    await closeIcon.first().click();

    //another tab
    const category2 = page.locator('ul.short_list a[href*="phones-and-communication"]');
    await category2.nth(0).click();
    const allTab2Products = page.locator('.block_inner.product-item-details');
    const product2 = allTab1Products.filter({ hasText: productName_2 });
    const price2 = await product2.locator('.price').innerText();

    //ad the 2nd item to the basket
    await product2.hover();
    await product2.locator('.add_to_cart').click();


    await expect(basketModal).toBeVisible();
    const productItem2 = basketModal.locator('.minicart-items').filter({ hasText: productName_2 });


    //Check the titles and prices in the basket
    const actualProductName2 = await productItem2.locator('.product-item-name').first().innerText();
    const actualProductPrice2 = await productItem2.locator('.price-container').first().innerText();
    const totalPrice2 = await basketModal.locator('.amount').last().innerText();


    expect.soft(actualProductName2).toBe(productName_2);
    expect.soft(actualProductPrice2).toBe(price2);
    expect.soft(totalPrice2).toBe(expectedTotalPrice);

    //click on Պատվիրել button
    await page.locator('#top-cart-btn-checkout').click();


    //Fill the required fileds.
    await page.locator('.input-field._with-tooltip #customer-email').click();
    await page.fill('#customer-email', 'izabella1@gmail.com');

    await page.locator('div[name="shippingAddress.firstname"] input[name="firstname"]').fill('Izabella');

    await page.locator('div[name="shippingAddress.lastname"] input[name="lastname"]').fill('Արամյան');

    await page.locator('button:has-text("Հայաստան")').nth(0).click();
    await page.locator('a.dropdown-item', { hasText: 'Հայաստան' }).click();

    await page.getByRole('button', { name: 'Խնդրում ենք ընտրել մարզ' }).nth(0).click();
    await page.locator('a.dropdown-item').filter({ hasText: 'Սյունիք' }).click();

    await page.locator('div[name="shippingAddress.street.0"]').click()
    await page.locator('div[name="shippingAddress.street.0"] input').fill('Տիգրան Մեծ');

    await page.locator('input[id="telephone_fake"]').fill('098000000');

    await page.locator('.filter-option-inner-inner', { hasText: 'Օր' }).click();
    await page.locator('.dropdown-menu.show .dropdown-item', { hasText: '15' }).click();

    await page.locator('button:has-text("Ամիս")').click();
    await page.locator('a.dropdown-item').filter({ hasText: '5' }).nth(3).click();

    await page.locator('button:has-text("Տարի")').click();
    await page.locator('a.dropdown-item').filter({ hasText: '1996' }).click();
    const reviewTable = page.locator('#checkout-review-table');

    // Use filters to locate both items independently
    const product1InReview = reviewTable.locator('tr').filter({ hasText: productName_1 });
    const product2InReview = reviewTable.locator('tr').filter({ hasText: productName_2 });

    // Get item names from the table rows
    const actualProduct1NameOrder = await product1InReview.locator('.product-item-name-block').innerText();
    const actualProduct2NameOrder = await product2InReview.locator('.product-item-name-block').innerText();

    // Get the total price from order summary
    const totalPriceOrder = await page.locator('tr.grand.totals .price').innerText();

    // Now assert all values
    expect.soft(actualProduct1NameOrder).toBe(productName_1);
    expect.soft(actualProduct2NameOrder).toBe(productName_2);
    expect.soft(totalPriceOrder).toBe(expectedTotalPrice);
});





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
    //Get all products
    const allElements = await page.$$('ol.grid_list.products.list.items > li');
    console.log(`Number of total items: ${allElements.length}`);

    const prices: number[] = [];
    for (const itemAscending of allElements) {
        const priceElement = await itemAscending.$('.current_price');
        if (priceElement) {
            const text = await priceElement.textContent();
            const cleaned = text?.replace(/[^\d.]/g, '');
            if (cleaned) {
                prices.push(parseFloat(cleaned));
            }
        }
    }

    console.log('Prices:', prices);

    // Check if prices are ascending
    let isAscending = true;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < prices[i - 1]) {
            isAscending = false;
            break;
        }
    }

    if (isAscending) {
        console.log('Prices are sorted in ascending order.');
    } else {
        console.log('Prices are not sorted in ascending order.');
    }
});



test('Sorting Order descending', async ({ page }) => {
    await page.goto("https://www.zigzag.am/");
    const searchField = page.locator('[id="search"]');
    await searchField.fill("Phone");
    await searchField.press('Enter');
    await expect(page).toHaveURL('https://www.zigzag.am/am/catalogsearch/result/?q=Phone');
    //click on drowpdown
    await page.locator('button:has(div.filter-option-inner-inner)').click();
    // Click the 2rd option (low to high)
    await page.locator('a[role="option"].dropdown-item').nth(1).click();
    //Get all products
    const allElements = await page.$$('ol.grid_list.products.list.items > li');
    console.log('Number of product items:', allElements.length);
    const prices: number[] = [];
    for (const itemDescending of allElements) {
        const priceElement = await itemDescending.$('.current_price');
        if (priceElement) {
            const text = await priceElement.textContent();
            const cleaned = text?.replace(/[^\d.]/g, '');
            if (cleaned) {
                prices.push(parseFloat(cleaned));
            }
        }
    }
    console.log('Prices:', prices);

    let isDescending = true;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            isDescending = false;
            break;
        }
    }

    if (isDescending) {
        console.log('Prices are sorted in descending order.');
    } else {
        console.log('Prices are not sorted in descending order.');
    }
});