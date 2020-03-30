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
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {CalendarValue, ECalendarValue, SingleCalendarValue} from '..';
import * as moment from 'moment';
import {Moment} from 'moment';
import {INavEvent} from '../common/models/navigation-event.model';
import {DateValidator} from '../common/types/validator.type';
import {IYearCalendarConfig, IYearCalendarConfigInternal} from './year-calendar-config';
import {YearCalendarService} from './year-calendar.service';
import {IDateCell, UtilsService} from '../common/services/utils/utils.service';

@Component({
  selector: 'dp-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
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
  @Output() onSelect: EventEmitter<IDateCell> = new EventEmitter();
  @Output() onNavHeaderBtnClick: EventEmitter<null> = new EventEmitter();
  @Output() onGoToCurrent: EventEmitter<void> = new EventEmitter();
  @Output() onLeftNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onLeftSecondaryNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightSecondaryNav: EventEmitter<INavEvent> = new EventEmitter();
  isInited: boolean = false;
  componentConfig: IYearCalendarConfigInternal;
  yearMonths: IDateCell[][];
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  validateFn: DateValidator;
  _shouldShowCurrent: boolean = true;
  navLabel: string;
  showLeftNav: boolean;
  showRightNav: boolean;
  api = {
    toggleCalendar: this.toggleCalendarMode.bind(this),
    moveCalendarTo: this.moveCalendarTo.bind(this)
  };

  _selected: Moment[];
  _currentDateView: Moment;

  get selected(): Moment[] {
    return this._selected;
  }

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get currentDateView(): Moment {
    return this._currentDateView;
  }

  set currentDateView(current: Moment) {
    this._currentDateView = current.clone();
    this.yearMonths = this.yearCalendarService
      .generateCalendar(this.componentConfig, this._currentDateView, this.selected);
    this.navLabel = this.yearCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
    this.showLeftNav = this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
    this.showRightNav = this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
  }

  constructor(private readonly cd: ChangeDetectorRef,
              private readonly yearCalendarService: YearCalendarService,
              private readonly utilsService: UtilsService) {
  }

  ngOnInit() {
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
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  validate(formControl: FormControl): ValidationErrors | any {
    if (this.minDate || this.maxDate) {
      return this.validateFn(formControl.value);
    } else {
      return () => null;
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig);
      this.yearMonths = this.yearCalendarService
        .generateCalendar(this.componentConfig, this.currentDateView, this.selected);
      this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
    } else {
      this.selected = [];
      this.yearMonths = this.yearCalendarService
        .generateCalendar(this.componentConfig, this.currentDateView, this.selected);
    }

    this.cd.markForCheck();
  }

  onChangeCallback(_: any): void {
  }

  processOnChangeCallback(value: Moment[]): CalendarValue {
    return this.utilsService.convertFromMomentArray(
      this.componentConfig.format,
      value,
      this.componentConfig.returnedValueType || this.inputValueType
    );
  }

  goToCurrent(): void {
    this.currentDateView = moment();
    this.onGoToCurrent.emit();
  }

  onLeftNavClick() {
    const from = this.currentDateView.clone();
    this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
    const to = this.currentDateView.clone();
    this.yearMonths = this.yearCalendarService.generateCalendar(this.componentConfig, this.currentDateView, this.selected);
    this.onLeftNav.emit({from, to});
  }

  onRightNavClick(): void {
    const from = this.currentDateView.clone();
    this.currentDateView = this.currentDateView.clone().add(1, 'year');
    const to = this.currentDateView.clone();
    this.onRightNav.emit({from, to});
  }

  shouldShowCurrent(): boolean {
    return this.utilsService.shouldShowCurrent(
      this.componentConfig.showGoToCurrent,
      'year',
      this.componentConfig.min,
      this.componentConfig.max
    );
  }

  yearClicked(year: IDateCell): void {
    if (year.selected && !this.componentConfig.unSelectOnClick) {
      return;
    }

    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, year, 'year');
    this.yearMonths = this.yearCalendarService
      .generateCalendar(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(year);
  }

  getYearBtnCssClass(year: IDateCell): {[klass: string]: boolean} {
    const cssClass: {[klass: string]: boolean} = {
      'dp-selected': year.selected,
      'dp-current-year': year.current
    };
    const customCssClass: string = this.yearCalendarService.getYearBtnCssClass(this.componentConfig, year.date);

    if (customCssClass) {
      cssClass[customCssClass] = true;
    }

    return cssClass;
  }

  private init(): void {
    this.componentConfig = this.yearCalendarService.getConfig(this.config);
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

  private initValidators(): void {
    this.validateFn = this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate},
      this.componentConfig.format,
      'month'
    );

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  private toggleCalendarMode(): void {
    this.onNavHeaderBtnClick.emit();
  }

  private moveCalendarTo(to: SingleCalendarValue): void {
    if (to) {
      this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
      this.cd.markForCheck();
    }
  }

  private handleConfigChange(config: SimpleChange): void {
    if (config) {
      const prevConf: IYearCalendarConfigInternal = this.yearCalendarService.getConfig(config.previousValue);
      const currentConf: IYearCalendarConfigInternal = this.yearCalendarService.getConfig(config.currentValue);

      if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
        this._currentDateView = null;
      }

      if (prevConf.locale !== currentConf.locale) {
        if (this.currentDateView) {
          this.currentDateView.locale(currentConf.locale)
        }

        (this.selected || []).forEach((m) => m.locale(currentConf.locale));
      }
    }
  }
}
