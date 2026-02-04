/**
 * Score Card Component Type Definitions
 * 
 * Type system for the score card widget used in dashboards.
 * Supports metrics, trends, comparisons, and visual indicators.
 */

/**
 * Main score card configuration interface
 */
export interface ScoreCardConfig {
  /** Main metric value to display */
  value: number | string;
  
  /** Metric label/title */
  label: string;
  
  /** Optional subtitle or description */
  subtitle?: string;
  
  /** Value format type */
  format?: 'number' | 'currency' | 'percentage' | 'decimal' | 'custom';
  
  /** Custom format function name (from registry) */
  customFormat?: string;
  
  /** Trend indicator */
  trend?: TrendIndicator;
  
  /** Comparison value (e.g., previous period) */
  comparison?: ComparisonData;
  
  /** Visual styling variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  
  /** Icon to display */
  icon?: string;
  
  /** Icon position */
  iconPosition?: 'start' | 'end';
  
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  
  /** Loading state */
  loading?: boolean;
  
  /** Prefix text (e.g., "$", "+" for currency/trend) */
  valuePrefix?: string;
  
  /** Suffix text (e.g., "%", "pts") */
  valueSuffix?: string;
  
  /** Target or goal value for progress indicator */
  target?: number;
  
  /** Show progress bar */
  showProgress?: boolean;
  
  /** 
   * Data transform expression for calculating value from array data
   * Supports: sum(field), avg(field), count(), min(field), max(field), countUnique(field)
   * Example: "sum(amount)" or "avg(revenue)"
   */
  transform?: string;
}

/**
 * Trend indicator configuration
 */
export interface TrendIndicator {
  /** Trend direction */
  direction: 'up' | 'down' | 'neutral';
  
  /** Trend value (e.g., +5.2%) */
  value?: number | string;
  
  /** Trend label */
  label?: string;
  
  /** Whether upward trend is positive (default: true) */
  isPositive?: boolean;
}

/**
 * Comparison data configuration
 */
export interface ComparisonData {
  /** Comparison value */
  value: number | string;
  
  /** Comparison label (e.g., "vs last month") */
  label?: string;
  
  /** Whether the comparison is favorable */
  isFavorable?: boolean;
  
  /** Comparison period */
  period?: 'previous' | 'last-week' | 'last-month' | 'last-quarter' | 'last-year' | 'custom';
}

/**
 * Format options for value display
 */
export interface FormatOptions {
  /** Decimal places */
  decimals?: number;
  
  /** Thousands separator */
  thousandsSeparator?: string;
  
  /** Decimal separator */
  decimalSeparator?: string;
  
  /** Currency symbol */
  currencySymbol?: string;
  
  /** Currency position */
  currencyPosition?: 'before' | 'after';
}

/**
 * Default format configurations
 */
export const DEFAULT_FORMAT_OPTIONS: Record<string, FormatOptions> = {
  number: {
    decimals: 0,
    thousandsSeparator: ',',
  },
  currency: {
    decimals: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    currencySymbol: '$',
    currencyPosition: 'before',
  },
  percentage: {
    decimals: 1,
    decimalSeparator: '.',
  },
  decimal: {
    decimals: 2,
    decimalSeparator: '.',
  },
};

