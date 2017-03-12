import {Component, ViewChild, OnInit} from '@angular/core';
import {DpDayPickerComponent} from '../../dp-day-picker/dp-day-picker.component';
import {Moment} from 'moment';
import * as moment from 'moment';
import {IDayPickerConfig} from '../../dp-day-picker/service/day-picker-config.model';

@Component({
  selector: 'dp-test-page',
  templateUrl: './multiselect-test.component.html',
  styleUrls: ['./multiselect-test.component.less']
})
export class MultiselectTestComponent implements OnInit {
  @ViewChild('dayPicker') dayPicker: DpDayPickerComponent;
  demoFormat = 'DD-MM-YYYY';
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  stringDateBlank: string;
  stringCsvDateBlank: string;
  momentDateBlank: Moment;
  momentArrayDateBlank: Moment[];

  stringDate: string = '06-06-2017';
  stringCsvDate: string = '06-06-2017, 03-02-2017';
  stringArrayDate: string[] = ['06-06-2017', '03-02-2017'];
  momentDate: Moment = moment();
  momentArrayDate: Moment[] = [moment(), moment().add(3, 'days')];

  stringDateConflictType: string = '06-06-2017';
  stringArrayDateConflictType: string[] = ['06-06-2017', '03-02-2017'];
  momentDateConflictType: Moment = moment();
  momentArrayDateConflictType: Moment[] = [moment(), moment().add(3, 'days')];

  stringDateConflictNumber: string = '06-06-2017';
  stringArrayDateConflictNumber: string[] = ['06-06-2017', '03-02-2017'];
  momentDateConflictNumber: Moment = moment();
  momentArrayDateConflictNumber: Moment[] = [moment(), moment().add(3, 'days')];

  material: boolean = true;
  required: boolean = false;
  disabled: boolean = false;
  validationMinDate: Moment;
  validationMaxDate: Moment;
  placeholder: string = 'Choose a date...';

  baseConfig: IDayPickerConfig = {
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    format: 'DD-MM-YYYY',
    monthFormat: 'MMM, YYYY',
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
  };

  singleStringConfig: IDayPickerConfig = this.baseConfig;
  multipleStringConfig: IDayPickerConfig = this.baseConfig;
  singleMomentConfig: IDayPickerConfig = this.baseConfig;
  multipleMomentConfig: IDayPickerConfig = this.baseConfig;

  ngOnInit() {
    this.configChanged();
  }

  configChanged() {
    this.singleStringConfig = Object.assign({}, this.baseConfig, { allowMultiSelect: false, userValueType: 'string' });
    this.multipleStringConfig = Object.assign({}, this.baseConfig, { allowMultiSelect: true, userValueType: 'string' });
    this.singleMomentConfig = Object.assign({}, this.baseConfig, { allowMultiSelect: false, userValueType: 'object' });
    this.multipleMomentConfig = Object.assign({}, this.baseConfig, { allowMultiSelect: true, userValueType: 'object' });
  }

  createCustomWeekDays() {
    this.baseConfig.weekdayNames = this.baseConfig.weekdayNames || {};
    this.configChanged();
  }

  log(item) {
    console.log(item);
  }
}
