import {ECalendarValue} from '../common/types/calendar-value-enum';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {Moment} from 'moment';
import {CalendarValue} from '../common/types/calendar-value';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDate} from '../common/models/date.model';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {IDayTimeCalendarConfig} from './day-time-calendar-config.model';
import {DayTimeCalendarService} from './day-time-calendar.service';

@Component({
  selector: 'dp-day-time-calendar',
  templateUrl: 'day-time-calendar.component.html',
  styleUrls: ['day-time-calendar.component.less'],
  providers: [
    DayTimeCalendarService,
    DayCalendarService,
    TimeSelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DayTimeCalendarComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DayTimeCalendarComponent),
      multi: true
    }
  ]
})
export class DayTimeCalendarComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() config: IDayTimeCalendarConfig;
  @Input() displayDate: SingleCalendarValue;
  @Input() minDate: Moment | string;
  @Input() maxDate: Moment | string;
  @HostBinding('class') @Input() theme: string;
  @Output() onChange: EventEmitter<IDate> = new EventEmitter();

  isInited: boolean = false;
  componentConfig: IDayTimeCalendarConfig;
  _selected: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: (inputVal: CalendarValue) => { [key: string]: any };

  set selected(selected: Moment) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment {
    return this._selected;
  }

  constructor(public dayTimeCalendarService: DayTimeCalendarService,
              public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
    this.initValidators();
  }

  init() {
    this.componentConfig = this.dayTimeCalendarService.getConfig(this.config);
    this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
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
        .convertToMomentArray(value, this.componentConfig.format, false)[0];
      this.inputValueType = this.utilsService
        .getInputType(this.inputValue, false);
    } else {
      this.selected = null;
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
      return this.validateFn(formControl.value);
    } else {
      return () => null;
    }
  }

  processOnChangeCallback(value: Moment): CalendarValue {
    return this.utilsService.convertFromMomentArray(
      this.componentConfig.format,
      [value],
      this.inputValueType
    );
  }

  initValidators() {
    this.validateFn = this.utilsService.createValidator(
      {
        minDate: this.minDate,
        maxDate: this.maxDate
      }, undefined, 'daytime');

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  dateSelected(day: IDate) {
    this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date);
    this.emitChange();
  }

  timeChange(time: IDate) {
    this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
    this.emitChange();
  }

  emitChange() {
    this.onChange.emit({date: this.selected, selected: false});
  }
}
