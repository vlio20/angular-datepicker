import {CalendarType} from '../../../bin/common/types/calendar-type';
import {IDatePickerDirectiveConfig} from './date-picker-directive-config.model';
import {DatePickerDirectiveService} from './date-picker-directive.service';
import {IDpDayPickerApi} from './date-picker.api';
import {DatePickerComponent} from './date-picker.component';
import {ChangeDetectorRef, OnChanges, SimpleChanges} from '@angular/core';
import {ElementRef} from '@angular/core';
import {OnInit} from '@angular/core';
import {ViewContainerRef} from '@angular/core';
import {ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  exportAs: 'dpDayPicker',
  providers: [DatePickerDirectiveService],
  selector: '[dpDayPicker][ngModel]',
})
export class DatePickerDirective implements OnInit, OnChanges {
  @Input('dpDayPicker') config: IDatePickerDirectiveConfig = {
    hideInputContainer: true,
  };

  @Input() attachTo: ElementRef | string;
  @Input() theme: string;
  @Input() type: CalendarType;

  public datePicker: DatePickerComponent;
  public api: IDpDayPickerApi;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver,
    public model: NgModel,
    public service: DatePickerDirectiveService,
  ) { }

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
      this.model.control.setValue(this.datePicker.inputElementValue, { emitEvent: false });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { config, theme, type, attachTo } = changes;
    if (this.datePicker) {
      if (theme) {
        this.datePicker.theme = theme.currentValue;
      }
      if (type) {
        this.datePicker.type = type.currentValue;
      }
      if (config && config.currentValue || attachTo && attachTo.currentValue) {
        this.updateDatepickerConfig();
      }
      this.datePicker.init();
    }
  }

  @HostListener('click')
  @HostListener('focus')
  onClick() {
    console.log('onClick');
    this.updateDatepickerConfig();
    this.datePicker.inputFocused();
  }

  private updateDatepickerConfig() {
    this.config = this.service.getConfig(this.config, this.attachTo || this.viewContainerRef.element);
    this.datePicker.type = this.type || 'day';
    this.datePicker.config = this.config;
  }
}
