import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DomHelper} from './common/services/dom-appender/dom-appender.service';
import {UtilsService} from './common/services/utils/utils.service';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {DatePickerDirective} from './date-picker/date-picker.directive';
import {DayCalendarComponent} from './day-calendar/day-calendar.component';
import {MonthCalendarComponent} from './month-calendar/month-calendar.component';
import {YearCalendarComponent} from './year-calendar/year-calendar.component';
import {TimeSelectComponent} from './time-select/time-select.component';
import {CalendarNavComponent} from './calendar-nav/calendar-nav.component';
import {DayTimeCalendarComponent} from './day-time-calendar/day-time-calendar.component';
export {DatePickerComponent} from './date-picker/date-picker.component';
export {DatePickerDirective} from './date-picker/date-picker.directive';
export {DayCalendarComponent} from './day-calendar/day-calendar.component';
export {DayTimeCalendarComponent} from './day-time-calendar/day-time-calendar.component';
export {TimeSelectComponent} from './time-select/time-select.component';
export {MonthCalendarComponent} from './month-calendar/month-calendar.component';
export {YearCalendarComponent} from './year-calendar/year-calendar.component';


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
    YearCalendarComponent,
    CalendarNavComponent,
    TimeSelectComponent,
    DayTimeCalendarComponent
  ],
  entryComponents: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DatePickerComponent,
    DatePickerDirective,
    MonthCalendarComponent,
    YearCalendarComponent,
    DayCalendarComponent,
    TimeSelectComponent,
    DayTimeCalendarComponent
  ]
})
export class DpDatePickerModule {
}
