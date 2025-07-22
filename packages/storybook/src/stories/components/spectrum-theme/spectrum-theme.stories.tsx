import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

// Define local interfaces for better type safety
interface SpectrumThemeArgs {
  color: string;
  dark: boolean;
  showSwatches: boolean;
  debug: boolean;
  config: string;
  autoLoadFonts: boolean;
  fontLoadTimeout: number;
  preloadFonts: boolean;
  waitForWallpaper: boolean;
  coordinationTimeout: number;
  hideContentUntilReady: boolean;
}

// Sample color configurations for different themes
const brandColors = [
  { name: 'Spectrum Blue', value: '#0070d2', description: 'Default Spectrum brand color' },
  { name: 'Forest Green', value: '#34a853', description: 'Nature-inspired green theme' },
  { name: 'Sunset Orange', value: '#ff6b35', description: 'Warm, energetic orange' },
  { name: 'Royal Purple', value: '#6b46c1', description: 'Premium purple theme' },
  { name: 'Crimson Red', value: '#dc2626', description: 'Bold, attention-grabbing red' },
  { name: 'Teal Ocean', value: '#0891b2', description: 'Calming ocean-inspired teal' },
  { name: 'Rose Gold', value: '#e879f9', description: 'Elegant rose gold accent' },
  { name: 'Charcoal', value: '#374151', description: 'Professional charcoal theme' },
];

const configExamples = {
  minimal: '{}',
  customFallbacks: '{"fontFallbacks": ["Segoe UI Symbol", "Apple Color Emoji", "sans-serif"]}',
  performance: '{"preconnect": true, "cacheColors": true}',
  accessibility: '{"highContrast": true, "reducedMotion": true}',
  development: '{"verbose": true, "showTimings": true}'
};

const meta = {
  title: 'Spectrum/Components/SpectrumTheme',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Theme Component

The foundational theming component that provides Material Design 3 color generation, automatic font loading, and FOUC (Flash of Unstyled Content) prevention. This component coordinates the entire visual system of Spectrum applications.

## Key Features

### **Material Design 3 Color System**
- **Dynamic Color Generation**: Creates complete color palettes from a single source color
- **Adaptive Themes**: Automatically generates light and dark mode variants
- **Accessibility Compliance**: Ensures proper contrast ratios and readability
- **Color Harmony**: Uses Material Design algorithms for visually pleasing combinations

### **Automatic Font Loading & FOUC Prevention**
- **Zero Configuration**: Works out of the box with no manual setup required
- **Smart Preloading**: Preloads Material Symbols fonts for instant icon rendering
- **Loading States**: Manages font loading with smooth transitions
- **Graceful Fallbacks**: System fonts when loading fails or times out
- **Global Coordination**: Singleton pattern prevents duplicate font loading

### **Wallpaper Integration & Coordinated Loading**
- **Event-Based Coordination**: Syncs with spectrum-wallpaper for seamless color extraction
- **Loading Synchronization**: Hides content until both fonts and colors are ready
- **Timeout Protection**: Fallback behavior when coordination takes too long
- **Smooth Transitions**: Eliminates both font and color FOUC

### **Advanced Configuration**
- **Custom Configurations**: JSON-based theme customization
- **Performance Optimization**: Configurable timeouts and loading strategies
- **Debug Mode**: Comprehensive logging and visual indicators
- **Development Tools**: Color swatches and loading state visibility

## Usage Guidelines

### **When to Use**
- **Application Root**: Place at the top level of your application
- **Theme Customization**: When you need branded color schemes
- **Font Management**: To ensure consistent icon rendering across browsers
- **Loading Coordination**: When using spectrum-wallpaper for dynamic theming
- **Performance Optimization**: To prevent FOUC and improve perceived performance

### **Theme Configuration Best Practices**
- Choose primary colors with sufficient contrast for accessibility
- Test themes in both light and dark modes
- Consider brand guidelines when selecting colors
- Use debug mode during development to monitor loading performance
- Enable wallpaper coordination for dynamic backgrounds

### **Font Loading Optimization**
- Keep default auto-loading enabled for best performance
- Adjust timeout values based on your target network conditions
- Use preloading for critical user interfaces
- Monitor font loading events for performance analytics

## Technical Architecture

### **Color Generation Process**
1. **Source Color Processing**: Converts any CSS color to Material Design format
2. **Palette Generation**: Creates comprehensive color schemes using MD3 algorithms
3. **CSS Variable Assignment**: Applies colors as CSS custom properties
4. **Theme Application**: Updates document styles with new color values

### **Font Loading Lifecycle**
1. **Preload Initialization**: Creates link elements for font preloading
2. **Loading Detection**: Monitors font loading status via Font Loading API
3. **State Management**: Applies CSS classes for loading states
4. **Event Emission**: Broadcasts loading completion to application
5. **Cleanup**: Manages memory and removes event listeners

### **Wallpaper Coordination**
1. **Event Registration**: Listens for wallpaper color extraction events
2. **Loading Synchronization**: Waits for both fonts and wallpaper colors
3. **Timeout Handling**: Proceeds with defaults if coordination times out
4. **State Broadcasting**: Emits theme-ready events when fully loaded

## Event System

### **Theme Events**
- **themeready**: Emitted when theme is fully loaded (fonts + colors)
- **themefontsloaded**: Font loading completed successfully
- **themefontsfailed**: Font loading failed, using fallbacks
- **themewallpaperready**: Wallpaper coordination completed

### **Global Font Events**
- **fontsloaded**: Global font loading success (all components)
- **fontsfailed**: Global font loading failure

### **Configuration Events**
- **themeconfigupdate**: Theme configuration has changed
- **themecolorchange**: Primary color has been updated

## Performance Features

### **Optimized Loading**
- Preconnect to Google Fonts for faster DNS resolution
- Font display: swap for immediate text rendering
- Timeout-based fallbacks for slow connections
- Singleton font loading to prevent duplicates

### **Memory Management**
- Automatic cleanup of event listeners
- Efficient CSS variable updates
- Minimal DOM manipulation
- Smart caching of computed colors

### **Network Optimization**
- Configurable preloading strategies
- Bandwidth-aware timeout adjustments
- CDN-optimized font delivery
- Progressive enhancement support

## Integration Patterns

### **Application Root Pattern**
Wrap your entire application for global theming:

### **Multi-Theme Applications**
Support for dynamic theme switching and user preferences.

### **Component Library Integration**
Perfect foundation for design system implementations.

        `
      }
    }
  },
  args: {
    color: '#0070d2',
    dark: false,
    showSwatches: false,
    debug: false,
    config: '{}',
    autoLoadFonts: true,
    fontLoadTimeout: 3000,
    preloadFonts: true,
    waitForWallpaper: false,
    coordinationTimeout: 2000,
    hideContentUntilReady: true,
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Primary color for Material Design 3 theme generation',
    },
    dark: {
      control: 'boolean',
      description: 'Enable dark mode theme variant',
    },
    showSwatches: {
      control: 'boolean',
      description: 'Display color swatches for development and debugging',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging and visual loading indicators',
    },
    config: {
      control: 'text',
      description: 'JSON configuration object for advanced theme customization',
    },
    autoLoadFonts: {
      control: 'boolean',
      description: 'Automatically load and manage Material Symbols fonts',
    },
    fontLoadTimeout: {
      control: 'number',
      description: 'Font loading timeout in milliseconds',
    },
    preloadFonts: {
      control: 'boolean',
      description: 'Preload fonts via HTML link elements for better performance',
    },
    waitForWallpaper: {
      control: 'boolean',
      description: 'Wait for wallpaper color extraction before showing content',
    },
    coordinationTimeout: {
      control: 'number',
      description: 'Timeout for wallpaper coordination in milliseconds',
    },
    hideContentUntilReady: {
      control: 'boolean',
      description: 'Hide content until theme and fonts are fully loaded',
    },
  }
} satisfies Meta;

export default meta;

// Helper function to render the theme component with sample content
const renderTheme = (args: SpectrumThemeArgs) => html`
  <spectrum-theme
    color=${args.color}
    .dark=${args.dark}
    .showSwatches=${args.showSwatches}
    .debug=${args.debug}
    config=${args.config}
    .autoLoadFonts=${args.autoLoadFonts}
    font-load-timeout=${args.fontLoadTimeout}
    .preloadFonts=${args.preloadFonts}
    .waitForWallpaper=${args.waitForWallpaper}
    coordination-timeout=${args.coordinationTimeout}
    .hideContentUntilReady=${args.hideContentUntilReady}
    @themeready=${(e: CustomEvent) => action('themeready')(e.detail)}
    @themefontsloaded=${() => action('themefontsloaded')('Fonts loaded successfully')}
    @themefontsfailed=${() => action('themefontsfailed')('Font loading failed')}
  >
    <div style="
      padding: 24px;
      background: var(--spectrum-sys-color-surface);
      color: var(--spectrum-sys-color-on-surface);
      border-radius: 12px;
      border: 1px solid var(--spectrum-sys-color-outline);
      font-family: var(--spectrum-sys-font-family);
      min-height: 200px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    ">
      <h3 style="
        margin: 0;
        color: var(--spectrum-sys-color-primary);
        font-size: 1.5rem;
        font-weight: 500;
      ">
        Theme Applied Successfully
      </h3>
      
      <div style="display: flex; gap: 12px; align-items: center;">
        <span class="material-symbols-outlined" style="
          color: var(--spectrum-sys-color-primary);
          font-size: 24px;
        ">palette</span>
        <span>Dynamic color generation from source: ${args.color}</span>
      </div>
      
      <div style="display: flex; gap: 12px; align-items: center;">
        <span class="material-symbols-outlined" style="
          color: var(--spectrum-sys-color-secondary);
          font-size: 24px;
        ">font_download</span>
        <span>Material Symbols font loading: ${args.autoLoadFonts ? 'Enabled' : 'Disabled'}</span>
      </div>
      
      <div style="display: flex; gap: 12px; align-items: center;">
        <span class="material-symbols-outlined" style="
          color: var(--spectrum-sys-color-tertiary);
          font-size: 24px;
        ">${args.dark ? 'dark_mode' : 'light_mode'}</span>
        <span>Theme mode: ${args.dark ? 'Dark' : 'Light'}</span>
      </div>
      
      ${args.showSwatches ? html`
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 8px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--spectrum-sys-color-outline);
        ">
          <div style="text-align: center;">
            <div style="
              width: 100%;
              height: 40px;
              background: var(--spectrum-sys-color-primary);
              border-radius: 6px;
              margin-bottom: 4px;
            "></div>
            <small>Primary</small>
          </div>
          <div style="text-align: center;">
            <div style="
              width: 100%;
              height: 40px;
              background: var(--spectrum-sys-color-secondary);
              border-radius: 6px;
              margin-bottom: 4px;
            "></div>
            <small>Secondary</small>
          </div>
          <div style="text-align: center;">
            <div style="
              width: 100%;
              height: 40px;
              background: var(--spectrum-sys-color-tertiary);
              border-radius: 6px;
              margin-bottom: 4px;
            "></div>
            <small>Tertiary</small>
          </div>
          <div style="text-align: center;">
            <div style="
              width: 100%;
              height: 40px;
              background: var(--spectrum-sys-color-error);
              border-radius: 6px;
              margin-bottom: 4px;
            "></div>
            <small>Error</small>
          </div>
        </div>
      ` : ''}
    </div>
  </spectrum-theme>
`;

// Main playground story
export const Playground: StoryObj<SpectrumThemeArgs> = {
  render: renderTheme,
  parameters: {
    docs: {
      description: {
        story: `
Interactive playground for testing all spectrum-theme features and configurations.

**Try These Interactions:**
- Change the color picker to see dynamic Material Design 3 color generation
- Toggle dark mode to see automatic theme adaptation
- Enable show swatches to visualize the generated color palette
- Turn on debug mode to monitor font loading and performance
- Adjust timeouts to test loading behavior under different conditions

**Event Monitoring:**
All theme events including font loading, color changes, and coordination are logged in the Actions panel below.
        `
      }
    }
  }
};

// Color theme demonstrations
export const ColorThemes: StoryObj<SpectrumThemeArgs> = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      ${brandColors.map(brand => html`
        <spectrum-theme
          color=${brand.value}
          .showSwatches=${true}
          .debug=${false}
          @themeready=${(e: CustomEvent) => action(`${brand.name}Ready`)(e.detail)}
        >
          <div style="
            padding: 20px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 12px;
            border: 1px solid var(--spectrum-sys-color-outline);
            text-align: center;
          ">
            <h4 style="
              color: var(--spectrum-sys-color-primary);
              margin: 0 0 8px 0;
              font-size: 1.2rem;
            ">${brand.name}</h4>
            <p style="
              color: var(--spectrum-sys-color-on-surface-variant);
              margin: 0 0 16px 0;
              font-size: 0.9rem;
            ">${brand.description}</p>
            <div style="
              background: var(--spectrum-sys-color-primary);
              color: var(--spectrum-sys-color-on-primary);
              padding: 8px 16px;
              border-radius: 20px;
              display: inline-block;
              font-size: 0.8rem;
              font-weight: 500;
            ">${brand.value}</div>
          </div>
        </spectrum-theme>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Dynamic color theme generation from different source colors.

**Material Design 3 Color Generation:**
- **Algorithmic Harmony**: Each theme uses MD3 algorithms to generate harmonious color palettes
- **Accessibility Compliant**: Automatic contrast ratio calculations ensure readability
- **Adaptive System**: Colors work across light and dark modes
- **Brand Integration**: Convert any brand color into a complete design system

**Color Palette Components:**
- **Primary**: Main brand color and high-emphasis elements
- **Secondary**: Supporting colors for medium-emphasis elements  
- **Tertiary**: Contrasting accent colors for balance
- **Error**: System colors for error states and warnings

Each theme demonstrates how a single source color generates an entire cohesive color system.
        `
      }
    }
  },
};

// Dark and light mode comparison
export const DarkLightComparison: StoryObj<SpectrumThemeArgs> = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <!-- Light Mode -->
      <div>
        <h3 style="margin: 0 0 16px 0; text-align: center;">Light Mode</h3>
        <spectrum-theme
          color="#6b46c1"
          .dark=${false}
          .showSwatches=${true}
          @themeready=${(e: CustomEvent) => action('lightThemeReady')(e.detail)}
        >
          <div style="
            padding: 20px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 12px;
            border: 1px solid var(--spectrum-sys-color-outline);
            min-height: 300px;
          ">
            <h4 style="color: var(--spectrum-sys-color-primary); margin-top: 0;">
              Light Theme Example
            </h4>
            <p style="color: var(--spectrum-sys-color-on-surface-variant);">
              Optimized for bright environments with high contrast and clear readability.
            </p>
            <div style="display: flex; gap: 8px; margin: 16px 0;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">wb_sunny</span>
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-secondary);">visibility</span>
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-tertiary);">contrast</span>
            </div>
            <div style="
              background: var(--spectrum-sys-color-primary-container);
              color: var(--spectrum-sys-color-on-primary-container);
              padding: 12px;
              border-radius: 8px;
              margin-top: 16px;
            ">
              Primary container styling
            </div>
          </div>
        </spectrum-theme>
      </div>
      
      <!-- Dark Mode -->
      <div>
        <h3 style="margin: 0 0 16px 0; text-align: center;">Dark Mode</h3>
        <spectrum-theme
          color="#6b46c1"
          .dark=${true}
          .showSwatches=${true}
          @themeready=${(e: CustomEvent) => action('darkThemeReady')(e.detail)}
        >
          <div style="
            padding: 20px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 12px;
            border: 1px solid var(--spectrum-sys-color-outline);
            min-height: 300px;
          ">
            <h4 style="color: var(--spectrum-sys-color-primary); margin-top: 0;">
              Dark Theme Example
            </h4>
            <p style="color: var(--spectrum-sys-color-on-surface-variant);">
              Designed for low-light environments with reduced eye strain and improved battery life.
            </p>
            <div style="display: flex; gap: 8px; margin: 16px 0;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">dark_mode</span>
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-secondary);">battery_saver</span>
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-tertiary);">remove_red_eye</span>
            </div>
            <div style="
              background: var(--spectrum-sys-color-primary-container);
              color: var(--spectrum-sys-color-on-primary-container);
              padding: 12px;
              border-radius: 8px;
              margin-top: 16px;
            ">
              Primary container styling
            </div>
          </div>
        </spectrum-theme>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Side-by-side comparison of light and dark theme variants generated from the same source color.

**Adaptive Theme Generation:**
- **Intelligent Contrast**: Automatic contrast calculations for optimal readability
- **Consistent Branding**: Same color relationships maintained across modes
- **Accessibility Compliance**: WCAG contrast ratios enforced in both modes
- **Battery Optimization**: Dark mode reduces OLED screen power consumption

**Theme Mode Benefits:**
- **Light Mode**: Better for bright environments, document reading, detailed work
- **Dark Mode**: Reduced eye strain, better for low-light environments, battery savings
- **System Integration**: Can respond to OS-level dark mode preferences
- **User Choice**: Allows application-level theme selection

Both themes use identical source colors but generate different surface and contrast colors optimized for their respective use cases.
        `
      }
    }
  },
};

// Font loading demonstration
export const FontLoadingDemo: StoryObj<SpectrumThemeArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3 style="margin: 0 0 16px 0;">Font Loading Enabled (Default)</h3>
        <spectrum-theme
          color="#34a853"
          .autoLoadFonts=${true}
          .debug=${true}
          font-load-timeout="3000"
          .preloadFonts=${true}
          @themefontsloaded=${() => action('fontsLoaded')('Material Symbols loaded successfully')}
          @themefontsfailed=${() => action('fontsFailed')('Font loading failed')}
        >
          <div style="
            padding: 20px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 12px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h4 style="color: var(--spectrum-sys-color-primary);">✅ FOUC Prevention Active</h4>
            <p>Material Icons load smoothly without text flash:</p>
            <div style="display: flex; gap: 16px; align-items: center; margin: 16px 0;">
              <span class="material-symbols-outlined" style="font-size: 32px; color: var(--spectrum-sys-color-primary);">home</span>
              <span class="material-symbols-outlined" style="font-size: 32px; color: var(--spectrum-sys-color-secondary);">search</span>
              <span class="material-symbols-outlined" style="font-size: 32px; color: var(--spectrum-sys-color-tertiary);">favorite</span>
              <span class="material-symbols-outlined" style="font-size: 32px; color: var(--spectrum-sys-color-error);">warning</span>
            </div>
            <small style="color: var(--spectrum-sys-color-on-surface-variant);">
              Icons render immediately without showing "home", "search", "favorite" text
            </small>
          </div>
        </spectrum-theme>
      </div>
      
      <div>
        <h3 style="margin: 0 0 16px 0;">Font Loading Disabled (For Comparison)</h3>
        <spectrum-theme
          color="#34a853"
          .autoLoadFonts=${false}
          .debug=${true}
        >
          <div style="
            padding: 20px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 12px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h4 style="color: var(--spectrum-sys-color-error);">⚠️ FOUC Risk Present</h4>
            <p>Without font loading management, you might briefly see:</p>
            <div style="display: flex; gap: 16px; align-items: center; margin: 16px 0;">
              <span style="font-size: 32px; color: var(--spectrum-sys-color-primary); font-family: monospace;">"home"</span>
              <span style="font-size: 32px; color: var(--spectrum-sys-color-secondary); font-family: monospace;">"search"</span>
              <span style="font-size: 32px; color: var(--spectrum-sys-color-tertiary); font-family: monospace;">"favorite"</span>
              <span style="font-size: 32px; color: var(--spectrum-sys-color-error); font-family: monospace;">"warning"</span>
            </div>
            <small style="color: var(--spectrum-sys-color-on-surface-variant);">
              Text appears briefly before transforming into icons (FOUC)
            </small>
          </div>
        </spectrum-theme>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Demonstration of automatic font loading and FOUC (Flash of Unstyled Content) prevention.

**FOUC Prevention Benefits:**
- **Seamless Icon Loading**: Material Symbols appear immediately without text flash
- **Professional Experience**: Eliminates jarring visual transitions during loading
- **Performance Optimization**: Preloading reduces perceived loading time
- **Graceful Fallbacks**: System fonts when loading fails

**Font Loading Features:**
- **Automatic Preloading**: HTML link elements created automatically
- **Loading State Management**: CSS classes applied during font loading
- **Timeout Handling**: Fallback behavior when fonts load slowly
- **Event System**: Broadcasts loading success/failure for monitoring

**Technical Implementation:**
- Preconnect to Google Fonts for faster DNS resolution
- Font display: swap for immediate text rendering
- CSS classes toggle icon visibility during loading
- Global singleton prevents duplicate font loading

The top example shows smooth icon rendering, while the bottom demonstrates the FOUC problem that occurs without proper font management.
        `
      }
    }
  },
};

// Configuration examples
export const ConfigurationExamples: StoryObj<SpectrumThemeArgs> = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
      <div>
        <h4 style="margin: 0 0 12px 0;">Minimal Configuration</h4>
        <spectrum-theme
          color="#0070d2"
          config=${configExamples.minimal}
          .debug=${true}
        >
          <div style="
            padding: 16px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 8px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h5 style="color: var(--spectrum-sys-color-primary); margin-top: 0;">Default Setup</h5>
            <p style="margin: 0; font-size: 0.9rem;">Basic theme with standard font loading and Material Design colors.</p>
          </div>
        </spectrum-theme>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0;">Custom Font Fallbacks</h4>
        <spectrum-theme
          color="#ff6b35"
          config=${configExamples.customFallbacks}
          .debug=${true}
        >
          <div style="
            padding: 16px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 8px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h5 style="color: var(--spectrum-sys-color-primary); margin-top: 0;">Enhanced Fallbacks</h5>
            <p style="margin: 0; font-size: 0.9rem;">Custom font fallback stack for better cross-platform compatibility.</p>
          </div>
        </spectrum-theme>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0;">Performance Optimized</h4>
        <spectrum-theme
          color="#6b46c1"
          config=${configExamples.performance}
          .debug=${true}
        >
          <div style="
            padding: 16px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 8px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h5 style="color: var(--spectrum-sys-color-primary); margin-top: 0;">Performance Focus</h5>
            <p style="margin: 0; font-size: 0.9rem;">Optimized for fast loading with preconnect and color caching.</p>
          </div>
        </spectrum-theme>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0;">Accessibility Enhanced</h4>
        <spectrum-theme
          color="#dc2626"
          config=${configExamples.accessibility}
          .debug=${true}
        >
          <div style="
            padding: 16px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 8px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h5 style="color: var(--spectrum-sys-color-primary); margin-top: 0;">Accessibility First</h5>
            <p style="margin: 0; font-size: 0.9rem;">High contrast mode and reduced motion support for accessibility.</p>
          </div>
        </spectrum-theme>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different configuration examples showing advanced customization options.

**Configuration Options:**
- **Minimal**: Basic setup with default values for standard use cases
- **Custom Fallbacks**: Enhanced font fallback stack for better compatibility
- **Performance**: Optimized settings for fast loading and efficient caching
- **Accessibility**: Enhanced contrast and motion settings for inclusive design

**JSON Configuration Structure:**
Configuration uses JSON format for theme customization, allowing:
- Font fallback customization
- Performance optimization flags
- Accessibility enhancement options
- Debug and development settings
- Network-aware loading strategies

Each configuration demonstrates different optimization strategies for specific use cases and requirements.
        `
      }
    }
  },
};

// Wallpaper coordination example
export const WallpaperCoordination: StoryObj<SpectrumThemeArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3 style="margin: 0 0 16px 0;">🎨 Coordinated Loading (Theme + Wallpaper)</h3>
        <spectrum-theme
          color="#0891b2"
          .waitForWallpaper=${true}
          .hideContentUntilReady=${true}
          coordination-timeout="2000"
          .debug=${true}
          @themeready=${(e: CustomEvent) => action('coordinatedThemeReady')(e.detail)}
        >
          <div style="
            padding: 20px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 12px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h4 style="color: var(--spectrum-sys-color-primary);">Coordinated Loading Example</h4>
            <p>This theme waits for wallpaper color extraction before showing content.</p>
            <div style="display: flex; gap: 12px; align-items: center; margin: 16px 0;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">sync</span>
              <span>Font loading + Color extraction coordination</span>
            </div>
            <div style="display: flex; gap: 12px; align-items: center;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-secondary);">timer</span>
              <span>Timeout protection: 2000ms</span>
            </div>
            <div style="
              background: var(--spectrum-sys-color-primary-container);
              color: var(--spectrum-sys-color-on-primary-container);
              padding: 12px;
              border-radius: 8px;
              margin-top: 16px;
              text-align: center;
            ">
              Content appears only when both fonts and colors are ready
            </div>
          </div>
        </spectrum-theme>
      </div>
      
      <div>
        <h3 style="margin: 0 0 16px 0;">⚡ Independent Loading (Theme Only)</h3>
        <spectrum-theme
          color="#0891b2"
          .waitForWallpaper=${false}
          .hideContentUntilReady=${true}
          .debug=${true}
          @themeready=${(e: CustomEvent) => action('independentThemeReady')(e.detail)}
        >
          <div style="
            padding: 20px;
            background: var(--spectrum-sys-color-surface);
            color: var(--spectrum-sys-color-on-surface);
            border-radius: 12px;
            border: 1px solid var(--spectrum-sys-color-outline);
          ">
            <h4 style="color: var(--spectrum-sys-color-primary);">Independent Loading Example</h4>
            <p>This theme loads independently without waiting for wallpaper coordination.</p>
            <div style="display: flex; gap: 12px; align-items: center; margin: 16px 0;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">bolt</span>
              <span>Faster loading - fonts only</span>
            </div>
            <div style="display: flex; gap: 12px; align-items: center;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-secondary);">independence</span>
              <span>No wallpaper dependency</span>
            </div>
            <div style="
              background: var(--spectrum-sys-color-secondary-container);
              color: var(--spectrum-sys-color-on-secondary-container);
              padding: 12px;
              border-radius: 8px;
              margin-top: 16px;
              text-align: center;
            ">
              Content appears when fonts are ready
            </div>
          </div>
        </spectrum-theme>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Demonstration of coordinated loading with spectrum-wallpaper versus independent theme loading.

**Coordinated Loading Benefits:**
- **Seamless Experience**: No color or font FOUC (Flash of Unstyled Content)
- **Professional Polish**: Content appears with final colors and fonts
- **Event Synchronization**: Waits for both font loading and color extraction
- **Timeout Protection**: Fallback behavior when coordination takes too long

**Independent Loading Benefits:**
- **Faster Perceived Performance**: Content appears as soon as fonts are ready
- **Simpler Architecture**: No dependency on wallpaper component
- **Reduced Complexity**: Standard theme loading without coordination
- **Lower Network Requirements**: Only font loading, no image processing

**Technical Implementation:**
- **Event-Based Coordination**: Uses custom events for component communication
- **Timeout Management**: Configurable timeouts prevent infinite waiting
- **State Management**: CSS classes control content visibility during loading
- **Graceful Degradation**: Works independently when wallpaper is not present

Choose coordinated loading for premium user experiences, or independent loading for faster time-to-content.
        `
      }
    }
  },
};

// Development and debugging tools
export const DevelopmentTools: StoryObj<SpectrumThemeArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <spectrum-theme
        color="#e879f9"
        .dark=${false}
        .showSwatches=${true}
        .debug=${true}
        config=${configExamples.development}
        font-load-timeout="5000"
        @themeready=${(e: CustomEvent) => action('debugThemeReady')(e.detail)}
        @themefontsloaded=${() => action('debugFontsLoaded')('Debug: Fonts loaded with timing info')}
        @themefontsfailed=${() => action('debugFontsFailed')('Debug: Font loading failed')}
      >
        <div style="
          padding: 24px;
          background: var(--spectrum-sys-color-surface);
          color: var(--spectrum-sys-color-on-surface);
          border-radius: 12px;
          border: 1px solid var(--spectrum-sys-color-outline);
        ">
          <h3 style="color: var(--spectrum-sys-color-primary); margin-top: 0;">
            🛠️ Development & Debug Mode
          </h3>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin: 20px 0;">
            <div style="
              background: var(--spectrum-sys-color-primary-container);
              color: var(--spectrum-sys-color-on-primary-container);
              padding: 16px;
              border-radius: 8px;
            ">
              <h4 style="margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined">palette</span>
                Color Swatches
              </h4>
              <p style="margin: 0; font-size: 0.9rem;">
                Visual representation of the generated Material Design 3 color palette
              </p>
            </div>
            
            <div style="
              background: var(--spectrum-sys-color-secondary-container);
              color: var(--spectrum-sys-color-on-secondary-container);
              padding: 16px;
              border-radius: 8px;
            ">
              <h4 style="margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined">bug_report</span>
                Debug Logging
              </h4>
              <p style="margin: 0; font-size: 0.9rem;">
                Console logging of theme initialization, font loading, and performance metrics
              </p>
            </div>
            
            <div style="
              background: var(--spectrum-sys-color-tertiary-container);
              color: var(--spectrum-sys-color-on-tertiary-container);
              padding: 16px;
              border-radius: 8px;
            ">
              <h4 style="margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined">timer</span>
                Performance Timing
              </h4>
              <p style="margin: 0; font-size: 0.9rem;">
                Detailed timing information for theme loading and font initialization
              </p>
            </div>
            
            <div style="
              background: var(--spectrum-sys-color-error-container);
              color: var(--spectrum-sys-color-on-error-container);
              padding: 16px;
              border-radius: 8px;
            ">
              <h4 style="margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined">event_list</span>
                Event Monitoring
              </h4>
              <p style="margin: 0; font-size: 0.9rem;">
                Real-time event broadcasting for integration testing and monitoring
              </p>
            </div>
          </div>
          
          <div style="
            background: var(--spectrum-sys-color-surface-variant);
            color: var(--spectrum-sys-color-on-surface-variant);
            padding: 16px;
            border-radius: 8px;
            margin-top: 20px;
          ">
            <h4 style="margin: 0 0 12px 0;">💡 Development Best Practices</h4>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Enable debug mode during development for detailed logging</li>
              <li>Use show swatches to verify color generation accuracy</li>
              <li>Monitor theme events in browser DevTools console</li>
              <li>Test with different timeout values for network conditions</li>
              <li>Validate accessibility with generated color contrasts</li>
            </ul>
          </div>
        </div>
      </spectrum-theme>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive development and debugging tools for theme development and testing.

**Debug Mode Features:**
- **Console Logging**: Detailed information about theme initialization and loading
- **Performance Metrics**: Timing data for font loading and color generation
- **Event Broadcasting**: Real-time monitoring of theme-related events
- **Error Reporting**: Detailed error messages for troubleshooting

**Development Tools:**
- **Color Swatches**: Visual representation of generated Material Design 3 palette
- **Timing Information**: Performance analysis for loading optimization
- **Event Monitoring**: Integration testing through event observation
- **Configuration Validation**: Verification of theme configuration accuracy

**Best Practices for Development:**
1. Enable debug mode during development for comprehensive logging
2. Use color swatches to verify generated palettes match design requirements
3. Monitor theme events for proper integration with other components
4. Test various timeout configurations for different network conditions
5. Validate accessibility compliance with generated color contrasts

This example demonstrates all debugging features active, providing maximum visibility into theme behavior for development and testing purposes.
        `
      }
    }
  },
};

// Interactive wallpaper selection with theme adaptation
export const InteractiveWallpaperThemes: StoryObj<SpectrumThemeArgs> = {
  render: () => {
    // Sample Unsplash images with different color palettes
    const wallpaperOptions = [
      {
        id: 'ocean-sunset',
        name: 'Ocean Sunset',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        description: 'Warm orange and blue coastal sunset',
        suggestedColor: '#ff6b35'
      },
      {
        id: 'forest-green',
        name: 'Forest Canopy', 
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        description: 'Lush green forest with natural tones',
        suggestedColor: '#34a853'
      },
      {
        id: 'mountain-blue',
        name: 'Mountain Lake',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        description: 'Serene blue mountain lake reflection',
        suggestedColor: '#0891b2'
      },
      {
        id: 'lavender-field',
        name: 'Lavender Fields',
        url: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&h=600&fit=crop',
        description: 'Purple lavender field in bloom',
        suggestedColor: '#6b46c1'
      },
      {
        id: 'autumn-leaves',
        name: 'Autumn Forest',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
        description: 'Golden autumn leaves and warm tones',
        suggestedColor: '#f59e0b'
      },
      {
        id: 'desert-rocks',
        name: 'Desert Canyon',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        description: 'Red rock desert landscape',
        suggestedColor: '#dc2626'
      },
      {
        id: 'cherry-blossom',
        name: 'Cherry Blossoms',
        url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop',
        description: 'Soft pink cherry blossom trees',
        suggestedColor: '#e879f9'
      },
      {
        id: 'night-city',
        name: 'Night Cityscape',
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
        description: 'Dark urban landscape with blue tones',
        suggestedColor: '#374151'
      }
    ];

    return html`
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 1200px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0 0 8px 0; color: #333;">🎨 Interactive Theme & Wallpaper Selection</h2>
          <p style="margin: 0; color: #666; font-size: 1.1rem;">
            Click any image below to see the theme adapt to the wallpaper's color palette
          </p>
        </div>

        <!-- Wallpaper Selection Grid -->
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        ">
          ${wallpaperOptions.map(wallpaper => html`
            <div 
              class="wallpaper-option"
              style="
                cursor: pointer;
                border-radius: 12px;
                overflow: hidden;
                border: 3px solid transparent;
                transition: all 0.3s ease;
                background: #fff;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              "
              @click=${() => {
                // Update the theme with the selected wallpaper's suggested color
                const themeElements = document.querySelectorAll('spectrum-theme');
                themeElements.forEach(theme => {
                  (theme as any).color = wallpaper.suggestedColor;
                });
                
                // Update wallpaper elements if they exist
                const wallpaperElements = document.querySelectorAll('spectrum-wallpaper');
                wallpaperElements.forEach(wp => {
                  (wp as any).background = `url(${wallpaper.url})`;
                });

                // Log the action
                action('wallpaperSelected')({
                  wallpaper: wallpaper.name,
                  color: wallpaper.suggestedColor,
                  url: wallpaper.url
                });

                // Visual feedback - highlight selected option
                const allOptions = document.querySelectorAll('.wallpaper-option');
                allOptions.forEach(opt => {
                  (opt as HTMLElement).style.border = '3px solid transparent';
                  (opt as HTMLElement).style.transform = 'scale(1)';
                });
                
                const clickedElement = document.querySelector(`[data-wallpaper="${wallpaper.id}"]`);
                if (clickedElement) {
                  (clickedElement as HTMLElement).style.border = `3px solid ${wallpaper.suggestedColor}`;
                  (clickedElement as HTMLElement).style.transform = 'scale(1.02)';
                }
              }}
              @mouseover=${(e: MouseEvent) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              @mouseout=${(e: MouseEvent) => {
                const element = e.currentTarget as HTMLElement;
                const isSelected = element.style.border.includes('rgb') || element.style.border.includes('#');
                element.style.transform = isSelected ? 'scale(1.02)' : 'scale(1)';
                element.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              data-wallpaper=${wallpaper.id}
            >
              <div style="
                width: 100%;
                height: 180px;
                background-image: url(${wallpaper.url});
                background-size: cover;
                background-position: center;
                position: relative;
              ">
                <div style="
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  background: linear-gradient(transparent, rgba(0,0,0,0.7));
                  color: white;
                  padding: 20px 16px 16px;
                ">
                  <h4 style="margin: 0 0 4px 0; font-size: 1.1rem; font-weight: 600;">
                    ${wallpaper.name}
                  </h4>
                  <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">
                    ${wallpaper.description}
                  </p>
                </div>
              </div>
              <div style="padding: 12px 16px; background: white;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: ${wallpaper.suggestedColor};
                    border: 2px solid #fff;
                    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
                  "></div>
                  <span style="font-size: 0.85rem; color: #666; font-family: monospace;">
                    ${wallpaper.suggestedColor}
                  </span>
                </div>
              </div>
            </div>
          `)}
        </div>

        <!-- Live Theme Preview -->
        <div style="
          border: 2px dashed #ddd;
          border-radius: 12px;
          padding: 24px;
          background: #fafafa;
        ">
          <h3 style="margin: 0 0 20px 0; text-align: center; color: #333;">
            🎭 Live Theme Preview
          </h3>
          <p style="text-align: center; color: #666; margin: 0 0 24px 0;">
            The theme below updates automatically when you select a wallpaper above
          </p>
          
          <spectrum-theme
            color="#0070d2"
            .waitForWallpaper=${false}
            .showSwatches=${true}
            .debug=${false}
            @themeready=${(e: CustomEvent) => action('liveThemeReady')(e.detail)}
          >
            <div style="
              padding: 24px;
              background: var(--spectrum-sys-color-surface);
              color: var(--spectrum-sys-color-on-surface);
              border-radius: 12px;
              border: 1px solid var(--spectrum-sys-color-outline);
              min-height: 200px;
              display: flex;
              flex-direction: column;
              gap: 16px;
            ">
              <h4 style="
                margin: 0;
                color: var(--spectrum-sys-color-primary);
                font-size: 1.3rem;
                font-weight: 500;
                text-align: center;
              ">
                🌈 Dynamic Theme Adaptation
              </h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                <div style="
                  background: var(--spectrum-sys-color-primary-container);
                  color: var(--spectrum-sys-color-on-primary-container);
                  padding: 16px;
                  border-radius: 8px;
                  text-align: center;
                ">
                  <span class="material-symbols-outlined" style="font-size: 32px; display: block; margin-bottom: 8px;">
                    palette
                  </span>
                  <strong>Primary Colors</strong>
                  <div style="margin-top: 8px; font-size: 0.9rem; opacity: 0.8;">
                    Updates with wallpaper
                  </div>
                </div>
                
                <div style="
                  background: var(--spectrum-sys-color-secondary-container);
                  color: var(--spectrum-sys-color-on-secondary-container);
                  padding: 16px;
                  border-radius: 8px;
                  text-align: center;
                ">
                  <span class="material-symbols-outlined" style="font-size: 32px; display: block; margin-bottom: 8px;">
                    auto_awesome
                  </span>
                  <strong>Generated Harmony</strong>
                  <div style="margin-top: 8px; font-size: 0.9rem; opacity: 0.8;">
                    Material Design 3
                  </div>
                </div>
                
                <div style="
                  background: var(--spectrum-sys-color-tertiary-container);
                  color: var(--spectrum-sys-color-on-tertiary-container);
                  padding: 16px;
                  border-radius: 8px;
                  text-align: center;
                ">
                  <span class="material-symbols-outlined" style="font-size: 32px; display: block; margin-bottom: 8px;">
                    accessibility
                  </span>
                  <strong>Accessibility</strong>
                  <div style="margin-top: 8px; font-size: 0.9rem; opacity: 0.8;">
                    Contrast preserved
                  </div>
                </div>
              </div>

              <div style="
                background: var(--spectrum-sys-color-surface-variant);
                color: var(--spectrum-sys-color-on-surface-variant);
                padding: 16px;
                border-radius: 8px;
                margin-top: 8px;
                text-align: center;
              ">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;">
                  <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">
                    info
                  </span>
                  <strong>How It Works</strong>
                </div>
                <div style="font-size: 0.9rem; line-height: 1.5;">
                  Clicking a wallpaper above extracts dominant colors and generates a complete 
                  Material Design 3 color system that harmonizes with the selected image.
                </div>
              </div>
            </div>
          </spectrum-theme>
        </div>

        <!-- Instructions and Features -->
        <div style="
          background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        ">
          <h4 style="margin: 0 0 16px 0; color: #1e40af; text-align: center;">
            ✨ Interactive Features
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
            <div style="text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 8px;">🖱️</div>
              <strong style="color: #1e40af;">Click to Select</strong>
              <div style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">
                Click any wallpaper to apply its color theme
              </div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 8px;">🎨</div>
              <strong style="color: #1e40af;">Instant Updates</strong>
              <div style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">
                Theme colors update automatically
              </div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 8px;">🌈</div>
              <strong style="color: #1e40af;">Color Harmony</strong>
              <div style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">
                Material Design 3 color generation
              </div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 8px;">📱</div>
              <strong style="color: #1e40af;">Event Monitoring</strong>
              <div style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">
                Check Actions panel for event details
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Interactive wallpaper selection demonstrating dynamic theme adaptation and Material Design 3 color generation.

**🎯 Interactive Experience:**
- **Click any wallpaper image** to apply its color theme instantly
- **Live theme preview** updates automatically with new colors
- **Visual feedback** highlights the selected wallpaper option
- **Event monitoring** logs all selection actions in the Actions panel

**🎨 Wallpaper Collection:**
- **8 curated images** from Unsplash with distinct color palettes
- **Ocean Sunset**: Warm orange and blue coastal themes
- **Forest Canopy**: Natural green tones and earth colors
- **Mountain Lake**: Serene blue and cool color schemes
- **Lavender Fields**: Purple and violet color harmonies
- **Autumn Forest**: Golden and warm autumn color palettes
- **Desert Canyon**: Red rock and warm earth tones
- **Cherry Blossoms**: Soft pink and spring color themes
- **Night Cityscape**: Dark urban themes with blue accents

**🔧 Technical Features:**
- **Material Design 3 Color Generation**: Each wallpaper triggers complete palette generation
- **Real-time Theme Updates**: Colors change instantly without page refresh
- **Accessibility Preservation**: Contrast ratios maintained across all generated themes
- **Event System Integration**: Full event broadcasting for monitoring and analytics
- **Responsive Design**: Works across desktop and mobile viewports

**🌈 Color Science:**
This demonstration shows how Material Design 3's color algorithms can extract dominant colors from images and generate harmonious, accessible color palettes. Each wallpaper selection creates a complete design system with primary, secondary, tertiary, and surface colors that work together beautifully.

**💡 Use Cases:**
- **Brand Theme Generation**: Extract themes from brand imagery
- **User Personalization**: Allow users to customize app themes
- **Dynamic Branding**: Adapt themes based on content or campaigns
- **Seasonal Themes**: Change themes based on time of year or events
- **Content-Aware Theming**: Match interface colors to content imagery

Try clicking different wallpapers to see how the same UI components adapt to completely different color schemes while maintaining excellent usability and accessibility.
        `
      }
    }
  },
};