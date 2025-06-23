import { test, expect } from '@playwright/test';




test.beforeEach(async ({ page }) => {
    await page.goto('https://4u.am/hy/');
});


test('Blank search field 4u.am', async ({ page }) => {
    await page.locator('.search_new button:has(img[src*="s.png"])').click();
    await expect(page.locator('.error_txt')).toContainText('Ներեցեք, ձեր որոնման արդյունքում ոչինչ չի գտնվել');
    await page.locator('.breadcrumb_prev_item').click();
    await expect(page).toHaveURL('https://4u.am/hy/');
});

test('Exact word search', async ({ page }) => {
    const searchField = page.locator('.search_new input');
    await searchField.fill('Ծաղիկներ');
    await searchField.press('Enter');
    await expect(page).toHaveURL('https://4u.am/hy/product/search?text=Ծաղիկներ&type=');
    //Verify the title to be visible
    const title = page.locator('section.heading_section h1');
    await expect(title).toBeVisible();

    //Get all categories
    const categoriesContainer = page.locator('#searchAdditionalPart');
    await expect(categoriesContainer).toBeVisible();

    // Verify that there are 4 categories
    const categories = categoriesContainer.locator('a');
    await expect(categories).toHaveCount(4);

    // Check each category's mainName text
    const expectedCategories = [
        'Ծաղիկներ և Բույսեր',
        'Երկարակյաց ծաղիկներ',
        'Արհեստական ծաղիկներ',
        'Ծաղիկներ',
    ];

    for (let f = 0; f < expectedCategories.length; f++) {
        await expect(categories.nth(f).locator('.mainName')).toHaveText(expectedCategories[f]);
    }
});


test('Search functionality ', async ({ page }) => {


    const searchField = page.locator('.search_new input');
    await searchField.fill('տորթ');
    await searchField.press('Enter');
    await page.waitForSelector('.item_name a');
    const searchResults = page.locator('.item_name a');
    const count = await searchResults.count();
    let correctSearchResult = true;
    for (let i = 0; i < count; i++) {
        let itemName = await searchResults.nth(i).innerText();
        console.log(itemName)
        if (itemName.includes("տորթ") || itemName.includes("Տորթ")) {
            continue;
        }
        correctSearchResult = false;
        break;
    }

    expect(correctSearchResult).toBe(true);
});


test('Print search results - name payers 4u.am ', async ({ page }) => {


    const searchField = page.locator('.search_new input');
    await searchField.fill('շոկոլ');
    await searchField.press('Enter');
    await page.waitForSelector('.item_name a');
    const searchResults = page.locator('.item_name a');
    const count = await searchResults.count();
    let correctSearchResult = true;
    for (let i = 0; i < count; i++) {
        let itemName = await searchResults.nth(i).innerText();
        console.log(itemName)
        if (itemName.includes("Շոկոլադ") || itemName.includes("շոկոլադ")) {
            continue;
        }
        correctSearchResult = false;
        break;
    }

    expect(correctSearchResult).toBe(true);
});



test('Print search results - name payers 4u.am failed case', async ({ page }) => {


    const searchField = page.locator('.search_new input');
    await searchField.fill('շոկո');
    await searchField.press('Enter');
    await page.waitForSelector('.item_name a');
    const searchResults = page.locator('.item_name a');
    const count = await searchResults.count();
    let correctSearchResult = true;
    for (let i = 0; i < count; i++) {
        let itemName = await searchResults.nth(i).innerText();
        console.log(itemName)
        if (itemName.includes("Շոկոլադ") || itemName.includes("շոկոլադ")) {
            continue;
        }
        correctSearchResult = false;
        break;
    }

    expect(correctSearchResult).toBe(true);
});




































