import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumWallpaper } from "@stencil-storybook-boilerplate/core/src/components/spectrum-wallpaper/spectrum-wallpaper";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction

const meta = {
  title: 'Components/SpectrumWallpaper',
  component: 'spectrum-wallpaper',
  tags: ['autodocs'],
  render: (args) => html`
    <spectrum-wallpaper
      background=${args.background}
      show-swatches=${args.showSwatches}
      backgroundposition=${args.backgroundposition}
      backgroundsize=${args.backgroundsize}
    >
      <div style="background: white; padding: 2rem; border-radius: 0.5rem; flex-grow: 1;">
        <h2>Content</h2>
        <p>This content is centered in the wallpaper</p>
      </div>
    </spectrum-wallpaper>
  `,
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