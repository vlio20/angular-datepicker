import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component';
import {ObCalendarComponent} from './ob-calendar/ob-calendar.component';
export {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component'

@NgModule({
  declarations: [
    ObDayPickerComponent,
    ObCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ObDayPickerComponent]
})

export class ObDatePickerModule {
}
