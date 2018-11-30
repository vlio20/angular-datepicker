import {DemoPage} from './app.po';

describe('dpDayPicker configuration', () => {
  let page: DemoPage;

  beforeEach(() => {
    page = new DemoPage();
    page.navigateTo();

    page.daytimePickerMenu.click();
  });

  it('openOnClick = false, should not open picker when clicked', async () => {
    page.openOnClickRadioOff.click();
    page.openOnFocusRadioOff.click();
    page.daytimePickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(false);
  });

  it('openOnClick = true, should open picker when clicked', async () => {
    page.openOnClickRadioOn.click();
    page.openOnFocusRadioOff.click();
    page.daytimePickerInput.click();
    expect(await page.datePickerPopup.isDisplayed()).toBe(true);
  });
});
