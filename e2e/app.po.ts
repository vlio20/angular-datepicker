import { Locator, Page } from '@playwright/test';

export class DemoPage {

  private popupSelector = '.dp-popup.dp-main';

  constructor(private page: Page) {
  }

  dayPickerInput(): Locator {
    return this.page.locator('#picker input');
  }

  openOnClickRadioOff(): Locator {
    return this.page.locator('#noOpenOnClick');
  }

  emptyElem(): Locator {
    return this.page.locator('.dp-place-holder');
  }

  timePickerInput(): Locator {
    return this.page.locator('#picker input');
  }

  daytimePickerInput(): Locator {
    return this.page.locator('#picker input');
  }

  daytimeDirectiveInput(): Locator {
    return this.page.locator('input#picker');
  }

  dayDirectiveInput(): Locator {
    return this.page.locator('input#picker');
  }

  monthDirectiveInput(): Locator {
    return this.page.locator('input#picker');
  }

  timeSelectDirectiveInput(): Locator {
    return this.page.locator('input#picker');
  }

  datePickerPopup(): Locator {
    return this.page.locator(this.popupSelector);
  }

  dayCalendarContainer(): Locator {
    return this.page.locator(`${this.popupSelector} dp-day-calendar .dp-day-calendar-container`);
  }

  monthPickerInput(): Locator {
    return this.page.locator('#picker input');
  }

  monthCalendar(): Locator {
    return this.page.locator(`${this.popupSelector} dp-month-calendar`);
  }

  monthWeeks(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-calendar-week`);
  }

  selectedDays(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-calendar-day.dp-selected`);
  }

  selectedDay(): Locator {
    return this.page.locator(`.dp-calendar-day.dp-selected`);
  }

  selectedMonth(): Locator {
    return this.page.locator(`.dp-calendar-month.dp-selected`);
  }

  dayCalendarLeftNavBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-calendar-nav-left`);
  }

  dayCalendarLeftSecondaryNavBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-calendar-secondary-nav-left`);
  }

  dayCalendarRightSecondaryNavBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-calendar-secondary-nav-right`);
  }

  monthCalendarLeftNavBtn(): Locator {
    return this.page.locator(`${this.popupSelector} dp-month-calendar .dp-calendar-nav-left`);
  }

  monthCalendarRightNavBtn(): Locator {
    return this.page.locator(`${this.popupSelector} dp-month-calendar .dp-calendar-nav-right`);
  }

  weekDayNames(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-weekdays`);
  }

  weekDayInline(): Locator {
    return this.page.locator(`.dp-inline .dp-weekdays`);
  }

  currentLocationBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-current-location-btn`);
  }

  themeOnRadio(): Locator {
    return this.page.locator('#themeOn');
  }

  themeOffRadio(): Locator {
    return this.page.locator('#themeOff');
  }

  openOnFocusRadioOff(): Locator {
    return this.page.locator('#noOpenOnFocus');
  }

  openOnClickRadioOn(): Locator {
    return this.page.locator('#yesOpenOnClick');
  }

  onOpenDelayInput(): Locator {
    return this.page.locator('#onOpenDelay');
  }

  showNearMonthDaysRadio(): Locator {
    return this.page.locator('#showNearMonthDaysRadio');
  }

  hideNearMonthDaysRadio(): Locator {
    return this.page.locator('#hideNearMonthDaysRadio');
  }

  showWeekNumbersRadio(): Locator {
    return this.page.locator('#showWeekNumbersRadio');
  }

  weekNumbers(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-week-number`);
  }

  dayCalendarNavHeaderBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-nav-header-btn`);
  }

  deyCalendarMonthNavHeader(): Locator {
    return this.page.locator(`${this.popupSelector} dp-month-calendar .dp-nav-header button`);
  }

  dayTimeCalendarNavHeaderBtnInline(): Locator {
    return this.page.locator(`dp-day-time-calendar .dp-nav-header-btn`);
  }

  dayCalendarNavHeaderBtnInline(): Locator {
    return this.page.locator(`dp-day-calendar .dp-nav-header-btn`);
  }

  monthCalendarNavHeaderInline(): Locator {
    return this.page.locator(`dp-month-calendar .dp-nav-header`);
  }

  navHeader(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-nav-header`);
  }

  dayCalendarNavMonthHeaderBtn(): Locator {
    return this.page.locator(`${this.popupSelector} dp-month-calendar .dp-nav-header-btn`);
  }

  calendarDisabledDays(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-calendar-day[disabled]`);
  }

  calendarFirstDayOfMonth(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-current-month`);
  }

  calendarFirstMonthOfYear(): Locator {
    return this.page.locator(`${this.popupSelector} dp-month-calendar .dp-calendar-month`);
  }

  calendarFirstMonthOfYearInline(): Locator {
    return this.page.locator(`.dp-inline dp-month-calendar .dp-calendar-month`);
  }

  currentMonthCalendarBtn(): Locator {
    return this.page.locator(`${this.popupSelector} dp-month-calendar .dp-current-month`);
  }

  disableMonthSelector(): Locator {
    return this.page.locator('#disableMonthSelector');
  }

  yearFormat(): Locator {
    return this.page.locator('#yearFormat');
  }

  hideGoToCurrentRadio(): Locator {
    return this.page.locator('#hideGoToCurrent');
  }

  showGoToCurrentRadio(): Locator {
    return this.page.locator('#showGoToCurrent');
  }

  enableUnselectSelected(): Locator {
    return this.page.locator('#enableUnSelect');
  }

  disableUnselectSelected(): Locator {
    return this.page.locator('#disableUnSelect');
  }

  pickerEnabledRadio(): Locator {
    return this.page.locator('#inputEnabledRadio');
  }

  pickerDisabledRadio(): Locator {
    return this.page.locator('#inputDisabledRadio');
  }

  enableRequiredValidationRadio(): Locator {
    return this.page.locator('#enableRequiredRadio');
  }

  disableRequiredValidationRadio(): Locator {
    return this.page.locator('#disableRequiredRadio');
  }

  requiredValidationMsg(): Locator {
    return this.page.locator('#requiredValidation');
  }

  formatValidationMsg(): Locator {
    return this.page.locator('#formatValidation');
  }

  minDateValidationPickerInput(): Locator {
    return this.page.locator('#minDatePicker input');
  }

  minDateValidationMsg(): Locator {
    return this.page.locator('#minDateValidation');
  }

  maxDateValidationPickerInput(): Locator {
    return this.page.locator('#maxDatePicker input');
  }

  maxDateValidationMsg(): Locator {
    return this.page.locator('#maxDateValidation');
  }

  minTimeValidationPickerInput(): Locator {
    return this.page.locator('#minTimeValidation input');
  }

  maxTimeValidationPickerInput(): Locator {
    return this.page.locator('#maxTimeValidation input');
  }

  placeholderInput(): Locator {
    return this.page.locator('#placeholderInput');
  }

  monthFormatInput(): Locator {
    return this.page.locator('#monthFormatInput');
  }

  minSelectableInput(): Locator {
    return this.page.locator('#minSelectable input');
  }

  maxSelectableInput(): Locator {
    return this.page.locator('#maxSelectable input');
  }

  noCloseOnSelect(): Locator {
    return this.page.locator('#noCloseOnSelect');
  }

  closeDelayInput(): Locator {
    return this.page.locator('#closeDelay');
  }

  weekDaysFormatInput(): Locator {
    return this.page.locator('#weekDaysFormat');
  }

  dateFormatInput(): Locator {
    return this.page.locator('#dateFormat');
  }

  enableMultiselect(): Locator {
    return this.page.locator('#enableMultiselect');
  }

  dayBtnFormatInput(): Locator {
    return this.page.locator('#dayBtnFormat');
  }

  monthBtnFormatInput(): Locator {
    return this.page.locator('#monthBtnFormat');
  }

  hours12FormatInput(): Locator {
    return this.page.locator('#hours12Format');
  }

  hours24FormatInput(): Locator {
    return this.page.locator('#hours24Format');
  }

  maxTimeInput(): Locator {
    return this.page.locator('#maxTimeSelectable input');
  }

  meridiemFormatInput(): Locator {
    return this.page.locator('#meridiemFormat');
  }

  minTimeInput(): Locator {
    return this.page.locator('#minTimeSelectable input');
  }

  minutesFormatInput(): Locator {
    return this.page.locator('#minutesFormat');
  }

  minutesIntervalInput(): Locator {
    return this.page.locator('#minutesInterval');
  }

  secondsFormatInput(): Locator {
    return this.page.locator('#secondsFormat');
  }

  secondsIntervalInput(): Locator {
    return this.page.locator('#secondsInterval');
  }

  showSeconds(): Locator {
    return this.page.locator('#showSeconds');
  }

  showTwentyFourHours(): Locator {
    return this.page.locator('#showTwentyFourHours');
  }

  timeSeparatorInput(): Locator {
    return this.page.locator('#timeSeparator');
  }

  showMultipleYearsNavigation(): Locator {
    return this.page.locator('#showMultipleYearsNavigation');
  }

  multipleYearsNavigateBy(): Locator {
    return this.page.locator('#multipleYearsNavigateBy');
  }

  hideInputRadio(): Locator {
    return this.page.locator('#hideInputRadio');
  }

  showOnOutsideClick(): Locator {
    return this.page.locator('#showOnOutsideClick');
  }

  enableCloseOnEnter(): Locator {
    return this.page.locator('#enableCloseOnEnter');
  }

  disableCloseOnEnter(): Locator {
    return this.page.locator('#disableCloseOnEnter');
  }

  hourUpBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-hours > .dp-time-select-control-up`);
  }

  hourDownBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-hours > .dp-time-select-control-down`);
  }

  hourDisplay(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-display-hours`);
  }

  minuteUpBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-minutes > .dp-time-select-control-up`);
  }

  minuteDownBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-minutes > .dp-time-select-control-down`);
  }

  minuteDisplay(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-display-minutes`);
  }

  secondUpBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-seconds > .dp-time-select-control-up`);
  }

  secondDownBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-seconds > .dp-time-select-control-down`);
  }

  secondDisplay(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-display-seconds`);
  }

  meridiemUpBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-meridiem > .dp-time-select-control-up`);
  }

  meridiemDownBtn(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-control-meridiem > .dp-time-select-control-down`);
  }

  meridiemDisplay(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-display-meridiem`);
  }

  meridiemDisplayInline(): Locator {
    return this.page.locator(`.dp-inline .dp-time-select-display-meridiem`);
  }

  timeSeparatorDisplay(): Locator {
    return this.page.locator(`${this.popupSelector} .dp-time-select-separator:nth-child(2)`);
  }

  monthRows(): Locator {
    return this.page.locator('.dp-months-row');
  }

  numOfMonthRowsToggle(): Locator {
    return this.page.locator('#numOfMonthRows2');
  }

  daytimePickerMenu(): Locator {
    return this.page.locator('#daytimePickerMenu');
  }

  daytimeInlineMenu(): Locator {
    return this.page.locator('#daytimeInlineMenu');
  }

  daytimeDirectiveMenu(): Locator {
    return this.page.locator('#daytimeDirectiveMenu');
  }

  dayPickerMenu(): Locator {
    return this.page.locator('#dayPickerMenu');
  }

  dayInlineMenu(): Locator {
    return this.page.locator('#dayInlineMenu');
  }

  dayDirectiveMenu(): Locator {
    return this.page.locator('#dayDirectiveMenu');
  }

  monthPickerMenu(): Locator {
    return this.page.locator('#monthPickerMenu');
  }

  monthInlineMenu(): Locator {
    return this.page.locator('#monthInlineMenu');
  }

  monthDirectiveMenu(): Locator {
    return this.page.locator('#monthDirectiveMenu');
  }

  timePickerMenu(): Locator {
    return this.page.locator('#timePickerMenu');
  }

  timeInlineMenu(): Locator {
    return this.page.locator('#timeInlineMenu');
  }

  timeDirectiveMenu(): Locator {
    return this.page.locator('#timeDirectiveMenu');
  }

  openBtn(): Locator {
    return this.page.locator('#openBtn');
  }

  moveCalendarTo(): Locator {
    return this.page.locator('#moveCalendarTo');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto('/');
  }

  async clickOnBody(): Promise<void> {
    await this.emptyElem().click();
  }

  async scrollIntoView(el: string, top = false): Promise<void> {
    await this.page.locator(el).scrollIntoViewIfNeeded();
  }

  async clickOnDayButton(text: string): Promise<void> {
    await this.page.locator(`${this.popupSelector} .dp-calendar-day:has-text("${text}")`).click();
  }

  localeSelect(): Locator {
    return this.page.locator('#locale');
  }

  async clickOnDayButtonInline(text: string): Promise<void> {
    return this.page.locator(`.dp-calendar-day:has-text("${text}")`).click();
  }

  clickOnMonthButton(text: string): Promise<void> {
    return this.page.locator(`${this.popupSelector} .dp-calendar-month:has-text("${text}")`).click();
  }

  clickOnMonthButtonInline(text: string): Promise<void> {
    return this.page.locator(`.dp-calendar-month:has-text("${text}")`).click();
  }

  firstDayOfWeekSelect(): Locator {
    return this.page.locator('#firstDayOfWeekSelect');
  }

  async setText(elem: Locator, text: string): Promise<void> {
    await elem.focus();
    await this.page.keyboard.press('Meta+A');
    await this.page.keyboard.press('Backspace');
    await elem.fill(text);
  }

  async clearInput(elem: Locator): Promise<void> {
    await this.setText(elem, '');
  }

  async sleep(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
