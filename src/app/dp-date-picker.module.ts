import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component';
import {DpCalendarMonthComponent} from './dp-day-calendar/dp-day-calendar.component';
import {DpCalendarComponent} from './dp-calendar/dp-calendar.component';
import {DomHelper} from './common/services/dom-appender/dom-appender.service';
import {MonthPickerComponent} from './dp-month-picker/month-picker.component';
import { MonthCalendarComponent } from './dp-month-calendar/dp-month-calendar.component';
import {UtilsService} from './common/services/utils/utils.service';
export {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component'
export {DpCalendarMonthComponent} from './dp-day-calendar/dp-day-calendar.component';
export {DpCalendarComponent} from './dp-calendar/dp-calendar.component';

@NgModule({
  providers: [
    DomHelper,
    UtilsService
  ],
  declarations: [
    DpDayPickerComponent,
    DpCalendarMonthComponent,
    DpCalendarComponent,
    MonthPickerComponent,
    MonthCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DpDayPickerComponent, DpCalendarMonthComponent, DpCalendarComponent]
})
export class DpDatePickerModule {
}
