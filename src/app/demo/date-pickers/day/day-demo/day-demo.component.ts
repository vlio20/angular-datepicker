import {Component} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-day-demo',
  templateUrl: './day-demo.component.html',
  styleUrls: ['./day-demo.component.less']
})
export class DayDemoComponent extends DateComponent {
  control = new FormControl();
}

