import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Type definitions for score card (copied from component types to avoid importing Stencil source)
interface ScoreCardTrend {
  direction: 'up' | 'down' | 'neutral';
  value: string;
  label?: string;
  isPositive?: boolean;
}

interface ScoreCardComparison {
  value: string;
  label: string;
}

interface ScoreCardProgress {
  current: number;
  target: number;
  showLabel?: boolean;
}

interface ScoreCardConfig {
  value?: string | number;
  label?: string;
  format?: 'number' | 'currency' | 'percentage' | 'decimal';
  prefix?: string;
  suffix?: string;
  trend?: ScoreCardTrend;
  comparison?: ScoreCardComparison;
  progress?: ScoreCardProgress;
  icon?: string;
  iconPosition?: 'start' | 'end';
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  loading?: boolean;
}

// Note: Components are registered via the compiled www folder, not source imports

/**
 * Score Card Component
 * 
 * A presentational widget for displaying key metrics with trends, comparisons,
 * and visual indicators. Designed for use in dashboards and analytics interfaces.
 * 
 * ## Features
 * - Multiple format types (number, currency, percentage, decimal)
 * - Trend indicators with up/down/neutral states
 * - Comparison values (vs previous period)
 * - Progress bars with target values
 * - Size variants (small, medium, large)
 * - Color variants (default, success, warning, error, info)
 * - Loading states with skeleton animations
 * - Prefix/suffix support
 * - Icons with positioning
 * - Fully responsive
 */
const meta: Meta = {
  title: 'Spectrum/Components/SpectrumScoreCard',
  component: 'spectrum-score-card',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Score Card component displays metrics and KPIs with visual indicators, trends, and comparisons. It's perfect for dashboards and analytics interfaces.

## Usage
\`\`\`html
<spectrum-score-card
  value="24,583"
  label="Total Revenue"
  format="currency"
  trend='{"direction":"up","value":"+12.5%","label":"vs last month"}'
></spectrum-score-card>
\`\`\`

## Integration with Dashboard
The score-card can be used as a widget in the dashboard system:

\`\`\`json
{
  "widgets": {
    "revenue-card": {
      "component": "score-card",
      "dataSourceId": "sales-data",
      "uiConfig": {
        "label": "Total Revenue",
        "format": "currency",
        "showProgress": true,
        "target": 100000
      }
    }
  }
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Main metric value to display',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '-' },
      },
    },
    label: {
      control: 'text',
      description: 'Metric label/title',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle or description',
      table: {
        type: { summary: 'string' },
      },
    },
    format: {
      control: 'select',
      options: ['number', 'currency', 'percentage', 'decimal'],
      description: 'Value format type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'number' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    icon: {
      control: 'text',
      description: 'Material icon name',
      table: {
        type: { summary: 'string' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showProgress: {
      control: 'boolean',
      description: 'Show progress bar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};

export default meta;

type SpectrumScoreCardArgs = {
  value?: number | string;
  label?: string;
  subtitle?: string;
  format?: 'number' | 'currency' | 'percentage' | 'decimal';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  target?: number;
  showProgress?: boolean;
  trend?: string;
  comparison?: string;
};

/**
 * ## Default Score Card
 * 
 * Basic usage with a value and label.
 */
export const Default: StoryObj<SpectrumScoreCardArgs> = {
  args: {
    value: 24583,
    label: 'Total Revenue',
    format: 'currency',
  },
  render: (args) => html`
    <spectrum-score-card
      .value=${args.value}
      .label=${args.label}
      .format=${args.format}
    ></spectrum-score-card>
  `,
};

/**
 * ## With Trend Indicator
 * 
 * Shows trend with direction and percentage change.
 */
export const WithTrend: StoryObj<SpectrumScoreCardArgs> = {
  args: {
    value: 45682,
    label: 'Total Sales',
    subtitle: 'Last 30 days',
    format: 'currency',
    icon: 'trending_up',
    trend: JSON.stringify({
      direction: 'up',
      value: '+12.5%',
      label: 'vs last month',
    }),
  },
  render: (args) => html`
    <spectrum-score-card
      .value=${args.value}
      .label=${args.label}
      .subtitle=${args.subtitle}
      .format=${args.format}
      .icon=${args.icon}
      .trend=${args.trend}
    ></spectrum-score-card>
  `,
};

/**
 * ## With Comparison
 * 
 * Shows comparison value with the previous period.
 */
export const WithComparison: StoryObj<SpectrumScoreCardArgs> = {
  args: {
    value: 892,
    label: 'Active Users',
    format: 'number',
    icon: 'people',
    comparison: JSON.stringify({
      value: '735',
      label: 'last week',
    }),
  },
  render: (args) => html`
    <spectrum-score-card
      .value=${args.value}
      .label=${args.label}
      .format=${args.format}
      .icon=${args.icon}
      .comparison=${args.comparison}
    ></spectrum-score-card>
  `,
};

/**
 * ## With Progress Bar
 * 
 * Shows progress towards a target value.
 */
export const WithProgress: StoryObj<SpectrumScoreCardArgs> = {
  args: {
    value: 68500,
    label: 'Monthly Goal',
    format: 'currency',
    icon: 'track_changes',
    target: 100000,
    showProgress: true,
    trend: JSON.stringify({
      direction: 'up',
      value: '68.5%',
      label: 'completed',
    }),
  },
  render: (args) => html`
    <spectrum-score-card
      .value=${args.value}
      .label=${args.label}
      .format=${args.format}
      .icon=${args.icon}
      .target=${args.target}
      .showProgress=${args.showProgress}
      .trend=${args.trend}
    ></spectrum-score-card>
  `,
};

/**
 * ## Size Variants
 * 
 * Available sizes: small, medium, large.
 */
export const Sizes: StoryObj<SpectrumScoreCardArgs> = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <spectrum-score-card
        value="12,450"
        label="Small Card"
        format="currency"
        size="small"
        trend='{"direction":"up","value":"+5%"}'
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="12,450"
        label="Medium Card"
        format="currency"
        size="medium"
        trend='{"direction":"up","value":"+5%"}'
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="12,450"
        label="Large Card"
        format="currency"
        size="large"
        trend='{"direction":"up","value":"+5%"}'
      ></spectrum-score-card>
    </div>
  `,
};

/**
 * ## Color Variants
 * 
 * Different color schemes for different metric types.
 */
export const Variants: StoryObj<SpectrumScoreCardArgs> = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
      <spectrum-score-card
        value="$24,583"
        label="Default"
        variant="default"
        icon="account_balance_wallet"
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="95.2%"
        label="Success"
        variant="success"
        icon="check_circle"
        trend='{"direction":"up","value":"+2.1%"}'
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="68%"
        label="Warning"
        variant="warning"
        icon="warning"
        trend='{"direction":"down","value":"-5%"}'
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="3"
        label="Error"
        variant="error"
        icon="error"
        trend='{"direction":"up","value":"+2","isPositive":false}'
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="125"
        label="Info"
        variant="info"
        icon="info"
      ></spectrum-score-card>
    </div>
  `,
};

/**
 * ## Format Types
 * 
 * Different value formatting options.
 */
export const Formats: StoryObj<SpectrumScoreCardArgs> = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <spectrum-score-card
        value="24583"
        label="Number Format"
        format="number"
        icon="tag"
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="24583.50"
        label="Currency Format"
        format="currency"
        icon="attach_money"
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="68.5"
        label="Percentage Format"
        format="percentage"
        icon="percent"
      ></spectrum-score-card>
      
      <spectrum-score-card
        value="3.14159"
        label="Decimal Format"
        format="decimal"
        icon="calculate"
      ></spectrum-score-card>
    </div>
  `,
};

/**
 * ## Loading State
 * 
 * Display skeleton loader while data is being fetched.
 */
export const Loading: StoryObj<SpectrumScoreCardArgs> = {
  args: {
    label: 'Total Revenue',
    subtitle: 'Loading data...',
    loading: true,
  },
  render: (args) => html`
    <spectrum-score-card
      .label=${args.label}
      .subtitle=${args.subtitle}
      .loading=${args.loading}
    ></spectrum-score-card>
  `,
};

/**
 * ## Dashboard Grid
 * 
 * Multiple score cards arranged in a flex-wrap container.
 * Cards use size-based percentage widths and wrap automatically.
 * - Large: 50% width
 * - Medium: 33% width (default)
 * - Small: 20% width
 */
export const DashboardGrid: StoryObj<SpectrumScoreCardArgs> = {
  render: () => html`
    <spectrum-theme>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem; background: var(--spectrum-color-background);">
        <spectrum-score-card
          size="medium"
          value="24583"
          label="Total Revenue"
          subtitle="Last 30 days"
          format="currency"
          icon="account_balance_wallet"
          variant="success"
          .trend=${{ direction: 'up', value: '+12.5%', label: 'vs last month' }}
        ></spectrum-score-card>
        
        <spectrum-score-card
          size="medium"
          value="1,245"
          label="New Customers"
          subtitle="This month"
          format="number"
          icon="person_add"
          .trend=${{ direction: 'up', value: '+23', label: 'vs last month' }}
        ></spectrum-score-card>
        
        <spectrum-score-card
          size="medium"
          value="68.5"
          label="Conversion Rate"
          subtitle="Current period"
          format="percentage"
          icon="trending_up"
          .trend=${{ direction: 'down', value: '-2.3%', label: 'vs last week' }}
        ></spectrum-score-card>
        
        <spectrum-score-card
          size="medium"
          value="892"
          label="Active Sessions"
          subtitle="Right now"
          format="number"
          icon="people"
          variant="info"
          .comparison=${{ value: '735', label: 'yesterday' }}
        ></spectrum-score-card>
        
        <spectrum-score-card
          size="medium"
          value="3.45"
          label="Avg Order Value"
          subtitle="Per transaction"
          format="currency"
          icon="shopping_cart"
          .trend=${{ direction: 'up', value: '+$0.32', label: 'vs last month' }}
        ></spectrum-score-card>
        
        <spectrum-score-card
          size="medium"
          value="85000"
          label="Monthly Target"
          subtitle="Progress"
          format="currency"
          icon="flag"
          .target=${100000}
          .showProgress=${true}
          .trend=${{ direction: 'up', value: '85%', label: 'completed' }}
        ></spectrum-score-card>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: `
A complete dashboard layout with multiple score cards showing different metrics.
Cards use percentage-based widths (medium = 33%) and wrap automatically when the container is too narrow.
Each card displays relevant information with trends, comparisons, and progress indicators.
        `,
      },
    },
  },
};

/**
 * ## Interactive Example
 * 
 * Score card with all features enabled.
 */
export const Interactive: StoryObj<SpectrumScoreCardArgs> = {
  args: {
    value: 45682,
    label: 'Total Revenue',
    subtitle: 'Last 30 days',
    format: 'currency',
    variant: 'default',
    size: 'medium',
    icon: 'account_balance_wallet',
    iconPosition: 'start',
    loading: false,
    showProgress: true,
    target: 60000,
    trend: JSON.stringify({
      direction: 'up',
      value: '+12.5%',
      label: 'vs last month',
    }),
    comparison: JSON.stringify({
      value: '$40,543',
      label: 'previous period',
    }),
  },
  render: (args) => html`
    <spectrum-score-card
      .value=${args.value}
      .label=${args.label}
      .subtitle=${args.subtitle}
      .format=${args.format}
      .variant=${args.variant}
      .size=${args.size}
      .icon=${args.icon}
      .iconPosition=${args.iconPosition}
      .loading=${args.loading}
      .target=${args.target}
      .showProgress=${args.showProgress}
      .trend=${args.trend}
      .comparison=${args.comparison}
    ></spectrum-score-card>
  `,
};

