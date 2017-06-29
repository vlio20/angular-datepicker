import debounce from '../../common/decorators/decorators';
import {IDatePickerConfig} from '../../date-picker/date-picker-config.model';
import {DatePickerComponent} from '../../date-picker/date-picker.component';
import {DatePickerDirective} from '../../date-picker/date-picker.directive';
import {Component, HostListener, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';

const GLOBAL_OPTION_KEYS = [
  'theme'
];
const PICKER_OPTION_KEYS = [
  'apiclose',
  'apiopen',
  'appendTo',
  'disabled',
  'disableKeypress',
  'drops',
  'format',
  'onOpenDelay',
  'opens',
  'placeholder',
  'required'
];
const DAY_PICKER_DIRECTIVE_OPTION_KEYS = [
  'allowMultiSelect',
  'closeOnSelect',
  'closeOnSelectDelay',
  ...PICKER_OPTION_KEYS
];
const DAY_PICKER_OPTION_KEYS = [
  'showGoToCurrent',
  ...DAY_PICKER_DIRECTIVE_OPTION_KEYS
];
const DAY_TIME_PICKER_OPTION_KEYS = [
  'showGoToCurrent',
  ...PICKER_OPTION_KEYS
];
const TIME_PICKER_OPTION_KEYS = [
  ...PICKER_OPTION_KEYS
];
const MONTH_CALENDAR_OPTION_KEYS = [
  'max',
  'min',
  'monthBtnFormat',
  'yearFormat',
  ...GLOBAL_OPTION_KEYS
];
const DAY_CALENDAR_OPTION_KEYS = [
  'firstDayOfWeek',
  'max',
  'maxValidation',
  'min',
  'minValidation',
  'monthFormat',
  'weekdayNames',
  'showNearMonthDays',
  'showWeekNumbers',
  'enableMonthSelector',
  'dayBtnFormat',
  ...MONTH_CALENDAR_OPTION_KEYS
];
const TIME_SELECT_SHARED_OPTION_KEYS = [
  'hours12Format',
  'hours24Format',
  'meridiemFormat',
  'minutesFormat',
  'minutesInterval',
  'secondsFormat',
  'secondsInterval',
  'showSeconds',
  'showTwentyFourHours',
  'timeSeparator',
  ...GLOBAL_OPTION_KEYS
];
const TIME_SELECT_OPTION_KEYS = [
  'maxTime',
  'maxTimeValidation',
  'minTime',
  'minTimeValidation',
  ...TIME_SELECT_SHARED_OPTION_KEYS
];
const DAY_TIME_CALENDAR_OPTION_KEYS = [
  ...DAY_CALENDAR_OPTION_KEYS,
  ...TIME_SELECT_SHARED_OPTION_KEYS
];

@Component({
  selector: 'dp-demo',
  templateUrl: './demo.component.html',
  entryComponents: [DatePickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('datePicker') datePicker: DatePickerComponent;
  @ViewChild('dateDirectivePicker') datePickerDirective: DatePickerDirective;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  pickerMode = 'daytimePicker';

  date: Moment;
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
    datePicker: new FormControl({value: this.date, disabled: this.disabled}, [
      this.required ? Validators.required : () => undefined,
      control => this.validationMinDate && this.config && moment(control.value, this.config.format)
        .isBefore(this.validationMinDate)
        ? {minDate: 'minDate Invalid'} : undefined,
      control => this.validationMaxDate && this.config && moment(control.value, this.config.format)
        .isAfter(this.validationMaxDate)
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
    timeSeparator: ':'
  };
  isAtTop: boolean = true;

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
    if (this.datePicker) {
      this.datePicker.api.open();
    }
    if (this.datePickerDirective) {
      this.datePickerDirective.api.open();
    }
  }

  closeCalendar() {
    if (this.datePicker) {
      this.datePicker.api.close();
    }
    if (this.datePickerDirective) {
      this.datePickerDirective.api.close();
    }
  }

  isValidConfig(key: string): boolean {
    switch (this.pickerMode) {
      case 'dayInline':
        return [
            ...DAY_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'monthInline':
        return [
            ...MONTH_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'timeInline':
        return [
            ...TIME_SELECT_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'daytimeInline':
        return [
            ...DAY_TIME_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'dayPicker':
        return [
            ...DAY_PICKER_OPTION_KEYS,
            ...DAY_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'dayDirective':
      case 'dayDirectiveReactive':
        return [
            ...DAY_PICKER_DIRECTIVE_OPTION_KEYS,
            ...DAY_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'monthPicker':
        return [
            ...DAY_PICKER_OPTION_KEYS,
            ...MONTH_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'monthDirective':
        return [
            ...DAY_PICKER_DIRECTIVE_OPTION_KEYS,
            ...MONTH_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'timePicker':
      case 'timeDirective':
        return [
            ...TIME_PICKER_OPTION_KEYS,
            ...TIME_SELECT_OPTION_KEYS
          ].indexOf(key) > -1;
      case 'daytimePicker':
      case 'daytimeDirective':
        return [
            ...DAY_TIME_PICKER_OPTION_KEYS,
            ...DAY_TIME_CALENDAR_OPTION_KEYS
          ].indexOf(key) > -1;
      default:
        return true;
    }
  }

  log(item) {
    console.log(item);
  }
}
