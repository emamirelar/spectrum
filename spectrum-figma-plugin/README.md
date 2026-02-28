# Spectrum M3 Tools — Figma Plugin

A Figma plugin that migrates Material Design 3 (M3) variable bindings to the Spectrum design token system. It walks every page in a Figma file, rebinds fills, strokes, effects, and scalar fields from M3 collections to their Spectrum equivalents, and can create missing Spectrum variables for state layers, typescale, font theme, and shape tokens.

## Installation

1. Clone or download this repository.
2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
3. In Figma, go to **Plugins > Development > Import plugin from manifest...** and select the `manifest.json` file from this directory.

## Commands

| # | Command | Description |
|---|---------|-------------|
| 1 | **Debug — List variable names** | Lists all local variable collections and the first 10 variable names in each. Useful for verifying collection names before running other commands. |
| 2 | **Swap M3 color to Spectrum** | Rebinds color variable bindings (fills, strokes, effects) from the M3 collection to matching Spectrum variables. Uses fallback mapping for M3 variables without a direct Spectrum equivalent. |
| 3 | **Rename Spectrum to M3 paths** | Renames Spectrum variables from `Schemes/sys/color/kebab-case` to `Schemes/Title Case` to match M3 naming structure. |
| 4 | **Revert M3 to Spectrum paths** | Reverses the rename — converts `Schemes/Title Case` back to `Schemes/sys/color/kebab-case`. |
| 5 | **Create Spectrum State Layers** | Creates State Layer and Add-on variables in the Spectrum collection by resolving base colors from existing Spectrum variables and applying opacity. |
| 6 | **Create Spectrum Typescale/Font/Shape vars** | Creates ~107 non-color variables in the Spectrum collection: 90 typescale (15 styles x 6 properties), 7 font theme, and 10 shape corner variables. |
| 7 | **Swap ALL M3 collections to Spectrum** | Comprehensive swap that rebinds bindings from M3, Font theme, Typescale, and Shape collections to Spectrum equivalents. Run commands 5 and 6 first to ensure all target variables exist. |

## Recommended Workflow

1. Run **command 1** (Debug) to verify your file has both `M3` and `Spectrum` collections.
2. Run **command 5** (Create State Layers) to fill in state layer and add-on variables.
3. Run **command 6** (Create Non-Color Vars) to fill in typescale, font theme, and shape variables.
4. Run **command 7** (Swap ALL) to rebind all M3 bindings to Spectrum.
5. Verify the results visually and optionally delete the M3 collections.

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
