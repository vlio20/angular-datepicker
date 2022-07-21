import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {UntypedFormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../../projects/ng2-date-picker/src/public-api';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-day-time-demo',
  templateUrl: './day-time-demo.component.html',
  styleUrls: ['./day-time-demo.component.less']
})
export class DayTimeDemoComponent extends DateComponent implements OnInit {
  control: UntypedFormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'DD-MM-YYYY HH:mm:ss'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
