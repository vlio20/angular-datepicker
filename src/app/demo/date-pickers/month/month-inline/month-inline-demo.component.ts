import {Component} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-month-inline',
  templateUrl: './month-inline-demo.component.html',
  styleUrls: ['./month-inline-demo.component.less']
})
export class MonthInlineDemoComponent extends DateComponent {
  control = new FormControl();
}
