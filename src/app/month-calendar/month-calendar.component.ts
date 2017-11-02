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
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {IMonth} from './month.model';
import {MonthCalendarService} from './month-calendar.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IMonthCalendarConfig, IMonthCalendarConfigInternal} from './month-calendar-config';
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
import {SingleCalendarValue} from '../common/types/single-calendar-value';

@Component({
  selector: 'dp-month-calendar',
  templateUrl: 'month-calendar.component.html',
  styleUrls: ['month-calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
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
  componentConfig: IMonthCalendarConfigInternal;
  _selected: Moment[];
  yearMonths: IMonth[][];
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

  api = {
    toggleCalendar: this.toggleCalendar.bind(this),
    moveCalendarTo: this.moveCalendarTo.bind(this)
  };

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get selected(): Moment[] {
    return this._selected;
  }

  set currentDateView(current: Moment) {
    this._currentDateView = current.clone();
    this.yearMonths = this.monthCalendarService
      .generateYear(this.componentConfig, this._currentDateView, this.selected);
    this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
    this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
    this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
    this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
    this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
  }

  get currentDateView(): Moment {
    return this._currentDateView;
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
      const {minDate, maxDate, config} = changes;

      this.handleConfigChange(config);
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
        .getDefaultDisplayDate(
          this.currentDateView,
          this.selected,
          this.componentConfig.allowMultiSelect,
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
      this.yearMonths = this.monthCalendarService
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
      'month'
    );

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  monthClicked(month: IMonth) {
    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
    this.yearMonths = this.monthCalendarService
      .generateYear(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(month);
  }

  onLeftNav() {
    this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
    this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
  }

  onLeftSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.min &&
      this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;

    if (isOutsideRange) {
      navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
    }

    this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
  }

  onRightNav() {
    this.currentDateView = this.currentDateView.clone().add(1, 'year');
  }

  onRightSecondaryNav() {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.max &&
      this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;

    if (isOutsideRange) {
      navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
    }

    this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
  }

  toggleCalendar() {
    this.onNavHeaderBtnClick.emit();
  }

  getMonthBtnCssClass(month: IMonth): {[klass: string]: boolean} {
    const cssClass: {[klass: string]: boolean} = {
      'dp-selected': month.selected,
      'dp-current-month': month.currentMonth
    };
    const customCssClass: string = this.monthCalendarService.getMonthBtnCssClass(this.componentConfig, month.date);

    if (customCssClass) {
      cssClass[customCssClass] = true;
    }

    return cssClass;
  }

  shouldShowCurrent(): boolean {
    return this.utilsService.shouldShowCurrent(
      this.componentConfig.showGoToCurrent,
      'month',
      this.componentConfig.min,
      this.componentConfig.max
    );
  }

  goToCurrent() {
    this.currentDateView = moment();
  }

  moveCalendarTo(to: SingleCalendarValue) {
    if (to) {
      this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
    }
  }

  handleConfigChange(config: SimpleChange) {
    if (config) {
      const prevConf: IMonthCalendarConfigInternal = this.monthCalendarService.getConfig(config.previousValue);
      const currentConf: IMonthCalendarConfigInternal = this.monthCalendarService.getConfig(config.currentValue);

      if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
        this._currentDateView = null;
      }
    }
  }
}
