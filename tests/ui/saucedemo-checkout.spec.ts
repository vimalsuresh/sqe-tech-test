import { test, expect } from '@playwright/test';
import { PurchaseFlow } from '../../src/flows/purchase.flow';
import { CheckoutCompletePage } from '../../src/pages/checkout-complete.page';
import { buildCheckoutUser } from '../../src/data/test-data.factory';
import env from '../../src/config/env';

test.describe('Sauce Demo UI', () => {
  test('should allow a standard user to complete checkout successfully', async ({ page }) => {
    const purchaseFlow = new PurchaseFlow(page);
    const user = buildCheckoutUser();

    await purchaseFlow.completePurchase(env.sauceUsername, env.saucePassword, user);

    const completePage = new CheckoutCompletePage(page);
    await expect(completePage.completeHeader).toHaveText('Thank you for your order!');
  });
});