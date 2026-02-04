import { Component, h, Host, Prop, State, Watch, Element } from '@stencil/core';
import type { ScoreCardConfig, FormatOptions, TrendIndicator, ComparisonData } from './types/score-card.types';
import { DEFAULT_FORMAT_OPTIONS } from './types/score-card.types';

/**
 * Score Card Component
 * 
 * A presentational widget for displaying key metrics with trends, comparisons,
 * and visual indicators. Designed for use in dashboards and analytics interfaces.
 * 
 * @slot - Default slot for custom content
 * @part container - Main container element
 * @part header - Header section
 * @part body - Body section with value
 * @part footer - Footer section with trend/comparison
 */
@Component({
  tag: 'spectrum-score-card',
  styleUrl: 'spectrum-score-card.scss',
  shadow: false,
})
export class SpectrumScoreCard {
  @Element() element: HTMLElement;
  
  // =================================================================
  // Props - Configuration
  // =================================================================
  
  /**
   * Score card configuration (JSON string or object)
   */
  @Prop({ mutable: true }) config: ScoreCardConfig | string = {} as ScoreCardConfig;
  
  /**
   * Main metric value
   */
  @Prop() value?: number | string;
  
  /**
   * Metric label/title
   */
  @Prop() label?: string;
  
  /**
   * Optional subtitle
   */
  @Prop() subtitle?: string;
  
  /**
   * Value format type
   */
  @Prop() format?: 'number' | 'currency' | 'percentage' | 'decimal' | 'custom' = 'number';
  
  /**
   * Visual variant
   */
  @Prop() variant?: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  
  /**
   * Size variant
   */
  @Prop() size?: 'small' | 'medium' | 'large' = 'medium';
  
  /**
   * Icon name (Material Icons)
   */
  @Prop() icon?: string;
  
  /**
   * Icon position
   */
  @Prop() iconPosition?: 'start' | 'end' = 'start';
  
  /**
   * Loading state
   */
  @Prop() loading?: boolean = false;
  
  /**
   * Prefix text (e.g., "$")
   */
  @Prop() valuePrefix?: string;
  
  /**
   * Suffix text (e.g., "%")
   */
  @Prop() valueSuffix?: string;
  
  /**
   * Trend indicator (JSON string or object)
   */
  @Prop() trend?: TrendIndicator | string;
  
  /**
   * Comparison data (JSON string or object)
   */
  @Prop() comparison?: ComparisonData | string;
  
  /**
   * Target value for progress indicator
   */
  @Prop() target?: number;
  
  /**
   * Show progress bar
   */
  @Prop() showProgress?: boolean = false;
  
  /**
   * Debug mode
   */
  @Prop() debug?: boolean = false;
  
  /**
   * Data array for aggregation (when used with transform)
   * Receives raw data from dashboard-widget-host
   */
  @Prop({ mutable: true }) data?: any[] | string;

  // =================================================================
  // State - Internal
  // =================================================================
  
  /**
   * Parsed configuration
   */
  @State() parsedConfig: ScoreCardConfig = {} as ScoreCardConfig;
  
  /**
   * Parsed trend indicator
   */
  @State() parsedTrend?: TrendIndicator;
  
  /**
   * Parsed comparison data
   */
  @State() parsedComparison?: ComparisonData;
  
  // =================================================================
  // Lifecycle
  // =================================================================
  
  componentWillLoad() {
    this.parseInputs();
  }
  
  @Watch('config')
  @Watch('value')
  @Watch('label')
  @Watch('trend')
  @Watch('comparison')
  @Watch('data')
  onPropsChange() {
    this.parseInputs();
  }
  
  // =================================================================
  // Private Methods - Parsing
  // =================================================================
  
  /**
   * Parse all inputs (config object or individual props)
   */
  private parseInputs() {
    // Parse config if it's a string
    if (typeof this.config === 'string' && this.config.trim()) {
      try {
        this.parsedConfig = JSON.parse(this.config);
      } catch (error) {
        console.error('[spectrum-score-card] Invalid JSON in config:', error);
        this.parsedConfig = {} as ScoreCardConfig;
      }
    } else if (typeof this.config === 'object') {
      this.parsedConfig = this.config;
    }
    
    // Individual props override config
    if (this.value !== undefined) this.parsedConfig.value = this.value;
    if (this.label !== undefined) this.parsedConfig.label = this.label;
    if (this.subtitle !== undefined) this.parsedConfig.subtitle = this.subtitle;
    if (this.format !== undefined) this.parsedConfig.format = this.format;
    if (this.variant !== undefined) this.parsedConfig.variant = this.variant;
    if (this.size !== undefined) this.parsedConfig.size = this.size;
    if (this.icon !== undefined) this.parsedConfig.icon = this.icon;
    if (this.iconPosition !== undefined) this.parsedConfig.iconPosition = this.iconPosition;
    if (this.loading !== undefined) this.parsedConfig.loading = this.loading;
    if (this.valuePrefix !== undefined) this.parsedConfig.valuePrefix = this.valuePrefix;
    if (this.valueSuffix !== undefined) this.parsedConfig.valueSuffix = this.valueSuffix;
    if (this.target !== undefined) this.parsedConfig.target = this.target;
    if (this.showProgress !== undefined) this.parsedConfig.showProgress = this.showProgress;
    
    // Parse trend
    if (this.trend) {
      if (typeof this.trend === 'string') {
        try {
          this.parsedTrend = JSON.parse(this.trend);
        } catch (error) {
          console.error('[spectrum-score-card] Invalid JSON in trend:', error);
          this.parsedTrend = undefined;
        }
      } else {
        this.parsedTrend = this.trend;
      }
    } else if (this.parsedConfig.trend) {
      this.parsedTrend = this.parsedConfig.trend;
    }
    
    // Parse comparison
    if (this.comparison) {
      if (typeof this.comparison === 'string') {
        try {
          this.parsedComparison = JSON.parse(this.comparison);
        } catch (error) {
          console.error('[spectrum-score-card] Invalid JSON in comparison:', error);
          this.parsedComparison = undefined;
        }
      } else {
        this.parsedComparison = this.comparison;
      }
    } else if (this.parsedConfig.comparison) {
      this.parsedComparison = this.parsedConfig.comparison;
    }
    
    // Process data with transform if provided
    if (this.data && this.parsedConfig.transform) {
      const transformedValue = this.applyTransform(this.data, this.parsedConfig.transform);
      if (transformedValue !== undefined) {
        this.parsedConfig.value = transformedValue;
      }
    }
    
    this.debugLog('Parsed config:', this.parsedConfig);
  }
  
  /**
   * Apply data transformation to calculate value
   * Supports: sum(field), avg(field), count(), min(field), max(field), countUnique(field)
   */
  private applyTransform(data: any[] | string, transform: string): number | undefined {
    // Parse data if string
    let parsedData: any[];
    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data);
      } catch {
        this.debugLog('Failed to parse data string');
        return undefined;
      }
    } else {
      parsedData = data;
    }
    
    if (!Array.isArray(parsedData) || parsedData.length === 0) {
      this.debugLog('Data is empty or not an array');
      return undefined;
    }
    
    // Parse transform expression
    const match = transform.match(/^(\w+)\(([^)]*)\)$/);
    if (!match) {
      this.debugLog('Invalid transform expression:', transform);
      return undefined;
    }
    
    const [, func, field] = match;
    const fieldName = field.trim();
    
    this.debugLog('Applying transform:', { func, field: fieldName, dataLength: parsedData.length });
    
    switch (func.toLowerCase()) {
      case 'sum':
        return parsedData.reduce((acc, item) => acc + (Number(item[fieldName]) || 0), 0);
      
      case 'avg':
      case 'average':
        const sum = parsedData.reduce((acc, item) => acc + (Number(item[fieldName]) || 0), 0);
        return parsedData.length > 0 ? sum / parsedData.length : 0;
      
      case 'count':
        return parsedData.length;
      
      case 'min':
        const minValues = parsedData.map(item => Number(item[fieldName])).filter(v => !isNaN(v));
        return minValues.length > 0 ? Math.min(...minValues) : 0;
      
      case 'max':
        const maxValues = parsedData.map(item => Number(item[fieldName])).filter(v => !isNaN(v));
        return maxValues.length > 0 ? Math.max(...maxValues) : 0;
      
      case 'countunique':
        const uniqueValues = new Set(parsedData.map(item => item[fieldName]));
        return uniqueValues.size;
      
      default:
        this.debugLog('Unknown transform function:', func);
        return undefined;
    }
  }
  
  // =================================================================
  // Private Methods - Formatting
  // =================================================================
  
  /**
   * Format the value for display
   */
  private formatValue(): string {
    const value = this.parsedConfig.value;
    const format = this.parsedConfig.format || 'number';
    
    if (value === undefined || value === null) {
      return '-';
    }
    
    // If already a string, return as-is
    if (typeof value === 'string') {
      return value;
    }
    
    // Get format options
    const options = DEFAULT_FORMAT_OPTIONS[format] || DEFAULT_FORMAT_OPTIONS.number;
    
    // Format based on type
    switch (format) {
      case 'currency':
        return this.formatCurrency(value as number, options);
      
      case 'percentage':
        return this.formatPercentage(value as number, options);
      
      case 'decimal':
        return this.formatDecimal(value as number, options);
      
      case 'number':
      default:
        return this.formatNumber(value as number, options);
    }
  }
  
  /**
   * Format as currency
   */
  private formatCurrency(value: number, options: FormatOptions): string {
    const formatted = this.formatNumber(value, options);
    const symbol = options.currencySymbol || '$';
    
    return options.currencyPosition === 'after' 
      ? `${formatted}${symbol}`
      : `${symbol}${formatted}`;
  }
  
  /**
   * Format as percentage
   */
  private formatPercentage(value: number, options: FormatOptions): string {
    return `${this.formatDecimal(value, options)}%`;
  }
  
  /**
   * Format as decimal
   */
  private formatDecimal(value: number, options: FormatOptions): string {
    return value.toFixed(options.decimals || 0);
  }
  
  /**
   * Format as number with separators
   */
  private formatNumber(value: number, options: FormatOptions): string {
    const parts = value.toFixed(options.decimals || 0).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandsSeparator || ',');
    const decimalPart = parts[1];
    
    return decimalPart ? `${integerPart}${options.decimalSeparator || '.'}${decimalPart}` : integerPart;
  }
  
  /**
   * Get progress percentage
   */
  private getProgressPercentage(): number {
    const value = Number(this.parsedConfig.value);
    const target = this.parsedConfig.target;
    
    if (!target || isNaN(value)) {
      return 0;
    }
    
    return Math.min((value / target) * 100, 100);
  }
  
  /**
   * Get trend icon
   */
  private getTrendIcon(): string {
    if (!this.parsedTrend) return '';
    
    switch (this.parsedTrend.direction) {
      case 'up':
        return 'trending_up';
      case 'down':
        return 'trending_down';
      case 'neutral':
      default:
        return 'trending_flat';
    }
  }
  
  /**
   * Get trend class
   * 
   * The `isPositive` property in trend data indicates whether this trend direction 
   * is considered GOOD for the metric:
   * - Up trend with isPositive: true → green (e.g., revenue increasing)
   * - Up trend with isPositive: false → red (e.g., costs increasing)
   * - Down trend with isPositive: true → green (e.g., costs decreasing)
   * - Down trend with isPositive: false → red (e.g., revenue decreasing)
   * 
   * By default, 'up' is considered positive and 'down' is considered negative.
   */
  private getTrendClass(): string {
    if (!this.parsedTrend) return '';
    
    // Determine if the trend is semantically positive (good)
    // Default: 'up' is good, 'down' is bad
    const direction = this.parsedTrend.direction;
    const isGood = this.parsedTrend.isPositive !== undefined 
      ? this.parsedTrend.isPositive 
      : direction === 'up';
    
    if (direction === 'neutral') {
      return 'spectrum-score-card__trend--neutral';
    }
    
    // Show green for good trends, red for bad trends
    return isGood 
      ? 'spectrum-score-card__trend--positive' 
      : 'spectrum-score-card__trend--negative';
  }
  
  /**
   * Debug logging
   */
  private debugLog(...args: any[]) {
    if (this.debug) {
      console.log('[spectrum-score-card]', ...args);
    }
  }
  
  // =================================================================
  // Render
  // =================================================================
  
  render() {
    const {
      label,
      subtitle,
      icon,
      iconPosition,
      loading,
      variant,
      size,
      valuePrefix,
      valueSuffix,
      showProgress,
    } = this.parsedConfig;
    
    const formattedValue = this.formatValue();
    const progressPercentage = this.getProgressPercentage();
    
    // Apply classes directly to host element for simpler HTML structure
    return (
      <Host
        class={{
          'spectrum-score-card': true,
          [`spectrum-score-card--${variant || 'default'}`]: true,
          [`spectrum-score-card--${size || 'medium'}`]: true,
          'spectrum-score-card--loading': loading || false,
          'spectrum-score-card--with-icon': !!icon,
          [`spectrum-score-card--icon-${iconPosition || 'start'}`]: !!icon,
        }}
      >
        {/* Header */}
        {label && (
          <div class="spectrum-score-card__header" part="header">
            {icon && (
              <span class="spectrum-score-card__icon material-symbols-outlined">
                {icon}
              </span>
            )}
            <div class="spectrum-score-card__header-text">
              <h3 class="spectrum-score-card__label">{label}</h3>
              {subtitle && <p class="spectrum-score-card__subtitle">{subtitle}</p>}
            </div>
          </div>
        )}
        
        {/* Body - Value */}
        <div class="spectrum-score-card__body" part="body">
          {loading ? (
            <div class="spectrum-score-card__skeleton"></div>
          ) : (
            <div class="spectrum-score-card__value-container">
              {valuePrefix && <span class="spectrum-score-card__prefix">{valuePrefix}</span>}
              <span class="spectrum-score-card__value">{formattedValue}</span>
              {valueSuffix && <span class="spectrum-score-card__suffix">{valueSuffix}</span>}
            </div>
          )}
        </div>
        
        {/* Footer - Trend & Comparison */}
        {(this.parsedTrend || this.parsedComparison) && !loading && (
          <div class="spectrum-score-card__footer" part="footer">
            {/* Trend Indicator */}
            {this.parsedTrend && (
              <div class={{
                'spectrum-score-card__trend': true,
                [this.getTrendClass()]: true,
              }}>
                <span class="spectrum-score-card__trend-icon material-symbols-outlined">
                  {this.getTrendIcon()}
                </span>
                {this.parsedTrend.value && (
                  <span class="spectrum-score-card__trend-value">
                    {this.parsedTrend.value}
                  </span>
                )}
                {this.parsedTrend.label && (
                  <span class="spectrum-score-card__trend-label">
                    {this.parsedTrend.label}
                  </span>
                )}
              </div>
            )}
            
            {/* Comparison */}
            {this.parsedComparison && (
              <div class="spectrum-score-card__comparison">
                <span class="spectrum-score-card__comparison-value">
                  {this.parsedComparison.value}
                </span>
                {this.parsedComparison.label && (
                  <span class="spectrum-score-card__comparison-label">
                    {this.parsedComparison.label}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Progress Bar */}
        {showProgress && this.parsedConfig.target && !loading && (
          <div class="spectrum-score-card__progress">
            <div 
              class="spectrum-score-card__progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}
        
        {/* Custom Content Slot */}
        <slot></slot>
      </Host>
    );
  }
}

