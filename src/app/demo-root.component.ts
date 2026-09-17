import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'dp-demo-root',
    template: '<router-outlet></router-outlet>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DemoRootComponent {
}
