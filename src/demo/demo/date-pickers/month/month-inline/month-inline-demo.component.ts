import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {FormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../lib';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-month-inline',
  templateUrl: './month-inline-demo.component.html',
  styleUrls: ['./month-inline-demo.component.less']
})
export class MonthInlineDemoComponent extends DateComponent implements OnInit {
  control: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'MMM, YYYY'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
