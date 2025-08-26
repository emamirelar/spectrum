import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumSearchResults Component
 * 
 * The search-results component displays search results in a structured, paginated format with customizable display options and flexible navigation modes.
 * 
 * ### Key Features
 * - **Dual Navigation Modes**: Event-based (SPA) or direct HTML links (traditional)
 * - **Transparent Background**: No default background - integrates seamlessly with any design
 * - **Pagination**: Full pagination support with URL synchronization
 * - **Customizable Display**: Toggle thumbnails, metadata, scores, and pagination
 * - **Internationalization**: Full translation support for all user-facing text
 * - **Responsive Design**: Adapts to different screen sizes and content types
 * - **URL Synchronization**: Deep linking support with pagination state in URL
 * - **Accessibility**: Full ARIA support and keyboard navigation
 * 
 * ### Navigation Modes
 * - **Event-based (directNavigation=false)**: Perfect for SPAs - emits events for custom navigation handling
 * - **Direct links (directNavigation=true)**: Standard HTML links for traditional web navigation
 * 
 * ### Usage Guidelines
 * - **Use for**: Displaying search results, product listings, document collections
 * - **Avoid when**: Showing single items or small lists that don't need pagination
 * - **Choose event navigation for**: Single-page applications, custom routing, analytics tracking
 * - **Choose direct navigation for**: Multi-page sites, SEO-friendly links, standard browser behavior
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **resultAction**: Emitted when a result is clicked with action: 'click', 'navigate', or 'select'
 * - **paginationAction**: Emitted on pagination with action: 'page-change', 'next', 'previous', 'first', or 'last'
 */

// Import types from the component
type SearchResultsData = any; // This will be properly typed by the component
type SearchResultsTranslations = any; // This will be properly typed by the component

// Component interfaces for TypeScript support
interface SpectrumSearchResultsElement extends HTMLElement {
  data: SearchResultsData | string;
  resultsPerPage: number;
  showThumbnails: boolean;
  showMetadata: boolean;
  showScores: boolean;
  showPagination: boolean;
  maxPageButtons: number;
  loading: boolean;
  emptyMessage: string;
  resultTemplate: string;
  enableUrlSync: boolean;
  pageParam: string;
  sizeParam: string;
  translations: SearchResultsTranslations;
  directNavigation: boolean;
}

// Story arguments interface
interface SpectrumSearchResultsArgs extends SpectrumSearchResultsElement {}

// Sample data for stories
const sampleResults = [
  {
    id: '1',
    title: 'Advanced Web Components Development',
    description: 'Learn how to build advanced web components using StencilJS and modern web technologies.',
    url: 'https://stenciljs.com/docs/introduction',
    score: 0.95,
    metadata: {
      author: 'John Doe',
      publishDate: '2024-01-15',
      category: 'Development',
      tags: ['web-components', 'javascript', 'stencil']
    },
    thumbnail: 'https://picsum.photos/300/200?random=1'
  },
  {
    id: '2',
    title: 'Building Responsive Design Systems',
    description: 'A comprehensive guide to creating scalable and responsive design systems for modern applications.',
    url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design',
    score: 0.87,
    metadata: {
      author: 'Jane Smith',
      publishDate: '2024-01-10',
      category: 'Design',
      tags: ['design-system', 'css', 'responsive']
    },
    thumbnail: 'https://picsum.photos/300/200?random=2'
  },
  {
    id: '3',
    title: 'TypeScript Best Practices',
    description: 'Essential TypeScript patterns and practices for large-scale application development.',
    url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
    score: 0.82,
    metadata: {
      author: 'Mike Johnson',
      publishDate: '2024-01-05',
      category: 'Programming',
      tags: ['typescript', 'javascript', 'best-practices']
    },
    thumbnail: 'https://picsum.photos/300/200?random=3'
  },
  {
    id: '4',
    title: 'Performance Optimization Techniques',
    description: 'Modern techniques for optimizing web application performance and user experience.',
    url: 'https://web.dev/performance-scoring/',
    score: 0.78,
    metadata: {
      author: 'Sarah Wilson',
      publishDate: '2023-12-28',
      category: 'Performance',
      tags: ['performance', 'optimization', 'web-vitals']
    },
    thumbnail: 'https://picsum.photos/300/200?random=4'
  },
  {
    id: '5',
    title: 'Accessibility in Modern Web Development',
    description: 'Implementing comprehensive accessibility features in contemporary web applications.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility',
    score: 0.74,
    metadata: {
      author: 'David Brown',
      publishDate: '2023-12-20',
      category: 'Accessibility',
      tags: ['accessibility', 'a11y', 'inclusive-design']
    },
    thumbnail: 'https://picsum.photos/300/200?random=5'
  }
];

const basicData = {
  query: 'web development',
  results: sampleResults,
  pagination: {
    currentPage: 1,
    totalPages: 2,
    totalResults: 5,
    resultsPerPage: 3,
    showPrevNext: true,
    showFirstLast: true
  },
  executionTime: 125
};

const paginatedData = {
  query: 'development tutorials',
  results: sampleResults,
  pagination: {
    currentPage: 1,
    totalPages: 3,
    totalResults: 8,
    resultsPerPage: 3,
    showPrevNext: true,
    showFirstLast: true
  },
  executionTime: 89
};

const meta: Meta<SpectrumSearchResultsArgs> = {
  title: 'Spectrum/Components/SpectrumSearchResults',
  parameters: {
    docs: {
      description: {
        component: `
The search-results component provides...

### Event System
- resultAction: Component interaction
- paginationAction: Component interaction

### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    data: basicData,
    resultsPerPage: 3,
    showThumbnails: true,
    showMetadata: true,
    showScores: false,
    showPagination: true,
    maxPageButtons: 5,
    loading: false,
    emptyMessage: 'No results found',
    resultTemplate: '',
    enableUrlSync: false,
    pageParam: 'page',
    sizeParam: 'size',
    translations: {},
    directNavigation: false,
  },
  argTypes: {
    data: {
      control: 'select',
      options: ['SearchResultsData', 'string'],
      description: 'The data property',
      table: {
        type: { summary: 'SearchResultsData | string' },
        defaultValue: { summary: '{ results: [], pagination: { currentPage: 1, totalPages: 1, totalResults: 0, resultsPerPage: 10 } }' }
      }
    },
    resultsPerPage: {
      control: 'number',
      description: 'The resultsPerPage property',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' }
      }
    },
    showThumbnails: {
      control: 'boolean',
      description: 'The showThumbnails property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showMetadata: {
      control: 'boolean',
      description: 'The showMetadata property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showScores: {
      control: 'boolean',
      description: 'The showScores property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showPagination: {
      control: 'boolean',
      description: 'The showPagination property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    maxPageButtons: {
      control: 'number',
      description: 'The maxPageButtons property',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'The loading property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    emptyMessage: {
      control: 'text',
      description: 'The emptyMessage property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No results found' }
      }
    },
    resultTemplate: {
      control: 'text',
      description: 'The resultTemplate property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    enableUrlSync: {
      control: 'boolean',
      description: 'The enableUrlSync property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    pageParam: {
      control: 'text',
      description: 'The pageParam property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'page' }
      }
    },
    sizeParam: {
      control: 'text',
      description: 'The sizeParam property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'size' }
      }
    },
    translations: {
      control: 'text',
      description: 'The translations property',
      table: {
        type: { summary: 'SearchResultsTranslations' },
        defaultValue: { summary: '{}' }
      }
    },
    directNavigation: {
      control: 'boolean',
      description: 'Enable direct navigation - when true, clicking a result navigates directly to the URL as an HTML link',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumSearchResultsArgs>;

// Interactive render function
const renderSpectrumSearchResults = (args: SpectrumSearchResultsArgs) => html`
  <div style="max-width: 800px; margin: 0 auto; padding: 1rem;">
    <spectrum-search-results
      .data=${args.data}
      .resultsPerPage=${args.resultsPerPage}
      ?showThumbnails=${args.showThumbnails}
      ?showMetadata=${args.showMetadata}
      ?showScores=${args.showScores}
      ?showPagination=${args.showPagination}
      .maxPageButtons=${args.maxPageButtons}
      ?loading=${args.loading}
      .emptyMessage=${args.emptyMessage}
      .resultTemplate=${args.resultTemplate}
      ?enableUrlSync=${args.enableUrlSync}
      .pageParam=${args.pageParam}
      .sizeParam=${args.sizeParam}
      .translations=${args.translations}
      .directNavigation=${args.directNavigation}
      @resultAction=${(e: CustomEvent) => action('resultAction')(e.detail)}
      @paginationAction=${(e: CustomEvent) => action('paginationAction')(e.detail)}
    ></spectrum-search-results>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumSearchResults,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic search results showing default configuration with pagination.
 */
export const Default: Story = {
  render: renderSpectrumSearchResults,
  parameters: {
    docs: {
      description: {
        story: `
Basic search results display with default configuration including pagination, thumbnails, and metadata.
        `
      }
    }
  }
};

/**
 * Search results with all display options enabled including scores.
 */
export const WithThumbnailsAndMetadata: Story = {
  render: renderSpectrumSearchResults,
  args: {
    data: paginatedData,
    showThumbnails: true,
    showMetadata: true,
    showScores: true,
    showPagination: true
  },
  parameters: {
    docs: {
      description: {
        story: `
Complete display configuration showing thumbnails, metadata, relevance scores, and pagination controls.
        `
      }
    }
  }
};

/**
 * Loading state demonstration.
 */
export const LoadingState: Story = {
  render: renderSpectrumSearchResults,
  args: {
    loading: true,
    data: { results: [], pagination: { currentPage: 1, totalPages: 1, totalResults: 0, resultsPerPage: 10 } }
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows the loading spinner and text while search results are being fetched.
        `
      }
    }
  }
};

/**
 * Empty state when no results are found.
 */
export const EmptyState: Story = {
  render: renderSpectrumSearchResults,
  args: {
    data: { 
      query: 'nonexistent query',
      results: [], 
      pagination: { currentPage: 1, totalPages: 1, totalResults: 0, resultsPerPage: 10 },
      executionTime: 45
    },
    emptyMessage: 'No articles found matching your search criteria. Try using different keywords.'
  },
  parameters: {
    docs: {
      description: {
        story: `
Empty state display with custom message when no search results are found.
        `
      }
    }
  }
};

/**
 * URL synchronization for deep linking and shareable pagination.
 */
export const WithUrlSync: Story = {
  render: (args) => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 1rem;">
      <h3>URL Synchronized Pagination</h3>
      <p>
        This example demonstrates URL synchronization. Click pagination buttons to see the URL update.
        You can bookmark or share URLs with specific pages.
      </p>
      <p>
        <strong>Current URL parameters:</strong>
        <code id="url-display-${Math.random().toString(36).substr(2, 9)}">${typeof window !== 'undefined' ? window.location.search : 'No parameters'}</code>
      </p>
      <spectrum-search-results
        .data=${args.data}
        ?enableUrlSync=${args.enableUrlSync}
        .pageParam=${args.pageParam}
        .sizeParam=${args.sizeParam}
        ?showPagination=${args.showPagination}
        ?showThumbnails=${args.showThumbnails}
        ?showMetadata=${args.showMetadata}
        @paginationAction=${(e: CustomEvent) => {
          action('paginationAction')(e.detail);
          // Update URL display
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              const displays = document.querySelectorAll('[id^="url-display-"]');
              displays.forEach(display => {
                display.textContent = window.location.search || 'No parameters';
              });
            }
          }, 100);
        }}
        @resultAction=${(e: CustomEvent) => action('resultAction')(e.detail)}
      ></spectrum-search-results>
      
      <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
        <h4>Test Deep Linking:</h4>
        <p>Try these URLs in a new tab to test deep linking:</p>
        <ul style="font-family: monospace; font-size: 0.9rem;">
          <li><a href="?page=2" target="_blank">?page=2</a> - Go to page 2</li>
          <li><a href="?page=3&per_page=2" target="_blank">?page=3&per_page=2</a> - Page 3 with 2 results per page</li>
        </ul>
      </div>
    </div>
  `,
  args: {
    data: paginatedData,
    enableUrlSync: true,
    pageParam: 'page',
    sizeParam: 'per_page',
    showPagination: true,
    showThumbnails: true,
    showMetadata: true
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates URL synchronization where pagination state is reflected in the URL parameters.
This enables deep linking and shareable pagination states.
        `
      }
    }
  }
};

/**
 * French translation example demonstrating internationalization.
 */
export const WithTranslations: Story = {
  render: renderSpectrumSearchResults,
  args: {
    data: basicData,
    showPagination: true,
    showThumbnails: true,
    showMetadata: true,
    translations: {
      resultSingular: 'résultat',
      resultPlural: 'résultats',
      queryPrefix: 'pour',
      executionTime: 'ms',
      pagination: {
        showingText: 'Affichage',
        ofText: 'de',
        resultsText: 'résultats',
        firstButton: 'Premier',
        previousButton: 'Précédent',
        nextButton: 'Suivant',
        lastButton: 'Dernier'
      },
      loading: 'Chargement des résultats...',
      emptyMessage: 'Aucun résultat trouvé'
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Example showing French translations for all user-facing text. The component supports full internationalization
with customizable text for all elements including pagination controls and status messages.
        `
      }
    }
  }
};

// =================================================================
// NAVIGATION MODES
// =================================================================

/**
 * Event-based navigation (default behavior) - clicking results emits events for custom handling.
 */
export const EventBasedNavigation: Story = {
  render: (args) => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 1rem;">
      <h3>Event-Based Navigation (Default)</h3>
      <p>
        <strong>directNavigation=false</strong> - Click results to emit events that can be handled by your application.
        Watch the Actions panel below to see events being emitted.
      </p>
      <div style="margin-bottom: 1rem; padding: 1rem; background: #f0f8ff; border-radius: 8px; border-left: 4px solid #1976d2;">
        <strong>💡 Usage:</strong> Perfect for single-page applications where you want to handle navigation programmatically
        (e.g., React Router, Vue Router, or custom navigation logic).
      </div>
      <spectrum-search-results
        .data=${args.data}
        ?showThumbnails=${args.showThumbnails}
        ?showMetadata=${args.showMetadata}
        ?showPagination=${args.showPagination}
        .directNavigation=${args.directNavigation}
        @resultAction=${(e: CustomEvent) => {
          action('resultAction')(e.detail);
          // In a real app, you might do:
          // router.push(e.detail.result.url);
          console.log('Navigate to:', e.detail.result.url);
        }}
        @paginationAction=${(e: CustomEvent) => action('paginationAction')(e.detail)}
      ></spectrum-search-results>
    </div>
  `,
  args: {
    data: basicData,
    showThumbnails: true,
    showMetadata: true,
    showPagination: true,
    directNavigation: false
  },
  parameters: {
    docs: {
      description: {
        story: `
**Event-based navigation** is the default behavior where clicking a search result emits a \`resultAction\` event 
with the result data. This is ideal for single-page applications where you want to handle navigation 
programmatically through your routing system.
        `
      }
    }
  }
};

/**
 * Direct HTML link navigation - clicking results navigates directly as HTML links.
 */
export const DirectLinkNavigation: Story = {
  render: (args) => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 1rem;">
      <h3>Direct Link Navigation</h3>
      <p>
        <strong>directNavigation=true</strong> - Results become actual HTML links that navigate directly to their URLs in the same tab.
        Try right-clicking on a result to see browser context menu options like "Open in new tab".
      </p>
      <div style="margin-bottom: 1rem; padding: 1rem; background: #f0fff0; border-radius: 8px; border-left: 4px solid #4caf50;">
        <strong>💡 Usage:</strong> Perfect for traditional multi-page applications or when you want standard 
        browser navigation behavior (back button, bookmarking, right-click context menu).
      </div>
      <spectrum-search-results
        .data=${args.data}
        ?showThumbnails=${args.showThumbnails}
        ?showMetadata=${args.showMetadata}
        ?showPagination=${args.showPagination}
        .directNavigation=${args.directNavigation}
        @resultAction=${(e: CustomEvent) => action('resultAction')(e.detail)}
        @paginationAction=${(e: CustomEvent) => action('paginationAction')(e.detail)}
      ></spectrum-search-results>
    </div>
  `,
  args: {
    data: basicData,
    showThumbnails: true,
    showMetadata: true,
    showPagination: true,
    directNavigation: true
  },
  parameters: {
    docs: {
      description: {
        story: `
**Direct link navigation** transforms search results into actual HTML \`<a>\` elements that navigate directly 
to their URLs in the same tab. This provides standard browser navigation behavior including:
- Right-click context menu (Open in new tab, Copy link, etc.)
- Ctrl/Cmd+Click to open in new tab
- Standard browser back/forward navigation
- Link previews on hover
- Accessibility benefits of semantic links
        `
      }
    }
  }
};

/**
 * Side-by-side comparison of both navigation modes.
 */
export const NavigationComparison: Story = {
  render: () => html`
    <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
      <h3>Navigation Mode Comparison</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
        
        <div>
          <h4 style="color: #1976d2; margin-bottom: 1rem;">📱 Event-Based (SPA)</h4>
          <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f0f8ff; border-radius: 6px; font-size: 0.9rem;">
            directNavigation=false
          </div>
          <spectrum-search-results
            .data=${basicData}
            ?showThumbnails=${true}
            ?showMetadata=${true}
            .resultsPerPage=${2}
            .directNavigation=${false}
            @resultAction=${(e: CustomEvent) => {
              action('Event Navigation')(e.detail);
              alert(`Event navigation: Would route to ${e.detail.result.url}`);
            }}
          ></spectrum-search-results>
        </div>

        <div>
          <h4 style="color: #4caf50; margin-bottom: 1rem;">🔗 Direct Links (Traditional)</h4>
          <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f0fff0; border-radius: 6px; font-size: 0.9rem;">
            directNavigation=true
          </div>
          <spectrum-search-results
            .data=${basicData}
            ?showThumbnails=${true}
            ?showMetadata=${true}
            .resultsPerPage=${2}
            .directNavigation=${true}
            @resultAction=${(e: CustomEvent) => action('Direct Navigation')(e.detail)}
          ></spectrum-search-results>
        </div>
      </div>
      
      <div style="margin-top: 2rem; padding: 1.5rem; background: #fafafa; border-radius: 8px;">
        <h4>When to Use Each Mode:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem;">
          <div>
            <strong style="color: #1976d2;">Event-Based Navigation</strong>
            <ul style="margin-top: 0.5rem; font-size: 0.9rem;">
              <li>Single-page applications (React, Vue, Angular)</li>
              <li>Custom routing logic needed</li>
              <li>Want to track analytics before navigation</li>
              <li>Need to perform actions before navigation</li>
              <li>Modal or in-app navigation patterns</li>
            </ul>
          </div>
          <div>
            <strong style="color: #4caf50;">Direct Link Navigation</strong>
            <ul style="margin-top: 0.5rem; font-size: 0.9rem;">
              <li>Traditional multi-page applications</li>
              <li>SEO-friendly external links</li>
              <li>Standard browser navigation expected</li>
              <li>Accessibility-first approach</li>
              <li>Documentation or content sites</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This comparison shows both navigation modes side by side. Try interacting with both versions to understand 
the behavioral differences. The left side shows event-based navigation perfect for SPAs, while the right 
side shows direct link navigation ideal for traditional websites.
        `
      }
    }
  }
};