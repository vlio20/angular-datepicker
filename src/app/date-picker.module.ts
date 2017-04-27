import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {DatePickerDirective} from './date-picker/date-picker.directive';
import {DayCalendarComponent} from './day-calendar/day-calendar.component';
import {DomHelper} from './common/services/dom-appender/dom-appender.service';
import {MonthCalendarComponent} from './month-calendar/month-calendar.component';
import {UtilsService} from './common/services/utils/utils.service';
import {CalendarNavComponent} from './calendar-nav/calendar-nav.component';
export {DatePickerComponent} from './date-picker/date-picker.component';
export {DatePickerDirective} from './date-picker/date-picker.directive';
export {DayCalendarComponent} from './day-calendar/day-calendar.component';

@NgModule({
  providers: [
    DomHelper,
    UtilsService
  ],
  declarations: [
    DatePickerComponent,
    DatePickerDirective,
    DayCalendarComponent,
    MonthCalendarComponent,
    CalendarNavComponent
  ],
  entryComponents: [
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DatePickerComponent, DatePickerDirective, MonthCalendarComponent, DayCalendarComponent]
})
export class DpDatePickerModule {
}
