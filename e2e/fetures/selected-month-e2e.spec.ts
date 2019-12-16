import {DemoPage} from '../app.po';

describe('selected-month', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();

    await page.dateFormatInput.clear();
    await page.dateFormatInput.sendKeys('DD-MM-YYYY');
  });

  it('should work on date time picker', async () => {
    await page.daytimePickerMenu.click();
    await page.dateFormatInput.clear();
    await page.dateFormatInput.sendKeys('DD-MM-YYYY HH:mm:ss');
    await page.daytimePickerInput.sendKeys('10-04-2017 09:08:07');

    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.selectedMonth.getText()).toEqual('Apr');
  });

  it('should work on day picker', async () => {
    await page.dayPickerMenu.click();
    await page.dayPickerInput.click();
    await page.dayPickerInput.clear();
    await page.dayPickerInput.sendKeys('10-04-2017');

    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.selectedMonth.getText()).toEqual('Apr');
  });

  it('should work on reactive day picker', async () => {
    await page.dayDirectiveReactiveMenu.click();
    await page.dayDirectiveReactiveInput.click();
    await page.dayDirectiveReactiveInput.clear();
    await page.dayDirectiveReactiveInput.sendKeys('10-04-2017');

    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.selectedMonth.getText()).toEqual('Apr');
  });
});
