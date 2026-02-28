# Spectrum M3 Tools — Figma Plugin

A Figma plugin that migrates Material Design 3 (M3) designs to the Spectrum design token system. It handles two major migration axes:

1. **Variable rebinding** — walks every page and rebinds fills, strokes, effects, and scalar fields from M3 variable collections to their Spectrum equivalents.
2. **Component swapping** — identifies M3 component instances, maps them to Spectrum components via a built-in mapping table, and swaps them while preserving text overrides and variant properties.

The plugin can also create missing Spectrum variables for state layers, typescale, font theme, and shape tokens.

## Installation

1. Clone or download this repository.
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. In Figma, go to **Plugins > Development > Import plugin from manifest...** and select the `manifest.json` file from this directory.

## Commands

### Variable Migration

| # | Command | Description |
|---|---------|-------------|
| 1 | **Debug — List variable names** | Lists all local variable collections and the first 10 variable names in each. Useful for verifying collection names before running other commands. |
| 2 | **Swap M3 color to Spectrum** | Rebinds color variable bindings (fills, strokes, effects) from the M3 collection to matching Spectrum variables. Uses fallback mapping for M3 variables without a direct Spectrum equivalent. |
| 3 | **Rename Spectrum to M3 paths** | Renames Spectrum variables from `Schemes/sys/color/kebab-case` to `Schemes/Title Case` to match M3 naming structure. |
| 4 | **Revert M3 to Spectrum paths** | Reverses the rename — converts `Schemes/Title Case` back to `Schemes/sys/color/kebab-case`. |
| 5 | **Create Spectrum State Layers** | Creates State Layer and Add-on variables in the Spectrum collection by resolving base colors from existing Spectrum variables and applying opacity. |
| 6 | **Create Spectrum Typescale/Font/Shape vars** | Creates ~107 non-color variables in the Spectrum collection: 90 typescale (15 styles x 6 properties), 7 font theme, and 10 shape corner variables. |
| 7 | **Swap ALL M3 collections to Spectrum** | Comprehensive swap that rebinds bindings from M3, Font theme, Typescale, and Shape collections to Spectrum equivalents. Run commands 5 and 6 first to ensure all target variables exist. |

### Component Migration

| # | Command | Description |
|---|---------|-------------|
| 8 | **Audit M3 Components** | Scans all pages for M3 component instances and produces a detailed report: total instance count, per-page breakdown, variant usage, and migration readiness (mapped / partial / missing). |
| 9 | **Swap M3 Components to Spectrum** | Walks all pages and swaps M3 component instances to their Spectrum equivalents. Maps M3 variants to Spectrum properties (e.g. M3 "Filled" Button becomes `variant="primary"`). Preserves text overrides where possible. Reports components not yet available in the file. |

## Recommended Workflow

### Phase 1: Variables
1. Run **command 1** (Debug) to verify your file has both `M3` and `Spectrum` collections.
2. Run **command 5** (Create State Layers) to fill in state layer and add-on variables.
3. Run **command 6** (Create Non-Color Vars) to fill in typescale, font theme, and shape variables.
4. Run **command 7** (Swap ALL) to rebind all M3 variable bindings to Spectrum.
5. Verify the results visually and optionally delete the M3 collections.

### Phase 2: Components
1. Run **command 8** (Audit) to see which M3 components are in the file, how many instances each has, and whether a Spectrum equivalent exists.
2. Create any missing Spectrum components in the file (the audit report lists what's needed).
3. Run **command 9** (Swap Components) to replace M3 instances with Spectrum counterparts.
4. Review the swap report for any failures or skipped instances.

## Component Mapping

The plugin includes a mapping of 34 M3 components to their Spectrum equivalents:

| Status | Count | Description |
|--------|-------|-------------|
| **Mapped** | 17 | Direct Spectrum equivalent exists with variant mapping |
| **Partial** | 6 | Spectrum component exists but covers only a subset of M3 functionality |
| **Missing** | 11 | No Spectrum equivalent yet — needs new component development |

Key mappings include:

| M3 Component | Spectrum Target | Variant Mapping |
|---|---|---|
| Button (Filled) | spectrum-button | `variant="primary"` |
| Button (Outlined) | spectrum-button | `variant="outline"` |
| Button (Text) | spectrum-button | `variant="ghost"` |
| Chip (Filter/Assist/Input/Suggestion) | spectrum-chip | Maps to matching variant |
| Dialog | spectrum-dialog | Size mapping |
| Switch | spectrum-switch | Direct mapping |
| Snackbar | spectrum-toast | Direct mapping |
| Navigation Rail | spectrum-rail | Direct mapping |
| Menu | spectrum-menu | Direct mapping |
| Select / Dropdown | spectrum-select | Variant mapping |

The plugin also supports fuzzy name matching via aliases (e.g. "filled button", "nav rail", "dropdown menu" all resolve correctly).

## M3 Fallback Mapping

When an M3 variable has no direct Spectrum equivalent, the plugin uses a fallback mapping. For example:

| M3 Variable | Spectrum Fallback |
|---|---|
| Secondary Container | Secondary |
| On Tertiary | On Primary |
| On Error | On Danger |
| Surface Tint | Primary |
| Scrim | Shadow |
| Inverse Surface | On Surface |

See `src/code.ts` for the complete `FALLBACKS` mapping.

## Development

```bash
npm run build     # Compile TypeScript once
npm run watch     # Compile on file changes
npm run lint      # Run ESLint
npm run lint:fix  # Auto-fix lint issues
```

The TypeScript source lives in `src/code.ts`. The build output goes to `dist/code.js`, which is what `manifest.json` points to.

## Requirements

- **Figma Desktop** (plugins load from local manifest)
- **Node.js** >= 18 for building
- The Figma file must have variable collections named `M3` and `Spectrum`

## License

MIT
