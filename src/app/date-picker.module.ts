import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DomHelper} from './common/services/dom-appender/dom-appender.service';
import {UtilsService} from './common/services/utils/utils.service';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {DatePickerDirective} from './date-picker/date-picker.directive';
import {DayCalendarComponent} from './day-calendar/day-calendar.component';
import {MonthCalendarComponent} from './month-calendar/month-calendar.component';
import {TimeSelectComponent} from './time-select/time-select.component';
import {TimeSelectService} from './time-select/time-select.service';
import {CalendarNavComponent} from './calendar-nav/calendar-nav.component';
export {DatePickerComponent} from './date-picker/date-picker.component';
export {DatePickerDirective} from './date-picker/date-picker.directive';
export {DayCalendarComponent} from './day-calendar/day-calendar.component';

@NgModule({
  providers: [
    DomHelper,
    UtilsService,
    TimeSelectService
  ],
  declarations: [
    DatePickerComponent,
    DatePickerDirective,
    DayCalendarComponent,
    MonthCalendarComponent,
    CalendarNavComponent,
    TimeSelectComponent,
  ],
  entryComponents: [
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DatePickerComponent, DatePickerDirective, MonthCalendarComponent, DayCalendarComponent, TimeSelectComponent]
})
export class DpDatePickerModule {
}
