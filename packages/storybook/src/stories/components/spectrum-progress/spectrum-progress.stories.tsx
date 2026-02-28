import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

interface SpectrumProgressElement extends HTMLElement {
  variant: 'circular' | 'linear';
  value: number;
  size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large';
  disabled: boolean;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  label: string;
  showLabel: boolean;
}

interface SpectrumProgressArgs extends SpectrumProgressElement {}

const meta: Meta<SpectrumProgressArgs> = {
  title: 'Spectrum/Components/SpectrumProgress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A progress indicator supporting both linear (bar) and circular (spinner) variants.
Supports determinate (0-100) and indeterminate states.
Follows the M3 Progress Indicator pattern with Spectrum design tokens.

### Basic Usage
\`\`\`html
<spectrum-progress value="50"></spectrum-progress>
<spectrum-progress variant="circular" value="75"></spectrum-progress>
<spectrum-progress></spectrum-progress> <!-- indeterminate -->
\`\`\`
        `
      }
    }
  },
  args: {
    variant: 'linear',
    value: 50,
    size: 'base',
    disabled: false,
    color: 'primary',
    label: 'Loading',
    showLabel: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
      description: 'Linear bar or circular spinner',
      table: { type: { summary: `'linear' | 'circular'` }, defaultValue: { summary: 'linear' } }
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value 0-100. Omit for indeterminate.',
      table: { type: { summary: 'number | undefined' }, defaultValue: { summary: 'undefined' } }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the indicator',
      table: { type: { summary: `'sm' | 'base' | 'lg'` }, defaultValue: { summary: 'base' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the progress is visually disabled',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color variant',
      table: { type: { summary: `'primary' | 'secondary' | 'success' | 'warning' | 'danger'` }, defaultValue: { summary: 'primary' } }
    },
    label: {
      control: 'text',
      description: 'Accessible label',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumProgressArgs>;

const renderProgress = (args: SpectrumProgressArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; width: 100%;">
    <spectrum-progress
      .variant=${args.variant}
      .value=${args.value}
      .size=${args.size}
      .disabled=${args.disabled}
      .color=${args.color}
      .label=${args.label}
      .showLabel=${args.showLabel}
      style=${args.variant === 'linear' ? 'width: 100%; max-width: 400px;' : ''}
    ></spectrum-progress>
  </div>
`;

export const Playground: Story = {
  render: renderProgress,
  parameters: {
    docs: { description: { story: 'Interactive playground — use the controls to experiment.' } }
  }
};

export const LinearDeterminate: Story = {
  render: renderProgress,
  args: { variant: 'linear', value: 65, showLabel: true },
};

export const LinearIndeterminate: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-progress variant="linear" style="width: 100%; max-width: 400px;"></spectrum-progress>
    </div>
  `,
  parameters: { docs: { description: { story: 'No `value` prop = indeterminate animation.' } } }
};

export const CircularDeterminate: Story = {
  render: renderProgress,
  args: { variant: 'circular', value: 75, showLabel: true },
};

export const CircularIndeterminate: Story = {
  render: () => html`
    <div style="padding: 2rem; display: flex; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-progress variant="circular"></spectrum-progress>
    </div>
  `,
  parameters: { docs: { description: { story: 'Circular indeterminate spinner.' } } }
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-progress value="60" color="primary" show-label style="max-width:400px;"></spectrum-progress>
      <spectrum-progress value="60" color="secondary" show-label style="max-width:400px;"></spectrum-progress>
      <spectrum-progress value="60" color="success" show-label style="max-width:400px;"></spectrum-progress>
      <spectrum-progress value="60" color="warning" show-label style="max-width:400px;"></spectrum-progress>
      <spectrum-progress value="60" color="danger" show-label style="max-width:400px;"></spectrum-progress>
    </div>
  `,
  parameters: { docs: { description: { story: 'All color variants.' } } }
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 3rem; padding: 2rem; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <spectrum-progress variant="circular" value="50" size="sm"></spectrum-progress>
        <span style="font-size:12px;">Small</span>
      </div>
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <spectrum-progress variant="circular" value="50" size="base"></spectrum-progress>
        <span style="font-size:12px;">Base</span>
      </div>
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <spectrum-progress variant="circular" value="50" size="lg"></spectrum-progress>
        <span style="font-size:12px;">Large</span>
      </div>
    </div>
  `,
  parameters: { docs: { description: { story: 'Size variations for the circular variant.' } } }
};
