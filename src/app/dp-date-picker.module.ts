import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component';
import {DpCalendarComponent} from './dp-calendar/dp-calendar.component';
export {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component'

@NgModule({
  declarations: [
    DpDayPickerComponent,
    DpCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DpDayPickerComponent, DpCalendarComponent]
})

export class DpDatePickerModule {
}
