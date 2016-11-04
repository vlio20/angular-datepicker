"use strict";
require('./polyfills.ts');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var environment_1 = require('./environments/environment');
var demo_module_1 = require('./app/demo/demo.module');
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(demo_module_1.DemoModule);

//# sourceMappingURL=main.js.map
