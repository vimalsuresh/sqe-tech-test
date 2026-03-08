import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly finishButton: Locator;

  constructor(private page: Page) {
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async finish() {
    await this.finishButton.click();
  }
}