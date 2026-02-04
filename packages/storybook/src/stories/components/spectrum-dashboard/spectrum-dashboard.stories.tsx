import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, render } from 'lit';
import type { DashboardConfig } from '../../../../../core/src/components/spectrum-dashboard/types/dashboard.types';

/**
 * ## SpectrumDashboard Component
 * 
 * A JSON-driven dashboard engine with advanced data sharing and filtering capabilities.
 * Built with Stencil.js, TypeScript, and CSS Grid for maximum flexibility and performance.
 * 
 * ### Key Features
 * - **JSON-Driven**: Entire dashboard configured through JSON
 * - **CSS Grid Layout**: Responsive grid-based layouts using CSS Grid Template Areas
 * - **Centralized Data Management**: Shared data sources eliminate duplicate API calls
 * - **Advanced Filtering**: Client-side and server-side filtering with smart caching
 * - **Widget System**: Extensible widget registry for custom components
 * - **Type-Safe**: Full TypeScript support with strict typing
 * - **Framework Agnostic**: Pure web components work anywhere
 * 
 * ### Usage Guidelines
 * - **Use for**: Analytics dashboards, monitoring interfaces, data visualization apps
 * - **Perfect for**: Multi-widget layouts with shared data and filtering
 * - **Avoid when**: Simple single-chart displays would suffice
 */

// Component interfaces for TypeScript support
interface SpectrumDashboardElement extends HTMLElement {
  config: DashboardConfig | string;
  context: Record<string, any>;
  debug: boolean;
}

// Story arguments interface
interface SpectrumDashboardArgs extends SpectrumDashboardElement {}

// =================================================================
// MOCK DATA GENERATORS
// =================================================================

/**
 * Generate mock sales data for demonstration
 */
const generateSalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenue = months.map(() => Math.floor(Math.random() * 50000) + 30000);
  const expenses = months.map(() => Math.floor(Math.random() * 30000) + 15000);
  
  return {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        data: revenue,
        backgroundColor: '#0078d433',
        borderColor: '#0078d4',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenses,
        backgroundColor: '#d1343833',
        borderColor: '#d13438',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

/**
 * Generate mock regional sales data
 */
const generateRegionalData = () => {
  return {
    labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'],
    datasets: [
      {
        label: 'Sales ($K)',
        data: [450, 380, 520, 180, 140],
        backgroundColor: ['#0078d4', '#00b294', '#f7630c', '#5c2d91', '#d13438'],
        borderWidth: 0,
      },
    ],
  };
};

/**
 * Generate mock product category data
 */
const generateCategoryData = () => {
  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Electronics',
        data: [150, 180, 165, 200],
        backgroundColor: '#0078d4',
      },
      {
        label: 'Clothing',
        data: [80, 90, 85, 100],
        backgroundColor: '#00b294',
      },
      {
        label: 'Home & Garden',
        data: [50, 60, 55, 70],
        backgroundColor: '#f7630c',
      },
    ],
  };
};

/**
 * Generate mock performance metrics
 */
const generatePerformanceData = () => {
  return {
    labels: ['Speed', 'Reliability', 'Features', 'Support', 'Value'],
    datasets: [
      {
        label: 'Current Quarter',
        data: [85, 92, 78, 88, 75],
        backgroundColor: '#0078d433',
        borderColor: '#0078d4',
        borderWidth: 2,
      },
      {
        label: 'Previous Quarter',
        data: [75, 85, 72, 82, 70],
        backgroundColor: '#00b29433',
        borderColor: '#00b294',
        borderWidth: 2,
      },
    ],
  };
};

// =================================================================
// DASHBOARD CONFIGURATIONS
// =================================================================

/**
 * Sales Analytics Dashboard Configuration
 */
const salesDashboardConfig: DashboardConfig = {
  id: 'sales-analytics-dashboard',
  layout: {
    template: [
      'header header header header',
      'revenue revenue regional regional',
      'categories categories performance performance',
    ],
    gap: '24px',
    columns: '1fr 1fr 1fr 1fr',
    rows: 'auto 400px 400px',
  },
  widgets: {
    header: {
      component: 'header-widget', // We'll render this inline
      uiConfig: {
        title: 'Sales Analytics Dashboard',
        subtitle: 'Q4 2024 Performance Overview',
      },
    },
    revenue: {
      component: 'line-chart',
      dataSourceId: 'sales-data',
      uiConfig: {
        type: 'line',
        title: 'Revenue vs Expenses',
        xAxisLabel: 'Month',
        yAxisLabel: 'Amount ($)',
        valueFormat: 'currency',
        showLegend: true,
        legendPosition: 'top',
        showGrid: true,
      },
    },
    regional: {
      component: 'pie-chart',
      dataSourceId: 'regional-data',
      uiConfig: {
        type: 'pie',
        title: 'Sales by Region',
        showLegend: true,
        legendPosition: 'right',
        valueFormat: 'currency',
      },
    },
    categories: {
      component: 'bar-chart',
      dataSourceId: 'category-data',
      uiConfig: {
        type: 'bar',
        title: 'Sales by Category',
        xAxisLabel: 'Quarter',
        yAxisLabel: 'Sales ($K)',
        valueFormat: 'currency',
        showLegend: true,
        stacked: true,
      },
    },
    performance: {
      component: 'radar-chart',
      dataSourceId: 'performance-data',
      uiConfig: {
        type: 'radar',
        title: 'Performance Metrics',
        showLegend: true,
        legendPosition: 'bottom',
      },
    },
  },
};

/**
 * Simple Dashboard Configuration
 */
const simpleDashboardConfig: DashboardConfig = {
  id: 'simple-dashboard',
  layout: {
    template: [
      'chart chart',
    ],
    gap: '16px',
    columns: '1fr',
    rows: '500px',
  },
  widgets: {
    chart: {
      component: 'line-chart',
      dataSourceId: 'sales-data',
      uiConfig: {
        type: 'line',
        title: 'Monthly Revenue Trend',
        xAxisLabel: 'Month',
        yAxisLabel: 'Revenue ($)',
        valueFormat: 'currency',
        showLegend: true,
        colors: ['#0078d4', '#00b294'],
      },
    },
  },
};

/**
 * Multi-Chart Dashboard Configuration
 */
const multiChartDashboardConfig: DashboardConfig = {
  id: 'multi-chart-dashboard',
  layout: {
    template: [
      'line line bar bar',
      'pie doughnut radar polar',
    ],
    gap: '20px',
    columns: '1fr 1fr 1fr 1fr',
    rows: '350px 350px',
  },
  widgets: {
    line: {
      component: 'line-chart',
      dataSourceId: 'sales-data',
      uiConfig: {
        type: 'line',
        title: 'Line Chart',
        showLegend: true,
      },
    },
    bar: {
      component: 'bar-chart',
      dataSourceId: 'category-data',
      uiConfig: {
        type: 'bar',
        title: 'Bar Chart',
        showLegend: true,
      },
    },
    pie: {
      component: 'pie-chart',
      dataSourceId: 'regional-data',
      uiConfig: {
        type: 'pie',
        title: 'Pie Chart',
        showLegend: false,
      },
    },
    doughnut: {
      component: 'doughnut-chart',
      dataSourceId: 'regional-data',
      uiConfig: {
        type: 'doughnut',
        title: 'Doughnut Chart',
        showLegend: false,
      },
    },
    radar: {
      component: 'radar-chart',
      dataSourceId: 'performance-data',
      uiConfig: {
        type: 'radar',
        title: 'Radar Chart',
        showLegend: false,
      },
    },
    polar: {
      component: 'polar-chart',
      dataSourceId: 'regional-data',
      uiConfig: {
        type: 'polarArea',
        title: 'Polar Area Chart',
        showLegend: false,
      },
    },
  },
};

// =================================================================
// META CONFIGURATION
// =================================================================

const meta: Meta<SpectrumDashboardArgs> = {
  title: 'Spectrum/Components/SpectrumDashboard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-dashboard\` component is a powerful JSON-driven dashboard engine that enables you to create complex, data-rich dashboards through simple JSON configuration.

### Architecture

#### JSON-Driven Configuration
Define your entire dashboard layout, widgets, and data sources in a single JSON object:

~~~typescript
{
  "id": "my-dashboard",
  "layout": {
    "template": ["header header", "chart1 chart2"],
    "gap": "24px",
    "columns": "1fr 1fr"
  },
  "widgets": {
    "chart1": {
      "component": "line-chart",
      "dataSourceId": "sales-data",
      "uiConfig": { "title": "Revenue" }
    }
  }
}
~~~

#### CSS Grid Layout
Uses CSS Grid Template Areas for flexible, responsive layouts without pixel calculations:
- **Visual Definition**: Define layouts as string arrays
- **Named Areas**: Reference widgets by semantic names
- **Responsive**: Automatically adapts to screen sizes
- **No Math**: Layout engine handles all positioning

#### Centralized Data Management
DataSourceManager singleton eliminates duplicate API calls:
- **Request Deduplication**: Multiple widgets sharing data = one API call
- **Smart Caching**: TTL-based caching with filter awareness
- **Filter Integration**: Automatic cache invalidation on filter changes
- **Performance**: > 80% cache hit rate for shared data sources

#### Widget System
Extensible widget registry for any component type:
- **Chart Widgets**: Line, bar, pie, doughnut, radar, polar, bubble, scatter
- **Data Widgets**: Tables, grids, lists
- **Filter Widgets**: Date pickers, dropdowns, search
- **Custom Widgets**: Register any Stencil component

### Key Features

#### Separation of Concerns
- **Layout**: Owned by app admins via JSON
- **Implementation**: Owned by developers via code
- **Decoupling**: Widgets don't know about each other

#### Advanced Filtering
- **Server-Side**: Filters sent as API parameters
- **Client-Side**: Filter data after fetching
- **Auto Mode**: Automatically chooses best approach
- **Subscription Model**: Widgets opt-in to specific filters

#### Event-Driven Communication
- **@stencil/store**: Lightweight event bus for widget communication
- **Filter Events**: Widgets publish and subscribe to filter changes
- **Navigation Events**: Drill-down without touching browser history
- **Loose Coupling**: Event-based, not direct imports

### Performance

#### Benchmarks (10 widgets, 1000 data points)
- **Initial Render**: < 2 seconds
- **Filter Response**: < 500ms
- **Memory Usage**: < 50MB
- **Cache Hit Rate**: > 80%
- **Bundle Size**: < 50KB (gzipped)

### Usage Example

~~~html
<spectrum-dashboard
  config='{"id":"dashboard","layout":{"template":["chart"],"columns":"1fr"},"widgets":{"chart":{"component":"line-chart","dataSourceId":"data"}}}'
  context='{"userId":"123","authToken":"abc"}'
></spectrum-dashboard>
~~~

### Integration

Works with any framework:
- React, Vue, Angular, Svelte
- Vanilla JavaScript
- Server-side rendering
- Static site generators
        `
      }
    }
  },
  args: {
    debug: false,
  },
  argTypes: {
    config: {
      control: 'object',
      description: 'Dashboard configuration (JSON object or string)',
      table: {
        type: { summary: 'DashboardConfig | string' },
        defaultValue: { summary: '{}' }
      }
    },
    context: {
      control: 'object',
      description: 'Global context (userId, authToken, etc.)',
      table: {
        type: { summary: 'Record<string, any>' },
        defaultValue: { summary: '{}' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging to console',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumDashboardArgs>;

// =================================================================
// HELPER FUNCTIONS
// =================================================================

/**
 * Setup mock data in global context for demonstration
 */
const setupMockData = () => {
  // Simulate data fetching by storing in global context
  (window as any).__dashboardMockData = {
    'sales-data': generateSalesData(),
    'regional-data': generateRegionalData(),
    'category-data': generateCategoryData(),
    'performance-data': generatePerformanceData(),
  };
};

/**
 * Render dashboard header widget (inline for demo)
 */
const renderHeaderWidget = (title: string, subtitle?: string) => html`
  <div style="
    padding: 2rem;
    background: linear-gradient(135deg, var(--spectrum-sys-color-primary) 0%, var(--spectrum-sys-color-secondary) 100%);
    border-radius: 12px;
    color: white;
    text-align: center;
  ">
    <h1 style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 600;">
      ${title}
    </h1>
    ${subtitle ? html`
      <p style="margin: 0; font-size: 1.1rem; opacity: 0.9;">
        ${subtitle}
      </p>
    ` : ''}
  </div>
`;

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring dashboard configurations.
 * Modify the config and context to see real-time changes.
 */
export const Playground: Story = {
  args: {
    config: simpleDashboardConfig,
    context: {},
    debug: false,
  },
  render: (args) => {
    setupMockData();
    
    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px; min-height: 600px;">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px;">
          <h3 style="margin: 0 0 0.5rem 0;">Dashboard Configuration</h3>
          <p style="margin: 0; font-size: 0.9rem; color: var(--spectrum-sys-color-on-surface-variant);">
            Use the controls to modify the dashboard configuration and see changes in real-time.
          </p>
        </div>
        
        <spectrum-dashboard
          .config=${args.config}
          .context=${args.context}
          .debug=${args.debug}
        >
          <!-- Charts will be rendered by dashboard-widget-host -->
          ${args.config && typeof args.config === 'object' && args.config.widgets?.header ? 
            renderHeaderWidget(
              args.config.widgets.header.uiConfig?.title || 'Dashboard',
              args.config.widgets.header.uiConfig?.subtitle
            ) : 
            ''
          }
          
          <!-- Inject mock data as spectrum-chart components -->
          <spectrum-chart
            data='${JSON.stringify((window as any).__dashboardMockData?.['sales-data'])}'
            style="display: none;"
          ></spectrum-chart>
          <spectrum-chart
            data='${JSON.stringify((window as any).__dashboardMockData?.['regional-data'])}'
            style="display: none;"
          ></spectrum-chart>
          <spectrum-chart
            data='${JSON.stringify((window as any).__dashboardMockData?.['category-data'])}'
            style="display: none;"
          ></spectrum-chart>
          <spectrum-chart
            data='${JSON.stringify((window as any).__dashboardMockData?.['performance-data'])}'
            style="display: none;"
          ></spectrum-chart>
        </spectrum-dashboard>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Interactive playground with live configuration editing.
Experiment with different layouts, widgets, and settings to explore the dashboard's capabilities.
        `
      }
    }
  }
};

/**
 * Comprehensive sales analytics dashboard with multiple chart types.
 * Demonstrates real-world dashboard layout with revenue, regional, category, and performance data.
 */
export const SalesAnalyticsDashboard: Story = {
  render: () => {
    setupMockData();
    
    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-dim); border-radius: 12px; min-height: 800px;">
        ${renderHeaderWidget('Sales Analytics Dashboard', 'Q4 2024 Performance Overview')}
        
        <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
          <!-- Revenue Chart -->
          <spectrum-chart
            type="line"
            config='{"title":"Revenue vs Expenses","xAxisLabel":"Month","yAxisLabel":"Amount ($)","valueFormat":"currency","showLegend":true,"legendPosition":"top","showGrid":true}'
            .data=${generateSalesData()}
            height="400px"
          ></spectrum-chart>
          
          <!-- Regional Chart -->
          <spectrum-chart
            type="pie"
            config='{"title":"Sales by Region","showLegend":true,"legendPosition":"right","valueFormat":"currency"}'
            .data=${generateRegionalData()}
            height="400px"
          ></spectrum-chart>
          
          <!-- Category Chart -->
          <spectrum-chart
            type="bar"
            config='{"title":"Sales by Category","xAxisLabel":"Quarter","yAxisLabel":"Sales ($K)","valueFormat":"currency","showLegend":true,"stacked":true}'
            .data=${generateCategoryData()}
            height="400px"
          ></spectrum-chart>
          
          <!-- Performance Chart -->
          <spectrum-chart
            type="radar"
            config='{"title":"Performance Metrics","showLegend":true,"legendPosition":"bottom"}'
            .data=${generatePerformanceData()}
            height="400px"
          ></spectrum-chart>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive sales analytics dashboard featuring:
- **Line Chart**: Revenue vs Expenses over time
- **Pie Chart**: Regional sales distribution
- **Stacked Bar Chart**: Category performance by quarter
- **Radar Chart**: Multi-dimensional performance metrics

This example demonstrates how different chart types work together to provide comprehensive business insights.
        `
      }
    }
  }
};

/**
 * Simple dashboard with a single line chart.
 * Perfect starting point for basic data visualization needs.
 */
export const SimpleLineDashboard: Story = {
  render: () => {
    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
        <h2 style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface);">
          Monthly Revenue Trend
        </h2>
        
        <spectrum-chart
          type="line"
          config='{"xAxisLabel":"Month","yAxisLabel":"Revenue ($)","valueFormat":"currency","showLegend":true,"colors":["#0078d4","#d13438"]}'
          .data=${generateSalesData()}
          height="500px"
        ></spectrum-chart>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Simple single-chart dashboard for focused data visualization.
Ideal for:
- Single metric monitoring
- Trend analysis
- Quick data insights
- Embedded visualizations
        `
      }
    }
  }
};

/**
 * Gallery of all available chart types.
 * Demonstrates the variety of visualizations supported by the dashboard.
 */
export const ChartTypeShowcase: Story = {
  render: () => {
    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-dim); border-radius: 12px;">
        <h2 style="margin: 0 0 2rem 0; color: var(--spectrum-sys-color-on-surface); text-align: center;">
          Chart Type Showcase
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          <!-- Line Chart -->
          <spectrum-chart
            type="line"
            config='{"title":"Line Chart","showLegend":true}'
            .data=${generateSalesData()}
            height="350px"
          ></spectrum-chart>
          
          <!-- Bar Chart -->
          <spectrum-chart
            type="bar"
            config='{"title":"Bar Chart","showLegend":true}'
            .data=${generateCategoryData()}
            height="350px"
          ></spectrum-chart>
          
          <!-- Pie Chart -->
          <spectrum-chart
            type="pie"
            config='{"title":"Pie Chart","showLegend":false}'
            .data=${generateRegionalData()}
            height="350px"
          ></spectrum-chart>
          
          <!-- Doughnut Chart -->
          <spectrum-chart
            type="doughnut"
            config='{"title":"Doughnut Chart","showLegend":false}'
            .data=${generateRegionalData()}
            height="350px"
          ></spectrum-chart>
          
          <!-- Radar Chart -->
          <spectrum-chart
            type="radar"
            config='{"title":"Radar Chart","showLegend":false}'
            .data=${generatePerformanceData()}
            height="350px"
          ></spectrum-chart>
          
          <!-- Polar Area Chart -->
          <spectrum-chart
            type="polarArea"
            config='{"title":"Polar Area Chart","showLegend":false}'
            .data=${generateRegionalData()}
            height="350px"
          ></spectrum-chart>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete showcase of all chart types supported:

**Chart Types:**
- **Line**: Trends over time
- **Bar**: Category comparisons
- **Pie**: Part-to-whole relationships
- **Doughnut**: Part-to-whole with center space
- **Radar**: Multi-dimensional data
- **Polar Area**: Circular category comparison

Each chart type is optimized for specific data visualization needs.
        `
      }
    }
  }
};

/**
 * Responsive dashboard that adapts to different screen sizes.
 * Demonstrates mobile-first design principles.
 */
export const ResponsiveDashboard: Story = {
  render: () => {
    return html`
      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
        <h2 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
          Responsive Dashboard
        </h2>
        <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
          Resize your browser window to see the dashboard adapt to different screen sizes.
        </p>
        
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        ">
          <spectrum-chart
            type="line"
            config='{"title":"Revenue","showLegend":true,"maintainAspectRatio":true}'
            .data=${generateSalesData()}
            height="300px"
          ></spectrum-chart>
          
          <spectrum-chart
            type="bar"
            config='{"title":"Categories","showLegend":true,"maintainAspectRatio":true}'
            .data=${generateCategoryData()}
            height="300px"
          ></spectrum-chart>
          
          <spectrum-chart
            type="pie"
            config='{"title":"Regions","showLegend":true,"legendPosition":"bottom","maintainAspectRatio":true}'
            .data=${generateRegionalData()}
            height="300px"
          ></spectrum-chart>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Responsive dashboard using CSS Grid's \`auto-fit\` and \`minmax\` for automatic layout adaptation.

**Responsive Features:**
- Auto-adjusts columns based on available space
- Maintains minimum widget size (300px)
- Gracefully stacks on mobile devices
- Preserves chart readability at all sizes

Try resizing your browser to see the layout adapt!
        `
      }
    },
    viewport: {
      defaultViewport: 'responsive'
    }
  }
};

/**
 * Dark mode dashboard demonstrating theme integration.
 */
export const DarkModeDashboard: Story = {
  render: () => {
    return html`
      <div style="
        padding: 2rem;
        background: #1a1a1a;
        border-radius: 12px;
        min-height: 600px;
        color: white;
      ">
        <div style="
          padding: 2rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);
          border-radius: 12px;
          margin-bottom: 2rem;
          text-align: center;
        ">
          <h1 style="margin: 0 0 0.5rem 0; font-size: 2rem;">Dark Mode Dashboard</h1>
          <p style="margin: 0; opacity: 0.9;">Fully themed for dark environments</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          <spectrum-chart
            type="line"
            config='{"title":"Revenue Trend","showLegend":true,"colors":["#60a5fa","#f472b6"]}'
            .data=${generateSalesData()}
            height="350px"
          ></spectrum-chart>
          
          <spectrum-chart
            type="bar"
            config='{"title":"Category Performance","showLegend":true,"stacked":true}'
            .data=${generateCategoryData()}
            height="350px"
          ></spectrum-chart>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Dashboard with dark theme support using Spectrum design tokens.

**Dark Mode Features:**
- Automatic color scheme adaptation
- High contrast for readability
- Reduced eye strain
- Professional appearance
- Battery savings on OLED displays

The dashboard respects \`prefers-color-scheme: dark\` and custom theme settings.
        `
      }
    },
    backgrounds: {
      default: 'dark'
    }
  }
};

/**
 * Dashboard with filter panel and data table demonstrating cross-widget communication.
 */
export const FiltersAndTable: Story = {
  render: (args, context) => {
    // Generate mock sales data for the table
    const allSalesData = [
      { id: 1, product: 'Laptop Pro', region: 'NA', category: 'Electronics', price: 1299.99, units: 45, revenue: 58499.55, date: '2024-01-15', inStock: true },
      { id: 2, product: 'Wireless Mouse', region: 'EU', category: 'Electronics', price: 29.99, units: 230, revenue: 6897.70, date: '2024-01-16', inStock: true },
      { id: 3, product: 'Office Chair', region: 'NA', category: 'Furniture', price: 399.00, units: 67, revenue: 26733.00, date: '2024-01-17', inStock: false },
      { id: 4, product: 'Desk Lamp', region: 'APAC', category: 'Furniture', price: 59.99, units: 120, revenue: 7198.80, date: '2024-01-18', inStock: true },
      { id: 5, product: 'Notebook Set', region: 'EU', category: 'Stationery', price: 12.99, units: 450, revenue: 5845.50, date: '2024-01-19', inStock: true },
      { id: 6, product: 'USB Hub', region: 'NA', category: 'Electronics', price: 39.99, units: 180, revenue: 7198.20, date: '2024-01-20', inStock: true },
      { id: 7, product: 'Monitor Stand', region: 'APAC', category: 'Furniture', price: 79.99, units: 95, revenue: 7599.05, date: '2024-01-21', inStock: false },
      { id: 8, product: 'Pen Pack', region: 'EU', category: 'Stationery', price: 8.99, units: 600, revenue: 5394.00, date: '2024-01-22', inStock: true },
      { id: 9, product: 'Keyboard', region: 'NA', category: 'Electronics', price: 89.99, units: 156, revenue: 14038.44, date: '2024-01-23', inStock: true },
      { id: 10, product: 'Desk Organizer', region: 'APAC', category: 'Furniture', price: 24.99, units: 210, revenue: 5247.90, date: '2024-01-24', inStock: true },
      { id: 11, product: 'Webcam HD', region: 'EU', category: 'Electronics', price: 79.99, units: 89, revenue: 7119.11, date: '2024-01-25', inStock: false },
      { id: 12, product: 'Sticky Notes', region: 'NA', category: 'Stationery', price: 4.99, units: 800, revenue: 3992.00, date: '2024-01-26', inStock: true },
    ];

    const tableColumns = [
      { key: 'product', label: 'Product', sortable: true },
      { key: 'region', label: 'Region', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'price', label: 'Price', format: 'currency', sortable: true, align: 'right' },
      { key: 'units', label: 'Units', format: 'number', sortable: true, align: 'right' },
      { key: 'revenue', label: 'Revenue', format: 'currency', sortable: true, align: 'right' },
      { key: 'date', label: 'Date', format: 'date', sortable: true },
      { key: 'inStock', label: 'In Stock', format: 'boolean', sortable: true, align: 'center' },
    ];

    // Helper function to filter data
    const filterData = (filters: any) => {
      let filtered = [...allSalesData];
      
      // Filter by region
      if (filters.region && filters.region !== '') {
        filtered = filtered.filter(item => item.region === filters.region);
      }
      
      // Filter by category (multi-select)
      if (filters.category && Array.isArray(filters.category) && filters.category.length > 0) {
        filtered = filtered.filter(item => filters.category.includes(item.category));
      }
      
      // Filter by in stock
      if (filters.inStock === true) {
        filtered = filtered.filter(item => item.inStock === true);
      }
      
      return filtered;
    };

    // Create unique IDs
    const tableId = 'sales-table-' + Math.random().toString(36).substr(2, 9);
    const counterSpanId = 'counter-' + Math.random().toString(36).substr(2, 9);
    
    // Helper to update table
    const updateTable = async (newData: any[], _filterLabel: string) => {
      // Small delay to ensure DOM is ready
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const tableElement = document.getElementById(tableId) as any;
      const counterElement = document.getElementById(counterSpanId);
      
      if (tableElement) {
        // Update the data prop
        tableElement.data = newData;
        
        // Call the refresh method to force re-parse
        if (typeof tableElement.refresh === 'function') {
          await tableElement.refresh();
        }
        
        // Update the counter in the heading
        if (counterElement) {
          const recordCount = newData.length + ' of ' + allSalesData.length + ' records';
          counterElement.textContent = '(' + recordCount + ')';
        }
      }
    };
    
    // Event handlers
    const handleFilterApply = async (e: CustomEvent) => {
      const filteredData = filterData(e.detail);
      await updateTable(filteredData, 'Filter Apply');
    };
    
    const handleFilterReset = async () => {
      await updateTable([...allSalesData], 'Filter Reset');
    };

    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
        ${renderHeaderWidget('Sales Dashboard', 'Filter and analyze sales data')}
        
        <!-- Filter Panel -->
        <div style="margin-top: 2rem; background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px;">
          <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); font-size: 1rem;">Filters</h3>
          <spectrum-filter-panel
            .filters=${[
              {
                id: 'region',
                type: 'select',
                label: 'Region',
                options: [
                  { label: 'All Regions', value: '' },
                  { label: 'North America', value: 'NA' },
                  { label: 'Europe', value: 'EU' },
                  { label: 'Asia Pacific', value: 'APAC' },
                ],
              },
              {
                id: 'category',
                type: 'multiSelect',
                label: 'Categories',
                options: [
                  { label: 'Electronics', value: 'Electronics' },
                  { label: 'Furniture', value: 'Furniture' },
                  { label: 'Stationery', value: 'Stationery' },
                ],
              },
              {
                id: 'inStock',
                type: 'checkbox',
                label: 'In Stock Only',
                defaultValue: false,
              },
            ]}
            layout="horizontal"
            .showButtons=${true}
            .immediate=${false}
            .debug=${true}
            @filterApply=${handleFilterApply}
            @filterReset=${handleFilterReset}
          ></spectrum-filter-panel>
        </div>
        
        <!-- Data Table -->
        <div style="margin-top: 1.5rem; background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px;">
          <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); font-size: 1rem;">
            Sales Data 
            <span id="${counterSpanId}" style="font-weight: normal; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">
              (${allSalesData.length} of ${allSalesData.length} records)
            </span>
          </h3>
          <spectrum-data-table
            id="${tableId}"
            .data=${allSalesData}
            .columns=${tableColumns}
            .sortable=${true}
            .pageable=${true}
            .pageSize=${5}
            .selectable=${true}
          ></spectrum-data-table>
        </div>
        
        <!-- Info Box -->
        <div style="margin-top: 1.5rem; color: var(--spectrum-sys-color-on-surface-variant); padding: 1rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
          <p style="margin: 0 0 0.5rem 0; font-weight: 600;">💡 Interactive Demo</p>
          <p style="margin: 0; font-size: 0.875rem;">
            Use the filters above to filter the table data. Select a region, categories, or check "In Stock Only" and click "Apply Filters".
            The table will update to show only matching records. Check the console for detailed filter logs.
          </p>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
            In a real dashboard, filters would publish to the dashboard store and the table would subscribe to filter changes,
            automatically refreshing its data through the DataSourceManager.
          </p>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates filter panel and data table working together with cross-widget communication.

**How it works:**
1. Filter panel captures user selections
2. Filters are applied when user clicks "Apply Filters"
3. Table data is filtered based on selected criteria
4. Console logs show the filter events for debugging

**In a real dashboard:**
- Filter panel publishes changes to dashboard store
- Table subscribes to filter changes via \`filtering.subscribe\`
- DataSourceManager handles data fetching with filters
- Supports both client-side and server-side filtering
        `,
      },
    },
  },
};

/**
 * Complete dashboard with filters, table, and charts showing full integration.
 */
export const CompleteDashboard: Story = {
  render: () => {
    // This story demonstrates manual composition with embedded data
    // See CompleteDashboardFromURL for data fetched from external source
    const allSalesData = [
      { id: 1, product: 'Laptop Pro', region: 'NA', category: 'Electronics', price: 1299.99, units: 45, revenue: 58499.55, date: '2024-01-15', inStock: true },
      { id: 2, product: 'Wireless Mouse', region: 'EU', category: 'Electronics', price: 29.99, units: 230, revenue: 6897.70, date: '2024-01-16', inStock: true },
      { id: 3, product: 'Office Chair', region: 'NA', category: 'Furniture', price: 399.00, units: 67, revenue: 26733.00, date: '2024-01-17', inStock: false },
      { id: 4, product: 'Desk Lamp', region: 'APAC', category: 'Furniture', price: 59.99, units: 120, revenue: 7198.80, date: '2024-01-18', inStock: true },
      { id: 5, product: 'Notebook Set', region: 'EU', category: 'Stationery', price: 12.99, units: 450, revenue: 5845.50, date: '2024-01-19', inStock: true },
      { id: 6, product: 'USB Hub', region: 'NA', category: 'Electronics', price: 39.99, units: 180, revenue: 7198.20, date: '2024-01-20', inStock: true },
      { id: 7, product: 'Monitor Stand', region: 'APAC', category: 'Furniture', price: 79.99, units: 95, revenue: 7599.05, date: '2024-01-21', inStock: false },
      { id: 8, product: 'Pen Pack', region: 'EU', category: 'Stationery', price: 8.99, units: 600, revenue: 5394.00, date: '2024-01-22', inStock: true },
    ];

    const tableColumns = [
      { key: 'product', label: 'Product', sortable: true },
      { key: 'region', label: 'Region', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'revenue', label: 'Revenue', format: 'currency', sortable: true, align: 'right' },
      { key: 'units', label: 'Units', format: 'number', sortable: true, align: 'right' },
      { key: 'inStock', label: 'Stock', format: 'boolean', sortable: true, align: 'center' },
    ];

    // Helper function to filter data
    const filterData = (filters: any) => {
      let filtered = [...allSalesData];
      
      // Filter by region
      if (filters.region && filters.region !== '') {
        filtered = filtered.filter(item => item.region === filters.region);
      }
      
      // Filter by category
      if (filters.category && filters.category !== '') {
        filtered = filtered.filter(item => item.category === filters.category);
      }
      
      // Filter by date range
      if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
      
      return filtered;
    };

    // Create unique IDs
    const tableId = 'complete-dashboard-table-' + Math.random().toString(36).substr(2, 9);
    const counterSpanId = 'complete-counter-' + Math.random().toString(36).substr(2, 9);
    const lineChartId = 'line-chart-' + Math.random().toString(36).substr(2, 9);
    const pieChartId = 'pie-chart-' + Math.random().toString(36).substr(2, 9);
    
    // Helper to generate line chart data from filtered data
    const generateLineChartData = (data: any[]) => {
      // Group by date and sum revenue
      const revenueByDate = data.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += item.revenue;
        return acc;
      }, {} as Record<string, number>);
      
      // Sort by date
      const sortedDates = Object.keys(revenueByDate).sort();
      
      return {
        labels: sortedDates.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [{
          label: 'Revenue',
          data: sortedDates.map(date => revenueByDate[date]),
        }]
      };
    };
    
    // Helper to generate pie chart data from filtered data
    const generatePieChartData = (data: any[]) => {
      // Group by region and sum revenue
      const revenueByRegion = data.reduce((acc, item) => {
        const region = item.region;
        if (!acc[region]) {
          acc[region] = 0;
        }
        acc[region] += item.revenue;
        return acc;
      }, {} as Record<string, number>);
      
      const regionNames: Record<string, string> = {
        'NA': 'North America',
        'EU': 'Europe',
        'APAC': 'Asia Pacific'
      };
      
      return {
        labels: Object.keys(revenueByRegion).map(key => regionNames[key] || key),
        datasets: [{
          label: 'Revenue by Region',
          data: Object.values(revenueByRegion),
        }]
      };
    };
    
    // Helper to update table
    const updateTable = async (newData: any[]) => {
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const tableElement = document.getElementById(tableId) as any;
      const counterElement = document.getElementById(counterSpanId);
      const lineChartElement = document.getElementById(lineChartId) as any;
      const pieChartElement = document.getElementById(pieChartId) as any;
      
      // Update table
      if (tableElement) {
        tableElement.data = newData;
        
        if (typeof tableElement.refresh === 'function') {
          await tableElement.refresh();
        }
        
        if (counterElement) {
          const recordCount = newData.length + ' of ' + allSalesData.length + ' records';
          counterElement.textContent = '(' + recordCount + ')';
        }
      }
      
      // Update line chart
      if (lineChartElement) {
        const lineChartData = generateLineChartData(newData);
        lineChartElement.data = lineChartData;
      }
      
      // Update pie chart
      if (pieChartElement) {
        const pieChartData = generatePieChartData(newData);
        pieChartElement.data = pieChartData;
      }
    };
    
    // Event handler for immediate filter changes
    const handleFilterChange = async (e: CustomEvent) => {
      const filteredData = filterData(e.detail);
      await updateTable(filteredData);
    };

    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-dim); border-radius: 12px; min-height: 800px;">
        ${renderHeaderWidget('Analytics Dashboard', 'Complete dashboard with filters, charts, and data table')}
        
        <!-- Filters -->
        <div style="margin-top: 2rem; background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px;">
          <spectrum-filter-panel
            .filters=${[
              {
                id: 'region',
                type: 'select',
                label: 'Region',
                options: [
                  { label: 'All Regions', value: '' },
                  { label: 'North America', value: 'NA' },
                  { label: 'Europe', value: 'EU' },
                  { label: 'Asia Pacific', value: 'APAC' },
                ],
              },
              {
                id: 'category',
                type: 'select',
                label: 'Category',
                options: [
                  { label: 'All Categories', value: '' },
                  { label: 'Electronics', value: 'Electronics' },
                  { label: 'Furniture', value: 'Furniture' },
                  { label: 'Stationery', value: 'Stationery' },
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
            ]}
            layout="horizontal"
            .immediate=${true}
            .showButtons=${false}
            .debug=${true}
            @filterChange=${handleFilterChange}
          ></spectrum-filter-panel>
        </div>
        
        <!-- Charts Row -->
        <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
          <div style="background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px;">
            <spectrum-chart
              id="${lineChartId}"
              type="line"
              config='{"title":"Revenue Trend","xAxisLabel":"Date","yAxisLabel":"Revenue ($)","valueFormat":"currency","showLegend":true}'
              .data=${generateLineChartData(allSalesData)}
              height="300px"
            ></spectrum-chart>
          </div>
          
          <div style="background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px;">
            <spectrum-chart
              id="${pieChartId}"
              type="pie"
              config='{"title":"Sales by Region","showLegend":true,"legendPosition":"right"}'
              .data=${generatePieChartData(allSalesData)}
              height="300px"
            ></spectrum-chart>
          </div>
        </div>
        
        <!-- Data Table -->
        <div style="margin-top: 1.5rem; background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px;">
          <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">
            Detailed Sales Data
            <span id="${counterSpanId}" style="font-weight: normal; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant); margin-left: 0.5rem;">
              (${allSalesData.length} of ${allSalesData.length} records)
            </span>
          </h3>
          <spectrum-data-table
            id="${tableId}"
            .data=${allSalesData}
            .columns=${tableColumns}
            .sortable=${true}
            .pageable=${true}
            .pageSize=${5}
            .selectable=${false}
            .debug=${true}
            .config=${{ striped: true, hoverable: true, bordered: true }}
          ></spectrum-data-table>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
A complete dashboard showing filters, charts, and a data table working together with **live filtering**.

**Dashboard Features:**
- **Filter Panel**: Immediate mode - filters apply automatically on change (no Apply button)
- **Live Filtering**: Table updates in real-time as you change filter values
- **Charts**: Line chart and pie chart for visual insights
- **Data Table**: Sortable, paginated table with formatted values and dynamic record count
- **Responsive Layout**: CSS Grid adapts to different screen sizes

**Try It:**
- Select a **Region** - table updates immediately
- Select a **Category** - table filters by category
- Adjust **Date Range** - table shows only matching dates
- Watch the record count update as filters are applied

**Integration:**
In a production dashboard, all widgets would share the same data source and respond to filter changes automatically through the dashboard store and DataSourceManager.
        `,
      },
    },
  },
};

/**
 * Complete dashboard with data fetched from external URL.
 * Demonstrates JSON-driven configuration with DataSourceManager.
 */
export const CompleteDashboardFromURL: Story = {
  render: () => {
    const dashboardConfig = {
      id: 'complete-dashboard-from-url',
      title: 'Analytics Dashboard',
      description: 'Dashboard with data fetched from external source',
      dataSources: {
        salesData: {
          id: 'salesData',
          endpoint: '/data/sales-data.json',
          method: 'GET',
          refreshInterval: 60000
        }
      },
      layout: {
        template: [
          'filters filters',
          'revenue-chart region-chart',
          'table table'
        ],
        columns: 'repeat(2, 1fr)',
        rows: 'auto 300px 1fr',
        gap: '1.5rem'
      },
      widgets: {
        'filters': {
          component: 'filter-panel',
          uiConfig: {
            layout: 'horizontal',
            immediate: true,
            showButtons: false,
            filters: [
              {
                id: 'region',
                type: 'select',
                label: 'Region',
                options: [
                  { label: 'All Regions', value: '' },
                  { label: 'North America', value: 'NA' },
                  { label: 'Europe', value: 'EU' },
                  { label: 'Asia Pacific', value: 'APAC' }
                ]
              },
              {
                id: 'category',
                type: 'select',
                label: 'Category',
                options: [
                  { label: 'All Categories', value: '' },
                  { label: 'Electronics', value: 'Electronics' },
                  { label: 'Furniture', value: 'Furniture' },
                  { label: 'Stationery', value: 'Stationery' }
                ]
              }
            ]
          }
        },
        'revenue-chart': {
          component: 'line-chart',
          dataSourceId: 'salesData',
          uiConfig: {
            chartType: 'line',
            title: 'Revenue Trend',
            labelField: 'product',
            valueField: 'revenue',
            datasetLabel: 'Revenue ($)',
            height: '300px',
            showLegend: true
          }
        },
        'region-chart': {
          component: 'pie-chart',
          dataSourceId: 'salesData',
          uiConfig: {
            chartType: 'pie',
            title: 'Sales by Product',
            labelField: 'product',
            valueField: 'revenue',
            height: '300px',
            showLegend: true,
            legendPosition: 'right'
          }
        },
        'table': {
          component: 'data-table',
          dataSourceId: 'salesData',
          uiConfig: {
            columns: [
              { key: 'product', label: 'Product', sortable: true },
              { key: 'region', label: 'Region', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'revenue', label: 'Revenue', format: 'currency', sortable: true, align: 'right' },
              { key: 'units', label: 'Units', format: 'number', sortable: true, align: 'right' },
              { key: 'inStock', label: 'Stock', format: 'boolean', sortable: true, align: 'center' }
            ],
            sortable: true,
            pageable: true,
            pageSize: 10,
            selectable: false,
            striped: true,
            hoverable: true,
            bordered: true
          }
        }
      }
    };

    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px; min-height: 800px;">
        ${renderHeaderWidget('Analytics Dashboard', 'Data fetched from /data/sales-data.json')}
        
        <div style="margin-top: 1.5rem;">
          <spectrum-dashboard
            .config=${dashboardConfig}
            debug=${true}
          ></spectrum-dashboard>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete dashboard with data fetched from an **external URL** (\`/data/sales-data.json\`).

**Key Features:**
- **JSON-Driven Configuration**: Entire dashboard defined via JSON
- **DataSourceManager**: Automatic data fetching, caching, and deduplication
- **URL-Based Data**: Fetches data from \`/data/sales-data.json\`
- **Data Transformation**: Extracts data from \`response.data\` path
- **Automatic Filtering**: All widgets connected to shared filter state
- **Loading States**: Built-in loading indicators during data fetch

**Data Source Configuration:**
~~~json
{
  "dataSources": {
    "salesData": {
      "url": "/data/sales-data.json",
      "method": "GET",
      "cache": true,
      "transform": {
        "path": "data"
      }
    }
  }
}
~~~

**Widget Configuration:**
Each widget references the \`salesData\` source:
~~~json
{
  "id": "sales-table",
  "dataSource": "salesData",
  "component": "data-table",
  "config": { /* widget options */ }
}
~~~

**Production Usage:**
In production, replace \`/data/sales-data.json\` with your API endpoint:
~~~json
{
  "url": "https://api.example.com/sales",
  "headers": {
    "Authorization": "Bearer $TOKEN"
  },
  "refreshInterval": 60000
}
~~~

This demonstrates the **recommended approach** for production dashboards:
1. Define dashboard in JSON configuration
2. Fetch data from API endpoints
3. Let DataSourceManager handle caching and updates
4. All widgets automatically refresh when data changes
        `,
      },
    },
  },
};

// =================================================================
// DRILL-DOWN PATTERN STORIES
// =================================================================

/**
 * ## Drill-Down: Cross-Filter Pattern
 * 
 * Demonstrates cross-widget filtering where clicking a chart segment filters the table.
 * This is the most common drill-down pattern for data exploration.
 */
export const DrillDownCrossFilter: StoryObj<SpectrumDashboardArgs> = {
  args: {
    debug: false,
    context: {},
  },
  render: (args) => {
    // Generate data for the example
    const generateRegionalData = () => {
      return [
        { region: 'North America', revenue: 125000, units: 850, category: 'Electronics' },
        { region: 'North America', revenue: 85000, units: 620, category: 'Clothing' },
        { region: 'North America', revenue: 65000, units: 430, category: 'Home' },
        { region: 'Europe', revenue: 95000, units: 710, category: 'Electronics' },
        { region: 'Europe', revenue: 72000, units: 540, category: 'Clothing' },
        { region: 'Europe', revenue: 54000, units: 380, category: 'Home' },
        { region: 'Asia Pacific', revenue: 145000, units: 1050, category: 'Electronics' },
        { region: 'Asia Pacific', revenue: 92000, units: 680, category: 'Clothing' },
        { region: 'Asia Pacific', revenue: 71000, units: 490, category: 'Home' },
      ];
    };
    
    const allData = generateRegionalData();
    
    // Calculate chart data from raw data
    const generatePieChartData = (data: any[]) => {
      const regionTotals: Record<string, number> = {};
      data.forEach(row => {
        regionTotals[row.region] = (regionTotals[row.region] || 0) + row.revenue;
      });
      
      // Define colors for different regions
      const colors = [
        'rgba(59, 130, 246, 0.8)',   // Blue
        'rgba(16, 185, 129, 0.8)',   // Green
        'rgba(251, 146, 60, 0.8)',   // Orange
        'rgba(139, 92, 246, 0.8)',   // Purple
        'rgba(236, 72, 153, 0.8)',   // Pink
        'rgba(245, 158, 11, 0.8)',   // Amber
      ];
      
      return {
        labels: Object.keys(regionTotals),
        datasets: [{
          label: 'Revenue by Region',
          data: Object.values(regionTotals),
          backgroundColor: colors,
          borderColor: colors.map(c => c.replace('0.8', '1')),
          borderWidth: 2,
        }],
      };
    };
    
    let currentData = [...allData];
    let selectedRegion: string | null = null;
    
    // Handle chart click - cross-filter pattern
    const handleChartClick = (event: CustomEvent) => {
      selectedRegion = event.detail.label;
      
      // Filter data by region
      currentData = allData.filter(row => row.region === selectedRegion);
      
      // Update table
      const table = document.querySelector('#drill-down-table');
      if (table) {
        (table as any).data = currentData;
        (table as any).refresh();
      }
      
      // Update status message
      const status = document.querySelector('#filter-status');
      if (status) {
        status.textContent = `Filtered by: ${selectedRegion} (${currentData.length} records)`;
      }
    };
    
    // Reset filter
    const handleReset = () => {
      selectedRegion = null;
      currentData = [...allData];
      
      const table = document.querySelector('#drill-down-table');
      if (table) {
        (table as any).data = currentData;
        (table as any).refresh();
      }
      
      const status = document.querySelector('#filter-status');
      if (status) {
        status.textContent = `Showing all regions (${currentData.length} records)`;
      }
    };
    
    return html`
      <style>
        .drill-down-demo {
          padding: 2rem;
          background: var(--spectrum-sys-color-surface);
          border-radius: 8px;
        }
        .demo-header {
          margin-bottom: 2rem;
        }
        .demo-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--spectrum-sys-color-on-surface);
          margin: 0 0 0.5rem 0;
        }
        .demo-description {
          color: var(--spectrum-sys-color-on-surface-variant);
          margin: 0 0 1rem 0;
        }
        .filter-status {
          padding: 0.75rem 1rem;
          background: var(--spectrum-sys-color-primary-container);
          color: var(--spectrum-sys-color-on-primary-container);
          border-radius: 4px;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .demo-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          margin-top: 1rem;
        }
        .chart-section, .table-section {
          background: var(--spectrum-sys-color-surface-variant);
          padding: 1.5rem;
          border-radius: 8px;
        }
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }
        @media (max-width: 768px) {
          .demo-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      
      <div class="drill-down-demo">
        <div class="demo-header">
          <h2 class="demo-title">🎯 Cross-Filter Drill-Down</h2>
          <p class="demo-description">
            Click any segment in the pie chart to filter the table by that region.
            This demonstrates real-time cross-widget filtering.
          </p>
        </div>
        
        <div class="filter-status">
          <span id="filter-status">Showing all regions (${allData.length} records)</span>
          <spectrum-button 
            .variant=${'secondary'} 
            .size=${'small'}
            @click=${handleReset}>
            Reset Filter
          </spectrum-button>
        </div>
        
        <div class="demo-grid">
          <div class="chart-section">
            <h3 class="section-title">Revenue by Region</h3>
            <spectrum-chart
              .type=${'pie'}
              .data=${generatePieChartData(allData)}
              .config=${{ showLegend: true, animated: true }}
              .height=${'300px'}
              @elementClick=${handleChartClick}
            ></spectrum-chart>
          </div>
          
          <div class="table-section">
            <h3 class="section-title">Detailed Sales Data</h3>
            <spectrum-data-table
              id="drill-down-table"
              .data=${currentData}
              .columns=${[
                { key: 'region', label: 'Region' },
                { key: 'category', label: 'Category' },
                { key: 'revenue', label: 'Revenue', format: 'currency' },
                { key: 'units', label: 'Units Sold', format: 'number' },
              ]}
              .sortable=${true}
              .pageable=${true}
              .pageSize=${5}
              .config=${{ striped: true, hoverable: true }}
            ></spectrum-data-table>
          </div>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
### Cross-Filter Drill-Down Pattern

This pattern updates filters in the current dashboard based on user clicks. Perfect for data exploration.

**How It Works:**
1. User clicks a pie chart segment (e.g., "North America")
2. \`elementClick\` event is emitted with segment data
3. DrillDownManager processes the \`cross-filter\` action
4. DashboardStore filters are updated
5. Subscribed widgets (table) automatically refresh with filtered data

**Configuration:**
~~~json
{
  "drillDown": {
    "action": "cross-filter",
    "filterMappings": {
      "label": "region",    // Map chart label to region filter
      "value": "revenue"    // Optionally map value
    }
  }
}
~~~

**Use Cases:**
- Click chart to filter table
- Click map region to filter analytics
- Click category to narrow results
- Interactive data exploration

**Try It:**
- Click any region in the pie chart
- Watch the table filter in real-time
- Click "Reset Filter" to show all data again
        `,
      },
    },
  },
};

/**
 * ## Drill-Down: Hierarchical Navigation Pattern
 * 
 * Demonstrates drilling through levels of detail with breadcrumb trails.
 * Perfect for exploring hierarchical data like Region -> Product -> Customer.
 */
export const DrillDownHierarchicalNav: StoryObj<SpectrumDashboardArgs> = {
  args: {
    debug: false,
    context: {},
  },
  render: (args) => {
    // Mock data for products
    const productData = [
      { id: 'P001', name: 'Laptop Pro 15', category: 'Electronics', revenue: 58499.55, units: 45, margin: 28.5 },
      { id: 'P002', name: 'Wireless Mouse', category: 'Electronics', revenue: 6897.70, units: 230, margin: 42.3 },
      { id: 'P003', name: 'Office Chair', category: 'Furniture', revenue: 26733.00, units: 67, margin: 35.2 },
      { id: 'P004', name: 'Desk Lamp', category: 'Furniture', revenue: 7198.80, units: 120, margin: 38.7 },
      { id: 'P005', name: 'Notebook Set', category: 'Stationery', revenue: 5845.50, units: 450, margin: 55.1 },
      { id: 'P006', name: 'USB Hub 7-Port', category: 'Electronics', revenue: 7198.20, units: 180, margin: 31.4 },
    ];

    let currentView = 'overview';
    let selectedProduct: any = null;
    let breadcrumb = [{ label: 'Products Overview', view: 'overview' }];
    
    const handleProductClick = (event: CustomEvent) => {
      const row = event.detail.row;
      selectedProduct = row;
      currentView = 'detail';
      breadcrumb.push({ label: row.name, view: 'detail', product: row });
      
      updateView();
    };
    
    const handleBreadcrumbClick = (view: string) => {
      if (view === 'overview') {
        currentView = 'overview';
        selectedProduct = null;
        breadcrumb = [{ label: 'Products Overview', view: 'overview' }];
      }
      updateView();
    };
    
    const updateView = () => {
      const container = document.querySelector('#hierarchical-nav-container');
      if (!container) return;
      
      if (currentView === 'overview') {
        container.innerHTML = renderOverview();
      } else {
        container.innerHTML = renderDetailView(selectedProduct);
      }
      
      updateBreadcrumb();
    };
    
    const updateBreadcrumb = () => {
      const breadcrumbEl = document.querySelector('#nav-breadcrumb');
      if (!breadcrumbEl) return;
      
      breadcrumbEl.innerHTML = breadcrumb.map((crumb: any, idx: number) => {
        if (idx === breadcrumb.length - 1) {
          return '<span style="color: var(--spectrum-sys-color-on-surface-variant);">' + crumb.label + '</span>';
        }
        return '<a href="#" style="color: var(--spectrum-sys-color-primary); text-decoration: none;" data-view="' + crumb.view + '">' + crumb.label + '</a>';
      }).join(' <span style="color: var(--spectrum-sys-color-on-surface-variant);"> / </span> ');
      
      breadcrumbEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          handleBreadcrumbClick((e.target as HTMLElement).getAttribute('data-view') || 'overview');
        });
      });
    };
    
    const renderOverview = () => {
      return '<div><h3 style="margin: 0 0 1rem 0;">All Products</h3><p style="color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 1rem;">Click any product to view detailed information.</p></div>';
    };
    
    const renderDetailView = (product: any) => {
      if (!product) return '';
      
      return '<div style="background: var(--spectrum-sys-color-primary-container); padding: 2rem; border-radius: 8px; margin-top: 1rem;"><h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-primary-container);">' + product.name + '</h3><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 1.5rem;"><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-primary-container); opacity: 0.8;">Product ID</div><div style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">' + product.id + '</div></div><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-primary-container); opacity: 0.8;">Category</div><div style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">' + product.category + '</div></div><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-primary-container); opacity: 0.8;">Units Sold</div><div style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">' + product.units.toLocaleString() + '</div></div><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-primary-container); opacity: 0.8;">Revenue</div><div style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">$' + product.revenue.toLocaleString() + '</div></div><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-primary-container); opacity: 0.8;">Profit Margin</div><div style="font-size: 1.25rem; font-weight: 600; margin-top: 0.25rem;">' + product.margin.toFixed(1) + '%</div></div></div></div>';
    };
    
    return html`
      <style>
        .hierarchical-nav-demo {
          padding: 2rem;
          background: var(--spectrum-sys-color-surface);
          border-radius: 8px;
        }
        .breadcrumb-bar {
          padding: 1rem;
          background: var(--spectrum-sys-color-surface-container);
          border-radius: 4px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }
      </style>
      
      <div class="hierarchical-nav-demo">
        <div class="demo-header">
          <h2 class="demo-title">🗂️ Hierarchical Navigation Drill-Down</h2>
          <p class="demo-description">
            Click any product row to navigate to its detail view. Use breadcrumbs to navigate back.
          </p>
        </div>
        
        <div class="breadcrumb-bar">
          <div id="nav-breadcrumb">
            <span style="color: var(--spectrum-sys-color-on-surface-variant);">Products Overview</span>
          </div>
        </div>
        
        <div id="hierarchical-nav-container">
          <div>
            <h3 style="margin: 0 0 1rem 0;">All Products</h3>
            <p style="color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 1rem;">
              Click any product to view detailed information.
            </p>
          </div>
        </div>
        
        <spectrum-data-table
          .data=${productData}
          .columns=${[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Product Name' },
            { key: 'category', label: 'Category' },
            { key: 'revenue', label: 'Revenue', format: 'currency' },
            { key: 'units', label: 'Units', format: 'number' },
            { key: 'margin', label: 'Margin %', format: 'number' },
          ]}
          .sortable=${true}
          .pageable=${true}
          .pageSize=${10}
          .config=${{ striped: true, hoverable: true }}
          @rowClick=${handleProductClick}
        ></spectrum-data-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
### Hierarchical Navigation Drill-Down Pattern

Navigate through levels of detail with breadcrumb trails. Perfect for hierarchical data exploration.

**How It Works:**
1. User clicks a table row (product)
2. Dashboard navigates to detail view
3. Breadcrumb trail is updated with current location
4. User can click breadcrumb to navigate back
5. Context is preserved between views

**Configuration:**
~~~json
{
  "drillDown": {
    "action": "hierarchical-nav",
    "targetView": "product-detail-view",
    "breadcrumbLabel": "Product: {name}",
    "preserveFilters": true,
    "contextMapping": {
      "productId": "id",
      "productName": "name"
    }
  }
}
~~~

**Use Cases:**
- Product catalogs (Category -> Product -> Variant)
- Organizational charts (Company -> Department -> Employee)
- Geographic drill-downs (Region -> Country -> City)
- Customer journeys (Campaign -> Lead -> Opportunity)

**Try It:**
- Click any product row to view details
- Use breadcrumb to navigate back to overview
- Notice the context is preserved
        `,
      },
    },
  },
};

/**
 * ## Drill-Down: Detail Panel Pattern
 * 
 * Demonstrates showing a detail modal or panel without full navigation.
 * Perfect for quick detail views without losing context.
 */
export const DrillDownDetailPanel: StoryObj<SpectrumDashboardArgs> = {
  args: {
    debug: false,
    context: {},
  },
  render: (args) => {
    const customerData = [
      { id: 'C001', name: 'Acme Corp', email: 'contact@acme.com', revenue: 145000, status: 'Active', tier: 'Enterprise' },
      { id: 'C002', name: 'TechStart Inc', email: 'hello@techstart.io', revenue: 89000, status: 'Active', tier: 'Business' },
      { id: 'C003', name: 'Global Solutions', email: 'info@globalsol.com', revenue: 210000, status: 'Active', tier: 'Enterprise' },
      { id: 'C004', name: 'Small Biz LLC', email: 'support@smallbiz.com', revenue: 32000, status: 'Active', tier: 'Standard' },
      { id: 'C005', name: 'MegaTech Corp', email: 'sales@megatech.com', revenue: 475000, status: 'Active', tier: 'Enterprise' },
    ];
    
    const handleCustomerClick = (event: CustomEvent) => {
      const customer = event.detail.row;
      showDetailPanel(customer);
    };
    
    const showDetailPanel = (customer: any) => {
      const panel = document.querySelector('#detail-panel');
      const overlay = document.querySelector('#detail-overlay');
      if (!panel || !overlay) return;
      
      const closeBtn = '<button id="close-panel" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--spectrum-sys-color-on-surface);">×</button>';
      
      panel.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--spectrum-sys-color-outline);"><h3 style="margin: 0; font-size: 1.5rem;">' + customer.name + '</h3>' + closeBtn + '</div><div style="display: grid; gap: 1.5rem;"><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 0.25rem;">Customer ID</div><div style="font-size: 1.1rem; font-weight: 600;">' + customer.id + '</div></div><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 0.25rem;">Email</div><div style="font-size: 1.1rem;">' + customer.email + '</div></div><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;"><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 0.25rem;">Annual Revenue</div><div style="font-size: 1.25rem; font-weight: 600; color: var(--spectrum-sys-color-primary);">$' + customer.revenue.toLocaleString() + '</div></div><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 0.25rem;">Status</div><div style="font-size: 1.1rem;"><span style="padding: 0.25rem 0.75rem; background: var(--spectrum-sys-color-success-container); color: var(--spectrum-sys-color-on-success-container); border-radius: 12px; font-size: 0.875rem;">' + customer.status + '</span></div></div><div><div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 0.25rem;">Tier</div><div style="font-size: 1.1rem; font-weight: 600;">' + customer.tier + '</div></div></div></div>';
      
      (panel as HTMLElement).style.display = 'block';
      (overlay as HTMLElement).style.display = 'block';
      
      const closeBtnEl = document.querySelector('#close-panel');
      if (closeBtnEl) {
        closeBtnEl.addEventListener('click', hideDetailPanel);
      }
      
      overlay.addEventListener('click', hideDetailPanel);
    };
    
    const hideDetailPanel = () => {
      const panel = document.querySelector('#detail-panel');
      const overlay = document.querySelector('#detail-overlay');
      if (panel) (panel as HTMLElement).style.display = 'none';
      if (overlay) (overlay as HTMLElement).style.display = 'none';
    };
    
    return html`
      <style>
        .detail-panel-demo {
          padding: 2rem;
          background: var(--spectrum-sys-color-surface);
          border-radius: 8px;
          position: relative;
        }
        #detail-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        #detail-panel {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 600px;
          background: var(--spectrum-sys-color-surface);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          max-height: 80vh;
          overflow-y: auto;
        }
      </style>
      
      <div id="detail-overlay"></div>
      <div id="detail-panel"></div>
      
      <div class="detail-panel-demo">
        <div class="demo-header">
          <h2 class="demo-title">🔍 Detail Panel Drill-Down</h2>
          <p class="demo-description">
            Click any customer row to view details in a modal panel without leaving the current view.
          </p>
        </div>
        
        <spectrum-data-table
          .data=${customerData}
          .columns=${[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Customer Name' },
            { key: 'email', label: 'Email' },
            { key: 'tier', label: 'Tier' },
            { key: 'revenue', label: 'Annual Revenue', format: 'currency' },
            { key: 'status', label: 'Status' },
          ]}
          .sortable=${true}
          .pageable=${true}
          .pageSize=${10}
          .config=${{ striped: true, hoverable: true }}
          @rowClick=${handleCustomerClick}
        ></spectrum-data-table>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
### Detail Panel Drill-Down Pattern

Show details in a modal or side panel without full navigation. Perfect for quick views.

**How It Works:**
1. User clicks table row
2. Detail panel opens with customer information
3. No URL change or navigation
4. User can close panel to return to table
5. Context is maintained

**Configuration:**
~~~json
{
  "drillDown": {
    "action": "detail-panel",
    "detailPanel": {
      "title": "Customer Details",
      "component": "customer-detail-card",
      "width": "600px"
    },
    "contextMapping": {
      "customerId": "id",
      "customerName": "name"
    }
  }
}
~~~

**Use Cases:**
- Customer details in CRM
- Order details in e-commerce
- Transaction details in banking
- Profile quick views
- Document previews

**Try It:**
- Click any customer row
- View detailed information in the modal
- Click outside or the X button to close
- Notice you stay on the same page
        `,
      },
    },
  },
};

/**
 * ## Drill-Down: Dashboard Navigation Pattern
 * 
 * Demonstrates full navigation between different dashboard views.
 * Perfect for jumping between major analytical sections.
 */
export const DrillDownDashboardNav: StoryObj<SpectrumDashboardArgs> = {
  args: {
    debug: false,
    context: {},
  },
  render: (args) => {
    const kpiData = [
      { 
        id: 'revenue', 
        label: 'Total Revenue', 
        value: 1200000, 
        format: 'currency',
        icon: 'account_balance_wallet',
        variant: 'success',
        trend: { direction: 'up', value: '+12.5%', label: 'vs last month' },
        target: 'revenue-analytics' 
      },
      { 
        id: 'orders', 
        label: 'Total Orders', 
        value: 8534, 
        format: 'number',
        icon: 'shopping_cart',
        variant: 'default',
        trend: { direction: 'up', value: '+8.2%', label: 'vs last month' },
        target: 'orders-dashboard' 
      },
      { 
        id: 'customers', 
        label: 'New Customers', 
        value: 2145, 
        format: 'number',
        icon: 'person_add',
        variant: 'info',
        trend: { direction: 'up', value: '+15.3%', label: 'vs last month' },
        target: 'customer-analytics' 
      },
      { 
        id: 'conversion', 
        label: 'Conversion Rate', 
        value: 3.2, 
        format: 'percentage',
        icon: 'trending_down',
        variant: 'warning',
        trend: { direction: 'down', value: '-2.1%', label: 'vs last month', isPositive: false },
        target: 'conversion-funnel' 
      },
    ];
    
    let currentDashboard = 'overview';
    
    const handleKpiClick = (kpi: any) => {
      currentDashboard = kpi.target;
      updateDashboard();
    };
    
    const handleBackToOverview = () => {
      currentDashboard = 'overview';
      updateDashboard();
    };
    
    const updateDashboard = () => {
      const container = document.querySelector('#dashboard-nav-container') as HTMLElement;
      if (!container) return;
      
      if (currentDashboard === 'overview') {
        render(renderOverviewDashboard(), container);
      } else {
        render(renderDetailDashboard(currentDashboard), container);
      }
    };
    
    const renderOverviewDashboard = () => {
      return html`
        <div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
            ${kpiData.map(kpi => html`
              <spectrum-score-card
                .value=${kpi.value}
                .label=${kpi.label}
                .format=${kpi.format}
                .icon=${kpi.icon}
                .variant=${kpi.variant}
                .trend=${kpi.trend}
                size="large"
                style="cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; max-width: none;"
                @click=${() => handleKpiClick(kpi)}
                @mouseenter=${(e: Event) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                }}
                @mouseleave=${(e: Event) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '';
                }}
              >
                <div slot="" style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--spectrum-sys-color-primary); font-weight: 500;">
                  Click to view details →
                </div>
              </spectrum-score-card>
            `)}
          </div>
        </div>
      `;
    };
    
    const renderDetailDashboard = (dashboardId: string) => {
      const titles: Record<string, string> = {
        'revenue-analytics': 'Revenue Analytics Dashboard',
        'orders-dashboard': 'Orders Dashboard',
        'customer-analytics': 'Customer Analytics Dashboard',
        'conversion-funnel': 'Conversion Funnel Analysis'
      };
      
      return html`
        <div style="background: var(--spectrum-sys-color-primary-container); padding: 2rem; border-radius: 8px;">
          <button 
            @click=${handleBackToOverview}
            style="background: none; border: none; color: var(--spectrum-sys-color-on-primary-container); cursor: pointer; font-size: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            ← Back to Overview
          </button>
          <h2 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-primary-container);">
            ${titles[dashboardId] || 'Detail Dashboard'}
          </h2>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container); opacity: 0.9;">
            This would be a full dashboard view with charts, tables, and detailed analytics for ${dashboardId.replace('-', ' ')}.
          </p>
          <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.1); border-radius: 4px;">
            <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-primary-container);">
              Dashboard Features:
            </h3>
            <ul style="margin: 0.5rem 0; color: var(--spectrum-sys-color-on-primary-container);">
              <li>Detailed metrics and KPIs</li>
              <li>Interactive charts and visualizations</li>
              <li>Time-series analysis</li>
              <li>Drill-down capabilities</li>
              <li>Export and reporting tools</li>
            </ul>
          </div>
        </div>
      `;
    };
    
    // Initialize dashboard with overview on first render
    setTimeout(() => {
      updateDashboard();
    }, 0);
    
    return html`
      <style>
        .dashboard-nav-demo {
          padding: 2rem;
          background: var(--spectrum-sys-color-surface);
          border-radius: 8px;
        }
      </style>
      
      <div class="dashboard-nav-demo">
        <div class="demo-header">
          <h2 class="demo-title">🎛️ Dashboard Navigation Drill-Down</h2>
          <p class="demo-description">
            Click any KPI card to navigate to its dedicated dashboard view. Full dashboard transition.
          </p>
        </div>
        
        <div id="dashboard-nav-container">
          <!-- Content will be rendered dynamically -->
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
### Dashboard Navigation Drill-Down Pattern

Navigate between completely different dashboard views using interactive score cards. Perfect for jumping between analytical sections.

**Features:**
- Uses \`spectrum-score-card\` components with trends and variants
- Smooth hover animations and transitions
- Rich metric displays with icons and formatting
- Full dashboard navigation with context passing

**How It Works:**
1. User clicks score card
2. Full navigation to dedicated dashboard
3. Context passed to target dashboard
4. Back button returns to overview
5. URL updates for bookmarking

**Configuration:**
~~~json
{
  "widgets": {
    "revenue-card": {
      "component": "score-card",
      "uiConfig": {
        "label": "Total Revenue",
        "format": "currency",
        "icon": "account_balance_wallet",
        "variant": "success",
        "trend": {
          "direction": "up",
          "value": "+12.5%",
          "label": "vs last month"
        }
      },
      "drillDown": {
        "action": "dashboard-nav",
        "targetView": "revenue-analytics-dashboard",
        "contextMapping": {
          "metric": "metric",
          "period": "period"
        }
      }
    }
  }
}
~~~

**Use Cases:**
- Overview -> Detailed analytics
- Summary -> Deep-dive dashboards
- Cross-department navigation
- Multi-tenant dashboards
- Role-based dashboard switching

**Try It:**
- Hover over any score card to see the hover effect
- Click any score card to navigate to its dedicated dashboard
- Use Back to Overview button to return
- Notice the smooth transitions and professional card styling
        `,
      },
    },
  },
};

// =================================================================
// MAP DRILL-DOWN STORIES
// =================================================================

/**
 * Map Drill-Down with Leaflet
 * 
 * Demonstrates a 3-level drill-down pattern using Leaflet maps:
 * Level 1: Map with store markers (hover for popup, click to drill down)
 * Level 2: Store detail with score cards + transaction table
 * Level 3: Transaction detail with score cards + line items table
 */
export const MapDrillDownLeaflet: Story = {
  args: {
    config: '',
    context: {},
    debug: false,
  },
  render: (args) => {
    const containerId = 'map-leaflet-container';
    
    // Level 1: Overview Map Dashboard
    const overviewConfig: DashboardConfig = {
      id: 'store-map-overview',
      dataSources: {
        stores: {
          id: 'stores',
          endpoint: '/data/stores.json',
          method: 'GET',
          refreshInterval: 300000,
        },
      },
      layout: {
        template: [
          'map',
        ],
        columns: '1fr',
        rows: '600px',
        gap: '1.5rem',
      },
      widgets: {
        map: {
          component: 'map',
          dataSourceId: 'stores',
          uiConfig: {
            mapProvider: 'leaflet',
            center: [40.7128, -74.0060],
            zoom: 3,
            minZoom: 2,
            maxZoom: 18,
            basemap: 'streets',
            clustering: {
              enabled: true,
              radius: 80,
              maxZoom: 12,
              showCount: true,
            },
            controls: {
              zoom: true,
              scale: true,
              attribution: true,
            },
            labelField: 'name',
            valueField: 'revenue',
            markerConfig: {
              idField: 'id',
              positionField: 'position',
              tooltipField: 'tooltip',
              dataFields: ['id', 'name', 'region', 'city', 'storeType', 'revenue', 'units', 'employees', 'avgOrderValue'],
            },
          },
          drillDown: {
            action: 'dashboard-nav',
            targetView: 'store-detail',
            contextMapping: {
              storeId: 'id',
              storeName: 'name',
            },
          },
        },
      },
    };
    
    // Level 2: Store Detail Dashboard
    const storeDetailConfig: DashboardConfig = {
      id: 'store-detail',
      dataSources: {
        transactions: {
          id: 'transactions',
          endpoint: '/data/store-transactions.json',
          method: 'GET',
          refreshInterval: 60000,
        },
      },
      layout: {
        template: [
          'breadcrumb breadcrumb breadcrumb breadcrumb',
          'revenue units avgorder conversion',
          'transactions transactions transactions transactions',
        ],
        columns: '1fr 1fr 1fr 1fr',
        rows: 'auto auto 1fr',
        gap: '1.5rem',
      },
      widgets: {
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            showHome: false,
            items: [
              { label: 'Store Map', viewId: 'map-overview' },
              { label: 'Store Details', viewId: 'store-detail' },
            ],
          },
        },
        revenue: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Revenue',
            icon: 'account_balance_wallet',
            variant: 'success',
            size: 'medium',
            valuePrefix: '$',
            transform: 'sum(amount)',
          },
        },
        units: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Transactions',
            icon: 'receipt_long',
            variant: 'primary',
            size: 'medium',
            transform: 'count()',
          },
        },
        avgorder: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Avg Order',
            icon: 'shopping_cart',
            variant: 'info',
            size: 'medium',
            valuePrefix: '$',
            transform: 'avg(amount)',
          },
        },
        conversion: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Items/Order',
            icon: 'inventory_2',
            variant: 'warning',
            size: 'medium',
            transform: 'avg(items)',
          },
        },
        transactions: {
          component: 'data-table',
          dataSourceId: 'transactions',
          uiConfig: {
            columns: [
              { key: 'transactionDate', label: 'Date', sortable: true },
              { key: 'customer', label: 'Customer', sortable: true },
              { key: 'amount', label: 'Amount', format: 'currency', sortable: true, align: 'right' },
              { key: 'items', label: 'Items', format: 'number', sortable: true, align: 'right' },
              { key: 'paymentMethod', label: 'Payment', sortable: true },
              { key: 'status', label: 'Status', sortable: true },
            ],
            sortable: true,
            pageable: true,
            pageSize: 10,
            striped: true,
            hoverable: true,
            bordered: true,
          },
          drillDown: {
            action: 'dashboard-nav',
            targetView: 'transaction-detail',
            contextMapping: {
              transactionId: 'id',
              transactionAmount: 'amount',
            },
          },
        },
      },
    };
    
    // Level 3: Transaction Detail Dashboard
    const transactionDetailConfig: DashboardConfig = {
      id: 'transaction-detail',
      dataSources: {
        items: {
          id: 'items',
          endpoint: '/data/transaction-items.json',
          method: 'GET',
          refreshInterval: 60000,
        },
      },
      layout: {
        template: [
          'breadcrumb breadcrumb breadcrumb breadcrumb',
          'total items discount tax',
          'lineitems lineitems lineitems lineitems',
        ],
        columns: '1fr 1fr 1fr 1fr',
        rows: 'auto auto 1fr',
        gap: '1.5rem',
      },
      widgets: {
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            items: [
              { label: 'Store Map', action: 'back-to-overview' },
              { label: '{{storeName}}', action: 'back-to-store' },
              { label: 'Transaction #{{transactionId}}', active: true },
            ],
          },
        },
        total: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Total Amount',
            icon: 'payments',
            variant: 'success',
            size: 'medium',
            valuePrefix: '$',
            transform: 'sum(totalPrice)',
          },
        },
        items: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Total Items',
            icon: 'inventory',
            variant: 'primary',
            size: 'medium',
            transform: 'sum(quantity)',
          },
        },
        discount: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Total Discount',
            icon: 'local_offer',
            variant: 'warning',
            size: 'medium',
            valuePrefix: '$',
            transform: 'sum(discount)',
          },
        },
        tax: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Categories',
            icon: 'category',
            variant: 'info',
            size: 'medium',
            transform: 'countUnique(category)',
          },
        },
        lineitems: {
          component: 'data-table',
          dataSourceId: 'items',
          uiConfig: {
            columns: [
              { key: 'productName', label: 'Product', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'quantity', label: 'Qty', format: 'number', sortable: true, align: 'right' },
              { key: 'unitPrice', label: 'Unit Price', format: 'currency', sortable: true, align: 'right' },
              { key: 'discount', label: 'Discount', format: 'currency', sortable: true, align: 'right' },
              { key: 'totalPrice', label: 'Total', format: 'currency', sortable: true, align: 'right' },
            ],
            sortable: true,
            pageable: true,
            pageSize: 10,
            striped: true,
            hoverable: true,
            bordered: true,
          },
        },
      },
    };
    
    // State management
    let currentView = 'overview';
    let currentContext: any = {};
    
    // Helper to create store detail config with dynamic store name
    const createStoreDetailConfig = (): DashboardConfig => ({
      ...storeDetailConfig,
      widgets: {
        ...storeDetailConfig.widgets,
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            showHome: false,
            items: [
              { label: 'Store Map', viewId: 'map-overview' },
              { label: currentContext.storeName || 'Store Details', viewId: 'store-detail' },
            ],
          },
        },
      },
    });
    
    // Helper to create transaction detail config with dynamic breadcrumb
    const createTransactionDetailConfig = (): DashboardConfig => ({
      ...transactionDetailConfig,
      widgets: {
        ...transactionDetailConfig.widgets,
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            showHome: false,
            items: [
              { label: 'Store Map', viewId: 'map-overview' },
              { label: currentContext.storeName || 'Store', viewId: 'store-detail' },
              { label: 'Transaction ' + (currentContext.transactionId || ''), viewId: 'transaction-detail' },
            ],
          },
        },
      },
    });
    
    // Update dashboard function
    const updateDashboard = () => {
      const container = document.querySelector(`#${containerId}`) as HTMLElement;
      if (!container) return;
      
      let config: DashboardConfig;
      
      switch (currentView) {
        case 'store-detail':
          config = createStoreDetailConfig();
          break;
        case 'transaction-detail':
          config = createTransactionDetailConfig();
          break;
        default:
          config = overviewConfig;
      }
      
      render(html`
        <spectrum-dashboard
          .config=${config}
          .context=${currentContext}
          ?debug=${args.debug}
          @dashboardNav=${(e: CustomEvent) => {
            const detail = e.detail;
            const ctx = detail.context || {};
            
            // Extract context from detail.context (where drill-down manager puts it)
            if (detail.viewId === 'store-detail') {
              currentView = 'store-detail';
              currentContext = {
                storeId: ctx.storeId || detail.storeId || detail.id,
                storeName: ctx.storeName || detail.storeName || detail.name,
              };
              updateDashboard();
            } else if (detail.viewId === 'transaction-detail') {
              currentView = 'transaction-detail';
              currentContext = {
                ...currentContext,
                transactionId: ctx.transactionId || detail.transactionId || detail.id,
                transactionAmount: ctx.transactionAmount || detail.transactionAmount || detail.amount,
              };
              updateDashboard();
            }
          }}
          @breadcrumbClick=${(e: CustomEvent) => {
            const viewId = e.detail.viewId;
            
            if (viewId === 'map-overview') {
              currentView = 'overview';
              currentContext = {};
              updateDashboard();
            } else if (viewId === 'store-detail') {
              currentView = 'store-detail';
              delete currentContext.transactionId;
              delete currentContext.transactionAmount;
              updateDashboard();
            }
          }}
        ></spectrum-dashboard>
      `, container);
    };
    
    // Initial render
    setTimeout(() => updateDashboard(), 0);
    
    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); min-height: 100vh;">
        <div id=${containerId} style="height: 700px; width: 100%;"></div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
## Map Drill-Down with Leaflet

This story demonstrates a complete 3-level drill-down pattern using Leaflet maps:

### Level 1: Store Map Overview
- Interactive map with clustered store markers
- Hover over markers to see store summary
- Click markers to drill down to store details

### Level 2: Store Detail Dashboard
- Score cards showing revenue, transactions, avg order, items/order
- Transaction table with sortable columns
- Click table rows to drill down to transaction details

### Level 3: Transaction Detail Dashboard
- Score cards showing total amount, items, discount, categories
- Line items table showing product details
- Breadcrumb navigation to go back

### Features
- **Marker Clustering**: Stores are automatically clustered at lower zoom levels
- **Hover Popups**: Tooltips show store summary on hover
- **Click Drill-Down**: Click markers to navigate to store details
- **Breadcrumb Navigation**: Easy navigation back through levels
- **Dynamic Filtering**: Data automatically filtered by context

### Try It
1. Zoom out to see marker clusters
2. Zoom in to see individual stores
3. Hover over markers to see tooltips
4. Click a marker to view store details
5. Click a transaction row to see line items
6. Use breadcrumbs to navigate back
        `,
      },
    },
  },
};

/**
 * Map Drill-Down with MapLibre 3D
 * 
 * Same drill-down pattern as Leaflet but with MapLibre's 3D capabilities:
 * - 3D terrain with elevation
 * - 3D buildings (where available)
 * - Camera pitch for perspective view
 */
export const MapDrillDownMapLibre3D: Story = {
  args: {
    config: '',
    context: {},
    debug: false,
  },
  render: (args) => {
    const containerId = 'map-maplibre-container';
    
    // Level 1: Overview Map Dashboard with 3D
    const overviewConfig: DashboardConfig = {
      id: 'store-map-3d-overview',
      dataSources: {
        stores: {
          id: 'stores',
          endpoint: '/data/stores.json',
          method: 'GET',
          refreshInterval: 300000,
        },
      },
      layout: {
        template: [
          'map',
        ],
        columns: '1fr',
        rows: '600px',
        gap: '1.5rem',
      },
      widgets: {
        map: {
          component: 'map',
          dataSourceId: 'stores',
          uiConfig: {
            mapProvider: 'maplibre',
            center: [40.7128, -74.0060],
            zoom: 3,
            minZoom: 2,
            maxZoom: 18,
            pitch: 45,
            bearing: 0,
            basemap: 'streets',
            buildings3d: true,
            terrain: {
              enabled: true,
              exaggeration: 1.5,
            },
            controls: {
              zoom: true,
              scale: true,
              attribution: true,
            },
            labelField: 'name',
            valueField: 'revenue',
            markerConfig: {
              idField: 'id',
              positionField: 'position',
              tooltipField: 'tooltip',
              dataFields: ['id', 'name', 'region', 'city', 'storeType', 'revenue', 'units', 'employees', 'avgOrderValue'],
            },
          },
          drillDown: {
            action: 'dashboard-nav',
            targetView: 'store-detail',
            contextMapping: {
              storeId: 'id',
              storeName: 'name',
            },
          },
        },
      },
    };
    
    // Level 2 and 3 configs are identical to Leaflet story
    const storeDetailConfig: DashboardConfig = {
      id: 'store-detail',
      dataSources: {
        transactions: {
          id: 'transactions',
          endpoint: '/data/store-transactions.json',
          method: 'GET',
          refreshInterval: 60000,
        },
      },
      layout: {
        template: [
          'breadcrumb breadcrumb breadcrumb breadcrumb',
          'revenue units avgorder conversion',
          'transactions transactions transactions transactions',
        ],
        columns: '1fr 1fr 1fr 1fr',
        rows: 'auto auto 1fr',
        gap: '1.5rem',
      },
      widgets: {
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            items: [
              { label: 'Store Map (3D)', action: 'back-to-overview' },
              { label: '{{storeName}}', active: true },
            ],
          },
        },
        revenue: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Revenue',
            icon: 'account_balance_wallet',
            variant: 'success',
            size: 'medium',
            valuePrefix: '$',
            transform: 'sum(amount)',
          },
        },
        units: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Transactions',
            icon: 'receipt_long',
            variant: 'primary',
            size: 'medium',
            transform: 'count()',
          },
        },
        avgorder: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Avg Order',
            icon: 'shopping_cart',
            variant: 'info',
            size: 'medium',
            valuePrefix: '$',
            transform: 'avg(amount)',
          },
        },
        conversion: {
          component: 'score-card',
          dataSourceId: 'transactions',
          uiConfig: {
            label: 'Items/Order',
            icon: 'inventory_2',
            variant: 'warning',
            size: 'medium',
            transform: 'avg(items)',
          },
        },
        transactions: {
          component: 'data-table',
          dataSourceId: 'transactions',
          uiConfig: {
            columns: [
              { key: 'transactionDate', label: 'Date', sortable: true },
              { key: 'customer', label: 'Customer', sortable: true },
              { key: 'amount', label: 'Amount', format: 'currency', sortable: true, align: 'right' },
              { key: 'items', label: 'Items', format: 'number', sortable: true, align: 'right' },
              { key: 'paymentMethod', label: 'Payment', sortable: true },
              { key: 'status', label: 'Status', sortable: true },
            ],
            sortable: true,
            pageable: true,
            pageSize: 10,
            striped: true,
            hoverable: true,
            bordered: true,
          },
          drillDown: {
            action: 'dashboard-nav',
            targetView: 'transaction-detail',
            contextMapping: {
              transactionId: 'id',
              transactionAmount: 'amount',
            },
          },
        },
      },
    };
    
    const transactionDetailConfig: DashboardConfig = {
      id: 'transaction-detail',
      dataSources: {
        items: {
          id: 'items',
          endpoint: '/data/transaction-items.json',
          method: 'GET',
          refreshInterval: 60000,
        },
      },
      layout: {
        template: [
          'breadcrumb breadcrumb breadcrumb breadcrumb',
          'total items discount tax',
          'lineitems lineitems lineitems lineitems',
        ],
        columns: '1fr 1fr 1fr 1fr',
        rows: 'auto auto 1fr',
        gap: '1.5rem',
      },
      widgets: {
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            items: [
              { label: 'Store Map (3D)', action: 'back-to-overview' },
              { label: '{{storeName}}', action: 'back-to-store' },
              { label: 'Transaction #{{transactionId}}', active: true },
            ],
          },
        },
        total: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Total Amount',
            icon: 'payments',
            variant: 'success',
            size: 'medium',
            valuePrefix: '$',
            transform: 'sum(totalPrice)',
          },
        },
        items: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Total Items',
            icon: 'inventory',
            variant: 'primary',
            size: 'medium',
            transform: 'sum(quantity)',
          },
        },
        discount: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Total Discount',
            icon: 'local_offer',
            variant: 'warning',
            size: 'medium',
            valuePrefix: '$',
            transform: 'sum(discount)',
          },
        },
        tax: {
          component: 'score-card',
          dataSourceId: 'items',
          uiConfig: {
            label: 'Categories',
            icon: 'category',
            variant: 'info',
            size: 'medium',
            transform: 'countUnique(category)',
          },
        },
        lineitems: {
          component: 'data-table',
          dataSourceId: 'items',
          uiConfig: {
            columns: [
              { key: 'productName', label: 'Product', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'quantity', label: 'Qty', format: 'number', sortable: true, align: 'right' },
              { key: 'unitPrice', label: 'Unit Price', format: 'currency', sortable: true, align: 'right' },
              { key: 'discount', label: 'Discount', format: 'currency', sortable: true, align: 'right' },
              { key: 'totalPrice', label: 'Total', format: 'currency', sortable: true, align: 'right' },
            ],
            sortable: true,
            pageable: true,
            pageSize: 10,
            striped: true,
            hoverable: true,
            bordered: true,
          },
        },
      },
    };
    
    // State management
    let currentView = 'overview';
    let currentContext: any = {};
    
    // Helper to create store detail config with dynamic store name
    const createStoreDetailConfig = (): DashboardConfig => ({
      ...storeDetailConfig,
      widgets: {
        ...storeDetailConfig.widgets,
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            showHome: false,
            items: [
              { label: 'Store Map', viewId: 'map-overview' },
              { label: currentContext.storeName || 'Store Details', viewId: 'store-detail' },
            ],
          },
        },
      },
    });
    
    // Helper to create transaction detail config with dynamic breadcrumb
    const createTransactionDetailConfig = (): DashboardConfig => ({
      ...transactionDetailConfig,
      widgets: {
        ...transactionDetailConfig.widgets,
        breadcrumb: {
          component: 'breadcrumb',
          uiConfig: {
            showHome: false,
            items: [
              { label: 'Store Map', viewId: 'map-overview' },
              { label: currentContext.storeName || 'Store', viewId: 'store-detail' },
              { label: 'Transaction ' + (currentContext.transactionId || ''), viewId: 'transaction-detail' },
            ],
          },
        },
      },
    });
    
    // Update dashboard function
    const updateDashboard = () => {
      const container = document.querySelector(`#${containerId}`) as HTMLElement;
      if (!container) return;
      
      let config: DashboardConfig;
      
      switch (currentView) {
        case 'store-detail':
          config = createStoreDetailConfig();
          break;
        case 'transaction-detail':
          config = createTransactionDetailConfig();
          break;
        default:
          config = overviewConfig;
      }
      
      render(html`
        <spectrum-dashboard
          .config=${config}
          .context=${currentContext}
          ?debug=${args.debug}
          @dashboardNav=${(e: CustomEvent) => {
            const detail = e.detail;
            const ctx = detail.context || {};
            
            // Extract context from detail.context (where drill-down manager puts it)
            if (detail.viewId === 'store-detail') {
              currentView = 'store-detail';
              currentContext = {
                storeId: ctx.storeId || detail.storeId || detail.id,
                storeName: ctx.storeName || detail.storeName || detail.name,
              };
              updateDashboard();
            } else if (detail.viewId === 'transaction-detail') {
              currentView = 'transaction-detail';
              currentContext = {
                ...currentContext,
                transactionId: ctx.transactionId || detail.transactionId || detail.id,
                transactionAmount: ctx.transactionAmount || detail.transactionAmount || detail.amount,
              };
              updateDashboard();
            }
          }}
          @breadcrumbClick=${(e: CustomEvent) => {
            const viewId = e.detail.viewId;
            
            if (viewId === 'map-overview') {
              currentView = 'overview';
              currentContext = {};
              updateDashboard();
            } else if (viewId === 'store-detail') {
              currentView = 'store-detail';
              delete currentContext.transactionId;
              delete currentContext.transactionAmount;
              updateDashboard();
            }
          }}
        ></spectrum-dashboard>
      `, container);
    };
    
    // Initial render
    setTimeout(() => updateDashboard(), 0);
    
    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); min-height: 100vh;">
        <div id=${containerId} style="height: 700px; width: 100%;"></div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
## Map Drill-Down with MapLibre 3D

This story demonstrates the same 3-level drill-down pattern but with MapLibre's advanced 3D capabilities:

### 3D Features
- **Camera Pitch**: 45° angle provides perspective view
- **3D Terrain**: Elevation data with 1.5x exaggeration
- **3D Buildings**: Extruded building footprints (where available)
- **Smooth Transitions**: GPU-accelerated rendering

### Navigation
Same as Leaflet story:
1. Click markers to drill down to store details
2. Click transaction rows to see line items
3. Use breadcrumbs to navigate back

### Performance
- MapLibre uses GPU acceleration for smooth 3D rendering
- Vector tiles provide crisp visuals at all zoom levels
- Efficient marker rendering even with many stores

### Try It
1. Rotate the map by holding Ctrl/Cmd + dragging
2. Tilt the view with Ctrl/Cmd + up/down arrows
3. Zoom in to major cities to see 3D buildings
4. Notice the terrain elevation in mountainous areas
5. Click markers to drill down as normal
        `,
      },
    },
  },
};

/**
 * JSON-Only Multi-View Dashboard with Leaflet
 * 
 * This story demonstrates 100% JSON-configurable drill-down navigation.
 * No JavaScript event handlers required - all navigation is handled internally
 * by the spectrum-dashboard component based on the JSON configuration.
 */
export const JsonOnlyMultiViewLeaflet: Story = {
  args: {
    config: '',
    context: {},
    debug: false,
  },
  loaders: [
    async () => {
      const response = await fetch('/data/multi-view-dashboard.json');
      if (!response.ok) {
        throw new Error('Failed to load: HTTP ' + response.status);
      }
      const dashboardConfig = await response.json();
      return { dashboardConfig };
    }
  ],
  render: (args, { loaded: { dashboardConfig } }) => {
    if (!dashboardConfig) {
      return html`<div style="color: red; padding: 2rem;">Failed to load dashboard configuration</div>`;
    }
    
    const themeId = 'theme-leaflet-' + Math.random().toString(36).substr(2, 9);
    
    const handleDarkModeToggle = (e: CustomEvent) => {
      const theme = document.getElementById(themeId) as any;
      if (theme) {
        theme.dark = e.detail.checked;
      }
    };
    
    return html`
      <spectrum-theme id=${themeId} color="#0070d2">
        <div style="padding: 2rem; background: var(--spectrum-color-background); min-height: 100vh; transition: background 0.3s ease;">
          <!-- Theme Toggle -->
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; margin-bottom: 1rem; padding: 0.75rem 1rem; background: var(--spectrum-color-surface); border-radius: 8px;">
            <span style="color: var(--spectrum-color-on-surface); font-size: 0.875rem; font-family: var(--spectrum-sys-font-family);">
              <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle; margin-right: 4px;">light_mode</span>
              Light
            </span>
            <spectrum-switch 
              @switchChange=${handleDarkModeToggle}
              size="small"
            ></spectrum-switch>
            <span style="color: var(--spectrum-color-on-surface); font-size: 0.875rem; font-family: var(--spectrum-sys-font-family);">
              Dark
              <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle; margin-left: 4px;">dark_mode</span>
            </span>
          </div>
          
          <div style="height: 700px; width: 100%;">
            <spectrum-dashboard
              .config=${dashboardConfig}
              .context=${args.context}
              ?debug=${args.debug}
              style="height: 100%; width: 100%;"
            ></spectrum-dashboard>
          </div>
        </div>
      </spectrum-theme>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
## 100% JSON-Configurable Multi-View Dashboard

This story demonstrates a **completely JSON-driven** dashboard with drill-down navigation. 
**No JavaScript event handlers** are required - all navigation logic is handled internally by the component.

**Theme Toggle**: Use the switch in the top-right to toggle between light and dark mode.

### Key Features

1. **Multi-View Configuration**: Define multiple dashboard views in a single JSON file
2. **Automatic Navigation**: The dashboard handles \`dashboardNav\` events internally
3. **Auto-Generated Breadcrumbs**: Breadcrumb trail is automatically maintained
4. **Template Variables**: Use \`{{context.fieldName}}\` in breadcrumb labels

### Configuration Structure

~~~json
{
  "id": "store-analytics",
  "navigation": {
    "initialView": "overview",
    "enableBreadcrumbs": true
  },
  "sharedDataSources": { ... },
  "views": {
    "overview": { ... },
    "store-detail": { 
      "breadcrumbLabel": "{{context.storeName}}",
      ...
    },
    "transaction-detail": {
      "breadcrumbLabel": "Transaction #{{context.transactionId}}",
      ...
    }
  }
}
~~~

### How It Works

1. **Click a map marker** - Dashboard automatically navigates to \`store-detail\` view
2. **Context is captured** - Store name, ID, etc. are extracted from the marker data
3. **Breadcrumb updates** - Shows "Store Map / Manhattan Flagship"
4. **Click a table row** - Drills down to \`transaction-detail\` view
5. **Click breadcrumb** - Navigates back up the hierarchy

### No Code Required

Compare this to the previous \`MapDrillDownLeaflet\` story which required:
- JavaScript state management (\`currentView\`, \`currentContext\`)
- Event handlers for \`dashboardNav\` and \`breadcrumbClick\`
- Manual dashboard re-rendering

This story just passes JSON and the component handles everything!
        `,
      },
    },
  },
};

/**
 * JSON-Only Multi-View Dashboard with MapLibre
 * 
 * Same as above but using MapLibre with 3D capabilities.
 */
export const JsonOnlyMultiViewMapLibre: Story = {
  args: {
    config: '',
    context: {},
    debug: false,
  },
  loaders: [
    async () => {
      const response = await fetch('/data/multi-view-dashboard-maplibre.json');
      if (!response.ok) {
        throw new Error('Failed to load: HTTP ' + response.status);
      }
      const dashboardConfig = await response.json();
      return { dashboardConfig };
    }
  ],
  render: (args, { loaded: { dashboardConfig } }) => {
    if (!dashboardConfig) {
      return html`<div style="color: red; padding: 2rem;">Failed to load dashboard configuration</div>`;
    }
    
    const themeId = 'theme-maplibre-' + Math.random().toString(36).substr(2, 9);
    
    const handleDarkModeToggle = (e: CustomEvent) => {
      const theme = document.getElementById(themeId) as any;
      if (theme) {
        theme.dark = e.detail.checked;
      }
    };
    
    return html`
      <spectrum-theme id=${themeId} color="#0070d2">
        <div style="padding: 2rem; background: var(--spectrum-color-background); min-height: 100vh; transition: background 0.3s ease;">
          <!-- Theme Toggle -->
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; margin-bottom: 1rem; padding: 0.75rem 1rem; background: var(--spectrum-color-surface); border-radius: 8px;">
            <span style="color: var(--spectrum-color-on-surface); font-size: 0.875rem; font-family: var(--spectrum-sys-font-family);">
              <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle; margin-right: 4px;">light_mode</span>
              Light
            </span>
            <spectrum-switch 
              @switchChange=${handleDarkModeToggle}
              size="small"
            ></spectrum-switch>
            <span style="color: var(--spectrum-color-on-surface); font-size: 0.875rem; font-family: var(--spectrum-sys-font-family);">
              Dark
              <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle; margin-left: 4px;">dark_mode</span>
            </span>
          </div>
          
          <div style="height: 700px; width: 100%;">
            <spectrum-dashboard
              .config=${dashboardConfig}
              .context=${args.context}
              ?debug=${args.debug}
              style="height: 100%; width: 100%;"
            ></spectrum-dashboard>
          </div>
        </div>
      </spectrum-theme>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
## 100% JSON-Configurable Dashboard with MapLibre 3D

Same multi-view pattern as the Leaflet story, but using MapLibre for 3D visualization.

**Theme Toggle**: Use the switch in the top-right to toggle between light and dark mode.

### MapLibre-Specific Configuration

~~~json
{
  "views": {
    "overview": {
      "widgets": {
        "map": {
          "component": "map",
          "uiConfig": {
            "mapProvider": "maplibre",
            "pitch": 45,
            "bearing": -15,
            "controls": {
              "zoom": true,
              "attribution": true,
              "scale": true
            }
          }
        }
      }
    }
  }
}
~~~

### Key Differences from Leaflet Version

| Feature | Leaflet | MapLibre |
|---------|---------|----------|
| Rendering | CPU (Canvas/SVG) | GPU (WebGL) |
| 3D Support | Limited | Full (pitch, bearing) |
| Tile Format | Raster | Vector + Raster |
| Clustering | Plugin | Built-in |
| Bundle Size | ~40KB | ~200KB |

### Try It

1. The map starts with a 45° pitch angle
2. Click markers to drill down (same as Leaflet)
3. Navigation and breadcrumbs work identically
4. Only the map rendering differs
        `,
      },
    },
  },
};
