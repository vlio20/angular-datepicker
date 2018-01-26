# Changelog
All notable changes to this project will be documented in this file.

<a name="2.7.4"></a>
# [2.7.4] (???)
### Bug Fixes
- Fixing disabled dates when selecting past/future time from current day  ([18db1ca](https://github.com/vlio20/angular-datepicker/commit/18db1ca)) closes [#340](https://github.com/vlio20/angular-datepicker/issues/340)

<a name="2.7.3"></a>
# [2.7.3] (2018-01-13)

### Features
- Navigation events are now dispatched from all relevant components ([2552889](https://github.com/vlio20/angular-datepicker/commit/2552889)) closes [#329](https://github.com/vlio20/angular-datepicker/issues/329)
- `moveCalendarTo` was added to all components api ([349d48c](https://github.com/vlio20/angular-datepicker/commit/349d48c)) closes [#306](https://github.com/vlio20/angular-datepicker/issues/306)
- `goToCurrent` event was added when go to current button is clicked ([c39080e](https://github.com/vlio20/angular-datepicker/commit/c39080e)) closes [#328](https://github.com/vlio20/angular-datepicker/issues/328) - PR by [@justtal](https://github.com/justtal)
- `unSelectOnClick` was added, this will disable/enable unselection of already selected date ([45e15ac](https://github.com/vlio20/angular-datepicker/commit/45e15ac)) closes [#298](https://github.com/vlio20/angular-datepicker/issues/298)

### Improvements
- Change `changeDetectionStrategy` to `onPush` ([a592932](https://github.com/vlio20/angular-datepicker/commit/a592932), [728b342](https://github.com/vlio20/angular-datepicker/commit/728b342), [2fb7073](https://github.com/vlio20/angular-datepicker/commit/2fb7073)) closes [#325](https://github.com/vlio20/angular-datepicker/issues/325)
- Upgrade to Angular 5 ([5abdae1](https://github.com/vlio20/angular-datepicker/commit/5abdae1)) closes [#315](https://github.com/vlio20/angular-datepicker/issues/315)
- Upgrade angular-cli ([5abdae1](https://github.com/vlio20/angular-datepicker/commit/5abdae1))

### Bug Fixes
- Updating docs for showing day-calendar api ([c5533de](https://github.com/vlio20/angular-datepicker/commit/c5533de)) closes [#312](https://github.com/vlio20/angular-datepicker/issues/312)
- Prevent overriding of form control value from input updates ([c96f2](https://github.com/vlio20/angular-datepicker/commit/c96f2)) closes [#297](https://github.com/vlio20/angular-datepicker/issues/297) - PR by [@pklein](https://github.com/pklein)

### Breaking Changes
- Multiselect delimiter changed to `|` instead of `,` ([8932f52](https://github.com/vlio20/angular-datepicker/commit/8932f52))

<a name="2.6.2"></a>
# [2.6.2] (2017-11-11)

### Improvements
- Removing document HostListeners to improve performance ([6324364](https://github.com/vlio20/angular-datepicker/commit/6324364)) closes [#292](https://github.com/vlio20/angular-datepicker/issues/292) - PR by [@mrenou](https://github.com/mrenou)

<a name="2.6.1"></a>
# [2.6.1] (2017-11-03)

### Bug Fixes
- Hidden attribute not working on IE10 ([e4de3cb ](https://github.com/vlio20/angular-datepicker/commit/e4de3cb)) closes [#283](https://github.com/vlio20/angular-datepicker/issues/283) - PR by [@mrenou](https://github.com/mrenou)
- Browser translate causes interpolates values to NOT update ([8f6d69e](https://github.com/vlio20/angular-datepicker/commit/8f6d69e)) closes [#277](https://github.com/vlio20/angular-datepicker/issues/277) - PR by [@chrxs](https://github.com/chrxs)
- Clearing the input will remove the selected date ([5bfe724](https://github.com/vlio20/angular-datepicker/commit/5bfe724)) closes [#278](https://github.com/vlio20/angular-datepicker/issues/278)
- Set `min` property dynamically ([969eb01](https://github.com/vlio20/angular-datepicker/commit/969eb01)) closes [#269](https://github.com/vlio20/angular-datepicker/issues/269)
- `disableKeypress` does not work on the directive ([1c00e48](https://github.com/vlio20/angular-datepicker/commit/1c00e48)) closes [#267](https://github.com/vlio20/angular-datepicker/issues/267)
- Go to current button not centered ([9b6dc99](https://github.com/vlio20/angular-datepicker/commit/9b6dc99)) closes [#275](https://github.com/vlio20/angular-datepicker/issues/275) - PR by [@KevinJannis](https://github.com/KevinJannis)

<a name="2.6.0"></a>
# [2.6.0] (2017-10-22)

### Features
- Moving go to current button inside the navigation component, enables go to current in inline components ([dd283c5](https://github.com/vlio20/angular-datepicker/commit/dd283c5)).

### UI/UX Changes
- Moving go to current button inside the navigation component ([dd283c5](https://github.com/vlio20/angular-datepicker/commit/dd283c5)).

### Improvements
- Min date as default when calendar opens ([5663b7a](https://github.com/vlio20/angular-datepicker/commit/5663b7a)) closes [#256](https://github.com/vlio20/angular-datepicker/issues/256)
- Stop using getters in template ([3858dde](https://github.com/vlio20/angular-datepicker/commit/3858dde)) closes [#239](https://github.com/vlio20/angular-datepicker/issues/239)

### Bug Fixes
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

### Bug Fixes
- 29th October 2017 displayed twice [#235](https://github.com/vlio20/angular-datepicker/issues/235#issuecomment-336217634)
