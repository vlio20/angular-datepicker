import {Component, OnInit} from '@angular/core';
import {DateComponent} from '../../common/date-component.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dp-day-directive-demo',
  templateUrl: './day-directive-demo.component.html',
  styleUrls: ['./day-directive-demo.component.less']
})
export class DayDirectiveDemoComponent extends DateComponent implements OnInit {
  control: FormControl;

  ngOnInit(): void {
    this.control = this.buildForm('DD-MM-YYYY');
  }
}
