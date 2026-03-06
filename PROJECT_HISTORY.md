# Spectrum Design System - Project History & Documentation

> A comprehensive record of the UNOPS Spectrum Design System, documenting every phase of development from inception to the current state.

**Project**: `@unops-itg-npm/cpit-spectrum`
**Current Version**: `0.0.1-alpha.42`
**Repository**: [UNOPS-ITG/cpit-spectrum](https://github.com/UNOPS-ITG/cpit-spectrum)
**Contributors**: Justin Waugh (primary), Ema Rogobete, Jagadeeswar Reddy
**Total Commits**: 196 | **Pull Requests Merged**: 50 | **Components Built**: 50
**Timeline**: December 2024 - March 2026

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Phase 1: Project Initialisation (Dec 2024)](#phase-1-project-initialisation-dec-2024)
4. [Phase 2: Foundation Components (Jan - Apr 2025)](#phase-2-foundation-components-jan---apr-2025)
5. [Phase 3: Navigation & Composition (Apr - May 2025)](#phase-3-navigation--composition-apr---may-2025)
6. [Phase 4: Interaction & Intelligence (May - Jun 2025)](#phase-4-interaction--intelligence-may---jun-2025)
7. [Phase 5: Component Ecosystem Expansion (Jun 2025)](#phase-5-component-ecosystem-expansion-jun-2025)
8. [Phase 6: Layout System & Theming (Jun - Jul 2025)](#phase-6-layout-system--theming-jun---jul-2025)
9. [Phase 7: Documentation & Avatar (Jul 2025)](#phase-7-documentation--avatar-jul-2025)
10. [Phase 8: Compliance & Production Hardening (Aug 2025)](#phase-8-compliance--production-hardening-aug-2025)
11. [Phase 9: Guided Experiences & JSON Compatibility (Sep 2025)](#phase-9-guided-experiences--json-compatibility-sep-2025)
12. [Phase 10: Media Library & Menu Enhancements (Nov 2025)](#phase-10-media-library--menu-enhancements-nov-2025)
13. [Phase 11: Dashboard & Data Visualisation (Feb 2026)](#phase-11-dashboard--data-visualisation-feb-2026)
14. [Phase 12: Figma Integration & Design Tokens (Feb - Mar 2026)](#phase-12-figma-integration--design-tokens-feb---mar-2026)
15. [Phase 13: Deployment, Testing & New Components (Mar 2026)](#phase-13-deployment-testing--new-components-mar-2026)
16. [Component Inventory](#component-inventory)
17. [Dependency Architecture](#dependency-architecture)
18. [AI-Assisted Development (Cursor Rules)](#ai-assisted-development-cursor-rules)
19. [Release History](#release-history)

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Components** | [Stencil.js](https://stenciljs.com/) | Web component compiler |
| **Design Tokens** | Material Design 3 + Custom | Colour, typography, spacing system |
| **Colour System** | `@material/material-color-utilities` | Dynamic colour generation |
| **Documentation** | [Storybook 9](https://storybook.js.org/) | Component playground and docs |
| **Templates** | [Lit](https://lit.dev/) | Story rendering in Storybook |
| **Build Tool** | [Vite](https://vitejs.dev/) | Storybook dev server and bundler |
| **Charts** | [Chart.js](https://www.chartjs.org/) | Data visualisation |
| **Carousel** | [Glide.js](https://glidejs.com/) | Content carousels |
| **Maps** | [MapLibre GL](https://maplibre.org/) + [Leaflet](https://leafletjs.com/) | Geospatial visualisation |
| **State** | `@stencil/store` | Dashboard state management |
| **Testing** | Jest, Playwright, Chromatic | Unit, E2E, visual regression |
| **Framework Bindings** | Stencil output targets | React, Vue, Angular wrappers |
| **Figma** | Custom plugin | Design token sync and migration |
| **Language** | TypeScript | Type-safe development |

---

## Project Structure

```
spectrum/
├── packages/
│   ├── core/                   # Stencil web components (main package)
│   │   ├── src/
│   │   │   ├── components/     # 50 web components
│   │   │   ├── global/         # Global CSS
│   │   │   ├── styles/         # Design tokens (spectrum-variables.css, spectrum-colors.css)
│   │   │   ├── tokens/         # M3 tokens, Figma mappings, migration assets
│   │   │   └── utils/          # Font loading, FOUC prevention, helpers
│   │   └── package.json        # @unops-itg-npm/cpit-spectrum
│   ├── storybook/              # Documentation & stories
│   │   ├── .storybook/         # Storybook config (main.ts, preview.ts)
│   │   └── src/stories/        # Stories, MDX docs, playground
│   ├── angular/                # Angular framework bindings
│   ├── react/                  # React framework bindings
│   └── vue/                    # Vue framework bindings
├── spectrum-figma-plugin/      # Figma plugin for design-code sync
├── .cursor/rules/              # 10 AI-assisted development rules
└── README.md
```

---

## Phase 1: Project Initialisation (Dec 2024)

**Commits**: `ef04cbe` - `32d2ad7` | **PR**: #2

The project was bootstrapped using a Stencil + Storybook boilerplate approach, establishing the monorepo workspace structure with Lerna.

**What was set up:**
- Monorepo with `packages/core`, `packages/storybook`, and framework binding packages (`angular`, `react`, `vue`)
- Stencil configuration with output targets for web components
- Storybook integration with Vite and Lit for story rendering
- npm workspace configuration
- GCP Artifact Registry publishing pipeline (`@unops-itg-npm/cpit-spectrum`)
- Basic CI/CD foundation

---

## Phase 2: Foundation Components (Jan - Apr 2025)

**Commits**: `7053cd2` - `3f2b8f6` | **PRs**: #3, #4

The first wave of atomic components was built, establishing the foundational building blocks of the design system.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-button** | Primary interactive element with variants (primary, secondary, tertiary, outlined, text), sizes (small, medium, large), icon support, and animations |
| **spectrum-accordion** | Expandable/collapsible content sections with mutually exclusive expansion |
| **spectrum-chip** | Small interactive tags/selections for filtering and categorisation |
| **spectrum-panel** | Versatile container with optional frost/glass effects |
| **spectrum-conversation-panel** | Chat/AI conversation interface for message display |

### Key Decisions
- **BEM naming convention** adopted: `spectrum-[component]__element--modifier`
- **CSS custom properties** strategy established using Spectrum design tokens
- Accordion refactored to use `spectrum-button` internally, establishing the composition pattern
- Panel component introduced chip-based interactions

---

## Phase 3: Navigation & Composition (Apr - May 2025)

**Commits**: `59b1aad` - `77f84c7` | **PRs**: #5 - #12

Navigation and composition components were built, creating the structural backbone for applications.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-search-input** | Enhanced search with voice input, enter-to-submit |
| **spectrum-rail** | Main navigation rail with expand/collapse, search integration |
| **spectrum-rail-item** | Individual rail navigation items with expand/collapse states |
| **spectrum-collapsible-list** | Hierarchical tree list with filtering and context menus |
| **spectrum-context-menu** | Contextual action overlay with positioning system |

### Architecture Patterns Established
- **Slot-based composition**: `spectrum-rail` uses slots for `spectrum-collapsible-list` and `spectrum-rail-item`, enabling flexible composition without tight coupling
- **Event communication**: Components communicate via `CustomEvent` with `action` attributes in payloads
- **Interface sharing**: `spectrum-context-menu` exports `ContextMenuAction` interface used by dependent components
- Base font and spacing system established using CSS custom properties

---

## Phase 4: Interaction & Intelligence (May - Jun 2025)

**Commits**: `204f49d` - `d6c9f1a` | **PRs**: #13 - #17

Focused on refining interaction patterns, event systems, and UX improvements across existing components.

### Key Improvements
- **Rail**: Styling improvements, mutually exclusive expansion, vertical expansion, search integration
- **Collapsible list**: Context menu integration, filtering, rename support
- **Context menu**: Enhanced positioning system with bottom alignment to prevent screen-edge clipping
- **Search input**: Enter-to-submit, improved styling
- **Conversation panel**: Loading indicators, source card overlay system
- **Wallpaper**: Colour extraction fixes, additional examples

### Refactoring
- **Action naming standardisation**: All events moved to a consistent naming approach, enforced by Cursor rules
- **CSS simplification**: Rail and collapsible list styles significantly simplified
- **Console logging cleanup**: Removed unnecessary debug output

---

## Phase 5: Component Ecosystem Expansion (Jun 2025)

**Commits**: `66100b6` - `995ed1c` | **PRs**: #18 - #26

A rapid expansion phase where many new components were added and the documentation system was formalised.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-select** | Comprehensive dropdown with single/multiple selection and search |
| **spectrum-image-gallery** | Responsive image gallery with upload, thumbnails, and preview mode |
| **spectrum-hero** | Hero sections with image/video backgrounds and carousel functionality |
| **spectrum-menu** | Responsive navigation menu with megamenu variant |
| **spectrum-megamenu** | Full-screen navigation overlay (via native popover API) |
| **spectrum-carousel** | Content carousel powered by Glide.js |
| **spectrum-toast** | Notification system for user feedback |
| **spectrum-dialog** | Modal dialog with configurable content and actions |

### Infrastructure
- **Debug mode** introduced across components (`debug` attribute for development logging)
- **Changelog system** formalised with Cursor AI rules for maintenance
- **Debug test page** added for component troubleshooting
- Theme-wallpaper coordination improved for loading experience
- Sound and haptic feedback experiments

---

## Phase 6: Layout System & Theming (Jun - Jul 2025)

**Commits**: `1f5e936` - `ca52770` | **PRs**: #28 - #35

The layout component system was built, providing a comprehensive set of layout primitives.

### Layout Components Created (All Production Ready)

| Component | Description |
|-----------|-------------|
| **spectrum-flex** | Flexbox layout utility |
| **spectrum-grid** | CSS Grid layout system |
| **spectrum-stack** | Vertical stacking with consistent spacing |
| **spectrum-cluster** | Flexible clustering with natural wrapping |
| **spectrum-container** | Content container with responsive behaviour |
| **spectrum-sidebar** | Sidebar navigation and content layout |
| **spectrum-app-layout** | Application layout container with responsive design |

### Other Additions
- **spectrum-panel** component added as a standalone versatile container
- **spectrum-badge** component for status and notification indicators
- Conversation panel scrolling bug fixed
- Rail animation refinements
- Haptic feedback integration

---

## Phase 7: Documentation & Avatar (Jul 2025)

**Commits**: `0b447c3` - `f1d281a` | **PRs**: #36, #37, #38

Major documentation overhaul and the avatar component, moving to a structured documentation approach.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-avatar** | User profile avatar with images, initials, icons, status indicators, and interactive states |

### Documentation Evolution
- **Storybook 9 migration**: Updated to Storybook v9.0.18
- **MDX documentation approach**: Moved to structured MDX docs for each component
- **Mermaid diagram support**: Added component for rendering architecture diagrams
- **Dependency map documentation**: Visual dependency extraction for component relationships
- Accordion enhanced with standard and chip variants
- Wallpaper updates and improvements

---

## Phase 8: Compliance & Production Hardening (Aug 2025)

**Commits**: `1804e61` - `43bfb46` | **PRs**: #39 - #44

Focus on compliance, production readiness, and new interactive components.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-cookie-compliance** | GDPR-compliant cookie consent with Google Tag Manager integration, granular preferences, and persistent status indicator |
| **spectrum-card** | Versatile content display with multiple variants, interactive states, and navigation support |

### Production Hardening
- **Debug logging refactored**: All `console.log` replaced with `debugLog` for production readiness
- **Toast component enhanced**: Custom `maxWidth`/`minWidth` sizing properties
- **Menu component**: Website-style navigation option, mobile bug fixes, logo integration
- **Accessibility improvements**: Comprehensive a11y enhancements for spectrum-menu
- Version management improved with cumulative releases

---

## Phase 9: Guided Experiences & JSON Compatibility (Sep 2025)

**Commits**: `37b691b` - `c566bdf` | **PRs**: #45, #46

New guided experience components and a major cross-cutting enhancement for HTML compatibility.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-switch** | Toggle switch for binary choices with accessibility support |
| **spectrum-wizard** | Step-by-step guided experience with progress tracking, cookie-based persistence, and time estimation |

### JSON String Input Support (Cross-Cutting)
A major enhancement was applied across all components with complex properties to support **both JavaScript objects and JSON strings**. This enables pure HTML usage without JavaScript:

**Components Updated:**
- `spectrum-collapsible-list`
- `spectrum-conversation-panel`
- `spectrum-menu`
- `spectrum-select`
- `spectrum-wizard`

```html
<!-- Now works in pure HTML -->
<spectrum-wizard steps='[{"title":"Step 1","content":"..."}]'></spectrum-wizard>
```

This pattern became a mandatory rule enforced via `.cursor/rules/web-component.mdc`.

---

## Phase 10: Media Library & Menu Enhancements (Nov 2025)

**Commits**: `28b096b` - `1f60902` | **PRs**: #47, #48

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-media-library** | Comprehensive media library with scrollable grid, integrated lightbox viewer, YouTube thumbnail extraction, and keyboard navigation |

### Menu Enhancements
- **Footer section** added to `spectrum-menu` with customisable items and titles
- Megamenu positioning refactored from fixed to absolute for better layout control
- CSS variable documentation improved with new styling options

---

## Phase 11: Dashboard & Data Visualisation (Feb 2026)

**Commits**: `d8902fe` - `9fe599d` | **PRs**: #49, #50

Enterprise-grade data visualisation capabilities added to the design system.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-dashboard** | JSON-driven dashboard engine with CSS Grid layout, centralised data management via `@stencil/store`, widget registry, and filtering |
| **spectrum-chart** | Flexible chart component supporting multiple Chart.js chart types (line, bar, pie, doughnut, etc.) |
| **dashboard-widget-host** | Internal widget container for the dashboard system |

### Infrastructure
- **Playwright** added as a testing dependency
- `.gitignore` updated to exclude debug scripts, images, and backup files
- Obsolete debug test files removed

---

## Phase 12: Figma Integration & Design Token Migration (Feb - Mar 2026)

**Commits**: `6f8f570` - `eabed76`

A major effort to migrate the entire Figma design file from Material Design 3 (M3) variable collections to a bespoke Spectrum variable collection, then rebind every layer, style, and component instance across the file. This work involved multiple tools: Figma Console scripts, a custom Figma plugin, JSON mapping files, and CSS custom property updates.

---

### Background: The Naming Problem

The Figma design file originally used M3's variable naming conventions:
- **M3 colour variables**: `Schemes/Primary`, `Schemes/On Surface`, `Schemes/Error Container` (Title Case, under the "M3" collection)
- **M3 styles**: `M3/sys/light/primary`, `M3/state-layers/light/onPrimary/opacity-12`
- **M3 non-colour variables**: Spread across separate `Font theme`, `Typescale`, and `Shape` collections

Spectrum needed its own variable collection with a different naming convention:
- **Spectrum colour variables**: `Schemes/sys/color/primary`, `Schemes/sys/color/on-surface` (kebab-case, under the "Spectrum" collection)
- **Spectrum CSS custom properties**: `--spectrum-sys-color-primary`, `--spectrum-sys-typescale-display-large-size`, `--spectrum-sys-shape-corner-medium`

The challenge was that Figma's built-in "Swap Variables" plugin matches variables **by group/name path** within collections. M3 uses Title Case (`On Primary Container`) while Spectrum uses kebab-case (`on-primary-container`), and the path prefixes differ. A direct swap would find zero matches.

---

### Step 1: Create the Variable Mapping (JSON)

**File**: `packages/core/src/tokens/m3-to-spectrum-mapping.json`

An AI-assisted conversation (documented in `cursor_json_mapping_for_m3_and_spectrum.md`) was used to analyse both variable sets and produce a structured mapping of all 49 M3 colour variables to their Spectrum equivalents.

Each mapping entry has a status:
- **`exact`** (20 variables): Direct name match exists in Spectrum — e.g. `Schemes/Primary` maps to `Schemes/Primary`
- **`fallback`** (27 variables): No direct match — a semantically closest Spectrum variable is suggested — e.g. `Schemes/On Background` falls back to `Schemes/On Surface`
- **`missing`** (2 variables): No reasonable Spectrum equivalent exists

Example entries:

```json
"Schemes/Primary": {
  "spectrum": "Schemes/Primary",
  "status": "exact"
},
"Schemes/On Background": {
  "spectrum": null,
  "fallback": "Schemes/On Surface",
  "status": "fallback",
  "reason": "on-background not in spectrum sys.color; on-surface serves the same role"
}
```

---

### Step 2: Rename Spectrum Variables to Match M3 Paths (Console Scripts)

**File**: `packages/core/src/tokens/figma-rename-scripts.js`

Since the Swap Variables plugin requires matching paths, the first trick was to **temporarily rename** the Spectrum variables to look like M3 variables. Three scripts were created to be pasted into the Figma Developer Console:

**Script 1 — Rename (Spectrum → M3 paths)**
Transforms `Schemes/sys/color/on-primary-container` → `Schemes/On Primary Container`:
- Strips the `sys/color/` prefix
- Converts kebab-case to Title Case
- Stores a backup in `window.__spectrumBackup` for reverting

**Script 2 — Revert using backup**
Uses the in-memory backup to restore original Spectrum names.

**Script 3 — Standalone revert (no backup needed)**
For cases where the browser was closed. Reverses Title Case → kebab-case and re-adds the `sys/color/` prefix.

The casing transformation logic:
```
Spectrum:  sys/color/on-primary-container
    ↓ rename
M3-compatible:  sys/light/On Primary Container
    ↓ Swap Variables plugin runs (bindings transferred)
    ↓ revert
Spectrum:  sys/color/on-primary-container
```

---

### Step 3: Swap M3 Colour Bindings to Spectrum (Figma Plugin - Command 2)

**File**: `packages/core/src/tokens/figma-swap-plugin/code.js` (compiled from `spectrum-figma-plugin/src/code.ts`)

After renaming, the Figma plugin's **"Swap M3 color to Spectrum"** command walks every page and node in the Figma file:

1. Loads all pages with `figma.loadAllPagesAsync()`
2. Builds a lookup map of all Spectrum variables by name
3. For every node with `boundVariables`, checks if any binding references an M3 variable
4. Finds the matching Spectrum variable (exact match first, then fallback from the `FALLBACKS` map)
5. Rebinds the paint/stroke/effect to the Spectrum variable using `figma.variables.setBoundVariableForPaint()`

**Result**: 24,657+ bindings swapped from M3 to Spectrum in a single pass.

---

### Step 4: Create State Layer Variables (Plugin - Command 5)

M3 defines State Layer variables (e.g. `State Layers/Primary/Opacity-12`) for hover/pressed/focus states. These didn't exist in the Spectrum collection.

The plugin's **"Create Spectrum State Layers"** command:
1. Reads all `State Layers/*` and `Add-ons/*` variables from the M3 collection
2. Resolves the base colour from Spectrum (e.g. `Primary` → Spectrum's `Schemes/Primary`)
3. Creates new variables in the Spectrum collection with the resolved colour at the appropriate opacity
4. Sets scopes to `FRAME_FILL`, `SHAPE_FILL`, `STROKE_COLOR`

**Result**: 148 State Layer variables + Add-on variables created in the Spectrum collection, bringing the total to 304 colour variables.

---

### Step 5: Fill Token Gaps — Typescale, Font Theme, Shape (Plugin - Command 6)

M3 distributes non-colour tokens across three separate collections (`Font theme`, `Typescale`, `Shape`). Spectrum needed these consolidated into a single collection.

The plugin's **"Create Spectrum Typescale/Font/Shape vars"** command creates ~107 variables:

**Typescale** (90 variables = 15 styles × 6 properties each):
| Style | Properties |
|-------|-----------|
| Display Large/Medium/Small | font, weight, weight-emphasized, size, line-height, tracking |
| Headline Large/Medium/Small | font, weight, weight-emphasized, size, line-height, tracking |
| Title Large/Medium/Small | font, weight, weight-emphasized, size, line-height, tracking |
| Body Large/Medium/Small | font, weight, weight-emphasized, size, line-height, tracking |
| Label Large/Medium/Small | font, weight, weight-emphasized, size, line-height, tracking |

**Font Theme** (7 variables):
| Variable | Type | Value |
|----------|------|-------|
| `Static/Font/Brand` | STRING | Noto Sans |
| `Static/Font/Plain` | STRING | Noto Sans |
| `Static/Weight/Regular` | FLOAT | 400 |
| `Static/Weight/Medium` | FLOAT | 500 |
| `Static/Weight/Bold` | FLOAT | 700 |
| `Tracking/None` | FLOAT | 0 |
| `Tracking/Small` | FLOAT | 0.1 |

**Shape** (10 variables):
| Variable | Value |
|----------|-------|
| `Corner/None` | 0 |
| `Corner/Extra-small` | 4 |
| `Corner/Small` | 8 |
| `Corner/Medium` | 12 |
| `Corner/Large` | 16 |
| `Corner/Large-increased` | 20 |
| `Corner/Extra-large` | 28 |
| `Corner/Extra-large-increased` | 32 |
| `Corner/Extra-extra-large` | 48 |
| `Corner/Full` | 9999 |

---

### Step 6: Swap ALL M3 Collections to Spectrum (Plugin - Command 7)

The comprehensive **"Swap ALL M3 collections to Spectrum"** command handles everything in a single pass:

1. Collects variable IDs from all four M3 collections: `M3`, `Font theme`, `Typescale`, `Shape`
2. Walks every node on every page
3. Rebinds variable bindings (fills, strokes, effects, scalar fields)
4. **Also converts M3 style references** to Spectrum variable bindings (Phase 3b — see below)
5. Reports a summary with swapped/failed/skipped counts

---

### Step 7: Swap M3 Styles to Spectrum Variables (Plugin - Command 8)

M3 defines visual styling through Figma **paint/effect styles** (e.g. `M3/sys/light/primary`), not variables. These were left as M3 references after the variable swap phases.

The plugin maps M3 style names to Spectrum variable names:
- `M3/sys/light/<name>` → `Schemes/<Title Case Name>` (e.g. `M3/sys/light/primary` → `Schemes/Primary`)
- `M3/sys/dark/<name>` → same Spectrum variable (dark mode handled by variable modes)
- `M3/state-layers/light/<camelName>/opacity-<N>` → `State Layers/<Title Case Name>/Opacity-<N>`
- `M3/ref/<family>/<tone>` → mapped via a tone-to-scheme lookup table

The swap process for each node:
1. Reads `fillStyleId`, `strokeStyleId`, `effectStyleId`
2. Checks if the style references an M3 style (name starts with `M3/`)
3. Skips nodes that already have variable bindings (avoids conflicts)
4. Skips elevation styles (shadow effects — not colour-swappable)
5. Clears the M3 style reference
6. Binds the matching Spectrum variable to the paint/stroke/effect

---

### Step 8: CSS Custom Property Synchronisation

All Figma variables were mirrored as CSS custom properties in `spectrum-variables.css`, following the Spectrum naming convention `--spectrum-sys-[category]-[name]`:

**File**: `packages/core/src/styles/spectrum-variables.css`

Colour tokens:
```css
--spectrum-sys-color-primary: var(--unops-color-blue);
--spectrum-sys-color-on-primary: var(--unops-color-white);
--spectrum-sys-color-surface: var(--unops-color-gray);
```

Typescale tokens (90 variables):
```css
--spectrum-sys-typescale-display-large-font: var(--spectrum-sys-font-family);
--spectrum-sys-typescale-display-large-weight: 400;
--spectrum-sys-typescale-display-large-weight-emphasized: 700;
--spectrum-sys-typescale-display-large-size: 57px;
--spectrum-sys-typescale-display-large-line-height: 64px;
--spectrum-sys-typescale-display-large-tracking: -0.25px;
/* ... all 15 styles × 6 properties ... */
```

Font theme tokens:
```css
--spectrum-sys-font-brand: var(--spectrum-sys-font-family);
--spectrum-sys-font-plain: var(--spectrum-sys-font-family);
--spectrum-sys-font-tracking-none: 0;
--spectrum-sys-font-tracking-small: 0.1px;
```

Shape tokens:
```css
--spectrum-sys-shape-corner-none: 0px;
--spectrum-sys-shape-corner-extra-small: 4px;
--spectrum-sys-shape-corner-small: 8px;
--spectrum-sys-shape-corner-medium: 12px;
--spectrum-sys-shape-corner-large: 16px;
--spectrum-sys-shape-corner-large-increased: 20px;
--spectrum-sys-shape-corner-extra-large: 28px;
--spectrum-sys-shape-corner-extra-large-increased: 32px;
--spectrum-sys-shape-corner-extra-extra-large: 48px;
--spectrum-sys-shape-corner-full: 9999px;
```

Elevation tokens:
```css
--spectrum-sys-elevation-1: 0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
/* ... through elevation-5 ... */
```

Three copies of `spectrum-variables.css` are kept in sync:
1. `packages/core/src/styles/spectrum-variables.css` — authoritative, imported by components
2. `packages/core/styles/spectrum-variables.css` — secondary copy
3. `packages/storybook/styles/spectrum-variables.css` — storybook overrides

---

### Step 9: Component Mapping (M3 → Spectrum)

**File**: `packages/core/src/tokens/m3-to-spectrum-component-mapping.json`

A comprehensive mapping of 34 M3 components to their Spectrum equivalents, with variant-level detail:

| Status | Count | Examples |
|--------|-------|---------|
| **Mapped** | 23 | Button (5 M3 variants → 5 Spectrum variants), Chip, Card, Dialog, Switch, Badge, Menu, Tabs, Progress, Tooltip, Segmented Button |
| **Partial** | 6 | Text Field (M3 has Filled/Outlined, Spectrum single style), Search (Spectrum is AI-oriented), Navigation Drawer, Top App Bar, Side Sheet, Lists |
| **Missing** | 5 | Slider, Divider, Date Picker, Time Picker, Bottom Sheet |

Example variant mapping:
```json
"Button": {
  "spectrum": "spectrum-button",
  "variants": {
    "Filled": "variant=\"primary\"",
    "Outlined": "variant=\"outline\"",
    "Text": "variant=\"ghost\"",
    "Filled Tonal": "variant=\"secondary\"",
    "Elevated": "variant=\"primary\""
  }
}
```

---

### The Two Figma Plugins

Two separate plugin systems were developed:

#### 1. Token Swap Plugin (`packages/core/src/tokens/figma-swap-plugin/`)
**Purpose**: Variable and style binding migration
**Commands** (8 total):

| # | Command | What it does |
|---|---------|-------------|
| 1 | Debug | Lists all collections and first 10 variable names each |
| 2 | Swap M3 color to Spectrum | Rebinds colour variable bindings from M3 to Spectrum |
| 3 | Rename Spectrum to M3 paths | Temporarily renames Spectrum vars to match M3 structure (for Swap Variables plugin) |
| 4 | Revert M3 to Spectrum paths | Reverses the rename |
| 5 | Create Spectrum State Layers | Creates 148+ State Layer + Add-on variables in Spectrum |
| 6 | Create Spectrum Typescale/Font/Shape vars | Creates ~107 non-colour variables |
| 7 | Swap ALL M3 collections to Spectrum | Rebinds ALL M3 bindings + converts M3 styles in one pass |
| 8 | Swap M3 styles to Spectrum variables | Converts M3 paint/effect style references to Spectrum variable bindings |

#### 2. Component Migration Plugin (`spectrum-figma-plugin/`)
**Purpose**: Component instance identification, auditing, and swapping
**Additional commands**:

| Command | What it does |
|---------|-------------|
| Audit Components | Scans all pages, identifies M3 component instances, reports counts by status (mapped/partial/missing), variant breakdown, and per-page totals |
| Swap Components | Walks all pages, identifies M3 instances, finds the matching Spectrum component (with variant mapping), swaps `instance.swapComponent()`, maps variant properties, preserves text content |

The component swap process:
1. Index all Spectrum components and component sets in the file
2. For each M3 instance, identify the component via name matching and alias lookup
3. Extract M3 variant values (e.g. `Style=Filled`)
4. Find the Spectrum component/variant via the mapping (e.g. `variant=primary`)
5. Call `swapComponent()` to replace the instance
6. Set Spectrum variant properties via `setProperties()`
7. Attempt to preserve text content from the original instance

---

### Migration File Inventory

All files under `packages/core/src/tokens/`:

| File | Size | Purpose |
|------|------|---------|
| `mapping.json` | 43 KB | Spectrum token definitions (UNOPS brand colours, colour scales, state layers, typography, shapes, elevation) |
| `M3-tokens.json` | 145 KB | Original M3 token source — complete M3 colour system |
| `spectrum-tokens.json` | 19 KB | Spectrum-specific token export |
| `color.tokens.json` | 73 KB | Colour token data |
| `m3-to-spectrum-mapping.json` | 9 KB | 49-entry M3 → Spectrum variable mapping with statuses and fallbacks |
| `m3-to-spectrum-component-mapping.json` | 8 KB | 34 M3 components mapped to Spectrum equivalents with variant detail |
| `cursor_json_mapping_for_m3_and_spectrum.md` | 59 KB | Full AI conversation transcript documenting the mapping creation process |
| `figma-rename-scripts.js` | 6 KB | Three Figma Console scripts for Spectrum ↔ M3 variable renaming |
| `figma-swap-plugin/code.js` | 34 KB | Compiled Figma plugin with 8 commands for variable/style swapping |
| `figma-swap-plugin/manifest.json` | 1 KB | Figma plugin manifest |
| `MIGRATION-STATUS.md` | 6 KB | Living status document tracking all 6 migration phases |
| `M3/Dark.tokens.json` | 108 KB | M3 dark theme token source |
| `M3/Light.tokens.json` | 107 KB | M3 light theme token source |
| `Other/` (30 files) | ~3.2 MB | Theme variant token files — 15 colour themes × 2 modes (Dark/Light): Blue, Chartreuse, Cyan, Green, Indigo, Monochrome, Orange, Pink, Purple, Red, Rose, Teal, Yellow + High/Medium Contrast variants |

#### Additional Figma Plugin (`spectrum-figma-plugin/`)

| File | Purpose |
|------|---------|
| `src/code.ts` | TypeScript source — full plugin with variable swap, state layers, non-colour vars, component audit, and component swap commands |
| `manifest.json` | Plugin manifest for Figma |
| `package.json` | Dependencies (`@figma/plugin-typings`) |
| `tsconfig.json` | TypeScript configuration |

---

### Migration Status Summary

| Phase | Status | Detail |
|-------|--------|--------|
| 1. Colour Variable Swap | DONE | 24,657+ bindings swapped, 304 colour variables in Spectrum |
| 2. Token Gap Filling | DONE | 90 typescale + 7 font + 10 shape + 5 elevation vars added |
| 3. Non-Colour Variable Creation | READY | Plugin command built, ~107 variables defined |
| 3b. M3 Style Swap | READY | Plugin converts paint/effect style references to variable bindings |
| 4. Component Mapping | DONE | 34 components mapped (23 mapped, 6 partial, 5 missing) |
| 5. Component Instance Swap | NOT STARTED | Plugin built, awaiting Spectrum components in Figma file |
| 6. Missing Spectrum Components | NOT STARTED | 5 components need creation (Slider, Divider, Date Picker, Time Picker, Bottom Sheet) |

---

## Phase 13: Deployment, Testing & New Components (Mar 2026)

**Commits**: `22d5109` - `6ab0103`

The most recent phase, focusing on deployment infrastructure, visual regression testing, and new component additions.

### Components Created

| Component | Description |
|-----------|-------------|
| **spectrum-segmented-button** | Multi-option button group for mode/view switching |

### Deployment & Testing
- **Vercel deployment**: `vercel.json` configuration and `build:storybook` command added
- **Chromatic integration**: Visual regression testing pipeline for automated screenshot comparisons
- Storybook dependencies and configuration updated
- **Playground stories** added for interactive component exploration

---

## Component Inventory

### Complete List (50 Components)

#### Atomic Components (No Internal Dependencies)
| Component | Category | Status |
|-----------|----------|--------|
| `spectrum-avatar` | Identity | Production |
| `spectrum-badge` | Status | Production |
| `spectrum-breadcrumb` | Navigation | Development |
| `spectrum-button` | Interactive | Production |
| `spectrum-card` | Content | Production |
| `spectrum-checkbox` | Form | Development |
| `spectrum-chip` | Interactive | Production |
| `spectrum-context-menu` | Utility | Production |
| `spectrum-data-table` | Data | Development |
| `spectrum-filter-panel` | Data | Development |
| `spectrum-map` | Geospatial | Development |
| `spectrum-panel` | Container | Production |
| `spectrum-progress` | Feedback | Development |
| `spectrum-radio` | Form | Development |
| `spectrum-score-card` | Data | Development |
| `spectrum-switch` | Form | Production |
| `spectrum-tabs` | Navigation | Development |
| `spectrum-text-input` | Form | Development |
| `spectrum-toast` | Feedback | Production |
| `spectrum-tooltip` | Utility | Development |
| `spectrum-wallpaper` | Theming | Production |

#### Composed Components (With Internal Dependencies)
| Component | Dependencies | Status |
|-----------|-------------|--------|
| `spectrum-accordion` | chip | Production |
| `spectrum-collapsible-list` | context-menu | Production |
| `spectrum-conversation-panel` | accordion, button, chip, panel | Production |
| `spectrum-cookie-compliance` | button, toast, dialog | Production |
| `spectrum-dialog` | button | Production |
| `spectrum-hero` | button | Production |
| `spectrum-image-gallery` | button, badge, panel | Production |
| `spectrum-media-library` | - | Production |
| `spectrum-menu` | - | Production |
| `spectrum-megamenu` | - | Production |
| `spectrum-rail` | button, search-input, collapsible-list, rail-item, context-menu | Production |
| `spectrum-rail-item` | button | Production |
| `spectrum-search-input` | button | Production |
| `spectrum-search-results` | button | Production |
| `spectrum-segmented-button` | - | Production |
| `spectrum-select` | button | Production |
| `spectrum-wizard` | button, chip, switch | Production |

#### Layout Components
| Component | Status |
|-----------|--------|
| `spectrum-app-layout` | Production |
| `spectrum-application-layout` | Production |
| `spectrum-cluster` | Production |
| `spectrum-container` | Production |
| `spectrum-flex` | Production |
| `spectrum-grid` | Production |
| `spectrum-sidebar` | Production |
| `spectrum-stack` | Production |

#### Data & Visualisation
| Component | Dependencies | Status |
|-----------|-------------|--------|
| `spectrum-chart` | chart.js | Production |
| `spectrum-dashboard` | @stencil/store | Production |
| `dashboard-widget-host` | Internal | Production |

#### Foundation
| Component | Dependencies | Status |
|-----------|-------------|--------|
| `spectrum-theme` | @material/material-color-utilities | Production |
| `spectrum-carousel` | @glidejs/glide | Production |

---

## Dependency Architecture

```
Level 0 - Foundation
└── spectrum-theme (Material Design 3 colour system)

Level 1 - Atomic (no internal deps)
├── spectrum-button
├── spectrum-chip
├── spectrum-switch
├── spectrum-badge
├── spectrum-panel
├── spectrum-context-menu
├── spectrum-wallpaper
├── spectrum-avatar
└── ...14 more

Level 2 - Composed (1-2 internal deps)
├── spectrum-accordion (chip)
├── spectrum-search-input (button)
├── spectrum-rail-item (button)
├── spectrum-collapsible-list (context-menu)
├── spectrum-select (button)
├── spectrum-hero (button)
├── spectrum-wizard (button, chip, switch)
├── spectrum-image-gallery (button, badge, panel)
├── spectrum-cookie-compliance (button, toast, dialog)
└── spectrum-search-results (button)

Level 3 - Complex (multiple internal deps)
├── spectrum-rail (button, search-input, collapsible-list, rail-item, context-menu)
├── spectrum-conversation-panel (accordion, button, chip, panel)
└── spectrum-dashboard (@stencil/store, widget registry)

Level 4 - Layout (independent)
├── spectrum-app-layout
├── spectrum-flex / grid / stack / cluster / container / sidebar
└── spectrum-application-layout
```

---

## AI-Assisted Development (Cursor Rules)

The project uses 10 Cursor AI rules to enforce consistency and quality:

| Rule File | Purpose |
|-----------|---------|
| `accessibility.mdc` | WCAG 2.1 AA compliance, ARIA patterns, keyboard navigation, screen reader support |
| `build.mdc` | Prevents AI from running builds unless explicitly asked |
| `changelog.mdc` | Changelog format, versioning workflow, and maintenance standards |
| `code-review.mdc` | Code review guidelines and quality checks |
| `component-events.mdc` | Event naming conventions, payload structure with mandatory `action` attributes, integration patterns |
| `css.mdc` | BEM naming, CSS custom properties, responsive patterns, design token usage |
| `dependency-changes.mdc` | Impact analysis protocol when changing component APIs, cascade update requirements |
| `spectrum-dependency-map.mdc` | Living document of all component relationships and integration patterns |
| `storybook.mdc` | Storybook conventions, story structure, documentation standards |
| `web-component.mdc` | Stencil generation process, mandatory JSON string support for complex properties |

---

## Release History

| Version | Date | Highlights |
|---------|------|------------|
| alpha.1 - alpha.19 | Apr - Jun 2025 | Foundation components, navigation system, conversation panel, collapsible lists |
| alpha.20 | 6 Jun 2025 | Select component, documentation improvements |
| alpha.21 - alpha.31 | Jun - Jul 2025 | Image gallery, hero, menu, layout system, haptic feedback, panel |
| alpha.32 | 22 Jul 2025 | Avatar component, Storybook 9, Mermaid diagrams, new documentation approach |
| alpha.33 - alpha.35 | Aug 2025 | Cookie compliance, card, toast enhancements, debug logging overhaul, accessibility improvements |
| alpha.36 | 26 Aug 2025 | Card component, production debug logging |
| alpha.37 | 23 Sep 2025 | Switch and wizard components |
| alpha.38 | 30 Sep 2025 | JSON string input support across all complex-prop components |
| alpha.39 | 11 Nov 2025 | Media library, menu footer, megamenu positioning |
| alpha.40 - alpha.41 | Feb 2026 | Dashboard, chart, Playwright, Figma plugin |
| alpha.42 | Mar 2026 | Segmented button, Vercel deployment, Chromatic visual regression, Figma token migration |

---

## Publishing & Distribution

- **Registry**: GCP Artifact Registry (`@unops-itg-npm/cpit-spectrum`)
- **Scope**: `@unops-itg-npm`
- **Framework Support**: React, Vue, Angular (via Stencil output targets), and vanilla JS/HTML
- **Documentation**: Storybook hosted via GitHub Pages and Vercel
- **Visual Testing**: Chromatic for automated visual regression

---

## Key Technical Decisions

1. **Stencil over Lit/raw Web Components**: Chosen for its compiler-based approach, framework bindings, and JSX support
2. **Material Design 3 colour system**: Dynamic colour generation from seed colours via `@material/material-color-utilities`
3. **BEM + CSS custom properties**: Consistent naming with theming flexibility
4. **Event-driven communication**: Loose coupling between components via CustomEvents, not direct imports
5. **Slot-based composition**: Complex components composed via slots rather than hard dependencies
6. **JSON string property support**: All complex props accept both JS objects and JSON strings for HTML-first compatibility
7. **Monorepo with Lerna**: Single repository for core, storybook, and framework bindings
8. **Cursor AI rules**: Enforced consistency across accessibility, CSS, events, dependencies, and documentation

---

*Document generated: 6 March 2026*
*Based on analysis of 196 commits, 50 pull requests, and 50 components across 15 months of development.*
