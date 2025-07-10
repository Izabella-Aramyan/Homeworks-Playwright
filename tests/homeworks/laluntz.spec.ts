import { test } from '@playwright/test';
import { expectCodeVisible, expectPriceVisible, expectTitleVisible } from '../../pom/searchPage/searchPageAssertions';
import { Homepage } from '../../pom/HomePage/HomePagePom';
import { HomePageAssertions } from '../../pom/HomePage/HomePageAssertions';

test('search functionality', async ({ page }) => {
  const homePage = new Homepage(page);
  const homePageAssertions = new HomePageAssertions(page);

  await page.goto('https://lalunz.com//');

  const searchKey = 'Շապիկ';
  await homePage.doSearch(searchKey);
  await homePageAssertions.expectProductVisible(page, 'Մանկական կարճաթև շապիկ «Դեպի Արկածներ» 0-2տ');
});
