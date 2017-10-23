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
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {IYear} from './year.model';
import {YearCalendarService} from './year-calendar.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IYearCalendarConfig, IYearCalendarConfigInternal} from './year-calendar-config';
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
import {DateValidator} from '../common/types/validator.type';

@Component({
  selector: 'dp-year-calendar',
  templateUrl: 'year-calendar.component.html',
  styleUrls: ['year-calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
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
  componentConfig: IYearCalendarConfigInternal;
  _selected: Moment[];
  yearMatrix: IYear[][];
  _currentDateView: Moment;
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: DateValidator;
  _shouldShowCurrent: boolean = true;
  navLabel: string;
  showLeftNav: boolean;
  showRightNav: boolean;
  showSecondaryLeftNav: boolean;
  showSecondaryRightNav: boolean;

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    return this._selected;
  }

  set currentDateView(current: Moment) {
    this._currentDateView = current.clone();
    this.yearMatrix = this.yearCalendarService
      .generateYear(this.componentConfig, this._currentDateView, this.selected);
    this.navLabel = this.yearCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
    this.showLeftNav = this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
    this.showRightNav = this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
    this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
    this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
  }

  get currentDateView(): Moment {
    return this._currentDateView;
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
    this.componentConfig = this.yearCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = this.displayDate
      ? this.displayDate
      : this.utilsService
        .getDefaultDisplayDate(
          this.currentDateView,
          this.selected,
          this.componentConfig.allowMultiSelect
          this.componentConfig.min
        );
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    this._shouldShowCurrent = this.shouldShowCurrent();
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
      this.yearMatrix = this.yearCalendarService
        .generateYear(this.componentConfig, this.currentDateView, this.selected);
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
    return this.utilsService.convertFromMomentArray(
      this.componentConfig.format,
      value,
      this.componentConfig.returnedValueType || this.inputValueType
    );
  }

  initValidators() {
    this.validateFn = this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate},
      this.componentConfig.format,
      'year');

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  yearClicked(year: IYear) {
    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, year, 'year');
    this.yearMatrix = this.yearCalendarService
      .generateYear(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(year);
  }

  onLeftNav() {
    this.currentDateView = this.currentDateView.clone().subtract(12, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
  }

  onLeftSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.min &&
      this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;

    if (isOutsideRange) {
      navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
    }
    this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);  // remove?
  }

  onRightNav() {
    this.currentDateView = this.currentDateView.clone().add(12, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);  // remove?
  }

  onRightSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.max &&
      this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;

    if (isOutsideRange) {
      navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
    }
    this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
    this.yearMatrix = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);  // remove?
  }

  toggleCalendar() {
    this.onNavHeaderBtnClick.emit();
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

  shouldShowCurrent(): boolean {
    return this.utilsService.shouldShowCurrent(
      this.componentConfig.showGoToCurrent,
      'year',
      this.componentConfig.min,
      this.componentConfig.max
    );
  }

  goToCurrent() {
    this.currentDateView = moment();
  }
}
