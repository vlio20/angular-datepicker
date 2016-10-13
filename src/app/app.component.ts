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

  date = moment();
  dayPickerConfig: IDayPickerConfig = {
    firstDayOfWeek: 'mo',
    calendarsAmount: 2,
    min: moment().subtract(1, 'd'),
    max: moment().add(1, 'd')
  };

  changeDate() {
    this.date = moment().add(1, 'd');
  }

  togglePicker(state: boolean) {
    state ? this.dayPicker.api.open() : this.dayPicker.api.close();
  }
}
