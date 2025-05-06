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
    config: {
      control: 'object',
      description: 'Theme configuration object for custom overrides',
      table: {
        type: { summary: 'ThemeConfig' },
        defaultValue: { summary: '{}' }
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
      background: var(--spectrum-color-surface);
      color: var(--spectrum-color-on-surface);
      border-radius: 8px;
      box-shadow: 0 2px 4px var(--spectrum-color-shadow);
    }
    .demo-title {
      font-size: var(--spectrum-sys-font-size-large);
      font-weight: var(--spectrum-sys-font-weight-bold);
      margin-bottom: var(--spectrum-sys-spacing);
      color: var(--spectrum-color-primary);
    }
    .demo-text {
      margin-bottom: var(--spectrum-sys-spacing);
    }
    .demo-button {
      background: var(--spectrum-color-primary);
      color: var(--spectrum-color-on-primary);
      border: none;
      padding: var(--spectrum-sys-spacing-small) var(--spectrum-sys-spacing);
      border-radius: 4px;
      font-size: var(--spectrum-sys-font-size);
      cursor: pointer;
      transition: transform var(--spectrum-sys-animation-duration) var(--spectrum-sys-animation-timing-function);
    }
    .demo-button:hover {
      transform: translateY(-2px);
    }
  </style>
  <div class="demo-content">
    <div class="demo-title">Theme Demo</div>
    <div class="demo-text">
      This component demonstrates the theme variables in action. It uses various theme tokens for colors, spacing, typography, and effects.
    </div>
    <button class="demo-button">Interactive Button</button>
  </div>
`;

export const Default: Story = {
  args: {
    color: '#0070d2',
    dark: false
  },
  render: (args) => html`
    <spectrum-theme
      color=${ifDefined(args.color)}
      ?dark=${args.dark}
      config=${ifDefined(args.config)}
    >
      ${DemoContent()}
    </spectrum-theme>
  `
};

export const DarkMode: Story = {
  args: {
    color: '#0070d2',
    dark: true
  },
  render: Default.render
};

export const CustomTheme: Story = {
  args: {
    color: '#ff0000',
    dark: false,
    config: JSON.stringify({
      colors: {
        primary: '#ff0000',
        secondary: '#00ff00'
      },
      spacing: {
        base: '16px'
      },
      typography: {
        'font-family': 'Arial, sans-serif'
      }
    })
  },
  render: Default.render
};