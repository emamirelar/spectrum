import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { ChartType } from 'chart.js';

/**
 * ## SpectrumChart Component
 * 
 * A flexible, production-ready chart component powered by Chart.js.
 * Works standalone or as a dashboard widget with full TypeScript support.
 * 
 * ### Key Features
 * - **8 Chart Types**: Line, Bar, Pie, Doughnut, Radar, Polar Area, Bubble, Scatter
 * - **Dual Usage**: Standalone component or dashboard widget
 * - **Smart Parsing**: Accepts JSON strings, objects, or simple arrays
 * - **Value Formatting**: Currency, percent, decimal, number
 * - **Responsive**: Adapts to container size automatically
 * - **Accessible**: WCAG 2.1 AA compliant
 * - **Themeable**: Spectrum design token integration
 * - **Type-Safe**: Full TypeScript support
 * 
 * ### When to Use
 * - **Data Visualization**: Trends, comparisons, distributions
 * - **Analytics Dashboards**: Multiple charts showing different metrics
 * - **Reports**: Visual data representation in documents
 * - **Monitoring**: Real-time data displays
 * 
 * ### Chart Type Guide
 * - **Line**: Trends over time, continuous data
 * - **Bar**: Category comparisons, discrete data
 * - **Pie**: Part-to-whole relationships, percentages
 * - **Doughnut**: Like pie, but with center space for labels
 * - **Radar**: Multi-dimensional comparisons
 * - **Polar Area**: Circular category comparison with area
 * - **Bubble**: Three-dimensional data (x, y, size)
 * - **Scatter**: Correlation between two variables
 */

interface SpectrumChartElement extends HTMLElement {
  config: any;
  data: any;
  type: ChartType;
  chartTitle?: string;
  width?: string;
  height?: string;
  loading: boolean;
  debug: boolean;
}

interface SpectrumChartArgs extends SpectrumChartElement {}

// =================================================================
// SAMPLE DATA
// =================================================================

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [45000, 48000, 52000, 51000, 55000, 58000, 62000, 65000, 63000, 67000, 70000, 75000],
    },
    {
      label: 'Expenses',
      data: [28000, 30000, 32000, 31000, 33000, 35000, 36000, 38000, 37000, 39000, 41000, 43000],
    },
  ],
};

const categoryData = {
  labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'],
  datasets: [
    {
      label: 'Sales ($K)',
      data: [450, 280, 320, 180, 150, 220],
    },
  ],
};

const regionalData = {
  labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'],
  datasets: [
    {
      label: 'Sales',
      data: [450, 380, 520, 180, 140],
    },
  ],
};

const skillsData = {
  labels: ['JavaScript', 'TypeScript', 'CSS', 'HTML', 'React', 'Node.js', 'Design'],
  datasets: [
    {
      label: 'Senior Developer',
      data: [95, 90, 85, 95, 90, 85, 70],
    },
    {
      label: 'Mid Developer',
      data: [80, 75, 80, 85, 75, 70, 60],
    },
  ],
};

const quarterlyData = {
  labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
  datasets: [
    {
      label: 'Electronics',
      data: [150, 180, 165, 200],
    },
    {
      label: 'Clothing',
      data: [80, 90, 85, 100],
    },
    {
      label: 'Home & Garden',
      data: [50, 60, 55, 70],
    },
  ],
};

// =================================================================
// META CONFIGURATION
// =================================================================

const meta: Meta<SpectrumChartArgs> = {
  title: 'Spectrum/Components/SpectrumChart',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-chart\` component provides powerful data visualization capabilities using Chart.js.

### Basic Usage

~~~html
<spectrum-chart
  type="line"
  title="Revenue Trend"
  data='{"labels":["Jan","Feb","Mar"],"datasets":[{"label":"Revenue","data":[100,200,150]}]}'
></spectrum-chart>
~~~

### Configuration

The component accepts configuration through multiple props:

~~~html
<spectrum-chart
  type="bar"
  config='{"valueFormat":"currency","showLegend":true,"stacked":true}'
  data='...'
  height="500px"
></spectrum-chart>
~~~

### Data Formats

**1. Full Chart Data:**
~~~typescript
{
  labels: ['A', 'B', 'C'],
  datasets: [
    { label: 'Series 1', data: [10, 20, 30] },
    { label: 'Series 2', data: [15, 25, 35] }
  ]
}
~~~

**2. Simple Array:**
~~~typescript
[10, 20, 30, 40, 50] // Automatically converted
~~~

**3. JSON String:**
~~~html
<spectrum-chart data='{"labels":["A","B"],"datasets":[{"label":"Data","data":[10,20]}]}'></spectrum-chart>
~~~

### Dashboard Integration

Register chart types in widget registry:
~~~typescript
import { widgetRegistry } from './registry/widget.registry';
widgetRegistry['line-chart'] = 'spectrum-chart';
~~~

Use in dashboard configuration:
~~~json
{
  "widgets": {
    "chart1": {
      "component": "line-chart",
      "dataSourceId": "sales-data",
      "uiConfig": {
        "type": "line",
        "title": "Sales Trend"
      }
    }
  }
}
~~~
        `
      }
    }
  },
  args: {
    type: 'line',
    loading: false,
    debug: false,
    height: '400px',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea', 'bubble', 'scatter'],
      description: 'Type of chart to render',
      table: {
        type: { summary: 'ChartType' },
        defaultValue: { summary: 'line' }
      }
    },
    chartTitle: {
      control: 'text',
      description: 'Chart title',
      table: {
        type: { summary: 'string' }
      }
    },
    config: {
      control: 'object',
      description: 'Chart configuration object',
      table: {
        type: { summary: 'SpectrumChartConfig | string' }
      }
    },
    data: {
      control: 'object',
      description: 'Chart data (object, array, or JSON string)',
      table: {
        type: { summary: 'SpectrumChartData | any[] | string' }
      }
    },
    height: {
      control: 'text',
      description: 'Chart height (CSS value)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '400px' }
      }
    },
    width: {
      control: 'text',
      description: 'Chart width (CSS value)',
      table: {
        type: { summary: 'string' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumChartArgs>;

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring chart configurations.
 */
export const Playground: Story = {
  args: {
    type: 'line',
    chartTitle: 'Revenue Trend',
    config: {
      showLegend: true,
      valueFormat: 'currency',
      xAxisLabel: 'Month',
      yAxisLabel: 'Amount',
    },
    data: monthlyData,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        .type=${args.type}
        .chartTitle=${args.chartTitle}
        .config=${args.config}
        .data=${args.data}
        .height=${args.height}
        .width=${args.width}
        .loading=${args.loading}
        .debug=${args.debug}
      ></spectrum-chart>
    </div>
  `,
};

/**
 * Line chart showing trends over time with multiple datasets.
 */
export const LineChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="line"
        config='{"title":"Revenue vs Expenses","xAxisLabel":"Month","yAxisLabel":"Amount ($)","valueFormat":"currency","showLegend":true,"showGrid":true}'
        .data=${monthlyData}
        height="500px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Line charts are perfect for showing trends over time. This example displays revenue and expenses over 12 months with:
- Currency formatting ($)
- Grid lines for readability
- Legend showing both series
- Smooth line interpolation
- Area fill under lines
        `
      }
    }
  }
};

/**
 * Bar chart for category comparisons.
 */
export const BarChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="bar"
        config='{"title":"Sales by Category","xAxisLabel":"Category","yAxisLabel":"Sales ($K)","valueFormat":"currency","showLegend":false}'
        .data=${categoryData}
        height="450px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Bar charts excel at comparing discrete categories. Features:
- Horizontal category labels
- Currency-formatted values
- Color-coded bars
- Grid lines for easy value reading
        `
      }
    }
  }
};

/**
 * Pie chart showing part-to-whole relationships.
 */
export const PieChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="pie"
        config='{"title":"Sales by Region","showLegend":true,"legendPosition":"right","valueFormat":"currency"}'
        .data=${regionalData}
        height="400px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Pie charts visualize part-to-whole relationships. Ideal for:
- Percentage distributions
- Market share analysis
- Budget allocation
- Resource distribution

This example shows regional sales distribution with a right-aligned legend.
        `
      }
    }
  }
};

/**
 * Doughnut chart with center space.
 */
export const DoughnutChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="doughnut"
        config='{"title":"Sales Distribution","showLegend":true,"legendPosition":"bottom"}'
        .data=${regionalData}
        height="450px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Doughnut charts are like pie charts but with a center cutout, providing:
- Space for summary statistics in center
- More modern visual appearance
- Better readability with many segments
- Cleaner design aesthetic
        `
      }
    }
  }
};

/**
 * Radar chart for multi-dimensional comparisons.
 */
export const RadarChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="radar"
        config='{"title":"Developer Skills Comparison","showLegend":true,"legendPosition":"bottom"}'
        .data=${skillsData}
        height="500px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Radar (spider) charts compare multiple variables across categories. Perfect for:
- Skills assessment
- Performance metrics
- Product comparisons
- Competency evaluation

Each axis represents a different dimension, making it easy to see strengths and weaknesses at a glance.
        `
      }
    }
  }
};

/**
 * Polar area chart for circular category comparison.
 */
export const PolarAreaChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="polarArea"
        config='{"title":"Regional Sales (Polar)","showLegend":true,"legendPosition":"bottom"}'
        .data=${regionalData}
        height="500px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Polar area charts display data in a circular format where:
- Area represents the value
- Angle is equal for all segments
- Useful for cyclical data
- Visually striking alternative to bar charts
        `
      }
    }
  }
};

/**
 * Stacked bar chart for composition analysis.
 */
export const StackedBarChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="bar"
        config='{"title":"Quarterly Sales by Category","xAxisLabel":"Quarter","yAxisLabel":"Sales ($K)","valueFormat":"currency","showLegend":true,"stacked":true}'
        .data=${quarterlyData}
        height="450px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Stacked bar charts show both individual and total values. Great for:
- Showing composition over time
- Comparing sub-categories
- Total with breakdown
- Budget allocation by period

This example shows quarterly sales broken down by product category.
        `
      }
    }
  }
};

/**
 * Chart with custom colors and styling.
 */
export const CustomStyledChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <spectrum-chart
        type="line"
        config='{"title":"Custom Styled Chart","colors":["#ff6b6b","#4ecdc4","#45b7d1"],"showLegend":true,"legendPosition":"top","showGrid":false,"animated":true}'
        .data=${{
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            { label: 'Product A', data: [30, 45, 35, 50] },
            { label: 'Product B', data: [20, 35, 30, 40] },
            { label: 'Product C', data: [15, 25, 20, 30] },
          ],
        }}
        height="400px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Customize chart appearance with:
- **Custom Colors**: Brand-specific color palette
- **Grid Control**: Show/hide grid lines
- **Animation**: Enable/disable transitions
- **Legend Position**: top, bottom, left, right

Perfect for matching your brand identity or design system.
        `
      }
    }
  }
};

/**
 * Chart with loading state.
 */
export const LoadingState: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <h3 style="margin: 0 0 1rem 0;">Loading State</h3>
      <spectrum-chart
        type="line"
        .loading=${true}
        height="400px"
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Loading state provides user feedback while data is being fetched.
Essential for dashboard widgets that load data asynchronously.

Features:
- Animated spinner
- "Loading chart..." message
- Prevents layout shift
- Accessible loading announcement
        `
      }
    }
  }
};

/**
 * Responsive chart that adapts to container size.
 */
export const ResponsiveChart: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 12px;">
      <h3 style="margin: 0 0 1rem 0;">Responsive Chart</h3>
      <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
        Resize your browser window to see the chart adapt.
      </p>
      
      <spectrum-chart
        type="bar"
        config='{"title":"Responsive Bar Chart","responsive":true,"maintainAspectRatio":true,"showLegend":true}'
        .data=${categoryData}
      ></spectrum-chart>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Charts automatically adapt to their container size with:
- **Responsive**: Chart resizes with container
- **Maintain Aspect Ratio**: Preserves chart proportions
- **Mobile Friendly**: Works on all screen sizes
- **Flexible Width**: 100% of container width

Try resizing your browser to see it in action!
        `
      }
    }
  }
};

/**
 * Multiple charts in a grid layout.
 */
export const MultipleCharts: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-dim); border-radius: 12px;">
      <h2 style="margin: 0 0 2rem 0; text-align: center;">Analytics Overview</h2>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
        <spectrum-chart
          type="line"
          config='{"title":"Revenue Trend","showLegend":true,"valueFormat":"currency"}'
          .data=${monthlyData}
          height="300px"
        ></spectrum-chart>
        
        <spectrum-chart
          type="pie"
          config='{"title":"Market Share","showLegend":true,"legendPosition":"right"}'
          .data=${regionalData}
          height="300px"
        ></spectrum-chart>
        
        <spectrum-chart
          type="bar"
          config='{"title":"Category Performance","valueFormat":"currency"}'
          .data=${categoryData}
          height="300px"
        ></spectrum-chart>
        
        <spectrum-chart
          type="radar"
          config='{"title":"Skills Matrix","showLegend":true}'
          .data=${skillsData}
          height="300px"
        ></spectrum-chart>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Multiple charts working together to provide comprehensive insights.
Each chart type serves a specific purpose:

- **Line**: Temporal trends
- **Pie**: Distribution
- **Bar**: Category comparison
- **Radar**: Multi-dimensional analysis

This layout pattern is perfect for executive dashboards and analytics views.
        `
      }
    }
  }
};

