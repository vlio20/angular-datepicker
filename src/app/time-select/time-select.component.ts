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
import {TimeSelectService, TimeUnit} from './time-select.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {ITimeSelectConfig} from './time-select-config.model';
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
  selector: 'dp-time-select',
  templateUrl: 'time-select.component.html',
  styleUrls: ['time-select.component.less'],
  providers: [
    TimeSelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimeSelectComponent),
      multi: true
    }
  ]
})
export class TimeSelectComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() config: ITimeSelectConfig;
  @Input() displayDate: SingleCalendarValue;
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @HostBinding('class') @Input() theme: string;

  CalendarType = ECalendarType;
  isInited: boolean = false;
  componentConfig: ITimeSelectConfig;
  _selected: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: (inputVal: CalendarValue) => {[key: string]: any};

  hours: string;
  minutes: string;
  seconds: string;
  meridiem: string;

  set selected(selected: Moment) {
    this._selected = selected;
    this.calculateTimeParts(selected);
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment {
    return this._selected;
  }

  constructor(public timeSelectService: TimeSelectService,
              public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
    this.initValidators();
  }

  init() {
    this.componentConfig = this.timeSelectService.getConfig(this.config);
    this.selected = this.selected || moment();
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
        .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
      this.inputValueType = this.utilsService
        .getInputType(this.inputValue, false);
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
      this.timeSelectService.getTimeFormat(this.componentConfig),
      [value],
      this.inputValueType
    );
  }

  initValidators() {
    this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate}, this.timeSelectService.getTimeFormat(this.componentConfig), 'day');

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  decrease(unit: TimeUnit) {
    this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
  }

  increase(unit: TimeUnit) {
    this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
  }

  toggleMeridiem() {
    this.selected = this.timeSelectService.toggleMeridiem(this.selected);
  }

  calculateTimeParts(time: Moment) {
    this.hours = this.timeSelectService.getHours(this.componentConfig, this.selected);
    this.minutes = this.timeSelectService.getMinutes(this.componentConfig, this.selected);
    this.seconds = this.timeSelectService.getSeconds(this.componentConfig, this.selected);
    this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, this.selected);
  }

  shouldShowDecrease(unit: TimeUnit): boolean {
    return this.timeSelectService.shouldShowDecrease(this.componentConfig, this.selected, unit);
  }

  shouldShowIncrease(unit: TimeUnit): boolean {
    return this.timeSelectService.shouldShowIncrease(this.componentConfig, this.selected, unit);
  }

  shouldShowToggleMeridiem(): boolean {
    return this.timeSelectService.shouldShowToggleMeridiem(this.componentConfig, this.selected);
  }
}
