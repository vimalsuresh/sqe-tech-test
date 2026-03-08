import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';

export class PurchaseFlow {
  constructor(private page: Page) {}

  async completePurchase(
    username: string,
    password: string,
    user: { firstName: string; lastName: string; postalCode: string }
  ) {
    const loginPage = new LoginPage(this.page);
    const inventoryPage = new InventoryPage(this.page);
    const cartPage = new CartPage(this.page);
    const checkoutPage = new CheckoutPage(this.page);
    const checkoutOverviewPage = new CheckoutOverviewPage(this.page);

    await loginPage.goto();
    await loginPage.login(username, password);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.enterCustomerDetails(user.firstName, user.lastName, user.postalCode);
    await checkoutOverviewPage.finish();
  }
}