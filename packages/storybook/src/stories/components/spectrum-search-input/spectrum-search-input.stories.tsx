import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface SpectrumSearchInputArgs {
  maxLines: number;
}

const meta = {
  title: 'Components/SpectrumSearchInput',
  tags: ['autodocs'],
  args: {
    maxLines: 4
  },
  argTypes: {
    maxLines: {
      control: 'number',
      description: 'Maximum number of lines for the search input',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A search input component that supports both text and voice input.
          Emits a searchSubmit event when the search button is clicked.
          
          Example:
          \`\`\`html
          <spectrum-search-input
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
    <div style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <spectrum-search-input
        .maxLines=${args.maxLines}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
      ></spectrum-search-input>
    </div>
  `
}; 