import {Component, OnInit, Input} from '@angular/core';
import {CalendarService} from './service/calendar.service';
import {ICalendarConfig} from './config/calendar-config.model';
import {ICalendarDay} from './config/day.model';

@Component({
  selector: 'ob-calendar',
  templateUrl: './ob-calendar.component.html',
  styleUrls: ['./ob-calendar.component.less'],
  providers: [CalendarService]
})
export class ObCalendarComponent implements OnInit {
  @Input() config: ICalendarConfig;
  weeks: ICalendarDay[][];
  weekdays: string[];

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.weeks = this.calendarService.generateMonthArray(this.config.firstDayOfWeek, this.config.month);
    this.weekdays = this.calendarService.generateWeekdays(this.config.firstDayOfWeek, this.config.weekdayNames);
  }
}
