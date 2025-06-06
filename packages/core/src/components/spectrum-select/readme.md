# spectrum-select

<!-- Auto Generated Below -->


## Overview

Spectrum Select Component
A styled wrapper around HTML select element with support for icons, text, and custom options.
Based on the Spectrum design system and inspired by spectrum-button component patterns.

## Properties

| Property           | Attribute            | Description | Type                                               | Default              |
| ------------------ | -------------------- | ----------- | -------------------------------------------------- | -------------------- |
| `action`           | `action`             |             | `string`                                           | `''`                 |
| `customStyle`      | --                   |             | `{ [key: string]: string; }`                       | `{}`                 |
| `debug`            | `debug`              |             | `boolean`                                          | `false`              |
| `disabled`         | `disabled`           |             | `boolean`                                          | `false`              |
| `dropdownIcon`     | `dropdown-icon`      |             | `string`                                           | `'expand_more'`      |
| `invalid`          | `invalid`            |             | `boolean`                                          | `false`              |
| `multiple`         | `multiple`           |             | `boolean`                                          | `false`              |
| `options`          | --                   |             | `SpectrumSelectOption[]`                           | `[]`                 |
| `placeholder`      | `placeholder`        |             | `string`                                           | `'Select an option'` |
| `required`         | `required`           |             | `boolean`                                          | `false`              |
| `selectedValue`    | `selected-value`     |             | `string`                                           | `''`                 |
| `selectedValues`   | --                   |             | `string[]`                                         | `[]`                 |
| `selectionsLabel`  | `selections-label`   |             | `string`                                           | `'selections'`       |
| `showDropdownIcon` | `show-dropdown-icon` |             | `boolean`                                          | `true`               |
| `showIcon`         | `show-icon`          |             | `boolean`                                          | `true`               |
| `size`             | `size`               |             | `"base" \| "lg" \| "sm"`                           | `'base'`             |
| `state`            | `state`              |             | `"default" \| "disabled" \| "focus" \| "hover"`    | `'default'`          |
| `variant`          | `variant`            |             | `"ghost" \| "outline" \| "primary" \| "secondary"` | `'primary'`          |


## Events

| Event          | Description | Type                                                                                                                                                |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectChange` |             | `CustomEvent<{ value: string; label: string; option: SpectrumSelectOption; selectedValues?: string[]; selectedOptions?: SpectrumSelectOption[]; }>` |


----------------------------------------------


