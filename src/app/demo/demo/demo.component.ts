import debounce from '../../common/decorators/decorators';
import {IDatePickerConfig} from '../../date-picker/date-picker-config.model';
import {DatePickerComponent} from '../../date-picker/date-picker.component';
import {DatePickerDirective} from '../../date-picker/date-picker.directive';
import {DatePickerService} from '../../date-picker/date-picker.service';
import {DayCalendarService} from '../../day-calendar/day-calendar.service';
import {MonthCalendarService} from '../../month-calendar/month-calendar.service';
import {TimeSelectService} from '../../time-select/time-select.service';
import {Component, HostListener, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, Validator, Validators} from '@angular/forms';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'dp-demo',
  templateUrl: './demo.component.html',
  entryComponents: [DatePickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('datePicker') datePicker: DatePickerComponent;
  @ViewChild('dateDirectivePicker') dateDirectivePicker: DatePickerDirective;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  pickerMode = 'timePicker';

  date: Moment = moment('10:45', 'HH:mm');
  dates: Moment[] = [];
  material: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  validationMinDate: Moment;
  validationMaxDate: Moment;
  validationMinTime: Moment;
  validationMaxTime: Moment;
  placeholder: string = 'Choose a date...';

  formGroup: FormGroup = new FormGroup({
    datePicker: new FormControl({ value: this.date, disabled: this.disabled }, [
      this.required ? Validators.required : () => undefined,
      control => this.validationMinDate && this.config && moment(control.value, this.config.format).isBefore(this.validationMinDate)
        ? {minDate: 'minDate Invalid'} : undefined,
      control => this.validationMaxDate && this.config && moment(control.value, this.config.format).isAfter(this.validationMaxDate)
        ? {maxDate: 'maxDate Invalid'} : undefined
    ])
  });

  config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    format: 'DD-MM-YYYY HH:mm:ss',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
    appendTo: document.body,
    drops: 'down',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
  };
  isAtTop: boolean = true;

  constructor(
    private dayService: DayCalendarService,
    private monthService: MonthCalendarService,
    private timeService: TimeSelectService,
    private datePickerService: DatePickerService,
  ) {}

  @HostListener('document:scroll')
  @debounce(100)
  updateIsAtTop() {
    this.isAtTop = document.body.scrollTop === 0;
  }

  modeChanged() {
    this.config.hideInputContainer = false;
    this.config.inputElementContainer = undefined;
    this.formGroup.get('datePicker').setValue(this.date);
  }

  validatorsChanged() {
    this.formGroup.get('datePicker').updateValueAndValidity();
  }

  configChanged() {
    this.config = {...this.config};
  };

  createCustomWeekDays() {
    this.config.weekdayNames = this.config.weekdayNames || {};
  }

  openCalendar() {
    (this.datePicker || this.dateDirectivePicker).api.open();
  }

  closeCalendar() {
    (this.datePicker || this.dateDirectivePicker).api.close();
  }

  isValidConfig(key: string): boolean {
    switch (this.pickerMode) {
      case 'dayInline':
        return Object.keys(this.dayService.getConfig({})).indexOf(key) > -1;
      case 'monthInline':
        return Object.keys(this.monthService.getConfig({})).indexOf(key) > -1;
      case 'timeInline':
        return Object.keys(this.timeService.getConfig({})).indexOf(key) > -1;
      default:
        return true;
    }
  }

  log(item) {
    console.log(item);
  }
}
