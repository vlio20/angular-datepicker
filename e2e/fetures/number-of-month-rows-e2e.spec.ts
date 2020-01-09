import {DemoPage} from '../app.po';

describe('number of month rows', () => {

  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  it('should make sure number of rows are changing on date-picker', async () => {
    await page.daytimePickerMenu.click();
    await page.dayPickerInput.click();
    await page.dayCalendarNavHeaderBtn.click();
    expect(await page.monthRows.count()).toEqual(3);

    await page.numOfMonthRowsToggle2.click();
    await page.dayPickerInput.click();
    expect(await page.monthRows.count()).toEqual(2);
  });

  it('should make sure number of rows are changing on month-picker', async () => {
    await page.monthPickerMenu.click();
    await page.monthPickerInput.click();
    expect(await page.monthRows.count()).toEqual(3);

    await page.numOfMonthRowsToggle2.click();
    await page.dayPickerInput.click();
    expect(await page.monthRows.count()).toEqual(2);
  });

  it('should make sure number of rows are changing on month inline', async () => {
    await page.monthInlineMenu.click();
    expect(await page.monthRows.count()).toEqual(3);

    await page.numOfMonthRowsToggle2.click();
    expect(await page.monthRows.count()).toEqual(2);
  });
});
