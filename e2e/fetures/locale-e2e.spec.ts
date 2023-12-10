import {DemoPage} from '../app.po';
import {expect, Page, test} from '@playwright/test';

test.describe('Locales', () => {
  let po: DemoPage;
  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    po = new DemoPage(page);
    await po.navigateTo();
  });

  test('should check day time picker locale', async () => {
    await po.daytimePickerMenu().click();
    await po.localeSelect().selectOption('he');
    await po.daytimePickerInput().click();
    expect(await po.weekDayNames().allTextContents()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await po.daytimeInlineMenu().click();
    await po.localeSelect().selectOption('he');
    expect(await po.weekDayInline().allTextContents()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await po.daytimeDirectiveMenu().click();
    await po.localeSelect().selectOption('he');
    await po.daytimeDirectiveInput().click();
    expect(await po.weekDayNames().allTextContents()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await po.dayPickerMenu().click();
    await po.localeSelect().selectOption('he');
    await po.dayPickerInput().click();
    expect(await po.weekDayNames().allTextContents()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await po.dayInlineMenu().click();
    await po.localeSelect().selectOption('he');
    expect(await po.weekDayInline().allTextContents()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await po.dayDirectiveMenu().click();
    await po.localeSelect().selectOption('he');
    await po.dayDirectiveInput().click();
    expect(await po.weekDayNames().allTextContents()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await po.monthPickerMenu().click();
    await po.localeSelect().selectOption('he');
    await po.monthPickerInput().click();
    expect(await po.calendarFirstMonthOfYear().first().textContent()).toEqual('ינו');

    await po.monthInlineMenu().click();
    await po.localeSelect().selectOption('he');
    expect(await po.calendarFirstMonthOfYearInline().first().textContent()).toEqual('ינו');

    await po.monthDirectiveMenu().click();
    await po.localeSelect().selectOption('he');
    await po.monthDirectiveInput().click();
    expect(await po.calendarFirstMonthOfYear().first().textContent()).toEqual('ינו');
  });
});
