import {Component, OnInit, Input} from '@angular/core';
import {ObCalendarComponent} from '../ob-calendar/ob-calendar.component';
import * as moment from 'moment';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import {ConfigService} from './config-service/config.service';
import {IDayPickerConfig} from './config-service/day-picker-config.model';

@Component({
  selector: 'ob-day-picker',
  templateUrl: './ob-day-picker.component.html',
  styleUrls: ['./ob-day-picker.component.less'],
  entryComponents: [ObCalendarComponent],
  providers: [ConfigService],
  host: {
    '(click)': 'preventCalendarsClosing($event)',
    '(document:click)': 'hideCalendars$.next($event)',
  },
})
export class ObDayPickerComponent implements OnInit {
  moment = moment;
  isCalendarsShown: Observable<boolean>;
  showCalendars$ = new Subject();
  hideCalendars$ = new Subject();
  pickerConfig: IDayPickerConfig;

  @Input('config') userConfig: IDayPickerConfig;

  constructor(private configService: ConfigService) {
    this.initListeners();
  }

  ngOnInit(): void {
    this.pickerConfig = this.configService.setConfig(this.userConfig);
  }

  initListeners() {
    this.initCalendarsViability();
  }

  initCalendarsViability() {
    this.isCalendarsShown = Observable
      .merge(this.showCalendars$.mapTo(true), this.hideCalendars$.mapTo(false))
      .startWith(false);
  }

  preventCalendarsClosing(e: Event) {
    e.stopPropagation();
  }
}
