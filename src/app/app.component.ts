import {Component} from '@angular/core';
import {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component';
import {IDayPickerConfig} from './ob-day-picker/config-service/day-picker-config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  entryComponents: [ObDayPickerComponent]
})

export class AppComponent {
  dayPickerConfig: IDayPickerConfig = {
    firstDayOfWeek: 'mo'
  };
}
