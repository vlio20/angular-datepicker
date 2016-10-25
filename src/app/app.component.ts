import {Component, ViewChild} from '@angular/core';
import {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component';
import {IDayPickerConfig} from './ob-day-picker/service/day-picker-config.model';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  entryComponents: [ObDayPickerComponent]
})

export class AppComponent {
  @ViewChild('dayPicker') dayPicker: ObDayPickerComponent;

  date = null;
  minDate = moment().subtract(10, 'day');
  disabled = false;
  dayPickerConfig: IDayPickerConfig = {
    firstDayOfWeek: 'mo',
    calendarsAmount: 3,
    // min: moment().subtract(1, 'month'),
    // max: moment().add(1, 'month'),
  };

  changeDate() {
    this.date = moment().add(1, 'day');
  }

  togglePicker(state: boolean) {
    state ? this.dayPicker.api.open() : this.dayPicker.api.close();
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }
}
