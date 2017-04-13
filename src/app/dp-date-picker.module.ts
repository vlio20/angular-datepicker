import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component';
import {DayCalendarComponent} from './day-calendar/day-calendar.component';
import {CalendarComponent} from './dp-calendar/dp-calendar.component';
import {DomHelper} from './common/services/dom-appender/dom-appender.service';
import {MonthCalendarComponent} from './month-calendar/month-calendar.component';
import {UtilsService} from './common/services/utils/utils.service';
import {CalendarNavComponent} from './calendar-nav/calendar-nav.component';
export {DpDayPickerComponent} from './dp-day-picker/dp-day-picker.component'
export {DayCalendarComponent} from './day-calendar/day-calendar.component';
export {CalendarComponent} from './dp-calendar/dp-calendar.component';

@NgModule({
  providers: [
    DomHelper,
    UtilsService
  ],
  declarations: [
    DpDayPickerComponent,
    DayCalendarComponent,
    CalendarComponent,
    MonthCalendarComponent,
    CalendarNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DpDayPickerComponent, MonthCalendarComponent, DayCalendarComponent, CalendarComponent]
})
export class DpDatePickerModule {
}
