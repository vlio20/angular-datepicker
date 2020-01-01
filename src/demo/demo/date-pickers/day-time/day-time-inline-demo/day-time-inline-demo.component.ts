import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {FormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../lib';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-day-time-inline-demo',
  templateUrl: './day-time-inline-demo.component.html',
  styleUrls: ['./day-time-inline-demo.component.less']
})
export class DayTimeInlineDemoComponent extends DateComponent implements OnInit {
  control: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'DD-MM-YYYY HH:mm:ss'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
