import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {FormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../lib';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-time-inline-demo',
  templateUrl: './time-inline-demo.component.html',
  styleUrls: ['./time-inline-demo.component.less']
})
export class TimeInlineDemoComponent extends DateComponent implements OnInit {
  control: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'HH:mm:ss'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
