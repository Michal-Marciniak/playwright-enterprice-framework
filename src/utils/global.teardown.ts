import { test as teardown } from './fixtures';
import { CommonActions } from '../common/CommonActions';

teardown('clean application state', async ({ page }) => {
    const commonActions = new CommonActions(page);

    await commonActions.logout();
})
