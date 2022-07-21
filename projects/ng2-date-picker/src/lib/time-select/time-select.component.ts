import {ECalendarValue} from '../common/types/calendar-value-enum';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {TimeSelectService, TimeUnit} from './time-select.service';

import {ITimeSelectConfig, ITimeSelectConfigInternal} from './time-select-config.model';
import {
  ControlValueAccessor,
  UntypedFormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {CalendarValue} from '../common/types/calendar-value';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDate} from '../common/models/date.model';
import {DateValidator} from '../common/types/validator.type';
import {IDayCalendarConfigInternal} from '../day-calendar/day-calendar-config.model';
import {Dayjs} from 'dayjs';
import {dayjsRef} from '../common/dayjs/dayjs.ref';

@Component({
  selector: 'dp-time-select',
  templateUrl: 'time-select.component.html',
  styleUrls: ['time-select.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() minDate: SingleCalendarValue;
  @Input() maxDate: SingleCalendarValue;
  @Input() minTime: SingleCalendarValue;
  @Input() maxTime: SingleCalendarValue;
  @HostBinding('class') @Input() theme: string;
  @Output() onChange: EventEmitter<IDate> = new EventEmitter();
  isInited: boolean = false;
  componentConfig: ITimeSelectConfigInternal;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: DateValidator;
  hours: string;
  minutes: string;
  seconds: string;
  meridiem: string;
  showDecHour: boolean;
  showDecMinute: boolean;
  showDecSecond: boolean;
  showIncHour: boolean;
  showIncMinute: boolean;
  showIncSecond: boolean;
  showToggleMeridiem: boolean;
  api = {
    triggerChange: this.emitChange.bind(this)
  };

  constructor(public readonly timeSelectService: TimeSelectService,
              public readonly utilsService: UtilsService,
              public readonly cd: ChangeDetectorRef) {
  }

  _selected: Dayjs;

  get selected(): Dayjs {
    return this._selected;
  }

  set selected(selected: Dayjs) {
    this._selected = selected;
    this.calculateTimeParts(this.selected);

    this.showDecHour = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'hour');
    this.showDecMinute = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'minute');
    this.showDecSecond = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'second');

    this.showIncHour = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'hour');
    this.showIncMinute = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'minute');
    this.showIncSecond = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'second');

    this.showToggleMeridiem = this.timeSelectService.shouldShowToggleMeridiem(this.componentConfig, this._selected);

    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
    this.initValidators();
  }

  init(): void {
    this.componentConfig = this.timeSelectService.getConfig(this.config);
    this.selected = this.selected || dayjsRef();
    this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInited) {
      const {minDate, maxDate, minTime, maxTime} = changes;

      if (minDate || maxDate || minTime || maxTime) {
        this.initValidators();
      }

      this.init();
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      const dayjsValue = this.utilsService
        .convertToDayjsArray(value, {
          allowMultiSelect: false,
          format: this.timeSelectService.getTimeFormat(this.componentConfig)
        })[0];
      if (dayjsValue.isValid()) {
        this.selected = dayjsValue;
        this.inputValueType = this.utilsService
          .getInputType(this.inputValue, false);
      }
    }

    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  onChangeCallback(_: any) {
  }

  registerOnTouched(fn: any): void {
  }

  validate(formControl: UntypedFormControl): ValidationErrors | any {
    if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
      return this.validateFn(formControl.value);
    } else {
      return () => null;
    }
  }

  processOnChangeCallback(value: Dayjs): CalendarValue {
    return this.utilsService.convertFromDayjsArray(
      this.timeSelectService.getTimeFormat(this.componentConfig),
      [value],
      this.componentConfig.returnedValueType || this.inputValueType
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

  toggleMeridiem(): void {
    this.selected = this.timeSelectService.toggleMeridiem(this.selected);
    this.emitChange();
  }

  emitChange(): void {
    this.onChange.emit({date: this.selected, selected: false});
    this.cd.markForCheck();
  }

  calculateTimeParts(time: Dayjs): void {
    this.hours = this.timeSelectService.getHours(this.componentConfig, time);
    this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
    this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
    this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
  }

  private handleConfigChange(config: SimpleChange): void {
    if (config) {
      const prevConf: IDayCalendarConfigInternal = this.timeSelectService.getConfig(config.previousValue);
      const currentConf: IDayCalendarConfigInternal = this.timeSelectService.getConfig(config.currentValue);
    }
  }
}
