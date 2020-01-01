import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../../common/date-component.component';
import {FormControl} from '@angular/forms';
import {IDatePickerConfig} from '../../../../../lib';
import {DEF_CONF} from '../../../common/conts/consts';

@Component({
  selector: 'dp-day-inline-demo',
  templateUrl: './day-inline-demo.component.html',
  styleUrls: ['./day-inline-demo.component.less']
})
export class DayInlineDemoComponent extends DateComponent implements OnInit {
  control: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'DD-MM-YYYY'
  };

  ngOnInit(): void {
    this.control = this.buildForm();
  }
}
