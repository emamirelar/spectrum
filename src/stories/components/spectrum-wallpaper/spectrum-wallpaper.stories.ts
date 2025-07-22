import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumWallpaper } from "../../../../core/src/components/spectrum-wallpaper/spectrum-wallpaper";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction

const meta = {
  title: 'Spectrum/Components/SpectrumWallpaper',
  component: 'spectrum-wallpaper',
  tags: ['autodocs'],
  render: (args) => {
    const elementHtml = html`
      <spectrum-wallpaper
        background=${args.background}
        show-swatches=${args.showSwatches}
        ?debug=${args.debug}
        ?preload-colors=${args.preloadColors}
        ?signal-ready=${args.signalReady}
        ?apply-to-root=${args.applyToRoot}
        background-position=${args.backgroundPosition}
        background-size=${args.backgroundSize}
      >
        <div style="background: rgba(255,255,255,0.9); padding: 1rem; border-radius: 0.5rem; margin: 2rem; max-width: 300px; backdrop-filter: blur(10px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Sample Content</h3>
          <p style="margin: 0; font-size: 0.9rem;">This content shows the wallpaper background</p>
        </div>
      </spectrum-wallpaper>
    `;
    return elementHtml;
  },
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Wallpaper Component

A dynamic wallpaper component that extracts dominant colors from images, gradients, or solid colors and generates a comprehensive **Material Design 3 theme**. Features advanced debugging, theme coordination, and color validation capabilities.

## Key Features

- 🎨 **Automatic Color Extraction** from images, gradients, and solid colors
- 🎯 **Material Design 3 Theme Generation** with full color palette (24 CSS variables)
- 🔧 **Theme Coordination** with other components via events
- 🐛 **Advanced Debug Mode** with visual color logging and validation
- ⚙️ **Flexible Theme Application** to host element or document root
- 🎛️ **Color Swatches Display** for development and testing

## Advanced Features

### 🔍 Visual Debug Logging
When \`debug="true"\`, see colors as **colored boxes** in the browser console:
- Open Browser Dev Tools → Console
- Look for \`[spectrum-wallpaper]\` messages with colored backgrounds
- Watch real-time color extraction and theme validation

### ⚙️ Theme Conflict Resolution
Use \`apply-to-root="true"\` when the wallpaper theme conflicts with other theme components:
- Applies CSS variables to \`document.documentElement\` 
- Higher CSS specificity than host element application
- Prevents other theme systems from overriding wallpaper colors

### 🔧 Theme Coordination System
Use \`preload-colors="true"\` and \`signal-ready="true"\` for complex applications:
- Extract colors without applying them immediately
- Emit \`wallpaper-colors-ready\` and \`wallpaper-colors-failed\` events
- Coordinate with other theme components programmatically
- Call \`applyPreloadedColors()\` method when ready

## Generated CSS Variables
24 Material Design 3 color variables including:
- \`--spectrum-color-primary\`, \`--spectrum-color-on-primary\`
- \`--spectrum-color-secondary\`, \`--spectrum-color-on-secondary\`
- \`--spectrum-color-tertiary\`, \`--spectrum-color-on-tertiary\`
- \`--spectrum-color-surface\`, \`--spectrum-color-on-surface\`
- Plus containers, variants, and utility colors
        `
      }
    }
  },
  args: {
    background: 'url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538)',
    showSwatches: false,
    debug: false,
    preloadColors: false,
    signalReady: false,
    applyToRoot: false,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  argTypes: {
    background: {
      description: 'The background value (color, gradient, or image URL)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Visual Settings'
      }
    },
    backgroundPosition: {
      description: 'CSS background-position for images',
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
        category: 'Visual Settings'
      }
    },
    backgroundSize: {
      description: 'CSS background-size for images',
      control: 'select',
      options: ['cover', 'contain', 'auto', '100%', '50%'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'cover' },
        category: 'Visual Settings'
      }
    },
    showSwatches: {
      description: '🎨 Show color swatches at bottom for development and testing',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Development Tools'
      }
    },
    debug: {
      description: '🐛 Enable visual debug logging in browser console with colored boxes',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Development Tools'
      }
    },
    applyToRoot: {
      description: '⚙️ Apply theme to document root (higher priority than host element)',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Advanced Theme Control'
      }
    },
    preloadColors: {
      description: '🔧 Extract colors without applying them (for coordination)',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Advanced Theme Control'
      }
    },
    signalReady: {
      description: '📡 Emit events when colors are ready (for coordination with other components)',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Advanced Theme Control'
      }
    },
  }
} satisfies Meta<SpectrumWallpaper>;

export default meta;

export const Default: StoryObj<SpectrumWallpaper> = {
  name: 'Basic Image Background',
  parameters: {
    docs: {
      description: {
        story: `
Basic usage with an image background. The component automatically:
1. **Extracts** the dominant color from the image
2. **Generates** a complete Material Design 3 theme
3. **Applies** 24 CSS variables to the component

Try changing the background URL in the controls to see different color themes.
        `
      }
    }
  }
};

export const SolidColor: StoryObj<SpectrumWallpaper> = {
  name: 'Solid Color Background',
  args: {
    background: '#2196f3',
    showSwatches: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Using a solid color as the theme source. Perfect for:
- **Brand colors** as primary theme source
- **Simple themes** without image complexity
- **Performance** - no image loading required

The component uses the solid color directly to generate variations.
        `
      }
    }
  }
};

export const GradientBackground: StoryObj<SpectrumWallpaper> = {
  name: 'Gradient Background',
  args: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    showSwatches: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Using CSS gradients as theme source. The component:
- **Extracts** the first color from the gradient
- **Generates** theme variations from that base color
- **Maintains** the gradient as the visual background

Great for modern, colorful interfaces with dynamic theming.
        `
      }
    }
  }
};

export const DebugMode: StoryObj<SpectrumWallpaper> = {
  name: '🐛 Debug Mode Demo',
  args: {
    background: 'url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80)',
    showSwatches: true,
    debug: true,
  },
  render: (args) => html`
    <div style="position: relative;">
      <spectrum-wallpaper
        background=${args.background}
        show-swatches=${args.showSwatches}
        ?debug=${args.debug}
        ?preload-colors=${args.preloadColors}
        ?signal-ready=${args.signalReady}
        ?apply-to-root=${args.applyToRoot}
        background-position=${args.backgroundPosition}
        background-size=${args.backgroundSize}
      >
        <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 0.5rem; margin: 2rem; max-width: 600px; backdrop-filter: blur(10px);">
          <h2 style="color: var(--spectrum-color-primary, #0070d2); margin-top: 0;">🐛 Debug Mode Active</h2>
          
          <div style="background: #e3f2fd; border: 1px solid #90caf9; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🔍 Debug Instructions:</strong>
            <ol style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li><strong>Open Browser Console</strong> (F12 → Console tab)</li>
              <li><strong>Look for colored messages</strong> starting with <code>[spectrum-wallpaper]</code></li>
              <li><strong>Watch real-time</strong> color extraction and validation</li>
              <li><strong>Try different backgrounds</strong> to see extraction process</li>
            </ol>
          </div>

          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>Expected Console Output:</strong>
            <pre style="margin: 0.5rem 0 0 0; font-size: 0.8rem; color: #495057;">
🎨 [spectrum-wallpaper] Extracting colors from image...
🎨 [spectrum-wallpaper] Dominant color: <span style="background: #1976d2; color: white; padding: 2px 6px;">#1976d2</span>
🎨 [spectrum-wallpaper] Generated theme colors:
   Primary: <span style="background: #1976d2; color: white; padding: 2px 6px;">#1976d2</span>
   On-Primary: <span style="background: #ffffff; color: black; padding: 2px 6px;">#ffffff</span>
✅ [spectrum-wallpaper] Theme validation: All 24 variables applied successfully</pre>
          </div>

          <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-color-surface-variant, #f1f3f4); border-radius: 4px;">
            <p style="color: var(--spectrum-color-on-surface-variant, #44464f); margin: 0 0 0.5rem 0;"><strong>Live Theme Colors:</strong></p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem; font-size: 0.8rem;">
              <span style="color: var(--spectrum-color-primary);">Primary Text</span>
              <span style="color: var(--spectrum-color-secondary);">Secondary Text</span>
              <span style="color: var(--spectrum-color-tertiary);">Tertiary Text</span>
              <span style="color: var(--spectrum-color-error);">Error Text</span>
            </div>
          </div>
        </div>
      </spectrum-wallpaper>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Debug Mode** provides comprehensive development tools:

### 🔍 Visual Console Logging
- **Colored boxes** show actual extracted colors in console
- **Real-time feedback** during color extraction process
- **Validation results** with detailed error reporting
- **Performance metrics** for optimization

### 🛠️ Development Benefits  
- **Troubleshoot** color extraction issues
- **Verify** theme variable application
- **Monitor** theme conflicts with other components
- **Debug** coordination between multiple theme sources

**How to Use:**
1. Enable debug mode with the control above
2. Open browser Developer Tools (F12)
3. Switch to Console tab
4. Watch colored output as you change backgrounds
        `
      }
    }
  }
};

export const ThemeConflictResolution: StoryObj<SpectrumWallpaper> = {
  name: '⚙️ Theme Conflict Resolution',
  args: {
    background: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80)',
    applyToRoot: true,
    debug: true,
    showSwatches: true,
  },
  render: (args) => html`
    <div style="position: relative;">
      <spectrum-wallpaper
        background=${args.background}
        show-swatches=${args.showSwatches}
        ?debug=${args.debug}
        ?preload-colors=${args.preloadColors}
        ?signal-ready=${args.signalReady}
        ?apply-to-root=${args.applyToRoot}
        background-position=${args.backgroundPosition}
        background-size=${args.backgroundSize}
      >
        <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 0.5rem; margin: 2rem; max-width: 600px; backdrop-filter: blur(10px);">
          <h2 style="color: var(--spectrum-color-primary, #0070d2); margin-top: 0;">⚙️ Theme Conflict Resolution</h2>
          
          <div style="background: #fff3e0; border: 1px solid #ffb74d; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🔧 apply-to-root="true" Active</strong>
            <p style="margin: 0.5rem 0 0 0;">Theme variables are applied to <code>document.documentElement</code> instead of the host element, giving them higher CSS specificity.</p>
          </div>

          <div style="background: #e8f5e8; border: 1px solid #81c784; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>✅ Conflict Resolution Benefits:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li><strong>Higher Priority:</strong> Overrides other theme components</li>
              <li><strong>Global Scope:</strong> Theme available throughout entire app</li>
              <li><strong>Specificity Protection:</strong> Prevents CSS override conflicts</li>
              <li><strong>Debug Validation:</strong> Enhanced validation detects conflicts</li>
            </ul>
          </div>

          <div style="background: #fce4ec; border: 1px solid #f48fb1; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🚨 When to Use:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li>Multiple theme components conflict</li>
              <li>spectrum-theme overrides wallpaper colors</li>
              <li>Wallpaper should be primary theme source</li>
              <li>Global theme consistency needed</li>
            </ul>
          </div>

          <p style="color: var(--spectrum-color-on-surface, #000); margin: 1rem 0;">
            <strong>Current Status:</strong> Theme variables applied to document root with higher priority.
          </p>
        </div>
      </spectrum-wallpaper>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Theme Conflict Resolution** solves common theming conflicts:

### 🎯 The Problem
When multiple theme components exist (like \`spectrum-theme\` and \`spectrum-wallpaper\`), they can override each other's CSS variables, causing:
- Inconsistent colors across the application
- Wallpaper themes being ignored
- Theme flickering during load

### ⚙️ The Solution: apply-to-root="true"
Applies theme variables to \`document.documentElement\` instead of the component host:
- **Higher CSS Specificity** - document root variables override component-level ones
- **Global Availability** - theme accessible throughout the entire application  
- **Conflict Prevention** - wallpaper theme takes precedence over other theme sources

### 🔍 Debug Integration
When combined with \`debug="true"\`, you get enhanced conflict detection:
- Validation checks both host element and document root
- Detailed error messages explain override scenarios
- Troubleshooting suggestions for fixing conflicts

**Use Case Example:**
\`\`\`html
<!-- When this conflicts with wallpaper -->
<spectrum-theme theme="light"></spectrum-theme>

<!-- Use apply-to-root for wallpaper priority -->
<spectrum-wallpaper background="image.jpg" apply-to-root="true"></spectrum-wallpaper>
\`\`\`
        `
      }
    }
  }
};

export const AdvancedCoordination: StoryObj<SpectrumWallpaper> = {
  name: '🔧 Advanced Theme Coordination',
  args: {
    background: 'url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80)',
    preloadColors: true,
    signalReady: true,
    debug: true,
    showSwatches: true,
  },
  render: (args) => html`
    <div style="position: relative;">
      <spectrum-wallpaper
        background=${args.background}
        show-swatches=${args.showSwatches}
        ?debug=${args.debug}
        ?preload-colors=${args.preloadColors}
        ?signal-ready=${args.signalReady}
        ?apply-to-root=${args.applyToRoot}
        background-position=${args.backgroundPosition}
        background-size=${args.backgroundSize}
      >
        <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 0.5rem; margin: 2rem; max-width: 700px; backdrop-filter: blur(10px);">
          <h2 style="color: var(--spectrum-color-primary, #0070d2); margin-top: 0;">🔧 Advanced Theme Coordination</h2>
          
          <div style="background: #f3e5f5; border: 1px solid #ce93d8; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🔧 Coordination Features Active:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li><strong>preload-colors="true":</strong> Colors extracted but not applied yet</li>
              <li><strong>signal-ready="true":</strong> Events emitted when colors are ready</li>
              <li><strong>Programmatic Control:</strong> Call \`applyPreloadedColors()\` when ready</li>
            </ul>
          </div>

          <div style="background: #e1f5fe; border: 1px solid #4fc3f7; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>📡 Event System:</strong>
            <div style="font-family: monospace; font-size: 0.8rem; background: #f8f9fa; padding: 0.5rem; border-radius: 4px; margin: 0.5rem 0;">
              <div><strong>Success:</strong> \`wallpaper-colors-ready\`</div>
              <div><strong>Failure:</strong> \`wallpaper-colors-failed\`</div>
            </div>
          </div>

          <div style="background: #fff8e1; border: 1px solid #ffb74d; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🚀 JavaScript Integration Example:</strong>
            <pre style="font-size: 0.75rem; margin: 0.5rem 0 0 0; overflow-x: auto; background: #f5f5f5; padding: 0.5rem; border-radius: 4px;">
// Listen for wallpaper coordination events
document.addEventListener('wallpaper-colors-ready', (e) => {
  console.log('🎨 Wallpaper colors ready:', e.detail.colors);
  
  // Coordinate with other theme components
  initializeOtherThemes(e.detail.colors);
  
  // Apply colors when coordination complete
  const wallpaper = document.querySelector('spectrum-wallpaper');
  wallpaper.applyPreloadedColors();
});

document.addEventListener('wallpaper-colors-failed', (e) => {
  console.error('❌ Wallpaper color extraction failed:', e.detail.error);
  // Fallback to default theme
  applyFallbackTheme();
});</pre>
          </div>

          <div style="background: #e8f5e8; border: 1px solid #81c784; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🎯 Use Cases:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li><strong>Multi-step Initialization:</strong> Load wallpaper → Extract colors → Coordinate with other themes → Apply all together</li>
              <li><strong>Performance Optimization:</strong> Preload colors during app startup, apply when UI is ready</li>
              <li><strong>Theme Orchestration:</strong> Coordinate multiple theme sources in complex applications</li>
              <li><strong>Loading States:</strong> Show loading indicators while color extraction happens</li>
            </ul>
          </div>

          <p style="color: var(--spectrum-color-on-surface, #000); margin: 1rem 0;">
            <strong>Current Status:</strong> Colors extracted and ready for coordination. Check console for events.
          </p>
        </div>
      </spectrum-wallpaper>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Advanced Theme Coordination** enables sophisticated theme management:

### 🔧 Coordination Properties

#### \`preload-colors="true"\`
- **Extracts colors** from background without applying them
- **Stores colors** in component state for later use
- **Enables coordination** with other theme systems
- **Prevents theme conflicts** during initialization

#### \`signal-ready="true"\`  
- **Emits events** when color extraction completes
- **Provides coordination hooks** for other components
- **Enables theme orchestration** in complex applications
- **Supports loading state management**

### 📡 Event System
The component emits document-level events for coordination:

**Success Event:** \`wallpaper-colors-ready\`
\`\`\`javascript
event.detail = {
  colors: { /* extracted color scheme */ },
  component: wallpaperElement
}
\`\`\`

**Failure Event:** \`wallpaper-colors-failed\`
\`\`\`javascript
event.detail = {
  error: "Image failed to load",
  component: wallpaperElement  
}
\`\`\`

### 🚀 Integration Patterns

#### 1. Theme Orchestration
\`\`\`javascript
// Coordinate multiple theme sources
let wallpaperReady = false;
let otherThemesReady = false;

document.addEventListener('wallpaper-colors-ready', () => {
  wallpaperReady = true;
  checkAllThemesReady();
});

function checkAllThemesReady() {
  if (wallpaperReady && otherThemesReady) {
    // Apply all themes together
    applyCoordinatedThemes();
  }
}
\`\`\`

#### 2. Loading State Management  
\`\`\`javascript
// Show loading during color extraction
document.addEventListener('wallpaper-colors-ready', () => {
  hideLoadingSpinner();
  showMainInterface();
});
\`\`\`

#### 3. Performance Optimization
\`\`\`javascript
// Preload during app startup
const wallpaper = document.querySelector('spectrum-wallpaper');
wallpaper.preloadColors = true;
wallpaper.signalReady = true;

// Apply when UI is ready
document.addEventListener('DOMContentLoaded', () => {
  wallpaper.applyPreloadedColors();
});
\`\`\`
        `
      }
    }
  }
};

export const NatureScenes: StoryObj<SpectrumWallpaper> = {
  name: '🌿 Nature Scenes Gallery',
  args: {
    background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
    showSwatches: true,
  },
  render: (args) => html`
    <div style="position: relative;">
      <spectrum-wallpaper
        background=${args.background}
        show-swatches=${args.showSwatches}
        ?debug=${args.debug}
        ?preload-colors=${args.preloadColors}
        ?signal-ready=${args.signalReady}
        ?apply-to-root=${args.applyToRoot}
        background-position=${args.backgroundPosition}
        background-size=${args.backgroundSize}
      >
        <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 0.5rem; margin: 2rem; max-width: 600px; backdrop-filter: blur(10px);">
          <h2 style="color: var(--spectrum-color-primary, #0070d2); margin-top: 0;">🌿 Nature Scenes</h2>
          
          <p style="color: var(--spectrum-color-on-surface, #000);">
            Try these nature backgrounds to see how the component generates different color themes:
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <button onclick="document.querySelector('spectrum-wallpaper').background = 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)'" 
                    style="padding: 0.5rem; border: 1px solid var(--spectrum-color-outline, #ccc); border-radius: 4px; background: var(--spectrum-color-surface-variant, #f5f5f5);">
              🍂 Autumn Forest
            </button>
            <button onclick="document.querySelector('spectrum-wallpaper').background = 'url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&q=80)'"
                    style="padding: 0.5rem; border: 1px solid var(--spectrum-color-outline, #ccc); border-radius: 4px; background: var(--spectrum-color-surface-variant, #f5f5f5);">
              🌊 Ocean Blue
            </button>
            <button onclick="document.querySelector('spectrum-wallpaper').background = 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)'"
                    style="padding: 0.5rem; border: 1px solid var(--spectrum-color-outline, #ccc); border-radius: 4px; background: var(--spectrum-color-surface-variant, #f5f5f5);">
              🌸 Cherry Blossoms
            </button>
            <button onclick="document.querySelector('spectrum-wallpaper').background = 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80)'"
                    style="padding: 0.5rem; border: 1px solid var(--spectrum-color-outline, #ccc); border-radius: 4px; background: var(--spectrum-color-surface-variant, #f5f5f5);">
              🏔️ Mountain Vista
            </button>
          </div>

          <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-color-primary-container, #e3f2fd); border-radius: 4px;">
            <p style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0;">
              <strong>Live Theme:</strong> Watch the color swatches and text colors change as you switch backgrounds!
            </p>
          </div>
        </div>
      </spectrum-wallpaper>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Interactive Gallery** demonstrating dynamic theme generation from nature images:

### 🎨 Dynamic Color Extraction
Each nature scene generates a unique color palette:
- **Autumn Forest:** Warm oranges, browns, and golds
- **Ocean Blue:** Cool blues, teals, and aqua tones  
- **Cherry Blossoms:** Soft pinks, whites, and greens
- **Mountain Vista:** Earth tones, grays, and sky blues

### 🔄 Real-Time Updates
- Click buttons to switch backgrounds instantly
- Watch color swatches update in real-time
- See theme variables change throughout the interface
- Text colors automatically adjust for contrast

### 🎯 Design Inspiration
Perfect for:
- **Seasonal interfaces** that adapt to content
- **Dynamic branding** based on hero images  
- **Mood-based theming** for different app sections
- **User-customizable themes** from uploaded images
        `
      }
    }
  }
};

export const InteractiveWallpaperDemo: StoryObj<SpectrumWallpaper> = {
  name: '🎨 Interactive Wallpaper/Theme Demo',
  args: {
    background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
    showSwatches: true,
    debug: false,
    preloadColors: false,
    signalReady: false,
    applyToRoot: false,
  },
  render: (args) => {
    const wallpapers = [
      {
        name: '🍂 Autumn Forest',
        background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
        description: 'Warm oranges, browns, and golden tones'
      },
      {
        name: '🌊 Ocean Blues',
        background: 'url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&q=80)',
        description: 'Cool blues, teals, and aqua tones'
      },
      {
        name: '🌸 Cherry Blossoms',
        background: 'url(https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80)',
        description: 'Soft pinks, whites, and spring greens'
      },
      {
        name: '🏔️ Mountain Vista',
        background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80)',
        description: 'Earth tones, grays, and sky blues'
      },
      {
        name: '🌅 Sunset Horizon',
        background: 'url(https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80)',
        description: 'Warm oranges, purples, and yellows'
      },
      {
        name: '🌿 Tropical Paradise',
        background: 'url(https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80)',
        description: 'Vibrant greens, blues, and turquoise'
      },
      {
        name: '🎨 Brand Blue',
        background: '#2196f3',
        description: 'Material Design Blue'
      },
      {
        name: '💜 Purple Gradient',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'Purple to blue gradient'
      },
      {
        name: '🔥 Fire Gradient',
        background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
        description: 'Red to orange gradient'
      },
      {
        name: '🌈 Rainbow Gradient',
        background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
        description: 'Multi-color rainbow'
      }
    ];

    return html`
      <div style="position: relative; min-height: 100vh;">
        <spectrum-wallpaper
          id="demo-wallpaper"
          background=${args.background}
          show-swatches=${args.showSwatches}
          ?debug=${args.debug}
          ?preload-colors=${args.preloadColors}
          ?signal-ready=${args.signalReady}
          ?apply-to-root=${args.applyToRoot}
          background-position=${args.backgroundPosition}
          background-size=${args.backgroundSize}
        >
          <!-- Main Content Area -->
          <div style="background: rgba(255,255,255,0.95); margin: 2rem; border-radius: 1rem; padding: 2rem; backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
            <h1 style="color: var(--spectrum-color-primary, #0070d2); margin: 0 0 1rem 0; font-size: 2rem; text-align: center;">
              🎨 Interactive Wallpaper/Theme Demo
            </h1>
            
            <p style="color: var(--spectrum-color-on-surface, #000); text-align: center; margin: 0 0 2rem 0; font-size: 1.1rem;">
              Click any wallpaper below to see real-time theme generation and color extraction
            </p>

            <!-- Wallpaper Selection Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 2rem 0;">
              ${wallpapers.map(wallpaper => html`
                                 <div 
                   @click=${(e) => {
                     const wallpaperElement = e.target.closest('spectrum-wallpaper');
                     if (wallpaperElement) {
                       wallpaperElement.background = wallpaper.background;
                     }
                   }}
                  style="
                    cursor: pointer;
                    padding: 1rem;
                    border: 2px solid var(--spectrum-color-outline, #e0e0e0);
                    border-radius: 0.5rem;
                    background: var(--spectrum-color-surface-variant, #f5f5f5);
                    transition: all 0.3s ease;
                  "
                  @mouseover=${(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                    e.target.style.borderColor = 'var(--spectrum-color-primary, #0070d2)';
                  }}
                  @mouseout=${(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = 'var(--spectrum-color-outline, #e0e0e0)';
                  }}
                >
                  <div style="
                    width: 100%;
                    height: 80px;
                    background: ${wallpaper.background};
                    background-size: cover;
                    background-position: center;
                    border-radius: 0.25rem;
                    margin-bottom: 0.5rem;
                    border: 1px solid var(--spectrum-color-outline-variant, #ccc);
                  "></div>
                  <h3 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.25rem 0; font-size: 1rem;">
                    ${wallpaper.name}
                  </h3>
                  <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0; font-size: 0.85rem;">
                    ${wallpaper.description}
                  </p>
                </div>
              `)}
            </div>

            <!-- Theme Features Demo -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
              <!-- Primary Colors Demo -->
              <div style="padding: 1rem; background: var(--spectrum-color-primary-container, #e3f2fd); border-radius: 0.5rem; border: 1px solid var(--spectrum-color-primary, #0070d2);">
                <h3 style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0 0 0.5rem 0;">Primary Theme</h3>
                <div style="color: var(--spectrum-color-primary, #0070d2); font-weight: bold;">Primary Color</div>
                <div style="background: var(--spectrum-color-primary, #0070d2); color: var(--spectrum-color-on-primary, #fff); padding: 0.5rem; border-radius: 0.25rem; margin: 0.5rem 0;">
                  Text on Primary
                </div>
              </div>

              <!-- Secondary Colors Demo -->
              <div style="padding: 1rem; background: var(--spectrum-color-secondary-container, #e8f5e8); border-radius: 0.5rem; border: 1px solid var(--spectrum-color-secondary, #005fb2);">
                <h3 style="color: var(--spectrum-color-on-secondary-container, #2e7d32); margin: 0 0 0.5rem 0;">Secondary Theme</h3>
                <div style="color: var(--spectrum-color-secondary, #005fb2); font-weight: bold;">Secondary Color</div>
                <div style="background: var(--spectrum-color-secondary, #005fb2); color: var(--spectrum-color-on-secondary, #fff); padding: 0.5rem; border-radius: 0.25rem; margin: 0.5rem 0;">
                  Text on Secondary
                </div>
              </div>

              <!-- Tertiary Colors Demo -->
              <div style="padding: 1rem; background: var(--spectrum-color-tertiary-container, #fff3e0); border-radius: 0.5rem; border: 1px solid var(--spectrum-color-tertiary, #8b5a3c);">
                <h3 style="color: var(--spectrum-color-on-tertiary-container, #5d4037); margin: 0 0 0.5rem 0;">Tertiary Theme</h3>
                <div style="color: var(--spectrum-color-tertiary, #8b5a3c); font-weight: bold;">Tertiary Color</div>
                <div style="background: var(--spectrum-color-tertiary, #8b5a3c); color: var(--spectrum-color-on-tertiary, #fff); padding: 0.5rem; border-radius: 0.25rem; margin: 0.5rem 0;">
                  Text on Tertiary
                </div>
              </div>
            </div>

            <!-- Status and Controls -->
            <div style="background: var(--spectrum-color-surface-variant, #f5f5f5); padding: 1rem; border-radius: 0.5rem; margin: 2rem 0;">
              <h3 style="color: var(--spectrum-color-on-surface-variant, #44464f); margin: 0 0 1rem 0;">Theme Controls & Status</h3>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input 
                    type="checkbox" 
                    ${args.showSwatches ? 'checked' : ''} 
                                         @change=${(e) => {
                       const wallpaperElement = e.target.closest('spectrum-wallpaper');
                       if (wallpaperElement) {
                         wallpaperElement.showSwatches = e.target.checked;
                       }
                     }}
                  />
                  <span style="color: var(--spectrum-color-on-surface-variant, #44464f);">Show Color Swatches</span>
                </label>

                                 <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                   <input 
                     type="checkbox" 
                     ${args.debug ? 'checked' : ''} 
                     @change=${(e) => {
                       const wallpaperElement = e.target.closest('spectrum-wallpaper');
                       if (wallpaperElement) {
                         wallpaperElement.debug = e.target.checked;
                       }
                     }}
                   />
                   <span style="color: var(--spectrum-color-on-surface-variant, #44464f);">Debug Console Logging</span>
                 </label>

                 <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                   <input 
                     type="checkbox" 
                     ${args.applyToRoot ? 'checked' : ''} 
                     @change=${(e) => {
                       const wallpaperElement = e.target.closest('spectrum-wallpaper');
                       if (wallpaperElement) {
                         wallpaperElement.applyToRoot = e.target.checked;
                       }
                     }}
                   />
                   <span style="color: var(--spectrum-color-on-surface-variant, #44464f);">Apply to Document Root</span>
                 </label>

                 <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                   <input 
                     type="checkbox" 
                     ${args.signalReady ? 'checked' : ''} 
                     @change=${(e) => {
                       const wallpaperElement = e.target.closest('spectrum-wallpaper');
                       if (wallpaperElement) {
                         wallpaperElement.signalReady = e.target.checked;
                       }
                     }}
                   />
                   <span style="color: var(--spectrum-color-on-surface-variant, #44464f);">Signal Ready Events</span>
                 </label>
              </div>
            </div>

            <!-- Instructions -->
            <div style="background: #e3f2fd; border: 1px solid #90caf9; padding: 1rem; border-radius: 0.5rem; margin: 2rem 0;">
              <h3 style="color: #0d47a1; margin: 0 0 0.5rem 0;">🎯 How to Use This Demo</h3>
              <ol style="color: #1565c0; margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
                <li><strong>Click any wallpaper</strong> above to change the background and theme</li>
                <li><strong>Watch the colors update</strong> in real-time throughout the interface</li>
                <li><strong>Toggle features</strong> like debug mode and color swatches</li>
                <li><strong>Open browser console</strong> (F12) with debug mode to see extraction process</li>
                <li><strong>Notice how text adapts</strong> for proper contrast on all backgrounds</li>
              </ol>
            </div>

            <!-- Performance Stats -->
            <div style="background: var(--spectrum-color-surface, #ffffff); border: 1px solid var(--spectrum-color-outline, #e0e0e0); padding: 1rem; border-radius: 0.5rem;">
              <h3 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.5rem 0;">📊 Live Theme Variables</h3>
              <div style="font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                <div style="color: var(--spectrum-color-primary, #0070d2);">--spectrum-color-primary: var(--spectrum-color-primary)</div>
                <div style="color: var(--spectrum-color-secondary, #005fb2);">--spectrum-color-secondary: var(--spectrum-color-secondary)</div>
                <div style="color: var(--spectrum-color-tertiary, #8b5a3c);">--spectrum-color-tertiary: var(--spectrum-color-tertiary)</div>
                <div style="color: var(--spectrum-color-error, #ba1a1a);">--spectrum-color-error: var(--spectrum-color-error)</div>
              </div>
            </div>
          </div>
        </spectrum-wallpaper>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
# 🎨 Interactive Wallpaper/Theme Demo

A comprehensive, interactive demonstration of the wallpaper component's dynamic theming capabilities.

## ✨ Features Demonstrated

### 🖼️ **Diverse Wallpaper Collection**
- **Nature Photography**: Autumn forests, ocean scenes, mountain vistas
- **Seasonal Themes**: Cherry blossoms, tropical paradise, sunset horizons  
- **Solid Colors**: Brand colors and Material Design palette
- **CSS Gradients**: Multi-color gradients and artistic combinations

### 🎨 **Real-Time Theme Generation**
- **Instant Updates**: Click any wallpaper to see immediate theme changes
- **Material Design 3**: Complete 24-color palette generation
- **Automatic Contrast**: Text colors adjust for optimal readability
- **Live CSS Variables**: Watch theme properties update in real-time

### 🔧 **Interactive Controls**
- **Show Color Swatches**: Toggle color palette display
- **Debug Console Logging**: Enable visual color extraction feedback
- **Apply to Document Root**: Test conflict resolution with higher specificity
- **Signal Ready Events**: Enable coordination event system

### 🎯 **Use Cases Covered**
1. **Brand Theming**: Using brand colors as primary theme source
2. **Seasonal Interfaces**: Nature themes that adapt to content
3. **Dynamic Branding**: Hero image-based theme generation
4. **User Customization**: Interactive wallpaper selection
5. **Developer Tools**: Debug and testing capabilities

## 🚀 **Technical Benefits**

### ⚡ **Performance**
- **Efficient Color Extraction**: Fast dominant color analysis
- **Optimized Rendering**: Smooth transitions between themes
- **Cached Results**: Avoid re-extraction for same images

### 🎨 **Design System Integration**
- **Material Design 3**: Full spec compliance with generated palettes
- **CSS Custom Properties**: 24 theme variables for complete coverage
- **Accessibility**: Automatic contrast calculations for WCAG compliance

### 🔧 **Developer Experience**
- **Real-Time Debugging**: Visual console feedback with colored boxes
- **Event Coordination**: Theme-ready events for complex applications
- **Conflict Resolution**: Document root application for higher priority

## 💡 **Implementation Ideas**

This demo showcases patterns for:
- **E-commerce**: Product-based theme generation
- **Content Platforms**: Article hero image theming  
- **Dashboards**: Dynamic branding based on user preferences
- **Portfolio Sites**: Artwork-driven color schemes
- **Marketing Pages**: Campaign-specific theme generation

Try different combinations of wallpapers and controls to see the full range of theming possibilities!
        `
      }
    }
  }
}; 