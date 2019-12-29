import {Component} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-month-directive-demo',
  templateUrl: './month-directive-demo.component.html',
  styleUrls: ['./month-directive-demo.component.less']
})
export class MonthDirectiveDemoComponent extends DateComponent {
  control = new FormControl();
}
