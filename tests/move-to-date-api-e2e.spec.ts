import {DemoPage} from './app.po';
import {expect, Locator, Page, test} from '@playwright/test';

test.describe('Move to date api', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should move to date API on day', async () => {
    const runner = async (menuItem: Locator, input: Locator | null, isPicker: boolean, cont: Locator) => {
      await menuItem.click();
      await po.moveCalendarTo().click();

      if (isPicker) {
        await input.click();
      }

      await expect(await cont.textContent()).toContain('1987');
    };

    await runner(po.dayPickerMenu(), po.dayPickerInput(), true, po.dayCalendarNavHeaderBtn());
    await runner(po.dayDirectiveMenu(), po.dayDirectiveInput(), true, po.dayCalendarNavHeaderBtn());
    await runner(po.dayInlineMenu(), null, false, po.dayCalendarNavHeaderBtnInline());

    await runner(po.daytimePickerMenu(), po.daytimePickerInput(), true, po.dayCalendarNavHeaderBtn());
    await runner(po.daytimeDirectiveMenu(), po.daytimeDirectiveInput(), true, po.dayCalendarNavHeaderBtn());
    await runner(po.daytimeInlineMenu(), null, false, po.dayTimeCalendarNavHeaderBtnInline());

    await runner(po.monthPickerMenu(), po.monthPickerInput(), true, po.navHeader());
    await runner(po.monthDirectiveMenu(), po.monthDirectiveInput(), true, po.navHeader());
    await runner(po.monthInlineMenu(), null, false, po.monthCalendarNavHeaderInline());
  });
});
