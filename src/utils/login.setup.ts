import { test as setup } from './fixtures';

setup('login to application', async ({ commonActions }) => {
    await commonActions.login();
})
