import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
    private readonly path = '/profile';
    public readonly page: Page;

    private readonly fullNameHeader: Locator;

    constructor(page: Page) {
        this.page = page;

        // TODO: Update selector if isMobile fixture will be used in the future
        this.fullNameHeader = this.page.locator('.headline');
    }

    async goto(){
        await this.page.goto(this.path);
    }

    async expectFullNameHeaderToContainUserFullName() {
        await expect(this.fullNameHeader).toHaveText(
            `Witaj ${process.env.USER_NAME} ${process.env.USER_LASTNAME}`
        );
    }
}