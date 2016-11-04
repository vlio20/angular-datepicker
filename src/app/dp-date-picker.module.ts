import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ObDayPickerComponent} from './dp-day-picker/dp-day-picker.component';
import {ObCalendarComponent} from './dp-calendar/dp-calendar.component';
export {ObDayPickerComponent} from './dp-day-picker/dp-day-picker.component'

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
