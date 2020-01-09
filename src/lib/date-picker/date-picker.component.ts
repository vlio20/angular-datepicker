import {IDate} from '../common/models/date.model';
import {DomHelper} from '../common/services/dom-appender/dom-appender.service';
import {UtilsService} from '../common/services/utils/utils.service';
import {CalendarMode} from '../common/types/calendar-mode';
import {ECalendarMode} from '../common/types/calendar-mode-enum';
import {CalendarValue} from '../common/types/calendar-value';
import {ECalendarValue} from '../common/types/calendar-value-enum';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {DayCalendarComponent} from '../day-calendar/day-calendar.component';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {IDayTimeCalendarConfig} from '../day-time-calendar/day-time-calendar-config.model';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';
import {TimeSelectComponent} from '../time-select/time-select.component';
import {TimeSelectService} from '../time-select/time-select.service';
import {IDatePickerConfig, IDatePickerConfigInternal} from './date-picker-config.model';
import {IDpDayPickerApi} from './date-picker.api';
import {DatePickerService} from './date-picker.service';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
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
import {Moment, unitOfTime} from 'moment';
import {DateValidator} from '../common/types/validator.type';
import {MonthCalendarComponent} from '../month-calendar/month-calendar.component';
import {DayTimeCalendarComponent} from '../day-time-calendar/day-time-calendar.component';
import {INavEvent} from '../common/models/navigation-event.model';
import {SelectEvent} from '../common/types/selection-event.enum';
import {ISelectionEvent} from '../common/types/selection-event.model';

@Component({
  selector: 'dp-date-picker',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['date-picker.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePickerService,
    DayTimeCalendarService,
    DayCalendarService,
    TimeSelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnChanges,
                                            OnInit,
                                            AfterViewInit,
                                            ControlValueAccessor,
                                            Validator,
                                            OnDestroy {

  get openOnFocus(): boolean {
    return this.componentConfig.openOnFocus;
  }

  get openOnClick(): boolean {
    return this.componentConfig.openOnClick;
  }

  get areCalendarsShown(): boolean {
    return this._areCalendarsShown;
  }

  set areCalendarsShown(value: boolean) {
    if (value) {
      this.startGlobalListeners();
      this.domHelper.appendElementToPosition({
        container: this.appendToElement,
        element: this.calendarWrapper,
        anchor: this.inputElementContainer,
        dimElem: this.popupElem,
        drops: this.componentConfig.drops,
        opens: this.componentConfig.opens
      });
    } else {
      this.stopGlobalListeners();
      this.dayPickerService.pickerClosed();
    }

    this._areCalendarsShown = value;
  }

  get selected(): Moment[] {
    return this._selected;
  }

  set selected(selected: Moment[]) {
    this._selected = selected;
    this.inputElementValue = (<string[]>this.utilsService
      .convertFromMomentArray(this.componentConfig.format, selected, ECalendarValue.StringArr))
      .join(' | ');
    const val = this.processOnChangeCallback(selected);
    this.onChangeCallback(val, false);
    this.onChange.emit(val);
  }

  get currentDateView(): Moment {
    return this._currentDateView;
  }

  set currentDateView(date: Moment) {
    this._currentDateView = date;

    if (this.dayCalendarRef) {
      this.dayCalendarRef.moveCalendarTo(date);
    }

    if (this.monthCalendarRef) {
      this.monthCalendarRef.moveCalendarTo(date);
    }

    if (this.dayTimeCalendarRef) {
      this.dayTimeCalendarRef.moveCalendarTo(date);
    }
  }

  isInitialized: boolean = false;
  @Input() config: IDatePickerConfig;
  @Input() mode: CalendarMode = 'day';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() displayDate: SingleCalendarValue;
  @HostBinding('class') @Input() theme: string;
  @Input() minDate: SingleCalendarValue;
  @Input() maxDate: SingleCalendarValue;
  @Input() minTime: SingleCalendarValue;
  @Input() maxTime: SingleCalendarValue;
  @Output() open = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() onChange = new EventEmitter<CalendarValue>();
  @Output() onGoToCurrent: EventEmitter<void> = new EventEmitter();
  @Output() onLeftNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onSelect: EventEmitter<ISelectionEvent> = new EventEmitter();
  @ViewChild('container', {static: false}) calendarContainer: ElementRef;
  @ViewChild('dayCalendar', {static: false}) dayCalendarRef: DayCalendarComponent;
  @ViewChild('monthCalendar', {static: false}) monthCalendarRef: MonthCalendarComponent;
  @ViewChild('daytimeCalendar', {static: false}) dayTimeCalendarRef: DayTimeCalendarComponent;
  @ViewChild('timeSelect', {static: false}) timeSelectRef: TimeSelectComponent;
  componentConfig: IDatePickerConfigInternal;
  dayCalendarConfig: IDayCalendarConfig;
  dayTimeCalendarConfig: IDayTimeCalendarConfig;
  timeSelectConfig: ITimeSelectConfig;
  hideStateHelper: boolean = false;
  inputValue: CalendarValue;
  isFocusedTrigger: boolean = false;
  inputElementValue: string;
  calendarWrapper: HTMLElement;
  appendToElement: HTMLElement;
  inputElementContainer: HTMLElement;
  popupElem: HTMLElement;
  handleInnerElementClickUnlisteners: Function[] = [];
  globalListenersUnlisteners: Function[] = [];
  validateFn: DateValidator;
  api: IDpDayPickerApi = {
    open: this.showCalendars.bind(this),
    close: this.hideCalendar.bind(this),
    moveCalendarTo: this.moveCalendarTo.bind(this)
  };
  selectEvent = SelectEvent;

  _areCalendarsShown: boolean = false;

  _selected: Moment[] = [];

  _currentDateView: Moment;

  constructor(private readonly dayPickerService: DatePickerService,
              private readonly domHelper: DomHelper,
              private readonly elemRef: ElementRef,
              private readonly renderer: Renderer2,
              private readonly utilsService: UtilsService,
              public readonly cd: ChangeDetectorRef) {
  }

  @HostListener('click')
  onClick() {
    if (!this.openOnClick) {
      return;
    }

    if (!this.isFocusedTrigger && !this.disabled) {
      this.hideStateHelper = true;
      if (!this.areCalendarsShown) {
        this.showCalendars();
      }
    }
  }

  onBodyClick() {
    if (this.componentConfig.hideOnOutsideClick) {
      if (!this.hideStateHelper && this.areCalendarsShown) {
        this.hideCalendar();
      }

      this.hideStateHelper = false;
    }
  }

  @HostListener('window:resize')
  onScroll() {
    if (this.areCalendarsShown) {
      this.domHelper.setElementPosition({
        container: this.appendToElement,
        element: this.calendarWrapper,
        anchor: this.inputElementContainer,
        dimElem: this.popupElem,
        drops: this.componentConfig.drops,
        opens: this.componentConfig.opens
      });
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value || value === '') {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig);
      this.init();
    } else {
      this.selected = [];
    }

    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  onChangeCallback(_: any, changedByInput: boolean) {
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onTouchedCallback() {
  }

  validate(formControl: FormControl): ValidationErrors {
    return this.validateFn(formControl.value);
  }

  processOnChangeCallback(selected: Moment[] | string): CalendarValue {
    if (typeof selected === 'string') {
      return selected;
    } else {
      return this.utilsService.convertFromMomentArray(
        this.componentConfig.format,
        selected,
        this.componentConfig.returnedValueType || this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect)
      );
    }
  }

  initValidators(): void {
    this.validateFn = this.utilsService.createValidator(
      {
        minDate: this.minDate,
        maxDate: this.maxDate,
        minTime: this.minTime,
        maxTime: this.maxTime
      }, this.componentConfig.format, this.mode);

    this.onChangeCallback(this.processOnChangeCallback(this.selected), false);
  }

  ngOnInit(): void {
    this.isInitialized = true;
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInitialized) {
      this.init();
    }
  }

  ngAfterViewInit(): void {
    this.setElementPositionInDom();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  setElementPositionInDom(): void {
    this.calendarWrapper = <HTMLElement>this.calendarContainer.nativeElement;
    this.setInputElementContainer();
    this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
    this.handleInnerElementClick(this.popupElem);

    const {appendTo} = this.componentConfig;
    if (appendTo) {
      if (typeof appendTo === 'string') {
        this.appendToElement = <HTMLElement>document.querySelector(<string>appendTo);
      } else {
        this.appendToElement = <HTMLElement>appendTo;
      }
    } else {
      this.appendToElement = this.elemRef.nativeElement;
    }

    this.appendToElement.appendChild(this.calendarWrapper);
  }

  setInputElementContainer() {
    this.inputElementContainer = this.utilsService.getNativeElement(this.componentConfig.inputElementContainer)
      || this.elemRef.nativeElement.querySelector('.dp-input-container')
      || document.body;
  }

  handleInnerElementClick(element: HTMLElement) {
    this.handleInnerElementClickUnlisteners.push(
      this.renderer.listen(element, 'click', () => {
        this.hideStateHelper = true;
      })
    );
  }

  init() {
    this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
    this.currentDateView = this.displayDate
      ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
      : this.utilsService
        .getDefaultDisplayDate(
          this.currentDateView,
          this.selected,
          this.componentConfig.allowMultiSelect,
          this.componentConfig.min
        );
    this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
    this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
    this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
    this.initValidators();
  }

  inputFocused() {
    if (!this.openOnFocus) {
      return;
    }

    this.isFocusedTrigger = true;
    setTimeout(() => {
      if (!this.areCalendarsShown) {
        this.showCalendars();
      }

      this.hideStateHelper = false;

      this.isFocusedTrigger = false;
      this.cd.markForCheck();
    }, this.componentConfig.onOpenDelay);
  }

  inputBlurred() {
    this.onTouchedCallback();
  }

  showCalendars() {
    this.hideStateHelper = true;
    this.areCalendarsShown = true;

    if (this.timeSelectRef) {
      this.timeSelectRef.api.triggerChange();
    }

    this.open.emit();
    this.cd.markForCheck();
  }

  hideCalendar() {
    this.areCalendarsShown = false;

    if (this.dayCalendarRef) {
      this.dayCalendarRef.api.toggleCalendarMode(ECalendarMode.Day);
    }

    this.close.emit();
    this.cd.markForCheck();
  }

  onViewDateChange(value: CalendarValue) {
    const strVal = value ? this.utilsService.convertToString(value, this.componentConfig.format) : '';
    if (this.dayPickerService.isValidInputDateValue(strVal, this.componentConfig)) {
      this.selected = this.dayPickerService.convertInputValueToMomentArray(strVal, this.componentConfig);
      this.currentDateView = this.selected.length
        ? this.utilsService.getDefaultDisplayDate(
          null,
          this.selected,
          this.componentConfig.allowMultiSelect,
          this.componentConfig.min
        )
        : this.currentDateView;

      this.onSelect.emit({
        date: strVal,
        type: SelectEvent.INPUT,
        granularity: null
      })
    } else {
      this._selected = this.utilsService
        .getValidMomentArray(strVal, this.componentConfig.format);
      this.onChangeCallback(this.processOnChangeCallback(strVal), true);
    }
  }

  dateSelected(date: IDate, granularity: unitOfTime.Base, type: SelectEvent, ignoreClose?: boolean) {
    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
    if (!ignoreClose) {
      this.onDateClick();
    }

    this.onSelect.emit({
      date: date.date,
      granularity,
      type
    });
  }

  onDateClick() {
    if (this.componentConfig.closeOnSelect) {
      setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    switch (event.keyCode) {
      case (9):
      case (27):
        this.hideCalendar();
        break;
    }
  }

  moveCalendarTo(date: SingleCalendarValue) {
    const momentDate = this.utilsService.convertToMoment(date, this.componentConfig.format);
    this.currentDateView = momentDate;
  }

  onLeftNavClick(change: INavEvent) {
    this.onLeftNav.emit(change);
  }

  onRightNavClick(change: INavEvent) {
    this.onRightNav.emit(change);
  }

  startGlobalListeners() {
    this.globalListenersUnlisteners.push(
      this.renderer.listen(document, 'keydown', (e: KeyboardEvent) => {
        this.onKeyPress(e);
      }),
      this.renderer.listen(document, 'scroll', () => {
        this.onScroll();
      }),
      this.renderer.listen(document, 'click', () => {
        this.onBodyClick();
      })
    );
  }

  stopGlobalListeners() {
    this.globalListenersUnlisteners.forEach((ul) => ul());
    this.globalListenersUnlisteners = [];
  }

  ngOnDestroy() {
    this.handleInnerElementClickUnlisteners.forEach(ul => ul());

    if (this.appendToElement) {
      this.appendToElement.removeChild(this.calendarWrapper);
    }
  }
}
