import { Locator, Page } from '@playwright/test';
import { ProductPageLocators } from './searchPageLocators';

export class ProductPage {
    static clickOnProduct(productName: string) {
        throw new Error('Method not implemented.');
    }
    readonly page: Page;
    readonly title: Locator;
    readonly price: Locator;
    readonly code: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator(ProductPageLocators.title);
        this.price = page.locator(ProductPageLocators.price);
        this.code = page.locator(ProductPageLocators.code);
    };

    async clickOnProduct(productName: string) {
        await this.item.click()
    }
}
    async getTitleText() {
    return this.title.textContent();
}

    async getPriceText() {
    return this.price.textContent();
}

    async getCodeText() {
    return this.code.textContent();
}
}