import {INavEvent} from '../../../../projects/ng2-date-picker/src/lib/common/models/navigation-event.model';
import {
  DatePickerComponent,
  DatePickerDirective,
} from '../../../../projects/ng2-date-picker/src/public-api';
import {Directive, ViewChild} from '@angular/core';
import {UntypedFormControl, ValidatorFn, Validators} from '@angular/forms';
import dayjs, {Dayjs} from 'dayjs';

@Directive()
export abstract class DateComponent {
  @ViewChild('dateComponent') dateComponent: DatePickerComponent;
  @ViewChild(DatePickerDirective) dateDirective: DatePickerDirective;

  ready: boolean = true;
  control: UntypedFormControl;

  abstract config;
  date = dayjs();
  material: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  validationMinDate: Dayjs;
  validationMaxDate: Dayjs;
  validationMinTime: Dayjs;
  validationMaxTime: Dayjs;
  placeholder: string = 'Choose a date...';
  displayDate: Dayjs | string;
  locale: string = dayjs.locale();

  displayDateChanged(displayDate: Dayjs | string): void {
    this.displayDate = displayDate;
  }

  onDisplayDateChange(displayDate: Dayjs | string): void {
    this.displayDate = displayDate;
  }

  onMaterialThemeChange(material: boolean): void {
    this.material = material;
  }

  onDisabledChange(disabled: boolean): void {
    this.disabled = disabled;
    disabled ? this.control.disable() : this.control.enable();
  }

  onRequireValidationChange(required: boolean): void {
    this.required = required;
    this.control.setValidators(this.getValidations());
    this.control.updateValueAndValidity();
  }

  onMinValidationChange($event: Dayjs): void {
    this.validationMinDate = $event;
    this.control.setValidators(this.getValidations());
    this.control.updateValueAndValidity();
  }

  onMaxValidationChange($event: Dayjs): void {
    this.validationMaxDate = $event;
    this.control.setValidators(this.getValidations());
    this.control.updateValueAndValidity();
  }

  onMinTimeValidationChange($event: Dayjs): void {
    this.validationMinTime = $event;
    this.control.setValidators(this.getValidations());
    this.control.updateValueAndValidity();
  }

  onMaxTimeValidationChange($event: Dayjs): void {
    this.validationMaxTime = $event;
    this.control.setValidators(this.getValidations());
    this.control.updateValueAndValidity();
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
    (this.dateComponent || this.dateDirective).api.open();
  }

  closeCalendar(): void {
    (this.dateComponent || this.dateDirective).api.close();
  }

  moveCalendarTo($event: Dayjs): void {
    (this.dateComponent || this.dateDirective).api.moveCalendarTo($event);
  }

  onLeftNav(change: INavEvent) {
    console.info('left nav', change);
  }

  onRightNav(change: INavEvent) {
    console.info('right nav', change);
  }

  opened() {
    console.info('opened');
  }

  closed() {
    console.info('closed');
  }

  onSelect(data: any) {
    console.info(data);
  }

  log(item) {
    // console.info(item);
  }

  onLocaleChange(locale: string): void {
    this.ready = false;
    import(`dayjs/locale/${locale}`).then(() => {
      this.locale = locale;
      dayjs.locale(locale);
      this.ready = true;
    });
  }

  protected buildForm(): UntypedFormControl {
    return new UntypedFormControl({value: this.date, disabled: this.disabled}, this.getValidations());
  }

  private getValidations(): ValidatorFn[] {
    return [
      this.required ? Validators.required : () => undefined,
      (control) => {
        return this.validationMinDate && this.config &&
        dayjs(control.value, this.config.format)
          .isBefore(this.validationMinDate)
          ? {minDate: 'minDate Invalid'} : undefined
      },
      (control) => {
        return this.validationMaxDate && this.config &&
        dayjs(control.value, this.config.format)
          .isAfter(this.validationMaxDate)
          ? {maxDate: 'maxDate Invalid'} : undefined
      },
      (control) => {
        return this.validationMinTime && this.config &&
        dayjs(control.value, this.config.format)
          .isBefore(this.validationMinTime)
          ? {minDate: 'minDate Invalid'} : undefined
      },
      (control) => {
        return this.validationMaxTime && this.config &&
        dayjs(control.value, this.config.format)
          .isAfter(this.validationMaxTime)
          ? {maxDate: 'maxDate Invalid'} : undefined
      }
    ].filter(Boolean);
  }
}
