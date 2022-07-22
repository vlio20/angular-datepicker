import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {ECalendarValue, IDatePickerConfig} from '../../../../projects/ng2-date-picker/src/public-api';
import dayjs, {Dayjs} from 'dayjs';

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
const DAY_CALENDAR_OPTION_KEYS = new Set([
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
]);
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
  ...DAY_TIME_PICKER_OPTION_KEYS,
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
  readonly dateTypes: { name: string, value: ECalendarValue }[] = [
    {
      name: 'Guess',
      value: null
    },
    {
      name: ECalendarValue[ECalendarValue.Dayjs],
      value: ECalendarValue.Dayjs
    },
    {
      name: ECalendarValue[ECalendarValue.DayjsArr],
      value: ECalendarValue.DayjsArr
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
  @Input() localeVal: string = 'en';

  @Output() onDisplayDateChange = new EventEmitter<Dayjs | string>();
  @Output() onMaterialThemeChange = new EventEmitter<boolean>();
  @Output() onDisabledChange = new EventEmitter<boolean>();
  @Output() onRequireValidationChange = new EventEmitter<boolean>();
  @Output() onMinValidationChange = new EventEmitter<Dayjs>();
  @Output() onMaxValidationChange = new EventEmitter<Dayjs>();
  @Output() onMinTimeValidationChange = new EventEmitter<Dayjs>();
  @Output() onMaxTimeValidationChange = new EventEmitter<Dayjs>();
  @Output() onPlaceholderChange = new EventEmitter<string>();
  @Output() onConfigChange = new EventEmitter<Partial<IDatePickerConfig>>();
  @Output() onLocaleChange = new EventEmitter<string>();

  @Output() openCalendar = new EventEmitter<void>();
  @Output() closeCalendar = new EventEmitter<void>();
  @Output() moveCalendarTo = new EventEmitter<Dayjs>();

  displayDate = new UntypedFormControl(null);
  material = new UntypedFormControl(true);
  disabled = new UntypedFormControl(false);
  requireValidation = new UntypedFormControl(false);
  minValidation = new UntypedFormControl();
  maxValidation = new UntypedFormControl();
  minTimeValidation = new UntypedFormControl();
  maxTimeValidation = new UntypedFormControl();
  placeholder = new UntypedFormControl('Select...');

  format: UntypedFormControl;
  locale: UntypedFormControl;
  firstDayOfWeek: UntypedFormControl;
  monthFormat: UntypedFormControl;
  min: UntypedFormControl;
  max: UntypedFormControl;
  minTime: UntypedFormControl;
  maxTime: UntypedFormControl;
  allowMultiSelect: UntypedFormControl;
  closeOnSelect: UntypedFormControl;
  closeOnSelectDelay: UntypedFormControl;
  openOnFocus: UntypedFormControl;
  openOnClick: UntypedFormControl;
  onOpenDelay: UntypedFormControl;
  weekDayFormat: UntypedFormControl;
  disableKeypress: UntypedFormControl;
  drops: UntypedFormControl;
  opens: UntypedFormControl;
  hideInputContainer: UntypedFormControl;
  showNearMonthDays: UntypedFormControl;
  showWeekNumbers: UntypedFormControl;
  enableMonthSelector: UntypedFormControl;
  yearFormat: UntypedFormControl;
  showGoToCurrent: UntypedFormControl;
  hideOnOutsideClick: UntypedFormControl;
  unSelectOnClick: UntypedFormControl;
  dayBtnFormat: UntypedFormControl;
  monthBtnFormat: UntypedFormControl;
  hours12Format: UntypedFormControl;
  hours24Format: UntypedFormControl;
  meridiemFormat: UntypedFormControl;
  minutesFormat: UntypedFormControl;
  minutesInterval: UntypedFormControl;
  secondsFormat: UntypedFormControl;
  secondsInterval: UntypedFormControl;
  showSeconds: UntypedFormControl;
  showTwentyFourHours: UntypedFormControl;
  timeSeparator: UntypedFormControl;
  showMultipleYearsNavigation: UntypedFormControl;
  multipleYearsNavigateBy: UntypedFormControl;
  returnedValueType: UntypedFormControl;
  closeOnEnter: UntypedFormControl;
  numOfMonthRows: UntypedFormControl;

  ngOnInit() {
    this.localFormat = ConfigFormComponent.getDefaultFormatByMode(this.pickerMode);

    this.format = new UntypedFormControl(ConfigFormComponent.getDefaultFormatByMode(this.pickerMode));
    this.locale = new UntypedFormControl(this.localeVal);
    this.firstDayOfWeek = new UntypedFormControl(this.config.firstDayOfWeek);
    this.monthFormat = new UntypedFormControl(this.config.monthFormat);
    this.min = new UntypedFormControl(this.config.min);
    this.max = new UntypedFormControl(this.config.max);
    this.minTime = new UntypedFormControl(this.config.minTime);
    this.maxTime = new UntypedFormControl(this.config.maxTime);
    this.allowMultiSelect = new UntypedFormControl(this.config.allowMultiSelect);
    this.closeOnSelect = new UntypedFormControl(this.config.closeOnSelect);
    this.closeOnSelectDelay = new UntypedFormControl(this.config.closeOnSelectDelay);
    this.openOnFocus = new UntypedFormControl(this.config.openOnFocus);
    this.openOnClick = new UntypedFormControl(this.config.openOnClick);
    this.onOpenDelay = new UntypedFormControl(this.config.onOpenDelay);
    this.weekDayFormat = new UntypedFormControl(this.config.weekDayFormat);
    this.disableKeypress = new UntypedFormControl(this.config.disableKeypress);
    this.drops = new UntypedFormControl(this.config.drops);
    this.opens = new UntypedFormControl(this.config.opens);
    this.hideInputContainer = new UntypedFormControl(this.config.hideInputContainer);
    this.showNearMonthDays = new UntypedFormControl(this.config.showNearMonthDays);
    this.showWeekNumbers = new UntypedFormControl(this.config.showWeekNumbers);
    this.enableMonthSelector = new UntypedFormControl(this.config.enableMonthSelector);
    this.yearFormat = new UntypedFormControl(this.config.yearFormat);
    this.showGoToCurrent = new UntypedFormControl(this.config.showGoToCurrent);
    this.hideOnOutsideClick = new UntypedFormControl(this.config.hideOnOutsideClick);
    this.unSelectOnClick = new UntypedFormControl(this.config.unSelectOnClick);
    this.dayBtnFormat = new UntypedFormControl(this.config.dayBtnFormat);
    this.monthBtnFormat = new UntypedFormControl(this.config.monthBtnFormat);
    this.hours12Format = new UntypedFormControl(this.config.hours12Format);
    this.hours24Format = new UntypedFormControl(this.config.hours24Format);
    this.meridiemFormat = new UntypedFormControl(this.config.meridiemFormat);
    this.minutesFormat = new UntypedFormControl(this.config.minutesFormat);
    this.minutesInterval = new UntypedFormControl(this.config.minutesInterval);
    this.secondsFormat = new UntypedFormControl(this.config.secondsFormat);
    this.secondsInterval = new UntypedFormControl(this.config.secondsInterval);
    this.showSeconds = new UntypedFormControl(this.config.showSeconds);
    this.showTwentyFourHours = new UntypedFormControl(this.config.showTwentyFourHours);
    this.timeSeparator = new UntypedFormControl(this.config.timeSeparator);
    this.showMultipleYearsNavigation = new UntypedFormControl(this.config.showMultipleYearsNavigation);
    this.multipleYearsNavigateBy = new UntypedFormControl(this.config.multipleYearsNavigateBy);
    this.returnedValueType = new UntypedFormControl(this.config.returnedValueType);
    this.closeOnEnter = new UntypedFormControl(this.config.closeOnEnter);
    this.numOfMonthRows = new UntypedFormControl(this.config.numOfMonthRows);
    this.initListeners();
  }

  isValidConfig(key: string): boolean {
    switch (this.pickerMode) {
      case 'dayInline':
        return [
          ...DAY_CALENDAR_OPTION_KEYS
        ].includes(key);
      case 'monthInline':
        return [
          ...MONTH_CALENDAR_OPTION_KEYS
        ].includes(key);
      case 'timeInline':
        return [
          ...TIME_SELECT_OPTION_KEYS
        ].includes(key);
      case 'daytimeInline':
        return [
          ...DAY_TIME_CALENDAR_OPTION_KEYS
        ].includes(key);
      case 'dayPicker':
        return [
          ...DAY_PICKER_OPTION_KEYS,
          ...DAY_CALENDAR_OPTION_KEYS
        ].includes(key);
      case 'dayDirective':
      case 'dayDirectiveReactiveMenu':
        return [
          ...DAY_PICKER_DIRECTIVE_OPTION_KEYS,
          ...DAY_CALENDAR_OPTION_KEYS
        ].includes(key);
      case 'monthPicker':
        return [
          ...DAY_PICKER_OPTION_KEYS,
          ...MONTH_CALENDAR_OPTION_KEYS
        ].includes(key);
      case 'monthDirective':
        return [
          ...DAY_PICKER_DIRECTIVE_OPTION_KEYS,
          ...MONTH_CALENDAR_OPTION_KEYS
        ].includes(key);
      case 'timePicker':
      case 'timeDirective':
        return [
          ...TIME_PICKER_OPTION_KEYS,
          ...TIME_SELECT_OPTION_KEYS
        ].includes(key);
      case 'daytime':
      case 'daytimePicker':
      case 'daytimeDirective':
        return [
          ...DAY_TIME_CALENDAR_OPTION_KEYS
        ].includes(key);
      default:
        return true;
    }
  }

  moveCalendar(): void {
    this.moveCalendarTo.emit(dayjs('14-01-1987', 'DD-MM-YYYY'));
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

    this.locale.valueChanges.subscribe((locale) => {
      this.onLocaleChange.emit(locale);
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

  private static getDefaultFormatByMode(mode: string): string {
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
