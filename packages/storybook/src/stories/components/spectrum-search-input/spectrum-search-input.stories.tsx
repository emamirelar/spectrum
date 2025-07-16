import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SpectrumSearchInputArgs {
  maxLines: number;
  placeholder: string;
  enableVoiceInput: boolean;
  enableEnterSubmit: boolean;
  searchIconPosition: 'left' | 'right';
  searchButtonVariant: 'primary' | 'ghost';
  clearOnSubmit: boolean;
}

const meta = {
  title: 'Spectrum/Components/SpectrumSearchInput',
  tags: ['autodocs'],
  args: {
    maxLines: 4,
    placeholder: 'Ask anything...',
    enableVoiceInput: true,
    enableEnterSubmit: true,
    searchIconPosition: 'right',
    searchButtonVariant: 'primary',
    clearOnSubmit: false
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
    },
    clearOnSubmit: {
      control: 'boolean',
      description: 'Whether to clear the input value after submitting a search',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
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
        ?clearOnSubmit="${args.clearOnSubmit}"
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
        .clearOnSubmit=${args.clearOnSubmit}
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
        .clearOnSubmit=${args.clearOnSubmit}
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

// Clear On Submit Example
export const ClearOnSubmit: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <h3 style="margin-bottom: 1rem;">Clear Input After Submit (clearOnSubmit=true)</h3>
      <spectrum-search-input
        placeholder="Type something and submit - input will clear..."
        .clearOnSubmit=${true}
        .enableEnterSubmit=${true}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit - clearOnSubmit=true')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput - clearOnSubmit=true')(e.detail)}
      ></spectrum-search-input>
      
      <h3 style="margin: 2rem 0 1rem;">Keep Input After Submit (clearOnSubmit=false - Default)</h3>
      <spectrum-search-input
        placeholder="Type something and submit - input will remain..."
        .clearOnSubmit=${false}
        .enableEnterSubmit=${true}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit - clearOnSubmit=false')(e.detail)}
        @searchInput=${(e: CustomEvent) => action('searchInput - clearOnSubmit=false')(e.detail)}
      ></spectrum-search-input>

      <div style="margin-top: 1.5rem; font-size: 0.875rem; color: #666; background: #f5f5f5; padding: 1rem; border-radius: 8px;">
        <p><strong>Usage Instructions:</strong></p>
        <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
          <li>Type some text in either input field</li>
          <li>Submit using the search button or press Enter</li>
          <li>Watch the Actions tab to see the submitted values</li>
          <li>Notice how the first input clears after submission, while the second retains the text</li>
        </ul>
        <p style="margin-top: 1rem;"><em>This feature is useful for chat interfaces or when you want a fresh input after each search.</em></p>
      </div>
    </div>
  `
}; 