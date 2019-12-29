import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-day-time-directive-demo',
  templateUrl: './day-time-directive-demo.component.html',
  styleUrls: ['./day-time-directive-demo.component.less']
})
export class DayTimeDirectiveDemoComponent extends DateComponent implements OnInit {
  control: FormControl;

  ngOnInit(): void {
    this.control = this.buildForm('DD-MM-YYYY HH:mm:ss');
  }
}
