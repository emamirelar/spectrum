import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

const meta = {
  title: 'Components/SpectrumThemeDemo',
  component: 'spectrum-theme-demo',
  tags: ['autodocs'],
  render: (args) => html`
    <spectrum-wallpaper
      background=${args.background}
      show-swatches=${args['show-swatches']}
      backgroundposition=${args.backgroundposition}
      backgroundsize=${args.backgroundsize}
    >
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <spectrum-conversation-panel 
          messages='[
            {
              "sender": "request",
              "message": "Hello, how can I help you today?"
            },
            {
              "sender": "response",
              "message": "I'm looking for information about the Material Design 3 theme system."
            },
            {
              "sender": "request",
              "message": "I can help with that! The Material Design 3 theme system uses dynamic color extraction to create harmonious color schemes."
            }
          ]'
          actions='[]'
          conversationtitle="Theme Demo Conversation"
        ></spectrum-conversation-panel>
      </div>
    </spectrum-wallpaper>
  `,
  parameters: {
    docs: {
      description: {
        component: 'A demo showing how the Spectrum Wallpaper component generates a theme that affects the Conversation Panel.'
      }
    }
  },
  args: {
    background: 'url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538)',
    'show-swatches': true,
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
    'show-swatches': {
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
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: 'With Image Background',
  parameters: {
    docs: {
      description: {
        story: 'Example using an image background. The wallpaper component extracts the dominant color and generates a theme that affects the conversation panel.'
      }
    }
  }
};

export const Gradient: StoryObj = {
  name: 'With Gradient Background',
  args: {
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example using a gradient background. The wallpaper component extracts the first color from the gradient to generate the theme that affects the conversation panel.'
      }
    }
  }
}; 