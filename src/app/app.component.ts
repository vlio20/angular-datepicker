import {Component} from '@angular/core';
import {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component';
import {IDayPickerConfig} from './ob-day-picker/service/day-picker-config.model';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  entryComponents: [ObDayPickerComponent]
})

export class AppComponent {
  date = moment();
  dayPickerConfig: IDayPickerConfig = {
    firstDayOfWeek: 'mo',
    calendarsAmount: 2
  };

  changeDate() {
    this.date = moment().add(1, 'd');
  }
}
