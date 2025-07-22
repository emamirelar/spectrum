import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumWallpaper Component
 * 
 * A sophisticated background theming component that extracts dominant colors from images, gradients, or solid colors and generates comprehensive Material Design 3 themes with advanced debugging and coordination capabilities.
 * 
 * ### Key Features
 * - **Automatic Color Extraction**: Advanced analysis of images, gradients, and solid colors for theme generation
 * - **Material Design 3 Integration**: Complete 24-color palette generation following MD3 specifications
 * - **Theme Coordination**: Event-based coordination with spectrum-theme and other components
 * - **Advanced Debug Mode**: Visual console logging with colored boxes for development and testing
 * - **Conflict Resolution**: Document root application for higher CSS specificity and theme priority
 * - **Flexible Background Control**: Comprehensive positioning, sizing, and display options
 * 
 * ### Usage Guidelines
 * - **Use for**: Dynamic theming, brand color extraction, seasonal interfaces, user customization, hero image themes
 * - **Avoid when**: Static backgrounds without theming requirements, performance-critical scenarios with frequent changes
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **wallpaper-colors-ready**: Emitted when color extraction succeeds with extracted theme data
 * - **wallpaper-colors-failed**: Emitted when color extraction fails with error context
 */

// Define local interfaces for better type safety
interface SpectrumWallpaperArgs {
  background: string;
  showSwatches: boolean;
  debug: boolean;
  preloadColors: boolean;
  signalReady: boolean;
  applyToRoot: boolean;
  backgroundPosition: string;
  backgroundSize: string;
}

// Sample background collections for different use cases
const sampleBackgrounds = {
  nature: [
    {
      name: '🍂 Autumn Forest',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      description: 'Warm oranges, browns, and golden tones'
    },
    {
      name: '🌊 Ocean Waves',
      url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
      description: 'Cool blues, teals, and aqua tones'
    },
    {
      name: '🌸 Cherry Blossoms',
      url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
      description: 'Soft pinks, whites, and spring greens'
    },
    {
      name: '🏔️ Mountain Vista',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      description: 'Earth tones, grays, and sky blues'
    }
  ],
  colors: [
    { name: 'Material Blue', value: '#2196f3', description: 'Primary brand blue' },
    { name: 'Forest Green', value: '#4caf50', description: 'Natural green tone' },
    { name: 'Sunset Orange', value: '#ff9800', description: 'Warm orange accent' },
    { name: 'Deep Purple', value: '#673ab7', description: 'Rich purple theme' }
  ],
  gradients: [
    {
      name: 'Ocean Breeze',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Blue to purple gradient'
    },
    {
      name: 'Sunset Glow',
      value: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
      description: 'Red to orange gradient'
    },
    {
      name: 'Forest Dawn',
      value: 'linear-gradient(120deg, #a8e6cf, #dcedc1)',
      description: 'Green nature gradient'
    },
    {
      name: 'Cosmic Night',
      value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Deep space gradient'
    }
  ]
};

const meta: Meta<SpectrumWallpaperArgs> = {
  title: 'Spectrum/Components/SpectrumWallpaper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The wallpaper component provides advanced background theming with automatic color extraction and Material Design 3 theme generation.

### Event System
Emits wallpaper-colors-ready and wallpaper-colors-failed events for theme coordination with action attributes.

### Basic Usage
Use standard property binding syntax for all component properties with comprehensive theming capabilities.
        `
      }
    }
  },
  args: {
    background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)',
    showSwatches: false,
    debug: false,
    preloadColors: false,
    signalReady: false,
    applyToRoot: false,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  argTypes: {
    background: {
      control: 'text',
      description: 'Background value: color, gradient, or image URL for theme extraction',
    },
    showSwatches: {
      control: 'boolean',
      description: 'Display color swatches for development and visual theme debugging',
    },
    debug: {
      control: 'boolean',
      description: 'Enable visual console logging with colored boxes for development',
    },
    preloadColors: {
      control: 'boolean',
      description: 'Extract colors without applying them for coordination purposes',
    },
    signalReady: {
      control: 'boolean',
      description: 'Emit events when colors are ready for theme coordination',
    },
    applyToRoot: {
      control: 'boolean',
      description: 'Apply theme to document root for higher CSS specificity',
    },
    backgroundPosition: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
      description: 'CSS background-position for image backgrounds',
    },
    backgroundSize: {
      control: 'select',
      options: ['cover', 'contain', 'auto', '100%', '50%'],
      description: 'CSS background-size for image backgrounds',
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumWallpaperArgs>;

// Interactive render function
const renderWallpaper = (args: SpectrumWallpaperArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 300px; border-radius: 8px; position: relative;">
    <spectrum-wallpaper
      background=${args.background}
      .showSwatches=${args.showSwatches}
      .debug=${args.debug}
      .preloadColors=${args.preloadColors}
      .signalReady=${args.signalReady}
      .applyToRoot=${args.applyToRoot}
      background-position=${args.backgroundPosition}
      background-size=${args.backgroundSize}
      @wallpaper-colors-ready=${(e: CustomEvent) => action('wallpaperColorsReady')(e.detail)}
      @wallpaper-colors-failed=${(e: CustomEvent) => action('wallpaperColorsFailed')(e.detail)}
    >
      <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 1rem; max-width: 400px; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">Dynamic Theme Preview</h3>
        <p style="margin: 0 0 1rem 0; color: var(--spectrum-color-on-surface, #000);">
          This content demonstrates the automatically generated theme colors.
        </p>
        <div style="display: flex; gap: 0.5rem; margin: 1rem 0;">
          <div style="
            background: var(--spectrum-color-primary, #0070d2);
            color: var(--spectrum-color-on-primary, #fff);
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.9rem;
          ">Primary</div>
          <div style="
            background: var(--spectrum-color-secondary, #005fb2);
            color: var(--spectrum-color-on-secondary, #fff);
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-size: 0.9rem;
          ">Secondary</div>
        </div>
      </div>
    </spectrum-wallpaper>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderWallpaper,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.
        `
      }
    }
  }
};

// =================================================================
// VARIANTS
// =================================================================

/**
 * Different background types and their theme generation capabilities.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0; color: #333;">Background Variants</h3>
      
      <!-- Nature Photography -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #16a34a;">🖼️ Nature Photography</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${sampleBackgrounds.nature.map(bg => html`
            <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
              <spectrum-wallpaper
                background=${`url(${bg.url})`}
                .showSwatches=${true}
                .debug=${false}
                background-size="cover"
                background-position="center"
                style="height: 200px; display: block;"
                @wallpaper-colors-ready=${(e: CustomEvent) => action(`${bg.name}ColorsReady`)(e.detail)}
              >
                <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                  <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">${bg.name}</h5>
                  <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">${bg.description}</p>
                </div>
              </spectrum-wallpaper>
            </div>
          `)}
        </div>
      </div>
      
      <!-- Solid Colors -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #2563eb;">🎨 Solid Colors</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${sampleBackgrounds.colors.map(color => html`
            <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
              <spectrum-wallpaper
                background=${color.value}
                .showSwatches=${true}
                .debug=${false}
                style="height: 200px; display: block;"
                @wallpaper-colors-ready=${(e: CustomEvent) => action(`${color.name}ColorsReady`)(e.detail)}
              >
                <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                  <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">${color.name}</h5>
                  <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">${color.description}</p>
                  <div style="
                    background: ${color.value};
                    width: 100%;
                    height: 20px;
                    border-radius: 0.25rem;
                    margin-top: 0.5rem;
                    border: 1px solid rgba(0,0,0,0.1);
                  "></div>
                </div>
              </spectrum-wallpaper>
            </div>
          `)}
        </div>
      </div>
      
      <!-- CSS Gradients -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #7c3aed;">🌈 CSS Gradients</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${sampleBackgrounds.gradients.map(gradient => html`
            <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
              <spectrum-wallpaper
                background=${gradient.value}
                .showSwatches=${true}
                .debug=${false}
                style="height: 200px; display: block;"
                @wallpaper-colors-ready=${(e: CustomEvent) => action(`${gradient.name}ColorsReady`)(e.detail)}
              >
                <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                  <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">${gradient.name}</h5>
                  <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">${gradient.description}</p>
                </div>
              </spectrum-wallpaper>
            </div>
          `)}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive showcase of different background types and their automatic theme generation capabilities.

**Background Types:**
- **Nature Photography**: Complex images with diverse color palettes for rich theme extraction
- **Solid Colors**: Brand colors and design system colors for consistent theming
- **CSS Gradients**: Linear and radial gradients for artistic and dynamic themes

Each variant demonstrates real-time color extraction and Material Design 3 theme generation with visual color swatches.
        `
      }
    }
  }
};

// =================================================================
// BACKGROUND OPTIONS (EQUIVALENT TO SIZES)
// =================================================================

/**
 * Background positioning and sizing options for image backgrounds.
 */
export const BackgroundOptions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0; color: #333;">Background Positioning & Sizing</h3>
      
      <!-- Background Size Options -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #2563eb;">📐 Background Size Options</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          ${['cover', 'contain', '100%', '50%'].map(size => html`
            <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
              <spectrum-wallpaper
                background="url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80)"
                background-size=${size}
                background-position="center"
                .showSwatches=${false}
                style="height: 150px; display: block;"
              >
                <div style="background: rgba(255,255,255,0.9); padding: 0.75rem; margin: 0.75rem; border-radius: 0.25rem; backdrop-filter: blur(10px);">
                  <h5 style="margin: 0; color: var(--spectrum-color-primary, #0070d2); font-size: 0.9rem;">
                    background-size: ${size}
                  </h5>
                </div>
              </spectrum-wallpaper>
            </div>
          `)}
        </div>
      </div>
      
      <!-- Background Position Options -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #16a34a;">📍 Background Position Options</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          ${['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'].map(position => html`
            <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
              <spectrum-wallpaper
                background="url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80)"
                background-size="120%"
                background-position=${position}
                .showSwatches=${false}
                style="height: 120px; display: block;"
              >
                <div style="background: rgba(255,255,255,0.9); padding: 0.5rem; margin: 0.5rem; border-radius: 0.25rem; backdrop-filter: blur(10px);">
                  <h5 style="margin: 0; color: var(--spectrum-color-primary, #0070d2); font-size: 0.8rem;">
                    ${position}
                  </h5>
                </div>
              </spectrum-wallpaper>
            </div>
          `)}
        </div>
      </div>
      
      <!-- Responsive Background Sizing -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #ea580c;">📱 Responsive Background Examples</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80)"
              background-size="cover"
              background-position="center"
              .showSwatches=${false}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Mobile Optimized</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  cover + center for full coverage
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80)"
              background-size="contain"
              background-position="center"
              .showSwatches=${false}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Desktop Friendly</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  contain + center to show full image
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive demonstration of background positioning and sizing options for image backgrounds.

**Background Size Options:**
- **cover**: Scales image to cover entire container (may crop)
- **contain**: Scales image to fit entirely within container  
- **100%**: Stretches image to exact container dimensions
- **50%**: Scales image to 50% of container size

**Background Position Options:**
- **Center positions**: center, top, bottom, left, right
- **Corner positions**: top left, top right, bottom left, bottom right
- **Responsive considerations**: Mobile vs desktop optimization

**Best Practices:**
- Use \`cover + center\` for hero images and full-screen backgrounds
- Use \`contain + center\` when image content must be fully visible
- Consider different positions for focal point alignment
- Test across different aspect ratios and screen sizes
        `
      }
    }
  }
};

// =================================================================
// ADVANCED FEATURES (EQUIVALENT TO ICON BUTTONS)
// =================================================================

/**
 * Advanced features including debug mode, theme coordination, and conflict resolution.
 */
export const AdvancedFeatures: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0; color: #333;">Advanced Features & Development Tools</h3>
      
      <!-- Debug Mode -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #dc2626;">🐛 Debug Mode</h4>
        <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
          <spectrum-wallpaper
            background="url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80)"
            .showSwatches=${true}
            .debug=${true}
            style="height: 250px; display: block;"
            @wallpaper-colors-ready=${(e: CustomEvent) => action('debugColorsReady')(e.detail)}
          >
            <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
              <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">🐛 Debug Mode Active</h5>
              <div style="background: #e3f2fd; border: 1px solid #90caf9; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                <strong>🔍 Debug Instructions:</strong>
                <ol style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; font-size: 0.9rem;">
                  <li>Open Browser Console (F12 → Console tab)</li>
                  <li>Look for colored messages starting with <code>[spectrum-wallpaper]</code></li>
                  <li>Watch real-time color extraction and validation</li>
                </ol>
              </div>
            </div>
          </spectrum-wallpaper>
        </div>
      </div>
      
      <!-- Theme Coordination -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #7c3aed;">🔧 Theme Coordination</h4>
        <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
          <spectrum-wallpaper
            background="url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80)"
            .preloadColors=${true}
            .signalReady=${true}
            .debug=${true}
            .showSwatches=${true}
            style="height: 250px; display: block;"
            @wallpaper-colors-ready=${(e: CustomEvent) => action('coordinationColorsReady')(e.detail)}
            @wallpaper-colors-failed=${(e: CustomEvent) => action('coordinationColorsFailed')(e.detail)}
          >
            <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
              <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">🔧 Theme Coordination Active</h5>
              <div style="background: #f3e5f5; border: 1px solid #ce93d8; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                <strong>📡 Coordination Features:</strong>
                <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; font-size: 0.9rem;">
                  <li><strong>preload-colors="true":</strong> Colors extracted but not applied</li>
                  <li><strong>signal-ready="true":</strong> Events emitted when ready</li>
                  <li><strong>Event monitoring:</strong> Check Actions panel below</li>
                </ul>
              </div>
            </div>
          </spectrum-wallpaper>
        </div>
      </div>
      
      <!-- Conflict Resolution -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #ea580c;">⚙️ Theme Conflict Resolution</h4>
        <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
          <spectrum-wallpaper
            background="#8b5a3c"
            .applyToRoot=${true}
            .showSwatches=${true}
            .debug=${true}
            style="height: 250px; display: block;"
            @wallpaper-colors-ready=${(e: CustomEvent) => action('conflictResolutionReady')(e.detail)}
          >
            <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
              <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">⚙️ Document Root Application</h5>
              <div style="background: #fff3e0; border: 1px solid #ffb74d; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                <strong>🔧 apply-to-root="true" Active:</strong>
                <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; font-size: 0.9rem;">
                  <li><strong>Higher Priority:</strong> Overrides other theme components</li>
                  <li><strong>Global Scope:</strong> Available throughout entire app</li>
                  <li><strong>Conflict Prevention:</strong> Avoids CSS override conflicts</li>
                </ul>
              </div>
            </div>
          </spectrum-wallpaper>
        </div>
      </div>
      
      <!-- Color Swatches Demo -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #16a34a;">🎨 Color Swatches Display</h4>
        <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
          <spectrum-wallpaper
            background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            .showSwatches=${true}
            .debug=${false}
            style="height: 250px; display: block;"
          >
            <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
              <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">🎨 Visual Color Swatches</h5>
              <div style="background: #e8f5e8; border: 1px solid #81c784; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                <strong>✅ Development Benefits:</strong>
                <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem; font-size: 0.9rem;">
                  <li><strong>Visual Feedback:</strong> See extracted colors immediately</li>
                  <li><strong>Theme Validation:</strong> Verify color harmony and contrast</li>
                  <li><strong>Debug Assistance:</strong> Understand color generation process</li>
                </ul>
              </div>
            </div>
          </spectrum-wallpaper>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Advanced features and development tools for sophisticated theming workflows and troubleshooting.

**Debug Mode:**
- Visual console logging with colored boxes for real-time feedback
- Detailed color extraction process monitoring
- Performance and error tracking capabilities

**Theme Coordination:**
- Event-based coordination with other theme components
- Preload colors without applying for complex coordination scenarios
- Signal-ready events for synchronized theme application

**Conflict Resolution:**
- Document root application for higher CSS specificity
- Override prevention for complex applications with multiple theme sources
- Global theme scope for consistent application-wide theming

**Color Swatches:**
- Visual representation of extracted Material Design 3 color palette
- Development and testing tool for theme validation
- Real-time feedback for color harmony and accessibility

These advanced features enable sophisticated theming workflows in complex applications with multiple theme sources and coordination requirements.
        `
      }
    }
  }
};

// =================================================================
// USAGE SCENARIOS
// =================================================================

/**
 * Real-world theming applications and business use cases.
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0; color: #333;">Real-World Theming Applications</h3>
      
      <!-- Brand Theme Generation -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #2563eb;">🏢 Brand Theme Generation</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem;">
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="#0070d2"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Corporate Brand Theme</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  Automatic MD3 palette generation from brand colors
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80)"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Product Hero Theming</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  Extract themes from product imagery and marketing materials
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
        </div>
      </div>
      
      <!-- Seasonal & Campaign Themes -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #16a34a;">🍂 Seasonal & Campaign Themes</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem;">
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80)"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Holiday Campaign</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  Seasonal theming for special events and campaigns
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Autumn Collection</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  Dynamic seasonal themes that adapt throughout the year
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
        </div>
      </div>
      
      <!-- User Personalization -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #7c3aed;">👤 User Personalization</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem;">
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Custom User Theme</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  User-selected wallpapers with automatic theme generation
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80)"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Profile Background</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  Personal wallpapers that create harmonious interface themes
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
        </div>
      </div>
      
      <!-- Content-Aware Theming -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #ea580c;">📰 Content-Aware Theming</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1rem;">
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1486312338219-ce68e2c6b56f?w=800&q=80)"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Article Header Theme</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  Dynamic themes based on article hero images and content
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80)"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.9); padding: 1rem; margin: 1rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-primary, #0070d2);">Dashboard Analytics</h5>
                <p style="margin: 0; font-size: 0.85rem; color: var(--spectrum-color-on-surface, #000);">
                  Data visualization themes that match content and charts
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-world theming applications demonstrating practical business use cases and implementation patterns.

**Brand Theme Generation:**
- Corporate brand colors as primary theme source
- Product imagery and marketing material theming
- Consistent brand experience across all touchpoints

**Seasonal & Campaign Themes:**
- Holiday and special event theming
- Seasonal collection themes that change throughout the year
- Marketing campaign themes with dynamic visual identity

**User Personalization:**
- User-selected wallpapers with automatic theme generation
- Profile backgrounds that create harmonious interface themes
- Custom themes that reflect individual user preferences

**Content-Aware Theming:**
- Article header themes based on hero images
- Dashboard themes that complement data visualization
- Dynamic themes that adapt to content context and imagery

These scenarios demonstrate how spectrum-wallpaper enables sophisticated theming strategies that enhance user experience while maintaining design system consistency and accessibility standards.
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLE
// =================================================================

/**
 * Accessibility features and contrast preservation in dynamic theming.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0 0 1.5rem 0;">♿ Accessibility & Contrast Preservation</h3>
      <p style="color: #666; margin: 0 0 2rem 0; line-height: 1.5;">
        Demonstrates how spectrum-wallpaper maintains accessibility standards while generating dynamic themes from any background source.
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- High Contrast Example -->
        <div>
          <h4 style="margin: 0 0 1rem 0; color: #1e40af;">🎨 WCAG Contrast Compliance</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1rem;">
            <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
              <spectrum-wallpaper
                background="url(https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80)"
                .showSwatches=${true}
                .debug=${true}
                style="height: 250px; display: block;"
              >
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                  <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">Dark Background Adaptation</h5>
                  <div style="background: var(--spectrum-color-primary-container, #e3f2fd); color: var(--spectrum-color-on-primary-container, #0d47a1); padding: 1rem; border-radius: 0.25rem; margin: 0.5rem 0;">
                    <strong>High Contrast Text</strong> - Automatically adjusted for readability
                  </div>
                  <div style="background: var(--spectrum-color-secondary-container, #e8f5e8); color: var(--spectrum-color-on-secondary-container, #2e7d32); padding: 1rem; border-radius: 0.25rem; margin: 0.5rem 0;">
                    <strong>Secondary Colors</strong> - WCAG AA compliant contrast ratios
                  </div>
                </div>
              </spectrum-wallpaper>
            </div>
            
            <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
              <spectrum-wallpaper
                background="url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)"
                .showSwatches=${true}
                .debug=${true}
                style="height: 250px; display: block;"
              >
                <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                  <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">Light Background Adaptation</h5>
                  <div style="background: var(--spectrum-color-primary-container, #e3f2fd); color: var(--spectrum-color-on-primary-container, #0d47a1); padding: 1rem; border-radius: 0.25rem; margin: 0.5rem 0;">
                    <strong>Adaptive Text Colors</strong> - Contrast preserved across all backgrounds
                  </div>
                  <div style="background: var(--spectrum-color-error-container, #ffebee); color: var(--spectrum-color-on-error-container, #b71c1c); padding: 1rem; border-radius: 0.25rem; margin: 0.5rem 0;">
                    <strong>Error Text</strong> - Critical information remains accessible
                  </div>
                </div>
              </spectrum-wallpaper>
            </div>
          </div>
        </div>
        
        <!-- Color Blindness Considerations -->
        <div>
          <h4 style="margin: 0 0 1rem 0; color: #1e40af;">👁️ Color Blindness Support</h4>
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              .showSwatches=${true}
              style="height: 250px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">Color Blindness Considerations</h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem;">
                  <div style="background: var(--spectrum-color-primary, #0070d2); color: var(--spectrum-color-on-primary, #fff); padding: 0.75rem; border-radius: 0.25rem; text-align: center; font-weight: bold;">
                    Primary
                  </div>
                  <div style="background: var(--spectrum-color-secondary, #005fb2); color: var(--spectrum-color-on-secondary, #fff); padding: 0.75rem; border-radius: 0.25rem; text-align: center; font-weight: bold;">
                    Secondary
                  </div>
                  <div style="background: var(--spectrum-color-tertiary, #8b5a3c); color: var(--spectrum-color-on-tertiary, #fff); padding: 0.75rem; border-radius: 0.25rem; text-align: center; font-weight: bold;">
                    Tertiary
                  </div>
                  <div style="background: var(--spectrum-color-error, #ba1a1a); color: var(--spectrum-color-on-error, #fff); padding: 0.75rem; border-radius: 0.25rem; text-align: center; font-weight: bold;">
                    Error
                  </div>
                </div>
                <p style="margin: 1rem 0 0 0; font-size: 0.9rem; color: var(--spectrum-color-on-surface, #000);">
                  Material Design 3 color generation ensures sufficient contrast and color differentiation for users with various types of color vision differences.
                </p>
              </div>
            </spectrum-wallpaper>
          </div>
        </div>
        
        <!-- Screen Reader Support -->
        <div>
          <h4 style="margin: 0 0 1rem 0; color: #1e40af;">🔊 Screen Reader & Semantic Support</h4>
          <div style="border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden; background: #fff;">
            <spectrum-wallpaper
              background="#4caf50"
              .showSwatches=${true}
              style="height: 200px; display: block;"
            >
              <div style="background: rgba(255,255,255,0.95); padding: 1.5rem; margin: 1.5rem; border-radius: 0.5rem; backdrop-filter: blur(10px);">
                <h5 style="margin: 0 0 1rem 0; color: var(--spectrum-color-primary, #0070d2);">Semantic Structure Preserved</h5>
                <div style="color: var(--spectrum-color-on-surface, #000); line-height: 1.6;">
                  <p style="margin: 0 0 0.5rem 0;"><strong>Theme changes are purely visual</strong> - all semantic meaning and structure remain intact for assistive technologies.</p>
                  <p style="margin: 0;"><strong>Color information is supplemental</strong> - content never relies solely on color for meaning or navigation.</p>
                </div>
              </div>
            </spectrum-wallpaper>
          </div>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
        <h4 style="margin: 0 0 1rem 0; color: #333;">♿ Accessibility Compliance Checklist</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <ul style="margin: 0; color: #666; line-height: 1.6;">
            <li>✅ <strong>WCAG AA Contrast Ratios:</strong> Automatic contrast calculation and adjustment</li>
            <li>✅ <strong>Color Blindness Support:</strong> Material Design 3 color differentiation</li>
            <li>✅ <strong>High Contrast Modes:</strong> Compatible with system accessibility settings</li>
            <li>✅ <strong>Screen Reader Support:</strong> Semantic structure preservation</li>
          </ul>
          <ul style="margin: 0; color: #666; line-height: 1.6;">
            <li>✅ <strong>Focus Indicators:</strong> Visible focus states maintained across themes</li>
            <li>✅ <strong>Text Alternatives:</strong> Color never used as sole information carrier</li>
            <li>✅ <strong>Motion Sensitivity:</strong> No automatic animations or transitions</li>
            <li>✅ <strong>Responsive Design:</strong> Accessible across all device types</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive accessibility features ensuring dynamic theming works for all users while maintaining WCAG compliance.

**WCAG Contrast Compliance:**
- Automatic contrast calculation for all generated color combinations
- Text color adjustment to meet AA standards across all background types
- Error and critical information color preservation for safety

**Color Blindness Support:**
- Material Design 3 color generation ensures adequate color differentiation
- Multiple visual cues beyond color for interface navigation
- Contrast-based design that works with various color vision differences

**Screen Reader & Semantic Support:**
- Theme changes are purely visual - semantic structure remains intact
- Proper heading hierarchy and landmark navigation preserved
- Color information is supplemental, never essential for understanding

**Assistive Technology Compatibility:**
- Compatible with high contrast system settings
- Focus indicators remain visible across all generated themes
- Keyboard navigation patterns unaffected by theme changes

**Motion and Sensitivity:**
- No automatic animations or theme transitions
- Respectful of user motion sensitivity preferences
- Static color generation without disorienting effects

This component demonstrates that dynamic theming can enhance visual experience while maintaining full accessibility compliance and inclusive design principles.
        `
      }
    }
  }
};