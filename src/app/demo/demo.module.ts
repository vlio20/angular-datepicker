import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {DpDatePickerModule} from '../dp-date-picker.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DpDatePickerModule
  ],
  declarations: [
    DemoComponent
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
