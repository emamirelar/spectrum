/**
 * Performance Mode Configuration for Storybook Development
 * 
 * This script can be used to temporarily disable heavy stories during development
 * for faster iteration cycles.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const HEAVY_STORIES = [
  'spectrum-rail.stories.tsx',
  'spectrum-conversation-panel.stories.tsx', 
  'spectrum-image-gallery.stories.tsx',
  'spectrum-theme.stories.tsx'
];

const STORIES_DIR = path.join(__dirname, '../src/stories/components');

function enablePerformanceMode() {
  console.log('🚀 Enabling Storybook performance mode...');
  
  HEAVY_STORIES.forEach(storyFile => {
    const fullPath = path.join(STORIES_DIR, storyFile.replace('.stories.tsx', ''), storyFile);
    const backupPath = fullPath + '.backup';
    
    if (fs.existsSync(fullPath) && !fs.existsSync(backupPath)) {
      fs.renameSync(fullPath, backupPath);
      console.log(`  ✓ Disabled ${storyFile}`);
    }
  });
  
  console.log('✅ Performance mode enabled. Heavy stories are temporarily disabled.');
  console.log('💡 Run "npm run storybook:restore" to restore all stories.');
}

function disablePerformanceMode() {
  console.log('🔄 Restoring all Storybook stories...');
  
  HEAVY_STORIES.forEach(storyFile => {
    const fullPath = path.join(STORIES_DIR, storyFile.replace('.stories.tsx', ''), storyFile);
    const backupPath = fullPath + '.backup';
    
    if (fs.existsSync(backupPath)) {
      fs.renameSync(backupPath, fullPath);
      console.log(`  ✓ Restored ${storyFile}`);
    }
  });
  
  console.log('✅ All stories restored.');
}

// Check command line arguments
const command = process.argv[2];

if (command === 'enable') {
  enablePerformanceMode();
} else if (command === 'disable') {
  disablePerformanceMode();
} else {
  console.log('Usage:');
  console.log('  node performance-mode.js enable   - Enable performance mode (disable heavy stories)');
  console.log('  node performance-mode.js disable  - Disable performance mode (restore all stories)');
}