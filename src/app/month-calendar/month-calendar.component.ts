import {ECalendarValue} from '../common/types/calendar-value-enum';
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
import {IMonth} from './month.model';
import {MonthCalendarService} from './month-calendar.service';
import {Moment} from 'moment';
import {IMonthCalendarConfig} from './month-calendar-config';
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

@Component({
  selector: 'dp-month-calendar',
  templateUrl: 'month-calendar.component.html',
  styleUrls: ['month-calendar.component.less'],
  providers: [
    MonthCalendarService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthCalendarComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MonthCalendarComponent),
      multi: true
    }
  ]
})
export class MonthCalendarComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Input() config: IMonthCalendarConfig;
  @Input() displayDate: Moment;
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @HostBinding('class') @Input() theme: string;
  @Output() onSelect: EventEmitter<IMonth> = new EventEmitter();
  @Output() onNavHeaderBtnClick: EventEmitter<null> = new EventEmitter();

  isInited: boolean = false;
  componentConfig: IMonthCalendarConfig;
  _selected: Moment[];
  yearMonths: IMonth[][];
  currentDateView: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: (inputVal: CalendarValue) => { [key: string]: any };

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    return this._selected;
  }

  constructor(public monthCalendarService: MonthCalendarService,
              public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
    this.initValidators();
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

  init() {
    this.componentConfig = this.monthCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = this.displayDate
      ? this.displayDate
      : this.utilsService
        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect);
    this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
      this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
      this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
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

  processOnChangeCallback(value: Moment[]): CalendarValue {
    return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.inputValueType);
  }

  initValidators() {
    this.validateFn = this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate}, this.componentConfig.format, 'month');

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  isDisabledMonth(month: IMonth): boolean {
    return this.monthCalendarService.isMonthDisabled(month, this.componentConfig);
  }

  monthClicked(month: IMonth) {
    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
    this.yearMonths = this.monthCalendarService
      .generateYear(this.currentDateView, this.selected);
    this.onSelect.emit(month);
  }

  getNavLabel(): string {
    return this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
  }

  onLeftNav() {
    this.currentDateView = this.currentDateView.subtract(1, 'year');
    this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
  }

  onLeftSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.min &&
                         this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
    if (isOutsideRange) {
      navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
    }
    this.currentDateView = this.currentDateView.subtract(navigateBy, 'year');
    this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
  }

  onRightNav() {
    this.currentDateView.add(1, 'year');
    this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
  }

  onRightSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.max &&
                         this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
    if (isOutsideRange) {
      navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
    }
    this.currentDateView.add(navigateBy, 'year');
    this.yearMonths = this.monthCalendarService.generateYear(this.currentDateView, this.selected);
  }

  shouldShowLeftNav(): boolean {
    return this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
  }

  shouldShowLeftSecondaryNav(): boolean {
    return this.componentConfig.showMultipleYearsNavigation && this.shouldShowLeftNav();
  }

  shouldShowRightNav(): boolean {
    return this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
  }

  shouldShowRightSecondaryNav(): boolean {
    return this.componentConfig.showMultipleYearsNavigation && this.shouldShowRightNav();
  }

  isNavHeaderBtnClickable(): boolean {
    return this.componentConfig.isNavHeaderBtnClickable;
  }

  toggleCalendar() {
    this.onNavHeaderBtnClick.emit();
  }

  getMonthBtnText(month: IMonth): string {
    return this.monthCalendarService.getMonthBtnText(this.componentConfig, month.date);
  }
}
