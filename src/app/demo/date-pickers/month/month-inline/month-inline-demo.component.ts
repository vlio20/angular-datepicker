import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {UntypedFormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../../projects/ng2-date-picker/src/public-api';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-month-inline',
  templateUrl: './month-inline-demo.component.html',
  styleUrls: ['./month-inline-demo.component.less']
})
export class MonthInlineDemoComponent extends DateComponent implements OnInit {
  control: UntypedFormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'MMM, YYYY'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
