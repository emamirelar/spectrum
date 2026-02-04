import { Component, Host, h, Prop, Event, EventEmitter, State, Watch, Method } from '@stencil/core';

/**
 * Column definition interface
 */
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  format?: 'currency' | 'percent' | 'number' | 'date' | 'boolean';
  width?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Default sort configuration
 */
export interface DefaultSort {
  column: string;
  direction: 'asc' | 'desc';
}

/**
 * Table configuration interface
 */
export interface TableConfig {
  columns?: TableColumn[];
  sortable?: boolean;
  pageable?: boolean;
  pageSize?: number;
  selectable?: boolean;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  defaultSort?: DefaultSort;
}

/**
 * @slot empty - Content to show when table is empty
 * @slot loading - Content to show when table is loading
 */
@Component({
  tag: 'spectrum-data-table',
  styleUrl: 'spectrum-data-table.scss',
  shadow: false,
})
export class SpectrumDataTable {
  /**
   * Table data (array of objects or JSON string)
   */
  @Prop({ mutable: true }) data: any[] | string = [];

  /**
   * Table configuration (can be JSON string or object)
   */
  @Prop() config: TableConfig | string = {};

  /**
   * Column definitions (can be JSON string or array)
   */
  @Prop() columns: TableColumn[] | string = [];

  /**
   * Whether table is sortable
   */
  @Prop() sortable: boolean = true;

  /**
   * Default sort configuration (column key and direction)
   * Can be JSON string: '{"column": "name", "direction": "asc"}'
   * Or object: { column: 'name', direction: 'asc' }
   */
  @Prop() defaultSort: DefaultSort | string;

  /**
   * Whether table has pagination
   */
  @Prop() pageable: boolean = true;

  /**
   * Number of rows per page
   */
  @Prop() pageSize: number = 10;

  /**
   * Maximum height of the table (enables vertical scrolling)
   * Can be any valid CSS value: '400px', '50vh', 'calc(100vh - 200px)'
   */
  @Prop() maxHeight: string;

  /**
   * Whether rows are selectable
   */
  @Prop() selectable: boolean = false;

  /**
   * Loading state
   */
  @Prop() loading: boolean = false;

  /**
   * Dashboard context (optional)
   */
  @Prop() context: Record<string, any> = {};

  /**
   * Debug mode
   */
  @Prop() debug: boolean = false;

  /**
   * Emitted when row is clicked
   */
  @Event() rowClick: EventEmitter<any>;

  /**
   * Emitted when rows are selected
   */
  @Event() rowsSelected: EventEmitter<any[]>;

  /**
   * Emitted when sort changes
   */
  @Event() sortChange: EventEmitter<{ column: string; direction: 'asc' | 'desc' }>;

  /**
   * Emitted when page changes
   */
  @Event() pageChange: EventEmitter<{ page: number; pageSize: number }>;

  @State() parsedData: any[] = [];
  @State() parsedColumns: TableColumn[] = [];
  @State() parsedConfig: TableConfig = {};
  @State() sortColumn: string | null = null;
  @State() sortDirection: 'asc' | 'desc' = 'asc';
  @State() currentPage: number = 1;
  @State() selectedRows: Set<number> = new Set();

  componentWillLoad() {
    this.parseInputs();
  }

  @Watch('data')
  @Watch('config')
  @Watch('columns')
  onDataChange() {
    this.parseInputs();
  }

  /**
   * Public method to manually refresh/re-parse data
   */
  @Method()
  async refresh() {
    this.parseInputs();
    return true;
  }

  private parseInputs() {
    // Parse data
    try {
      if (typeof this.data === 'string') {
        this.parsedData = JSON.parse(this.data);
      } else if (Array.isArray(this.data)) {
        this.parsedData = this.data;
      } else {
        this.parsedData = [];
      }
    } catch (error) {
      console.error('[spectrum-data-table] Failed to parse data:', error);
      this.parsedData = [];
    }

    // Parse config
    try {
      if (typeof this.config === 'string') {
        this.parsedConfig = JSON.parse(this.config);
      } else {
        this.parsedConfig = this.config || {};
      }
    } catch (error) {
      console.error('[spectrum-data-table] Failed to parse config:', error);
      this.parsedConfig = {};
    }

    // Parse columns - check config first, then prop, then auto-generate
    try {
      if (typeof this.columns === 'string' && this.columns.trim()) {
        // Columns provided as JSON string prop
        this.parsedColumns = JSON.parse(this.columns);
      } else if (Array.isArray(this.columns) && this.columns.length > 0) {
        // Columns provided as array prop
        this.parsedColumns = this.columns;
      } else if (this.parsedConfig.columns && this.parsedConfig.columns.length > 0) {
        // Columns from config object (e.g., passed from dashboard-widget-host)
        this.parsedColumns = this.parsedConfig.columns;
      } else {
        // Auto-generate columns from data
        this.parsedColumns = this.generateColumns();
      }
    } catch (error) {
      console.error('[spectrum-data-table] Failed to parse columns:', error);
      this.parsedColumns = this.generateColumns();
    }

    // Apply default sort if configured and not already sorting
    if (!this.sortColumn) {
      this.applyDefaultSort();
    }

    if (this.debug) {
      console.log('[spectrum-data-table] Parsed:', {
        data: this.parsedData,
        columns: this.parsedColumns,
        config: this.parsedConfig,
        defaultSort: this.sortColumn ? { column: this.sortColumn, direction: this.sortDirection } : null,
      });
    }
  }

  /**
   * Apply default sort configuration
   */
  private applyDefaultSort() {
    // Check for default sort from prop first, then config
    let sortConfig: DefaultSort | null = null;

    // Parse defaultSort prop
    if (this.defaultSort) {
      if (typeof this.defaultSort === 'string') {
        try {
          sortConfig = JSON.parse(this.defaultSort);
        } catch (error) {
          console.error('[spectrum-data-table] Failed to parse defaultSort:', error);
        }
      } else {
        sortConfig = this.defaultSort;
      }
    }

    // Fallback to config.defaultSort
    if (!sortConfig && this.parsedConfig.defaultSort) {
      sortConfig = this.parsedConfig.defaultSort;
    }

    // Apply the sort
    if (sortConfig && sortConfig.column) {
      // Verify the column exists
      const columnExists = this.parsedColumns.some(col => col.key === sortConfig.column);
      if (columnExists) {
        this.sortColumn = sortConfig.column;
        this.sortDirection = sortConfig.direction || 'asc';
      } else if (this.debug) {
        console.warn(`[spectrum-data-table] Default sort column "${sortConfig.column}" not found in columns`);
      }
    }
  }

  private generateColumns(): TableColumn[] {
    if (this.parsedData.length === 0) return [];

    const firstRow = this.parsedData[0];
    return Object.keys(firstRow).map(key => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      sortable: true,
      align: 'left',
    }));
  }

  private formatValue(value: any, format?: string): string {
    if (value === null || value === undefined) return '';

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      case 'percent':
        return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value);
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return String(value);
    }
  }

  private handleSort(column: TableColumn) {
    if (!column.sortable && !this.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({ column: column.key, direction: this.sortDirection });
  }

  private handleRowClick(row: any, index: number) {
    // Calculate global index (accounting for pagination)
    const effectivePageSize = this.parsedConfig.pageSize || this.pageSize;
    const globalIndex = (this.currentPage - 1) * effectivePageSize + index;
    
    this.rowClick.emit({
      action: 'rowClick',
      row: row,
      rowIndex: index,
      currentPage: this.currentPage,
      globalIndex: globalIndex,
      allData: this.getSortedData(),
    });
  }

  private handleRowSelection(index: number, event: Event) {
    event.stopPropagation();
    
    const newSelected = new Set(this.selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    
    this.selectedRows = newSelected;
    
    const selectedData = this.getSortedAndPagedData().filter((_, i) => this.selectedRows.has(i));
    this.rowsSelected.emit(selectedData);
  }

  private getSortedData(): any[] {
    if (!this.sortColumn) return this.parsedData;

    return [...this.parsedData].sort((a, b) => {
      const aVal = a[this.sortColumn];
      const bVal = b[this.sortColumn];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  private getSortedAndPagedData(): any[] {
    const sorted = this.getSortedData();
    
    if (!this.pageable && !this.parsedConfig.pageable) {
      return sorted;
    }

    const size = this.parsedConfig.pageSize || this.pageSize;
    const start = (this.currentPage - 1) * size;
    const end = start + size;
    
    return sorted.slice(start, end);
  }

  private getTotalPages(): number {
    const size = this.parsedConfig.pageSize || this.pageSize;
    return Math.ceil(this.parsedData.length / size);
  }

  private handlePageChange(page: number) {
    if (page < 1 || page > this.getTotalPages()) return;
    
    this.currentPage = page;
    this.pageChange.emit({ page, pageSize: this.parsedConfig.pageSize || this.pageSize });
  }

  private renderPagination() {
    if (!this.pageable && !this.parsedConfig.pageable) return null;

    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    
    // Show first page, current page neighbors, and last page
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        pages.push(i);
      }
    }

    return (
      <div class="spectrum-data-table__pagination">
        <button
          class="spectrum-data-table__page-button"
          disabled={this.currentPage === 1}
          onClick={() => this.handlePageChange(this.currentPage - 1)}
        >
          Previous
        </button>
        
        {pages.map((page, index) => (
          <div>
            {index > 0 && pages[index - 1] !== page - 1 && (
              <span class="spectrum-data-table__page-ellipsis">...</span>
            )}
            <button
              class={`spectrum-data-table__page-button ${page === this.currentPage ? 'spectrum-data-table__page-button--active' : ''}`}
              onClick={() => this.handlePageChange(page)}
            >
              {page}
            </button>
          </div>
        ))}
        
        <button
          class="spectrum-data-table__page-button"
          disabled={this.currentPage === totalPages}
          onClick={() => this.handlePageChange(this.currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }

  render() {
    const displayData = this.getSortedAndPagedData();
    const striped = this.parsedConfig.striped ?? true;
    const bordered = this.parsedConfig.bordered ?? true;
    const hoverable = this.parsedConfig.hoverable ?? true;
    const dense = this.parsedConfig.dense ?? false;

    // Build inline styles for max-height if specified
    const hostStyles: { [key: string]: string } = {};
    if (this.maxHeight) {
      hostStyles['--table-max-height'] = this.maxHeight;
    }

    return (
      <Host
        class={{
          'spectrum-data-table': true,
          'spectrum-data-table--loading': this.loading,
          'spectrum-data-table--striped': striped,
          'spectrum-data-table--bordered': bordered,
          'spectrum-data-table--hoverable': hoverable,
          'spectrum-data-table--dense': dense,
        }}
        style={Object.keys(hostStyles).length > 0 ? hostStyles : undefined}
      >
        <div class="spectrum-data-table__container">
          {this.loading && (
            <div class="spectrum-data-table__loading">
              <slot name="loading">
                <div class="spectrum-data-table__spinner"></div>
                <p>Loading data...</p>
              </slot>
            </div>
          )}

          {!this.loading && displayData.length === 0 && (
            <div class="spectrum-data-table__empty">
              <slot name="empty">
                <p>No data available</p>
              </slot>
            </div>
          )}

          {!this.loading && displayData.length > 0 && (
            <div class="spectrum-data-table__wrapper">
              <table class="spectrum-data-table__table">
                <thead class="spectrum-data-table__thead">
                  <tr class="spectrum-data-table__row">
                    {this.selectable && <th class="spectrum-data-table__header spectrum-data-table__header--checkbox"></th>}
                    {this.parsedColumns.map(column => (
                      <th
                        class={{
                          'spectrum-data-table__header': true,
                          'spectrum-data-table__header--sortable': column.sortable ?? this.sortable,
                          'spectrum-data-table__header--sorted': this.sortColumn === column.key,
                        }}
                        style={{ width: column.width, textAlign: column.align }}
                        onClick={() => this.handleSort(column)}
                      >
                        <div class="spectrum-data-table__header-content">
                          <span>{column.label}</span>
                          {(column.sortable ?? this.sortable) && (
                            <span 
                              class={{
                                'spectrum-data-table__sort-icon': true,
                                'spectrum-data-table__sort-icon--active': this.sortColumn === column.key,
                                'material-symbols-outlined': true,
                              }}
                              aria-label={
                                this.sortColumn === column.key 
                                  ? `Sorted ${this.sortDirection === 'asc' ? 'ascending' : 'descending'}`
                                  : 'Click to sort'
                              }
                            >
                              {this.sortColumn === column.key 
                                ? (this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward')
                                : 'unfold_more'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody class="spectrum-data-table__tbody">
                  {displayData.map((row, index) => (
                    <tr
                      class="spectrum-data-table__row"
                      onClick={() => this.handleRowClick(row, index)}
                    >
                      {this.selectable && (
                        <td class="spectrum-data-table__cell spectrum-data-table__cell--checkbox">
                          <input
                            type="checkbox"
                            checked={this.selectedRows.has(index)}
                            onChange={(e) => this.handleRowSelection(index, e)}
                          />
                        </td>
                      )}
                      {this.parsedColumns.map(column => (
                        <td
                          class="spectrum-data-table__cell"
                          style={{ textAlign: column.align }}
                        >
                          {this.formatValue(row[column.key], column.format)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!this.loading && displayData.length > 0 && this.renderPagination()}
        </div>
      </Host>
    );
  }
}

