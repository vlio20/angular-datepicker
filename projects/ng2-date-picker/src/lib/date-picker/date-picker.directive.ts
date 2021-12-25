import {CalendarMode} from '../common/types/calendar-mode';
import {IDatePickerDirectiveConfig} from './date-picker-directive-config.model';
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
import {INavEvent} from '../common/models/navigation-event.model';
import {UtilsService} from '../common/services/utils/utils.service'
import {CalendarValue} from '../common/types/calendar-value';
import {ISelectionEvent} from '../common/types/selection-event.model';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {Dayjs} from 'dayjs';

@Directive({
  exportAs: 'dpDayPicker',
  selector: '[dpDayPicker]'
})
export class DatePickerDirective implements OnInit {

  @Output() open = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() onChange = new EventEmitter<CalendarValue>();
  @Output() onGoToCurrent: EventEmitter<void> = new EventEmitter();
  @Output() onLeftNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onSelect: EventEmitter<ISelectionEvent> = new EventEmitter();
  datePicker: DatePickerComponent;
  api: IDpDayPickerApi;

  constructor(public readonly viewContainerRef: ViewContainerRef,
              public readonly elemRef: ElementRef,
              public readonly componentFactoryResolver: ComponentFactoryResolver,
              @Optional() public readonly formControl: NgControl,
              public readonly utilsService: UtilsService) {
  }

  private _config: IDatePickerDirectiveConfig;

  get config(): IDatePickerDirectiveConfig {
    return this._config;
  }

  @Input('dpDayPicker') set config(config: IDatePickerDirectiveConfig) {
    this._config = {
      ...config,
      hideInputContainer: true,
      inputElementContainer: config.inputElementContainer ?? this.elemRef,
    };
    this.updateDatepickerConfig();
    this.markForCheck();
  }

  private _theme: string;

  get theme(): string {
    return this._theme;
  }

  @Input() set theme(theme: string) {
    this._theme = theme;
    if (this.datePicker) {
      this.datePicker.theme = theme;
    }

    this.markForCheck();
  }

  private _mode: CalendarMode = 'day';

  get mode(): CalendarMode {
    return this._mode;
  }

  @Input() set mode(mode: CalendarMode) {
    this._mode = mode;
    if (this.datePicker) {
      this.datePicker.mode = mode;
    }

    this.markForCheck();
  }

  private _minDate: SingleCalendarValue;

  get minDate(): SingleCalendarValue {
    return this._minDate;
  }

  @Input() set minDate(minDate: SingleCalendarValue) {
    this._minDate = minDate;
    if (this.datePicker) {
      this.datePicker.minDate = minDate;
      this.datePicker.ngOnInit();
    }

    this.markForCheck();
  }

  private _maxDate: SingleCalendarValue;

  get maxDate(): SingleCalendarValue {
    return this._maxDate;
  }

  @Input() set maxDate(maxDate: SingleCalendarValue) {
    this._maxDate = maxDate;
    if (this.datePicker) {
      this.datePicker.maxDate = maxDate;
      this.datePicker.ngOnInit();
    }

    this.markForCheck();
  }

  private _minTime: SingleCalendarValue;

  get minTime(): SingleCalendarValue {
    return this._minTime;
  }

  @Input() set minTime(minTime: SingleCalendarValue) {
    this._minTime = minTime;
    if (this.datePicker) {
      this.datePicker.minTime = minTime;
      this.datePicker.ngOnInit();
    }

    this.markForCheck();
  }

  private _maxTime: SingleCalendarValue;

  get maxTime(): SingleCalendarValue {
    return this._maxTime;
  }

  @Input() set maxTime(maxTime: SingleCalendarValue) {
    this._maxTime = maxTime;
    if (this.datePicker) {
      this.datePicker.maxTime = maxTime;
      this.datePicker.ngOnInit();
    }

    this.markForCheck();
  }

  private _displayDate: Dayjs | string;

  get displayDate(): Dayjs | string {
    return this._displayDate;
  }

  @Input() set displayDate(displayDate: Dayjs | string) {
    this._displayDate = displayDate;
    this.updateDatepickerConfig();

    this.markForCheck();
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
        const strVal = this.utilsService.convertToString(value, this.datePicker.componentConfig.format);
        this.datePicker.onViewDateChange(strVal);
      }
    });

    let setup = true;

    this.datePicker.registerOnChange((value, changedByInput) => {
      if (value) {
        const isMultiselectEmpty = setup && Array.isArray(value) && !value.length;

        if (!isMultiselectEmpty && !changedByInput) {
          this.formControl.control.setValue(this.datePicker.inputElementValue);
        }
      }

      const errors = this.datePicker.validateFn(value);

      if (!setup) {
        this.formControl.control.markAsDirty({
          onlySelf: true
        });
      } else {
        setup = false;
      }

      if (errors) {
        if (errors.hasOwnProperty('format')) {
          const {given} = errors['format'];
          this.datePicker.inputElementValue = given;
          if (!changedByInput) {
            this.formControl.control.setValue(given);
          }
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

  @HostListener('keydown.enter')
  onEnter() {
    if (this.datePicker.componentConfig.closeOnEnter) {
      this.datePicker.hideCalendar();
    }
  }

  markForCheck() {
    if (this.datePicker) {
      this.datePicker.cd.markForCheck();
    }
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
      this.datePicker.onGoToCurrent = this.onGoToCurrent;
      this.datePicker.onLeftNav = this.onLeftNav;
      this.datePicker.onRightNav = this.onRightNav;
      this.datePicker.onSelect = this.onSelect;

      this.datePicker.init();

      if (this.datePicker.componentConfig.disableKeypress) {
        this.elemRef.nativeElement.setAttribute('readonly', true);
      } else {
        this.elemRef.nativeElement.removeAttribute('readonly');
      }
    }
  }
}
