import { Page, test } from '@playwright/test';
import { searchPageAssertions } from '../../pom/searchPage/searchPageAssertions';
import { Homepage } from '../../pom/HomePage/HomePagePom';
import { HomePageAssertions } from '../../pom/HomePage/HomePageAssertions';
import { ProductPage } from '../../pom/searchPage/searchPagePom';

test('check product details', async ({ page }) => {
    const homePage = new Homepage(page);
    const homePageAssertions = new HomePageAssertions(page);

    await page.goto('https://lalunz.com/');

    const searchKey = 'Շապիկ';
    const productName = 'Մանկական կարճաթև շապիկ «Դեպի Արկածներ» 0-2տ';

    await homePage.doSearch(searchKey);
    await homePageAssertions.expectProductVisible(page, productName);

    await ProductPage.clickOnProduct(productName);

    await expectTitleVisible(page, productName);
    await expectCodeVisible(page, '3900');
    await expectCodeVisible(page, 'Կոդ: 2818');
});





function expectTitleVisible(page: Page, productName: string) {

}

function expectCodeVisible(page: Page, arg1: string) {

}

