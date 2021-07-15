import {DemoPage} from './app.po';

describe('dpDayPicker configuration', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    page.navigateTo();

    await page.daytimePickerMenu.click();
  });

  it('openOnClick = false, should not open picker when clicked', async () => {
    await page.scrollIntoView(page.openOnClickRadioOff);
    await page.openOnClickRadioOff.click();
    await page.openOnFocusRadioOff.click();
    await page.daytimePickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('openOnClick = true, should open picker when clicked', async () => {
    await page.scrollIntoView(page.openOnClickRadioOn);
    await page.openOnClickRadioOn.click();
    await page.openOnFocusRadioOff.click();
    await page.daytimePickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });
});
