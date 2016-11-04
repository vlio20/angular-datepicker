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
var dp_day_picker_component_1 = require('../dp-day-picker/dp-day-picker.component');
var DemoComponent = (function () {
    function DemoComponent() {
        this.demoFormat = 'DD-MM-YYYY';
        this.DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.material = true;
        this.required = false;
        this.disabled = false;
        this.placeholder = '';
        this.config = {
            firstDayOfWeek: 'su',
            calendarsAmount: 1,
            format: 'DD-MM-YYYY',
            monthFormat: 'MMM, YYYY',
            closeOnSelect: true,
            closeOnSelectDelay: 100,
            weekdayNames: {
                su: 'sun',
                mo: 'mon',
                tu: 'tue',
                we: 'wed',
                th: 'thu',
                fr: 'fri',
                sa: 'sat'
            },
            disableKeypress: false
        };
    }
    DemoComponent.prototype.configChanged = function () {
        this.config = Object.assign({}, this.config);
    };
    ;
    DemoComponent.prototype.createCustomWeekDays = function () {
        this.config.weekdayNames = this.config.weekdayNames || {};
    };
    __decorate([
        core_1.ViewChild('dayPicker'), 
        __metadata('design:type', dp_day_picker_component_1.ObDayPickerComponent)
    ], DemoComponent.prototype, "dayPicker", void 0);
    DemoComponent = __decorate([
        core_1.Component({
            selector: 'dp-demo-root',
            templateUrl: './demo.component.html',
            entryComponents: [dp_day_picker_component_1.ObDayPickerComponent],
            styleUrls: ['./demo.component.less']
        }), 
        __metadata('design:paramtypes', [])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;

//# sourceMappingURL=demo.component.js.map
