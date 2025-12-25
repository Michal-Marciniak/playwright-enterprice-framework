import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { commonLocators } from '../common/commonLocators';
import { ProfilePage } from '../pages/ProfilePage';
import { HomePage } from '../pages/HomePage';

const { navbarHeaderSearchInput, navbaraccountMenuButton, navbarAccountMenu } = commonLocators;

export class CommonActions {
    public readonly page: Page;
    public readonly loginPage: LoginPage;
    public readonly profilePage: ProfilePage;
    public readonly homePage: HomePage;

    public readonly oneTrustAcceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.profilePage = new ProfilePage(page);
        this.homePage = new HomePage(page);

        this.oneTrustAcceptButton = this.page.locator('#onetrust-accept-btn-handler');
    }

    async acceptCookiesBannerIfVisible() {
        await this.page.addLocatorHandler(
            this.oneTrustAcceptButton,
            async () => {
                await this.oneTrustAcceptButton.click();
            }
        )
    }

    async expectNavBarHeaderSearchInputToBeVisible() {
        await expect(this.page.locator(navbarHeaderSearchInput)).toBeVisible();
    }

    async expectNavBarAccountMenuButtonToHaveText(expectedText: string) {
        await expect(this.page.locator(navbaraccountMenuButton)).toHaveText(expectedText);
    }

    async login() {
        await this.page.context().clearCookies();
        await this.page.context().clearPermissions();
        await this.loginPage.goto();
        await this.loginPage.login(
            process.env.USER_EMAIL!,
            process.env.USER_PASSWORD!
        );
        await expect(this.page).toHaveURL(/profile/);
        await this.profilePage.expectFullNameHeaderToContainUserFullName();
        await this.expectNavBarAccountMenuButtonToHaveText(
            process.env.USER_NAME!
        );
        await this.page.context().storageState({ path: '.auth/login.json' });
    }

    async logout() {
        await this.expectNavBarAccountMenuButtonToHaveText(
            process.env.USER_NAME!
        );
        await this.page.locator(navbaraccountMenuButton).hover();
        await this.page.locator(navbarAccountMenu).locator('button', { hasText: 'Wyloguj się'}).click();
        await this.expectNavBarAccountMenuButtonToHaveText('Zaloguj się');
    }
}