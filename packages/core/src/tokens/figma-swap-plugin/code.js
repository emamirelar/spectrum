const COLLECTION_NAME = 'Spectrum';
const SPECTRUM_PREFIX = 'Schemes/sys/color/';
const M3_PREFIX       = 'Schemes/';

const FALLBACKS = {
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

function toTitleCase(kebab) {
  return kebab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function toKebabCase(titleCase) {
  return titleCase.split(' ').map(w => w.toLowerCase()).join('-');
}

function findCollectionByName(name) {
  const collections = figma.variables.getLocalVariableCollections();
  return collections.find(c => c.name.toLowerCase() === name.toLowerCase());
}

// ============================================================
// Style Swap: M3 paint/effect styles → Spectrum variable bindings
// ============================================================

function camelToTitleCase(camel) {
  const spaced = camel.replace(/([A-Z])/g, ' $1').trim();
  return spaced.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const M3_REF_TONE_MAP = {
  primary:          { low: 'On Primary Container', mid: 'Primary',   high: 'Primary Container',   top: 'On Primary' },
  secondary:        { low: 'On Secondary Container', mid: 'Secondary', high: 'Secondary Container', top: 'On Secondary' },
  tertiary:         { low: 'On Tertiary Container', mid: 'Tertiary',  high: 'Tertiary Container',  top: 'On Tertiary' },
  error:            { low: 'On Error Container', mid: 'Error',     high: 'Error Container',     top: 'On Error' },
  neutral:          { low: 'On Surface',  mid: 'Outline',  high: 'Surface Variant', top: 'Surface' },
  'neutral-variant': { low: 'On Surface', mid: 'Outline Variant', high: 'Surface Variant', top: 'Surface' },
};

function refToneToScheme(family, tone) {
  const map = M3_REF_TONE_MAP[family];
  if (!map) return null;
  if (tone === 0)               return 'Shadow';
  if (tone >= 10 && tone <= 30) return map.low;
  if (tone >= 40 && tone <= 70) return map.mid;
  if (tone >= 80 && tone <= 95) return map.high;
  if (tone >= 99)               return map.top;
  return null;
}

function isElevationStyle(styleName) {
  return /^M3\/Elevation\s/i.test(styleName);
}

function m3StyleNameToSpectrumVarName(styleName) {
  if (styleName === 'M3/black') return 'Schemes/Shadow';
  if (styleName === 'M3/white') return 'Schemes/Surface';

  const sysMatch = styleName.match(/^M3\/sys\/(?:light|dark)\/(.+)$/);
  if (sysMatch) {
    return 'Schemes/' + toTitleCase(sysMatch[1]);
  }

  const stateMatch = styleName.match(/^M3\/state-layers\/(?:light|dark)\/(.+)\/opacity-(\d+)$/i);
  if (stateMatch) {
    return 'State Layers/' + camelToTitleCase(stateMatch[1]) + '/Opacity-' + stateMatch[2];
  }

  const refMatch = styleName.match(/^M3\/ref\/([^/]+)\/[^/]+?(\d+)$/);
  if (refMatch) {
    const family = refMatch[1];
    const tone = parseInt(refMatch[2], 10);
    const schemeName = refToneToScheme(family, tone);
    if (schemeName) return 'Schemes/' + schemeName;
  }

  return null;
}

function resolveStyleId(styleId, cache, specByName) {
  if (cache.varMap.has(styleId)) return cache.varMap.get(styleId);
  if (cache.checked.has(styleId)) return null;
  cache.checked.add(styleId);

  const style = figma.getStyleById(styleId);
  if (!style || !style.name.startsWith('M3/')) return null;

  cache.nameMap.set(styleId, style.name);
  const specVarName = m3StyleNameToSpectrumVarName(style.name);
  if (!specVarName) return null;

  let specVar = specByName.get(specVarName);
  if (!specVar) {
    const fb = FALLBACKS[specVarName];
    if (fb) specVar = specByName.get(fb);
  }

  if (specVar) {
    cache.varMap.set(styleId, specVar);
    return specVar;
  }

  return null;
}

function trySwapPaintStyle(node, field, cache, specByName, counters) {
  const styleId = field === 'fills' ? node.fillStyleId : node.strokeStyleId;
  if (!styleId || typeof styleId !== 'string' || styleId === '') return;

  const bv = node.boundVariables;
  const hasVar = bv && bv[field] && Array.isArray(bv[field]) && bv[field].length > 0;
  if (hasVar) return;

  const style = figma.getStyleById(styleId);
  if (!style || !style.name.startsWith('M3/')) return;

  if (isElevationStyle(style.name)) {
    counters.skipped++;
    return;
  }

  const specVar = resolveStyleId(styleId, cache, specByName);
  if (specVar) {
    const paints = field === 'fills' ? node.fills : node.strokes;
    if (paints && paints !== figma.mixed && paints.length > 0) {
      const newPaints = [...paints];
      if (field === 'fills') node.fillStyleId = '';
      else node.strokeStyleId = '';
      if (newPaints[0] && newPaints[0].type === 'SOLID') {
        newPaints[0] = figma.variables.setBoundVariableForPaint(newPaints[0], 'color', specVar);
        if (field === 'fills') node.fills = newPaints;
        else node.strokes = newPaints;
        counters.swapped++;
        return;
      }
    }
  }

  counters.failed++;
  counters.failedNames.add(style.name);
}

function swapNodeStyles(node, cache, specByName, counters) {
  try { trySwapPaintStyle(node, 'fills', cache, specByName, counters); }
  catch (e) { /* skip inaccessible fill */ }

  try { trySwapPaintStyle(node, 'strokes', cache, specByName, counters); }
  catch (e) { /* skip inaccessible stroke */ }

  try {
    const effectStyleId = node.effectStyleId;
    if (effectStyleId && typeof effectStyleId === 'string' && effectStyleId !== '') {
      const bv = node.boundVariables;
      const hasEffectVar = bv && bv.effects && Array.isArray(bv.effects) && bv.effects.length > 0;
      if (!hasEffectVar) {
        const style = figma.getStyleById(effectStyleId);
        if (style && style.name.startsWith('M3/')) {
          if (isElevationStyle(style.name)) {
            counters.skipped++;
          } else {
            const specVar = resolveStyleId(effectStyleId, cache, specByName);
            if (specVar) {
              const effects = node.effects;
              if (effects && effects.length > 0) {
                const newEffects = [...effects];
                node.effectStyleId = '';
                if (newEffects[0]) {
                  newEffects[0] = figma.variables.setBoundVariableForEffect(newEffects[0], 'color', specVar);
                  node.effects = newEffects;
                  counters.swapped++;
                  return;
                }
              }
            }
            counters.failed++;
            counters.failedNames.add(style.name);
          }
        }
      }
    }
  } catch (e) { /* skip inaccessible effect */ }
}

function rename() {
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

function revert() {
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

function debug() {
  const collections = figma.variables.getLocalVariableCollections();
  const lines = [];

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

async function swap() {
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

  const specByName = new Map();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v) specByName.set(v.name, v);
  }

  function findMatch(varId) {
    const m3Var = figma.variables.getVariableById(varId);
    if (!m3Var) return null;
    if (specByName.has(m3Var.name)) return specByName.get(m3Var.name);
    const fb = FALLBACKS[m3Var.name];
    if (fb && specByName.has(fb)) return specByName.get(fb);
    return null;
  }

  let swapped = 0;
  let failed = 0;
  const failedVars = new Set();

  function swapPaintArray(node, field) {
    const bindings = node.boundVariables[field];
    if (!bindings || !Array.isArray(bindings)) return;

    const paints = field === 'fills' ? node.fills : node.strokes;
    if (!paints || paints === figma.mixed) return;

    const newPaints = [...paints];
    let changed = false;

    for (let i = 0; i < bindings.length; i++) {
      const alias = bindings[i];
      if (!alias || !alias.id) continue;
      if (!m3VarIds.has(alias.id)) continue;

      const match = findMatch(alias.id);
      if (match && newPaints[i] && newPaints[i].type === 'SOLID') {
        try {
          newPaints[i] = figma.variables.setBoundVariableForPaint(newPaints[i], 'color', match);
          changed = true;
          swapped++;
        } catch (e) {
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
        if (field === 'fills') node.fills = newPaints;
        else node.strokes = newPaints;
      } catch (e) { /* read-only node */ }
    }
  }

  function swapEffects(node) {
    const bindings = node.boundVariables.effects;
    if (!bindings || !Array.isArray(bindings)) return;

    const effects = node.effects;
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
        } catch (e) {
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
      try { node.effects = newEffects; } catch (e) { /* read-only */ }
    }
  }

  function swapScalarFields(node) {
    const bv = node.boundVariables;
    const skipFields = new Set(['fills', 'strokes', 'effects', 'layoutGrids', 'componentProperties']);

    for (const [field, alias] of Object.entries(bv)) {
      if (skipFields.has(field)) continue;
      if (!alias || typeof alias !== 'object' || !alias.id) continue;
      if (Array.isArray(alias)) continue;
      if (!m3VarIds.has(alias.id)) continue;

      const match = findMatch(alias.id);
      if (match) {
        try {
          node.setBoundVariable(field, match);
          swapped++;
        } catch (e) {
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

  function processNode(node) {
    try {
      const bv = node.boundVariables;
      if (bv && Object.keys(bv).length > 0) {
        swapPaintArray(node, 'fills');
        swapPaintArray(node, 'strokes');
        swapEffects(node);
        swapScalarFields(node);
      }
    } catch (e) { /* skip inaccessible nodes */ }

    if ('children' in node) {
      for (const child of node.children) {
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

async function createStateLayers() {
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

  const specByName = new Map();
  const existingNames = new Set();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (!v) continue;
    existingNames.add(v.name);
    if (v.name.startsWith('Schemes/')) {
      specByName.set(v.name, v);
    }
  }

  function getColorValue(variable) {
    const val = variable.valuesByMode[specModeId];
    if (val && typeof val.r === 'number') return val;
    if (val && val.type === 'VARIABLE_ALIAS') {
      const resolved = figma.variables.getVariableById(val.id);
      if (resolved) {
        const rVal = resolved.valuesByMode[specModeId];
        if (rVal && typeof rVal.r === 'number') return rVal;
      }
    }
    return null;
  }

  function resolveBaseColor(baseName) {
    const schemeName = 'Schemes/' + baseName;
    if (specByName.has(schemeName)) return getColorValue(specByName.get(schemeName));
    const fb = FALLBACKS[schemeName];
    if (fb && specByName.has(fb)) return getColorValue(specByName.get(fb));
    return null;
  }

  const m3StateLayers = [];
  const m3Addons = [];
  for (const id of m3Col.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (!v) continue;
    if (v.name.startsWith('State Layers/')) m3StateLayers.push(v);
    else if (v.name.startsWith('Add-ons/')) m3Addons.push(v);
  }

  let created = 0;
  let skipped = 0;
  const unresolved = [];

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
      unresolved.push(m3Var.name + ' (create error: ' + e.message + ')');
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
      unresolved.push(m3Var.name + ' (create error: ' + e.message + ')');
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

const TYPESCALE_STYLES = {
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

const FONT_THEME_VARS = {
  'Static/Font/Brand':     { type: 'STRING', value: 'Noto Sans' },
  'Static/Font/Plain':     { type: 'STRING', value: 'Noto Sans' },
  'Static/Weight/Regular': { type: 'FLOAT',  value: 400 },
  'Static/Weight/Medium':  { type: 'FLOAT',  value: 500 },
  'Static/Weight/Bold':    { type: 'FLOAT',  value: 700 },
  'Tracking/None':         { type: 'FLOAT',  value: 0 },
  'Tracking/Small':        { type: 'FLOAT',  value: 0.1 },
};

const SHAPE_VARS = {
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

async function createNonColorVars() {
  const specCol = findCollectionByName('Spectrum');
  if (!specCol) {
    figma.notify('Spectrum collection not found.', { error: true });
    return figma.closePlugin();
  }

  const modeId = specCol.modes[0].modeId;

  const existing = new Set();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v) existing.add(v.name);
  }

  let created = 0;
  let skipped = 0;

  for (const [styleName, props] of Object.entries(TYPESCALE_STYLES)) {
    const prefix = 'Static/' + styleName;
    const defs = [
      { name: prefix + '/Font',             type: 'STRING', value: 'Noto Sans' },
      { name: prefix + '/Weight',           type: 'FLOAT',  value: props.weight },
      { name: prefix + '/Weight-emphasized', type: 'FLOAT',  value: props.weightEmph },
      { name: prefix + '/Size',             type: 'FLOAT',  value: props.size },
      { name: prefix + '/Line Height',      type: 'FLOAT',  value: props.lineHeight },
      { name: prefix + '/Tracking',         type: 'FLOAT',  value: props.tracking },
    ];

    for (const def of defs) {
      if (existing.has(def.name)) { skipped++; continue; }
      try {
        const v = figma.variables.createVariable(def.name, specCol, def.type);
        v.setValueForMode(modeId, def.value);
        created++;
        existing.add(def.name);
      } catch (e) { skipped++; }
    }
  }

  for (const [name, def] of Object.entries(FONT_THEME_VARS)) {
    if (existing.has(name)) { skipped++; continue; }
    try {
      const v = figma.variables.createVariable(name, specCol, def.type);
      v.setValueForMode(modeId, def.value);
      created++;
      existing.add(name);
    } catch (e) { skipped++; }
  }

  for (const [name, value] of Object.entries(SHAPE_VARS)) {
    if (existing.has(name)) { skipped++; continue; }
    try {
      const v = figma.variables.createVariable(name, specCol, 'FLOAT');
      v.setValueForMode(modeId, value);
      created++;
      existing.add(name);
    } catch (e) { skipped++; }
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

async function swapAll() {
  const M3_COLLECTION_NAMES = ['M3', 'Font theme', 'Typescale', 'Shape'];
  const specCol = findCollectionByName('Spectrum');

  if (!specCol) {
    figma.notify('Spectrum collection not found.', { error: true });
    return figma.closePlugin();
  }

  const allM3VarIds = new Set();
  const foundCollections = [];

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

  const specByName = new Map();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v) specByName.set(v.name, v);
  }

  const styleCache = { varMap: new Map(), nameMap: new Map(), checked: new Set() };
  const styleCounters = { swapped: 0, failed: 0, skipped: 0, failedNames: new Set() };

  function findMatch(varId) {
    const m3Var = figma.variables.getVariableById(varId);
    if (!m3Var) return null;
    if (specByName.has(m3Var.name)) return specByName.get(m3Var.name);
    const fb = FALLBACKS[m3Var.name];
    if (fb && specByName.has(fb)) return specByName.get(fb);
    return null;
  }

  let swappedCount = 0;
  let failedCount = 0;
  const failedVars = new Set();

  function swapPaintArray(node, field) {
    const bindings = node.boundVariables[field];
    if (!bindings || !Array.isArray(bindings)) return;
    const paints = field === 'fills' ? node.fills : node.strokes;
    if (!paints || paints === figma.mixed) return;
    const newPaints = [...paints];
    let changed = false;
    for (let i = 0; i < bindings.length; i++) {
      const alias = bindings[i];
      if (!alias || !alias.id || !allM3VarIds.has(alias.id)) continue;
      const match = findMatch(alias.id);
      if (match && newPaints[i] && newPaints[i].type === 'SOLID') {
        try {
          newPaints[i] = figma.variables.setBoundVariableForPaint(newPaints[i], 'color', match);
          changed = true;
          swappedCount++;
        } catch (e) {
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
        if (field === 'fills') node.fills = newPaints;
        else node.strokes = newPaints;
      } catch (e) {}
    }
  }

  function swapEffects(node) {
    const bindings = node.boundVariables.effects;
    if (!bindings || !Array.isArray(bindings)) return;
    const effects = node.effects;
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
        } catch (e) {
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
      try { node.effects = newEffects; } catch (e) {}
    }
  }

  function swapScalarFields(node) {
    const bv = node.boundVariables;
    const skipFields = new Set(['fills', 'strokes', 'effects', 'layoutGrids', 'componentProperties']);
    for (const [field, alias] of Object.entries(bv)) {
      if (skipFields.has(field)) continue;
      if (!alias || typeof alias !== 'object' || !alias.id) continue;
      if (Array.isArray(alias)) continue;
      if (!allM3VarIds.has(alias.id)) continue;
      const match = findMatch(alias.id);
      if (match) {
        try {
          node.setBoundVariable(field, match);
          swappedCount++;
        } catch (e) {
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

  function processNode(node) {
    try {
      const bv = node.boundVariables;
      if (bv && Object.keys(bv).length > 0) {
        swapPaintArray(node, 'fills');
        swapPaintArray(node, 'strokes');
        swapEffects(node);
        swapScalarFields(node);
      }
    } catch (e) {}
    try {
      swapNodeStyles(node, styleCache, specByName, styleCounters);
    } catch (e) {}
    if ('children' in node) {
      for (const child of node.children) processNode(child);
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
  const styleErrorList = [...styleCounters.failedNames].sort().map(n => `  - ${n}`).join('\n');
  const summary = [
    'Full swap complete (variables + styles).',
    '',
    `Collections processed: ${foundCollections.join(', ')}`,
    `Total M3 variables tracked: ${allM3VarIds.size}`,
    '',
    `Variable bindings swapped: ${swappedCount}`,
    `Variable bindings failed:  ${failedCount}`,
    '',
    `Style references converted: ${styleCounters.swapped}`,
    `Style references failed:    ${styleCounters.failed}`,
    `Style references skipped:   ${styleCounters.skipped} (elevation/effect styles)`,
  ];
  if (failedVars.size > 0) {
    summary.push('', `Unmatched M3 variables (${failedVars.size}):`, errorList);
  }
  if (styleCounters.failedNames.size > 0) {
    summary.push('', `Unmatched M3 styles (${styleCounters.failedNames.size}):`, styleErrorList);
  }

  figma.showUI(
    `<pre style="font:13px/1.6 monospace;padding:16px;white-space:pre-wrap">${summary.join('\n')}</pre>`,
    { width: 560, height: 480 }
  );
}

async function swapStylesCommand() {
  const specCol = findCollectionByName('Spectrum');
  if (!specCol) {
    figma.notify('Spectrum collection not found.', { error: true });
    return figma.closePlugin();
  }

  await figma.loadAllPagesAsync();

  const specByName = new Map();
  for (const id of specCol.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v) specByName.set(v.name, v);
  }

  const cache = { varMap: new Map(), nameMap: new Map(), checked: new Set() };
  const counters = { swapped: 0, failed: 0, skipped: 0, failedNames: new Set() };

  function processNode(node) {
    try {
      swapNodeStyles(node, cache, specByName, counters);
    } catch (e) { /* skip inaccessible nodes */ }
    if ('children' in node) {
      for (const child of node.children) processNode(child);
    }
  }

  let pageNum = 0;
  const totalPages = figma.root.children.length;
  for (const page of figma.root.children) {
    pageNum++;
    figma.notify(`Swapping styles ${pageNum}/${totalPages}: ${page.name}...`, { timeout: 500 });
    processNode(page);
  }

  const errorList = [...counters.failedNames].sort().map(n => `  - ${n}`).join('\n');
  const summary = [
    'M3 style swap complete.',
    '',
    `Styles converted to variable bindings: ${counters.swapped}`,
    `Failed:  ${counters.failed}`,
    `Skipped: ${counters.skipped} (elevation/effect styles)`,
  ];
  if (counters.failedNames.size > 0) {
    summary.push('', `Unmatched M3 styles (${counters.failedNames.size}):`, errorList);
  }
  summary.push('', 'M3 paint/effect styles have been replaced with Spectrum variable bindings.');

  figma.showUI(
    `<pre style="font:13px/1.6 monospace;padding:16px;white-space:pre-wrap">${summary.join('\n')}</pre>`,
    { width: 560, height: 480 }
  );
}

switch (figma.command) {
  case 'debug':  debug();  break;
  case 'rename': rename(); break;
  case 'revert': revert(); break;
  case 'swap':   swap();   break;
  case 'createStateLayers': createStateLayers(); break;
  case 'createNonColorVars': createNonColorVars(); break;
  case 'swapAll': swapAll(); break;
  case 'swapStyles': swapStylesCommand(); break;
  default: figma.closePlugin();
}
