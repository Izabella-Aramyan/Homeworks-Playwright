import { test, expect } from '@playwright/test';
import Homepage from "../Homepage/HomePageLocators"
test('has title', async ({ page }) => {
    await page.goto('https://lalunz.com/');
    let searchKey = 'Շապիկ';

    const searchIcon = page.locator('.earch-btn');
    const searchInput = page.locator('.search-row.active');
    const searchButton = page.locator('.submit-search')

    await searchIcon.click();
    await searchInput.fill(searchKey)
    await searchButton.click();
});





