import {CalendarMode} from '../common/types/calendar-mode';
import {IDatePickerDirectiveConfig} from './date-picker-directive-config.model';
import {DatePickerDirectiveService} from './date-picker-directive.service';
import {IDpDayPickerApi} from './date-picker.api';
import {DatePickerComponent} from './date-picker.component';
import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Moment} from 'moment';
import {CalendarValue} from '../common/types/calendar-value';
import {SingleCalendarValue} from '../common/types/single-calendar-value';

@Directive({
  exportAs: 'dpDayPicker',
  providers: [DatePickerDirectiveService],
  selector: '[dpDayPicker]'
})
export class DatePickerDirective implements OnInit {
  private _config: IDatePickerDirectiveConfig;
  private _attachTo: ElementRef | string;
  private _theme: string;
  private _mode: CalendarMode = 'day';
  private _minDate: SingleCalendarValue;
  private _maxDate: SingleCalendarValue;
  private _minTime: SingleCalendarValue;
  private _maxTime: SingleCalendarValue;
  private _displayDate: SingleCalendarValue;

  get config(): IDatePickerDirectiveConfig {
    return this._config;
  }

  @Input('dpDayPicker') set config(config: IDatePickerDirectiveConfig) {
    this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
    this.updateDatepickerConfig();
  }

  get attachTo(): ElementRef | string {
    return this._attachTo;
  }

  @Input() set attachTo(attachTo: ElementRef | string) {
    this._attachTo = attachTo;
    this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
    this.updateDatepickerConfig();
  }

  get theme(): string {
    return this._theme;
  }

  @Input() set theme(theme: string) {
    this._theme = theme;
    if (this.datePicker) {
      this.datePicker.theme = theme;
    }
  }

  get mode(): CalendarMode {
    return this._mode;
  }

  @Input() set mode(mode: CalendarMode) {
    this._mode = mode;
    if (this.datePicker) {
      this.datePicker.mode = mode;
    }
  }

  @Input() set minDate(minDate: SingleCalendarValue) {
    this._minDate = minDate;
    if (this.datePicker) {
      this.datePicker.minDate = minDate;
      this.datePicker.ngOnInit();
    }
  }

  get minDate(): SingleCalendarValue {
    return this._minDate;
  }

  @Input() set maxDate(maxDate: SingleCalendarValue) {
    this._maxDate = maxDate;
    if (this.datePicker) {
      this.datePicker.maxDate = maxDate;
      this.datePicker.ngOnInit();
    }
  }

  get maxDate(): SingleCalendarValue {
    return this._maxDate;
  }

  @Input() set minTime(minTime: SingleCalendarValue) {
    this._minTime = minTime;
    if (this.datePicker) {
      this.datePicker.minTime = minTime;
      this.datePicker.ngOnInit();
    }
  }

  get minTime(): SingleCalendarValue {
    return this._minTime;
  }

  @Input() set maxTime(maxTime: SingleCalendarValue) {
    this._maxTime = maxTime;
    if (this.datePicker) {
      this.datePicker.maxTime = maxTime;
      this.datePicker.ngOnInit();
    }
  }

  get maxTime(): SingleCalendarValue {
    return this._maxTime;
  }

  get displayDate(): SingleCalendarValue {
    return this._displayDate;
  }

  @Input() set displayDate(displayDate: SingleCalendarValue) {
    this._displayDate = displayDate;
    this.updateDatepickerConfig();
  }

  @Output() open = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() onChange = new EventEmitter<CalendarValue>();

  public datePicker: DatePickerComponent;
  public api: IDpDayPickerApi;

  constructor(public viewContainerRef: ViewContainerRef,
              public elemRef: ElementRef,
              public componentFactoryResolver: ComponentFactoryResolver,
              public service: DatePickerDirectiveService,
              @Optional() public formControl: NgControl) {
  }

  ngOnInit(): void {
    this.datePicker = this.createDatePicker();
    this.api = this.datePicker.api;
    this.updateDatepickerConfig();
    this.attachModelToDatePicker();
    this.datePicker.theme = this.theme;
  }

  createDatePicker(): DatePickerComponent {
    const factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
    return this.viewContainerRef.createComponent(factory).instance;
  }

  attachModelToDatePicker() {
    if (!this.formControl) {
      return;
    }

    this.datePicker.onViewDateChange(this.formControl.value);

    this.formControl.valueChanges.subscribe((value) => {
      if (value !== this.datePicker.inputElementValue) {
        this.datePicker.onViewDateChange(value);
      }
    });

    let setup = true;

    this.datePicker.registerOnChange((value) => {
      if (value) {
        const isMultiselectEmpty = setup && Array.isArray(value) && !value.length;

        if (!isMultiselectEmpty) {
          this.formControl.control.setValue(this.datePicker.inputElementValue);
        }
      }

      const errors = this.datePicker.validateFn(value);

      if (!setup) {
        this.formControl.control.markAsDirty(true);
      } else {
        setup = false;
      }

      if (errors) {
        if (errors.hasOwnProperty('format')) {
          const {given} = errors['format'];
          this.datePicker.inputElementValue = given;
          this.formControl.control.setValue(given);
        }

        this.formControl.control.setErrors(errors);
      }
    });
  }

  @HostListener('click')
  onClick() {
    this.datePicker.onClick();
  }

  @HostListener('focus')
  onFocus() {
    this.datePicker.inputFocused();
  }

  private updateDatepickerConfig() {
    if (this.datePicker) {
      this.datePicker.minDate = this.minDate;
      this.datePicker.maxDate = this.maxDate;
      this.datePicker.minTime = this.minTime;
      this.datePicker.maxTime = this.maxTime;
      this.datePicker.mode = this.mode || 'day';
      this.datePicker.displayDate = this.displayDate;
      this.datePicker.config = this.config;
      this.datePicker.open = this.open;
      this.datePicker.close = this.close;
      this.datePicker.onChange = this.onChange;

      this.datePicker.init();

      if (this.datePicker.componentConfig.disableKeypress) {
        this.elemRef.nativeElement.setAttribute('readonly');
      } else {
        this.elemRef.nativeElement.removeAttribute('readonly');
      }
    }
  }
}
