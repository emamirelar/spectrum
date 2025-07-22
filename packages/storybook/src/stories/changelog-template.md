# Changelog Entry Template

Use this template when adding new entries to the changelog. Copy the relevant sections to `changelog.mdx`.

## Version Entry Template

```markdown
## [VERSION] - dd/mmm/yy

### 🚀 Major Release | ✨ Minor Release | 🔧 Patch Release | 🧪 Pre-release

### 🆕 Added
- **spectrum-{component-name}**: Description of new feature or component
- **Dependencies**: Added new-package@version
- **Storybook**: New stories or documentation

### 🔄 Changed
- **spectrum-{component-name}**: Description of change
- ⚠️ BREAKING CHANGE: **spectrum-{component-name}**: Detailed breaking change description with migration path

### 🐛 Fixed
- **spectrum-{component-name}**: Description of bug fix
- **Global**: System-wide fixes

### 📝 Deprecated
- **spectrum-{component-name}**: Feature deprecated, will be removed in version X.X.X

### 🗑️ Removed
- **spectrum-{component-name}**: Removed feature (include migration instructions)

### 🔒 Security
- **spectrum-{component-name}**: Security improvement or fix

### 📝 Documentation
- Updated component stories
- Enhanced accessibility guidelines
- Added migration guides

### 🔒 Dependencies
- Updated package@version
- Added new-dependency@version
- Removed old-dependency
```

## Quick Reference

### Date Format Requirements
- **Format**: `dd/mmm/yy` (e.g., `22/Jul/25`, `03/Dec/24`)
- **Get Current Date**: `date +'%d/%b/%y'`
- **Never Use Placeholder Dates**: Always use actual current date

### Change Categories (use as needed)
- `### 🆕 Added` - New features, components, functionality
- `### 🔄 Changed` - Modifications to existing behavior
- `### 🐛 Fixed` - Bug fixes and corrections
- `### 📝 Deprecated` - Features marked for removal
- `### 🗑️ Removed` - Deleted features (include migration)
- `### 🔒 Security` - Security-related changes

### Component Format
- Use: `**spectrum-{component-name}**: Description`
- Example: `**spectrum-button**: Added new outline variant`

### Breaking Changes
- Prefix with: `⚠️ BREAKING CHANGE:`
- Include migration instructions
- Explain impact on existing code

### Version Format
- Follow SemVer: `MAJOR.MINOR.PATCH`
- Pre-release: `MAJOR.MINOR.PATCH-alpha.N`
- Current version from: `packages/core/package.json`

### Date Format
- Use: `dd/mmm/yy` (22/Jul/25, 03/Dec/24)
- Command: `date +'%d/%b/%y'`
- Never use: YYYY-MM-DD, full month names, or placeholder dates

### Links and References
- Link to issues: `[#123](https://github.com/user/repo/issues/123)`
- Link to PRs: `[PR #456](https://github.com/user/repo/pull/456)`
- Link to docs: `[Documentation](?path=/docs/...)`

## Workflow Checklist

Before committing changelog updates:
- [ ] Get current date with: `date +'%d/%b/%y'`
- [ ] Version number matches `packages/core/package.json`
- [ ] Date format is correct (dd/mmm/yy)
- [ ] All changes since last release are documented
- [ ] Breaking changes are clearly marked
- [ ] Component names use correct format
- [ ] Grammar and spelling checked
- [ ] Links are functional
- [ ] Entry follows established format

## Example Entry

```markdown
## [0.0.1-alpha.17] - 22/Jul/25

### 🧪 Pre-release

### 🆕 Added
- **spectrum-modal**: New modal component with backdrop and keyboard navigation
- **spectrum-theme**: Dark mode support with automatic color token generation
- **Storybook**: Interactive playground for testing component combinations

### 🔄 Changed
- **spectrum-button**: Improved accessibility with better focus indicators
- ⚠️ BREAKING CHANGE: **spectrum-chip**: Renamed `variant` prop to `appearance` for API consistency. Migration: Replace `variant="primary"` with `appearance="primary"`

### 🐛 Fixed
- **spectrum-rail**: Fixed collapse animation not completing on mobile devices
- **spectrum-search-input**: Resolved voice recognition timeout issues in Firefox

### 📝 Documentation
- Added component interaction examples to all stories
- Updated dependency map with new spectrum-modal relationships
- Enhanced accessibility documentation with WCAG compliance notes

### 🔒 Dependencies
- Updated @stencil/core to v4.22.3
- Added @floating-ui/dom@1.5.4 for modal positioning
``` 