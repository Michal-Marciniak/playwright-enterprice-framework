import { test } from '../utils/fixtures';

test.describe('@smoke Home Page Tests', () => {

    test('Header search input should be visible', async ({ homePage, commonActions }) => {
        await homePage.goto();
        await commonActions.expectNavBarHeaderSearchInputToBeVisible();
    });
})