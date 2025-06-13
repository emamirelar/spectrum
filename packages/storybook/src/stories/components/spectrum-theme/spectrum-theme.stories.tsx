import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import docs from './spectrum-theme.docs.md?raw';

const meta = {
  title: 'Spectrum/Theme',
  component: 'spectrum-theme',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: docs
      }
    }
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'The primary color to generate the theme from',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#0070d2' }
      }
    },
    dark: {
      control: 'boolean',
      description: 'Whether to use dark mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showSwatches: {
      control: 'boolean',
      description: 'Whether to show theme color swatches (useful for development)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Whether to enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    config: {
      control: 'text',
      description: 'Theme configuration object as JSON string for custom overrides',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '{}' }
      }
    },
    autoLoadFonts: {
      control: 'boolean',
      description: 'Whether to automatically load fonts and prevent FOUC',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    fontLoadTimeout: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Font loading timeout in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' }
      }
    },
    preloadFonts: {
      control: 'boolean',
      description: 'Whether to preload fonts via link elements',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    waitForWallpaper: {
      control: 'boolean',
      description: 'Whether to wait for wallpaper colors before showing content',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    coordinationTimeout: {
      control: { type: 'number', min: 500, max: 5000, step: 250 },
      description: 'Timeout for wallpaper coordination in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2000' }
      }
    },
    hideContentUntilReady: {
      control: 'boolean',
      description: 'Whether to hide content until theme is fully ready',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

// Simple demo component to show theme variables in action
const DemoContent = () => html`
  <style>
    .demo-content {
      padding: var(--spectrum-sys-spacing);
      background: var(--spectrum-sys-color-surface);
      color: var(--spectrum-sys-color-on-surface);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 20px auto;
    }
    .demo-title {
      font-size: var(--spectrum-sys-typescale-headline-small-size);
      font-weight: var(--spectrum-sys-typescale-headline-small-weight);
      margin-bottom: var(--spectrum-sys-spacing);
      color: var(--spectrum-sys-color-primary);
    }
    .demo-text {
      margin-bottom: var(--spectrum-sys-spacing);
      line-height: 1.5;
    }
    .demo-button {
      background: var(--spectrum-sys-color-primary);
      color: var(--spectrum-sys-color-on-primary);
      border: none;
      padding: var(--spectrum-sys-spacing-small) var(--spectrum-sys-spacing);
      border-radius: var(--spectrum-sys-shape-corner-medium);
      font-size: var(--spectrum-sys-typescale-body-medium-size);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      margin-right: var(--spectrum-sys-spacing-small);
    }
    .demo-button:hover {
      background: var(--spectrum-sys-color-primary-container);
      color: var(--spectrum-sys-color-on-primary-container);
      transform: translateY(-1px);
    }
    .demo-secondary {
      background: var(--spectrum-sys-color-secondary);
      color: var(--spectrum-sys-color-on-secondary);
    }
    .demo-secondary:hover {
      background: var(--spectrum-sys-color-secondary-container);
      color: var(--spectrum-sys-color-on-secondary-container);
    }
    .demo-material-icon {
      margin-left: var(--spectrum-sys-spacing-small);
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      vertical-align: middle;
    }
  </style>
  <div class="demo-content" data-hide-until-ready>
    <div class="demo-title">Spectrum Theme Demo</div>
    <div class="demo-text">
      This component demonstrates the theme variables in action. It uses Material Design 3 color tokens for colors, spacing, typography, and effects. The theme automatically generates a complete color palette from the primary color.
    </div>
    <div class="demo-text">
      <strong>Features demonstrated:</strong>
      <ul>
        <li>Material Design 3 color system</li>
        <li>Automatic font loading with FOUC prevention</li>
        <li>Responsive spacing and typography</li>
        <li>Material Symbols icon font</li>
        <li>Coordinated loading states</li>
      </ul>
    </div>
    <button class="demo-button">
      Primary Action
      <span class="demo-material-icon">arrow_forward</span>
    </button>
    <button class="demo-button demo-secondary">
      Secondary Action
      <span class="demo-material-icon">settings</span>
    </button>
  </div>
`;

export const Default: Story = {
  args: {
    color: '#0070d2',
    dark: false,
    showSwatches: false,
    debug: false,  // Disabled by default for cleaner experience
    config: '{}',
    autoLoadFonts: true,
    fontLoadTimeout: 3000,
    preloadFonts: true,
    waitForWallpaper: false,
    coordinationTimeout: 2000,
    hideContentUntilReady: false  // Disabled for Storybook compatibility
  },
  render: (args) => html`
    <spectrum-theme
      color=${ifDefined(args.color)}
      ?dark=${args.dark}
      ?show-swatches=${args.showSwatches}
      ?debug=${args.debug}
      config=${ifDefined(args.config)}
      ?auto-load-fonts=${args.autoLoadFonts}
      font-load-timeout=${ifDefined(args.fontLoadTimeout)}
      ?preload-fonts=${args.preloadFonts}
      ?wait-for-wallpaper=${args.waitForWallpaper}
      coordination-timeout=${ifDefined(args.coordinationTimeout)}
      ?hide-content-until-ready=${args.hideContentUntilReady}
    >
      ${DemoContent()}
    </spectrum-theme>
  `
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
    dark: true
  },
  render: Default.render
};

export const WithSwatches: Story = {
  args: {
    ...Default.args,
    showSwatches: true,
    debug: true
  },
  render: Default.render
};

export const CustomTheme: Story = {
  args: {
    ...Default.args,
    color: '#ff6b35',
    config: JSON.stringify({
      spacing: {
        base: '20px'
      },
      typography: {
        'font-family': 'Georgia, serif'
      }
    })
  },
  render: Default.render
};

export const FontLoadingDemo: Story = {
  args: {
    ...Default.args,
    debug: true,
    fontLoadTimeout: 5000,
    showSwatches: true
  },
  render: Default.render
};

export const NoFontLoading: Story = {
  args: {
    ...Default.args,
    autoLoadFonts: false,
    preloadFonts: false
  },
  render: Default.render
};

export const LoadingCoordinationDemo: Story = {
  args: {
    ...Default.args,
    hideContentUntilReady: true,  // Enable for this demo
    debug: true,
    fontLoadTimeout: 2000
  },
  render: (args) => html`
    <div>
      <p style="margin: 20px; padding: 20px; background: #f0f0f0; border-radius: 8px;" data-always-visible>
        <strong>Loading Demo:</strong> This content is always visible during loading. 
        The main content below should appear after fonts load and theme is ready.
        <br><br>
        <em>Note: If you don't see content below, the theme loading system is working correctly - 
        content will appear once fonts and theme are fully loaded.</em>
      </p>
      <spectrum-theme
        color=${ifDefined(args.color)}
        ?dark=${args.dark}
        ?show-swatches=${args.showSwatches}
        ?debug=${args.debug}
        config=${ifDefined(args.config)}
        ?auto-load-fonts=${args.autoLoadFonts}
        font-load-timeout=${ifDefined(args.fontLoadTimeout)}
        ?preload-fonts=${args.preloadFonts}
        ?wait-for-wallpaper=${args.waitForWallpaper}
        coordination-timeout=${ifDefined(args.coordinationTimeout)}
        ?hide-content-until-ready=${args.hideContentUntilReady}
      >
        ${DemoContent()}
      </spectrum-theme>
    </div>
  `
};

export const WallpaperCoordination: Story = {
  args: {
    ...Default.args,
    waitForWallpaper: true,
    coordinationTimeout: 3000,
    hideContentUntilReady: true,
    showSwatches: true,  // Show color swatches to see extracted colors
    debug: true
  },
  render: (args) => html`
    <div>
      <p style="margin: 20px; padding: 20px; background: #f0f0f0; border-radius: 8px;" data-always-visible>
        <strong>Wallpaper Coordination Demo:</strong> This demonstrates coordinated loading between theme and wallpaper components.
        The content below will appear only after both the wallpaper colors are extracted AND fonts are loaded.
        <br><br>
        <em>Watch the browser console (if debug is enabled) to see the coordination events.</em>
      </p>
      <spectrum-wallpaper
        background="url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop)"
        preload-colors="true"
        signal-ready="true"
        debug="true"
      >
        <spectrum-theme
          color=${ifDefined(args.color)}
          ?dark=${args.dark}
          ?show-swatches=${args.showSwatches}
          ?debug=${args.debug}
          config=${ifDefined(args.config)}
          ?auto-load-fonts=${args.autoLoadFonts}
          font-load-timeout=${ifDefined(args.fontLoadTimeout)}
          ?preload-fonts=${args.preloadFonts}
          ?wait-for-wallpaper=${args.waitForWallpaper}
          coordination-timeout=${ifDefined(args.coordinationTimeout)}
          ?hide-content-until-ready=${args.hideContentUntilReady}
        >
          ${DemoContent()}
        </spectrum-theme>
      </spectrum-wallpaper>
    </div>
  `
};