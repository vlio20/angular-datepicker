import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {FormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../lib';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-time-demo',
  templateUrl: './time-demo.component.html',
  styleUrls: ['./time-demo.component.less']
})
export class TimeDemoComponent extends DateComponent implements OnInit {
  control: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'HH:mm:ss'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
