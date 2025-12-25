import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/src/config/.env.${process.env.NODE_ENV}` });

export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use */
  reporter: 'html',
  /* Shared settings for all the projects below */
  use: {
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    bypassCSP: true,
    javaScriptEnabled: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'login setup',
      testMatch: /login\.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/login.json',
      },
      dependencies: ['login setup'],
    },
    {
      name: 'Desktop Firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: '.auth/login.json',
      },
      dependencies: ['login setup'],
    },
    {
      name: 'Desktop WebKit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: '.auth/login.json',
      },
      dependencies: ['login setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
