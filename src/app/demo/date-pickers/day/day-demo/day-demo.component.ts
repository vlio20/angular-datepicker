import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {UntypedFormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../../projects/ng2-date-picker/src/public-api';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-day-demo',
  templateUrl: './day-demo.component.html',
  styleUrls: ['./day-demo.component.less']
})
export class DayDemoComponent extends DateComponent implements OnInit {
  control: UntypedFormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'DD-MM-YYYY'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}

