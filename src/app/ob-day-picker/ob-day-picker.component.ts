import {Component, OnInit, Input, HostListener} from '@angular/core';
import {ObCalendarComponent} from '../ob-calendar/ob-calendar.component';
import * as moment from 'moment';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import {DayPickerService} from './service/day-picker.service';
import {IDayPickerConfig} from './service/day-picker-config.model';
import {ICalendarConfig} from '../ob-calendar/config/calendar-config.model';

@Component({
  selector: 'ob-day-picker',
  templateUrl: './ob-day-picker.component.html',
  styleUrls: ['./ob-day-picker.component.less'],
  entryComponents: [ObCalendarComponent],
  providers: [DayPickerService]
})
export class ObDayPickerComponent implements OnInit {
  moment = moment;
  isCalendarsShown: Observable<boolean>;
  showCalendars$ = new Subject();
  hideCalendars$ = new Subject();
  pickerConfig: IDayPickerConfig;
  calendars: ICalendarConfig[];
  @Input('config') userConfig: IDayPickerConfig;

  @HostListener('click', ['$event']) onClick(e: Event) {
    e.stopPropagation();
  }

  @HostListener('document:click', ['$event']) onBodyClick(e: Event) {
    this.hideCalendars$.next(e);
  }

  constructor(private dayPickerService: DayPickerService) {
    this.initListeners();
  }

  ngOnInit(): void {
    this.pickerConfig = this.dayPickerService.setConfig(this.userConfig);
    this.calendars = this.dayPickerService.generateCalendars();
  }

  initListeners() {
    this.initCalendarsViability();
  }

  initCalendarsViability() {
    this.isCalendarsShown = Observable
      .merge(this.showCalendars$.mapTo(true), this.hideCalendars$.mapTo(false))
      .startWith(false);
  }
}
