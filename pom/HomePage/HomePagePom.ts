import { Locator, Page } from '@playwright/test';
import { HomePageLocators } from '../HomePage/HomePageLocators';

class Homepage {

    constructor(page: Page) {

        this.searchIcon = page.locator(HomePageLocators.searchIcon);
        this.searchInput = page.locator(HomePageLocators.searchInput);
        this.searchButton = page.locator(HomePageLocators.searchButton);
    }

    async doSearch(searchIcon, searchInput, searchButton) {
        await this.page.click(this.searchIcon);
        await this.page.fill(this.inputField, "Շապիկ");
        await this.page.click(this.searchButton);
    }




}