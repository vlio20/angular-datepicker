import {UtilsService} from '../common/services/utils/utils.service';
import {OnChanges, SimpleChanges} from '@angular/core/core';
import {ElementRef} from '@angular/core';
import {IDatePickerConfig} from './date-picker-config.model';
import {NgModel} from '@angular/forms';
import {DatePickerComponent} from './date-picker.component';
import {OnInit} from '@angular/core';
import {ViewContainerRef} from '@angular/core';
import { Directive, ComponentFactoryResolver, Input, HostListener } from '@angular/core';
import { Moment } from 'moment';

@Directive({ selector: '[dpDayPicker][ngModel]' })
export class DatePickerDirective implements OnInit, OnChanges {
  @Input('dpDayPicker') config: IDatePickerConfig = {
    hideInputContainer: true,
  };

  @Input() inputElementContainer: ElementRef;
  @Input() theme: string;

  public datePicker: DatePickerComponent;

  constructor(
    public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver,
    public model: NgModel,
    public utils: UtilsService,
  ) { }

  ngOnInit(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
    this.datePicker = this.viewContainerRef.createComponent(factory).instance;
    this.model.control.setValidators(this.datePicker.validate.bind(this.datePicker));
    this.model.valueChanges.subscribe(value => {
      if (value !== this.datePicker.inputElementValue) {
        this.datePicker.onViewDateChange(value);
      }
    });
    this.datePicker.registerOnChange(value => {
      this.model.control.setValue(this.datePicker.inputElementValue, { emitEvent: false });
    });
    if (this.config) {
      this.config = this.updateDatepickerConfig(this.config);
    }
    this.datePicker.theme = this.theme;
  }

  ngOnChanges(changes: SimpleChanges) {
    const { config, theme, inputElementContainer } = changes;
    if (this.datePicker) {
      if (theme && theme.currentValue) {
        this.datePicker.theme = theme.currentValue;
      }
      if (config && config.currentValue || inputElementContainer && inputElementContainer.currentValue) {
        this.config = this.updateDatepickerConfig(config.currentValue);
      }
      this.datePicker.init();
    }
  }

  @HostListener('click')
  @HostListener('focus')
  onClick() {
    if (this.config) {
      this.config = this.updateDatepickerConfig(this.config);
    }
    this.datePicker.onClick();
  }

  private updateDatepickerConfig(config: IDatePickerConfig): IDatePickerConfig {
    config.hideInputContainer = true;
    if (typeof this.inputElementContainer === 'string') {
      config.inputElementContainer = this.inputElementContainer;
    } else if (this.inputElementContainer) {
      config.inputElementContainer = this.inputElementContainer.nativeElement;
    } else {
      config.inputElementContainer = this.utils.closestParent(this.viewContainerRef.element.nativeElement, '.mat-input-wrapper');
    }
    this.datePicker.config = config;
    return config;
  }
}
