import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SpectrumTooltipElement extends HTMLElement {
  variant: 'plain' | 'rich';
  position: 'top' | 'bottom' | 'left' | 'right';
  text: string;
  visible: boolean;
  delay: number;
  trigger: 'hover' | 'click' | 'manual';
}

interface SpectrumTooltipArgs extends SpectrumTooltipElement {}

const meta: Meta<SpectrumTooltipArgs> = {
  title: 'Spectrum/Components/SpectrumTooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A tooltip component with plain and rich variants, configurable position and trigger modes.
Follows the M3 Tooltip pattern with Spectrum design tokens.

### Event System
- **tooltipShow**: Emitted when tooltip becomes visible
- **tooltipHide**: Emitted when tooltip hides

### Basic Usage
\`\`\`html
<spectrum-tooltip text="Helpful info">
  <button>Hover me</button>
</spectrum-tooltip>
\`\`\`
        `
      }
    }
  },
  args: {
    variant: 'plain',
    position: 'top',
    text: 'This is a tooltip',
    visible: false,
    delay: 300,
    trigger: 'hover',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['plain', 'rich'],
      description: 'Plain (text-only) or rich (slotted content)',
      table: { type: { summary: `'plain' | 'rich'` }, defaultValue: { summary: 'plain' } }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position relative to trigger',
      table: { type: { summary: `'top' | 'bottom' | 'left' | 'right'` }, defaultValue: { summary: 'top' } }
    },
    text: {
      control: 'text',
      description: 'Tooltip text (plain variant)',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    visible: {
      control: 'boolean',
      description: 'Force tooltip visibility',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    delay: {
      control: 'number',
      description: 'Show delay in ms',
      table: { type: { summary: 'number' }, defaultValue: { summary: '300' } }
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'manual'],
      description: 'How the tooltip is triggered',
      table: { type: { summary: `'hover' | 'click' | 'manual'` }, defaultValue: { summary: 'hover' } }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumTooltipArgs>;

const renderTooltip = (args: SpectrumTooltipArgs) => html`
  <div style="padding: 6rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-tooltip
      .variant=${args.variant}
      .position=${args.position}
      .text=${args.text}
      .visible=${args.visible}
      .delay=${args.delay}
      .trigger=${args.trigger}
      @tooltipShow=${() => action('tooltipShow')()}
      @tooltipHide=${() => action('tooltipHide')()}
    >
      <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #ccc; cursor: pointer;">Hover me</button>
    </spectrum-tooltip>
  </div>
`;

export const Playground: Story = {
  render: renderTooltip,
  parameters: {
    docs: { description: { story: 'Interactive playground — hover or adjust controls.' } }
  }
};

export const AlwaysVisible: Story = {
  render: renderTooltip,
  args: { visible: true, text: 'Always visible tooltip' },
};

export const Positions: Story = {
  render: () => html`
    <div style="display: flex; gap: 4rem; padding: 6rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-tooltip text="Top" position="top" visible>
        <button style="padding:8px 16px; border-radius:8px; border:1px solid #ccc;">Top</button>
      </spectrum-tooltip>
      <spectrum-tooltip text="Bottom" position="bottom" visible>
        <button style="padding:8px 16px; border-radius:8px; border:1px solid #ccc;">Bottom</button>
      </spectrum-tooltip>
      <spectrum-tooltip text="Left" position="left" visible>
        <button style="padding:8px 16px; border-radius:8px; border:1px solid #ccc;">Left</button>
      </spectrum-tooltip>
      <spectrum-tooltip text="Right" position="right" visible>
        <button style="padding:8px 16px; border-radius:8px; border:1px solid #ccc;">Right</button>
      </spectrum-tooltip>
    </div>
  `,
  parameters: { docs: { description: { story: 'All four position options.' } } }
};

export const ClickTrigger: Story = {
  render: renderTooltip,
  args: { trigger: 'click', text: 'Click-triggered tooltip' },
  parameters: { docs: { description: { story: 'Tooltip triggered by click instead of hover.' } } }
};

export const RichTooltip: Story = {
  render: () => html`
    <div style="padding: 6rem; display: flex; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-tooltip variant="rich" position="bottom" visible trigger="click">
        <button style="padding:8px 16px; border-radius:8px; border:1px solid #ccc;">Click for details</button>
        <div slot="content">
          <h4 style="margin:0 0 4px;">Rich tooltip</h4>
          <p style="margin:0; font-size:13px;">This tooltip can contain <strong>formatted content</strong>, links, and interactive elements.</p>
        </div>
      </spectrum-tooltip>
    </div>
  `,
  parameters: { docs: { description: { story: 'Rich tooltip with slotted HTML content.' } } }
};
