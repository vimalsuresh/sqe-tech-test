import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly cartLink: Locator;
  readonly backpackAddToCartButton: Locator;

  constructor(private page: Page) {
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}