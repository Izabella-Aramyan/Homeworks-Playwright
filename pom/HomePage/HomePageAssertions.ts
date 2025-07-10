import { expect, Page } from '@playwright/test';

export class HomePageAssertions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectProductVisible(page: Page, productName: string) {
        await expect(
            page.locator('.product-col h3', { hasText: productName })
        ).toBeVisible();
    }
}