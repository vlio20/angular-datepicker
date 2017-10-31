import {DemoPage} from './app.po';

describe('Locales', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();
  });

  it('should check day time picker locale', () => {
    page.hebrewLocale.click();

    page.daytimePickerMenu.click();
    page.daytimePickerInput.click();
    expect(page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.daytimeInlineMenu.click();
    expect(page.weekDayInline.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.daytimeDirectiveMenu.click();
    page.daytimeDirectiveInput.click();
    expect(page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.dayPickerMenu.click();
    page.dayPickerInput.click();
    expect(page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.dayInlineMenu.click();
    expect(page.weekDayInline.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.dayDirectiveMenu.click();
    page.dayDirectiveInput.click();
    expect(page.weekDayNames.getText()).toEqual(['א׳ב׳ג׳ד׳ה׳ו׳ש׳']);

    page.monthPickerMenu.click();
    page.monthPickerInput.click();
    expect(page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

    page.monthInlineMenu.click();
    expect(page.calendarFirstMonthOfYearInline.getText()).toEqual('ינו׳');

    page.monthDirectiveMenu.click();
    page.monthDirectiveInput.click();
    expect(page.calendarFirstMonthOfYear.getText()).toEqual('ינו׳');

    page.timePickerMenu.click();
    page.timePickerInput.click();
    expect(page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);

    page.timeDirectiveMenu.click();
    page.timeSelectDirectiveInput.click();
    expect(page.meridiemDisplay.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);

    page.timeInlineMenu.click();
    expect(page.meridiemDisplayInline.getText()).toMatch(/(בערב|בבוקר|לפני הצהריים|אחרי הצהריים|לפנות בוקר)/);
  });
});
