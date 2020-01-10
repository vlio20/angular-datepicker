import debounce from '../../lib/common/decorators/decorators';
import {IDatePickerConfig} from '../../lib/date-picker/date-picker-config.model';
import {DatePickerComponent} from '../../lib/date-picker/date-picker.component';
import {DatePickerDirective} from '../../lib/date-picker/date-picker.directive';
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as momentNs from 'moment';
import {Moment} from 'moment';
import {GaService} from '../services/ga/ga.service';
import {ECalendarValue} from '../../lib/common/types/calendar-value-enum';
import {INavEvent} from '../../lib/common/models/navigation-event.model';
import {ISelectionEvent} from '../../lib/common/types/selection-event.model';

const moment = momentNs;

const GLOBAL_OPTION_KEYS = [
  'theme',
  'locale',
  'returnedValueType',
  'displayDate'
];
const PICKER_OPTION_KEYS = [
  'apiclose',
  'apiopen',
  'appendTo',
  'disabled',
  'disableKeypress',
  'drops',
  'format',
  'openOnFocus',
  'openOnClick',
  'onOpenDelay',
  'opens',
  'placeholder',
  'required',
  'hideInputContainer',
  'hideOnOutsideClick'
];
const DAY_PICKER_DIRECTIVE_OPTION_KEYS = [
  'allowMultiSelect',
  'closeOnSelect',
  'closeOnSelectDelay',
  'showGoToCurrent',
  'moveCalendarTo',
  ...PICKER_OPTION_KEYS
];
const DAY_PICKER_OPTION_KEYS = [
  ...DAY_PICKER_DIRECTIVE_OPTION_KEYS
];
const DAY_TIME_PICKER_OPTION_KEYS = [
  'moveCalendarTo',
  ...PICKER_OPTION_KEYS
];
const TIME_PICKER_OPTION_KEYS = [
  ...PICKER_OPTION_KEYS
];
const MONTH_CALENDAR_OPTION_KEYS = [
  'minValidation',
  'maxValidation',
  'required',
  'max',
  'min',
  'monthBtnFormat',
  'multipleYearsNavigateBy',
  'showMultipleYearsNavigation',
  'yearFormat',
  'showGoToCurrent',
  'unSelectOnClick',
  'moveCalendarTo',
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
  'weekdayFormat',
  'showGoToCurrent',
  'unSelectOnClick',
  'moveCalendarTo',
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
export class DemoComponent implements OnInit {
  showDemo: boolean = true;
  @ViewChild('dateComponent', {static: false}) dateComponent: DatePickerComponent;
  @ViewChild('donateForm', {static: false}) donateForm: any;
  @ViewChild('dateDirectivePicker', {static: false}) datePickerDirective: DatePickerDirective;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  readonly LANGS = [
    'en', 'af', 'ar-dz', 'ar-kw', 'ar-ly',
    'ar-ma', 'ar-sa', 'ar-tn', 'ar', 'az', 'be', 'bg', 'bn', 'bo',
    'br', 'bs', 'ca', 'cs', 'cv', 'cy', 'da', 'de-at', 'de-ch',
    'de', 'dv', 'el', 'en-au', 'en-ca', 'en-gb', 'en-ie', 'en-nz',
    'eo', 'es-do', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr-ca',
    'fr-ch', 'fr', 'fy', 'gd', 'gl', 'gom-latn', 'he', 'hi', 'hr',
    'hu', 'hy-am', 'id', 'is', 'it', 'ja', 'jv', 'ka', 'kk', 'km', 'kn',
    'ko', 'ky', 'lb', 'lo', 'lt', 'lv', 'me', 'mi', 'mk', 'ml', 'mr', 'ms-my',
    'ms', 'my', 'nb', 'ne', 'nl-be', 'nl', 'nn', 'pa-in', 'pl', 'pt-br',
    'pt', 'ro', 'ru', 'sd', 'se', 'si', 'sk', 'sl', 'sq', 'sr-cyrl', 'sr',
    'ss', 'sv', 'sw', 'ta', 'te', 'tet', 'th', 'tl-ph', 'tlh', 'tr', 'tzl',
    'tzm-latn', 'tzm', 'uk', 'ur', 'uz-latn', 'uz', 'vi', 'x-pseudo', 'yo', 'zh-cn', 'zh-hk', 'zh-tw'
  ];
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
  displayDate: Moment | string;
  dateTypes: {name: string, value: ECalendarValue}[] = [
    {
      name: 'Guess',
      value: null
    },
    {
      name: ECalendarValue[ECalendarValue.Moment],
      value: ECalendarValue.Moment
    },
    {
      name: ECalendarValue[ECalendarValue.MomentArr],
      value: ECalendarValue.MomentArr
    },
    {
      name: ECalendarValue[ECalendarValue.String],
      value: ECalendarValue.String
    },
    {
      name: ECalendarValue[ECalendarValue.StringArr],
      value: ECalendarValue.StringArr
    }
  ];
  config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    openOnFocus: true,
    openOnClick: true,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
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
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    locale: moment.locale(),
    hideInputContainer: false,
    returnedValueType: ECalendarValue.String,
    unSelectOnClick: true,
    hideOnOutsideClick: true
  };

  formGroup: FormGroup ;
  isAtTop: boolean = true;

  constructor(private readonly gaService: GaService) {
  }

  ngOnInit(): void {
    this.formGroup = this.buildForm();
  }

  @HostListener('document:scroll')
  @debounce(100)
  updateIsAtTop() {
    this.isAtTop = document.body.scrollTop === 0;
  }

  modeChanged(mode) {
    this.pickerMode = mode;
    this.config.hideInputContainer = false;
    this.config.inputElementContainer = undefined;
    this.formGroup = this.buildForm();
    this.formGroup.get('datePicker').setValue(this.date);

    this.gaService.emitEvent('Navigation', mode);
  }

  validatorsChanged() {
    this.formGroup.get('datePicker').updateValueAndValidity();
  }

  refreshDemo() {
    this.showDemo = false;
    setTimeout(() => {
      this.showDemo = true;
    });
  }

  configChanged(change: string = 'N/A', value: any = 'N/A') {
    this.config = {...this.config};

    this.gaService.emitEvent('ConfigChange', change, value);

    if (change === 'locale') {
      this.refreshDemo();
    }
  };

  openCalendar() {
    if (this.dateComponent) {
      this.dateComponent.api.open();
    } else if (this.datePickerDirective) {
      this.datePickerDirective.api.open();
    }
  }

  closeCalendar() {
    if (this.dateComponent) {
      this.dateComponent.api.close();
    } else if (this.datePickerDirective) {
      this.datePickerDirective.api.close();
    }
  }

  opened() {
    console.log('opened');
  }

  closed() {
    console.log('closed');
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
      case 'dayDirectiveReactiveMenu':
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
    // console.log(item);
  }

  onLeftNav(change: INavEvent) {
    console.log('left nav', change);
  }

  onRightNav(change: INavEvent) {
    console.log('right nav', change);
  }

  moveCalendarTo() {
    this.dateComponent.api.moveCalendarTo(moment('14-01-1987', this.demoFormat));
  }

  donateClicked() {
    this.gaService.emitEvent('donate', 'clicked');
    this.donateForm.nativeElement.submit();
  }

  onSelect(data: ISelectionEvent) {
    console.log(data);
  }

  trackFiver(): void {
    this.gaService.emitEvent('fiverr', 'clicked');
  }

  toggleDisabled(disabled: boolean) {
    disabled ? this.formGroup.disable() : this.formGroup.enable()
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      datePicker: new FormControl({value: this.date, disabled: this.disabled}, [
        this.required ? Validators.required : () => undefined,
        (control) => {
          return this.validationMinDate && this.config &&
          moment(control.value, this.config.format || this.getDefaultFormatByMode(this.pickerMode))
            .isBefore(this.validationMinDate)
            ? {minDate: 'minDate Invalid'} : undefined
        },
        control => this.validationMaxDate && this.config &&
        moment(control.value, this.config.format || this.getDefaultFormatByMode(this.pickerMode))
          .isAfter(this.validationMaxDate)
          ? {maxDate: 'maxDate Invalid'} : undefined
      ])
    });
  }

  private getDefaultFormatByMode(mode: string): string {
    switch (mode) {
      case 'daytimePicker':
      case 'daytimeInline':
      case 'daytimeDirective':
        return 'DD-MM-YYYY HH:mm:ss';
      case 'dayPicker':
      case 'dayInline':
      case 'dayDirective':
      case 'dayDirectiveReactiveMenu':
        return 'DD-MM-YYYY';
      case 'monthPicker':
      case 'monthInline':
      case 'monthDirective':
        return 'MMM, YYYY';
      case 'timePicker':
      case 'timeInline':
      case 'timeDirective':
        return 'HH:mm:ss';
    }
  }
}
