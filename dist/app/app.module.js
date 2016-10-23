"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var ob_day_picker_component_1 = require('./ob-day-picker/ob-day-picker.component');
var ob_calendar_component_1 = require('./ob-calendar/ob-calendar.component');
var ob_day_picker_component_2 = require('./ob-day-picker/ob-day-picker.component');
exports.ObDayPickerComponent = ob_day_picker_component_2.ObDayPickerComponent;
var ObDatePickerModule = (function () {
    function ObDatePickerModule() {
    }
    ObDatePickerModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                ob_day_picker_component_1.ObDayPickerComponent,
                ob_calendar_component_1.ObCalendarComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ObDatePickerModule);
    return ObDatePickerModule;
}());
exports.ObDatePickerModule = ObDatePickerModule;

//# sourceMappingURL=app.module.js.map
