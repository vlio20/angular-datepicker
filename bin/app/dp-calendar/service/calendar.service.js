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
var moment = require('moment');
var utils_service_1 = require('../../common/services/utils/utils.service');
var CalendarService = (function () {
    function CalendarService() {
        this.DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
    }
    CalendarService.prototype.generateDaysIndexMap = function (firstDayOfWeek) {
        var firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[index] = day;
            return map;
        }, {});
    };
    CalendarService.prototype.generateDaysMap = function (firstDayOfWeek) {
        var firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[day] = index;
            return map;
        }, {});
    };
    CalendarService.prototype.generateMonthArray = function (firstDayOfWeek, dayInMonth, selectedDay) {
        if (selectedDay === void 0) { selectedDay = null; }
        var monthArray = [];
        var firstDayOfMonth = dayInMonth.clone().startOf('month');
        var firstDayOfWeekIndex = this.DAYS.indexOf(firstDayOfWeek);
        var firstDayOfBoard = firstDayOfMonth;
        while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
            firstDayOfBoard.subtract(1, 'day');
        }
        var current = firstDayOfBoard.clone();
        var daysOfCalendar = utils_service_1.UtilsService.createArray(42).reduce(function (array) {
            array.push({
                date: current.clone(),
                selected: current.isSame(selectedDay, 'day'),
                currentMonth: current.isSame(dayInMonth, 'month'),
                prevMonth: current.isSame(dayInMonth.clone().subtract(1, 'month'), 'month'),
                nextMonth: current.isSame(dayInMonth.clone().add(1, 'month'), 'month'),
                currentDay: current.isSame(moment(), 'day')
            });
            current.add(1, 'd');
            return array;
        }, []);
        daysOfCalendar.forEach(function (day, index) {
            var weekIndex = Math.floor(index / 7);
            if (!monthArray[weekIndex]) {
                monthArray.push([]);
            }
            monthArray[weekIndex].push(day);
        });
        return monthArray;
    };
    CalendarService.prototype.generateWeekdays = function (firstDayOfWeek, weekdayNames) {
        var weekdays = [];
        var daysMap = this.generateDaysMap(firstDayOfWeek);
        for (var dayKey in daysMap) {
            if (daysMap.hasOwnProperty(dayKey)) {
                weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
            }
        }
        return weekdays;
    };
    CalendarService.prototype.isDateDisabled = function (day, config) {
        if (config.isDisabledCallback) {
            return config.isDisabledCallback(day.date);
        }
        if (config.min && day.date.isBefore(config.min, 'd')) {
            return true;
        }
        if (config.max && day.date.isAfter(config.max, 'd')) {
            return true;
        }
        return false;
    };
    CalendarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;

//# sourceMappingURL=calendar.service.js.map
