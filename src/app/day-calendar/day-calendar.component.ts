import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  forwardRef,
  ElementRef,
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
import {CalendarValue, ECalendarValue} from '../common/types/calendar-value';
import {UtilsService} from '../common/services/utils/utils.service';

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
  @Input() displayDate: Moment;
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @HostBinding('class') @Input() theme: string;
  @Output() onSelect: EventEmitter<Moment[]> = new EventEmitter();

  componentConfig: IDayCalendarConfig;
  _selected: Moment[];
  weeks: IDay[][];
  weekdays: string[];
  currentDateView: Moment;
  inputValueType: ECalendarValue;
  validateFn: (FormControl, string) => {[key: string]: any};
  api = {
    moveCalendarsBy: this.moveCalendarsBy.bind(this)
  };

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
    this.onSelect.emit(this._selected);
  }

  get selected(): Moment[] {
    return this._selected;
  }

  constructor(private elemRef: ElementRef,
              private dayCalendarService: DayCalendarService,
              public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.init();
    this.initValidators();
  }

  init() {
    this.componentConfig = this.dayCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = this.displayDate || this.utilsService
        .getDefaultDisplayDate(this.currentDateView, this.selected);
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
    this.weekdays = this.dayCalendarService
      .generateWeekdays(this.componentConfig.firstDayOfWeek, this.componentConfig.weekdayNames);
  }

  ngOnChanges(changes: SimpleChanges) {
    const {minDate, maxDate, theme} = changes;
    this.init();

    if (minDate || maxDate) {
      this.initValidators();
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValueType = this.utilsService.getInputType(value);

    if (value) {
      this.selected = this.utilsService.convertToMomentArray(value, this.componentConfig.format);
      this.init();
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
    this.selected = this.dayCalendarService.updateSelected(this.componentConfig, this.selected, day);
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
  }

  getNavLabel(): string {
    return this.dayCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
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

  // api
  moveCalendarsBy(current: Moment, amount: number, granularity: moment.unitOfTime.Base = 'month') {
    const to = current.add(amount, granularity);
    this.currentDateView = to;
    this.weeks = this.dayCalendarService.generateMonthArray(this.componentConfig, to, this.selected);
  }
}
