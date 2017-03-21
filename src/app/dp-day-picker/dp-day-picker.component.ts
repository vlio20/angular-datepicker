import {CalendarService} from '../dp-calendar/config/calendar.service';
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
  OnDestroy
} from '@angular/core';
import {DpCalendarComponent} from '../dp-calendar/dp-calendar.component';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DayPickerService} from './service/day-picker.service';
import {IDayPickerConfig} from './service/day-picker-config.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDpDayPickerApi} from './dp-day-picker.api';
import {DomHelper} from '../common/services/dom-appender/dom-appender.service';

export type CalendarValue = string | string[] | Moment | Moment[];

@Component({
  selector: 'dp-day-picker',
  templateUrl: './dp-day-picker.component.html',
  styleUrls: ['./dp-day-picker.component.less'],
  entryComponents: [DpCalendarComponent],
  providers: [
    DomHelper,
    CalendarService,
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
                                             OnDestroy,
                                             ControlValueAccessor,
                                             Validator {
  private shouldNgInit: boolean = true;
  @Input('config') private userConfig: IDayPickerConfig;

  // attributes
  @Input() private placeholder: string = '';
  @Input() private disabled: boolean = false;
  @Input() private theme: string;

  // validations
  @Input() private minDate: Moment | string;
  @Input() private maxDate: Moment | string;

  @ViewChild('container') calendarContainer: ElementRef;

  private _areCalendarsShown: boolean = false;
  private hideStateHelper: boolean = false;
  private pickerConfig: IDayPickerConfig;
  private _value: Moment[] = [];
  private userValue;
  private viewValue: string;
  private calendarWrapper: HTMLElement;
  private appendToElement: HTMLElement;
  private inputElement: HTMLElement;
  private popupElem: HTMLElement;
  private handleInnerElementClickUnlisteners: Function[] = [];
  validateFn: Function;

  private get value(): Moment[] {
    return this._value;
  }

  private set value(value: Moment[]) {
    this._value = value;
    this.viewValue = this._value ? this._value.map(val => val.format(this.pickerConfig.format)).join(', ') : '';
    this.onChangeCallback(this.processOnChangeCallback(value));
  }

  private get areCalendarsShown(): boolean {
    return this._areCalendarsShown;
  }

  private set areCalendarsShown(value: boolean) {
    if (value) {
      this.domHelper.appendElementToPosition({
        container: this.appendToElement,
        element: this.calendarWrapper,
        anchor: this.inputElement,
        dimElem: this.popupElem,
        drops: this.pickerConfig.drops,
        opens: this.pickerConfig.opens
      });
    }
    this._areCalendarsShown = value;
  }

  api: IDpDayPickerApi = <IDpDayPickerApi>{};

  constructor(private dayPickerService: DayPickerService,
              private domHelper: DomHelper,
              private elemRef: ElementRef,
              private renderer: Renderer) {
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
        drops: this.pickerConfig.drops,
        opens: this.pickerConfig.opens
      });
    }
  }

  ngOnInit() {
    if (this.shouldNgInit) {
      this.init();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shouldNgInit = false;
    const {minDate, maxDate} = changes;
    this.init();

    if (minDate || maxDate) {
      this.initValidators();
    }
  }

  ngAfterViewInit() {
    this.calendarWrapper = <HTMLElement> this.calendarContainer.nativeElement;
    this.inputElement = this.elemRef.nativeElement.querySelector('input');
    this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
    this.handleInnerElementClick(this.popupElem);

    if (this.pickerConfig.appendTo) {
      if (typeof this.pickerConfig.appendTo === 'string') {
        this.appendToElement = <HTMLElement>document.querySelector(this.pickerConfig.appendTo);
      } else {
        this.appendToElement = this.pickerConfig.appendTo;
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

  writeValue(value: Moment): void {
    if (value) {
      this.pickerConfig.userValueType =
        this.pickerConfig.userValueType || (typeof value === 'string' ? 'string' : 'object');
      this.userValue = value;
      this.init();
    }
  }

  processOnChangeCallback(value: Moment[]): CalendarValue {
    if (!value || value.length === 0) {
      return null;
    }

    if (value.length > 0 && !this.pickerConfig.allowMultiSelect) {
      return this.pickerConfig.userValueType === 'string' ? this.viewValue : value[0];
    }

    return this.pickerConfig.userValueType === 'string' ? this.viewValue.split(', ') : value;
  }

  onChangeCallback(_: any) {
  };

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  validate(c: FormControl) {
    if (this.minDate || this.maxDate) {
      return this.validateFn(c);
    } else {
      return () => null;
    }
  }

  isDateValid(value: string) {
    if (this.dayPickerService.isDateValid(value, this.pickerConfig.format)) {
      this.value = this.value.concat(moment(value, this.pickerConfig.format));
    }
  }

  init() {
    this.pickerConfig = this.dayPickerService.getConfig(this.userConfig);
    if (this.userValue) {
      if (Array.isArray(this.userValue)) {
        if (this.userConfig.allowMultiSelect === undefined) {
          // set allowMultiSelect to true unless explicitly set by user
          this.pickerConfig.allowMultiSelect = true;
        }
        if (this.pickerConfig.allowMultiSelect) {
          this.value = this.userValue.map(val => UtilsService.convertToMoment(val, this.pickerConfig.format));
        } else {
          this.value = [UtilsService.convertToMoment(this.userValue[0], this.pickerConfig.format)];
        }
      } else if (typeof this.userValue === 'string') {
        if (this.userConfig.userValueType === undefined) {
          // set userValueType to 'string' unless explicitly set by user
          this.pickerConfig.userValueType = 'string';
        }
        if (this.userValue.includes(',') && this.userConfig.allowMultiSelect === undefined) {
          // set allowMultiSelect to true unless explicitly set by user
          this.pickerConfig.allowMultiSelect = true;
        }
        if (this.pickerConfig.allowMultiSelect) {
          this.value = this.userValue.split(',')
            .map(val => UtilsService.convertToMoment(val.trim(), this.pickerConfig.format));
        } else {
          this.value = [UtilsService.convertToMoment(this.userValue, this.pickerConfig.format)];
        }
      } else {
        this.value = [UtilsService.convertToMoment(this.userValue, this.pickerConfig.format)];
      }
    }
    this.initApi();
  }

  initValidators() {
    this.validateFn = this.dayPickerService.createValidator({
      minDate: typeof this.minDate === 'string' ?
        moment(<string>this.minDate, this.pickerConfig.format) : <Moment>this.minDate,
      maxDate: typeof this.maxDate === 'string' ?
        moment(<string>this.maxDate, this.pickerConfig.format) : <Moment>this.maxDate
    }, this.pickerConfig.format);
    this.onChangeCallback(this.processOnChangeCallback(this.value));
  }

  initApi() {
    this.api = {
      open: this.showCalendars.bind(this),
      close: this.hideCalendar.bind(this)
    };
  }

  daySelected() {
    if (this.pickerConfig.closeOnSelect && !this.pickerConfig.allowMultiSelect) {
      setTimeout(this.hideCalendar.bind(this), this.pickerConfig.closeOnSelectDelay);
    }
  }

  inputFocused() {
    this.hideStateHelper = false;
    this.areCalendarsShown = true;
  }

  showCalendars() {
    this.hideStateHelper = true;
    this.areCalendarsShown = true;
  }

  hideCalendar() {
    this.areCalendarsShown = false;
  }

  onViewDateChange(dates: string) {
    const dateStrings = dates.split(',').map(date => date.trim());
    const validDateStrings = dateStrings.filter(date => this.dayPickerService.isDateValid(date, this.pickerConfig.format));
    if (!this.pickerConfig.allowMultiSelect && validDateStrings.length > 0) {
      // Single selection
      this.value = validDateStrings[0] !== '' ? [moment(validDateStrings[0], this.pickerConfig.format)] : [];
    } else if (validDateStrings.length === dateStrings.length && this.pickerConfig.allowMultiSelect) {
      // Multi selection
      this.value = validDateStrings
        .map(date => date !== '' ? moment(date, this.pickerConfig.format) : null)
        .filter(date => date !== null);
    }
  }

  onKeydown(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.areCalendarsShown = !this.areCalendarsShown;
      e.preventDefault();
    }

    if (e.keyCode === 27) {
      this.areCalendarsShown = false;
      e.preventDefault();
    }

    if (this.pickerConfig.disableKeypress) {
      e.preventDefault();
    }
  }

  ngOnDestroy() {
    this.handleInnerElementClickUnlisteners.forEach(ul => ul());
    this.appendToElement.removeChild(this.calendarWrapper);
  }
}