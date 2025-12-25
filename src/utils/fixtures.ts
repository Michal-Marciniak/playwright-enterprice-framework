import { test as base, request, APIRequestContext, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { CommonActions } from '../common/CommonActions';

type FixtureType = {
    page: Page,
    homePage: HomePage;
    loginPage: LoginPage;
    profilePage: ProfilePage;
    commonActions: CommonActions;
    api: APIRequestContext;
};

export const test = base.extend<FixtureType>({
    page: async ({ page }, use) => {
        const commonActions = new CommonActions(page);
        commonActions.acceptCookiesBannerIfVisible();
        await use(page);
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },

    commonActions: async ({ page }, use) => {
        await use(new CommonActions(page));
    },

    api: async ({}, use) => {
        const ctx = await request.newContext({
             baseURL: process.env.API_BASE_URL 
        });
        await use(ctx);
        await ctx.dispose();
    }
});

export { expect } from '@playwright/test';