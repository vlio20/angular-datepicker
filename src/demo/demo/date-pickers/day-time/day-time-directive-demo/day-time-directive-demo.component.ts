import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {FormControl} from '@angular/forms';
import {DEF_CONF} from '../../../common/conts/consts';
import {IDatePickerConfig} from '../../../../../lib';

@Component({
  selector: 'dp-day-time-directive-demo',
  templateUrl: './day-time-directive-demo.component.html',
  styleUrls: ['./day-time-directive-demo.component.less']
})
export class DayTimeDirectiveDemoComponent extends DateComponent implements OnInit {
  control: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'DD-MM-YYYY HH:mm:ss'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
