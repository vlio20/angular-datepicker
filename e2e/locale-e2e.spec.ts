import {DemoPage} from './app.po';

describe('Locales', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should check day time picker locale', async () => {
    page.hebrewLocale.click();

    page.daytimePickerMenu.click();
    page.daytimePickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.daytimeInlineMenu.click();
    expect(await page.weekDayInline.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.daytimeDirectiveMenu.click();
    page.daytimeDirectiveInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.dayPickerMenu.click();
    page.dayPickerInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.dayInlineMenu.click();
    expect(await page.weekDayInline.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.dayDirectiveMenu.click();
    page.dayDirectiveInput.click();
    expect(await page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.monthPickerMenu.click();
    page.monthPickerInput.click();
    expect(await page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

    page.monthInlineMenu.click();
    expect(await page.calendarFirstMonthOfYearInline.getText()).toEqual('ינו׳');

    page.monthDirectiveMenu.click();
    page.monthDirectiveInput.click();
    expect(await page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

    page.timePickerMenu.click();
    page.timePickerInput.click();
    expect(await page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);

    page.timeDirectiveMenu.click();
    page.timeSelectDirectiveInput.click();
    expect(await page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);

    page.timeInlineMenu.click();
    expect(await page.meridiemDisplayInline.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);
  });
});
