import {DatePickerComponent} from '../../projects/ng2-date-picker/src/lib/date-picker/date-picker.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DemoComponent} from './demo/demo.component';
import {DemoRootComponent} from './demo-root.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DpDatePickerModule} from '../../projects/ng2-date-picker/src/lib/date-picker.module';
import {GaService} from './demo/common/services/ga/ga.service';
import {ConfigFormComponent} from './demo/config-form/config-form.component';
import {DayTimeDemoComponent} from './demo/date-pickers/day-time/day-time-demo/day-time-demo.component';
import {DayTimeInlineDemoComponent} from './demo/date-pickers/day-time/day-time-inline-demo/day-time-inline-demo.component';
import {DayTimeDirectiveDemoComponent} from './demo/date-pickers/day-time/day-time-directive-demo/day-time-directive-demo.component';
import {DayDemoComponent} from './demo/date-pickers/day/day-demo/day-demo.component';
import {DayInlineDemoComponent} from './demo/date-pickers/day/day-inline-demo/day-inline-demo.component';
import {DayDirectiveDemoComponent} from './demo/date-pickers/day/day-directive-demo/day-directive-demo.component';
import {MonthDemoComponent} from './demo/date-pickers/month/month-demo/month-demo.component';
import {MonthDirectiveDemoComponent} from './demo/date-pickers/month/month-directive-demo/month-directive-demo.component';
import {MonthInlineDemoComponent} from './demo/date-pickers/month/month-inline/month-inline-demo.component';
import {TimeDemoComponent} from './demo/date-pickers/time/time-demo/time-demo.component';
import {TimeInlineDemoComponent} from './demo/date-pickers/time/time-inline-demo/time-inline-demo.component';
import {TimeDirectiveDemoComponent} from './demo/date-pickers/time/time-directive-demo/time-directive-demo.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    RouterModule.forRoot([
      {
        path: '',
        component: DemoComponent,
        children: [
          {
            path: '',
            redirectTo: 'daytimePicker',
            pathMatch: 'full'
          },
          {
            path: 'daytimePicker',
            component: DayTimeDemoComponent
          },
          {
            path: 'daytimeInline',
            component: DayTimeInlineDemoComponent
          },
          {
            path: 'daytimeDirective',
            component: DayTimeDirectiveDemoComponent
          },
          {
            path: 'dayPicker',
            component: DayDemoComponent
          },
          {
            path: 'dayInline',
            component: DayInlineDemoComponent
          },
          {
            path: 'dayDirective',
            component: DayDirectiveDemoComponent
          },
          {
            path: 'monthPicker',
            component: MonthDemoComponent
          },
          {
            path: 'monthInline',
            component: MonthInlineDemoComponent
          },
          {
            path: 'monthDirective',
            component: MonthDirectiveDemoComponent
          },
          {
            path: 'timePicker',
            component: TimeDemoComponent
          },
          {
            path: 'timeInline',
            component: TimeInlineDemoComponent
          },
          {
            path: 'timeDirective',
            component: TimeDirectiveDemoComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ], {})
  ],
  declarations: [
    DemoRootComponent,
    DemoComponent,
    ConfigFormComponent,
    DayTimeDemoComponent,
    DayTimeInlineDemoComponent,
    DayTimeDirectiveDemoComponent,
    DayDemoComponent,
    DayInlineDemoComponent,
    DayDirectiveDemoComponent,
    MonthDemoComponent,
    MonthInlineDemoComponent,
    MonthDirectiveDemoComponent,
    TimeDemoComponent,
    TimeInlineDemoComponent,
    TimeDirectiveDemoComponent
  ],
  providers: [GaService],
  bootstrap: [DemoRootComponent]
})
export class DemoModule {
}
