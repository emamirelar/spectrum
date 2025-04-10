import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumWallpaper } from "@stencil-storybook-boilerplate/core/src/components/spectrum-wallpaper/spectrum-wallpaper";

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction

const meta = {
  title: 'Components/Spectrum Wallpaper',
  tags: ['autodocs'],
  args: {
    background: 'url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538)',
    showSwatches: true,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  argTypes: {
    background: {
      type: {
        required: true,
      },
    },
    showSwatches: {
      type: {
        required: false,
      },
    },
    backgroundPosition: {
      type: {
        required: false,
      },
    },
    backgroundSize: {
      type: {
        required: false,
      },
    },
  }
} satisfies Meta<SpectrumWallpaper>

export default meta

const getCssValue = (variable: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || 'Not Set';
};

export const Default = {
  render: ({ background, showSwatches, backgroundPosition, backgroundSize }) =>
    html`
      <spectrum-wallpaper
        background=${background}
        .showSwatches=${showSwatches}
        background-position=${backgroundPosition}
        background-size=${backgroundSize}
      >
        <div style="background: white; padding: 2rem; border-radius: 0.5rem;">
          <h2>Content</h2>
          <p>This content is centered in the wallpaper</p>
        </div>
      </spectrum-wallpaper>
    `,
} satisfies StoryObj<SpectrumWallpaper>

export const Gradient = {
  args: {
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  },
  render: ({ background, showSwatches, backgroundPosition, backgroundSize }) =>
    html`
      <spectrum-wallpaper
        background=${background}
        .showSwatches=${showSwatches}
        background-position=${backgroundPosition}
        background-size=${backgroundSize}
      >
        <div style="background: white; padding: 2rem; border-radius: 0.5rem;">
          <h2>Content</h2>
          <p>This content is centered in the gradient wallpaper</p>
        </div>
      </spectrum-wallpaper>
    `,
} satisfies StoryObj<SpectrumWallpaper> 