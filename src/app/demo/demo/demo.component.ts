import {Component, ViewChild, HostListener} from '@angular/core';
import {DpDayPickerComponent} from '../../dp-day-picker/dp-day-picker.component';
import {Moment} from 'moment';
import {IDayPickerConfig} from '../../dp-day-picker/day-picker-config.model';
import debounce from '../../common/decorators/decorators';

@Component({
  selector: 'dp-demo',
  templateUrl: './demo.component.html',
  entryComponents: [DpDayPickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('dayPicker') dayPicker: DpDayPickerComponent;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  pickerMode = 'popup';

  date: Moment;
  dates: Moment[] = [];

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
    allowMultiSelect: false,
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    userValueType: 'string',
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
    appendTo: document.body,
    drops: 'down',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false
  };
  isAtTop: boolean = true;

  @HostListener('document:scroll')
  @debounce(100)
  updateIsAtTop() {
    this.isAtTop = document.body.scrollTop === 0;
  }

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

  log(item) {
    console.log(item);
  }
}
