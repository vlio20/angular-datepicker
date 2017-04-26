import {CalendarType} from './../common/types/calendar-type';
import {IDatePickerDirectiveConfig} from './date-picker-directive-config.model';
import {DatePickerDirectiveService} from './date-picker-directive.service';
import {IDpDayPickerApi} from './date-picker.api';
import {DatePickerComponent} from './date-picker.component';
import {
  ElementRef,
  OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  Directive,
  HostListener,
  Input
} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  exportAs: 'dpDayPicker',
  providers: [DatePickerDirectiveService],
  selector: '[dpDayPicker][ngModel]',
})
export class DatePickerDirective implements OnInit {
  private _config: IDatePickerDirectiveConfig;
  private _attachTo: ElementRef | string;
  private attachToElement: HTMLElement;
  private _theme: string;
  private _type: CalendarType;

  get config(): IDatePickerDirectiveConfig {
    return this._config;
  }

  @Input('dpDayPicker') set config(config: IDatePickerDirectiveConfig) {
    this._config = this.service.getConfig(config, this.attachToElement || this.viewContainerRef.element.nativeElement);
    this.updateDatepickerConfig();
    if (this.datePicker) {
      this.datePicker.init();
    }
  }

  get attachTo(): ElementRef | string {
    return this._attachTo;
  }

  @Input() set attachTo(attachTo: ElementRef | string) {
    this._attachTo = attachTo;
    this.attachToElement = this.service
      .convertToHTMLElement(attachTo, this.viewContainerRef.element.nativeElement);
    this._config = this.service
      .getConfig(this.config, this.attachToElement || this.viewContainerRef.element.nativeElement);
    this.updateDatepickerConfig();
    if (this.datePicker) {
      this.datePicker.init();
    }
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

  get type(): CalendarType {
    return this._type;
  }

  @Input() set type(type: CalendarType) {
    this._type = type;
    if (this.datePicker) {
      this.datePicker.type = type;
    }
  }

  public datePicker: DatePickerComponent;
  public api: IDpDayPickerApi;

  constructor(public viewContainerRef: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver,
              public model: NgModel,
              public service: DatePickerDirectiveService,) {
  }

  ngOnInit(): void {
    this.datePicker = this.createDatePicker();
    this.api = this.datePicker.api;
    this.attachModelToDatePicker();
    this.updateDatepickerConfig();
    this.datePicker.theme = this.theme;
  }

  createDatePicker(): DatePickerComponent {
    const factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
    return this.viewContainerRef.createComponent(factory).instance;
  }

  attachModelToDatePicker() {
    this.model.valueChanges.subscribe(value => {
      if (value !== this.datePicker.inputElementValue) {
        this.datePicker.onViewDateChange(value);
      }
    });
    this.datePicker.registerOnChange(value => {
      this.model.control.setValue(this.datePicker.inputElementValue, {emitEvent: false});
    });
  }

  @HostListener('click')
  onClick() {
    this.updateDatepickerConfig();
    this.datePicker.onClick();
  }

  @HostListener('focus')
  onFocus() {
    this.updateDatepickerConfig();
    this.datePicker.inputFocused();
  }

  private updateDatepickerConfig() {
    if (this.datePicker) {
      this.datePicker.type = this.type || 'day';
      this.datePicker.config = this.config;
    }
  }
}
