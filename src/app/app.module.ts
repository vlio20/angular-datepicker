import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {ObDayPickerComponent} from './ob-day-picker/ob-day-picker.component';
import {ObCalendarComponent} from './ob-calendar/ob-calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    ObDayPickerComponent,
    ObCalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
