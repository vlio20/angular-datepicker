import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-day-time-demo',
  templateUrl: './day-time-demo.component.html',
  styleUrls: ['./day-time-demo.component.less']
})
export class DayTimeDemoComponent extends DateComponent implements OnInit {
  control: FormControl;

  ngOnInit(): void {
    this.control = this.buildForm('DD-MM-YYYY HH:mm:ss');
  }
}
