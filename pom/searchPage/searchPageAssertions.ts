import { expect, Page } from '@playwright/test';
export class searchPageAssertions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectTitleVisible(page: Page, expectedTitle: string) {
        await expect(page.locator('h1.product-name')).toHaveText(expectedTitle);
    }

    async expectPriceVisible(page: Page, expectedPrice: string) {
        await expect(page.locator('.product-price')).toContainText(expectedPrice);
    }

    async expectCodeVisible(page: Page, expectedCode: string) {
        await expect(page.locator('.mt-5.color-1 p').first()).toHaveText(expectedCode);
    }
}