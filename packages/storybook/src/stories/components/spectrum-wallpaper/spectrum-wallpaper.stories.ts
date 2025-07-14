import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumWallpaper } from "../../../../core/src/components/spectrum-wallpaper/spectrum-wallpaper";

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
When \`debug="true"\`, see colors as **colored boxes** in the browser console

### ⚙️ Theme Conflict Resolution
Use \`apply-to-root="true"\` when wallpaper theme conflicts with other theme components

### 🔧 Theme Coordination System
Use \`preload-colors="true"\` and \`signal-ready="true"\` for complex applications with multiple theme sources
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

export const Base64ImageBackground: StoryObj<SpectrumWallpaper> = {
  name: 'Base64 Image Background',
  args: {
    background: '',
    showSwatches: true,
    debug: true,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.innerHTML = `
      <spectrum-wallpaper 
        background="" 
        show-swatches="${args.showSwatches}" 
        debug="${args.debug}">
        <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 0.5rem; margin: 2rem; max-width: 600px; backdrop-filter: blur(10px);">
          <h2 style="color: var(--spectrum-color-primary, #0070d2); margin-top: 0;">Loading Base64 Image...</h2>
          <p>Reading base64.txt file and passing directly to component</p>
          <div style="background: #e3f2fd; border: 1px solid #90caf9; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🧪 Testing Component Handling:</strong>
            <p style="margin: 0.5rem 0 0 0;">This story loads base64.txt and passes the content directly to the component without any parsing or conversion.</p>
          </div>
        </div>
      </spectrum-wallpaper>
    `;
    
    const wallpaperElement = container.querySelector('spectrum-wallpaper');
    const contentDiv = wallpaperElement?.querySelector('div');
    
    if (!wallpaperElement || !contentDiv) {
      console.error('Failed to find required DOM elements');
      return container;
    }
    
    // Load base64 content from file and pass directly to component
    fetch('/base64.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(base64Content => {
        // Pass the base64 content wrapped in url() for CSS background format
        const backgroundValue = `url(${base64Content.trim()})`;
        wallpaperElement.setAttribute('background', backgroundValue);
        
        // Update the content to show success
        contentDiv.innerHTML = `
          <h2 style="color: var(--spectrum-color-primary, #0070d2); margin-top: 0;">✅ Base64 Data Loaded</h2>
          <p>Raw content from base64.txt passed directly to component</p>
          <div style="background: #e8f5e8; border: 1px solid #81c784; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>✅ Component Test:</strong>
            <p style="margin: 0.5rem 0 0 0;">The spectrum-wallpaper component should now handle the base64 data and extract colors automatically.</p>
          </div>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 4px; margin: 1rem 0; font-size: 0.85rem;">
            <strong>Data Preview:</strong><br>
            <code style="word-break: break-all;">${base64Content.trim().substring(0, 100)}...</code>
          </div>
        `;
      })
      .catch(error => {
        console.error('Failed to load base64.txt:', error);
        
        contentDiv.innerHTML = `
          <h2 style="color: #d32f2f; margin-top: 0;">❌ Failed to Load Base64 Data</h2>
          <p>Error: ${error.message}</p>
          <div style="background: #ffebee; border: 1px solid #f44336; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>Troubleshooting:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li>Ensure base64.txt is in the storybook public directory</li>
              <li>Check that the file is accessible from the web server</li>
              <li>Verify the file exists and has content</li>
            </ul>
          </div>
        `;
      });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: `
# Base64 Image Background

Demonstrates loading base64 data from a file and passing it directly to the spectrum-wallpaper component for processing.

## Test Objectives

🧪 **Component Handling**: Test that the web component can properly handle base64 image data  
🎨 **Color Extraction**: Verify automatic color extraction from base64 images  
🔧 **Data Processing**: Ensure the component handles file-loaded base64 content correctly  

## Implementation

This story:
1. **Loads** base64.txt file content using fetch
2. **Passes** raw content directly to the component's background property
3. **Tests** that the component handles the data without any preprocessing
4. **Verifies** automatic color extraction and theme generation

## Benefits of This Approach

✅ **Real-world Testing**: Simulates loading image data from external sources  
✅ **Component Validation**: Tests the component's built-in data handling  
✅ **No Preprocessing**: Ensures component robustness with raw data  
✅ **Dynamic Loading**: Demonstrates runtime data loading capabilities  

The component should automatically detect the base64 format and extract colors for Material Design 3 theming.
        `
      }
    }
  }
};

export const Base64ImageCheck: StoryObj<SpectrumWallpaper> = {
  name: 'Base64 Image Check',
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '2rem';
    container.style.maxWidth = '800px';
    container.innerHTML = `
      <h2 style="margin-bottom: 1rem; color: var(--spectrum-color-primary, #0070d2);">Base64 Image Check</h2>
      <p style="margin-bottom: 1rem; font-size: 0.9rem; color: #666;">
        This story loads base64.txt and displays the image directly in an HTML image tag to verify the data is correct.
      </p>
      
      <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 0.5rem; background: #f9f9f9;">
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem;">Image Preview:</h3>
        <div id="loading-message" style="padding: 1rem; text-align: center; color: #666;">
          Loading base64.txt file...
        </div>
        <img 
          id="base64-image"
          style="display: none; max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 0.25rem;"
          alt="Base64 Test Image"
        />
        <div id="error-message" style="display: none; padding: 2rem; text-align: center; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 0.25rem; color: #856404;">
          <strong>⚠️ Image failed to load</strong><br>
          <span style="font-size: 0.8rem;">Check that the base64 data is properly formatted and complete</span>
        </div>
      </div>
      
      <div style="margin-top: 1rem; padding: 1rem; background: #e8f4f8; border-radius: 0.5rem; font-size: 0.85rem;">
        <strong>Instructions:</strong><br>
        1. This story automatically loads base64.txt from the same directory<br>
        2. The image should display above if the data is valid<br>
        3. If it works here, you can use it in the wallpaper component<br>
        4. Check browser console for any loading errors
      </div>
    `;
    
    const loadingMessage = container.querySelector('#loading-message') as HTMLElement;
    const imageElement = container.querySelector('#base64-image') as HTMLImageElement;
    const errorMessage = container.querySelector('#error-message') as HTMLElement;
    
    if (!loadingMessage || !imageElement || !errorMessage) {
      console.error('Failed to find required DOM elements');
      return container;
    }
    
    // Load base64 content from file
    fetch('/base64.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(base64Content => {
        const trimmedContent = base64Content.trim();
        
        // Hide loading message
        loadingMessage.style.display = 'none';
        
        // Set up image error handling
        imageElement.onerror = () => {
          imageElement.style.display = 'none';
          errorMessage.style.display = 'block';
        };
        
        // Set up image success handling
        imageElement.onload = () => {
          console.log('✅ Base64 image loaded successfully');
        };
        
        // Set the image source with the loaded base64 content
        imageElement.src = trimmedContent;
        imageElement.style.display = 'block';
        
        console.log('📁 Loaded base64.txt content:', trimmedContent.substring(0, 50) + '...');
      })
      .catch(error => {
        console.error('❌ Failed to load base64.txt:', error);
        
        loadingMessage.style.display = 'none';
        errorMessage.innerHTML = `
          <strong>❌ Failed to load base64.txt</strong><br>
          <span style="font-size: 0.8rem;">Error: ${error.message}</span><br>
          <span style="font-size: 0.8rem;">Make sure base64.txt exists in the storybook public directory</span>
        `;
        errorMessage.style.display = 'block';
      });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: `
# Base64 Image Check

A simple test story that displays the base64 image directly in an HTML \`<img>\` tag to verify the base64 data is working correctly.

## How to Use

1. **Copy Base64 Data**: Copy the content from \`base64.txt\` file
2. **Replace Placeholder**: Replace \`PASTE_BASE64_CONTENT_HERE\` with your base64 data
3. **Check Display**: The image should display if the base64 data is valid
4. **Verify Format**: Ensure the base64 data doesn't include the \`data:image/jpeg;base64,\` prefix

## Troubleshooting

- **Image not showing**: Check that base64 data is complete and properly formatted
- **Console errors**: Look for invalid character or truncated data errors
- **File size**: Large base64 strings (>2MB) may cause performance issues

This is a testing utility to validate base64 image data before using it in the wallpaper component.
        `
      }
    }
  }
};

export const Default: StoryObj<SpectrumWallpaper> = {
  name: 'Basic Image Background',
  parameters: {
    docs: {
      description: {
        story: 'Basic usage with an image background. The component automatically extracts the dominant color and generates a complete Material Design 3 theme.'
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
        story: 'Using a solid color as the theme source. Perfect for brand colors as primary theme source.'
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
            <pre style="margin: 0.5rem 0 0 0; font-size: 0.8rem; color: #495057;">🎨 [spectrum-wallpaper] Dominant color: [COLORED_BOX] #1976d2</pre>
          </div>
        </div>
      </spectrum-wallpaper>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Debug Mode provides comprehensive development tools with visual console logging and real-time color extraction feedback.'
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
            <p style="margin: 0.5rem 0 0 0;">Theme variables are applied to document.documentElement instead of the host element, giving them higher CSS specificity.</p>
          </div>

          <div style="background: #e8f5e8; border: 1px solid #81c784; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>✅ Benefits:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li><strong>Higher Priority:</strong> Overrides other theme components</li>
              <li><strong>Global Scope:</strong> Theme available throughout entire app</li>
              <li><strong>Conflict Prevention:</strong> Prevents CSS override conflicts</li>
            </ul>
          </div>
        </div>
      </spectrum-wallpaper>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Theme Conflict Resolution solves theming conflicts by applying variables to document root with higher CSS specificity.'
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
            <strong>�� Coordination Features Active:</strong>
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li><strong>preload-colors="true":</strong> Colors extracted but not applied yet</li>
              <li><strong>signal-ready="true":</strong> Events emitted when colors are ready</li>
              <li><strong>Programmatic Control:</strong> Call applyPreloadedColors() when ready</li>
            </ul>
          </div>

          <div style="background: #e1f5fe; border: 1px solid #4fc3f7; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>📡 Event System:</strong>
            <div style="font-family: monospace; font-size: 0.8rem; background: #f8f9fa; padding: 0.5rem; border-radius: 4px; margin: 0.5rem 0;">
              <div><strong>Success:</strong> wallpaper-colors-ready</div>
              <div><strong>Failure:</strong> wallpaper-colors-failed</div>
            </div>
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
        story: 'Advanced Theme Coordination enables sophisticated theme management with event-based coordination and programmatic control.'
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
                   @click=${(e: Event) => {
                     const target = e.target as HTMLElement;
                     const wallpaperElement = target.closest('spectrum-wallpaper') as any;
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
                   @mouseover=${(e: Event) => {
                     const target = e.target as HTMLElement;
                     target.style.transform = 'translateY(-2px)';
                     target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                     target.style.borderColor = 'var(--spectrum-color-primary, #0070d2)';
                   }}
                   @mouseout=${(e: Event) => {
                     const target = e.target as HTMLElement;
                     target.style.transform = 'translateY(0)';
                     target.style.boxShadow = 'none';
                     target.style.borderColor = 'var(--spectrum-color-outline, #e0e0e0)';
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
                                         @change=${(e: Event) => {
                       const target = e.target as HTMLInputElement;
                       const wallpaperElement = target.closest('spectrum-wallpaper') as any;
                       if (wallpaperElement) {
                         wallpaperElement.showSwatches = target.checked;
                       }
                     }}
                   />
                   <span style="color: var(--spectrum-color-on-surface-variant, #44464f);">Show Color Swatches</span>
                 </label>

                 <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                   <input 
                     type="checkbox" 
                     ${args.debug ? 'checked' : ''} 
                     @change=${(e: Event) => {
                       const target = e.target as HTMLInputElement;
                       const wallpaperElement = target.closest('spectrum-wallpaper') as any;
                       if (wallpaperElement) {
                         wallpaperElement.debug = target.checked;
                       }
                     }}
                   />
                   <span style="color: var(--spectrum-color-on-surface-variant, #44464f);">Debug Console Logging</span>
                 </label>

                 <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                   <input 
                     type="checkbox" 
                     ${args.applyToRoot ? 'checked' : ''} 
                     @change=${(e: Event) => {
                       const target = e.target as HTMLInputElement;
                       const wallpaperElement = target.closest('spectrum-wallpaper') as any;
                       if (wallpaperElement) {
                         wallpaperElement.applyToRoot = target.checked;
                       }
                     }}
                   />
                   <span style="color: var(--spectrum-color-on-surface-variant, #44464f);">Apply to Document Root</span>
                 </label>

                 <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                   <input 
                     type="checkbox" 
                     ${args.signalReady ? 'checked' : ''} 
                     @change=${(e: Event) => {
                       const target = e.target as HTMLInputElement;
                       const wallpaperElement = target.closest('spectrum-wallpaper') as any;
                       if (wallpaperElement) {
                         wallpaperElement.signalReady = target.checked;
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
