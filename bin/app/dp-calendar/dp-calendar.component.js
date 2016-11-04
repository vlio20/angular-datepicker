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
var calendar_service_1 = require('./service/calendar.service');
var ObCalendarComponent = (function () {
    function ObCalendarComponent(calendarService) {
        this.calendarService = calendarService;
        this.dateClicked = new core_1.EventEmitter();
    }
    ObCalendarComponent.prototype.ngOnInit = function () {
        this.weeks = this.calendarService.generateMonthArray(this.config.firstDayOfWeek, this.config.month, this.selected);
        this.weekdays = this.calendarService.generateWeekdays(this.config.firstDayOfWeek, this.config.weekdayNames);
    };
    ObCalendarComponent.prototype.ngOnChanges = function (changes) {
        var selected = changes.selected;
        if (selected && !selected.isFirstChange()) {
            this.weeks = this.calendarService.generateMonthArray(this.config.firstDayOfWeek, this.config.month, this.selected);
        }
    };
    ObCalendarComponent.prototype.isDisabledDay = function (day) {
        return this.calendarService.isDateDisabled(day, this.config);
    };
    ObCalendarComponent.prototype.dateClick = function (day) {
        this.dateClicked.emit({ day: day });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObCalendarComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObCalendarComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output('on-change'), 
        __metadata('design:type', Object)
    ], ObCalendarComponent.prototype, "dateClicked", void 0);
    ObCalendarComponent = __decorate([
        core_1.Component({
            selector: 'dp-calendar',
            templateUrl: './dp-calendar.component.html',
            styleUrls: ['./dp-calendar.component.less'],
            providers: [calendar_service_1.CalendarService]
        }), 
        __metadata('design:paramtypes', [calendar_service_1.CalendarService])
    ], ObCalendarComponent);
    return ObCalendarComponent;
}());
exports.ObCalendarComponent = ObCalendarComponent;

//# sourceMappingURL=dp-calendar.component.js.map
