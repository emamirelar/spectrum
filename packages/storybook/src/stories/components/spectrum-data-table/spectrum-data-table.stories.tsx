import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

// Theme wrapper decorator for all stories
const withTheme = (story: () => unknown) => html`
  <spectrum-theme color="#0070d2">
    <div style="background: var(--spectrum-color-background); min-height: 100vh;">
      ${story()}
    </div>
  </spectrum-theme>
`;

/**
 * ## SpectrumDataTable Component
 * 
 * A comprehensive data table with sorting, pagination, and selection.
 * Works standalone or as a dashboard widget with filter integration.
 * 
 * ### Key Features
 * - **Sorting**: Click column headers to sort data
 * - **Pagination**: Built-in pagination with page navigation
 * - **Selection**: Select multiple rows with checkboxes
 * - **Formatting**: Currency, percent, number, date, boolean formatters
 * - **Responsive**: Horizontal scrolling on small screens
 * - **Dashboard Integration**: Subscribes to dashboard filters
 * - **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
 * 
 * ### When to Use
 * - **Data Display**: Show tabular data with sorting and pagination
 * - **Dashboard Widgets**: Display filtered data from API
 * - **Reports**: Generate data reports with formatted values
 * - **Selection**: Allow users to select multiple rows for actions
 */

interface DataTableElement extends HTMLElement {
  data: any;
  config: any;
  columns: any;
  sortable: boolean;
  pageable: boolean;
  pageSize: number;
  selectable: boolean;
  loading: boolean;
  context: Record<string, any>;
  debug: boolean;
}

interface DataTableArgs extends DataTableElement {}

const meta: Meta<DataTableArgs> = {
  title: 'Spectrum/Components/SpectrumDataTable',
  tags: ['autodocs'],
  decorators: [withTheme],
  parameters: {
    docs: {
      description: {
        component: `
The Data Table component provides a feature-rich table interface for displaying and interacting with tabular data.

**Key Capabilities:**
- **Sorting**: Click any column header to sort ascending/descending
- **Pagination**: Navigate through pages of data efficiently
- **Selection**: Select single or multiple rows
- **Formatting**: Automatic formatting for currency, percentages, dates
- **Dashboard Integration**: Works as a dashboard widget with filter support
- **Auto-columns**: Automatically generates columns from data structure

**Performance:**
- Supports thousands of rows with pagination
- Efficient re-rendering on sort/filter
- Lazy loading compatible
        `,
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Table data array or JSON string',
      table: {
        type: { summary: 'any[] | string' },
        defaultValue: { summary: '[]' },
      },
    },
    columns: {
      control: 'object',
      description: 'Column definitions or JSON string',
      table: {
        type: { summary: 'TableColumn[] | string' },
      },
    },
    sortable: {
      control: 'boolean',
      description: 'Enable sorting',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    pageable: {
      control: 'boolean',
      description: 'Enable pagination',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    pageSize: {
      control: 'number',
      description: 'Rows per page',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DataTableArgs>;

// =================================================================
// Sample Data
// =================================================================

const salesData = [
  { id: 1, product: 'Laptop Pro', category: 'Electronics', price: 1299.99, units: 45, revenue: 58499.55, inStock: true, date: '2024-01-15' },
  { id: 2, product: 'Wireless Mouse', category: 'Electronics', price: 29.99, units: 230, revenue: 6897.70, inStock: true, date: '2024-01-16' },
  { id: 3, product: 'Office Chair', category: 'Furniture', price: 399.00, units: 67, revenue: 26733.00, inStock: false, date: '2024-01-17' },
  { id: 4, product: 'Desk Lamp', category: 'Furniture', price: 59.99, units: 120, revenue: 7198.80, inStock: true, date: '2024-01-18' },
  { id: 5, product: 'Notebook Set', category: 'Stationery', price: 12.99, units: 450, revenue: 5845.50, inStock: true, date: '2024-01-19' },
  { id: 6, product: 'USB Hub', category: 'Electronics', price: 39.99, units: 180, revenue: 7198.20, inStock: true, date: '2024-01-20' },
  { id: 7, product: 'Monitor Stand', category: 'Furniture', price: 79.99, units: 95, revenue: 7599.05, inStock: false, date: '2024-01-21' },
  { id: 8, product: 'Pen Pack', category: 'Stationery', price: 8.99, units: 600, revenue: 5394.00, inStock: true, date: '2024-01-22' },
  { id: 9, product: 'Keyboard', category: 'Electronics', price: 89.99, units: 156, revenue: 14038.44, inStock: true, date: '2024-01-23' },
  { id: 10, product: 'Desk Organizer', category: 'Furniture', price: 24.99, units: 210, revenue: 5247.90, inStock: true, date: '2024-01-24' },
  { id: 11, product: 'Webcam HD', category: 'Electronics', price: 79.99, units: 89, revenue: 7119.11, inStock: false, date: '2024-01-25' },
  { id: 12, product: 'Sticky Notes', category: 'Stationery', price: 4.99, units: 800, revenue: 3992.00, inStock: true, date: '2024-01-26' },
];

const salesColumns = [
  { key: 'product', label: 'Product', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'price', label: 'Price', format: 'currency', sortable: true, align: 'right' },
  { key: 'units', label: 'Units Sold', format: 'number', sortable: true, align: 'right' },
  { key: 'revenue', label: 'Revenue', format: 'currency', sortable: true, align: 'right' },
  { key: 'inStock', label: 'In Stock', format: 'boolean', sortable: true, align: 'center' },
  { key: 'date', label: 'Date', format: 'date', sortable: true },
];

const employeeData = [
  { name: 'Alice Johnson', department: 'Engineering', role: 'Senior Developer', salary: 95000, performance: 0.92 },
  { name: 'Bob Smith', department: 'Marketing', role: 'Marketing Manager', salary: 78000, performance: 0.88 },
  { name: 'Charlie Brown', department: 'Sales', role: 'Sales Rep', salary: 65000, performance: 0.95 },
  { name: 'Diana Prince', department: 'Engineering', role: 'Tech Lead', salary: 120000, performance: 0.98 },
  { name: 'Eve Adams', department: 'HR', role: 'HR Manager', salary: 82000, performance: 0.85 },
];

const employeeColumns = [
  { key: 'name', label: 'Employee Name', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'salary', label: 'Salary', format: 'currency', sortable: true, align: 'right' },
  { key: 'performance', label: 'Performance', format: 'percent', sortable: true, align: 'right' },
];

// =================================================================
// Stories
// =================================================================

/**
 * The default data table with all features enabled.
 */
export const Playground: Story = {
  args: {
    data: salesData,
    columns: salesColumns,
    sortable: true,
    pageable: true,
    pageSize: 5,
    selectable: false,
    loading: false,
    debug: false,
  },
  render: args => html`
    <div style="padding: 2rem;">
      <spectrum-data-table
        .data=${args.data}
        .columns=${args.columns}
        .sortable=${args.sortable}
        .pageable=${args.pageable}
        .pageSize=${args.pageSize}
        .selectable=${args.selectable}
        .loading=${args.loading}
        .debug=${args.debug}
        @rowClick=${(e: CustomEvent) => console.log('Row clicked:', e.detail)}
        @sortChange=${(e: CustomEvent) => console.log('Sort changed:', e.detail)}
        @pageChange=${(e: CustomEvent) => console.log('Page changed:', e.detail)}
        @rowsSelected=${(e: CustomEvent) => console.log('Rows selected:', e.detail)}
      ></spectrum-data-table>
    </div>
  `,
};

/**
 * Table with formatted values (currency, percent, date, boolean).
 */
export const FormattedValues: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Sales Report
      </h3>
      <spectrum-data-table
        .data=${salesData}
        .columns=${salesColumns}
        .pageSize=${10}
      ></spectrum-data-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates automatic value formatting:
- **Currency**: Prices and revenue formatted as USD
- **Number**: Units formatted with thousands separator
- **Boolean**: True/False shown as Yes/No
- **Date**: ISO dates formatted as locale dates
        `,
      },
    },
  },
};

/**
 * Selectable rows with checkboxes.
 */
export const SelectableRows: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Select Products
      </h3>
      <spectrum-data-table
        .data=${salesData}
        .columns=${salesColumns}
        .selectable=${true}
        .pageSize=${8}
        @rowsSelected=${(e: CustomEvent) => {
          console.log('Selected rows:', e.detail);
          const count = e.detail.length;
          alert(`${count} row${count !== 1 ? 's' : ''} selected`);
        }}
      ></spectrum-data-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Enable row selection with checkboxes. The rowsSelected event emits the selected row data.',
      },
    },
  },
};

/**
 * Dense table variant for compact spaces.
 */
export const DenseTable: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Employee Directory
      </h3>
      <spectrum-data-table
        .data=${employeeData}
        .columns=${employeeColumns}
        .config=${{ dense: true, striped: true, bordered: true }}
        .pageable=${false}
      ></spectrum-data-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Dense variant with reduced padding for displaying more data in less space.',
      },
    },
  },
};

/**
 * Without pagination for small datasets.
 */
export const NoPagination: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        All Employees
      </h3>
      <spectrum-data-table
        .data=${employeeData}
        .columns=${employeeColumns}
        .pageable=${false}
      ></spectrum-data-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'For small datasets, pagination can be disabled to show all rows at once.',
      },
    },
  },
};

/**
 * Loading state.
 */
export const LoadingState: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Fetching Data...
      </h3>
      <spectrum-data-table
        .data=${[]}
        .columns=${salesColumns}
        .loading=${true}
      ></spectrum-data-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner while data is being fetched.',
      },
    },
  },
};

/**
 * Empty state.
 */
export const EmptyState: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        No Results
      </h3>
      <spectrum-data-table
        .data=${[]}
        .columns=${salesColumns}
        .loading=${false}
      >
        <div slot="empty" style="padding: 4rem; text-align: center; color: var(--spectrum-sys-color-on-surface-variant);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
          <p style="margin: 0; font-size: 1.125rem; font-weight: 500;">No data found</p>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">Try adjusting your filters or search criteria</p>
        </div>
      </spectrum-data-table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Custom empty state using the empty slot.',
      },
    },
  },
};

/**
 * Dashboard widget integration.
 */
export const DashboardIntegration: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <div style="background: var(--spectrum-sys-color-surface-container); padding: 1.5rem; border-radius: 12px;">
        <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
          Top Products
        </h3>
        <spectrum-data-table
          .data=${salesData.slice(0, 5)}
          .columns=${salesColumns}
          .pageable=${false}
          .config=${{ hoverable: true, bordered: true }}
        ></spectrum-data-table>
      </div>
      
      <div style="margin-top: 2rem; color: var(--spectrum-sys-color-on-surface-variant); padding: 1rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">💡 Dashboard Integration</p>
        <p style="margin: 0; font-size: 0.875rem;">
          In a dashboard, this table automatically subscribes to filter changes and refreshes its data through the DataSourceManager.
        </p>
        <pre style="margin: 1rem 0 0 0; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px; overflow-x: auto; font-size: 0.75rem;">
{
  "widgets": {
    "table": {
      "component": "data-table",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["regionId", "dateRange"],
        "mode": "auto"
      },
      "uiConfig": {
        "columns": [...],
        "sortable": true,
        "pageSize": 10
      }
    }
  }
}</pre>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of the data table as a dashboard widget with filter subscription.',
      },
    },
  },
};

/**
 * Auto-generated columns from data structure.
 */
export const AutoColumns: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
        Auto-Generated Columns
      </h3>
      <spectrum-data-table
        .data=${employeeData}
        .pageable=${false}
      ></spectrum-data-table>
      
      <p style="margin: 1rem 0 0 0; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">
        When no columns are specified, they are automatically generated from the data structure.
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'If no column definitions are provided, the table automatically generates columns from the data structure.',
      },
    },
  },
};

/**
 * Scrollable table with max-height constraint.
 * Demonstrates vertical scrolling when content exceeds the container.
 */
export const ScrollableTable: Story = {
  render: () => html`
    <div style="padding: 2rem;">
      <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-color-on-surface);">
        Scrollable Data Table (max-height: 300px)
      </h3>
      <spectrum-data-table
        .data=${salesData}
        .columns=${salesColumns}
        .pageable=${false}
        max-height="300px"
      ></spectrum-data-table>
      
      <p style="margin: 1rem 0 0 0; font-size: 0.875rem; color: var(--spectrum-color-on-surface-variant);">
        With <code>max-height</code> set and pagination disabled, the table scrolls vertically.
        Headers remain sticky while scrolling.
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Use the \`max-height\` prop to constrain the table height and enable vertical scrolling.
This is useful when you want to display a scrollable list without pagination.

**Usage:**
~~~html
<spectrum-data-table
  max-height="400px"
  .pageable=\${false}
></spectrum-data-table>
~~~

The header row remains sticky at the top while scrolling through the data.
        `,
      },
    },
  },
};

