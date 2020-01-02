import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {FormControl} from '@angular/forms';
import {ECalendarValue, IDatePickerConfig} from '../../../lib';

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
  'hideOnOutsideClick',
  'closeOnEnter'
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
  'numOfMonthRows',
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
  selector: 'dp-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.less']
})
export class ConfigFormComponent implements OnInit {

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
  readonly dateTypes: {name: string, value: ECalendarValue}[] = [
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

  localFormat: string;

  @Input() pickerMode: string;
  @Input() config: IDatePickerConfig;

  @Output() onDisplayDateChange = new EventEmitter<Moment | string>();
  @Output() onMaterialThemeChange = new EventEmitter<boolean>();
  @Output() onDisabledChange = new EventEmitter<boolean>();
  @Output() onRequireValidationChange = new EventEmitter<boolean>();
  @Output() onMinValidationChange = new EventEmitter<Moment>();
  @Output() onMaxValidationChange = new EventEmitter<Moment>();
  @Output() onMinTimeValidationChange = new EventEmitter<Moment>();
  @Output() onMaxTimeValidationChange = new EventEmitter<Moment>();
  @Output() onPlaceholderChange = new EventEmitter<string>();
  @Output() onConfigChange = new EventEmitter<Partial<IDatePickerConfig>>();

  @Output() openCalendar = new EventEmitter<void>();
  @Output() closeCalendar = new EventEmitter<void>();
  @Output() moveCalendarTo = new EventEmitter<Moment>();

  displayDate = new FormControl(null);
  material = new FormControl(true);
  disabled = new FormControl(false);
  requireValidation = new FormControl(false);
  minValidation = new FormControl();
  maxValidation = new FormControl();
  minTimeValidation = new FormControl();
  maxTimeValidation = new FormControl();
  placeholder = new FormControl('Select...');

  format: FormControl;
  locale: FormControl;
  firstDayOfWeek: FormControl;
  monthFormat: FormControl;
  min: FormControl;
  max: FormControl;
  minTime: FormControl;
  maxTime: FormControl;
  allowMultiSelect: FormControl;
  closeOnSelect: FormControl;
  closeOnSelectDelay: FormControl;
  openOnFocus: FormControl;
  openOnClick: FormControl;
  onOpenDelay: FormControl;
  weekDayFormat: FormControl;
  disableKeypress: FormControl;
  drops: FormControl;
  opens: FormControl;
  hideInputContainer: FormControl;
  showNearMonthDays: FormControl;
  showWeekNumbers: FormControl;
  enableMonthSelector: FormControl;
  yearFormat: FormControl;
  showGoToCurrent: FormControl;
  hideOnOutsideClick: FormControl;
  unSelectOnClick: FormControl;
  dayBtnFormat: FormControl;
  monthBtnFormat: FormControl;
  hours12Format: FormControl;
  hours24Format: FormControl;
  meridiemFormat: FormControl;
  minutesFormat: FormControl;
  minutesInterval: FormControl;
  secondsFormat: FormControl;
  secondsInterval: FormControl;
  showSeconds: FormControl;
  showTwentyFourHours: FormControl;
  timeSeparator: FormControl;
  showMultipleYearsNavigation: FormControl;
  multipleYearsNavigateBy: FormControl;
  returnedValueType: FormControl;
  closeOnEnter: FormControl;
  numOfMonthRows: FormControl;

  ngOnInit() {
    this.localFormat = this.getDefaultFormatByMode(this.pickerMode);

    this.format = new FormControl(this.getDefaultFormatByMode(this.pickerMode));
    this.locale = new FormControl(this.config.locale);
    this.firstDayOfWeek = new FormControl(this.config.firstDayOfWeek);
    this.monthFormat = new FormControl(this.config.monthFormat);
    this.min = new FormControl(this.config.min);
    this.max = new FormControl(this.config.max);
    this.minTime = new FormControl(this.config.minTime);
    this.maxTime = new FormControl(this.config.maxTime);
    this.allowMultiSelect = new FormControl(this.config.allowMultiSelect);
    this.closeOnSelect = new FormControl(this.config.closeOnSelect);
    this.closeOnSelectDelay = new FormControl(this.config.closeOnSelectDelay);
    this.openOnFocus = new FormControl(this.config.openOnFocus);
    this.openOnClick = new FormControl(this.config.openOnClick);
    this.onOpenDelay = new FormControl(this.config.onOpenDelay);
    this.weekDayFormat = new FormControl(this.config.weekDayFormat);
    this.disableKeypress = new FormControl(this.config.disableKeypress);
    this.drops = new FormControl(this.config.drops);
    this.opens = new FormControl(this.config.opens);
    this.hideInputContainer = new FormControl(this.config.hideInputContainer);
    this.showNearMonthDays = new FormControl(this.config.showNearMonthDays);
    this.showWeekNumbers = new FormControl(this.config.showWeekNumbers);
    this.enableMonthSelector = new FormControl(this.config.enableMonthSelector);
    this.yearFormat = new FormControl(this.config.yearFormat);
    this.showGoToCurrent = new FormControl(this.config.showGoToCurrent);
    this.hideOnOutsideClick = new FormControl(this.config.hideOnOutsideClick);
    this.unSelectOnClick = new FormControl(this.config.unSelectOnClick);
    this.dayBtnFormat = new FormControl(this.config.dayBtnFormat);
    this.monthBtnFormat = new FormControl(this.config.monthBtnFormat);
    this.hours12Format = new FormControl(this.config.hours12Format);
    this.hours24Format = new FormControl(this.config.hours24Format);
    this.meridiemFormat = new FormControl(this.config.meridiemFormat);
    this.minutesFormat = new FormControl(this.config.minutesFormat);
    this.minutesInterval = new FormControl(this.config.minutesInterval);
    this.secondsFormat = new FormControl(this.config.secondsFormat);
    this.secondsInterval = new FormControl(this.config.secondsInterval);
    this.showSeconds = new FormControl(this.config.showSeconds);
    this.showTwentyFourHours = new FormControl(this.config.showTwentyFourHours);
    this.timeSeparator = new FormControl(this.config.timeSeparator);
    this.showMultipleYearsNavigation = new FormControl(this.config.showMultipleYearsNavigation);
    this.multipleYearsNavigateBy = new FormControl(this.config.multipleYearsNavigateBy);
    this.returnedValueType = new FormControl(this.config.returnedValueType);
    this.closeOnEnter = new FormControl(this.config.closeOnEnter);
    this.numOfMonthRows = new FormControl(this.config.numOfMonthRows);
    this.initListeners();
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

  moveCalendar(): void {
    this.moveCalendarTo.emit(moment('14-01-1987', 'DD-MM-YYYY'));
  }

  private initListeners(): void {
    this.displayDate.valueChanges.subscribe((val) => {
      this.onDisplayDateChange.emit(val);
    });

    this.material.valueChanges.subscribe((val) => {
      this.onMaterialThemeChange.emit(val);
    });

    this.disabled.valueChanges.subscribe((val) => {
      this.onDisabledChange.emit(val);
    });

    this.requireValidation.valueChanges.subscribe((val) => {
      this.onRequireValidationChange.emit(val);
    });

    this.minValidation.valueChanges.subscribe((val) => {
      this.onMinValidationChange.emit(val);
    });

    this.maxValidation.valueChanges.subscribe((val) => {
      this.onMaxValidationChange.emit(val);
    });

    this.minTimeValidation.valueChanges.subscribe((val) => {
      this.onMinTimeValidationChange.emit(val);
    });

    this.maxTimeValidation.valueChanges.subscribe((val) => {
      this.onMaxTimeValidationChange.emit(val);
    });

    this.placeholder.valueChanges.subscribe((val) => {
      this.onPlaceholderChange.emit(val);
    });

    this.locale.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        locale: val
      });
    });

    this.format.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        format: val
      });
    });

    this.firstDayOfWeek.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        firstDayOfWeek: val
      });
    });

    this.monthFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        monthFormat: val
      });
    });

    this.min.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        min: val
      });
    });

    this.max.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        max: val
      });
    });

    this.minTime.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        minTime: val
      });
    });

    this.maxTime.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        maxTime: val
      });
    });

    this.allowMultiSelect.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        allowMultiSelect: val
      });
    });

    this.closeOnSelect.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        closeOnSelect: val
      });
    });

    this.closeOnSelectDelay.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        closeOnSelectDelay: val
      });
    });

    this.openOnFocus.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        openOnFocus: val
      });
    });

    this.openOnClick.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        openOnClick: val
      });
    });

    this.onOpenDelay.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        onOpenDelay: val
      });
    });

    this.weekDayFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        weekDayFormat: val
      });
    });

    this.disableKeypress.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        disableKeypress: val
      });
    });

    this.drops.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        drops: val
      });
    });

    this.opens.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        opens: val
      });
    });

    this.hideInputContainer.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        hideInputContainer: val
      });
    });

    this.showNearMonthDays.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        showNearMonthDays: val
      });
    });

    this.showWeekNumbers.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        showWeekNumbers: val
      });
    });

    this.enableMonthSelector.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        enableMonthSelector: val
      });
    });

    this.yearFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        yearFormat: val
      });
    });

    this.showGoToCurrent.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        showGoToCurrent: val
      });
    });

    this.hideOnOutsideClick.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        hideOnOutsideClick: val
      });
    });

    this.unSelectOnClick.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        unSelectOnClick: val
      });
    });

    this.dayBtnFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        dayBtnFormat: val
      });
    });

    this.monthBtnFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        monthBtnFormat: val
      });
    });

    this.hours12Format.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        hours12Format: val
      });
    });

    this.hours24Format.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        hours24Format: val
      });
    });

    this.meridiemFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        meridiemFormat: val
      });
    });

    this.minutesFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        minutesFormat: val
      });
    });

    this.minutesInterval.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        minutesInterval: val
      });
    });

    this.secondsFormat.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        secondsFormat: val
      });
    });

    this.secondsInterval.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        secondsInterval: val
      });
    });

    this.showSeconds.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        showSeconds: val
      });
    });

    this.showTwentyFourHours.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        showTwentyFourHours: val
      });
    });

    this.timeSeparator.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        timeSeparator: val
      });
    });

    this.showMultipleYearsNavigation.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        showMultipleYearsNavigation: val
      });
    });

    this.multipleYearsNavigateBy.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        multipleYearsNavigateBy: val
      });
    });

    this.returnedValueType.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        returnedValueType: val
      });
    });

    this.closeOnEnter.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        closeOnEnter: val
      });
    });

    this.numOfMonthRows.valueChanges.subscribe((val) => {
      this.onConfigChange.emit({
        numOfMonthRows: val
      });
    });
  }

  private getDefaultFormatByMode(mode: string): string {
    switch (mode) {
      case 'daytimePicker':
      case 'daytimeInline':
        return 'DD-MM-YYYY HH:mm:ss';
      case 'dayPicker':
      case 'dayInline':
      case 'dayDirective':
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
