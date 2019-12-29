import {DemoPage} from '../app.po';

describe('format changed validation', () => {
  let page: DemoPage;

  beforeEach(async () => {
    page = new DemoPage();
    await page.navigateTo();
  });

  fit('should hide validation on date time picker', async () => {
    await page.daytimePickerMenu.click();
    await page.setInputValue(page.dateFormatInput, 'DD-MM-YYYY');
    await page.setInputValue(page.daytimePickerInput, '10-04-2017 09:08:07');
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeTruthy();
    await page.setInputValue(page.dateFormatInput, 'DD-MM-YYYY HH:mm:ss');
    await page.setInputValue(page.daytimePickerInput, '10-04-2017 09:08:07');
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeFalsy();
  });

  it('should hide validation on day picker', async () => {
    await page.dayPickerMenu.click();
    await page.setInputValue(page.dateFormatInput, 'DD-MM');
    await page.setInputValue(page.dayPickerInput, '10-04-2017');
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeTruthy();
    await page.setInputValue(page.dateFormatInput, 'DD-MM-YYYY');
    await page.setInputValue(page.dayPickerInput, '10-04-2017');
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeFalsy();
  });

  it('should work on time picker picker', async () => {
    await page.timePickerMenu.click();
    await page.setInputValue(page.dateFormatInput, 'HH');
    await page.setInputValue(page.timePickerInput, '10:04');
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeTruthy();
    await page.setInputValue(page.dateFormatInput, 'HH:mm');
    await page.timePickerInput.click();
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeFalsy();
  });

  it('should hide validation on month picker', async () => {
    await page.monthDirectiveMenu.click();
    await page.setInputValue(page.dateFormatInput, 'MM');
    await page.setInputValue(page.monthDirectiveInput, 'Jan');
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeTruthy();
    await page.setInputValue(page.dateFormatInput, 'MMM');
    await page.setInputValue(page.monthDirectiveInput, 'Jan');
    await page.clickOnBody();
    expect(await page.formatValidationMsg.isPresent()).toBeFalsy();
  });
});
