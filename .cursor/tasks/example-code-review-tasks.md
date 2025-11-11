# Code Review Tasks - Example Output

*This is an example of what a code review task file would look like*

## Critical Issues (Must Fix)
- [ ] **[spectrum-button/spectrum-button.tsx:89]** Missing aria-label attribute on interactive button
  - **Rule**: Accessibility Standards - Interactive Components
  - **Fix**: Add `aria-label={this.ariaLabel || this.label}` to button element
  - **Impact**: Screen reader users cannot identify button purpose
  - **Priority**: Critical

- [ ] **[spectrum-accordion/spectrum-accordion.scss:25]** Using hardcoded color instead of design token
  - **Rule**: CSS Architecture - Design Tokens
  - **Fix**: Replace `color: #333333;` with `color: var(--spectrum-sys-color-on-surface);`
  - **Impact**: Theming system broken, affects visual consistency
  - **Priority**: Critical

## Major Issues (Should Fix)
- [ ] **[spectrum-new-component/spectrum-new-component.tsx:15]** Component not following BEM naming convention
  - **Rule**: CSS Architecture - BEM Naming Convention
  - **Fix**: Rename CSS classes from `.new-component` to `.spectrum-new-component`
  - **Impact**: Inconsistent styling architecture across components
  - **Priority**: Major

- [ ] **[spectrum-list/spectrum-list.tsx:45]** Event payload missing required action attribute
  - **Rule**: Component Events - Event Payload Structure
  - **Fix**: Add `action: 'select'` to event payload: `{ action: 'select', item: selectedItem }`
  - **Impact**: Event consumers cannot identify action type
  - **Priority**: Major

- [ ] **[spectrum-dialog/spectrum-dialog.stories.tsx:1]** Storybook story missing proper title format
  - **Rule**: Storybook Standards - Title Format
  - **Fix**: Change title from `Components/Dialog` to `Spectrum/Components/SpectrumDialog`
  - **Impact**: Creates separate navigation section, breaks storybook organization
  - **Priority**: Major

## Minor Issues (Consider Fixing)
- [ ] **[spectrum-button/spectrum-button.scss:67]** Animation could use transform for better performance
  - **Rule**: CSS Architecture - Performance Optimization
  - **Fix**: Replace `margin-top: -2px;` with `transform: translateY(-2px);`
  - **Impact**: Better animation performance on low-end devices
  - **Priority**: Minor

- [ ] **[spectrum-card/spectrum-card.tsx:34]** Could optimize focus management
  - **Rule**: Accessibility Standards - Focus Management
  - **Fix**: Consider using `focusFirst()` method pattern from other components
  - **Impact**: Improved keyboard navigation consistency
  - **Priority**: Minor

## Enhancement Opportunities
- [ ] **[spectrum-menu]** Consider adding keyboard shortcut support
  - **Rule**: Accessibility Standards - Keyboard Navigation
  - **Fix**: Add support for Home/End keys to jump to first/last items
  - **Impact**: Enhanced keyboard navigation experience
  - **Priority**: Enhancement

- [ ] **[spectrum-theme]** Could add support for user-defined color schemes
  - **Rule**: Component Architecture - Extensibility
  - **Fix**: Add `customColors` prop to allow theme customization
  - **Impact**: Improved developer experience and flexibility
  - **Priority**: Enhancement

---
**Review Summary**: 2 Critical, 3 Major, 2 Minor, 2 Enhancement issues found
**Generated**: 2024-12-15 14:30:22
**Files Reviewed**: 7 component files, 2 story files
**Rule Version**: Spectrum Code Review v1.0

*Priority Guide: Critical (breaks accessibility/functionality) → Major (breaks standards/consistency) → Minor (optimization/best practices) → Enhancement (future improvements)*



