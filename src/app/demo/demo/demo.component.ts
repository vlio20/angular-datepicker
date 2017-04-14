import {Component, ViewChild, HostListener} from '@angular/core';
import {DpDayPickerComponent} from '../../date-picker/date-picker.component';
import {Moment} from 'moment';
import {IDatePickerConfig} from '../../date-picker/date-picker-config.model';
import debounce from '../../common/decorators/decorators';
import {DayCalendarComponent} from '../../day-calendar/day-calendar.component';

@Component({
  selector: 'dp-demo',
  templateUrl: './demo.component.html',
  entryComponents: [DpDayPickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('dayPicker') dayPicker: DayCalendarComponent;
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

  config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    format: 'DD-MM-YYYY',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
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
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true
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
    // this.dayPicker.api.open();
  }

  closeCalendar() {
    // this.dayPicker.api.close();
  }

  log(item) {
    console.log(item);
  }
}
