import {Component, OnInit, Input} from '@angular/core';
import {Moment} from 'moment';
import {CalendarService} from './service/calendar.service';
import {ICalendarConfig} from './config/calendar-config.model';

@Component({
  selector: 'ob-calendar',
  templateUrl: './ob-calendar.component.html',
  styleUrls: ['./ob-calendar.component.less'],
  providers: [CalendarService]
})
export class ObCalendarComponent implements OnInit {
  @Input() config: ICalendarConfig;
  monthWeeks: Moment[][];

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.generateMonthArray(this.config.firstDayOfWeek, this.config.month);
  }
}
