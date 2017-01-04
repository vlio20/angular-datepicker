import {Component, ViewChild} from '@angular/core';
import {DpDayPickerComponent} from '../dp-day-picker/dp-day-picker.component';
import {Moment} from 'moment'
import {IDayPickerConfig} from '../dp-day-picker/service/day-picker-config.model';

@Component({
  selector: 'dp-demo-root',
  templateUrl: './demo.component.html',
  entryComponents: [DpDayPickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('dayPicker') dayPicker: DpDayPickerComponent;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  date: Moment;

  material: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  validationMinDate: Moment;
  validationMaxDate: Moment;
  placeholder: string = 'Choose a date...';

  config: IDayPickerConfig = {
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    format: 'DD-MM-YYYY',
    monthFormat: 'MMM, YYYY',
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
    disableKeypress: false
  };

  configChanged() {
    this.config = Object.assign({}, this.config);
  };

  createCustomWeekDays() {
    this.config.weekdayNames = this.config.weekdayNames || {};
  }

  openCalendar() {
    this.dayPicker.api.open();
  }

  closeCalendar() {
    this.dayPicker.api.close();
  }
}
