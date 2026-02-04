import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import DashboardStore from '../spectrum-dashboard/store/dashboard.store';

/**
 * Filter definition interface
 */
export interface FilterDefinition {
  id: string;
  type: 'select' | 'multiSelect' | 'dateRange' | 'text' | 'number' | 'checkbox';
  label: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

/**
 * @slot - Default slot for custom filter content
 */
@Component({
  tag: 'spectrum-filter-panel',
  styleUrl: 'spectrum-filter-panel.scss',
  shadow: false,
})
export class SpectrumFilterPanel {
  /**
   * Filter definitions (can be JSON string or object array)
   */
  @Prop() filters: FilterDefinition[] | string = [];

  /**
   * Layout orientation
   */
  @Prop() layout: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Whether to show apply/reset buttons
   */
  @Prop() showButtons: boolean = true;

  /**
   * Whether to apply filters immediately on change
   */
  @Prop() immediate: boolean = false;

  /**
   * Dashboard context (optional)
   */
  @Prop() context: Record<string, any> = {};

  /**
   * Debug mode
   */
  @Prop() debug: boolean = false;

  /**
   * Emitted when filters change
   */
  @Event() filterChange: EventEmitter<Record<string, any>>;

  /**
   * Emitted when filters are applied
   */
  @Event() filterApply: EventEmitter<Record<string, any>>;

  /**
   * Emitted when filters are reset
   */
  @Event() filterReset: EventEmitter<void>;

  @State() parsedFilters: FilterDefinition[] = [];
  @State() filterValues: Record<string, any> = {};
  @State() pendingValues: Record<string, any> = {};

  componentWillLoad() {
    this.parseFilters();
    this.initializeValues();
  }

  @Watch('filters')
  onFiltersChange() {
    this.parseFilters();
    this.initializeValues();
  }

  private parseFilters() {
    try {
      if (typeof this.filters === 'string') {
        this.parsedFilters = JSON.parse(this.filters);
      } else if (Array.isArray(this.filters)) {
        this.parsedFilters = this.filters;
      } else {
        this.parsedFilters = [];
      }
    } catch (error) {
      console.error('[spectrum-filter-panel] Failed to parse filters:', error);
      this.parsedFilters = [];
    }
  }

  private initializeValues() {
    const initialValues: Record<string, any> = {};
    this.parsedFilters.forEach(filter => {
      if (filter.defaultValue !== undefined) {
        initialValues[filter.id] = filter.defaultValue;
      }
    });
    this.filterValues = initialValues;
    this.pendingValues = { ...initialValues };

    // If immediate mode, update store with defaults
    if (this.immediate && Object.keys(initialValues).length > 0) {
      this.updateDashboardStore(initialValues);
    }
  }

  private handleFilterChange(filterId: string, value: any) {
    this.pendingValues = {
      ...this.pendingValues,
      [filterId]: value,
    };

    if (this.immediate) {
      this.applyFilters();
    }

    this.filterChange.emit({ ...this.pendingValues });
  }

  private applyFilters() {
    this.filterValues = { ...this.pendingValues };
    this.updateDashboardStore(this.filterValues);
    this.filterApply.emit(this.filterValues);
  }

  private resetFilters() {
    const initialValues: Record<string, any> = {};
    this.parsedFilters.forEach(filter => {
      if (filter.defaultValue !== undefined) {
        initialValues[filter.id] = filter.defaultValue;
      }
    });

    this.filterValues = initialValues;
    this.pendingValues = { ...initialValues };
    this.updateDashboardStore(initialValues);
    this.filterReset.emit();
  }

  private updateDashboardStore(values: Record<string, any>) {
    DashboardStore.updateFilters(values);

    if (this.debug) {
      console.log('[spectrum-filter-panel] Updated store filters:', DashboardStore.getState().filters);
    }
  }

  private renderFilter(filter: FilterDefinition) {
    const value = this.pendingValues[filter.id];

    switch (filter.type) {
      case 'select':
        return (
          <div class="spectrum-filter-panel__filter">
            <label class="spectrum-filter-panel__label">
              {filter.label}
              {filter.validation?.required && <span class="spectrum-filter-panel__required">*</span>}
            </label>
            <spectrum-select
              placeholder={`Select ${filter.label}`}
              selectedValue={value || ''}
              options={JSON.stringify(filter.options || [])}
              required={filter.validation?.required}
              onSelectChange={(e: CustomEvent) => this.handleFilterChange(filter.id, e.detail.value)}
            />
          </div>
        );

      case 'multiSelect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div class="spectrum-filter-panel__filter">
            <label class="spectrum-filter-panel__label">
              {filter.label}
              {filter.validation?.required && <span class="spectrum-filter-panel__required">*</span>}
            </label>
            <spectrum-select
              placeholder={`Select ${filter.label}`}
              selectedValues={selectedValues}
              options={JSON.stringify(filter.options || [])}
              multiple
              required={filter.validation?.required}
              onSelectChange={(e: CustomEvent) => this.handleFilterChange(filter.id, e.detail.values)}
            />
          </div>
        );

      case 'text':
        return (
          <div class="spectrum-filter-panel__filter">
            <spectrum-text-input
              label={filter.label}
              placeholder={`Enter ${filter.label}`}
              value={value || ''}
              required={filter.validation?.required}
              onInputChange={(e: CustomEvent) => this.handleFilterChange(filter.id, e.detail)}
            />
          </div>
        );

      case 'number':
        return (
          <div class="spectrum-filter-panel__filter">
            <spectrum-text-input
              type="number"
              label={filter.label}
              placeholder={`Enter ${filter.label}`}
              value={value || ''}
              min={filter.validation?.min}
              max={filter.validation?.max}
              required={filter.validation?.required}
              onInputChange={(e: CustomEvent) => this.handleFilterChange(filter.id, e.detail)}
            />
          </div>
        );

      case 'dateRange':
        const dateValue = value || { start: '', end: '' };
        return (
          <div class="spectrum-filter-panel__filter spectrum-filter-panel__filter--date-range">
            <span class="spectrum-filter-panel__label">{filter.label}</span>
            <div class="spectrum-filter-panel__date-range">
              <spectrum-text-input
                type="date"
                value={dateValue.start || ''}
                size="small"
                onInputChange={(e: CustomEvent) =>
                  this.handleFilterChange(filter.id, {
                    ...dateValue,
                    start: e.detail,
                  })
                }
              />
              <span class="spectrum-filter-panel__date-separator">to</span>
              <spectrum-text-input
                type="date"
                value={dateValue.end || ''}
                size="small"
                onInputChange={(e: CustomEvent) =>
                  this.handleFilterChange(filter.id, {
                    ...dateValue,
                    end: e.detail,
                  })
                }
              />
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div class="spectrum-filter-panel__filter spectrum-filter-panel__filter--checkbox">
            <spectrum-switch
              checked={value || false}
              label={filter.label}
              onSwitchChange={(e: CustomEvent) => this.handleFilterChange(filter.id, e.detail.checked)}
            />
          </div>
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <Host class={`spectrum-filter-panel spectrum-filter-panel--${this.layout}`}>
        <div class="spectrum-filter-panel__container">
          <div class="spectrum-filter-panel__filters">
            {this.parsedFilters.map(filter => this.renderFilter(filter))}
            <slot />
          </div>

          {this.showButtons && !this.immediate && (
            <div class="spectrum-filter-panel__actions">
              <spectrum-button
                variant="primary"
                buttonText="Apply Filters"
                onClick={() => this.applyFilters()}
              ></spectrum-button>
              <spectrum-button
                variant="secondary"
                buttonText="Reset"
                onClick={() => this.resetFilters()}
              ></spectrum-button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}

