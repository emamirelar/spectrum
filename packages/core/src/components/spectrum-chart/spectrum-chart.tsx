import { Component, Host, h, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  Title,
  LineController,
  BarController,
  PieController,
  DoughnutController,
  RadarController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  type ChartType,
  type ChartConfiguration,
} from 'chart.js';
import type {
  SpectrumChartConfig,
  SpectrumChartData,
  ChartElementClickEvent,
  ChartLegendClickEvent,
} from './types/chart.types';
import { DEFAULT_CHART_COLORS } from './types/chart.types';
import { DataTransformer } from '../spectrum-dashboard/services/data-transformer';

// Register Chart.js components (controllers, elements, scales, plugins)
Chart.register(
  // Controllers
  LineController,
  BarController,
  PieController,
  DoughnutController,
  RadarController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  // Scales
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  // Elements
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  // Plugins
  Filler,
  Tooltip,
  Legend,
  Title
);

@Component({
  tag: 'spectrum-chart',
  styleUrl: 'spectrum-chart.scss',
  shadow: false,
})
export class SpectrumChart {
  @Element() element: HTMLElement;
  
  /**
   * Chart configuration (simplified API or Chart.js config)
   * Can be a JSON string or object
   */
  @Prop() config: SpectrumChartConfig | string = {};
  
  /**
   * Chart data
   * Can be a JSON string or object
   */
  @Prop({ mutable: true }) data: SpectrumChartData | any[] | string = { labels: [], datasets: [] };
  
  /**
   * Chart type (line, bar, pie, doughnut, radar, polarArea, bubble, scatter)
   * Overrides config.type if specified
   */
  @Prop() type: ChartType = 'line';
  
  /**
   * Chart title
   */
  @Prop() chartTitle?: string;
  
  /**
   * Chart width (CSS value)
   */
  @Prop() width?: string;
  
  /**
   * Chart height (CSS value)
   */
  @Prop() height?: string = '400px';
  
  /**
   * Loading state (for dashboard widget integration)
   */
  @Prop() loading: boolean = false;
  
  /**
   * Context from dashboard (optional)
   */
  @Prop() context: Record<string, any> = {};
  
  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;
  
  /**
   * Event emitted when a chart element (bar, point, segment) is clicked
   */
  @Event({
    eventName: 'elementClick',
    bubbles: true,
    composed: true,
  }) elementClick: EventEmitter<ChartElementClickEvent>;
  
  /**
   * Event emitted when a legend item is clicked
   */
  @Event({
    eventName: 'legendClick',
    bubbles: true,
    composed: true,
  }) legendClick: EventEmitter<ChartLegendClickEvent>;
  
  /**
   * Parsed configuration
   */
  @State() parsedConfig: SpectrumChartConfig = {};
  
  /**
   * Parsed data
   */
  @State() parsedData: SpectrumChartData = { labels: [], datasets: [] };
  
  /**
   * Error state for chart initialization failures
   */
  @State() error: string | null = null;
  
  /**
   * Chart.js instance
   */
  private chart: Chart | null = null;
  
  /**
   * Canvas element reference
   */
  private canvasElement: HTMLCanvasElement | null = null;
  
  /**
   * Watch for config changes
   */
  @Watch('config')
  onConfigChange() {
    this.parseConfig();
    this.updateChart();
  }
  
  /**
   * Watch for data changes
   */
  @Watch('data')
  onDataChange() {
    this.parseData();
    this.updateChart();
  }
  
  /**
   * Watch for type changes
   */
  @Watch('type')
  onTypeChange() {
    this.destroyChart();
    this.createChart();
  }
  
  /**
   * Component lifecycle: Initialize
   */
  componentDidLoad() {
    this.debugLog('Chart component loading...');
    
    this.parseConfig();
    this.parseData();
    this.createChart();
    
    this.debugLog('Chart component loaded');
  }
  
  /**
   * Component lifecycle: Cleanup
   */
  disconnectedCallback() {
    this.debugLog('Chart component disconnecting...');
    this.destroyChart();
  }
  
  /**
   * Parse configuration from string or object
   */
  private parseConfig() {
    try {
      if (typeof this.config === 'string') {
        this.parsedConfig = JSON.parse(this.config);
      } else {
        this.parsedConfig = this.config;
      }
      
      this.debugLog('Config parsed:', this.parsedConfig);
    } catch (error) {
      console.error('[spectrum-chart] Failed to parse config:', error);
      this.parsedConfig = {};
    }
  }
  
  /**
   * Parse data from string, array, or object
   */
  private parseData() {
    try {
      if (typeof this.data === 'string') {
        this.parsedData = JSON.parse(this.data);
      } else if (Array.isArray(this.data)) {
        // Check if array contains objects (raw data that needs transformation)
        if (this.data.length > 0 && typeof this.data[0] === 'object') {
          this.parsedData = this.transformRawData(this.data);
        } else {
          // Simple number array format
          this.parsedData = {
            labels: this.data.map((_, i) => `Item ${i + 1}`),
            datasets: [{
              label: 'Data',
              data: this.data as number[],
            }],
          };
        }
      } else if (this.data && typeof this.data === 'object') {
        // Check if it's already in the correct format
        if ('labels' in this.data && 'datasets' in this.data) {
          this.parsedData = this.data as SpectrumChartData;
        } else {
          // Try to extract data from object
          this.parsedData = this.data as SpectrumChartData;
        }
      } else {
        this.parsedData = { labels: [], datasets: [] };
      }
      
      this.debugLog('Data parsed:', this.parsedData);
    } catch (error) {
      console.error('[spectrum-chart] Failed to parse data:', error);
      this.parsedData = { labels: [], datasets: [] };
    }
  }
  
  /**
   * Transform raw data array (objects) into Chart.js format using config
   */
  private transformRawData(rawData: any[]): SpectrumChartData {
    const config = this.parsedConfig;
    
    this.debugLog('Transforming raw data...', { 
      rawDataLength: rawData.length,
      firstItem: rawData[0],
      config 
    });
    
    // Use DataTransformer to convert raw data to Chart.js format
    const result = DataTransformer.toChartData(rawData, {
      labelField: config.labelField || config.xField,
      valueField: config.valueField || config.yField,
      datasetLabel: config.datasetLabel,
    });
    
    this.debugLog('Transformed data:', result);
    
    return result;
  }
  
  /**
   * Create Chart.js instance
   */
  private createChart() {
    if (!this.canvasElement) {
      this.debugLog('Canvas element not ready');
      return;
    }
    
    if (this.chart) {
      this.debugLog('Chart already exists, destroying first');
      this.destroyChart();
    }
    
    const chartConfig = this.buildChartConfig();
    
    this.debugLog('Creating chart with config:', chartConfig);
    
    try {
      this.error = null;
      this.chart = new Chart(this.canvasElement, chartConfig);
      this.debugLog('Chart created successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error creating chart';
      console.error('[spectrum-chart] Failed to create chart:', err);
      this.error = errorMessage;
    }
  }
  
  /**
   * Update existing chart
   */
  private updateChart() {
    if (!this.chart) {
      this.debugLog('No chart to update, creating new one');
      this.createChart();
      return;
    }
    
    const chartConfig = this.buildChartConfig();
    
    this.debugLog('Updating chart...');
    
    // Update data
    this.chart.data = chartConfig.data;
    
    // Update options
    if (chartConfig.options) {
      this.chart.options = chartConfig.options;
    }
    
    // Update chart
    this.chart.update();
    
    this.debugLog('Chart updated');
  }
  
  /**
   * Destroy Chart.js instance
   */
  private destroyChart() {
    if (this.chart) {
      this.debugLog('Destroying chart...');
      this.chart.destroy();
      this.chart = null;
      this.debugLog('Chart destroyed');
    }
  }
  
  /**
   * Build Chart.js configuration from component props
   */
  private buildChartConfig(): ChartConfiguration {
    const config = this.parsedConfig;
    const effectiveType = config.type || this.type;
    
    // Apply colors to datasets if not already specified
    const datasetsWithColors = this.parsedData.datasets.map((dataset, index) => {
      const colors = config.colors || DEFAULT_CHART_COLORS;
      const color = colors[index % colors.length];
      
      return {
        ...dataset,
        backgroundColor: dataset.backgroundColor || (
          effectiveType === 'line' 
            ? `${color}33` // 20% opacity for area fill
            : color
        ),
        borderColor: dataset.borderColor || color,
        borderWidth: dataset.borderWidth ?? 2,
        fill: dataset.fill ?? (effectiveType === 'line' ? true : undefined),
        tension: dataset.tension ?? (effectiveType === 'line' ? 0.4 : undefined),
      };
    });
    
    // Build Chart.js configuration
    const chartConfig: ChartConfiguration = {
      type: effectiveType,
      data: {
        labels: this.parsedData.labels,
        datasets: datasetsWithColors as any,
      },
      options: config.advancedOptions || {
        responsive: config.responsive !== false,
        maintainAspectRatio: config.maintainAspectRatio !== false,
        aspectRatio: config.aspectRatio || 2,
        animation: config.animated !== false ? {} : false as any,
        plugins: {
          legend: {
            display: config.showLegend !== false,
            position: config.legendPosition || 'top',
          },
          title: {
            display: !!(config.title || this.chartTitle),
            text: config.title || this.chartTitle || '',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                const value = context.parsed.y ?? context.parsed;
                label += this.formatValue(value, config.valueFormat, config);
                return label;
              },
            },
          },
        },
        scales: this.buildScalesConfig(effectiveType, config),
        onClick: (_event, elements, chart) => {
          // Handle element click (bar, point, segment, etc.)
          if (elements && elements.length > 0) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const index = element.index;
            const dataset = chart.data.datasets[datasetIndex];
            const label = chart.data.labels?.[index];
            const value = dataset.data[index];
            
            this.elementClick.emit({
              action: 'elementClick',
              chartType: effectiveType,
              datasetLabel: dataset.label,
              label: label,
              value: value,
              datasetIndex: datasetIndex,
              elementIndex: index,
              rawData: this.parsedData.datasets[datasetIndex]?.data?.[index],
            });
            
            this.debugLog('Element clicked:', { label, value, datasetIndex, index });
          }
        },
      },
    };
    
    return chartConfig;
  }
  
  /**
   * Build scales configuration for Chart.js
   */
  private buildScalesConfig(chartType: ChartType, config: SpectrumChartConfig): any {
    // Charts that don't use scales
    if (['pie', 'doughnut', 'polarArea'].includes(chartType)) {
      return undefined;
    }
    
    const scales: any = {};
    
    // X-axis
    if (['line', 'bar', 'scatter', 'bubble'].includes(chartType)) {
      scales.x = {
        display: true,
        title: {
          display: !!config.xAxisLabel,
          text: config.xAxisLabel || '',
        },
        grid: {
          display: config.showGrid !== false,
        },
        stacked: config.stacked || false,
      };
    }
    
    // Y-axis
    if (['line', 'bar', 'scatter', 'bubble'].includes(chartType)) {
      scales.y = {
        display: true,
        title: {
          display: !!config.yAxisLabel,
          text: config.yAxisLabel || '',
        },
        grid: {
          display: config.showGrid !== false,
        },
        min: config.minValue,
        max: config.maxValue,
        stacked: config.stacked || false,
        ticks: {
          callback: (value: any) => {
            return this.formatValue(value, config.valueFormat, config);
          },
        },
      };
    }
    
    // Radar scale
    if (chartType === 'radar') {
      scales.r = {
        beginAtZero: true,
        min: config.minValue,
        max: config.maxValue,
        ticks: {
          callback: (value: any) => {
            return this.formatValue(value, config.valueFormat, config);
          },
        },
      };
    }
    
    return Object.keys(scales).length > 0 ? scales : undefined;
  }
  
  /**
   * Format value based on format type
   */
  private formatValue(
    value: number,
    format?: string,
    config?: SpectrumChartConfig
  ): string {
    if (value === null || value === undefined) return '';
    
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    
    if (isNaN(numValue)) return String(value);
    
    switch (format) {
      case 'currency':
        const symbol = config?.currencySymbol || '$';
        return `${symbol}${numValue.toLocaleString(undefined, {
          minimumFractionDigits: config?.decimalPlaces || 2,
          maximumFractionDigits: config?.decimalPlaces || 2,
        })}`;
        
      case 'percent':
        return `${numValue.toFixed(config?.decimalPlaces || 1)}%`;
        
      case 'decimal':
        return numValue.toFixed(config?.decimalPlaces || 2);
        
      case 'number':
      default:
        return numValue.toLocaleString(undefined, {
          minimumFractionDigits: config?.decimalPlaces || 0,
          maximumFractionDigits: config?.decimalPlaces || 0,
        });
    }
  }
  
  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-chart] ${message}`, ...args);
    }
  }
  
  /**
   * Render loading state
   */
  private renderLoading() {
    return (
      <div 
        class="spectrum-chart__loading"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div class="spectrum-chart__spinner" aria-hidden="true"></div>
        <p class="spectrum-chart__loading-text">Loading chart...</p>
      </div>
    );
  }
  
  /**
   * Render error state
   */
  private renderError() {
    return (
      <div 
        class="spectrum-chart__error"
        role="alert"
        aria-live="assertive"
      >
        <span class="spectrum-chart__error-icon material-symbols-outlined" aria-hidden="true">
          error
        </span>
        <p class="spectrum-chart__error-message">
          {this.error || 'Failed to load chart'}
        </p>
      </div>
    );
  }
  
  /**
   * Generate accessible description for the chart
   */
  private getChartAriaLabel(): string {
    const title = this.parsedConfig.title || this.chartTitle;
    const type = this.parsedConfig.type || this.type;
    const datasetCount = this.parsedData.datasets?.length || 0;
    const labelCount = this.parsedData.labels?.length || 0;
    
    if (title) {
      return `${title}. ${type} chart with ${datasetCount} dataset${datasetCount !== 1 ? 's' : ''} and ${labelCount} data point${labelCount !== 1 ? 's' : ''}.`;
    }
    
    return `${type} chart with ${datasetCount} dataset${datasetCount !== 1 ? 's' : ''} and ${labelCount} data point${labelCount !== 1 ? 's' : ''}.`;
  }
  
  render() {
    const containerStyle = {
      width: this.width || '100%',
      height: this.height,
    };
    
    return (
      <Host class="chart-host">
        <div class="spectrum-chart" style={containerStyle}>
          {this.loading && this.renderLoading()}
          {!this.loading && this.error && this.renderError()}
          {!this.loading && !this.error && (
            <canvas
              ref={el => this.canvasElement = el as HTMLCanvasElement}
              class="spectrum-chart__canvas"
              role="img"
              aria-label={this.getChartAriaLabel()}
            />
          )}
        </div>
      </Host>
    );
  }
}

