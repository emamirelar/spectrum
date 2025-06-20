# spectrum-app-layout



<!-- Auto Generated Below -->


## Overview

Spectrum App Layout Component
A comprehensive application layout with collapsible sidebar, header, main content, and footer.
Based on CSS Grid with responsive behavior and smooth animations.

## Properties

| Property                | Attribute                 | Description | Type                                             | Default     |
| ----------------------- | ------------------------- | ----------- | ------------------------------------------------ | ----------- |
| `breakpoint`            | `breakpoint`              |             | `"lg" \| "md" \| "sm"`                           | `'md'`      |
| `collapseMobile`        | `collapse-mobile`         |             | `boolean`                                        | `true`      |
| `debug`                 | `debug`                   |             | `boolean`                                        | `false`     |
| `footerHeight`          | `footer-height`           |             | `string`                                         | `'5rem'`    |
| `gap`                   | `gap`                     |             | `"lg" \| "md" \| "none" \| "sm" \| "xl" \| "xs"` | `'md'`      |
| `headerHeight`          | `header-height`           |             | `string`                                         | `'5rem'`    |
| `headerTitle`           | `header-title`            |             | `string`                                         | `''`        |
| `logoAlt`               | `logo-alt`                |             | `string`                                         | `'Logo'`    |
| `logoSrc`               | `logo-src`                |             | `string`                                         | `''`        |
| `profileText`           | `profile-text`            |             | `string`                                         | `'Profile'` |
| `responsive`            | `responsive`              |             | `boolean`                                        | `true`      |
| `rightBarCollapsible`   | `right-bar-collapsible`   |             | `boolean`                                        | `true`      |
| `rightBarExpanded`      | `right-bar-expanded`      |             | `boolean`                                        | `true`      |
| `rightBarWidth`         | `right-bar-width`         |             | `string`                                         | `'16rem'`   |
| `showFooter`            | `show-footer`             |             | `boolean`                                        | `true`      |
| `showHeader`            | `show-header`             |             | `boolean`                                        | `true`      |
| `showLogo`              | `show-logo`               |             | `boolean`                                        | `true`      |
| `showProfile`           | `show-profile`            |             | `boolean`                                        | `true`      |
| `showRightBar`          | `show-right-bar`          |             | `boolean`                                        | `true`      |
| `sidebarCollapsedWidth` | `sidebar-collapsed-width` |             | `string`                                         | `'4rem'`    |
| `sidebarCollapsible`    | `sidebar-collapsible`     |             | `boolean`                                        | `true`      |
| `sidebarExpanded`       | `sidebar-expanded`        |             | `boolean`                                        | `true`      |
| `sidebarExpandedWidth`  | `sidebar-expanded-width`  |             | `string`                                         | `'16rem'`   |
| `sidebarPosition`       | `sidebar-position`        |             | `"left" \| "right"`                              | `'left'`    |


## Events

| Event            | Description | Type                                                  |
| ---------------- | ----------- | ----------------------------------------------------- |
| `profileAction`  |             | `CustomEvent<{ action: string; type: "profile"; }>`   |
| `rightBarToggle` |             | `CustomEvent<{ action: string; expanded: boolean; }>` |
| `sidebarToggle`  |             | `CustomEvent<{ action: string; expanded: boolean; }>` |


----------------------------------------------


