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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var dp_day_picker_component_1 = require('./dp-day-picker/dp-day-picker.component');
var dp_calendar_component_1 = require('./dp-calendar/dp-calendar.component');
var dp_day_picker_component_2 = require('./dp-day-picker/dp-day-picker.component');
exports.ObDayPickerComponent = dp_day_picker_component_2.ObDayPickerComponent;
var ObDatePickerModule = (function () {
    function ObDatePickerModule() {
    }
    ObDatePickerModule = __decorate([
        core_1.NgModule({
            declarations: [
                dp_day_picker_component_1.ObDayPickerComponent,
                dp_calendar_component_1.ObCalendarComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            exports: [dp_day_picker_component_1.ObDayPickerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ObDatePickerModule);
    return ObDatePickerModule;
}());
exports.ObDatePickerModule = ObDatePickerModule;

//# sourceMappingURL=dp-date-picker.module.js.map
