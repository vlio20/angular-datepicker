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
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {Dayjs} from 'dayjs';
import {CalendarValue} from '../common/types/calendar-value';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDate} from '../common/models/date.model';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {IDayTimeCalendarConfig, IDayTimeCalendarConfigInternal} from './day-time-calendar-config.model';
import {DayTimeCalendarService} from './day-time-calendar.service';
import {DateValidator} from '../common/types/validator.type';
import {DayCalendarComponent} from '../day-calendar/day-calendar.component';
import {INavEvent} from '../common/models/navigation-event.model';

@Component({
  selector: 'dp-day-time-calendar',
  templateUrl: 'day-time-calendar.component.html',
  styleUrls: ['day-time-calendar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
  @Input() minDate: SingleCalendarValue;
  @Input() maxDate: SingleCalendarValue;
  @HostBinding('class') @Input() theme: string;
  @Output() onChange: EventEmitter<IDate> = new EventEmitter();
  @Output() onGoToCurrent: EventEmitter<void> = new EventEmitter();
  @Output() onLeftNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightNav: EventEmitter<INavEvent> = new EventEmitter();
  @ViewChild('dayCalendar') dayCalendarRef: DayCalendarComponent;
  isInited: boolean = false;
  componentConfig: IDayTimeCalendarConfigInternal;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: DateValidator;
  api = {
    moveCalendarTo: this.moveCalendarTo.bind(this)
  };

  constructor(public dayTimeCalendarService: DayTimeCalendarService,
              public utilsService: UtilsService,
              public cd: ChangeDetectorRef) {
  }

  _selected: Dayjs;

  get selected(): Dayjs {
    return this._selected;
  }

  set selected(selected: Dayjs) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }
  ;

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
        .convertToDayjsArray(value, {
          format: this.componentConfig.format,
          allowMultiSelect: false
        })[0];
      this.inputValueType = this.utilsService
        .getInputType(this.inputValue, false);
    } else {
      this.selected = null;
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
    if (this.minDate || this.maxDate) {
      return this.validateFn(formControl.value);
    } else {
      return () => null;
    }
  }

  processOnChangeCallback(value: Dayjs): CalendarValue {
    return this.utilsService.convertFromDayjsArray(
      this.componentConfig.format,
      [value],
      this.componentConfig.returnedValueType || this.inputValueType
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
    this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date, this.componentConfig);
    this.emitChange();
  }

  timeChange(time: IDate) {
    this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
    this.emitChange();
  }

  emitChange() {
    this.onChange.emit({date: this.selected, selected: false});
  }

  moveCalendarTo(to: SingleCalendarValue) {
    if (to) {
      this.dayCalendarRef.moveCalendarTo(to);
    }
  }

  onLeftNavClick(change: INavEvent) {
    this.onLeftNav.emit(change);
  }

  onRightNavClick(change: INavEvent) {
    this.onRightNav.emit(change);
  }
}
