import { DemoPage } from '../app.po';
import { expect, Locator, Page, test } from '@playwright/test';
import dayjs from 'dayjs';

test.describe('dpDayPicker timePicker', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should make sure unSelectOnClick feature works as expected for day calendar', async () => {
    const dayRunner = async (menuItem: Locator, input: Locator, isPicker: boolean) => {
      const date = dayjs().date(15);
      const dayClick = async () => {
        if (isPicker) {
          await po.clickOnDayButton(date.format('DD'));
        } else {
          await po.clickOnDayButtonInline(date.format('DD'));
        }
      };

      await menuItem.click();
      await po.enableUnselectSelected().click();

      if (isPicker) {
        await po.noCloseOnSelect().click();
        await po.clearInput(input);
        await input.click();
      } else {
        await dayClick();
        await dayClick();
      }

      await dayClick();
      expect(await po.selectedDay()).toBeVisible();
      await dayClick();
      expect(await po.selectedDay()).toBeHidden();

      await po.clickOnBody();

      await po.disableUnselectSelected().click();

      if (isPicker) {
        await input.click();
      }

      await dayClick();

      expect(await po.selectedDay()).toBeVisible();

      await dayClick();
      expect(await po.selectedDay()).toBeVisible();

      await po.enableUnselectSelected().click();

      if (isPicker) {
        await input.click();
      }

      await dayClick();
      expect(await po.selectedDay()).toBeHidden();
    };

    await dayRunner(po.dayPickerMenu(), po.dayPickerInput(), true);
    await dayRunner(po.dayDirectiveMenu(), po.dayDirectiveInput(), true);
    await dayRunner(po.dayInlineMenu(), null, false);
  });

  test('should make sure unSelectOnClick feature works as expected for month calendar', async () => {
    const monthRunner = async (menuItem: Locator, input: Locator, isPicker: boolean) => {
      const date = dayjs();
      const monthClick = async () => {
        if (isPicker) {
          await po.clickOnMonthButton(date.format('MMM'));
        } else {
          await po.clickOnMonthButtonInline(date.format('MMM'));
        }
      };

      await menuItem.click();
      await po.enableUnselectSelected().click();

      if (isPicker) {
        await po.noCloseOnSelect().click();
        await po.clearInput(input);
        await input.click();
      } else {
        await po.clickOnMonthButtonInline(date.format('MMM'));
      }

      await monthClick();
      expect(po.selectedMonth()).toBeVisible();
      await monthClick();
      expect(po.selectedMonth()).toBeHidden();

      await po.clickOnBody();
      await po.disableUnselectSelected().click();

      if (isPicker) {
        await input.click();
      }

      await monthClick();

      expect(po.selectedMonth()).toBeVisible();

      await monthClick();
      expect(po.selectedMonth()).toBeVisible();

      await po.enableUnselectSelected().click();

      if (isPicker) {
        await input.click();
      }

      await monthClick();
      expect(po.selectedMonth()).toBeHidden();
    };

    await monthRunner(po.monthPickerMenu(), po.monthPickerInput(), true);
    await monthRunner(po.monthDirectiveMenu(), po.monthDirectiveInput(), true);
    await monthRunner(po.monthInlineMenu(), null, false);
  });
});
