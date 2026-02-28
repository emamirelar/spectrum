// =============================================================================
// FIGMA CONSOLE SCRIPTS — Spectrum ↔ M3 Variable Rename
// =============================================================================
//
// These scripts are meant to be pasted into the Figma Developer Console
// (Plugins > Development > Open Console) one at a time.
//
// SCRIPT 1: Rename  — spectrum/sys/color/[name] → M3-compatible sys/light/[Name]
// SCRIPT 2: Revert  — restores original names from the in-memory backup
// SCRIPT 3: Revert (standalone) — reverses the transformation without a backup
//
// The Swap Variables plugin matches by group/name within each collection.
// M3 uses Title Case ("On Primary Container"), Spectrum uses kebab-case
// ("on-primary-container"), so both the prefix and casing are transformed.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT 1 — RENAME (paste this into Figma Console)
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const COLLECTION_NAME = 'spectrum';
  const SOURCE_PREFIX   = 'sys/color/';
  const TARGET_PREFIX   = 'sys/light/';

  const toTitleCase = (kebab) =>
    kebab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const collections = figma.variables.getLocalVariableCollections();
  const collection = collections.find(c =>
    c.name.toLowerCase() === COLLECTION_NAME.toLowerCase()
  );

  if (!collection) {
    console.error(`Collection "${COLLECTION_NAME}" not found. Available:`,
      collections.map(c => c.name));
    return;
  }

  const backup = {};
  let renamed = 0;
  let skipped = 0;

  for (const id of collection.variableIds) {
    const variable = figma.variables.getVariableById(id);
    if (!variable) continue;

    if (variable.name.startsWith(SOURCE_PREFIX)) {
      const originalName = variable.name;
      const namePart = originalName.slice(SOURCE_PREFIX.length);
      const newName = TARGET_PREFIX + toTitleCase(namePart);

      backup[variable.id] = originalName;
      variable.name = newName;
      renamed++;
      console.log(`  ✓ ${originalName} → ${newName}`);
    } else {
      skipped++;
    }
  }

  window.__spectrumBackup = backup;

  console.log(`\nDone. Renamed ${renamed} variable(s), skipped ${skipped}.`);
  console.log('Backup stored in window.__spectrumBackup — use the revert script to undo.');
})();


// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT 2 — REVERT using backup (paste this into Figma Console)
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const backup = window.__spectrumBackup;

  if (!backup || Object.keys(backup).length === 0) {
    console.error('No backup found. Use the standalone revert script (Script 3) instead.');
    return;
  }

  let restored = 0;

  for (const [id, originalName] of Object.entries(backup)) {
    const variable = figma.variables.getVariableById(id);
    if (!variable) {
      console.warn(`  ✗ Variable ${id} no longer exists, skipping`);
      continue;
    }
    const oldName = variable.name;
    variable.name = originalName;
    restored++;
    console.log(`  ✓ ${oldName} → ${originalName}`);
  }

  delete window.__spectrumBackup;
  console.log(`\nDone. Restored ${restored} variable(s). Backup cleared.`);
})();


// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT 3 — REVERT standalone (no backup needed)
// ─────────────────────────────────────────────────────────────────────────────
// Use this if you closed the file or lost the in-memory backup.
// It reverses the transformation: sys/light/[Title Case] → sys/color/[kebab-case]

(() => {
  const COLLECTION_NAME = 'spectrum';
  const RENAMED_PREFIX  = 'sys/light/';
  const ORIGINAL_PREFIX = 'sys/color/';

  const toKebabCase = (titleCase) =>
    titleCase.split(' ').map(w => w.toLowerCase()).join('-');

  const collections = figma.variables.getLocalVariableCollections();
  const collection = collections.find(c =>
    c.name.toLowerCase() === COLLECTION_NAME.toLowerCase()
  );

  if (!collection) {
    console.error(`Collection "${COLLECTION_NAME}" not found. Available:`,
      collections.map(c => c.name));
    return;
  }

  let restored = 0;
  let skipped = 0;

  for (const id of collection.variableIds) {
    const variable = figma.variables.getVariableById(id);
    if (!variable) continue;

    if (variable.name.startsWith(RENAMED_PREFIX)) {
      const currentName = variable.name;
      const namePart = currentName.slice(RENAMED_PREFIX.length);
      const originalName = ORIGINAL_PREFIX + toKebabCase(namePart);

      variable.name = originalName;
      restored++;
      console.log(`  ✓ ${currentName} → ${originalName}`);
    } else {
      skipped++;
    }
  }

  console.log(`\nDone. Restored ${restored} variable(s), skipped ${skipped}.`);
})();
