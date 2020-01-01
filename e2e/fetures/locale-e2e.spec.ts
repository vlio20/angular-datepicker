import {DemoPage} from '../app.po';

describe('Locales', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  it('should check day time picker locale', async () => {
    await page.daytimePickerMenu.click();
    await page.hebrewLocale.click();
    await page.daytimePickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await page.daytimeInlineMenu.click();
    await page.hebrewLocale.click();
    expect(await page.weekDayInline.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await page.daytimeDirectiveMenu.click();
    await page.hebrewLocale.click();
    await page.daytimeDirectiveInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await page.dayPickerMenu.click();
    await page.hebrewLocale.click();
    await page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await page.dayInlineMenu.click();
    await page.hebrewLocale.click();
    expect(await page.weekDayInline.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await page.dayDirectiveMenu.click();
    await page.hebrewLocale.click();
    await page.dayDirectiveInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    await page.monthPickerMenu.click();
    await page.hebrewLocale.click();
    await page.monthPickerInput.click();
    expect(await page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

    await page.monthInlineMenu.click();
    await page.hebrewLocale.click();
    expect(await page.calendarFirstMonthOfYearInline.getText()).toEqual('ינו׳');

    await page.monthDirectiveMenu.click();
    await page.hebrewLocale.click();
    await page.monthDirectiveInput.click();
    expect(await page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

    await page.timePickerMenu.click();
    await page.hebrewLocale.click();
    await page.timePickerInput.click();
    expect(await page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);

    await page.timeDirectiveMenu.click();
    await page.hebrewLocale.click();
    await page.timeSelectDirectiveInput.click();
    expect(await page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);

    await page.timeInlineMenu.click();
    await page.hebrewLocale.click();
    expect(await page.meridiemDisplayInline.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);
  });
});
