import {ECalendarValue} from '../common/types/calendar-value-enum';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {ECalendarMode} from '../common/types/calendar-mode-enum';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {DayCalendarService} from './day-calendar.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IDayCalendarConfig, IDayCalendarConfigInternal} from './day-calendar-config.model';
import {IDay} from './day.model';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {CalendarValue} from '../common/types/calendar-value';
import {UtilsService} from '../common/services/utils/utils.service';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {IMonth} from '../month-calendar/month.model';
import {DateValidator} from '../common/types/validator.type';

@Component({
  selector: 'dp-day-calendar',
  templateUrl: 'day-calendar.component.html',
  styleUrls: ['day-calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DayCalendarService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DayCalendarComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DayCalendarComponent),
      multi: true
    }
  ]
})
export class DayCalendarComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() config: IDayCalendarConfig;
  @Input() displayDate: SingleCalendarValue;
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @HostBinding('class') @Input() theme: string;

  @Output() onSelect: EventEmitter<IDay> = new EventEmitter();
  @Output() onMonthSelect: EventEmitter<IMonth> = new EventEmitter();
  @Output() onNavHeaderBtnClick: EventEmitter<ECalendarMode> = new EventEmitter();

  CalendarMode = ECalendarMode;
  isInited: boolean = false;
  componentConfig: IDayCalendarConfigInternal;
  _selected: Moment[];
  weeks: IDay[][];
  weekdays: Moment[];
  _currentDateView: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: DateValidator;
  currentCalendarMode: ECalendarMode = ECalendarMode.Day;
  monthCalendarConfig: IMonthCalendarConfig;
  _shouldShowCurrent: boolean = true;
  navLabel: string;
  showLeftNav: boolean;
  showRightNav: boolean;

  api = {
    moveCalendarsBy: this.moveCalendarsBy.bind(this),
    toggleCalendar: this.toggleCalendar.bind(this),
    moveCalendarTo: this.moveCalendarTo.bind(this)
  };

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    return this._selected;
  }

  set currentDateView(current: Moment) {
    this._currentDateView = current.clone();
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
    this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
    this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
    this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
  }

  get currentDateView(): Moment {
    return this._currentDateView;
  }

  constructor(public dayCalendarService: DayCalendarService,
              public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
    this.initValidators();
  }

  init() {
    this.componentConfig = this.dayCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = this.displayDate
      ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
      : this.utilsService
        .getDefaultDisplayDate(
          this.currentDateView,
          this.selected,
          this.componentConfig.allowMultiSelect,
          this.componentConfig.min
        );
    this.weekdays = this.dayCalendarService
      .generateWeekdays(this.componentConfig.firstDayOfWeek);
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
    this._shouldShowCurrent = this.shouldShowCurrent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isInited) {
      const {minDate, maxDate, config} = changes;

      this.handleConfigChange(config);
      this.init();

      if (minDate || maxDate) {
        this.initValidators();
      }
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
      this.inputValueType = this.utilsService
        .getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    } else {
      this.selected = [];
    }

    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  onChangeCallback(_: any) {
  };

  registerOnTouched(fn: any): void {
  }

  validate(formControl: FormControl): ValidationErrors | any {
    if (this.minDate || this.maxDate) {
      return this.validateFn(formControl.value);
    } else {
      return () => null;
    }
  }

  processOnChangeCallback(value: Moment[]): CalendarValue {
    return this.utilsService.convertFromMomentArray(
      this.componentConfig.format,
      value,
      this.componentConfig.returnedValueType || this.inputValueType
    );
  }

  initValidators() {
    this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate},
      this.componentConfig.format,
      'day'
    );

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  dayClicked(day: IDay) {
    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(day);
  }

  getDayBtnText(day: IDay): string {
    return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
  }

  getDayBtnCssClass(day: IDay): {[klass: string]: boolean} {
    const cssClasses: {[klass: string]: boolean} = {
      'dp-selected': day.selected,
      'dp-current-month': day.currentMonth,
      'dp-prev-month': day.prevMonth,
      'dp-next-month': day.nextMonth,
      'dp-current-day': day.currentDay
    };
    const customCssClass: string = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
    if (customCssClass) {
      cssClasses[customCssClass] = true;
    }

    return cssClasses;
  }

  onLeftNav() {
    this.moveCalendarsBy(this.currentDateView, -1, 'month');
  }

  onRightNav() {
    this.moveCalendarsBy(this.currentDateView, 1, 'month');
  }

  getWeekdayName(weekday: Moment): string {
    if (this.componentConfig.weekDayFormatter) {
      return this.componentConfig.weekDayFormatter(weekday.day());
    }

    return weekday.format(this.componentConfig.weekDayFormat);
  }

  toggleCalendar(mode: ECalendarMode) {
    if (this.currentCalendarMode !== mode) {
      this.currentCalendarMode = mode;
      this.onNavHeaderBtnClick.emit(mode);
    }
  }

  monthSelected(month: IMonth) {
    this.currentDateView = month.date.clone();
    this.currentCalendarMode = ECalendarMode.Day;
    this.onMonthSelect.emit(month);
  }

  moveCalendarsBy(current: Moment, amount: number, granularity: moment.unitOfTime.Base = 'month') {
    this.currentDateView = current.clone().add(amount, granularity);
  }

  moveCalendarTo(to: SingleCalendarValue) {
    if (to) {
      this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
    }
  }

  shouldShowCurrent(): boolean {
    return this.utilsService.shouldShowCurrent(
      this.componentConfig.showGoToCurrent,
      'day',
      this.componentConfig.min,
      this.componentConfig.max
    );
  }

  goToCurrent() {
    this.currentDateView = moment();
  }

  handleConfigChange(config: SimpleChange) {
    if (config) {
      const prevConf: IDayCalendarConfigInternal = this.dayCalendarService.getConfig(config.previousValue);
      const currentConf: IDayCalendarConfigInternal = this.dayCalendarService.getConfig(config.currentValue);

      if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
        this._currentDateView = null;
      }
    }
  }
}
