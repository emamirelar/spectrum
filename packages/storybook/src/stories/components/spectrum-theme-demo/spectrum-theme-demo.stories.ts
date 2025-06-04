import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Components/SpectrumThemeDemo',
  component: 'spectrum-theme-demo',
  tags: ['autodocs'],
  render: (args) => html`
    <spectrum-wallpaper
      background=${args.background}
      show-swatches=${args['show-swatches']}
      backgroundposition=${args.backgroundposition}
      backgroundsize=${args.backgroundsize}
    >
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <spectrum-conversation-panel 
          messages='[
            {
              "sender": "request",
              "message": "Hello, how can I help you today?"
            },
            {
              "sender": "response",
              "message": "I'm looking for information about the Material Design 3 theme system."
            },
            {
              "sender": "request",
              "message": "I can help with that! The Material Design 3 theme system uses dynamic color extraction to create harmonious color schemes."
            }
          ]'
          actions='[]'
          conversationtitle="Theme Demo Conversation"
        ></spectrum-conversation-panel>
      </div>
    </spectrum-wallpaper>
  `,
  parameters: {
    docs: {
      description: {
        component: 'A demo showing how the Spectrum Wallpaper component generates a theme that affects the Conversation Panel.'
      }
    }
  },
  args: {
    background: 'url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538)',
    'show-swatches': true,
    backgroundposition: 'center',
    backgroundsize: 'cover',
  },
  argTypes: {
    background: {
      description: 'The background value (color, gradient, or image URL)',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    'show-swatches': {
      description: 'Whether to show the theme color swatches',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    backgroundposition: {
      description: 'The background image position',
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
      }
    },
    backgroundsize: {
      description: 'The background image size',
      control: 'select',
      options: ['cover', 'contain', 'auto'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'cover' },
      }
    },
  }
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  name: 'With Image Background',
  parameters: {
    docs: {
      description: {
        story: 'Example using an image background. The wallpaper component extracts the dominant color and generates a theme that affects the conversation panel.'
      }
    }
  }
};

export const Gradient: StoryObj = {
  name: 'With Gradient Background',
  args: {
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example using a gradient background. The wallpaper component extracts the first color from the gradient to generate the theme that affects the conversation panel.'
      }
    }
  }
};

export const SimpleTest: StoryObj = {
  name: 'Simple Component Test',
  args: {
    background: '#ff6b6b',
    'show-swatches': false,
  },
  render: (args) => html`
    <div style="padding: 2rem; background-color: #f0f0f0;">
      <h2>Testing Components</h2>
      
      <h3>Search Input Test</h3>
      <spectrum-search-input
        placeholder="Test search input..."
      ></spectrum-search-input>
      
      <h3>Conversation Panel Test</h3>
      <spectrum-conversation-panel 
        messages='[{"sender": "request", "message": "Test message"}]'
        conversationtitle="Test"
      ></spectrum-conversation-panel>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Simple test to check if components are working'
      }
    }
  }
};

export const VerticalStackDemo: StoryObj = {
  name: 'Conversation Panel with Search Input',
  args: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'show-swatches': false,
  },
  render: (args) => html`
    <spectrum-wallpaper
      background=${args.background}
      show-swatches=${args['show-swatches']}
    >
      <div style="padding: 2rem; height: 100%; width: 100%; box-sizing: border-box;">
        <div style="display: flex; flex-direction: column; gap: 1.5rem; height: 100%; width: 100%;">
          
          <!-- Conversation Panel at the top -->
          <div style="flex-grow: 1; min-height: 0;">
            <spectrum-conversation-panel 
              messages='[
                {
                  "sender": "request",
                  "message": "How does the theme system work?"
                },
                {
                  "sender": "response",
                  "message": "The Spectrum theme system uses dynamic color extraction from the wallpaper background to create harmonious color schemes. Both the search input and conversation panel automatically adapt to the generated theme colors.",
                  "sources": [
                    {
                      "label": "Material Design 3 Color System",
                      "value": "https://m3.material.io/styles/color/system",
                      "snippet": "The Material Design 3 color system uses algorithmic color to create dynamic, accessible color schemes from any color or image."
                    }
                  ],
                  "explorations": [
                    {
                      "label": "How can I customize the theme colors?",
                      "value": "How can I customize the theme colors?"
                    },
                    {
                      "label": "What components support dynamic theming?",
                      "value": "What components support dynamic theming?"
                    }
                  ]
                },
                {
                  "sender": "request",
                  "message": "Can you tell me more about color extraction?"
                },
                {
                  "sender": "response",
                  "message": "Color extraction analyzes the dominant colors in images or gradients to generate a cohesive color palette. This ensures that all UI components maintain visual harmony with the background.",
                  "sources": [
                    {
                      "label": "Color Theory Principles",
                      "value": "https://example.com/color-theory",
                      "snippet": "Understanding how colors work together is essential for creating visually appealing interfaces."
                    }
                  ]
                },
                {
                  "sender": "request",
                  "message": "What about accessibility considerations?"
                },
                {
                  "sender": "response",
                  "message": "The system automatically ensures sufficient contrast ratios for text readability and provides alternative color schemes for users with different visual needs. All generated colors meet WCAG accessibility guidelines.",
                  "explorations": [
                    {
                      "label": "What are WCAG guidelines?",
                      "value": "What are WCAG guidelines?"
                    },
                    {
                      "label": "How do you test color contrast?",
                      "value": "How do you test color contrast?"
                    }
                  ]
                },
                {
                  "sender": "request",
                  "message": "How does this work with different screen sizes?"
                },
                {
                  "sender": "response",
                  "message": "The theme system is fully responsive and adapts to different screen sizes, device types, and viewing conditions. Colors are optimized for both light and dark environments automatically."
                },
                {
                  "sender": "request",
                  "message": "Can I customize the generated themes?"
                },
                {
                  "sender": "response",
                  "message": "Yes! You can override specific color values, adjust the extraction algorithm parameters, or provide your own color palettes while still maintaining the systematic approach to color relationships.",
                  "sources": [
                    {
                      "label": "Theme Customization Guide",
                      "value": "https://example.com/theme-guide",
                      "snippet": "Learn how to customize themes while maintaining design consistency and accessibility standards."
                    }
                  ],
                  "explorations": [
                    {
                      "label": "Show me customization examples",
                      "value": "Show me customization examples"
                    },
                    {
                      "label": "How do I override specific colors?",
                      "value": "How do I override specific colors?"
                    },
                    {
                      "label": "What are the algorithm parameters?",
                      "value": "What are the algorithm parameters?"
                    }
                  ]
                },
                {
                  "sender": "request",
                  "message": "This is really helpful! How do I get started implementing this?"
                },
                {
                  "sender": "response",
                  "message": "Getting started is easy! Simply wrap your components in the spectrum-wallpaper component and provide a background image or gradient. The theme system will automatically extract colors and apply them to all child components.",
                  "explorations": [
                    {
                      "label": "Show me a basic implementation example",
                      "value": "Show me a basic implementation example"
                    },
                    {
                      "label": "What components support theming?",
                      "value": "What components support theming?"
                    }
                  ]
                },
                {
                  "sender": "request",
                  "message": "Perfect! One more question - how does performance work with dynamic theming?"
                },
                {
                  "sender": "response",
                  "message": "The system is optimized for performance with efficient color extraction algorithms, caching of computed themes, and minimal DOM updates. Theme changes are debounced and only applied when necessary to maintain smooth user interactions."
                }
              ]'
              actions='[
                {
                  "label": "Share Theme",
                  "icon": "share",
                  "value": "share-theme"
                }
              ]'
              conversationtitle="Theme System Demo"
              @action=${(e: CustomEvent) => action('Action')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
              @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
              @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
              @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
            ></spectrum-conversation-panel>
          </div>

          <!-- Search Input at the bottom -->
          <div style="flex-shrink: 0;">
            <spectrum-search-input
              placeholder="Ask anything about the theme..."
              .enableVoiceInput=${true}
              .enableEnterSubmit=${true}
              .clearOnSubmit=${false}
              .searchIconPosition=${'right'}
              .searchButtonVariant=${'primary'}
              @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
              @searchInput=${(e: CustomEvent) => action('searchInput')(e.detail)}
            ></spectrum-search-input>
          </div>
        </div>
      </div>
    </spectrum-wallpaper>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This demo shows the conversation panel at the top with the search input at the bottom, both themed dynamically by the wallpaper component. This layout mimics a typical chat interface where the conversation history is displayed above the input area.'
      }
    }
  }
};

export const ComponentTest: StoryObj = {
  name: 'Basic Component Test',
  render: () => html`
    <div style="padding: 20px; background: white;">
      <h2>Component Test</h2>
      <p>Testing if components render...</p>
      
      <div style="margin: 20px 0; padding: 10px; border: 1px solid #ccc;">
        <h3>Search Input:</h3>
        <spectrum-search-input></spectrum-search-input>
      </div>
      
      <div style="margin: 20px 0; padding: 10px; border: 1px solid #ccc;">
        <h3>Conversation Panel:</h3>
        <spectrum-conversation-panel></spectrum-conversation-panel>
      </div>
      
      <div style="margin: 20px 0; padding: 10px; border: 1px solid #ccc;">
        <h3>Spectrum Button (for comparison):</h3>
        <spectrum-button>Test Button</spectrum-button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Basic test to see if components render'
      }
    }
  }
}; 