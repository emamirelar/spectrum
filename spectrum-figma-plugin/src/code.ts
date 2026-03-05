const COLLECTION_NAME = 'Spectrum';
const SPECTRUM_PREFIX = 'Schemes/sys/color/';
const M3_PREFIX       = 'Schemes/';

const FALLBACKS: Record<string, string> = {
  'Schemes/Secondary Container': 'Schemes/Secondary',
  'Schemes/On Secondary Container': 'Schemes/On Secondary',
  'Schemes/On Tertiary': 'Schemes/On Primary',
  'Schemes/Tertiary Container': 'Schemes/Tertiary',
  'Schemes/On Tertiary Container': 'Schemes/On Surface',
  'Schemes/On Error': 'Schemes/On Danger',
  'Schemes/On Error Container': 'Schemes/On Danger',
  'Schemes/On Background': 'Schemes/On Surface',
  'Schemes/Surface Tint': 'Schemes/Primary',
  'Schemes/Scrim': 'Schemes/Shadow',
  'Schemes/Inverse Surface': 'Schemes/On Surface',
  'Schemes/Inverse On Surface': 'Schemes/Surface',
  'Schemes/Inverse Primary': 'Schemes/Primary',
  'Schemes/Primary Fixed': 'Schemes/Primary Container',
  'Schemes/On Primary Fixed': 'Schemes/On Primary',
  'Schemes/Primary Fixed Dim': 'Schemes/Primary',
  'Schemes/On Primary Fixed Variant': 'Schemes/On Primary Container',
  'Schemes/Secondary Fixed': 'Schemes/Secondary',
  'Schemes/On Secondary Fixed': 'Schemes/On Secondary',
  'Schemes/Secondary Fixed Dim': 'Schemes/Secondary',
  'Schemes/On Secondary Fixed Variant': 'Schemes/On Secondary',
  'Schemes/Tertiary Fixed': 'Schemes/Tertiary',
  'Schemes/On Tertiary Fixed': 'Schemes/On Primary',
  'Schemes/Tertiary Fixed Dim': 'Schemes/Tertiary',
  'Schemes/On Tertiary Fixed Variant': 'Schemes/On Surface',
  'Schemes/Surface Dim': 'Schemes/Surface',
  'Schemes/Surface Bright': 'Schemes/Surface',
  'Schemes/Surface Container Lowest': 'Schemes/Surface Container Low',
  'Schemes/Surface Container High': 'Schemes/Surface Container',
  'Schemes/Surface Container Highest': 'Schemes/Surface Container',
};

// ---------------------------------------------------------------------------
// Typescale, font theme, and shape definitions
// ---------------------------------------------------------------------------

interface TypescaleStyle {
  weight: number;
  weightEmph: number;
  size: number;
  lineHeight: number;
  tracking: number;
}

const TYPESCALE_STYLES: Record<string, TypescaleStyle> = {
  'Display Large':   { weight: 400, weightEmph: 700, size: 57, lineHeight: 64, tracking: -0.25 },
  'Display Medium':  { weight: 400, weightEmph: 700, size: 45, lineHeight: 52, tracking: 0 },
  'Display Small':   { weight: 400, weightEmph: 700, size: 36, lineHeight: 44, tracking: 0 },
  'Headline Large':  { weight: 400, weightEmph: 700, size: 32, lineHeight: 40, tracking: 0 },
  'Headline Medium': { weight: 400, weightEmph: 700, size: 28, lineHeight: 36, tracking: 0 },
  'Headline Small':  { weight: 400, weightEmph: 700, size: 24, lineHeight: 32, tracking: 0 },
  'Title Large':     { weight: 400, weightEmph: 700, size: 22, lineHeight: 28, tracking: 0 },
  'Title Medium':    { weight: 500, weightEmph: 700, size: 16, lineHeight: 24, tracking: 0.15 },
  'Title Small':     { weight: 500, weightEmph: 700, size: 14, lineHeight: 20, tracking: 0.1 },
  'Body Large':      { weight: 400, weightEmph: 700, size: 16, lineHeight: 24, tracking: 0.5 },
  'Body Medium':     { weight: 400, weightEmph: 700, size: 14, lineHeight: 20, tracking: 0.25 },
  'Body Small':      { weight: 400, weightEmph: 700, size: 12, lineHeight: 16, tracking: 0.4 },
  'Label Large':     { weight: 500, weightEmph: 700, size: 14, lineHeight: 20, tracking: 0.1 },
  'Label Medium':    { weight: 500, weightEmph: 700, size: 12, lineHeight: 16, tracking: 0.5 },
  'Label Small':     { weight: 500, weightEmph: 700, size: 11, lineHeight: 16, tracking: 0.5 },
};

interface FontThemeVarDef {
  type: VariableResolvedDataType;
  value: string | number;
}

const FONT_THEME_VARS: Record<string, FontThemeVarDef> = {
  'Static/Font/Brand':     { type: 'STRING', value: 'Noto Sans' },
  'Static/Font/Plain':     { type: 'STRING', value: 'Noto Sans' },
  'Static/Weight/Regular': { type: 'FLOAT',  value: 400 },
  'Static/Weight/Medium':  { type: 'FLOAT',  value: 500 },
  'Static/Weight/Bold':    { type: 'FLOAT',  value: 700 },
  'Tracking/None':         { type: 'FLOAT',  value: 0 },
  'Tracking/Small':        { type: 'FLOAT',  value: 0.1 },
};

const SHAPE_VARS: Record<string, number> = {
  'Corner/None': 0,
  'Corner/Extra-small': 4,
  'Corner/Small': 8,
  'Corner/Medium': 12,
  'Corner/Large': 16,
  'Corner/Large-increased': 20,
  'Corner/Extra-large': 28,
  'Corner/Extra-large-increased': 32,
  'Corner/Extra-extra-large': 48,
  'Corner/Full': 9999,
};

// ---------------------------------------------------------------------------
// M3-to-Spectrum Component Mapping
// ---------------------------------------------------------------------------

interface ComponentMapping {
  spectrum: string | null;
  status: 'mapped' | 'partial' | 'missing';
  notes: string;
  variantMap: Record<string, Record<string, string>>;
}

const COMPONENT_MAP: Record<string, ComponentMapping> = {
  'Navigation Rail': {
    spectrum: 'spectrum-rail',
    status: 'mapped',
    notes: 'Spectrum rail is more feature-rich (search, add button, collapsible lists)',
    variantMap: {},
  },
  'Button': {
    spectrum: 'spectrum-button',
    status: 'mapped',
    notes: '',
    variantMap: {
      'Filled':       { variant: 'primary' },
      'Outlined':     { variant: 'outline' },
      'Text':         { variant: 'ghost' },
      'Filled Tonal': { variant: 'secondary' },
      'Elevated':     { variant: 'primary' },
    },
  },
  'FAB': {
    spectrum: 'spectrum-button',
    status: 'mapped',
    notes: '',
    variantMap: {
      'FAB':          { variant: 'fab' },
      'Extended FAB': { variant: 'fab' },
    },
  },
  'Icon Button': {
    spectrum: 'spectrum-button',
    status: 'mapped',
    notes: '',
    variantMap: {
      'Standard':     { variant: 'ghost', iconOnly: 'true' },
      'Filled':       { variant: 'primary', iconOnly: 'true' },
      'Filled Tonal': { variant: 'secondary', iconOnly: 'true' },
      'Outlined':     { variant: 'outline', iconOnly: 'true' },
    },
  },
  'Chip': {
    spectrum: 'spectrum-chip',
    status: 'mapped',
    notes: '',
    variantMap: {
      'Assist':     { variant: 'assist' },
      'Filter':     { variant: 'filter' },
      'Input':      { variant: 'input' },
      'Suggestion': { variant: 'suggestion' },
    },
  },
  'Card': {
    spectrum: 'spectrum-card',
    status: 'mapped',
    notes: '',
    variantMap: {
      'Elevated': { variant: 'elevated' },
      'Filled':   { variant: 'filled' },
      'Outlined': { variant: 'outlined' },
    },
  },
  'Dialog': {
    spectrum: 'spectrum-dialog',
    status: 'mapped',
    notes: '',
    variantMap: {
      'Basic':       { size: 'medium' },
      'Full-screen': { size: 'full' },
    },
  },
  'Switch': {
    spectrum: 'spectrum-switch',
    status: 'mapped',
    notes: 'Spectrum adds showIcons, loading, variant (primary/positive/caution/destructive)',
    variantMap: {},
  },
  'Text Field': {
    spectrum: 'spectrum-text-input',
    status: 'partial',
    notes: 'M3 has Filled/Outlined variants; Spectrum uses single style',
    variantMap: {
      'Filled':   {},
      'Outlined': {},
    },
  },
  'Search': {
    spectrum: 'spectrum-search-input',
    status: 'partial',
    notes: 'Spectrum search is AI-chat oriented (multiline, voice input). M3 search bar is simpler.',
    variantMap: {
      'Search bar':  {},
      'Search view': {},
    },
  },
  'Snackbar': {
    spectrum: 'spectrum-toast',
    status: 'mapped',
    notes: 'Spectrum toast adds position, persistent, variant options',
    variantMap: {},
  },
  'Badge': {
    spectrum: 'spectrum-badge',
    status: 'mapped',
    notes: '',
    variantMap: {
      'Small': { size: 'small' },
      'Large': { size: 'large' },
    },
  },
  'Navigation Drawer': {
    spectrum: 'spectrum-sidebar',
    status: 'partial',
    notes: 'Spectrum sidebar is layout-focused; M3 drawer has specific navigation patterns',
    variantMap: {
      'Standard': { position: 'left' },
      'Modal':    { overlay: 'true' },
    },
  },
  'Menu': {
    spectrum: 'spectrum-menu',
    status: 'mapped',
    notes: 'Spectrum adds megamenu variant and responsive mobile handling',
    variantMap: {},
  },
  'Exposed Dropdown Menu': {
    spectrum: 'spectrum-select',
    status: 'mapped',
    notes: 'Spectrum adds searchable, virtualScrolling, multiple selection',
    variantMap: {
      'Filled':   { variant: 'primary' },
      'Outlined': { variant: 'outline' },
    },
  },
  'Top App Bar': {
    spectrum: 'spectrum-app-layout',
    status: 'partial',
    notes: 'Spectrum handles this at layout level, not as standalone component',
    variantMap: {},
  },
  'Segmented Button': {
    spectrum: 'spectrum-segmented-button',
    status: 'mapped',
    notes: 'M3 Segmented Button maps to Spectrum segmented-button component',
    variantMap: {},
  },
  'Checkbox': {
    spectrum: 'spectrum-checkbox',
    status: 'mapped',
    notes: 'M3 Checkbox maps directly to Spectrum checkbox',
    variantMap: {},
  },
  'Radio Button': {
    spectrum: 'spectrum-radio',
    status: 'mapped',
    notes: 'M3 Radio Button maps to Spectrum radio',
    variantMap: {},
  },
  'Tabs': {
    spectrum: 'spectrum-tabs',
    status: 'mapped',
    notes: 'M3 Primary/Secondary tab variants map to Spectrum variant prop',
    variantMap: {
      'Primary':   { variant: 'primary' },
      'Secondary': { variant: 'secondary' },
    },
  },
  'Progress Indicator': {
    spectrum: 'spectrum-progress',
    status: 'mapped',
    notes: 'M3 Circular/Linear map to Spectrum variant prop',
    variantMap: {
      'Circular': { variant: 'circular' },
      'Linear':   { variant: 'linear' },
    },
  },
  'Tooltip': {
    spectrum: 'spectrum-tooltip',
    status: 'mapped',
    notes: 'M3 Plain/Rich variants map to Spectrum variant prop',
    variantMap: {
      'Plain': { variant: 'plain' },
      'Rich':  { variant: 'rich' },
    },
  },
  'Slider': {
    spectrum: null,
    status: 'missing',
    notes: 'Needs spectrum-slider component. M3 has Continuous and Discrete variants.',
    variantMap: {},
  },
  'Divider': {
    spectrum: null,
    status: 'missing',
    notes: 'Simple CSS utility; could be spectrum-divider or handled with border/hr',
    variantMap: {},
  },
  'Date Picker': {
    spectrum: null,
    status: 'missing',
    notes: 'Complex component; M3 has Docked, Modal, and Input variants',
    variantMap: {},
  },
  'Time Picker': {
    spectrum: null,
    status: 'missing',
    notes: 'Complex component; M3 has Dial and Input variants',
    variantMap: {},
  },
  'Bottom Sheet': {
    spectrum: null,
    status: 'missing',
    notes: 'Could partially use spectrum-dialog size="full" on mobile',
    variantMap: {},
  },
  'Carousel': {
    spectrum: null,
    status: 'missing',
    notes: 'Needs spectrum-carousel component',
    variantMap: {},
  },
  'Bottom Navigation Bar': {
    spectrum: null,
    status: 'missing',
    notes: 'Mobile-specific navigation pattern',
    variantMap: {},
  },
  'Side Sheet': {
    spectrum: 'spectrum-sidebar',
    status: 'partial',
    notes: 'Could extend spectrum-sidebar with sheet behavior (position right, overlay)',
    variantMap: {},
  },
  'Lists': {
    spectrum: 'spectrum-collapsible-list',
    status: 'partial',
    notes: "Spectrum's list is specialized for rail navigation; M3 lists are more general purpose",
    variantMap: {},
  },
};

const M3_NAME_ALIASES: Record<string, string> = {
  'filled button':       'Button',
  'outlined button':     'Button',
  'text button':         'Button',
  'tonal button':        'Button',
  'elevated button':     'Button',
  'extended fab':        'FAB',
  'floating action button': 'FAB',
  'icon button':         'Icon Button',
  'filter chip':         'Chip',
  'assist chip':         'Chip',
  'input chip':          'Chip',
  'suggestion chip':     'Chip',
  'filled card':         'Card',
  'elevated card':       'Card',
  'outlined card':       'Card',
  'navigation rail':     'Navigation Rail',
  'navigation drawer':   'Navigation Drawer',
  'nav rail':            'Navigation Rail',
  'nav drawer':          'Navigation Drawer',
  'snackbar':            'Snackbar',
  'top app bar':         'Top App Bar',
  'app bar':             'Top App Bar',
  'text field':          'Text Field',
  'text input':          'Text Field',
  'search bar':          'Search',
  'dropdown':            'Exposed Dropdown Menu',
  'dropdown menu':       'Exposed Dropdown Menu',
  'select':              'Exposed Dropdown Menu',
  'exposed dropdown menu': 'Exposed Dropdown Menu',
  'segmented button':    'Segmented Button',
  'radio button':        'Radio Button',
  'radio':               'Radio Button',
  'progress indicator':  'Progress Indicator',
  'progress bar':        'Progress Indicator',
  'circular progress':   'Progress Indicator',
  'linear progress':     'Progress Indicator',
  'date picker':         'Date Picker',
  'time picker':         'Time Picker',
  'bottom sheet':        'Bottom Sheet',
  'bottom navigation':   'Bottom Navigation Bar',
  'bottom nav':          'Bottom Navigation Bar',
  'side sheet':          'Side Sheet',
  'checkbox':            'Checkbox',
  'check box':           'Checkbox',
  'tabs':                'Tabs',
  'tab':                 'Tabs',
  'primary tab':         'Tabs',
  'secondary tab':       'Tabs',
  'tooltip':             'Tooltip',
  'plain tooltip':       'Tooltip',
  'rich tooltip':        'Tooltip',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toTitleCase(kebab: string): string {
  return kebab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function toKebabCase(titleCase: string): string {
  return titleCase.split(' ').map(w => w.toLowerCase()).join('-');
}

function findCollectionByName(name: string): VariableCollection | undefined {
  const collections = figma.variables.getLocalVariableCollections();
  return collections.find(c => c.name.toLowerCase() === name.toLowerCase());
}

// ---------------------------------------------------------------------------
// M3 Component Identification
// ---------------------------------------------------------------------------

interface M3Match {
  m3Name: string;
  mapping: ComponentMapping;
}

async function identifyM3Component(instance: InstanceNode): Promise<M3Match | null> {
  const main = await instance.getMainComponentAsync();
  if (!main) return null;

  const setName = (main.parent && main.parent.type === 'COMPONENT_SET')
    ? (main.parent as ComponentSetNode).name
    : null;
  const componentName = main.name;

  if (componentName.toLowerCase().startsWith('spectrum-')) return null;
  if (setName && setName.toLowerCase().startsWith('spectrum-')) return null;

  const candidateName = setName || componentName;
  if (COMPONENT_MAP[candidateName]) {
    return { m3Name: candidateName, mapping: COMPONENT_MAP[candidateName] };
  }

  const normalized = candidateName.replace(/\//g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  if (M3_NAME_ALIASES[normalized]) {
    const key = M3_NAME_ALIASES[normalized];
    return { m3Name: key, mapping: COMPONENT_MAP[key] };
  }

  for (const [alias, mapKey] of Object.entries(M3_NAME_ALIASES)) {
    if (normalized.includes(alias)) {
      return { m3Name: mapKey, mapping: COMPONENT_MAP[mapKey] };
    }
  }

  for (const mapKey of Object.keys(COMPONENT_MAP)) {
    if (normalized === mapKey.toLowerCase()) {
      return { m3Name: mapKey, mapping: COMPONENT_MAP[mapKey] };
    }
  }

  return null;
}

function extractVariantValues(instance: InstanceNode): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [rawName, prop] of Object.entries(instance.componentProperties)) {
    if (prop.type === 'VARIANT') {
      result[rawName.split('#')[0]] = prop.value as string;
    }
  }
  return result;
}

function findVariantMapping(
  m3Variants: Record<string, string>,
  mapping: ComponentMapping,
): Record<string, string> | null {
  for (const variantValue of Object.values(m3Variants)) {
    if (mapping.variantMap[variantValue]) {
      return mapping.variantMap[variantValue];
    }
  }
  return null;
}

function setInstanceProperty(instance: InstanceNode, propName: string, value: string): boolean {
  const props = instance.componentProperties;
  for (const rawName of Object.keys(props)) {
    if (rawName.split('#')[0] === propName) {
      try {
        instance.setProperties({ [rawName]: value });
        return true;
      } catch (_e) { return false; }
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// Command: rename  (Spectrum paths -> M3 paths)
// ---------------------------------------------------------------------------

function rename(): void {
  const collection = findCollectionByName(COLLECTION_NAME);
  if (!collection) {
    figma.notify(`Collection "${COLLECTION_NAME}" not found.`, { error: true });
    return figma.closePlugin();
  }

  let renamed = 0;
  let skipped = 0;

  for (const id of collection.variableIds) {
    const variable = figma.variables.getVariableById(id);
    if (!variable) continue;

    if (variable.name.startsWith(SPECTRUM_PREFIX)) {
      const namePart = variable.name.slice(SPECTRUM_PREFIX.length);
      variable.name = M3_PREFIX + toTitleCase(namePart);
      renamed++;
    } else {
      skipped++;
    }
  }

  figma.notify(`Renamed ${renamed} variable(s) to M3 paths. ${skipped} skipped.`);
  figma.closePlugin();
}

// ---------------------------------------------------------------------------
// Command: revert  (M3 paths -> Spectrum paths)
// ---------------------------------------------------------------------------

function revert(): void {
  const collection = findCollectionByName(COLLECTION_NAME);
  if (!collection) {
    figma.notify(`Collection "${COLLECTION_NAME}" not found.`, { error: true });
    return figma.closePlugin();
  }

  let restored = 0;
  let skipped = 0;

  for (const id of collection.variableIds) {
    const variable = figma.variables.getVariableById(id);
    if (!variable) continue;

    if (variable.name.startsWith(M3_PREFIX) && !variable.name.startsWith(SPECTRUM_PREFIX)) {
      const namePart = variable.name.slice(M3_PREFIX.length);
      variable.name = SPECTRUM_PREFIX + toKebabCase(namePart);
      restored++;
    } else {
      skipped++;
    }
  }

  figma.notify(`Reverted ${restored} variable(s) back to Spectrum paths. ${skipped} skipped.`);
  figma.closePlugin();
}

// ---------------------------------------------------------------------------
// Command: debug
// ---------------------------------------------------------------------------

function debug(): void {
  const collections = figma.variables.getLocalVariableCollections();
  const lines: string[] = [];

  for (const col of collections) {
    lines.push(`\n=== Collection: "${col.name}" (${col.variableIds.length} vars) ===`);
    const sample = col.variableIds.slice(0, 10);
    for (const id of sample) {
      const v = figma.variables.getVariableById(id);
      if (v) lines.push(`  ${v.name}`);
    }
    if (col.variableIds.length > 10) {
      lines.push(`  ... and ${col.variableIds.length - 10} more`);
    }
  }

  figma.showUI(
    `<pre style="font:12px/1.5 monospace;padding:16px;white-space:pre-wrap">${lines.join('\n')}</pre>`,
    { width: 500, height: 400 }
  );
}

// ---------------------------------------------------------------------------
// Command: swap  (rebind M3 color bindings to Spectrum)
// ---------------------------------------------------------------------------

async function swap(): Promise<void> {
  const m3Col = findCollectionByName('M3');
  const specCol = findCollectionByName('Spectrum');

  if (!m3Col) {
    figma.notify('M3 collection not found.', { error: true });
    return figma.closePlugin();
  }
  if (!specCol) {
    figma.notify('Spectrum collection not found.', { error: true });
    return figma.closePlugin();
  }

  await figma.loadAllPagesAsync();

  const m3VarIds = new Set(m3Col.variableIds);

  const specByName = new Map<string, Variable>();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v) specByName.set(v.name, v);
  }

  function findMatch(varId: string): Variable | null {
    const m3Var = figma.variables.getVariableById(varId);
    if (!m3Var) return null;
    if (specByName.has(m3Var.name)) return specByName.get(m3Var.name)!;
    const fb = FALLBACKS[m3Var.name];
    if (fb && specByName.has(fb)) return specByName.get(fb)!;
    return null;
  }

  let swapped = 0;
  let failed = 0;
  const failedVars = new Set<string>();

  function swapPaintArray(node: SceneNode, field: 'fills' | 'strokes'): void {
    const bv = node.boundVariables as Record<string, VariableAlias[]>;
    const bindings = bv[field];
    if (!bindings || !Array.isArray(bindings)) return;

    const paints = (node as GeometryMixin)[field];
    if (!paints || paints === figma.mixed) return;

    const newPaints = [...(paints as Paint[])];
    let changed = false;

    for (let i = 0; i < bindings.length; i++) {
      const alias = bindings[i];
      if (!alias || !alias.id) continue;
      if (!m3VarIds.has(alias.id)) continue;

      const match = findMatch(alias.id);
      if (match && newPaints[i] && newPaints[i].type === 'SOLID') {
        try {
          newPaints[i] = figma.variables.setBoundVariableForPaint(newPaints[i] as SolidPaint, 'color', match);
          changed = true;
          swapped++;
        } catch (_e) {
          failed++;
          const m3v = figma.variables.getVariableById(alias.id);
          if (m3v) failedVars.add(m3v.name + ' (paint error)');
        }
      } else if (!match) {
        failed++;
        const m3v = figma.variables.getVariableById(alias.id);
        if (m3v) failedVars.add(m3v.name);
      }
    }

    if (changed) {
      try {
        (node as GeometryMixin)[field] = newPaints;
      } catch (_e) { /* read-only node */ }
    }
  }

  function swapEffects(node: SceneNode): void {
    const bv = node.boundVariables as Record<string, VariableAlias[]>;
    const bindings = bv['effects'];
    if (!bindings || !Array.isArray(bindings)) return;

    const effects = (node as BlendMixin).effects;
    if (!effects || effects.length === 0) return;

    const newEffects = [...effects];
    let changed = false;

    for (let i = 0; i < bindings.length; i++) {
      const alias = bindings[i];
      if (!alias || !alias.id) continue;
      if (!m3VarIds.has(alias.id)) continue;

      const match = findMatch(alias.id);
      if (match && newEffects[i]) {
        try {
          newEffects[i] = figma.variables.setBoundVariableForEffect(newEffects[i], 'color', match);
          changed = true;
          swapped++;
        } catch (_e) {
          failed++;
          const m3v = figma.variables.getVariableById(alias.id);
          if (m3v) failedVars.add(m3v.name + ' (effect error)');
        }
      } else if (!match) {
        failed++;
        const m3v = figma.variables.getVariableById(alias.id);
        if (m3v) failedVars.add(m3v.name);
      }
    }

    if (changed) {
      try { (node as BlendMixin).effects = newEffects; } catch (_e) { /* read-only */ }
    }
  }

  function swapScalarFields(node: SceneNode): void {
    const bv = node.boundVariables as Record<string, VariableAlias | VariableAlias[]>;
    const skipFields = new Set(['fills', 'strokes', 'effects', 'layoutGrids', 'componentProperties']);

    for (const [field, alias] of Object.entries(bv)) {
      if (skipFields.has(field)) continue;
      if (!alias || typeof alias !== 'object' || !('id' in alias)) continue;
      if (Array.isArray(alias)) continue;
      if (!m3VarIds.has(alias.id)) continue;

      const match = findMatch(alias.id);
      if (match) {
        try {
          node.setBoundVariable(field as VariableBindableNodeField, match);
          swapped++;
        } catch (_e) {
          failed++;
          const m3v = figma.variables.getVariableById(alias.id);
          if (m3v) failedVars.add(m3v.name + ' (scalar error)');
        }
      } else {
        failed++;
        const m3v = figma.variables.getVariableById(alias.id);
        if (m3v) failedVars.add(m3v.name);
      }
    }
  }

  function processNode(node: SceneNode | PageNode | DocumentNode): void {
    try {
      if ('boundVariables' in node) {
        const bv = (node as SceneNode).boundVariables;
        if (bv && Object.keys(bv).length > 0) {
          swapPaintArray(node as SceneNode, 'fills');
          swapPaintArray(node as SceneNode, 'strokes');
          swapEffects(node as SceneNode);
          swapScalarFields(node as SceneNode);
        }
      }
    } catch (_e) { /* skip inaccessible nodes */ }

    if ('children' in node) {
      for (const child of (node as ChildrenMixin).children) {
        processNode(child);
      }
    }
  }

  let pageNum = 0;
  const totalPages = figma.root.children.length;

  for (const page of figma.root.children) {
    pageNum++;
    figma.notify(`Processing page ${pageNum}/${totalPages}: ${page.name}...`, { timeout: 500 });
    processNode(page);
  }

  const errorList = [...failedVars].sort().map(n => `  - ${n}`).join('\n');
  const summary = [
    `Swap complete.`,
    ``,
    `Swapped: ${swapped} binding(s)`,
    `Failed:  ${failed} binding(s)`,
  ];

  if (failedVars.size > 0) {
    summary.push(``, `Unmatched M3 variables (${failedVars.size}):`, errorList);
  }

  figma.showUI(
    `<pre style="font:13px/1.6 monospace;padding:16px;white-space:pre-wrap">${summary.join('\n')}</pre>`,
    { width: 520, height: 420 }
  );
}

// ---------------------------------------------------------------------------
// Command: createStateLayers
// ---------------------------------------------------------------------------

async function createStateLayers(): Promise<void> {
  const specCol = findCollectionByName('Spectrum');
  const m3Col = findCollectionByName('M3');

  if (!specCol) {
    figma.notify('Spectrum collection not found.', { error: true });
    return figma.closePlugin();
  }
  if (!m3Col) {
    figma.notify('M3 collection not found.', { error: true });
    return figma.closePlugin();
  }

  const specModeId = specCol.modes[0].modeId;

  const specByName = new Map<string, Variable>();
  const existingNames = new Set<string>();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (!v) continue;
    existingNames.add(v.name);
    if (v.name.startsWith('Schemes/')) {
      specByName.set(v.name, v);
    }
  }

  function getColorValue(variable: Variable): RGBA | null {
    const val = variable.valuesByMode[specModeId];
    if (val && typeof val === 'object' && 'r' in val) return val as RGBA;
    if (val && typeof val === 'object' && 'type' in val && (val as VariableAlias).type === 'VARIABLE_ALIAS') {
      const resolved = figma.variables.getVariableById((val as VariableAlias).id);
      if (resolved) {
        const rVal = resolved.valuesByMode[specModeId];
        if (rVal && typeof rVal === 'object' && 'r' in rVal) return rVal as RGBA;
      }
    }
    return null;
  }

  function resolveBaseColor(baseName: string): RGBA | null {
    const schemeName = 'Schemes/' + baseName;
    if (specByName.has(schemeName)) return getColorValue(specByName.get(schemeName)!);
    const fb = FALLBACKS[schemeName];
    if (fb && specByName.has(fb)) return getColorValue(specByName.get(fb)!);
    return null;
  }

  const m3StateLayers: Variable[] = [];
  const m3Addons: Variable[] = [];
  for (const id of m3Col.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (!v) continue;
    if (v.name.startsWith('State Layers/')) m3StateLayers.push(v);
    else if (v.name.startsWith('Add-ons/')) m3Addons.push(v);
  }

  let created = 0;
  let skipped = 0;
  const unresolved: string[] = [];

  for (const m3Var of m3StateLayers) {
    if (existingNames.has(m3Var.name)) { skipped++; continue; }

    const parts = m3Var.name.split('/');
    if (parts.length !== 3) { skipped++; continue; }

    const baseName = parts[1];
    const opMatch = parts[2].match(/Opacity-(\d+)/);
    if (!opMatch) { skipped++; continue; }
    const alpha = parseInt(opMatch[1]) / 100;

    const baseColor = resolveBaseColor(baseName);
    if (!baseColor) {
      unresolved.push(m3Var.name);
      continue;
    }

    try {
      const newVar = figma.variables.createVariable(m3Var.name, specCol, 'COLOR');
      newVar.setValueForMode(specModeId, { r: baseColor.r, g: baseColor.g, b: baseColor.b, a: alpha });
      newVar.scopes = ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];
      created++;
      existingNames.add(m3Var.name);
    } catch (e) {
      unresolved.push(m3Var.name + ' (create error: ' + (e as Error).message + ')');
    }
  }

  for (const m3Var of m3Addons) {
    if (existingNames.has(m3Var.name)) { skipped++; continue; }

    const surfaceVar = specByName.get('Schemes/Surface');
    if (!surfaceVar) {
      unresolved.push(m3Var.name + ' (no Surface variable)');
      continue;
    }
    const surfaceColor = getColorValue(surfaceVar);
    if (!surfaceColor) {
      unresolved.push(m3Var.name + ' (could not resolve Surface)');
      continue;
    }

    try {
      const newVar = figma.variables.createVariable(m3Var.name, specCol, 'COLOR');
      newVar.setValueForMode(specModeId, surfaceColor);
      created++;
      existingNames.add(m3Var.name);
    } catch (e) {
      unresolved.push(m3Var.name + ' (create error: ' + (e as Error).message + ')');
    }
  }

  const summary = [
    'State Layers creation complete.',
    '',
    `Created: ${created} variable(s)`,
    `Skipped: ${skipped} (already exist)`,
  ];

  if (unresolved.length > 0) {
    summary.push('', `Unresolved (${unresolved.length}):`, ...unresolved.map(n => '  - ' + n));
  }

  summary.push('', 'Next step: re-run "2. Swap M3 to Spectrum" to rebind the remaining layers.');

  figma.showUI(
    `<pre style="font:13px/1.6 monospace;padding:16px;white-space:pre-wrap">${summary.join('\n')}</pre>`,
    { width: 520, height: 420 }
  );
}

// ---------------------------------------------------------------------------
// Command: createNonColorVars  (typescale, font theme, shape)
// ---------------------------------------------------------------------------

async function createNonColorVars(): Promise<void> {
  const specCol = findCollectionByName('Spectrum');
  if (!specCol) {
    figma.notify('Spectrum collection not found.', { error: true });
    return figma.closePlugin();
  }

  const modeId = specCol.modes[0].modeId;

  const existing = new Set<string>();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v) existing.add(v.name);
  }

  let created = 0;
  let skipped = 0;

  for (const [styleName, props] of Object.entries(TYPESCALE_STYLES)) {
    const prefix = 'Static/' + styleName;
    const defs: { name: string; type: VariableResolvedDataType; value: string | number }[] = [
      { name: prefix + '/Font',              type: 'STRING', value: 'Noto Sans' },
      { name: prefix + '/Weight',            type: 'FLOAT',  value: props.weight },
      { name: prefix + '/Weight-emphasized',  type: 'FLOAT',  value: props.weightEmph },
      { name: prefix + '/Size',              type: 'FLOAT',  value: props.size },
      { name: prefix + '/Line Height',       type: 'FLOAT',  value: props.lineHeight },
      { name: prefix + '/Tracking',          type: 'FLOAT',  value: props.tracking },
    ];

    for (const def of defs) {
      if (existing.has(def.name)) { skipped++; continue; }
      try {
        const v = figma.variables.createVariable(def.name, specCol, def.type);
        v.setValueForMode(modeId, def.value);
        created++;
        existing.add(def.name);
      } catch (_e) { skipped++; }
    }
  }

  for (const [name, def] of Object.entries(FONT_THEME_VARS)) {
    if (existing.has(name)) { skipped++; continue; }
    try {
      const v = figma.variables.createVariable(name, specCol, def.type);
      v.setValueForMode(modeId, def.value);
      created++;
      existing.add(name);
    } catch (_e) { skipped++; }
  }

  for (const [name, value] of Object.entries(SHAPE_VARS)) {
    if (existing.has(name)) { skipped++; continue; }
    try {
      const v = figma.variables.createVariable(name, specCol, 'FLOAT');
      v.setValueForMode(modeId, value);
      created++;
      existing.add(name);
    } catch (_e) { skipped++; }
  }

  const summary = [
    'Non-color variable creation complete.',
    '',
    `Created: ${created} variable(s)`,
    `Skipped: ${skipped} (already exist or error)`,
    '',
    'Breakdown:',
    `  Typescale: ${Object.keys(TYPESCALE_STYLES).length * 6} definitions (15 styles x 6 props)`,
    `  Font theme: ${Object.keys(FONT_THEME_VARS).length} definitions`,
    `  Shape: ${Object.keys(SHAPE_VARS).length} definitions`,
    '',
    'Next: run "7. Swap ALL M3 collections to Spectrum" to rebind bindings.',
  ];

  figma.showUI(
    `<pre style="font:13px/1.6 monospace;padding:16px;white-space:pre-wrap">${summary.join('\n')}</pre>`,
    { width: 520, height: 420 }
  );
}

// ---------------------------------------------------------------------------
// Command: swapAll  (rebind ALL M3 collections to Spectrum)
// ---------------------------------------------------------------------------

async function swapAll(): Promise<void> {
  const M3_COLLECTION_NAMES = ['M3', 'Font theme', 'Typescale', 'Shape'];
  const specCol = findCollectionByName('Spectrum');

  if (!specCol) {
    figma.notify('Spectrum collection not found.', { error: true });
    return figma.closePlugin();
  }

  const allM3VarIds = new Set<string>();
  const foundCollections: string[] = [];

  for (const name of M3_COLLECTION_NAMES) {
    const col = findCollectionByName(name);
    if (col) {
      foundCollections.push(col.name);
      for (const id of col.variableIds) allM3VarIds.add(id);
    }
  }

  if (allM3VarIds.size === 0) {
    figma.notify('No M3 collections found.', { error: true });
    return figma.closePlugin();
  }

  await figma.loadAllPagesAsync();

  const specByName = new Map<string, Variable>();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v) specByName.set(v.name, v);
  }

  function findMatch(varId: string): Variable | null {
    const m3Var = figma.variables.getVariableById(varId);
    if (!m3Var) return null;
    if (specByName.has(m3Var.name)) return specByName.get(m3Var.name)!;
    const fb = FALLBACKS[m3Var.name];
    if (fb && specByName.has(fb)) return specByName.get(fb)!;
    return null;
  }

  let swappedCount = 0;
  let failedCount = 0;
  const failedVars = new Set<string>();

  function swapPaintArray(node: SceneNode, field: 'fills' | 'strokes'): void {
    const bv = node.boundVariables as Record<string, VariableAlias[]>;
    const bindings = bv[field];
    if (!bindings || !Array.isArray(bindings)) return;
    const paints = (node as GeometryMixin)[field];
    if (!paints || paints === figma.mixed) return;
    const newPaints = [...(paints as Paint[])];
    let changed = false;
    for (let i = 0; i < bindings.length; i++) {
      const alias = bindings[i];
      if (!alias || !alias.id || !allM3VarIds.has(alias.id)) continue;
      const match = findMatch(alias.id);
      if (match && newPaints[i] && newPaints[i].type === 'SOLID') {
        try {
          newPaints[i] = figma.variables.setBoundVariableForPaint(newPaints[i] as SolidPaint, 'color', match);
          changed = true;
          swappedCount++;
        } catch (_e) {
          failedCount++;
          const m3v = figma.variables.getVariableById(alias.id);
          if (m3v) failedVars.add(m3v.name);
        }
      } else if (!match) {
        failedCount++;
        const m3v = figma.variables.getVariableById(alias.id);
        if (m3v) failedVars.add(m3v.name);
      }
    }
    if (changed) {
      try {
        (node as GeometryMixin)[field] = newPaints;
      } catch (_e) { /* read-only */ }
    }
  }

  function swapEffects(node: SceneNode): void {
    const bv = node.boundVariables as Record<string, VariableAlias[]>;
    const bindings = bv['effects'];
    if (!bindings || !Array.isArray(bindings)) return;
    const effects = (node as BlendMixin).effects;
    if (!effects || effects.length === 0) return;
    const newEffects = [...effects];
    let changed = false;
    for (let i = 0; i < bindings.length; i++) {
      const alias = bindings[i];
      if (!alias || !alias.id || !allM3VarIds.has(alias.id)) continue;
      const match = findMatch(alias.id);
      if (match && newEffects[i]) {
        try {
          newEffects[i] = figma.variables.setBoundVariableForEffect(newEffects[i], 'color', match);
          changed = true;
          swappedCount++;
        } catch (_e) {
          failedCount++;
          const m3v = figma.variables.getVariableById(alias.id);
          if (m3v) failedVars.add(m3v.name);
        }
      } else if (!match) {
        failedCount++;
        const m3v = figma.variables.getVariableById(alias.id);
        if (m3v) failedVars.add(m3v.name);
      }
    }
    if (changed) {
      try { (node as BlendMixin).effects = newEffects; } catch (_e) { /* read-only */ }
    }
  }

  function swapScalarFields(node: SceneNode): void {
    const bv = node.boundVariables as Record<string, VariableAlias | VariableAlias[]>;
    const skipFields = new Set(['fills', 'strokes', 'effects', 'layoutGrids', 'componentProperties']);
    for (const [field, alias] of Object.entries(bv)) {
      if (skipFields.has(field)) continue;
      if (!alias || typeof alias !== 'object' || !('id' in alias)) continue;
      if (Array.isArray(alias)) continue;
      if (!allM3VarIds.has(alias.id)) continue;
      const match = findMatch(alias.id);
      if (match) {
        try {
          node.setBoundVariable(field as VariableBindableNodeField, match);
          swappedCount++;
        } catch (_e) {
          failedCount++;
          const m3v = figma.variables.getVariableById(alias.id);
          if (m3v) failedVars.add(m3v.name);
        }
      } else {
        failedCount++;
        const m3v = figma.variables.getVariableById(alias.id);
        if (m3v) failedVars.add(m3v.name);
      }
    }
  }

  function processNode(node: SceneNode | PageNode | DocumentNode): void {
    try {
      if ('boundVariables' in node) {
        const bv = (node as SceneNode).boundVariables;
        if (bv && Object.keys(bv).length > 0) {
          swapPaintArray(node as SceneNode, 'fills');
          swapPaintArray(node as SceneNode, 'strokes');
          swapEffects(node as SceneNode);
          swapScalarFields(node as SceneNode);
        }
      }
    } catch (_e) { /* skip */ }
    if ('children' in node) {
      for (const child of (node as ChildrenMixin).children) processNode(child);
    }
  }

  let pageNum = 0;
  const totalPages = figma.root.children.length;
  for (const page of figma.root.children) {
    pageNum++;
    figma.notify(`Processing page ${pageNum}/${totalPages}: ${page.name}...`, { timeout: 500 });
    processNode(page);
  }

  const errorList = [...failedVars].sort().map(n => `  - ${n}`).join('\n');
  const summary = [
    'Full swap complete.',
    '',
    `Collections processed: ${foundCollections.join(', ')}`,
    `Total M3 variables tracked: ${allM3VarIds.size}`,
    '',
    `Swapped: ${swappedCount} binding(s)`,
    `Failed:  ${failedCount} binding(s)`,
  ];
  if (failedVars.size > 0) {
    summary.push('', `Unmatched variables (${failedVars.size}):`, errorList);
  }

  figma.showUI(
    `<pre style="font:13px/1.6 monospace;padding:16px;white-space:pre-wrap">${summary.join('\n')}</pre>`,
    { width: 560, height: 480 }
  );
}

// ---------------------------------------------------------------------------
// Command: auditComponents
// ---------------------------------------------------------------------------

interface AuditEntry {
  m3Name: string;
  status: 'mapped' | 'partial' | 'missing';
  spectrumTarget: string | null;
  notes: string;
  count: number;
  variantBreakdown: Record<string, number>;
  pages: Record<string, number>;
}

async function auditComponents(): Promise<void> {
  await figma.loadAllPagesAsync();

  const audit = new Map<string, AuditEntry>();

  async function processNode(node: SceneNode | PageNode, pageName: string): Promise<void> {
    if (node.type === 'INSTANCE') {
      const match = await identifyM3Component(node);
      if (match) {
        let entry = audit.get(match.m3Name);
        if (!entry) {
          entry = {
            m3Name: match.m3Name,
            status: match.mapping.status,
            spectrumTarget: match.mapping.spectrum,
            notes: match.mapping.notes,
            count: 0,
            variantBreakdown: {},
            pages: {},
          };
          audit.set(match.m3Name, entry);
        }

        entry.count++;
        entry.pages[pageName] = (entry.pages[pageName] || 0) + 1;

        const variants = extractVariantValues(node);
        for (const val of Object.values(variants)) {
          entry.variantBreakdown[val] = (entry.variantBreakdown[val] || 0) + 1;
        }
      }
    }

    if ('children' in node) {
      for (const child of (node as ChildrenMixin).children) {
        await processNode(child as SceneNode, pageName);
      }
    }
  }

  let pageNum = 0;
  const totalPages = figma.root.children.length;
  for (const page of figma.root.children) {
    pageNum++;
    figma.notify(`Auditing page ${pageNum}/${totalPages}: ${page.name}...`, { timeout: 500 });
    await processNode(page, page.name);
  }

  const entries = [...audit.values()].sort((a, b) => b.count - a.count);
  const totalInstances = entries.reduce((sum, e) => sum + e.count, 0);
  const mappedCount = entries.filter(e => e.status === 'mapped').reduce((s, e) => s + e.count, 0);
  const partialCount = entries.filter(e => e.status === 'partial').reduce((s, e) => s + e.count, 0);
  const missingCount = entries.filter(e => e.status === 'missing').reduce((s, e) => s + e.count, 0);

  const pageBreakdown = new Map<string, number>();
  for (const entry of entries) {
    for (const [pg, ct] of Object.entries(entry.pages)) {
      pageBreakdown.set(pg, (pageBreakdown.get(pg) || 0) + ct);
    }
  }

  let html = `<div style="font-family:system-ui,-apple-system,sans-serif;padding:16px;font-size:13px;line-height:1.5">`;
  html += `<h2 style="margin:0 0 12px">M3 Component Audit</h2>`;
  html += `<div style="background:#f0f4ff;padding:12px;border-radius:8px;margin-bottom:16px">`;
  html += `<strong>Total M3 instances:</strong> ${totalInstances}<br>`;
  html += `<span style="color:#16a34a">Ready to swap (mapped):</span> <strong>${mappedCount}</strong><br>`;
  html += `<span style="color:#ca8a04">Partial match:</span> <strong>${partialCount}</strong><br>`;
  html += `<span style="color:#dc2626">No equivalent (missing):</span> <strong>${missingCount}</strong>`;
  html += `</div>`;

  if (pageBreakdown.size > 0) {
    html += `<h3 style="margin:16px 0 8px">Per-page breakdown</h3>`;
    html += `<table style="border-collapse:collapse;width:100%">`;
    for (const [pg, ct] of [...pageBreakdown.entries()].sort((a, b) => b[1] - a[1])) {
      html += `<tr><td style="padding:2px 8px 2px 0">${pg}</td><td style="text-align:right">${ct}</td></tr>`;
    }
    html += `</table>`;
  }

  html += `<h3 style="margin:16px 0 8px">Component breakdown</h3>`;
  for (const entry of entries) {
    const badge = entry.status === 'mapped'
      ? '<span style="background:#dcfce7;color:#166534;padding:1px 6px;border-radius:4px;font-size:11px">mapped</span>'
      : entry.status === 'partial'
        ? '<span style="background:#fef9c3;color:#854d0e;padding:1px 6px;border-radius:4px;font-size:11px">partial</span>'
        : '<span style="background:#fee2e2;color:#991b1b;padding:1px 6px;border-radius:4px;font-size:11px">missing</span>';

    html += `<div style="margin-bottom:10px;padding:8px;border:1px solid #e5e7eb;border-radius:6px">`;
    html += `<strong>${entry.m3Name}</strong> ${badge} &mdash; <strong>${entry.count}</strong> instance(s)<br>`;
    if (entry.spectrumTarget) {
      html += `<span style="color:#666">Target: ${entry.spectrumTarget}</span><br>`;
    }
    const variantKeys = Object.keys(entry.variantBreakdown);
    if (variantKeys.length > 0) {
      const variantParts = variantKeys.map(k => `${k}: ${entry.variantBreakdown[k]}`);
      html += `<span style="color:#888;font-size:12px">Variants: ${variantParts.join(', ')}</span><br>`;
    }
    if (entry.notes) {
      html += `<span style="color:#999;font-size:11px;font-style:italic">${entry.notes}</span>`;
    }
    html += `</div>`;
  }

  if (totalInstances === 0) {
    html += `<p style="color:#666;font-style:italic">No M3 component instances detected in this file.</p>`;
  }

  html += `</div>`;

  figma.showUI(html, { width: 560, height: 600 });
}

// ---------------------------------------------------------------------------
// Command: swapComponents
// ---------------------------------------------------------------------------

async function swapComponents(): Promise<void> {
  await figma.loadAllPagesAsync();

  const spectrumComponents = new Map<string, ComponentNode>();
  const spectrumSets = new Map<string, ComponentSetNode>();

  function indexComponents(node: SceneNode | PageNode | DocumentNode): void {
    if (node.type === 'COMPONENT_SET') {
      const setNode = node as ComponentSetNode;
      spectrumSets.set(setNode.name, setNode);
      return;
    }
    if (node.type === 'COMPONENT') {
      const comp = node as ComponentNode;
      if (!comp.parent || comp.parent.type !== 'COMPONENT_SET') {
        spectrumComponents.set(comp.name, comp);
      }
    }
    if ('children' in node) {
      for (const child of (node as ChildrenMixin).children) {
        indexComponents(child);
      }
    }
  }

  for (const page of figma.root.children) {
    indexComponents(page);
  }

  function findSpectrumTarget(
    spectrumName: string,
    desiredProps: Record<string, string>,
  ): ComponentNode | null {
    const set = spectrumSets.get(spectrumName);
    if (set) {
      if (Object.keys(desiredProps).length === 0) {
        const first = set.children.find(c => c.type === 'COMPONENT') as ComponentNode | undefined;
        return first || null;
      }
      for (const child of set.children) {
        if (child.type !== 'COMPONENT') continue;
        const parts = child.name.split(',').map(s => s.trim());
        const parsed: Record<string, string> = {};
        for (const part of parts) {
          const eq = part.indexOf('=');
          if (eq > 0) parsed[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
        }
        let allMatch = true;
        for (const [k, v] of Object.entries(desiredProps)) {
          if (parsed[k] !== v) { allMatch = false; break; }
        }
        if (allMatch) return child as ComponentNode;
      }
      const fallback = set.children.find(c => c.type === 'COMPONENT') as ComponentNode | undefined;
      return fallback || null;
    }

    return spectrumComponents.get(spectrumName) || null;
  }

  let swappedCount = 0;
  let skippedNoTarget = 0;
  let failedCount = 0;
  let propsMappedCount = 0;
  const notAvailable = new Map<string, number>();
  const swapErrors: string[] = [];

  async function processNode(node: SceneNode | PageNode, pageName: string): Promise<void> {
    if ('children' in node) {
      const children = [...(node as ChildrenMixin).children];
      for (const child of children) {
        await processNode(child as SceneNode, pageName);
      }
    }

    if (node.type !== 'INSTANCE') return;

    const match = await identifyM3Component(node);
    if (!match) return;
    if (!match.mapping.spectrum) return;
    if (match.mapping.status === 'missing') return;

    const m3Variants = extractVariantValues(node);
    const desiredSpecProps = findVariantMapping(m3Variants, match.mapping) || {};
    const target = findSpectrumTarget(match.mapping.spectrum, desiredSpecProps);

    if (!target) {
      skippedNoTarget++;
      const key = match.mapping.spectrum;
      notAvailable.set(key, (notAvailable.get(key) || 0) + 1);
      return;
    }

    const textSnapshot = new Map<string, string>();
    try {
      const textNodes = (node as InstanceNode).findAll(n => n.type === 'TEXT') as TextNode[];
      for (const tn of textNodes) {
        textSnapshot.set(tn.name, tn.characters);
      }
    } catch (_e) { /* may fail on detached overrides */ }

    try {
      (node as InstanceNode).swapComponent(target);
      swappedCount++;
    } catch (e) {
      failedCount++;
      swapErrors.push(`${match.m3Name} on "${pageName}": ${(e as Error).message}`);
      return;
    }

    for (const [propName, propValue] of Object.entries(desiredSpecProps)) {
      if (setInstanceProperty(node as InstanceNode, propName, propValue)) {
        propsMappedCount++;
      }
    }

    try {
      const newTextNodes = (node as InstanceNode).findAll(n => n.type === 'TEXT') as TextNode[];
      for (const tn of newTextNodes) {
        const original = textSnapshot.get(tn.name);
        if (original && tn.characters !== original) {
          figma.loadFontAsync(tn.fontName as FontName).then(() => {
            tn.characters = original;
          }).catch(() => { /* font not available */ });
        }
      }
    } catch (_e) { /* text restore best-effort */ }
  }

  let pageNum = 0;
  const totalPages = figma.root.children.length;
  for (const page of figma.root.children) {
    pageNum++;
    figma.notify(`Swapping components page ${pageNum}/${totalPages}: ${page.name}...`, { timeout: 500 });
    await processNode(page, page.name);
  }

  let html = `<div style="font-family:system-ui,-apple-system,sans-serif;padding:16px;font-size:13px;line-height:1.5">`;
  html += `<h2 style="margin:0 0 12px">Component Swap Results</h2>`;
  html += `<div style="background:#f0f4ff;padding:12px;border-radius:8px;margin-bottom:16px">`;
  html += `<span style="color:#16a34a">Swapped:</span> <strong>${swappedCount}</strong> instance(s)<br>`;
  html += `<span style="color:#ca8a04">Skipped (target not in file):</span> <strong>${skippedNoTarget}</strong><br>`;
  html += `<span style="color:#dc2626">Failed:</span> <strong>${failedCount}</strong><br>`;
  html += `Properties mapped: <strong>${propsMappedCount}</strong>`;
  html += `</div>`;

  if (notAvailable.size > 0) {
    html += `<h3 style="margin:16px 0 8px">Spectrum components not yet in file</h3>`;
    html += `<p style="color:#666;font-size:12px;margin:0 0 8px">Create these components, then re-run this command:</p>`;
    html += `<table style="border-collapse:collapse;width:100%">`;
    for (const [name, ct] of [...notAvailable.entries()].sort((a, b) => b[1] - a[1])) {
      html += `<tr><td style="padding:2px 8px 2px 0;font-family:monospace;font-size:12px">${name}</td>`;
      html += `<td style="text-align:right">${ct} instance(s)</td></tr>`;
    }
    html += `</table>`;
  }

  if (swapErrors.length > 0) {
    html += `<h3 style="margin:16px 0 8px;color:#dc2626">Errors</h3>`;
    html += `<ul style="margin:0;padding-left:20px;font-size:12px;color:#666">`;
    for (const err of swapErrors.slice(0, 20)) {
      html += `<li>${err}</li>`;
    }
    if (swapErrors.length > 20) {
      html += `<li>... and ${swapErrors.length - 20} more</li>`;
    }
    html += `</ul>`;
  }

  if (swappedCount === 0 && skippedNoTarget === 0 && failedCount === 0) {
    html += `<p style="color:#666;font-style:italic">No M3 component instances with swappable Spectrum targets found.</p>`;
  }

  html += `</div>`;

  figma.showUI(html, { width: 560, height: 520 });
}

// ---------------------------------------------------------------------------
// Command router
// ---------------------------------------------------------------------------

switch (figma.command) {
  case 'debug':              debug();              break;
  case 'rename':             rename();             break;
  case 'revert':             revert();             break;
  case 'swap':               swap();               break;
  case 'createStateLayers':  createStateLayers();  break;
  case 'createNonColorVars': createNonColorVars(); break;
  case 'swapAll':            swapAll();            break;
  case 'auditComponents':    auditComponents();    break;
  case 'swapComponents':     swapComponents();     break;
  default:                   figma.closePlugin();
}
