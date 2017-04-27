import {ECalendarValue} from '../common/types/calendar-value-enum';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {ECalendarType} from '../common/types/calendar-type-enum';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  forwardRef,
  HostBinding
} from '@angular/core';
import {DayCalendarService} from './day-calendar.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IDayCalendarConfig} from './day-calendar-config.model';
import {IDay} from './day.model';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  ValidationErrors,
  FormControl
} from '@angular/forms';
import {CalendarValue} from '../common/types/calendar-value';
import {UtilsService} from '../common/services/utils/utils.service';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {IMonth} from '../month-calendar/month.model';

@Component({
  selector: 'dp-day-calendar',
  templateUrl: 'day-calendar.component.html',
  styleUrls: ['day-calendar.component.less'],
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
  @Output() onNavHeaderBtnClick: EventEmitter<ECalendarType> = new EventEmitter();

  CalendarType = ECalendarType;
  isInited: boolean = false;
  componentConfig: IDayCalendarConfig;
  _selected: Moment[];
  weeks: IDay[][];
  weekdays: string[];
  currentDateView: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: (FormControl, string) => {[key: string]: any};
  currentCalendarType: ECalendarType = ECalendarType.Day;
  monthCalendarConfig: IMonthCalendarConfig;

  api = {
    moveCalendarsBy: this.moveCalendarsBy.bind(this),
    toggleCalendar: this.toggleCalendar.bind(this)
  };

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    return this._selected;
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
        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect);
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
    this.weekdays = this.dayCalendarService
      .generateWeekdays(this.componentConfig.firstDayOfWeek, this.componentConfig.weekdayNames);
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isInited) {
      const {minDate, maxDate} = changes;
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
      this.weeks = this.dayCalendarService
        .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
      this.inputValueType = this.utilsService
        .getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    }
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
      return this.validateFn(formControl, this.componentConfig.format);
    } else {
      return () => null;
    }
  }

  processOnChangeCallback(value: Moment[]): CalendarValue {
    return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.inputValueType);
  }

  initValidators() {
    this.validateFn = this.dayCalendarService.createValidator({
      minDate: this.utilsService.convertToMoment(this.minDate, this.componentConfig.format),
      maxDate: this.utilsService.convertToMoment(this.maxDate, this.componentConfig.format)
    }, this.componentConfig.format);

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  isDisabledDay(day: IDay) {
    return this.dayCalendarService.isDateDisabled(day, this.componentConfig);
  }

  dayClicked(day: IDay) {
    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(day);
  }

  getNavLabel(): string {
    return this.dayCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
  }

  getDayBtnText(day: IDay): string {
    return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
  }

  onLeftNav() {
    this.currentDateView.subtract(1, 'month');
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
  }

  onRightNav() {
    this.currentDateView.add(1, 'month');
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
  }

  shouldShowLeftNav(): boolean {
    return this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
  }

  shouldShowRightNav(): boolean {
    return this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
  }

  isNavHeaderBtnClickable(): boolean {
    return this.componentConfig.enableMonthSelector;
  }

  toggleCalendar(type: ECalendarType) {
    if (this.currentCalendarType !== type) {
      this.currentCalendarType = type;
      this.onNavHeaderBtnClick.emit(type);
    }
  }

  monthSelected(month: IMonth) {
    this.currentDateView = month.date.clone();
    this.currentCalendarType = ECalendarType.Day;
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
  }

  moveCalendarsBy(current: Moment, amount: number, granularity: moment.unitOfTime.Base = 'month') {
    const to = current.add(amount, granularity);
    this.currentDateView = to;
    this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, to, this.selected);
  }
}
