import {DatePickerComponent} from '../date-picker/date-picker.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DemoComponent} from './demo/demo.component';
import {DemoRootComponent} from './demo-root.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DpDatePickerModule} from '../date-picker.module';
import {GaService} from './services/ga/ga.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    RouterModule.forRoot([
      {
        path: '**',
        component: DemoComponent
      }
    ])
  ],
  declarations: [
    DemoRootComponent,
    DemoComponent
  ],
  entryComponents: [
    DatePickerComponent
  ],
  providers: [GaService],
  bootstrap: [DemoRootComponent]
})
export class DemoModule {
}
