import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SpectrumTabsElement extends HTMLElement {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large';
  items: string;
  selectedIndex: number;
  scrollable: boolean;
  disabled: boolean;
}

interface SpectrumTabsArgs extends SpectrumTabsElement {}

const sampleItems = JSON.stringify([
  { label: 'Overview', icon: 'info' },
  { label: 'Features', icon: 'star' },
  { label: 'Pricing', icon: 'payments' },
  { label: 'Support', icon: 'help' },
]);

const meta: Meta<SpectrumTabsArgs> = {
  title: 'Spectrum/Components/SpectrumTabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A tabs component supporting primary and secondary variants with icon support, keyboard navigation,
and an animated active indicator. Follows the M3 Tabs pattern with Spectrum design tokens.

### Event System
- **tabChange**: Emits \`{ action: 'select', index, tab }\`

### Basic Usage
\`\`\`html
<spectrum-tabs items='[{"label":"Tab 1"},{"label":"Tab 2"}]'></spectrum-tabs>
\`\`\`
        `
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'base',
    items: sampleItems,
    selectedIndex: 0,
    scrollable: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Tab bar style variant',
      table: { type: { summary: `'primary' | 'secondary'` }, defaultValue: { summary: 'primary' } }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the tab bar',
      table: { type: { summary: `'sm' | 'base' | 'lg'` }, defaultValue: { summary: 'base' } }
    },
    items: {
      control: 'text',
      description: 'JSON array of TabItem objects: { label, icon?, disabled?, id? }',
      table: { type: { summary: 'TabItem[] | string' }, defaultValue: { summary: '[]' } }
    },
    selectedIndex: {
      control: 'number',
      description: 'Currently selected tab index',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } }
    },
    scrollable: {
      control: 'boolean',
      description: 'Enable horizontal scrolling for many tabs',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all tabs',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumTabsArgs>;

const renderTabs = (args: SpectrumTabsArgs) => html`
  <div style="padding: 2rem; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-tabs
      .variant=${args.variant}
      .size=${args.size}
      .items=${args.items}
      .selectedIndex=${args.selectedIndex}
      .scrollable=${args.scrollable}
      .disabled=${args.disabled}
      @tabChange=${(e: CustomEvent) => action('tabChange')(e.detail)}
    ></spectrum-tabs>
  </div>
`;

export const Playground: Story = {
  render: renderTabs,
  parameters: {
    docs: { description: { story: 'Interactive playground — use the controls panel to experiment with all properties.' } }
  }
};

export const Primary: Story = {
  render: renderTabs,
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  render: renderTabs,
  args: { variant: 'secondary' },
};

export const WithIcons: Story = {
  render: renderTabs,
  args: {
    items: JSON.stringify([
      { label: 'Home', icon: 'home' },
      { label: 'Search', icon: 'search' },
      { label: 'Settings', icon: 'settings' },
    ]),
  },
  parameters: { docs: { description: { story: 'Tabs with Material Icons.' } } }
};

export const WithDisabledTab: Story = {
  render: renderTabs,
  args: {
    items: JSON.stringify([
      { label: 'Active' },
      { label: 'Also active' },
      { label: 'Disabled', disabled: true },
      { label: 'Another active' },
    ]),
  },
  parameters: { docs: { description: { story: 'Individual tabs can be disabled.' } } }
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; opacity: 0.7;">Small</p>
        <spectrum-tabs size="sm" items='[{"label":"Tab 1"},{"label":"Tab 2"},{"label":"Tab 3"}]'></spectrum-tabs>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; opacity: 0.7;">Base</p>
        <spectrum-tabs size="base" items='[{"label":"Tab 1"},{"label":"Tab 2"},{"label":"Tab 3"}]'></spectrum-tabs>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 12px; opacity: 0.7;">Large</p>
        <spectrum-tabs size="lg" items='[{"label":"Tab 1"},{"label":"Tab 2"},{"label":"Tab 3"}]'></spectrum-tabs>
      </div>
    </div>
  `,
  parameters: { docs: { description: { story: 'Size variations.' } } }
};
