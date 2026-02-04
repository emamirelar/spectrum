import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

/**
 * ## SpectrumFilterPanel Component
 * 
 * A flexible filter panel that works standalone or as a dashboard widget.
 * Supports multiple filter types and integrates with the dashboard filtering system.
 * 
 * ### Key Features
 * - **Multiple Filter Types**: Select, multi-select, date range, text, number, checkbox
 * - **Dashboard Integration**: Publishes filters to dashboard store
 * - **Immediate Mode**: Apply filters on change or with apply button
 * - **Flexible Layout**: Horizontal or vertical orientation
 * - **Validation Support**: Required fields, min/max values
 * - **Accessible**: WCAG 2.1 AA compliant
 * 
 * ### When to Use
 * - **Dashboard Filtering**: Control multiple widgets with shared filters
 * - **Data Tables**: Filter table rows based on user selections
 * - **Search Interfaces**: Combine multiple filter criteria
 * - **Form Filters**: Complex filtering requirements in forms
 */

interface FilterPanelElement extends HTMLElement {
  filters: any;
  layout: 'horizontal' | 'vertical';
  showButtons: boolean;
  immediate: boolean;
  context: Record<string, any>;
  debug: boolean;
}

interface FilterPanelArgs extends FilterPanelElement {}

const meta: Meta<FilterPanelArgs> = {
  title: 'Spectrum/Components/SpectrumFilterPanel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Filter Panel component provides a comprehensive filtering interface that integrates seamlessly with the dashboard system. It supports various filter types and can operate in immediate mode or with manual apply.

**Dashboard Integration:**
- Automatically publishes filter changes to the dashboard store
- Works with dashboard widgets that subscribe to filter changes
- Supports both standalone and dashboard widget usage

**Filter Types:**
- **Select**: Single selection dropdown
- **MultiSelect**: Multiple selections
- **Date Range**: Start and end date pickers
- **Text**: Free text search
- **Number**: Numeric input with validation
- **Checkbox**: Boolean toggle
        `,
      },
    },
  },
  argTypes: {
    filters: {
      control: 'object',
      description: 'Array of filter definitions or JSON string',
      table: {
        type: { summary: 'FilterDefinition[] | string' },
        defaultValue: { summary: '[]' },
      },
    },
    layout: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    showButtons: {
      control: 'boolean',
      description: 'Show apply/reset buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    immediate: {
      control: 'boolean',
      description: 'Apply filters immediately on change',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<FilterPanelArgs>;

// =================================================================
// Sample Data
// =================================================================

const basicFilters = [
  {
    id: 'region',
    type: 'select',
    label: 'Region',
    options: [
      { label: 'North America', value: 'NA' },
      { label: 'Europe', value: 'EU' },
      { label: 'Asia Pacific', value: 'APAC' },
      { label: 'Latin America', value: 'LATAM' },
    ],
    defaultValue: 'NA',
  },
  {
    id: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Completed', value: 'completed' },
      { label: 'Cancelled', value: 'cancelled' },
    ],
  },
  {
    id: 'search',
    type: 'text',
    label: 'Search',
  },
];

const advancedFilters = [
  {
    id: 'category',
    type: 'multiSelect',
    label: 'Categories',
    options: [
      { label: 'Electronics', value: 'electronics' },
      { label: 'Clothing', value: 'clothing' },
      { label: 'Home & Garden', value: 'home' },
      { label: 'Sports', value: 'sports' },
      { label: 'Books', value: 'books' },
    ],
  },
  {
    id: 'dateRange',
    type: 'dateRange',
    label: 'Date Range',
    defaultValue: {
      start: '2024-01-01',
      end: '2024-12-31',
    },
  },
  {
    id: 'minPrice',
    type: 'number',
    label: 'Minimum Price',
    validation: {
      min: 0,
      max: 10000,
    },
  },
  {
    id: 'inStock',
    type: 'checkbox',
    label: 'In Stock Only',
    defaultValue: true,
  },
];

// =================================================================
// Stories
// =================================================================

/**
 * The default filter panel with basic filters and horizontal layout.
 */
export const Playground: Story = {
  args: {
    filters: basicFilters,
    layout: 'horizontal',
    showButtons: true,
    immediate: false,
    debug: true,
  },
  render: args => html`
    <div style="padding: 2rem;">
      <spectrum-filter-panel
        .filters=${args.filters}
        .layout=${args.layout || 'horizontal'}
        .showButtons=${args.showButtons}
        .immediate=${args.immediate}
        .debug=${args.debug}
        @filterChange=${(e: CustomEvent) => console.log('Filter changed:', e.detail)}
        @filterApply=${(e: CustomEvent) => console.log('Filters applied:', e.detail)}
        @filterReset=${() => console.log('Filters reset')}
      ></spectrum-filter-panel>
    </div>
  `,
};

/**
 * Horizontal layout with all filter types.
 */
export const AllFilterTypes: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Advanced Filters
      </h3>
      <spectrum-filter-panel
        .filters=${advancedFilters}
        layout="horizontal"
        .showButtons=${true}
        .immediate=${false}
      ></spectrum-filter-panel>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all available filter types: multiSelect, dateRange, number, and checkbox.',
      },
    },
  },
};

/**
 * Vertical layout for narrow spaces.
 */
export const VerticalLayout: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Filter Panel
      </h3>
      <spectrum-filter-panel
        .filters=${basicFilters}
        layout="vertical"
        .showButtons=${true}
      ></spectrum-filter-panel>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout is perfect for sidebars and narrow containers.',
      },
    },
  },
};

/**
 * Immediate mode - filters apply on change.
 */
export const ImmediateMode: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <h3 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">
          Live Filtering
        </h3>
        <span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: var(--spectrum-sys-color-primary); color: var(--spectrum-sys-color-on-primary); border-radius: 4px;">
          Immediate Mode
        </span>
      </div>
      <spectrum-filter-panel
        .filters=${basicFilters}
        layout="horizontal"
        .showButtons=${false}
        .immediate=${true}
        .debug=${true}
      ></spectrum-filter-panel>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'In immediate mode, filters are applied as soon as they change. No apply button is shown.',
      },
    },
  },
};

/**
 * Required fields validation.
 */
export const WithValidation: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Form with Validation
      </h3>
      <spectrum-filter-panel
        .filters=${[
          {
            id: 'name',
            type: 'text',
            label: 'Name',
            validation: { required: true },
          },
          {
            id: 'age',
            type: 'number',
            label: 'Age',
            validation: { required: true, min: 18, max: 100 },
          },
          {
            id: 'country',
            type: 'select',
            label: 'Country',
            validation: { required: true },
            options: [
              { label: 'United States', value: 'US' },
              { label: 'Canada', value: 'CA' },
              { label: 'United Kingdom', value: 'UK' },
              { label: 'Australia', value: 'AU' },
            ],
          },
        ]}
        layout="vertical"
        .showButtons=${true}
      ></spectrum-filter-panel>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Filters can have validation rules like required fields and min/max values.',
      },
    },
  },
};

/**
 * As a dashboard widget.
 */
export const DashboardIntegration: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <div style="background: var(--spectrum-sys-color-surface-container); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
          Dashboard Filters
        </h3>
        <spectrum-filter-panel
          .filters=${[
            {
              id: 'regionId',
              type: 'select',
              label: 'Region',
              options: [
                { label: 'North America', value: 'NA' },
                { label: 'Europe', value: 'EU' },
                { label: 'Asia Pacific', value: 'APAC' },
              ],
              defaultValue: 'NA',
            },
            {
              id: 'dateRange',
              type: 'dateRange',
              label: 'Date Range',
              defaultValue: {
                start: '2024-01-01',
                end: '2024-12-31',
              },
            },
            {
              id: 'productCategory',
              type: 'multiSelect',
              label: 'Categories',
              options: [
                { label: 'Electronics', value: 'electronics' },
                { label: 'Clothing', value: 'clothing' },
                { label: 'Home', value: 'home' },
              ],
            },
          ]}
          layout="horizontal"
          .showButtons=${true}
          .immediate=${false}
          .debug=${true}
        ></spectrum-filter-panel>
      </div>
      
      <div style="color: var(--spectrum-sys-color-on-surface-variant); padding: 1rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">💡 Dashboard Integration</p>
        <p style="margin: 0; font-size: 0.875rem;">
          When used in a dashboard, this filter panel publishes changes to the dashboard store. 
          Other widgets can subscribe to these filters and automatically refresh their data.
        </p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
          Check the browser console to see filter updates in real-time.
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Dashboard integration example showing how the filter panel publishes changes to the dashboard store.

**Dashboard Configuration:**
\`\`\`json
{
  "widgets": {
    "filters": {
      "component": "filter-panel",
      "uiConfig": {
        "layout": "horizontal"
      },
      "bus": {
        "publish": ["regionId", "dateRange", "productCategory"]
      }
    }
  }
}
\`\`\`
        `,
      },
    },
  },
};



