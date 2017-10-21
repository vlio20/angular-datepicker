# Changelog
All notable changes to this project will be documented in this file.

<a name="2.6.0"></a>
# [2.6.0] (2017-00-00)

### Features
- Moving go to current button inside the navigation component, enables go to current in inline components ([dd283c5](https://github.com/vlio20/angular-datepicker/commit/dd283c5)).

### UI/UX Changes
- Moving go to current button inside the navigation component ([dd283c5](https://github.com/vlio20/angular-datepicker/commit/dd283c5)).

### Improvements
- Stop using getters in template ([3858dde](https://github.com/vlio20/angular-datepicker/commit/3858dde)) closes [#239](https://github.com/vlio20/angular-datepicker/issues/239)

### Bug Fixed
- Fix for `ngOnDestroy` throws error when in SSR ([c2a0c8b](https://github.com/vlio20/angular-datepicker/commit/c2a0c8b)) closes [#163](https://github.com/vlio20/angular-datepicker/issues/163)
- `displayDate` on the directive bug fix ([984aab8](https://github.com/vlio20/angular-datepicker/commit/984aab8)) closes [#254](https://github.com/vlio20/angular-datepicker/issues/254)
- `max`/`min` date support for strings ([ad98d1b](https://github.com/vlio20/angular-datepicker/commit/ad98d1b)) closes [#250](https://github.com/vlio20/angular-datepicker/issues/250)
- `value.split` is not a function bug fix ([38f6ce2](https://github.com/vlio20/angular-datepicker/commit/38f6ce2)) closes [#225](https://github.com/vlio20/angular-datepicker/issues/245)
- Add outputs of each component to docs ([9ee8035](https://github.com/vlio20/angular-datepicker/commit/9ee8035)) closes [#224](https://github.com/vlio20/angular-datepicker/issues/224)
- More than one picker can be opened at the same time ([dd283c5](https://github.com/vlio20/angular-datepicker/commit/dd283c5)) closes [#223](https://github.com/vlio20/angular-datepicker/issues/223)
- Picker not always opens according to drops/opens ([c26d168](https://github.com/vlio20/angular-datepicker/commit/c26d168)) closes [#222](https://github.com/vlio20/angular-datepicker/issues/222)

### Breaking Changes
- Go to current button moved from input element to the navigation component ([dd283c5](https://github.com/vlio20/angular-datepicker/commit/dd283c5)).
- Default locale is now set with [`moment.locale()`](https://momentjs.com/docs/#/i18n/getting-locale/) instead of hard coded `en` 



<a name="2.5.1"></a>
# [2.5.1](https://github.com/vlio20/angular-datepicker/releases/tag/2.5.1) (2017-10-12)

### Bug Fixed
- 29th October 2017 displayed twice [#235](https://github.com/vlio20/angular-datepicker/issues/235#issuecomment-336217634)
