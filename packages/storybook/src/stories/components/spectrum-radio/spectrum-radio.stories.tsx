import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SpectrumRadioElement extends HTMLElement {
  checked: boolean;
  disabled: boolean;
  variant: 'primary' | 'positive' | 'caution' | 'destructive';
  size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large';
  value: string;
  name: string;
  label: string;
  accessibleLabel: string;
  accessibleDescribedBy: string;
}

interface SpectrumRadioArgs extends SpectrumRadioElement {}

const meta: Meta<SpectrumRadioArgs> = {
  title: 'Spectrum/Components/SpectrumRadio',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A radio button component. Individual radios share a \`name\` prop to form a group.
Follows the M3 Radio Button pattern with Spectrum design tokens.

### Event System
- **radioChange**: Emits \`{ action: 'select', checked, value, name }\`

### Basic Usage
\`\`\`html
<spectrum-radio name="color" value="red" label="Red"></spectrum-radio>
<spectrum-radio name="color" value="blue" label="Blue"></spectrum-radio>
\`\`\`
        `
      }
    }
  },
  args: {
    checked: false,
    disabled: false,
    variant: 'primary',
    size: 'base',
    value: '',
    name: '',
    label: 'Radio option',
    accessibleLabel: '',
    accessibleDescribedBy: '',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the radio is selected',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    variant: {
      control: 'select',
      options: ['primary', 'positive', 'caution', 'destructive'],
      description: 'Visual variant',
      table: { type: { summary: `'primary' | 'positive' | 'caution' | 'destructive'` }, defaultValue: { summary: 'primary' } }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the radio',
      table: { type: { summary: `'sm' | 'base' | 'lg'` }, defaultValue: { summary: 'base' } }
    },
    value: {
      control: 'text',
      description: 'Form value',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    name: {
      control: 'text',
      description: 'Radio group name',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    label: {
      control: 'text',
      description: 'Visible label text',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    accessibleLabel: {
      control: 'text',
      description: 'ARIA label override',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    accessibleDescribedBy: {
      control: 'text',
      description: 'ARIA described-by ID',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumRadioArgs>;

const renderRadio = (args: SpectrumRadioArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-radio
      .checked=${args.checked}
      .disabled=${args.disabled}
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
      .name=${args.name}
      .label=${args.label}
      .accessibleLabel=${args.accessibleLabel}
      .accessibleDescribedBy=${args.accessibleDescribedBy}
      @radioChange=${(e: CustomEvent) => action('radioChange')(e.detail)}
    ></spectrum-radio>
  </div>
`;

export const Playground: Story = {
  render: renderRadio,
  parameters: {
    docs: { description: { story: 'Interactive playground — use the controls panel to experiment.' } }
  }
};

export const Selected: Story = {
  render: renderRadio,
  args: { checked: true, label: 'Selected radio' },
};

export const RadioGroup: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-radio name="fruit" value="apple" label="Apple" checked></spectrum-radio>
      <spectrum-radio name="fruit" value="banana" label="Banana"></spectrum-radio>
      <spectrum-radio name="fruit" value="cherry" label="Cherry"></spectrum-radio>
      <spectrum-radio name="fruit" value="disabled" label="Disabled option" disabled></spectrum-radio>
    </div>
  `,
  parameters: { docs: { description: { story: 'Radios grouped by shared `name` prop.' } } }
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-radio label="Primary" variant="primary" checked></spectrum-radio>
      <spectrum-radio label="Positive" variant="positive" checked></spectrum-radio>
      <spectrum-radio label="Caution" variant="caution" checked></spectrum-radio>
      <spectrum-radio label="Destructive" variant="destructive" checked></spectrum-radio>
    </div>
  `,
  parameters: { docs: { description: { story: 'All radio color variants.' } } }
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-radio label="Small" size="sm" checked></spectrum-radio>
      <spectrum-radio label="Base" size="base" checked></spectrum-radio>
      <spectrum-radio label="Large" size="lg" checked></spectrum-radio>
    </div>
  `,
  parameters: { docs: { description: { story: 'Size variations.' } } }
};
