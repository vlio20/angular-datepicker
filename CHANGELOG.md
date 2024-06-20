# Changelog
All notable changes to this project will be documented in this file.

# [18.0.0] (2024-06-20)

### Improvements
- Update to Angular 18 ([643](https://github.com/vlio20/angular-datepicker/pull/643)) closes [#638](https://github.com/vlio20/angular-datepicker/issues/644) - PR by [@henrikgrubbe](https://github.com/henrikgrubbe)

# [17.0.0] (2023-12-10)

### Improvements
- Update to Angular 17 ([640](https://github.com/vlio20/angular-datepicker/pull/640)) closes [#638](https://github.com/vlio20/angular-datepicker/issues/638) - PR by [@henrikgrubbe](https://github.com/henrikgrubbe)
- Move from protractor to Playwrite ([640](https://github.com/vlio20/angular-datepicker/pull/640)) closes [#554](https://github.com/vlio20/angular-datepicker/issues/554)


# [16.0.0] (2023-05-20)

### Improvements
- Update to Angular 16 ([629](https://github.com/vlio20/angular-datepicker/pull/629)) closes [#627](https://github.com/vlio20/angular-datepicker/issues/627) - PR by [@looorent](https://github.com/looorent)

# [15.0.0] (2022-12-01)

### Improvements
- Fix Lose dependency on @angular/common ([613](https://github.com/vlio20/angular-datepicker/pull/613)) closes [#616](https://github.com/vlio20/angular-datepicker/issues/616)

# [15.0.0] (2022-11-25)

### Improvements
- Update to Angular 15 ([613](https://github.com/vlio20/angular-datepicker/pull/613)) closes [#610](https://github.com/vlio20/angular-datepicker/issues/610) - PR by [@HimanshuAgrahari07](https://github.com/HimanshuAgrahari07)

# [14.0.1] (2022-07-23)

### Bug Fixes
- Error when min config is used as ([601](https://github.com/vlio20/angular-datepicker/pull/601)) closes [#595](https://github.com/vlio20/angular-datepicker/issues/595) - Reported by [@tomulticolaure](https://github.com/slickam)

# [14.0.0] (2022-07-23) 

### Improvements
- Update to Angular 14 ([598](https://github.com/vlio20/angular-datepicker/pull/598)) closes [#597](https://github.com/vlio20/angular-datepicker/issues/597)

# [13.1.1] (2022-01-09)

# Bug Fixes
- Error "require is not defined" ([581](https://github.com/vlio20/angular-datepicker/pull/581)) closes [#580](https://github.com/vlio20/angular-datepicker/issues/580)

# [13.1.0] (2022-01-01)

# Bug Fixes
- Working with RTL ([575](https://github.com/vlio20/angular-datepicker/pull/575)) closes [#504](https://github.com/vlio20/angular-datepicker/issues/504) 

# Breaking changes
- Replace deprecated `Moment` with Dayjs ([573](https://github.com/vlio20/angular-datepicker/pull/573)) closes [#530](https://github.com/vlio20/angular-datepicker/issues/530)  
Locale was removed from the library configuration, changing the locale should be done outside the component. More information can be found in the readme.md file under the Locale section.  
Some formats also might be change due to the way Dayjs is implemented.
- Replace internal position resolving with Angular material cdk library ([576](https://github.com/vlio20/angular-datepicker/pull/576)) closes [#570 ](https://github.com/vlio20/angular-datepicker/issues/570 )  
This removal will drop the `attachTo` option from the library configuration.  
*Note:* You will also need to add the cdk styles to your project. You can do so by adding `@import '~@angular/cdk/overlay-prebuilt.css';` to your global styles or by adding it to the styles attribute in your angular.json file.


# [13.0.0] (2021-12-22)

### Improvements
- Update to Angular 13 ([565](https://github.com/vlio20/angular-datepicker/pull/565)) closes [#564](https://github.com/vlio20/angular-datepicker/issues/564)

<a name="12.0.4"></a>
# [12.0.4] (2021-11-04)

### Bug fixes
- Manual input crashes the application ([7afd292](https://github.com/vlio20/angular-datepicker/commit/7afd292)) closes [#561](https://github.com/vlio20/angular-datepicker/issues/561) and [#550](https://github.com/vlio20/angular-datepicker/issues/550) - PR by [@jsprds](https://github.com/jsprds)
- Month picker button size changed ([c746af4](https://github.com/vlio20/angular-datepicker/commit/c746af4)) closes [#558](https://github.com/vlio20/angular-datepicker/issues/558) and [#550](https://github.com/vlio20/angular-datepicker/issues/550) - Reported by [@slickam](https://github.com/slickam)

<a name="12.0.0"></a>
# [12.0.0] (2021-07-17)

### Improvements
- Update to Angular 12 ([e7e0e63](https://github.com/vlio20/angular-datepicker/commit/e7e0e63)) closes [#548](https://github.com/vlio20/angular-datepicker/issues/548) and [#550](https://github.com/vlio20/angular-datepicker/issues/550)
- Move to eslint ([fde05d0](https://github.com/vlio20/angular-datepicker/commit/fde05d0)) closes [#551](https://github.com/vlio20/angular-datepicker/issues/#551)

<a name="11.0.0"></a>
# [10.0.1] (2020-11-20)

### Improvements
- Update to Angular 11 ([7be883b](https://github.com/vlio20/angular-datepicker/commit/7be883b)) closes [#525](https://github.com/vlio20/angular-datepicker/issues/525)

### Breaking changes
- Moved Dayjs to be a pear dependency

<a name="10.11.10"></a>
# [10.0.1] (2020-11-10)

### Bug Fixes
- Enabling isMonthDisabledCallback ([0e77c88](https://github.com/vlio20/angular-datepicker/commit/0e77c88)) closes [#522](https://github.com/vlio20/angular-datepicker/issues/522)

<a name="10.0.0"></a>
# [10.0.0] (2020-08-03)

### Improvements
- Update to Angular 10 ([2030363](https://github.com/vlio20/angular-datepicker/commit/2030363)) closes [#508](https://github.com/vlio20/angular-datepicker/issues/508)

### Bug Fixes
- Removing momentJS deep import ([abe1cfb](https://github.com/vlio20/angular-datepicker/commit/abe1cfb)) closes [#514](https://github.com/vlio20/angular-datepicker/issues/514)

<a name="9.0.0"></a>
# [9.0.0] (2020-03-31)

### Improvements
- Update to Angular 9 ([6b47ce4](https://github.com/vlio20/angular-datepicker/commit/6b47ce4)) closes [#493](https://github.com/vlio20/angular-datepicker/issues/493)

### Features
- Add number of rows to month calendar ([5702231](https://github.com/vlio20/angular-datepicker/commit/5702231)) closes [#387](https://github.com/vlio20/angular-datepicker/issues/387)
- Close popup on enter ([da0fe4d](https://github.com/vlio20/angular-datepicker/commit/da0fe4d)) closes [#438](https://github.com/vlio20/angular-datepicker/issues/438)

### Bug Fixes
- Add debounce on open delay ([cd86edb](https://github.com/vlio20/angular-datepicker/commit/cd86edb)) closes [#480](https://github.com/vlio20/angular-datepicker/issues/480)

<a name="8.0.0"></a>
# [8.0.0] (2020-01-01)

### Bug Fixes
- Selected month styling not present on day pickers ([d076f16](https://github.com/vlio20/angular-datepicker/commit/d076f16)) closes [#462](https://github.com/vlio20/angular-datepicker/issues/462)
- Disabled state in reactive form not working ([5e18e22](https://github.com/vlio20/angular-datepicker/commit/5e18e22)) closes [#416](https://github.com/vlio20/angular-datepicker/issues/416)
- Validator using old format ([faa2d99](https://github.com/vlio20/angular-datepicker/commit/faa2d99)) closes [#405](https://github.com/vlio20/angular-datepicker/issues/405)
- weekDayFormatter doesn't work in day mode ([b09964c](https://github.com/vlio20/angular-datepicker/commit/b09964c)) closes [#415](https://github.com/vlio20/angular-datepicker/issues/415)

### Improvements
- Demo page refactoring ([4601b91](https://github.com/vlio20/angular-datepicker/commit/4601b91)) closes [#474](https://github.com/vlio20/angular-datepicker/issues/474)
- Angular 8 packages updates ([d076f16](https://github.com/vlio20/angular-datepicker/commit/d076f16)) closes [#467](https://github.com/vlio20/angular-datepicker/issues/467)

### Breaking changes
- Stop using Renderer and replacing it with Renderer2 ([d076f16](https://github.com/vlio20/angular-datepicker/commit/d076f16)) closes [#469](https://github.com/vlio20/angular-datepicker/issues/469)

<a name="2.12.0"></a>
# [2.12.0] (2019-06-28)
### Improvements
- Angular 8 upgrade ([4c28f8a](https://github.com/vlio20/angular-datepicker/commit/4c28f8a)) closes [#451](https://github.com/vlio20/angular-datepicker/issues/451)

<a name="2.11.0"></a>
# [2.11.0] (2018-11-30)
### Improvements
- Angular 7 upgrade ([ca88740](https://github.com/vlio20/angular-datepicker/commit/ca88740)) closes [#434](https://github.com/vlio20/angular-datepicker/issues/434)

<a name="2.10.2"></a>
# [2.10.2] (2018-08-08)
### Bug Fixes
- Missing dates ([e41ad9b](https://github.com/vlio20/angular-datepicker/commit/e41ad9b)) closes [#427](https://github.com/vlio20/angular-datepicker/issues/427)
- The datepicker does not update `ng-untouched` class after user selects date string ([86ba0a6](https://github.com/vlio20/angular-datepicker/commit/86ba0a6)) closes [#426](https://github.com/vlio20/angular-datepicker/issues/426) - PR by [@JLHwung](https://github.com/JLHwung)

<a name="2.10.1"></a>
# [2.10.1] (2018-07-22)
### Bug Fixes
- Not bind initial formatted value ([d389c96](https://github.com/vlio20/angular-datepicker/commit/d389c96)) closes [#384](https://github.com/vlio20/angular-datepicker/issues/384)
- TAB click and then unfocusing ([d42d5b2](https://github.com/vlio20/angular-datepicker/commit/d42d5b2)) closes [#377](https://github.com/vlio20/angular-datepicker/issues/377)

<a name="2.10.0"></a>
# [2.10.1] (2018-07-23)
### Bug Fixes
- Not bind initial formatted value ([d389c96](https://github.com/vlio20/angular-datepicker/commit/d389c96)) closes [#384](https://github.com/vlio20/angular-datepicker/issues/384)
- TAB click and then unfocusing ([d42d5b2](https://github.com/vlio20/angular-datepicker/commit/d42d5b2)) closes [#377](https://github.com/vlio20/angular-datepicker/issues/377)

<a name="2.10.0"></a>
# [2.10.0] (2018-06-19)
### Features
- Angular 6 upgrade ([370c060](https://github.com/vlio20/angular-datepicker/commit/370c060)) closes [#403](https://github.com/vlio20/angular-datepicker/issues/403)

<a name="2.9.0"></a>
# [2.9.0] (2018-04-15)
### Features
- On Select Output event ([a8bdf56](https://github.com/vlio20/angular-datepicker/commit/a8bdf56)) closes [#389](https://github.com/vlio20/angular-datepicker/issues/389)

### Improvements
- Moving to node 8  ([cddc2ba](https://github.com/vlio20/angular-datepicker/commit/cddc2ba)) closes [#391](https://github.com/vlio20/angular-datepicker/issues/391)

<a name="2.8.1"></a>
# [2.8.1] (2018-03-13)
### Bug Fixes
- Resolving moment value in Reactive form ([6055041](https://github.com/vlio20/angular-datepicker/commit/6055041)) closes [#371](https://github.com/vlio20/angular-datepicker/issues/371)

<a name="2.8.0"></a>
# [2.8.0] (2018-03-07)
### Features
- Add `data-date` attribute to each date button ([052b6a8d](https://github.com/vlio20/angular-datepicker/commit/052b6a8d)) closes [#367](https://github.com/vlio20/angular-datepicker/issues/367)
- Show/Hide the picker popup after click outside of the component `hideOnOutsideClick` ([362](https://github.com/vlio20/angular-datepicker/commit/362)) closes [#362](https://github.com/vlio20/angular-datepicker/issues/362)

<a name="2.7.5"></a>
# [2.7.5] (2018-03-05)
### Bug Fixes
- Adding documentation for `showGoToCurrent` ([b3e3728](https://github.com/vlio20/angular-datepicker/commit/b3e3728)) closes [#357](https://github.com/vlio20/angular-datepicker/issues/357)
- Fixing `inputElementContainer` which did not work on directive + added to docs ([6344b38](https://github.com/vlio20/angular-datepicker/commit/6344b38)) closes [#359](https://github.com/vlio20/angular-datepicker/issues/359)
- Fixing Not able to bind to moment, getting TypeError: `(value || "").split is not a function` ([19cee2d](https://github.com/vlio20/angular-datepicker/commit/19cee2d)) closes [#355](https://github.com/vlio20/angular-datepicker/issues/355)

<a name="2.7.4"></a>
# [2.7.4] (2018-01-13)
- Fixing disabled dates when selecting past/future time from current day  ([18db1ca](https://github.com/vlio20/angular-datepicker/commit/18db1ca)) closes [#340](https://github.com/vlio20/angular-datepicker/issues/340)

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
