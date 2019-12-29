import {INavEvent} from '../../../lib/common/models/navigation-event.model';
import {DEF_CONF} from './conts/consts';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DatePickerComponent, ISelectionEvent} from '../../../lib';
import {ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

export abstract class DateComponent {
  @ViewChild('component', {static: false}) datePicker: DatePickerComponent;

  config = DEF_CONF;
  date = moment();
  material: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  validationMinDate: Moment;
  validationMaxDate: Moment;
  validationMinTime: Moment;
  validationMaxTime: Moment;
  placeholder: string = 'Choose a date...';
  displayDate: Moment | string;

  displayDateChanged(displayDate: Moment | string): void {
    this.displayDate = displayDate;
  }

  onDisplayDateChange(displayDate: Moment | string): void {
    this.displayDate = displayDate;
  }

  onMaterialThemeChange(material: boolean): void {
    this.material = material;
  }

  onDisabledChange(disabled: boolean): void {
    this.disabled = disabled;
  }

  onRequireValidationChange(required: boolean): void {
    this.required = required;
  }

  onMinValidationChange($event: Moment): void {
    this.validationMinDate = $event;
  }

  onMaxValidationChange($event: Moment): void {
    this.validationMaxDate = $event;
  }

  onMinTimeValidationChange($event: Moment): void {
    this.validationMinTime = $event;
  }

  onMaxTimeValidationChange($event: Moment): void {
    this.validationMaxTime = $event;
  }

  onPlaceholderChange(placeholder: string): void {
    this.placeholder = placeholder;
  }

  onConfigChange($event): void {
    this.config = {
      ...this.config,
      ...$event
    }
  }

  openCalendar(): void {
    this.datePicker.api.open();
  }

  closeCalendar(): void {
    this.datePicker.api.close();
  }

  moveCalendarTo($event: Moment): void {
    this.datePicker.api.moveCalendarTo($event);
  }

  onLeftNav(change: INavEvent) {
    console.log('left nav', change);
  }

  onRightNav(change: INavEvent) {
    console.log('right nav', change);
  }

  opened() {
    console.log('opened');
  }

  closed() {
    console.log('closed');
  }

  onSelect(data: ISelectionEvent) {
    console.log(data);
  }

  log(item) {
    // console.log(item);
  }

  protected buildForm(format: string): FormControl {
    return new FormControl({value: this.date, disabled: this.disabled}, [
      this.required ? Validators.required : () => undefined,
      (control) => {
        return this.validationMinDate && this.config &&
        moment(control.value, this.config.format || format)
          .isBefore(this.validationMinDate)
          ? {minDate: 'minDate Invalid'} : undefined
      },
      control => this.validationMaxDate && this.config &&
      moment(control.value, this.config.format || format)
        .isAfter(this.validationMaxDate)
        ? {maxDate: 'maxDate Invalid'} : undefined
    ]);
  }
}