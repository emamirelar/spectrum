/**
 * Spectrum Chart Type Definitions
 * 
 * Type system for the chart component with Chart.js integration.
 * Supports both standalone and dashboard widget usage.
 */

import type { ChartType, ChartOptions } from 'chart.js';

/**
 * Chart configuration interface for spectrum-chart component.
 * Provides a simplified API over Chart.js while maintaining flexibility.
 */
export interface SpectrumChartConfig {
  /** Chart type (line, bar, pie, doughnut, radar, polarArea, bubble, scatter) */
  type?: ChartType;
  
  /** Chart title */
  title?: string;
  
  /** Chart subtitle or description */
  subtitle?: string;
  
  /** Whether to show legend */
  showLegend?: boolean;
  
  /** Legend position */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  /** X-axis label */
  xAxisLabel?: string;
  
  /** Y-axis label */
  yAxisLabel?: string;
  
  /** Whether to show grid lines */
  showGrid?: boolean;
  
  /** Whether to enable animations */
  animated?: boolean;
  
  /** Field to use for labels (when transforming raw data) */
  labelField?: string;
  
  /** Field to use for x-axis (alternative to labelField) */
  xField?: string;
  
  /** Field to use for values (when transforming raw data) */
  valueField?: string;
  
  /** Field to use for y-axis (alternative to valueField) */
  yField?: string;
  
  /** Label for the dataset */
  datasetLabel?: string;
  
  /** Whether chart should be responsive */
  responsive?: boolean;
  
  /** Maintain aspect ratio */
  maintainAspectRatio?: boolean;
  
  /** Aspect ratio (width / height) */
  aspectRatio?: number;
  
  /** Custom colors for datasets */
  colors?: string[];
  
  /** Number format for values (e.g., 'currency', 'percent', 'number') */
  valueFormat?: 'currency' | 'percent' | 'number' | 'decimal';
  
  /** Currency symbol (for currency format) */
  currencySymbol?: string;
  
  /** Number of decimal places */
  decimalPlaces?: number;
  
  /** Minimum value for Y-axis */
  minValue?: number;
  
  /** Maximum value for Y-axis */
  maxValue?: number;
  
  /** Enable stacking for bar/line charts */
  stacked?: boolean;
  
  /** Enable data point labels */
  showDataLabels?: boolean;
  
  /** Chart.js advanced options (overrides simple config) */
  advancedOptions?: ChartOptions;
}

/**
 * Dataset definition for chart data.
 * Simplified version of Chart.js dataset structure.
 */
export interface SpectrumChartDataset {
  /** Dataset label */
  label: string;
  
  /** Data values */
  data: number[];
  
  /** Background color(s) */
  backgroundColor?: string | string[];
  
  /** Border color(s) */
  borderColor?: string | string[];
  
  /** Border width */
  borderWidth?: number;
  
  /** Fill area under line (for line charts) */
  fill?: boolean;
  
  /** Line tension (for line charts) */
  tension?: number;
  
  /** Point radius (for line/scatter charts) */
  pointRadius?: number;
  
  /** Point hover radius */
  pointHoverRadius?: number;
  
  /** Hidden by default */
  hidden?: boolean;
}

/**
 * Chart data structure.
 * Compatible with both simple array data and Chart.js format.
 */
export interface SpectrumChartData {
  /** Labels for data points */
  labels: string[];
  
  /** Datasets to display */
  datasets: SpectrumChartDataset[];
}

/**
 * Default color palette for charts (Material Design inspired)
 */
export const DEFAULT_CHART_COLORS = [
  '#0078d4', // Primary blue
  '#00b294', // Teal
  '#f7630c', // Orange
  '#5c2d91', // Purple
  '#d13438', // Red
  '#00188f', // Dark blue
  '#107c10', // Green
  '#ff8c00', // Dark orange
  '#e3008c', // Magenta
  '#00bcf2', // Cyan
];

/**
 * Chart type display names
 */
export const CHART_TYPE_LABELS: Record<ChartType, string> = {
  line: 'Line Chart',
  bar: 'Bar Chart',
  pie: 'Pie Chart',
  doughnut: 'Doughnut Chart',
  radar: 'Radar Chart',
  polarArea: 'Polar Area Chart',
  bubble: 'Bubble Chart',
  scatter: 'Scatter Chart',
};

/**
 * Chart element click event payload.
 * Emitted when user clicks on a chart element (bar, line point, pie segment, etc.)
 */
export interface ChartElementClickEvent {
  /** Action identifier */
  action: 'elementClick';
  /** Chart type (line, bar, pie, etc.) */
  chartType: string;
  /** Dataset label */
  datasetLabel?: string;
  /** Data point label */
  label: any;
  /** Data point value */
  value: any;
  /** Dataset index */
  datasetIndex: number;
  /** Element index within dataset */
  elementIndex: number;
  /** Raw data from dataset (may contain additional properties) */
  rawData?: any;
}

/**
 * Chart legend click event payload.
 * Emitted when user clicks on a legend item.
 */
export interface ChartLegendClickEvent {
  /** Action identifier */
  action: 'legendClick';
  /** Dataset label */
  datasetLabel: string;
  /** Dataset index */
  datasetIndex: number;
  /** Whether dataset is now hidden */
  hidden: boolean;
}

