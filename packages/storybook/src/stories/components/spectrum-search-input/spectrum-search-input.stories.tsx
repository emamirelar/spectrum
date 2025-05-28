import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface SpectrumSearchInputArgs {
  maxLines: number;
  placeholder: string;
  enableVoiceInput: boolean;
  enableEnterSubmit: boolean;
}

const meta = {
  title: 'Components/SpectrumSearchInput',
  tags: ['autodocs'],
  args: {
    maxLines: 4,
    placeholder: 'Ask anything...',
    enableVoiceInput: true,
    enableEnterSubmit: true
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
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A search input component that supports both text and voice input.
          Emits a searchSubmit event when the search button is clicked or when Enter is pressed.
          
          Example:
          \`\`\`html
          <spectrum-search-input
            placeholder="Search for documents..."
            enableVoiceInput={false}
            enableEnterSubmit={true}
            @searchSubmit={(e) => {
              console.log('Search query:', e.detail);
            }}
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