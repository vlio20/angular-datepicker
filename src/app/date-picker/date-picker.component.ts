import {
  Component,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer,
  OnDestroy,
  HostBinding
} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DayPickerService} from './date-picker.service';
import {IDatePickerConfig} from './date-picker-config.model';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NG_VALIDATORS,
  Validator,
  ValidationErrors
} from '@angular/forms';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDpDayPickerApi} from './date-picker.api';
import {DomHelper} from '../common/services/dom-appender/dom-appender.service';
import {CalendarValue, ECalendarValue, SingleCalendarValue} from '../common/types/calendar-value';
import {CalendarType} from '../common/types/calendar-type';
import {IDay} from '../day-calendar/day.model';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';

@Component({
  selector: 'dp-day-picker',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['date-picker.component.less'],
  providers: [
    DayPickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DpDayPickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DpDayPickerComponent),
      multi: true
    }
  ]
})
export class DpDayPickerComponent implements OnChanges,
                                             OnInit,
                                             AfterViewInit,
                                             ControlValueAccessor,
                                             Validator,
                                             OnDestroy {
  isInited: boolean = false;
  @Input() config: IDatePickerConfig;
  @Input() type: CalendarType = 'day';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() displayDate: SingleCalendarValue;
  @HostBinding('class') @Input() theme: string;
  @Input() minDate: Moment | string;
  @Input() maxDate: Moment | string;

  @ViewChild('container') calendarContainer: ElementRef;

  componentConfig: IDatePickerConfig;
  dayCalendarConfig: IDayCalendarConfig;
  _areCalendarsShown: boolean = false;
  hideStateHelper: boolean = false;
  _selected: Moment[] = [];
  inputValue: CalendarValue;
  inputValueType: ECalendarValue;
  currentDateView: Moment;
  inputElementValue: string;
  calendarWrapper: HTMLElement;
  appendToElement: HTMLElement;
  inputElement: HTMLElement;
  popupElem: HTMLElement;
  handleInnerElementClickUnlisteners: Function[] = [];
  openOn: Moment[];
  validateFn: (FormControl, string) => {[key: string]: any};
  api: IDpDayPickerApi = {
    open: this.showCalendars.bind(this),
    close: this.hideCalendar.bind(this)
  };

  get selected(): Moment[] {
    return this._selected;
  }

  set selected(value: Moment[]) {
    this._selected = value;
    this.inputElementValue = (<string[]>this.utilsService
      .convertFromMomentArray(this.componentConfig.format, value, ECalendarValue.StringArr))
      .join(', ');
  }

  get areCalendarsShown(): boolean {
    return this._areCalendarsShown;
  }

  set areCalendarsShown(value: boolean) {
    if (value) {
      this.domHelper.appendElementToPosition({
        container: this.appendToElement,
        element: this.calendarWrapper,
        anchor: this.inputElement,
        dimElem: this.popupElem,
        drops: this.componentConfig.drops,
        opens: this.componentConfig.opens
      });
    } else {
      this.dayPickerService.pickerClosed();
    }

    this._areCalendarsShown = value;
  }

  constructor(private dayPickerService: DayPickerService,
              private domHelper: DomHelper,
              private elemRef: ElementRef,
              private renderer: Renderer,
              private utilsService: UtilsService) {
  }

  @HostListener('click')
  onClick() {
    this.hideStateHelper = true;
  }

  @HostListener('document:click')
  onBodyClick() {
    if (!this.hideStateHelper) {
      this.hideCalendar();
    }
    this.hideStateHelper = false;
  }

  @HostListener('document:scroll')
  @HostListener('window:resize')
  onScroll() {
    if (this.areCalendarsShown) {
      this.domHelper.setElementPosition({
        container: this.appendToElement,
        element: this.calendarWrapper,
        anchor: this.inputElement,
        dimElem: this.popupElem,
        drops: this.componentConfig.drops,
        opens: this.componentConfig.opens
      });
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
      this.init();
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
      return this.validateFn(formControl, this.componentConfig.format);
    } else {
      return () => null;
    }
  }

  processOnChangeCallback(value: Moment[]): CalendarValue {
    return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.inputValueType);
  }

  initValidators() {
    this.validateFn = this.dayPickerService.createValidator({
      minDate: this.utilsService.convertToMoment(this.minDate, this.componentConfig.format),
      maxDate: this.utilsService.convertToMoment(this.maxDate, this.componentConfig.format)
    }, this.componentConfig.format);

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isInited) {
      const {minDate, maxDate} = changes;
      this.init();

      if (minDate || maxDate) {
        // this.initValidators();
      }
    }
  }

  ngAfterViewInit() {
    this.setElementPositionInDom();
  }

  setElementPositionInDom() {
    this.calendarWrapper = <HTMLElement> this.calendarContainer.nativeElement;
    this.inputElement = this.elemRef.nativeElement.querySelector('input');
    this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
    this.handleInnerElementClick(this.popupElem);

    if (this.componentConfig.appendTo) {
      if (typeof this.componentConfig.appendTo === 'string') {
        this.appendToElement = <HTMLElement>document.querySelector(this.componentConfig.appendTo);
      } else {
        this.appendToElement = <HTMLElement>this.componentConfig.appendTo;
      }
    } else {
      this.appendToElement = this.elemRef.nativeElement;
    }

    this.appendToElement.appendChild(this.calendarWrapper);
  }

  handleInnerElementClick(element: HTMLElement) {
    this.handleInnerElementClickUnlisteners.push(
      this.renderer.listen(element, 'click', () => {
        this.hideStateHelper = true;
      })
    );
  }

  init() {
    this.componentConfig = this.dayPickerService.getConfig(this.config);
    this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
    this.currentDateView = this.displayDate
      ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
      : this.utilsService
        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect);
  }

  inputFocused() {
    this.hideStateHelper = false;
    setTimeout(() => {
      this.areCalendarsShown = true;
    }, this.componentConfig.onOpenDelay);
  }

  showCalendars() {
    this.hideStateHelper = true;
    this.areCalendarsShown = true;
  }

  hideCalendar() {
    this.areCalendarsShown = false;
  }

  onViewDateChange(value: string) {
    if (this.dayPickerService.isValidInputDateValue(value, this.componentConfig)) {
      this.selected = this.dayPickerService.convertInputValueToMomentArray(value, this.componentConfig);
      this.currentDateView = this.selected.length
        ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect)
        : this.currentDateView;
    }
  }

  moveToCurrent() {
    this.openOn = [moment()];
  }

  daySelected(day: IDay) {
    this.selected = this.dayPickerService.updateSelected(this.componentConfig, this.selected, day);
  }

  ngOnDestroy() {
    this.handleInnerElementClickUnlisteners.forEach(ul => ul());
    this.appendToElement.removeChild(this.calendarWrapper);
  }
}