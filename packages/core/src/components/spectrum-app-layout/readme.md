# spectrum-app-layout

## Purpose

The `spectrum-app-layout` component provides a comprehensive application layout foundation with collapsible sidebar, header, main content, and footer areas. It's designed to be the primary structural component for complex applications that need professional navigation and content organization.

## Key Features

- **Flexible Layout Structure**: Header, sidebar, main content, and footer areas
- **Responsive Design**: Automatically adapts to different screen sizes
- **Collapsible Sidebars**: Both left and right sidebars with toggle functionality
- **CSS Grid Based**: Uses modern CSS Grid for optimal performance and flexibility
- **Customizable Spacing**: Configurable gaps and padding
- **Event-Driven**: Emits events for sidebar toggles and profile actions
- **Slot-Based Composition**: 6 different slots for flexible content placement

## When to Use

- **Complex Web Applications**: Dashboards, admin panels, SaaS applications
- **Multi-Section Applications**: Apps with navigation, content, and multiple tools
- **Professional Interfaces**: Business applications requiring structured layouts
- **Responsive Applications**: Apps that need to work across desktop, tablet, and mobile

## Basic Usage

```html
<spectrum-app-layout>
  <!-- Logo in header -->
  <img slot="logo" src="/logo.svg" alt="My App" />
  
  <!-- Header content -->
  <div slot="header-content">
    <spectrum-search-input></spectrum-search-input>
  </div>
  
  <!-- User profile -->
  <div slot="profile">
    <img src="/avatar.jpg" alt="User" />
    <span>John Doe</span>
  </div>
  
  <!-- Sidebar navigation -->
  <nav slot="sidebar">
    <a href="#dashboard">Dashboard</a>
    <a href="#analytics">Analytics</a>
    <a href="#settings">Settings</a>
  </nav>
  
  <!-- Main content -->
  <main>
    <h1>Dashboard</h1>
    <p>Your main application content goes here.</p>
  </main>
  
  <!-- Footer -->
  <footer slot="footer">
    <p>&copy; 2024 My Company</p>
  </footer>
</spectrum-app-layout>
```

## Available Slots

| Slot Name | Location | Purpose | Required |
|-----------|----------|---------|----------|
| `logo` | Header left | Custom logo content | No |
| `header-content` | Header center | Search, breadcrumbs, actions | No |
| `profile` | Header right | User profile/menu | No |
| `sidebar` | Left/Right sidebar | Navigation content | No |
| `right-bar` | Right sidebar | Secondary navigation/tools | No |
| (default) | Main area | Primary application content | Yes |
| `footer` | Footer | Footer content | No |

## Configuration Examples

### Responsive Dashboard Layout
```html
<spectrum-app-layout 
  responsive="true"
  breakpoint="md"
  collapse-mobile="true"
  gap="lg">
  <!-- Content slots -->
</spectrum-app-layout>
```

### Fixed Header with Collapsible Sidebar
```html
<spectrum-app-layout 
  header-height="4rem"
  sidebar-collapsible="true"
  sidebar-expanded="false"
  sidebar-collapsed-width="3rem">
  <!-- Content slots -->
</spectrum-app-layout>
```

### Multi-Panel Layout
```html
<spectrum-app-layout 
  show-right-bar="true"
  right-bar-width="20rem"
  right-bar-collapsible="true"
  sidebar-position="left">
  <!-- Content slots -->
</spectrum-app-layout>
```

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


