import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumSearchResults Component
 * 
 * The search-results component displays search results in a structured, paginated format with customizable display options.
 * 
 * ### Key Features
 * - **Pagination**: Full pagination support with URL synchronization
 * - **Customizable Display**: Toggle thumbnails, metadata, scores, and pagination
 * - **Internationalization**: Full translation support for all user-facing text
 * - **Responsive Design**: Adapts to different screen sizes and content types
 * - **URL Synchronization**: Deep linking support with pagination state in URL
 * - **Accessibility**: Full ARIA support and keyboard navigation
 * 
 * ### Usage Guidelines
 * - **Use for**: Displaying search results, product listings, document collections
 * - **Avoid when**: Showing single items or small lists that don't need pagination
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
}

// Story arguments interface
interface SpectrumSearchResultsArgs extends SpectrumSearchResultsElement {}

// Sample data for stories
const sampleResults = [
  {
    id: '1',
    title: 'Advanced Web Components Development',
    description: 'Learn how to build advanced web components using StencilJS and modern web technologies.',
    url: '/articles/advanced-web-components',
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
    url: '/articles/responsive-design-systems',
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
    url: '/articles/typescript-best-practices',
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
    url: '/articles/performance-optimization',
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
    url: '/articles/accessibility-modern-web',
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