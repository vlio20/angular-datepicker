import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component';
import {ObCalendarComponent} from './dp-calendar/dp-calendar.component';
export {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component'

@NgModule({
  declarations: [
    DpDayPickerComponent,
    ObCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DpDayPickerComponent]
})

export class DpDatePickerModule {
}
