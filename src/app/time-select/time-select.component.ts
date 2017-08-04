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
  SimpleChanges
} from '@angular/core';
import {TimeSelectService, TimeUnit} from './time-select.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {ITimeSelectConfig} from './time-select-config.model';
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
import {IDate} from '../common/models/date.model';

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
  @Input() minDate: Moment | string;
  @Input() maxDate: Moment | string;
  @Input() minTime: Moment | string;
  @Input() maxTime: Moment | string;
  @HostBinding('class') @Input() theme: string;
  @Output() onChange: EventEmitter<IDate> = new EventEmitter();

  CalendarType = ECalendarMode;
  isInited: boolean = false;
  componentConfig: ITimeSelectConfig;
  _selected: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: (inputVal: CalendarValue) => { [key: string]: any };

  hours: string;
  minutes: string;
  seconds: string;
  meridiem: string;

  set selected(selected: Moment) {
    this._selected = selected;
    this.calculateTimeParts(this.selected);
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment {
    return this._selected;
  }

  api = {
    triggerChange: this.emitChange.bind(this)
  };

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
      const {minDate, maxDate, minTime, maxTime} = changes;
      this.init();

      if (minDate || maxDate || minTime || maxTime) {
        this.initValidators();
      }
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      const momentValue = this.utilsService
        .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
      if (momentValue.isValid()) {
        this.selected = momentValue;
        this.inputValueType = this.utilsService
          .getInputType(this.inputValue, false);
      }
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
    if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
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
      {
        minDate: this.minDate,
        maxDate: this.maxDate,
        minTime: this.minTime,
        maxTime: this.maxTime
      }, undefined, 'day');

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  decrease(unit: TimeUnit) {
    this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
    this.emitChange();
  }

  increase(unit: TimeUnit) {
    this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
    this.emitChange();
  }

  toggleMeridiem() {
    this.selected = this.timeSelectService.toggleMeridiem(this.selected);
    this.emitChange();
  }

  emitChange() {
    this.onChange.emit({date: this.selected, selected: false});
  }

  calculateTimeParts(time: Moment) {
    this.hours = this.timeSelectService.getHours(this.componentConfig, time);
    this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
    this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
    this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
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
