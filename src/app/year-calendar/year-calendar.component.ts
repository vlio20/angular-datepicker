import {ECalendarValue} from '../common/types/calendar-value-enum';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {IYear} from './year.model';
import {YearCalendarService} from './year-calendar.service';
import {Moment} from 'moment';
import {IYearCalendarConfig} from './year-calendar-config';
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
  selector: 'dp-year-calendar',
  templateUrl: 'year-calendar.component.html',
  styleUrls: ['year-calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    YearCalendarService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearCalendarComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => YearCalendarComponent),
      multi: true
    }
  ]
})
export class YearCalendarComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Input() config: IYearCalendarConfig;
  @Input() displayDate: Moment;
  @Input() minDate: Moment;
  @Input() maxDate: Moment;
  @HostBinding('class') @Input() theme: string;
  @Output() onSelect: EventEmitter<IYear> = new EventEmitter();
  @Output() onNavHeaderBtnClick: EventEmitter<null> = new EventEmitter();

  isInited: boolean = false;
  componentConfig: IYearCalendarConfig;
  _selected: Moment[];
  yearMatrix: IYear[][];
  currentDateView: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: (inputVal: CalendarValue) => {[key: string]: any};

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    return this._selected;
  }

  constructor(public yearCalendarService: YearCalendarService,
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
    console.log("year init");
    this.componentConfig = this.yearCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = this.displayDate
      ? this.displayDate
      : this.utilsService
        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect);
    this.yearMatrix = this.yearCalendarService.generateYear(this.currentDateView, this.selected);
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
      this.yearMatrix = this.yearCalendarService.generateYear(this.currentDateView, this.selected);
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

  isDisabledYear(year: IYear): boolean {
    return this.yearCalendarService.isYearDisabled(year, this.componentConfig);
  }

  yearClicked(year: IYear) {
    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, year, 'year');
    this.yearMatrix = this.yearCalendarService
      .generateYear(this.currentDateView, this.selected);
    this.onSelect.emit(year);
  }

  getNavLabel(): string {
    return this.yearCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
  }

  onLeftNav() {
    this.currentDateView = this.currentDateView.subtract(12, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.currentDateView, this.selected);
  }

  onLeftSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.min &&
      this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
    if (isOutsideRange) {
      navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
    }
    this.currentDateView = this.currentDateView.subtract(navigateBy, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.currentDateView, this.selected);
  }

  onRightNav() {
    this.currentDateView.add(12, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.currentDateView, this.selected);
  }

  onRightSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.max &&
      this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
    if (isOutsideRange) {
      navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
    }
    this.currentDateView.add(navigateBy, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.currentDateView, this.selected);
  }

  shouldShowLeftNav(): boolean {
    return this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
  }

  shouldShowLeftSecondaryNav(): boolean {
    return this.componentConfig.showMultipleYearsNavigation && this.shouldShowLeftNav();
  }

  shouldShowRightNav(): boolean {
    return this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
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

  getYearBtnText(year: IYear): string {
    return this.yearCalendarService.getYearBtnText(this.componentConfig, year.date);
  }

  getYearBtnCssClass(year: IYear): {[klass: string]: boolean} {
    const cssClass: {[klass: string]: boolean} = {
      'dp-selected': year.selected,
      'dp-current-year': year.currentYear
    };
    const customCssClass: string = this.yearCalendarService.getYearBtnCssClass(this.componentConfig, year.date);
    if (customCssClass) {
      cssClass[customCssClass] = true;
    }

    return cssClass;
  }
}
