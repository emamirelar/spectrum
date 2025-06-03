import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface SpectrumSearchInputArgs {
  maxLines: number;
  placeholder: string;
  enableVoiceInput: boolean;
  enableEnterSubmit: boolean;
  searchIconPosition: 'left' | 'right';
  searchButtonVariant: 'primary' | 'ghost';
}

const meta = {
  title: 'Components/SpectrumSearchInput',
  tags: ['autodocs'],
  args: {
    maxLines: 4,
    placeholder: 'Ask anything...',
    enableVoiceInput: true,
    enableEnterSubmit: true,
    searchIconPosition: 'right',
    searchButtonVariant: 'primary'
  },
  argTypes: {
    maxLines: {
      control: 'number',
      description: 'Maximum number of lines for the search input',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Ask anything...' }
      }
    },
    enableVoiceInput: {
      control: 'boolean',
      description: 'Whether to enable voice input capabilities (speech recognition)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    enableEnterSubmit: {
      control: 'boolean',
      description: 'Whether to enable submitting search on Enter key press',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    searchIconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the search icon',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: "'right'" }
      }
    },
    searchButtonVariant: {
      control: 'select',
      options: ['primary', 'ghost'],
      description: 'Variant of the search button',
      table: {
        type: { summary: "'primary' | 'ghost'" },
        defaultValue: { summary: "'primary'" }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A search input component with voice input capabilities and flexible layout options.
          Supports real-time filtering and submit actions with modern speech recognition.

          ## Events
          All events now include an action attribute to identify the type of action performed:
          
          - **searchInput**: Emitted when input value changes, for real-time filtering
            - Payload: \`{ action: string, value: string }\`
            - Action values: \`'input'\`
          - **searchSubmit**: Emitted when search is submitted (Enter key or search button)
            - Payload: \`{ action: string, value: string }\`
            - Action values: \`'submit'\`

          ## Features
          - Voice input with speech recognition (when supported)
          - Responsive textarea that adapts to content length
          - Configurable search button position (left/right)
          - Enter key submission (can be disabled)
          - Configurable maximum lines before scrolling

          ## Usage
          \`\`\`tsx
          <spectrum-search-input
            placeholder="Search anything..."
            enableVoiceInput={true}
            enableEnterSubmit={true}
            searchIconPosition="right"
            onSearchInput={(e) => console.log('Search input:', e.detail)}
            onSearchSubmit={(e) => console.log('Search submitted:', e.detail)}
          />
          \`\`\`
        `
      }
    }
  }
} satisfies Meta<SpectrumSearchInputArgs>;

export default meta;
type Story = StoryObj<SpectrumSearchInputArgs>;

// Default Search Input
export const Default: Story = {
  render: (args) => html`
    <div style="padding: 2rem; background-color: #f0f0f0;">
      <spectrum-search-input
        placeholder="${args.placeholder}"
        ?enableVoiceInput="${args.enableVoiceInput}"
        ?enableEnterSubmit="${args.enableEnterSubmit}"
        .searchIconPosition=${args.searchIconPosition}
        .searchButtonVariant=${args.searchButtonVariant}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
      ></spectrum-search-input>
    </div>
  `,
};

// Custom Placeholder Example
export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search for documents...'
  },
  render: (args) => html`
    <div style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <spectrum-search-input
        .maxLines=${args.maxLines}
        placeholder=${args.placeholder}
        .enableVoiceInput=${args.enableVoiceInput}
        .enableEnterSubmit=${args.enableEnterSubmit}
        .searchIconPosition=${args.searchIconPosition}
        .searchButtonVariant=${args.searchButtonVariant}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
      ></spectrum-search-input>
    </div>
  `
};

// Enter Key Submission Example
export const EnterKeySubmission: Story = {
  args: {
    enableVoiceInput: false,
    enableEnterSubmit: true,
    placeholder: 'Type and press Enter to search...'
  },
  render: (args) => html`
    <div style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <spectrum-search-input
        .maxLines=${args.maxLines}
        placeholder=${args.placeholder}
        .enableVoiceInput=${args.enableVoiceInput}
        .enableEnterSubmit=${args.enableEnterSubmit}
        .searchIconPosition=${args.searchIconPosition}
        .searchButtonVariant=${args.searchButtonVariant}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
      ></spectrum-search-input>
      <div style="margin-top: 1rem; font-size: 0.875rem; color: #666;">
        <p>Try typing something and pressing Enter to submit the search.</p>
        <p>Note: Shift+Enter will still create a new line when maxLines > 1.</p>
      </div>
    </div>
  `
};

// Search Icon Position Examples
export const SearchIconPositions: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <h3 style="margin-bottom: 1rem;">Search Icon on Left</h3>
      <spectrum-search-input
        placeholder="Search with icon on left..."
        .searchIconPosition=${'left'}
        .searchButtonVariant=${'primary'}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
      ></spectrum-search-input>

      <h3 style="margin: 2rem 0 1rem;">Search Icon on Right (Default)</h3>
      <spectrum-search-input
        placeholder="Search with icon on right..."
        .searchIconPosition=${'right'}
        .searchButtonVariant=${'primary'}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
      ></spectrum-search-input>
    </div>
  `
};

// Search Button Variants Example
export const SearchButtonVariants: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <h3 style="margin-bottom: 1rem;">Primary Button (Default)</h3>
      <spectrum-search-input
        placeholder="Search with primary button..."
        .searchButtonVariant=${'primary'}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
      ></spectrum-search-input>

      <h3 style="margin: 2rem 0 1rem;">Ghost Button (Simple Icon)</h3>
      <spectrum-search-input
        placeholder="Search with ghost button..."
        .searchButtonVariant=${'ghost'}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
      ></spectrum-search-input>

      <h3 style="margin: 2rem 0 1rem;">Comparison with Different Positions</h3>
      <div style="display: flex; gap: 1rem; flex-direction: column;">
        <spectrum-search-input
          placeholder="Primary button, left icon"
          .searchIconPosition=${'left'}
          .searchButtonVariant=${'primary'}
          @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
          @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
        ></spectrum-search-input>
        <spectrum-search-input
          placeholder="Ghost button, left icon"
          .searchIconPosition=${'left'}
          .searchButtonVariant=${'ghost'}
          @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
          @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
        ></spectrum-search-input>
      </div>
    </div>
  `
}; 