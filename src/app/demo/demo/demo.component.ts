import {DatePickerDirective} from '../../date-picker/date-picker.directive';
import {Component, ViewChild, HostListener} from '@angular/core';
import {DatePickerComponent} from '../../date-picker/date-picker.component';
import {Moment} from 'moment';
import {IDatePickerConfig} from '../../date-picker/date-picker-config.model';
import debounce from '../../common/decorators/decorators';

@Component({
  selector: 'dp-demo',
  templateUrl: './demo.component.html',
  entryComponents: [DatePickerComponent],
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  @ViewChild('datePicker') datePicker: DatePickerComponent;
  @ViewChild('dateDirectivePicker') dateDirectivePicker: DatePickerDirective;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  pickerMode = 'dayPicker';

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
    format: 'DD-MM-YYYY',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
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
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM'
  };
  isAtTop: boolean = true;

  @HostListener('document:scroll')
  @debounce(100)
  updateIsAtTop() {
    this.isAtTop = document.body.scrollTop === 0;
  }

  modeChanged() {
    this.config.hideInputContainer = false;
    this.config.inputElementContainer = undefined;
  }

  configChanged() {
    this.config = {...this.config};
  };

  createCustomWeekDays() {
    this.config.weekdayNames = this.config.weekdayNames || {};
  }

  openCalendar() {
    (this.datePicker || this.dateDirectivePicker).api.open();
  }

  closeCalendar() {
    (this.datePicker || this.dateDirectivePicker).api.close();
  }

  log(item) {
    console.log(item);
  }
}
