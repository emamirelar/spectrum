# M3-to-Spectrum Migration -- Status & Handoff

**Last updated:** 2026-03-06
**Goal:** Rebind all M3 variable references and style references to Spectrum equivalents, align styles and component naming

---

## Progress

### Phase 1: Color Variable Swap -- DONE
- 24,657+ bindings swapped from M3 Schemes to Spectrum
- State Layer variables (148) created in Spectrum collection
- Spectrum collection now has 304 color variables

### Phase 2: Token Gap Filling -- DONE
- Added 4 missing typescale styles (display.small, title.small, label.large, label.medium)
- Expanded ALL typescale entries to include font, weight, weight-emphasized, size, line-height, tracking
- Added 6 missing shape tokens (corner-none, corner-extra-small, corner-large-increased, corner-extra-large, corner-extra-large-increased, corner-extra-extra-large)
- Added font theme tokens (brand, plain, tracking-none, tracking-small)
- Exposed all as CSS custom properties in spectrum-variables.css (including all 15 weight-emphasized vars)
- Synced typescale (90 vars), font theme (4 vars), shape (10 vars), and elevation (5 vars) to secondary copies: `packages/core/styles/spectrum-variables.css` and `packages/storybook/styles/spectrum-variables.css`

### Phase 3: Non-Color Variable Creation -- READY TO RUN
- Plugin extended with "Create Spectrum Typescale/Font/Shape vars" command
- Creates ~107 variables (90 typescale + 7 font theme + 10 shape) in Spectrum collection
- "Swap ALL M3 collections to Spectrum" command handles M3, Font theme, Typescale, Shape

### Phase 3b: M3 Style Swap -- READY TO RUN
- M3 defines button variants and other component styling via Figma **styles** (paint/effect styles like `M3/sys/light/primary`), not variables
- Previous phases only handled variable bindings; styles were left as M3 references or flattened to hardcoded hex values
- Plugin extended with "Swap M3 styles to Spectrum variables" command (command 8)
- Detects M3 paint/effect style references on all nodes (`fillStyleId`, `strokeStyleId`, `effectStyleId`)
- Maps M3 style names to Spectrum variable names:
  - `M3/sys/light/<name>` → `Schemes/<Title Case Name>` (e.g., `M3/sys/light/primary` → `Schemes/Primary`)
  - `M3/sys/dark/<name>` → same Spectrum variable (dark mode handled by variable modes)
  - `M3/state-layers/light/<camelName>/opacity-<N>` → `State Layers/<Title Case Name>/Opacity-<N>`
- Clears M3 style reference and binds the matching Spectrum variable
- Skips nodes that already have variable bindings (avoids conflicts)
- Also integrated into command 7 ("Swap ALL") so a single pass handles both variables and styles
- Uses existing FALLBACKS map for tokens without exact Spectrum matches

### Phase 4: Component Mapping -- DONE
- Created m3-to-spectrum-component-mapping.json with 34 M3 components mapped
- 17 mapped, 6 partial, 11 missing (need new Spectrum components)

### Phase 5: Component Instance Swap -- NOT STARTED
### Phase 6: Missing Spectrum Components -- NOT STARTED

---

## Next Steps (in Figma)

### 1. Clean up duplicate Spectrum collection
Delete the second "Spectrum" collection with 3 orphaned variables (old-style paths).

### 2. Re-import the plugin
Plugins > Development > Import plugin from manifest...
Point to: `packages/core/src/tokens/figma-swap-plugin/`

### 3. Run "6. Create Spectrum Typescale/Font/Shape vars"
Creates ~107 new variables in the Spectrum collection matching M3's Font theme, Typescale, and Shape collections.

### 4. Run "7. Swap ALL M3 collections to Spectrum"
Walks all pages and rebinds bindings from M3, Font theme, Typescale, and Shape collections to Spectrum equivalents.
Now also converts M3 style references (paint/effect styles) to Spectrum variable bindings in the same pass.

### 4b. (Alternative) Run "8. Swap M3 styles to Spectrum variables"
Standalone command that only converts M3 style references without touching variable bindings. Useful if you've already run variable swaps and only need to handle the remaining styles.

### 5. Verify and clean up
- Check that bindings look correct
- Optionally delete M3, Font theme, Typescale, and Shape collections

---

## Plugin Commands

| # | Command | What it does |
|---|---------|-------------|
| 1 | Debug | Lists all collections and first 10 variable names each |
| 2 | Swap M3 color to Spectrum | Rebinds color bindings from M3 to Spectrum |
| 3 | Rename Spectrum to M3 paths | Renames Spectrum var names to match M3 structure |
| 4 | Revert M3 to Spectrum paths | Reverses the rename |
| 5 | Create Spectrum State Layers | Creates State Layer + Add-on variables |
| 6 | Create Spectrum Typescale/Font/Shape vars | Creates 107 non-color variables |
| 7 | Swap ALL M3 collections to Spectrum | Rebinds ALL M3 collections (color + typography + shape) + converts M3 styles to variable bindings |
| 8 | Swap M3 styles to Spectrum variables | Converts M3 paint/effect style references to Spectrum variable bindings (standalone) |

---

## File Inventory

All files under `packages/core/src/tokens/`:

- `figma-swap-plugin/code.js` -- Figma plugin with 8 commands
- `figma-swap-plugin/manifest.json` -- plugin config
- `mapping.json` -- Spectrum token definitions (colors, state layers, typescale, shape, font, elevation)
- `m3-to-spectrum-mapping.json` -- M3-to-Spectrum variable reference mapping (49 entries)
- `m3-to-spectrum-component-mapping.json` -- M3-to-Spectrum component mapping (34 components)
- `M3/` directory -- original M3 token source files

CSS custom properties (all three copies kept in sync):
- `packages/core/src/styles/spectrum-variables.css` (authoritative, imported by components)
- `packages/core/styles/spectrum-variables.css` (secondary copy)
- `packages/storybook/styles/spectrum-variables.css` (storybook overrides)
