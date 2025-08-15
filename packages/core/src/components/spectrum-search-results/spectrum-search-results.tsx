import { Component, Host, h, Prop, Event, EventEmitter, State, Watch, Method } from '@stencil/core';

// ==============================================
// TypeScript Interfaces
// ==============================================

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url?: string;
  metadata?: Record<string, any>;
  thumbnail?: string;
  timestamp?: string;
  score?: number;
}

export interface PaginationOptions {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxPageButtons?: number;
}

export interface SearchResultsData {
  results: SearchResult[];
  pagination: PaginationOptions;
  query?: string;
  executionTime?: number;
}

export interface SearchResultActionPayload {
  action: 'click' | 'navigate' | 'select';
  result: SearchResult;
  index: number;
}

export interface PaginationActionPayload {
  action: 'page-change' | 'next' | 'previous' | 'first' | 'last';
  currentPage: number;
  targetPage: number;
  totalPages: number;
}

/**
 * Translation interface for comprehensive localization support
 */
export interface SearchResultsTranslations {
  // Results summary
  resultSingular?: string;
  resultPlural?: string;
  queryPrefix?: string;
  executionTime?: string;
  
  // Pagination
  pagination?: {
    showingText?: string;
    ofText?: string;
    resultsText?: string;
    firstButton?: string;
    previousButton?: string;
    nextButton?: string;
    lastButton?: string;
  };
  
  // States
  loading?: string;
  emptyMessage?: string;
  
  // Accessibility
  accessibility?: {
    resultClickLabel?: string;
    paginationLabel?: string;
    currentPageLabel?: string;
    goToPageLabel?: string;
  };
}

@Component({
  tag: 'spectrum-search-results',
  styleUrl: 'spectrum-search-results.scss',
  shadow: true,
})
export class SpectrumSearchResults {
  // ==============================================
  // Properties
  // ==============================================

  /**
   * Search results data containing results array and pagination info
   */
  @Prop() data: SearchResultsData | string = { results: [], pagination: { currentPage: 1, totalPages: 1, totalResults: 0, resultsPerPage: 10 } };

  /**
   * Number of results to display per page
   */
  @Prop() resultsPerPage: number = 10;

  /**
   * Show result thumbnails if available
   */
  @Prop() showThumbnails: boolean = true;

  /**
   * Show result metadata
   */
  @Prop() showMetadata: boolean = true;

  /**
   * Show result scores if available
   */
  @Prop() showScores: boolean = false;

  /**
   * Show pagination controls
   */
  @Prop() showPagination: boolean = true;

  /**
   * Maximum number of page buttons to show in pagination
   */
  @Prop() maxPageButtons: number = 5;

  /**
   * Loading state
   */
  @Prop() loading: boolean = false;

  /**
   * Empty state message
   */
  @Prop() emptyMessage: string = 'No results found';

  /**
   * Custom result template slot name
   */
  @Prop() resultTemplate?: string;

  /**
   * Enable URL synchronization for pagination state
   */
  @Prop({ reflect: true }) enableUrlSync: boolean = false;

  /**
   * URL parameter name for page number (default: 'page')
   */
  @Prop() pageParam: string = 'page';

  /**
   * URL parameter name for results per page (default: 'size')
   */
  @Prop() sizeParam: string = 'size';

  // ==============================================
  // Localization Support
  // ==============================================

  /**
   * Translation object for customizing all user-facing text.
   * Provide only the strings you want to override - missing values will use English defaults.
   * 
   * @example
   * ```typescript
   * // French translation
   * const frenchTranslations = {
   *   resultSingular: 'résultat',
   *   resultPlural: 'résultats',
   *   queryPrefix: 'pour',
   *   pagination: {
   *     showingText: 'Affichage',
   *     ofText: 'de',
   *     resultsText: 'résultats',
   *     firstButton: 'Premier',
   *     previousButton: 'Précédent',
   *     nextButton: 'Suivant',
   *     lastButton: 'Dernier'
   *   },
   *   loading: 'Chargement des résultats...',
   *   emptyMessage: 'Aucun résultat trouvé'
   * };
   * ```
   */
  @Prop() translations: SearchResultsTranslations = {};

  // ==============================================
  // State
  // ==============================================

  @State() parsedData: SearchResultsData = { 
    results: [], 
    pagination: { currentPage: 1, totalPages: 1, totalResults: 0, resultsPerPage: 10 } 
  };

  // ==============================================
  // Default English Translations
  // ==============================================

  private readonly defaultTranslations: SearchResultsTranslations = {
    resultSingular: 'result',
    resultPlural: 'results',
    queryPrefix: 'for',
    executionTime: 'ms',
    pagination: {
      showingText: 'Showing',
      ofText: 'of',
      resultsText: 'results',
      firstButton: 'First',
      previousButton: 'Previous',
      nextButton: 'Next',
      lastButton: 'Last'
    },
    loading: 'Loading results...',
    emptyMessage: 'No results found',
    accessibility: {
      resultClickLabel: 'Click to view result',
      paginationLabel: 'Search results pagination',
      currentPageLabel: 'Current page',
      goToPageLabel: 'Go to page'
    }
  };

  /**
   * Get merged translations (defaults + user overrides)
   */
  private getTranslations(): SearchResultsTranslations {
    return {
      resultSingular: this.translations.resultSingular ?? this.defaultTranslations.resultSingular,
      resultPlural: this.translations.resultPlural ?? this.defaultTranslations.resultPlural,
      queryPrefix: this.translations.queryPrefix ?? this.defaultTranslations.queryPrefix,
      executionTime: this.translations.executionTime ?? this.defaultTranslations.executionTime,
      pagination: {
        showingText: this.translations.pagination?.showingText ?? this.defaultTranslations.pagination.showingText,
        ofText: this.translations.pagination?.ofText ?? this.defaultTranslations.pagination.ofText,
        resultsText: this.translations.pagination?.resultsText ?? this.defaultTranslations.pagination.resultsText,
        firstButton: this.translations.pagination?.firstButton ?? this.defaultTranslations.pagination.firstButton,
        previousButton: this.translations.pagination?.previousButton ?? this.defaultTranslations.pagination.previousButton,
        nextButton: this.translations.pagination?.nextButton ?? this.defaultTranslations.pagination.nextButton,
        lastButton: this.translations.pagination?.lastButton ?? this.defaultTranslations.pagination.lastButton
      },
      loading: this.translations.loading ?? this.defaultTranslations.loading,
      emptyMessage: this.translations.emptyMessage ?? this.defaultTranslations.emptyMessage,
      accessibility: {
        resultClickLabel: this.translations.accessibility?.resultClickLabel ?? this.defaultTranslations.accessibility.resultClickLabel,
        paginationLabel: this.translations.accessibility?.paginationLabel ?? this.defaultTranslations.accessibility.paginationLabel,
        currentPageLabel: this.translations.accessibility?.currentPageLabel ?? this.defaultTranslations.accessibility.currentPageLabel,
        goToPageLabel: this.translations.accessibility?.goToPageLabel ?? this.defaultTranslations.accessibility.goToPageLabel
      }
    };
  }

  // ==============================================
  // Public Methods
  // ==============================================

  /**
   * Navigate to a specific page programmatically
   * @param page - The page number to navigate to
   * @param updateUrl - Whether to update the URL (default: respects enableUrlSync setting)
   */
  @Method()
  async navigateToPage(page: number, updateUrl?: boolean): Promise<void> {
    const totalPages = this.parsedData.pagination.totalPages;
    const currentPage = this.parsedData.pagination.currentPage;
    
    // Validate page number
    if (page < 1 || page > totalPages) {
      throw new Error(`Invalid page number: ${page}. Must be between 1 and ${totalPages}`);
    }
    
    // Update internal pagination state
    this.parsedData = {
      ...this.parsedData,
      pagination: {
        ...this.parsedData.pagination,
        currentPage: page
      }
    };
    
    const shouldUpdateUrl = updateUrl !== undefined ? updateUrl : this.enableUrlSync;
    
    // Update URL if requested
    if (shouldUpdateUrl) {
      this.updateUrlParams(page, this.parsedData.pagination.resultsPerPage);
    }
    
    // Emit pagination event
    this.paginationAction.emit({
      action: 'page-change',
      currentPage: currentPage,
      targetPage: page,
      totalPages: totalPages
    });
  }

  /**
   * Get current pagination state including URL parameters
   */
  @Method()
  async getPaginationState(): Promise<{ 
    currentPage: number; 
    totalPages: number; 
    totalResults: number; 
    resultsPerPage: number;
    urlParams: { page: number; size: number };
  }> {
    return {
      currentPage: this.parsedData.pagination.currentPage,
      totalPages: this.parsedData.pagination.totalPages,
      totalResults: this.parsedData.pagination.totalResults,
      resultsPerPage: this.parsedData.pagination.resultsPerPage,
      urlParams: this.getUrlParameters()
    };
  }

  // ==============================================
  // Events
  // ==============================================

  /**
   * Emitted when a search result is clicked or interacted with
   */
  @Event({
    eventName: 'resultAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) resultAction: EventEmitter<SearchResultActionPayload>;

  /**
   * Emitted when pagination controls are used
   */
  @Event({
    eventName: 'paginationAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) paginationAction: EventEmitter<PaginationActionPayload>;

  // ==============================================
  // Watchers
  // ==============================================

  @Watch('data')
  watchDataChange(newData: SearchResultsData | string) {
    this.parseData(newData);
  }

  @Watch('resultsPerPage')
  watchResultsPerPageChange(newResultsPerPage: number) {
    if (this.parsedData.pagination) {
      const currentPage = this.parsedData.pagination.currentPage;
      const newTotalPages = Math.ceil(this.parsedData.pagination.totalResults / newResultsPerPage);
      
      this.parsedData = {
        ...this.parsedData,
        pagination: {
          ...this.parsedData.pagination,
          resultsPerPage: newResultsPerPage,
          totalPages: newTotalPages,
          // Adjust current page if it exceeds new total pages
          currentPage: Math.min(currentPage, newTotalPages)
        }
      };
      
      // Update URL if URL sync is enabled
      if (this.enableUrlSync) {
        this.updateUrlParams(this.parsedData.pagination.currentPage, newResultsPerPage);
      }
    }
  }

  // ==============================================
  // Lifecycle Methods
  // ==============================================

  componentWillLoad() {
    this.parseData(this.data);
    
    // Initialize from URL if URL sync is enabled
    if (this.enableUrlSync) {
      this.initializeFromUrl();
    }
  }

  // ==============================================
  // URL Management Methods
  // ==============================================

  private initializeFromUrl() {
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = parseInt(urlParams.get(this.pageParam) || '1', 10);
    const sizeFromUrl = parseInt(urlParams.get(this.sizeParam) || this.resultsPerPage.toString(), 10);
    
    // Update pagination state from URL
    if (this.parsedData.pagination) {
      this.parsedData = {
        ...this.parsedData,
        pagination: {
          ...this.parsedData.pagination,
          currentPage: Math.max(1, pageFromUrl),
          resultsPerPage: Math.max(1, sizeFromUrl)
        }
      };
    }
    
    // Update component property
    this.resultsPerPage = sizeFromUrl;
  }

  private updateUrlParams(page: number, size?: number) {
    if (!this.enableUrlSync || typeof window === 'undefined') {
      return;
    }
    
    const url = new URL(window.location.href);
    const params = url.searchParams;
    
    // Update page parameter
    if (page > 1) {
      params.set(this.pageParam, page.toString());
    } else {
      params.delete(this.pageParam);
    }
    
    // Update size parameter if provided and different from default
    if (size && size !== 10) {
      params.set(this.sizeParam, size.toString());
    } else if (size === 10) {
      params.delete(this.sizeParam);
    }
    
    // Update URL without triggering page reload
    const newUrl = url.pathname + (params.toString() ? '?' + params.toString() : '') + url.hash;
    window.history.replaceState(null, '', newUrl);
  }

  private getUrlParameters(): { page: number; size: number } {
    if (typeof window === 'undefined') {
      return { page: 1, size: this.resultsPerPage };
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get(this.pageParam) || '1', 10);
    const size = parseInt(urlParams.get(this.sizeParam) || this.resultsPerPage.toString(), 10);
    
    return {
      page: Math.max(1, page),
      size: Math.max(1, size)
    };
  }

  // ==============================================
  // Private Methods
  // ==============================================

  private parseData(data: SearchResultsData | string) {
    if (typeof data === 'string') {
      try {
        this.parsedData = JSON.parse(data);
      } catch (e) {
        console.error('Failed to parse search results data:', e);
        this.parsedData = { 
          results: [], 
          pagination: { currentPage: 1, totalPages: 1, totalResults: 0, resultsPerPage: this.resultsPerPage } 
        };
      }
    } else {
      this.parsedData = {
        ...data,
        pagination: {
          resultsPerPage: this.resultsPerPage,
          showFirstLast: true,
          showPrevNext: true,
          maxPageButtons: this.maxPageButtons,
          ...data.pagination
        }
      };
    }
  }

  private handleResultClick(result: SearchResult, index: number, action: 'click' | 'navigate' | 'select' = 'click') {
    this.resultAction.emit({
      action,
      result,
      index
    });
  }

  private handlePaginationClick(targetPage: number, action: 'page-change' | 'next' | 'previous' | 'first' | 'last') {
    const currentPage = this.parsedData.pagination.currentPage;
    const totalPages = this.parsedData.pagination.totalPages;

    // Validate target page
    if (targetPage < 1 || targetPage > totalPages) {
      return;
    }

    // Update internal pagination state
    this.parsedData = {
      ...this.parsedData,
      pagination: {
        ...this.parsedData.pagination,
        currentPage: targetPage
      }
    };

    // Update URL if URL sync is enabled
    if (this.enableUrlSync) {
      this.updateUrlParams(targetPage, this.parsedData.pagination.resultsPerPage);
    }

    this.paginationAction.emit({
      action,
      currentPage,
      targetPage,
      totalPages
    });
  }

  private formatTimestamp(timestamp: string): string {
    try {
      return new Date(timestamp).toLocaleDateString();
    } catch {
      return timestamp;
    }
  }

  private truncateDescription(description: string, maxLength: number = 150): string {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength).trim() + '...';
  }

  private generatePageNumbers(): number[] {
    const { currentPage, totalPages } = this.parsedData.pagination;
    const maxButtons = Math.min(this.maxPageButtons, totalPages);
    const pages: number[] = [];

    if (totalPages <= maxButtons) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate range around current page
      const halfButtons = Math.floor(maxButtons / 2);
      let start = Math.max(1, currentPage - halfButtons);
      let end = Math.min(totalPages, start + maxButtons - 1);

      // Adjust start if we're near the end
      if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  private getCurrentPageResults(): SearchResult[] {
    const { currentPage, resultsPerPage } = this.parsedData.pagination;
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    
    return this.parsedData.results.slice(startIndex, endIndex);
  }

  // ==============================================
  // Render Methods
  // ==============================================

  private renderResult(result: SearchResult, index: number) {
    return (
      <div class="spectrum-search-results__item" key={result.id}>
        <div class="spectrum-search-results__item-content" onClick={() => this.handleResultClick(result, index)}>
          {this.showThumbnails && result.thumbnail && (
            <div class="spectrum-search-results__thumbnail">
              <img src={result.thumbnail} alt="" loading="lazy" />
            </div>
          )}
          
          <div class="spectrum-search-results__details">
            <div class="spectrum-search-results__header">
              <h3 class="spectrum-search-results__title">{result.title}</h3>
              {this.showScores && result.score && (
                <span class="spectrum-search-results__score">
                  Score: {result.score.toFixed(2)}
                </span>
              )}
            </div>

            {result.description && (
              <p class="spectrum-search-results__description">
                {this.truncateDescription(result.description)}
              </p>
            )}

            {result.url && (
              <div class="spectrum-search-results__url">
                {result.url}
              </div>
            )}

            <div class="spectrum-search-results__meta">
              {result.timestamp && (
                <span class="spectrum-search-results__timestamp">
                  {this.formatTimestamp(result.timestamp)}
                </span>
              )}
              
              {this.showMetadata && result.metadata && Object.keys(result.metadata).length > 0 && (
                <div class="spectrum-search-results__metadata">
                  {Object.entries(result.metadata).map(([key, value]) => (
                    <span class="spectrum-search-results__metadata-item" key={key}>
                      <strong>{key}:</strong> {String(value)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderPagination() {
    if (!this.showPagination || this.parsedData.pagination.totalPages <= 1) {
      return null;
    }

    const { currentPage, totalPages, totalResults, resultsPerPage } = this.parsedData.pagination;
    const pageNumbers = this.generatePageNumbers();
    const startResult = (currentPage - 1) * resultsPerPage + 1;
    const endResult = Math.min(currentPage * resultsPerPage, totalResults);
    const t = this.getTranslations();

    return (
      <div class="spectrum-search-results__pagination" aria-label={t.accessibility.paginationLabel}>
        <div class="spectrum-search-results__pagination-info">
          {t.pagination.showingText} {startResult}-{endResult} {t.pagination.ofText} {totalResults} {t.pagination.resultsText}
        </div>

        <div class="spectrum-search-results__pagination-controls">
          {/* First page button */}
          {this.parsedData.pagination.showFirstLast && currentPage > 1 && (
            <spectrum-button 
              variant="secondary"
              size="sm"
              button-text={t.pagination.firstButton}
              show-button-text="true"
              aria-label={`${t.accessibility.goToPageLabel} 1`}
              onButtonAction={() => this.handlePaginationClick(1, 'first')}
            ></spectrum-button>
          )}

          {/* Previous button */}
          {this.parsedData.pagination.showPrevNext && currentPage > 1 && (
            <spectrum-button 
              variant="secondary"
              size="sm"
              button-text={t.pagination.previousButton}
              show-button-text="true"
              aria-label={`${t.accessibility.goToPageLabel} ${currentPage - 1}`}
              onButtonAction={() => this.handlePaginationClick(currentPage - 1, 'previous')}
            ></spectrum-button>
          )}

          {/* Page number buttons */}
          {pageNumbers.map(pageNum => (
            <spectrum-button
              key={pageNum}
              variant={pageNum === currentPage ? 'primary' : 'secondary'}
              size="sm"
              button-text={pageNum.toString()}
              show-button-text="true"
              aria-label={pageNum === currentPage ? `${t.accessibility.currentPageLabel} ${pageNum}` : `${t.accessibility.goToPageLabel} ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
              onButtonAction={() => this.handlePaginationClick(pageNum, 'page-change')}
            ></spectrum-button>
          ))}

          {/* Next button */}
          {this.parsedData.pagination.showPrevNext && currentPage < totalPages && (
            <spectrum-button 
              variant="secondary"
              size="sm"
              button-text={t.pagination.nextButton}
              show-button-text="true"
              aria-label={`${t.accessibility.goToPageLabel} ${currentPage + 1}`}
              onButtonAction={() => this.handlePaginationClick(currentPage + 1, 'next')}
            ></spectrum-button>
          )}

          {/* Last page button */}
          {this.parsedData.pagination.showFirstLast && currentPage < totalPages && (
            <spectrum-button 
              variant="secondary"
              size="sm"
              button-text={t.pagination.lastButton}
              show-button-text="true"
              aria-label={`${t.accessibility.goToPageLabel} ${totalPages}`}
              onButtonAction={() => this.handlePaginationClick(totalPages, 'last')}
            ></spectrum-button>
          )}
        </div>
      </div>
    );
  }

  private renderLoading() {
    const t = this.getTranslations();
    return (
      <div class="spectrum-search-results__loading">
        <div class="spectrum-search-results__loading-spinner"></div>
        <p>{t.loading}</p>
      </div>
    );
  }

  private renderEmpty() {
    const t = this.getTranslations();
    return (
      <div class="spectrum-search-results__empty">
        <p>{this.emptyMessage || t.emptyMessage}</p>
      </div>
    );
  }

  private renderSummary() {
    const { pagination, query, executionTime } = this.parsedData;
    const totalResults = pagination?.totalResults;
    const t = this.getTranslations();
    
    if (totalResults === undefined) {
      return null;
    }

    return (
      <div class="spectrum-search-results__summary">
        <span class="spectrum-search-results__count">
          {totalResults} {totalResults === 1 ? t.resultSingular : t.resultPlural}
        </span>
        {query && (
          <span class="spectrum-search-results__query">
            {t.queryPrefix} "{query}"
          </span>
        )}
        {executionTime && (
          <span class="spectrum-search-results__timing">
            ({executionTime}{t.executionTime})
          </span>
        )}
      </div>
    );
  }

  // ==============================================
  // Render
  // ==============================================

  render() {
    if (this.loading) {
      return (
        <Host>
          <div class="spectrum-search-results">
            {this.renderLoading()}
          </div>
        </Host>
      );
    }

    if (!this.parsedData.results || this.parsedData.results.length === 0) {
      return (
        <Host>
          <div class="spectrum-search-results">
            {this.renderEmpty()}
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class="spectrum-search-results">
          {this.renderSummary()}
          
          <div class="spectrum-search-results__list">
            {this.getCurrentPageResults().map((result, index) => {
              // Calculate the actual index in the full results array
              const { currentPage, resultsPerPage } = this.parsedData.pagination;
              const actualIndex = (currentPage - 1) * resultsPerPage + index;
              return this.renderResult(result, actualIndex);
            })}
          </div>

          {this.renderPagination()}
        </div>
      </Host>
    );
  }
}