import {Component, ViewChild, ElementRef} from '@angular/core';
import * as moment from 'moment';
import {ObDayPickerComponent} from '../ob-day-picker/ob-day-picker.component';
import {Moment} from 'moment'
import {IDayPickerConfig} from '../ob-day-picker/service/day-picker-config.model';

@Component({
  selector: 'ob-demo-root',
  templateUrl: './demo.component.html',
  entryComponents: [ObDayPickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('dayPicker') dayPicker: ObDayPickerComponent;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  date: Moment;

  material: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  validationMinDate: Moment;
  validationMaxDate: Moment;
  placeholder: string = '';

  config: IDayPickerConfig = {
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    format: 'DD-MM-YYYY',
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
}
