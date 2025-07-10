import { Locator, Page } from '@playwright/test';
import { HomePageLocators } from '..//HomePage/HomePageLocators';

export class Homepage {
    clickOnProduct(productName: string) {
        throw new Error('Method not implemented.');
    }

    readonly page: Page;
    readonly searchIcon: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchIcon = page.locator(HomePageLocators.searchIcon);
        this.searchInput = page.locator(HomePageLocators.searcInput);
        this.searchButton = page.locator(HomePageLocators.searchButton);
    }

    async doSearch(searchKey: string) {
        await this.searchIcon.click();
        await this.searchInput.fill(searchKey);
        await this.searchButton.click();
    }

