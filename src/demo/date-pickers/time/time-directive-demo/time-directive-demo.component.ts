import {Component} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-time-directive-demo',
  templateUrl: './time-directive-demo.component.html',
  styleUrls: ['./time-directive-demo.component.less']
})
export class TimeDirectiveDemoComponent extends DateComponent {
  control = new FormControl();
}
