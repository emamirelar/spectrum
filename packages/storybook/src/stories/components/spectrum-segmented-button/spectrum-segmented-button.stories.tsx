import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumSegmentedButton Component
 *
 * A segmented button component for toggling between related options.
 * Renders a group of buttons with shared border-radius, supporting
 * single-select (radio) and multi-select (toggle) modes.
 *
 * **Variants**: Single-select (radiogroup), Multi-select (toolbar)
 *
 * **Sizes**: sm, base, lg
 *
 * **Accessibility**: Full keyboard navigation, ARIA radiogroup/toolbar roles, high contrast support.
 */

interface SpectrumSegmentedButtonArgs {
  items: string;
  selectedIndex: number;
  multiSelect: boolean;
  size: 'sm' | 'base' | 'lg';
  disabled: boolean;
}

const meta: Meta<SpectrumSegmentedButtonArgs> = {
  title: 'Spectrum/Components/SpectrumSegmentedButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A segmented button component that renders a group of connected buttons for toggling between related options.

### Key Features
- **Single & Multi-select**: Toggle between radio-style single selection and multi-toggle mode
- **Keyboard Navigation**: Full arrow key, Home/End, Enter/Space support
- **JSON & JS Input**: Accepts items as JavaScript arrays or JSON strings
- **Size Variants**: Small, base, and large sizes
- **Icon Support**: Optional Material Design icons per segment

### Event System
- **segmentChange**: Emitted on selection change with \`{ action, index, value, selected }\`
        `
      }
    }
  },
  args: {
    items: JSON.stringify([
      { label: 'Day', value: 'day', icon: 'today' },
      { label: 'Week', value: 'week', icon: 'date_range' },
      { label: 'Month', value: 'month', icon: 'calendar_month' },
    ]),
    selectedIndex: 0,
    multiSelect: false,
    size: 'base',
    disabled: false,
  },
  argTypes: {
    items: {
      control: 'text',
      description: 'JSON array of segment items: `[{ label, value, icon?, disabled? }]`',
      table: {
        type: { summary: 'SegmentItem[] | string' },
        defaultValue: { summary: '[]' }
      }
    },
    selectedIndex: {
      control: { type: 'number', min: 0 },
      description: 'Index of the selected segment (single-select mode)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    multiSelect: {
      control: 'boolean',
      description: 'Enable multi-select mode (toggle buttons)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Size variant',
      table: {
        type: { summary: '"sm" | "base" | "lg"' },
        defaultValue: { summary: '"base"' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire segmented button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
  },
  render: (args) => html`
    <spectrum-segmented-button
      items=${args.items}
      selected-index=${args.selectedIndex}
      ?multi-select=${args.multiSelect}
      size=${args.size}
      ?disabled=${args.disabled}
      @segmentChange=${(e: CustomEvent) => action('segmentChange')(e.detail)}
    ></spectrum-segmented-button>
  `,
};

export default meta;
type Story = StoryObj<SpectrumSegmentedButtonArgs>;

export const Default: Story = {
  name: 'Default',
};

export const TextOnly: Story = {
  name: 'Text Only',
  args: {
    items: JSON.stringify([
      { label: 'Flights', value: 'flights' },
      { label: 'Hotels', value: 'hotels' },
      { label: 'Cars', value: 'cars' },
    ]),
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    items: JSON.stringify([
      { label: 'List', value: 'list', icon: 'view_list' },
      { label: 'Grid', value: 'grid', icon: 'grid_view' },
      { label: 'Map', value: 'map', icon: 'map' },
    ]),
    selectedIndex: 1,
  },
};

export const MultiSelect: Story = {
  name: 'Multi-Select',
  args: {
    items: JSON.stringify([
      { label: 'Bold', value: 'bold', icon: 'format_bold' },
      { label: 'Italic', value: 'italic', icon: 'format_italic' },
      { label: 'Underline', value: 'underline', icon: 'format_underlined' },
    ]),
    multiSelect: true,
  },
};

export const SmallSize: Story = {
  name: 'Small',
  args: {
    size: 'sm',
    items: JSON.stringify([
      { label: 'S', value: 'small' },
      { label: 'M', value: 'medium' },
      { label: 'L', value: 'large' },
    ]),
  },
};

export const LargeSize: Story = {
  name: 'Large',
  args: {
    size: 'lg',
    items: JSON.stringify([
      { label: 'Overview', value: 'overview', icon: 'dashboard' },
      { label: 'Details', value: 'details', icon: 'info' },
      { label: 'Settings', value: 'settings', icon: 'settings' },
    ]),
    selectedIndex: 0,
  },
};

export const WithDisabledSegment: Story = {
  name: 'With Disabled Segment',
  args: {
    items: JSON.stringify([
      { label: 'Active', value: 'active' },
      { label: 'Disabled', value: 'disabled', disabled: true },
      { label: 'Also Active', value: 'also-active' },
    ]),
  },
};

export const Disabled: Story = {
  name: 'Fully Disabled',
  args: {
    disabled: true,
  },
};

export const AllSizes: Story = {
  name: 'All Sizes Comparison',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div>
        <div style="margin-bottom: 4px; font-size: 12px; color: #666;">Small (sm)</div>
        <spectrum-segmented-button
          size="sm"
          items='[{"label":"Day","value":"day"},{"label":"Week","value":"week"},{"label":"Month","value":"month"}]'
          @segmentChange=${(e: CustomEvent) => action('segmentChange')(e.detail)}
        ></spectrum-segmented-button>
      </div>
      <div>
        <div style="margin-bottom: 4px; font-size: 12px; color: #666;">Base (default)</div>
        <spectrum-segmented-button
          size="base"
          items='[{"label":"Day","value":"day"},{"label":"Week","value":"week"},{"label":"Month","value":"month"}]'
          @segmentChange=${(e: CustomEvent) => action('segmentChange')(e.detail)}
        ></spectrum-segmented-button>
      </div>
      <div>
        <div style="margin-bottom: 4px; font-size: 12px; color: #666;">Large (lg)</div>
        <spectrum-segmented-button
          size="lg"
          items='[{"label":"Day","value":"day"},{"label":"Week","value":"week"},{"label":"Month","value":"month"}]'
          @segmentChange=${(e: CustomEvent) => action('segmentChange')(e.detail)}
        ></spectrum-segmented-button>
      </div>
    </div>
  `,
};
