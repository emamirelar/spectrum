import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumWallpaper } from "@stencil-storybook-boilerplate/core/src/components/spectrum-wallpaper/spectrum-wallpaper";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction

const meta = {
  title: 'Components/SpectrumWallpaper',
  component: 'spectrum-wallpaper',
  tags: ['autodocs'],
  render: (args) => {
    const elementHtml = html`
      <spectrum-wallpaper
        background=${args.background}
        show-swatches=${args.showSwatches}
        ?debug=${args.debug}
        backgroundposition=${args.backgroundposition}
        backgroundsize=${args.backgroundsize}
      >
        <div style="background: white; padding: 2rem; border-radius: 0.5rem; flex-grow: 1;">
          <h2>Content</h2>
          <p>This content is centered in the wallpaper</p>
        </div>
      </spectrum-wallpaper>
    `;
    return elementHtml;
  },
  parameters: {
    docs: {
      description: {
        component: 'A dynamic wallpaper component that extracts the dominant color from images or gradients and generates a Material Design 3 theme.'
      }
    }
  },
  args: {
    background: 'url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538)',
    showSwatches: true,
    debug: false,
    backgroundposition: 'center',
    backgroundsize: 'cover',
  },
  argTypes: {
    background: {
      description: 'The background value (color, gradient, or image URL)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    showSwatches: {
      description: 'Whether to show the theme color swatches',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    debug: {
      description: 'Whether to enable debug logging',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    backgroundposition: {
      description: 'The background image position',
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
      }
    },
    backgroundsize: {
      description: 'The background image size',
      control: 'select',
      options: ['cover', 'contain', 'auto'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'cover' },
      }
    },
  }
} satisfies Meta<SpectrumWallpaper>;

export default meta;

export const Default: StoryObj<SpectrumWallpaper> = {
  name: 'With Image',
  parameters: {
    docs: {
      description: {
        story: 'Example using an image background. The component will extract the dominant color and generate a theme.'
      }
    }
  }
};

export const Gradient: StoryObj<SpectrumWallpaper> = {
  name: 'With Gradient',
  args: {
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example using a gradient background. The component will extract the first color from the gradient to generate the theme.'
      }
    }
  }
};

export const Ocean: StoryObj<SpectrumWallpaper> = {
  name: 'Ocean Scene',
  args: {
    background: 'url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&q=80)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ocean landscape image that demonstrates how the component generates a blue-toned theme from natural water scenes.'
      }
    }
  }
};

export const Forest: StoryObj<SpectrumWallpaper> = {
  name: 'Forest Scene',
  args: {
    background: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Forest landscape image that demonstrates how the component generates a green-toned theme from natural vegetation scenes.'
      }
    }
  }
};

export const Debug: StoryObj<SpectrumWallpaper> = {
  name: 'Debug Mode',
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
        backgroundposition=${args.backgroundposition}
        backgroundsize=${args.backgroundsize}
      >
        <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 0.5rem; margin: 2rem; max-width: 600px;">
          <h2 style="color: var(--spectrum-color-primary, #0070d2);">Debug Mode Enabled</h2>
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
            <strong>🔍 Debug Instructions:</strong>
            <ol style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
              <li>Open your browser's Developer Tools (F12)</li>
              <li>Go to the Console tab</li>
              <li>Look for messages starting with <code>[spectrum-wallpaper]</code></li>
              <li>Toggle the debug control above to see the difference</li>
            </ol>
          </div>
          <p>Expected console output when debug is enabled:</p>
          <pre style="background: #f8f9fa; padding: 1rem; border-radius: 4px; font-size: 0.8rem; overflow-x: auto;">
[spectrum-wallpaper] Debug mode enabled - component initializing
[spectrum-wallpaper] Image loaded successfully: https://...
[spectrum-wallpaper] Extracted color from image: #1976d2
[spectrum-wallpaper] Updating theme with color: #1976d2
[spectrum-wallpaper] Theme successfully applied with scheme: {...}
[spectrum-wallpaper] Applying theme with custom properties: 24 properties</pre>
          <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-color-surface, #f5f5f5); border-radius: 4px;">
            <p style="color: var(--spectrum-color-on-surface, #000);">This text uses extracted theme colors:</p>
            <ul style="color: var(--spectrum-color-on-surface, #000);">
              <li>Primary: <span style="color: var(--spectrum-color-primary, #0070d2);">Sample text</span></li>
              <li>Secondary: <span style="color: var(--spectrum-color-secondary, #005fb2);">Sample text</span></li>
              <li>Error: <span style="color: var(--spectrum-color-error, #ba1a1a);">Sample text</span></li>
            </ul>
          </div>
        </div>
      </spectrum-wallpaper>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `Debug version with detailed console logging enabled. This story demonstrates how to:
        
1. **Enable debug mode** by setting the \`debug\` attribute to \`true\`
2. **Monitor console output** to see detailed information about image loading and color extraction
3. **Troubleshoot issues** with background images or color generation

**Troubleshooting Steps:**
- If you don't see any debug output, check that the debug control is enabled above
- Make sure your browser console is open and showing "Info" level logs
- Try different background values to see how the component responds

**Testing Different Backgrounds:**
- Image URL: \`url('https://example.com/image.jpg')\`
- Solid color: \`#ff5722\`
- Gradient: \`linear-gradient(45deg, #ff0000, #0000ff)\``
      }
    }
  }
}; 