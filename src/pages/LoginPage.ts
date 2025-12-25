import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly path = '/login';
    public readonly page: Page;

    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = this.page.locator('.login-box input[name="email"]');
        this.passwordInput = this.page.locator('.login-box input[name="current-password"]');
        this.loginButton = this.page.locator('.login-box button[type="submit"]');
    }

    async goto(){
        await this.page.goto(this.path);
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}