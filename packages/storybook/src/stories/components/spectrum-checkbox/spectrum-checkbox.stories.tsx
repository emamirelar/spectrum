import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SpectrumCheckboxElement extends HTMLElement {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  variant: 'primary' | 'positive' | 'caution' | 'destructive';
  size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large';
  value: string;
  name: string;
  label: string;
  accessibleLabel: string;
  accessibleDescribedBy: string;
}

interface SpectrumCheckboxArgs extends SpectrumCheckboxElement {}

const meta: Meta<SpectrumCheckboxArgs> = {
  title: 'Spectrum/Components/SpectrumCheckbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A checkbox component with support for checked, unchecked, and indeterminate states.
Follows the M3 Checkbox pattern with Spectrum design tokens.

### Event System
- **checkboxChange**: Emits \`{ action, checked, indeterminate, value }\`

### Basic Usage
\`\`\`html
<spectrum-checkbox label="Accept terms" checked></spectrum-checkbox>
\`\`\`
        `
      }
    }
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    variant: 'primary',
    size: 'base',
    value: '',
    name: '',
    label: 'Checkbox label',
    accessibleLabel: '',
    accessibleDescribedBy: '',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate (mixed) state',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    variant: {
      control: 'select',
      options: ['primary', 'positive', 'caution', 'destructive'],
      description: 'Visual variant of the checkbox',
      table: { type: { summary: `'primary' | 'positive' | 'caution' | 'destructive'` }, defaultValue: { summary: 'primary' } }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the checkbox',
      table: { type: { summary: `'sm' | 'base' | 'lg'` }, defaultValue: { summary: 'base' } }
    },
    value: {
      control: 'text',
      description: 'Form value when checked',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    name: {
      control: 'text',
      description: 'Form field name',
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
type Story = StoryObj<SpectrumCheckboxArgs>;

const renderCheckbox = (args: SpectrumCheckboxArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-checkbox
      .checked=${args.checked}
      .indeterminate=${args.indeterminate}
      .disabled=${args.disabled}
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
      .name=${args.name}
      .label=${args.label}
      .accessibleLabel=${args.accessibleLabel}
      .accessibleDescribedBy=${args.accessibleDescribedBy}
      @checkboxChange=${(e: CustomEvent) => action('checkboxChange')(e.detail)}
    ></spectrum-checkbox>
  </div>
`;

export const Playground: Story = {
  render: renderCheckbox,
  parameters: {
    docs: { description: { story: 'Interactive playground — use the controls panel to experiment with all properties.' } }
  }
};

export const Checked: Story = {
  render: renderCheckbox,
  args: { checked: true, label: 'Checked checkbox' },
};

export const Indeterminate: Story = {
  render: renderCheckbox,
  args: { indeterminate: true, label: 'Indeterminate state' },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; flex-wrap: wrap; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-checkbox label="Primary" variant="primary" checked></spectrum-checkbox>
      <spectrum-checkbox label="Positive" variant="positive" checked></spectrum-checkbox>
      <spectrum-checkbox label="Caution" variant="caution" checked></spectrum-checkbox>
      <spectrum-checkbox label="Destructive" variant="destructive" checked></spectrum-checkbox>
      <spectrum-checkbox label="Disabled" disabled checked></spectrum-checkbox>
    </div>
  `,
  parameters: { docs: { description: { story: 'All checkbox color variants side by side.' } } }
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-checkbox label="Small" size="sm" checked></spectrum-checkbox>
      <spectrum-checkbox label="Base" size="base" checked></spectrum-checkbox>
      <spectrum-checkbox label="Large" size="lg" checked></spectrum-checkbox>
    </div>
  `,
  parameters: { docs: { description: { story: 'Size variations.' } } }
};
