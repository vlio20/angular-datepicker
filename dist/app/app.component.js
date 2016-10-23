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
var ob_day_picker_component_1 = require('./ob-day-picker/ob-day-picker.component');
var moment = require('moment');
var AppComponent = (function () {
    function AppComponent() {
        this.date = null;
        this.minDate = moment().subtract(10, 'day');
        this.minConf = {};
        this.dayPickerConfig = {
            firstDayOfWeek: 'mo',
            calendarsAmount: 2,
            // min: moment().subtract(1, 'month'),
            // max: moment().add(1, 'month'),
            placeholder: 'Set a date'
        };
    }
    AppComponent.prototype.changeDate = function () {
        this.date = moment().add(1, 'day');
    };
    AppComponent.prototype.togglePicker = function (state) {
        state ? this.dayPicker.api.open() : this.dayPicker.api.close();
    };
    __decorate([
        core_1.ViewChild('dayPicker'), 
        __metadata('design:type', ob_day_picker_component_1.ObDayPickerComponent)
    ], AppComponent.prototype, "dayPicker", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: "\n    <form #form=\"ngForm\">\n      <ob-day-picker name=\"test\"\n                     #test=\"ngModel\"\n                     #dayPicker\n                     [(ngModel)]=\"date\"\n                     [config]=\"dayPickerConfig\"\n                     required\n                     [minDate]=\"minDate\">\n      </ob-day-picker>\n\n      <button (click)=\"changeDate()\">Change Date</button>\n      <button (click)=\"togglePicker(true)\">Open Picker</button>\n      <button (click)=\"togglePicker(false)\">Close Picker</button>\n\n      <ob-day-picker name=\"min\"\n                     #min=\"ngModel\"\n                     [(ngModel)]=\"minDate\"\n                     [config]=\"minConf\">\n      </ob-day-picker>\n\n      <span>{{date}}</span>\n\n      <div *ngIf=\"test.errors && test.errors.required\">required</div>\n      <div *ngIf=\"test.errors && test.errors.format\">format invalid</div>\n      <div *ngIf=\"test.errors && test.errors.minDate\">minDate invalid</div>\n      <div *ngIf=\"test.errors && test.errors.maxDate\">maxDate invalid</div>\n    </form>\n  ",
            entryComponents: [ob_day_picker_component_1.ObDayPickerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
