import {ECalendarValue} from '../common/types/calendar-value-enum';
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
import {IMonth} from './month.model';
import {MonthCalendarService} from './month-calendar.service';

import {IMonthCalendarConfig, IMonthCalendarConfigInternal} from './month-calendar-config';
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
import {DateValidator} from '../common/types/validator.type';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {INavEvent} from '../common/models/navigation-event.model';
import {Dayjs} from 'dayjs';
import {dayjsRef} from '../common/dayjs/dayjs.ref';

@Component({
  selector: 'dp-month-calendar',
  templateUrl: 'month-calendar.component.html',
  styleUrls: ['month-calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() displayDate: Dayjs | string;
  @Input() minDate: Dayjs;
  @Input() maxDate: Dayjs;
  @HostBinding('class') @Input() theme: string;
  @Output() onSelect: EventEmitter<IMonth> = new EventEmitter();
  @Output() onNavHeaderBtnClick: EventEmitter<null> = new EventEmitter();
  @Output() onGoToCurrent: EventEmitter<void> = new EventEmitter();
  @Output() onLeftNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onLeftSecondaryNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightSecondaryNav: EventEmitter<INavEvent> = new EventEmitter();
  isInited: boolean = false;
  componentConfig: IMonthCalendarConfigInternal;
  yearMonths: IMonth[][];
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
    toggleCalendar: this.toggleCalendarMode.bind(this),
    moveCalendarTo: this.moveCalendarTo.bind(this)
  };

  constructor(public readonly monthCalendarService: MonthCalendarService,
              public readonly utilsService: UtilsService,
              public readonly cd: ChangeDetectorRef) {
  }

  _selected: Dayjs[];

  get selected(): Dayjs[] {
    return this._selected;
  }

  set selected(selected: Dayjs[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  _currentDateView: Dayjs;

  get currentDateView(): Dayjs {
    return this._currentDateView;
  }

  set currentDateView(current: Dayjs) {
    this._currentDateView = dayjsRef(current.toDate());
    this.yearMonths = this.monthCalendarService
      .generateYear(this.componentConfig, this._currentDateView, this.selected);
    this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
    this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
    this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
    this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
    this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
  }

  ngOnInit(): void {
    this.isInited = true;
    this.init();
    this.initValidators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInited) {
      const {minDate, maxDate, config} = changes;

      this.handleConfigChange(config);
      this.init();

      if (minDate || maxDate) {
        this.initValidators();
      }
      this.cd.markForCheck()
    }
  }

  init(): void {
    this.componentConfig = this.monthCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = (this.displayDate as Dayjs) ?? this.utilsService
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
        .convertToDayjsArray(value, this.componentConfig);
      this.yearMonths = this.monthCalendarService
        .generateYear(this.componentConfig, this.currentDateView, this.selected);
      this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    } else {
      this.selected = [];
      this.yearMonths = this.monthCalendarService
        .generateYear(this.componentConfig, this.currentDateView, this.selected);
    }

    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  onChangeCallback(_: any): void {
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

  processOnChangeCallback(value: Dayjs[]): CalendarValue {
    return this.utilsService.convertFromDayjsArray(
      this.componentConfig.format,
      value,
      this.componentConfig.returnedValueType || this.inputValueType
    );
  }

  initValidators(): void {
    this.validateFn = this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate},
      this.componentConfig.format,
      'month'
    );

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  monthClicked(month: IMonth): void {
    if (month.selected && !this.componentConfig.unSelectOnClick) {
      return;
    }

    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
    this.yearMonths = this.monthCalendarService
      .generateYear(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(month);
  }

  onLeftNavClick() {
    const from = dayjsRef(this.currentDateView.toDate());
    this.currentDateView = this.currentDateView.subtract(1, 'year');
    const to = dayjsRef(this.currentDateView.toDate());
    this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
    this.onLeftNav.emit({from, to});
  }

  onLeftSecondaryNavClick(): void {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.min &&
      this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;

    if (isOutsideRange) {
      navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
    }

    const from = dayjsRef(this.currentDateView.toDate());
    this.currentDateView = this.currentDateView.subtract(navigateBy, 'year');
    const to = dayjsRef(this.currentDateView.toDate());
    this.onLeftSecondaryNav.emit({from, to});
  }

  onRightNavClick(): void {
    const from = dayjsRef(this.currentDateView.toDate());
    this.currentDateView = this.currentDateView.add(1, 'year');
    const to = dayjsRef(this.currentDateView.toDate());
    this.onRightNav.emit({from, to});
  }

  onRightSecondaryNavClick(): void {
    let navigateBy = this.componentConfig.multipleYearsNavigateBy;
    const isOutsideRange = this.componentConfig.max &&
      this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;

    if (isOutsideRange) {
      navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
    }

    const from = dayjsRef(this.currentDateView.toDate());
    this.currentDateView = this.currentDateView.add(navigateBy, 'year');
    const to = dayjsRef(this.currentDateView.toDate());
    this.onRightSecondaryNav.emit({from, to});
  }

  toggleCalendarMode(): void {
    this.onNavHeaderBtnClick.emit();
  }

  getMonthBtnCssClass(month: IMonth): { [klass: string]: boolean } {
    const cssClass: { [klass: string]: boolean } = {
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

  goToCurrent(): void {
    this.currentDateView = dayjsRef();
    this.onGoToCurrent.emit();
  }

  moveCalendarTo(to: SingleCalendarValue): void {
    if (to) {
      this.currentDateView = this.utilsService.convertToDayjs(to, this.componentConfig.format);
      this.cd.markForCheck();
    }
  }

  handleConfigChange(config: SimpleChange): void {
    if (config) {
      const prevConf: IMonthCalendarConfigInternal = this.monthCalendarService.getConfig(config.previousValue);
      const currentConf: IMonthCalendarConfigInternal = this.monthCalendarService.getConfig(config.currentValue);

      if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
        this._currentDateView = null;
      }
    }
  }
}
