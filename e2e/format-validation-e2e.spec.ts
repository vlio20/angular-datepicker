import {DemoPage} from './app.po';
import {expect, Locator, Page, test} from '@playwright/test';

test.describe('format validation', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should check that the format validation is working', async () => {
    const common = async (menu: Locator, input: Locator) => {
      await menu.click();
      await input.click();
      await input.clear();
      await po.setText(input, 'lmaldlad');
      await po.clickOnBody();

      expect(await po.formatValidationMsg().textContent()).toBe('invalid format');
      await input.clear();
    };

    await common(po.daytimePickerMenu(), po.daytimePickerInput());
    await common(po.daytimeDirectiveMenu(), po.daytimeDirectiveInput());
    await common(po.dayPickerMenu(), po.dayPickerInput());
    await common(po.dayDirectiveMenu(), po.dayDirectiveInput());
    await common(po.monthPickerMenu(), po.monthPickerInput());
    await common(po.monthDirectiveMenu(), po.monthDirectiveInput());
    await common(po.timePickerMenu(), po.timePickerInput());
    await common(po.timeDirectiveMenu(), po.timeSelectDirectiveInput());
  });
});
