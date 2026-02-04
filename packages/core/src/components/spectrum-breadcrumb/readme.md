# spectrum-breadcrumb



<!-- Auto Generated Below -->


## Overview

Breadcrumb navigation component for hierarchical drill-down.
Displays navigation trail and allows users to navigate back through levels.

## Properties

| Property    | Attribute    | Description                                                                                                     | Type                                                                                                                     | Default     |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `config`    | `config`     | Configuration object (alternative to individual props) Used when component is rendered by dashboard-widget-host | `string \| { items?: BreadcrumbItem[]; separator?: string; maxItems?: number; showHome?: boolean; homeLabel?: string; }` | `undefined` |
| `homeLabel` | `home-label` | Home link label                                                                                                 | `string`                                                                                                                 | `'Home'`    |
| `items`     | `items`      | Array of breadcrumb items Can be JSON string or array of objects                                                | `BreadcrumbItem[] \| string`                                                                                             | `[]`        |
| `maxItems`  | `max-items`  | Maximum number of visible breadcrumbs (remaining collapsed)                                                     | `number`                                                                                                                 | `undefined` |
| `separator` | `separator`  | Separator character/symbol between breadcrumbs                                                                  | `string`                                                                                                                 | `'/'`       |
| `showHome`  | `show-home`  | Whether to show home/root link                                                                                  | `boolean`                                                                                                                | `true`      |


## Events

| Event             | Description                                | Type                                                            |
| ----------------- | ------------------------------------------ | --------------------------------------------------------------- |
| `breadcrumbClick` | Event emitted when a breadcrumb is clicked | `CustomEvent<{ viewId: string; context: any; index: number; }>` |


----------------------------------------------


