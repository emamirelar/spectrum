import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Spectrum/Components/SpectrumThemeDemo',
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

export const InteractiveThemeDemo: StoryObj = {
  name: '🎨 Interactive Wallpaper → Theme Demo',
  args: {
    background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
    'show-swatches': true,
  },
  render: (args) => {
    const wallpapers = [
      {
        name: '🍂 Autumn Forest',
        background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
        description: 'Warm oranges & browns'
      },
      {
        name: '🌊 Ocean Blues',
        background: 'url(https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&q=80)',
        description: 'Cool blues & teals'
      },
      {
        name: '🌸 Cherry Blossoms',
        background: 'url(https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80)',
        description: 'Soft pinks & greens'
      },
      {
        name: '🏔️ Mountain Vista',
        background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80)',
        description: 'Earth tones & grays'
      },
      {
        name: '🌅 Sunset Horizon',
        background: 'url(https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920&q=80)',
        description: 'Warm oranges & purples'
      },
      {
        name: '🎨 Brand Blue',
        background: '#2196f3',
        description: 'Material Design Blue'
      },
      {
        name: '💜 Purple Gradient',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'Purple to blue'
      },
      {
        name: '🔥 Fire Gradient',
        background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
        description: 'Red to orange'
      }
    ];

    return html`
      <spectrum-wallpaper
        background=${args.background}
        show-swatches=${args['show-swatches']}
        backgroundposition=${args.backgroundposition}
        backgroundsize=${args.backgroundsize}
      >
        <!-- Main Content Container -->
        <div style="padding: 2rem; min-height: 100vh;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 3rem;">
            <h1 style="
              color: var(--spectrum-color-primary, #0070d2); 
              font-size: 2.5rem; 
              margin: 0 0 1rem 0;
              font-weight: 700;
            ">
              🎨 Wallpaper → Theme Demo
            </h1>
            <p style="
              color: var(--spectrum-color-on-surface, #000); 
              font-size: 1.2rem; 
              margin: 0;
              opacity: 0.8;
            ">
              Watch how wallpaper colors instantly transform theme variables throughout the interface
            </p>
          </div>

          <!-- Wallpaper Selection Grid -->
          <div style="margin-bottom: 3rem;">
            <h2 style="
              color: var(--spectrum-color-on-surface, #000); 
              margin: 0 0 1.5rem 0;
              text-align: center;
            ">
              Click any wallpaper to see theme changes:
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              ${wallpapers.map(wallpaper => html`
                <div 
                  @click=${(e: Event) => {
                    const target = e.target as HTMLElement;
                    const wallpaperElement = target.closest('spectrum-wallpaper') as any;
                    if (wallpaperElement) {
                      wallpaperElement.background = wallpaper.background;
                    }
                  }}
                  style="
                    cursor: pointer;
                    padding: 1rem;
                    border: 2px solid var(--spectrum-color-outline, #e0e0e0);
                    border-radius: 0.5rem;
                    background: var(--spectrum-color-surface-variant, #f5f5f5);
                    transition: all 0.3s ease;
                    text-align: center;
                  "
                  @mouseover=${(e: Event) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(-2px)';
                    target.style.borderColor = 'var(--spectrum-color-primary, #0070d2)';
                  }}
                  @mouseout=${(e: Event) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(0)';
                    target.style.borderColor = 'var(--spectrum-color-outline, #e0e0e0)';
                  }}
                >
                  <div style="
                    width: 100%;
                    height: 60px;
                    background: ${wallpaper.background};
                    background-size: cover;
                    background-position: center;
                    border-radius: 0.25rem;
                    margin-bottom: 0.5rem;
                    border: 1px solid var(--spectrum-color-outline-variant, #ccc);
                  "></div>
                  <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.25rem 0; font-size: 0.9rem;">
                    ${wallpaper.name}
                  </h4>
                  <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0; font-size: 0.75rem;">
                    ${wallpaper.description}
                  </p>
                </div>
              `)}
            </div>
          </div>

          <!-- Theme Variables Demonstration -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
            
            <!-- Primary Theme Section -->
            <div style="
              background: var(--spectrum-color-primary-container, #e3f2fd);
              border: 2px solid var(--spectrum-color-primary, #0070d2);
              border-radius: 1rem;
              padding: 1.5rem;
            ">
              <h3 style="
                color: var(--spectrum-color-on-primary-container, #0d47a1);
                margin: 0 0 1rem 0;
                font-size: 1.3rem;
              ">
                🎯 Primary Theme Colors
              </h3>
              
              <div style="
                background: var(--spectrum-color-primary, #0070d2);
                color: var(--spectrum-color-on-primary, #fff);
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 1rem 0;
              ">
                <strong>Call-to-Action Button</strong><br/>
                Using primary & on-primary colors
              </div>
              
              <p style="
                color: var(--spectrum-color-primary, #0070d2);
                font-weight: bold;
                margin: 0.5rem 0;
              ">
                Primary text color for links and emphasis
              </p>
              
              <p style="
                color: var(--spectrum-color-on-primary-container, #0d47a1);
                margin: 0;
                font-size: 0.9rem;
              ">
                Text on primary container background
              </p>
            </div>

            <!-- Secondary Theme Section -->
            <div style="
              background: var(--spectrum-color-secondary-container, #e8f5e8);
              border: 2px solid var(--spectrum-color-secondary, #005fb2);
              border-radius: 1rem;
              padding: 1.5rem;
            ">
              <h3 style="
                color: var(--spectrum-color-on-secondary-container, #2e7d32);
                margin: 0 0 1rem 0;
                font-size: 1.3rem;
              ">
                🎨 Secondary Theme Colors
              </h3>
              
              <div style="
                background: var(--spectrum-color-secondary, #005fb2);
                color: var(--spectrum-color-on-secondary, #fff);
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 1rem 0;
              ">
                <strong>Secondary Action</strong><br/>
                Using secondary & on-secondary colors
              </div>
              
              <p style="
                color: var(--spectrum-color-secondary, #005fb2);
                font-weight: bold;
                margin: 0.5rem 0;
              ">
                Secondary text for supporting content
              </p>
              
              <p style="
                color: var(--spectrum-color-on-secondary-container, #2e7d32);
                margin: 0;
                font-size: 0.9rem;
              ">
                Text on secondary container background
              </p>
            </div>

            <!-- Surface Theme Section -->
            <div style="
              background: var(--spectrum-color-surface, #ffffff);
              border: 2px solid var(--spectrum-color-outline, #e0e0e0);
              border-radius: 1rem;
              padding: 1.5rem;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
              <h3 style="
                color: var(--spectrum-color-on-surface, #000);
                margin: 0 0 1rem 0;
                font-size: 1.3rem;
              ">
                📄 Surface & Text Colors
              </h3>
              
              <div style="
                background: var(--spectrum-color-surface-variant, #f5f5f5);
                border: 1px solid var(--spectrum-color-outline-variant, #ccc);
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 1rem 0;
              ">
                <strong style="color: var(--spectrum-color-on-surface, #000);">Card Background</strong><br/>
                <span style="color: var(--spectrum-color-on-surface-variant, #666); font-size: 0.9rem;">
                  Using surface-variant with appropriate text colors
                </span>
              </div>
              
              <p style="
                color: var(--spectrum-color-on-surface, #000);
                font-weight: bold;
                margin: 0.5rem 0;
              ">
                Primary text on surface
              </p>
              
              <p style="
                color: var(--spectrum-color-on-surface-variant, #666);
                margin: 0;
                font-size: 0.9rem;
              ">
                Secondary text with reduced emphasis
              </p>
            </div>

            <!-- Error & Warning Theme Section -->
            <div style="
              background: var(--spectrum-color-error-container, #ffeaea);
              border: 2px solid var(--spectrum-color-error, #ba1a1a);
              border-radius: 1rem;
              padding: 1.5rem;
            ">
              <h3 style="
                color: var(--spectrum-color-on-error-container, #5f1e1e);
                margin: 0 0 1rem 0;
                font-size: 1.3rem;
              ">
                ⚠️ Error & System Colors
              </h3>
              
              <div style="
                background: var(--spectrum-color-error, #ba1a1a);
                color: var(--spectrum-color-on-error, #fff);
                padding: 1rem;
                border-radius: 0.5rem;
                margin: 1rem 0;
              ">
                <strong>Error Message</strong><br/>
                Critical alerts and warnings
              </div>
              
              <p style="
                color: var(--spectrum-color-error, #ba1a1a);
                font-weight: bold;
                margin: 0.5rem 0;
              ">
                Error text for form validation
              </p>
              
              <p style="
                color: var(--spectrum-color-on-error-container, #5f1e1e);
                margin: 0;
                font-size: 0.9rem;
              ">
                Text on error container background
              </p>
            </div>
          </div>

          <!-- Live Theme Variables Display -->
          <div style="
            background: var(--spectrum-color-surface, #ffffff);
            border: 1px solid var(--spectrum-color-outline, #e0e0e0);
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
          ">
            <h3 style="
              color: var(--spectrum-color-on-surface, #000);
              margin: 0 0 1rem 0;
              text-align: center;
            ">
              📊 Live CSS Theme Variables
            </h3>
            <div style="
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
              gap: 1rem;
              font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
              font-size: 0.8rem;
              line-height: 1.6;
            ">
              <div>
                <strong style="color: var(--spectrum-color-on-surface, #000);">Primary Colors:</strong><br/>
                <div style="color: var(--spectrum-color-primary, #0070d2);">--spectrum-color-primary</div>
                <div style="background: var(--spectrum-color-primary, #0070d2); color: var(--spectrum-color-on-primary, #fff); padding: 2px 4px; border-radius: 2px; display: inline-block; margin: 2px 0;">--spectrum-color-on-primary</div><br/>
                <div style="background: var(--spectrum-color-primary-container, #e3f2fd); color: var(--spectrum-color-on-primary-container, #0d47a1); padding: 2px 4px; border-radius: 2px; display: inline-block;">container & on-container</div>
              </div>
              <div>
                <strong style="color: var(--spectrum-color-on-surface, #000);">Secondary Colors:</strong><br/>
                <div style="color: var(--spectrum-color-secondary, #005fb2);">--spectrum-color-secondary</div>
                <div style="background: var(--spectrum-color-secondary, #005fb2); color: var(--spectrum-color-on-secondary, #fff); padding: 2px 4px; border-radius: 2px; display: inline-block; margin: 2px 0;">--spectrum-color-on-secondary</div><br/>
                <div style="background: var(--spectrum-color-secondary-container, #e8f5e8); color: var(--spectrum-color-on-secondary-container, #2e7d32); padding: 2px 4px; border-radius: 2px; display: inline-block;">container & on-container</div>
              </div>
              <div>
                <strong style="color: var(--spectrum-color-on-surface, #000);">Surface Colors:</strong><br/>
                <div style="background: var(--spectrum-color-surface, #ffffff); color: var(--spectrum-color-on-surface, #000); border: 1px solid var(--spectrum-color-outline, #e0e0e0); padding: 2px 4px; border-radius: 2px; display: inline-block; margin: 2px 0;">surface & on-surface</div><br/>
                <div style="background: var(--spectrum-color-surface-variant, #f5f5f5); color: var(--spectrum-color-on-surface-variant, #666); padding: 2px 4px; border-radius: 2px; display: inline-block;">variant & on-variant</div>
              </div>
              <div>
                <strong style="color: var(--spectrum-color-on-surface, #000);">System Colors:</strong><br/>
                <div style="color: var(--spectrum-color-error, #ba1a1a);">--spectrum-color-error</div>
                <div style="color: var(--spectrum-color-outline, #e0e0e0); text-decoration: underline;">--spectrum-color-outline</div>
                <div style="background: var(--spectrum-color-error, #ba1a1a); color: var(--spectrum-color-on-error, #fff); padding: 2px 4px; border-radius: 2px; display: inline-block; margin: 2px 0;">error & on-error</div>
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div style="
            background: linear-gradient(135deg, var(--spectrum-color-primary-container, #e3f2fd) 0%, var(--spectrum-color-secondary-container, #e8f5e8) 100%);
            border: 1px solid var(--spectrum-color-primary, #0070d2);
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
          ">
            <h3 style="
              color: var(--spectrum-color-on-primary-container, #0d47a1);
              margin: 0 0 1rem 0;
            ">
              🎯 How This Demo Works
            </h3>
            <div style="
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
              gap: 1rem;
              text-align: left;
            ">
              <div>
                <strong style="color: var(--spectrum-color-primary, #0070d2);">1. Color Extraction</strong><br/>
                <span style="color: var(--spectrum-color-on-primary-container, #0d47a1); font-size: 0.9rem;">
                  Wallpaper analyzes the dominant colors in images/gradients
                </span>
              </div>
              <div>
                <strong style="color: var(--spectrum-color-primary, #0070d2);">2. Theme Generation</strong><br/>
                <span style="color: var(--spectrum-color-on-primary-container, #0d47a1); font-size: 0.9rem;">
                  Material Design 3 algorithm creates a complete 24-color palette
                </span>
              </div>
              <div>
                <strong style="color: var(--spectrum-color-primary, #0070d2);">3. CSS Variables</strong><br/>
                <span style="color: var(--spectrum-color-on-primary-container, #0d47a1); font-size: 0.9rem;">
                  All text and UI elements update instantly using theme variables
                </span>
              </div>
              <div>
                <strong style="color: var(--spectrum-color-primary, #0070d2);">4. Automatic Contrast</strong><br/>
                <span style="color: var(--spectrum-color-on-primary-container, #0d47a1); font-size: 0.9rem;">
                  Text colors adjust automatically for optimal readability
                </span>
              </div>
            </div>
          </div>
        </div>
      </spectrum-wallpaper>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
# 🎨 Interactive Wallpaper → Theme Demo

This comprehensive demo shows how the **spectrum-wallpaper** component extracts colors and applies them to **CSS theme variables** that control text and UI colors throughout the interface.

## ✨ What This Demo Shows

### 🎯 **Real-Time Theme Application**
- **Click any wallpaper** to see instant color changes
- **Watch text colors** adapt automatically for contrast
- **See theme variables** update live in the CSS display
- **Observe consistent theming** across all UI elements

### 🎨 **Complete Color System**
- **Primary Colors**: Main brand colors for buttons and emphasis
- **Secondary Colors**: Supporting colors for secondary actions
- **Surface Colors**: Background and card colors with appropriate text
- **System Colors**: Error states and utility colors

### 📊 **Live CSS Variables**
All the colors you see are controlled by CSS custom properties:
- \`--spectrum-color-primary\` - Main brand color
- \`--spectrum-color-on-primary\` - Text on primary color
- \`--spectrum-color-surface\` - Background colors
- \`--spectrum-color-on-surface\` - Text on backgrounds
- Plus 20 more for complete theme coverage

### 🔄 **Dynamic Updates**
Every time you click a wallpaper:
1. **Color extraction** analyzes the image/gradient
2. **Theme generation** creates a Material Design 3 palette
3. **CSS variables** update instantly throughout the page
4. **Text contrast** adjusts automatically for accessibility

## 🚀 **Use Cases**

This pattern is perfect for:
- **Dynamic branding** based on hero images
- **Seasonal theming** that adapts to content
- **User customization** with personalized backgrounds
- **Content-driven themes** for blogs and portfolios
- **E-commerce** with product-based color schemes

Try different wallpapers to see how the system creates harmonious, accessible color schemes from any visual content!
        `
      }
    }
  }
};

export const CodeExamples: StoryObj = {
  name: '💻 Code Examples: Theme + Wallpaper Integration',
  args: {
    background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
    'show-swatches': false,
  },
  render: (args) => html`
    <spectrum-wallpaper
      background=${args.background}
      show-swatches=${args['show-swatches']}
      backgroundposition=${args.backgroundposition}
      backgroundsize=${args.backgroundsize}
    >
      <div style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 3rem;">
          <h1 style="color: var(--spectrum-color-primary, #0070d2); font-size: 2.5rem; margin: 0 0 1rem 0;">
            💻 Theme + Wallpaper Integration Examples
          </h1>
          <p style="color: var(--spectrum-color-on-surface, #000); font-size: 1.1rem; margin: 0;">
            Practical code samples for integrating spectrum-theme and spectrum-wallpaper components
          </p>
        </div>

        <!-- Component Hierarchy Guidelines -->
        <div style="
          background: var(--spectrum-color-primary-container, #e3f2fd);
          border: 2px solid var(--spectrum-color-primary, #0070d2);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 3rem;
        ">
          <h2 style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0 0 1rem 0;">
            🏗️ Component Hierarchy Best Practices
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
          ">
            <div>
              <h3 style="color: var(--spectrum-color-primary, #0070d2); margin: 0 0 1rem 0;">
                ✅ Recommended: Theme Outside
              </h3>
              <div style="
                background: var(--spectrum-color-surface, #ffffff);
                border: 1px solid var(--spectrum-color-outline, #e0e0e0);
                border-radius: 0.5rem;
                padding: 1rem;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 0.8rem;
                line-height: 1.4;
              ">
                <pre style="margin: 0; white-space: pre-wrap;">
&lt;spectrum-theme&gt;
  &lt;spectrum-wallpaper 
    apply-to-root="true"&gt;
    &lt;!-- App content --&gt;
  &lt;/spectrum-wallpaper&gt;
&lt;/spectrum-theme&gt;</pre>
              </div>
              <p style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 1rem 0 0 0; font-size: 0.9rem;">
                <strong>Why:</strong> Theme provides foundation, wallpaper overrides with apply-to-root="true"
              </p>
            </div>
            
            <div>
              <h3 style="color: var(--spectrum-color-error, #ba1a1a); margin: 0 0 1rem 0;">
                ⚠️ Avoid: Wallpaper Outside
              </h3>
              <div style="
                background: var(--spectrum-color-surface, #ffffff);
                border: 1px solid var(--spectrum-color-outline, #e0e0e0);
                border-radius: 0.5rem;
                padding: 1rem;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 0.8rem;
                line-height: 1.4;
                opacity: 0.7;
              ">
                <pre style="margin: 0; white-space: pre-wrap;">
&lt;spectrum-wallpaper&gt;
  &lt;spectrum-theme&gt;
    &lt;!-- App content --&gt;
  &lt;/spectrum-theme&gt;
&lt;/spectrum-wallpaper&gt;</pre>
              </div>
              <p style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 1rem 0 0 0; font-size: 0.9rem;">
                <strong>Issue:</strong> Theme scope is limited, wallpaper can't override global variables
              </p>
            </div>
          </div>
          
          <div style="
            background: var(--spectrum-color-surface, #ffffff);
            border: 1px solid var(--spectrum-color-outline, #e0e0e0);
            border-radius: 0.5rem;
            padding: 1.5rem;
          ">
            <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
              🎯 Key Principles:
            </h4>
            <ul style="color: var(--spectrum-color-on-surface, #000); margin: 0; padding-left: 1.5rem;">
              <li><strong>spectrum-theme</strong> = Foundation (typography, base colors, FOUC prevention)</li>
              <li><strong>spectrum-wallpaper</strong> = Visual enhancement (background, dynamic colors)</li>
              <li>Use <code>apply-to-root="true"</code> to let wallpaper override theme variables globally</li>
              <li>Theme provides fallbacks, wallpaper provides dynamic overrides</li>
            </ul>
          </div>
        </div>

        <!-- Example 1: Basic Integration -->
        <div style="
          background: var(--spectrum-color-surface, #ffffff);
          border: 1px solid var(--spectrum-color-outline, #e0e0e0);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
            🎯 Example 1: Basic Integration
          </h2>
          <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0 0 1rem 0;">
            The simplest way to combine wallpaper and theme components:
          </p>
          
          <div style="
            background: var(--spectrum-color-surface-variant, #f5f5f5);
            border: 1px solid var(--spectrum-color-outline-variant, #ccc);
            border-radius: 0.5rem;
            padding: 1.5rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
          ">
            <pre style="margin: 0; white-space: pre-wrap;">
&lt;!-- HTML --&gt;
&lt;spectrum-theme&gt;
  &lt;spectrum-wallpaper 
    background="url(https://example.com/image.jpg)"
    apply-to-root="true"
    show-swatches="true"&gt;
    
    &lt;div class="my-app"&gt;
      &lt;h1 style="color: var(--spectrum-color-primary)"&gt;My App&lt;/h1&gt;
      &lt;p style="color: var(--spectrum-color-on-surface)"&gt;Content using theme colors&lt;/p&gt;
    &lt;/div&gt;
    
  &lt;/spectrum-wallpaper&gt;
&lt;/spectrum-theme&gt;</pre>
          </div>
        </div>

        <!-- Example 2: Event-Based Coordination -->
        <div style="
          background: var(--spectrum-color-surface, #ffffff);
          border: 1px solid var(--spectrum-color-outline, #e0e0e0);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
            🔄 Example 2: Event-Based Coordination
          </h2>
          <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0 0 1rem 0;">
            Listening for wallpaper events to coordinate theme updates:
          </p>
          
          <div style="
            background: var(--spectrum-color-surface-variant, #f5f5f5);
            border: 1px solid var(--spectrum-color-outline-variant, #ccc);
            border-radius: 0.5rem;
            padding: 1.5rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
          ">
            <pre style="margin: 0; white-space: pre-wrap;">
&lt;!-- HTML --&gt;
&lt;spectrum-wallpaper 
  id="wallpaper"
  background="url(https://example.com/image.jpg)"
  signal-ready="true"
  preload-colors="true"&gt;
  
  &lt;spectrum-theme 
    id="theme"
    wait-for-wallpaper="true"&gt;
    &lt;div class="my-app"&gt;
      &lt;h1&gt;Theme-Aware App&lt;/h1&gt;
      &lt;div id="status"&gt;Loading theme...&lt;/div&gt;
    &lt;/div&gt;
  &lt;/spectrum-theme&gt;
  
&lt;/spectrum-wallpaper&gt;

&lt;script&gt;
// JavaScript - Listen for wallpaper events
document.addEventListener('wallpaper-colors-ready', (event) => {
  console.log('Wallpaper colors ready:', event.detail);
  document.getElementById('status').textContent = 'Theme loaded!';
});

document.addEventListener('wallpaper-colors-failed', (event) => {
  console.log('Wallpaper colors failed:', event.detail);
  document.getElementById('status').textContent = 'Using fallback theme';
});

// Change wallpaper programmatically
function changeWallpaper(newBackground) {
  const wallpaper = document.getElementById('wallpaper');
  wallpaper.background = newBackground;
}
&lt;/script&gt;</pre>
          </div>
        </div>

        <!-- Example 3: Priority Control -->
        <div style="
          background: var(--spectrum-color-surface, #ffffff);
          border: 1px solid var(--spectrum-color-outline, #e0e0e0);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
            🎯 Example 3: Theme Priority Control
          </h2>
          <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0 0 1rem 0;">
            Using apply-to-root to give wallpaper theme priority over other theme components:
          </p>
          
          <div style="
            background: var(--spectrum-color-surface-variant, #f5f5f5);
            border: 1px solid var(--spectrum-color-outline-variant, #ccc);
            border-radius: 0.5rem;
            padding: 1.5rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
          ">
            <pre style="margin: 0; white-space: pre-wrap;">
&lt;!-- HTML --&gt;
&lt;spectrum-theme primary-color="#ff6b6b"&gt;
  &lt;!-- Base theme applied to document --&gt;
&lt;/spectrum-theme&gt;

&lt;spectrum-wallpaper 
  background="url(https://example.com/nature.jpg)"
  apply-to-root="true"
  show-swatches="true"&gt;
  
  &lt;!-- Wallpaper theme overrides base theme --&gt;
  &lt;div class="hero-section"&gt;
    &lt;h1 style="color: var(--spectrum-color-primary)"&gt;
      Nature-Inspired Design
    &lt;/h1&gt;
    &lt;p style="color: var(--spectrum-color-on-surface)"&gt;
      Colors extracted from the background image
    &lt;/p&gt;
  &lt;/div&gt;
  
&lt;/spectrum-wallpaper&gt;

&lt;div class="footer"&gt;
  &lt;!-- Still uses wallpaper theme because apply-to-root="true" --&gt;
  &lt;p style="color: var(--spectrum-color-on-surface-variant)"&gt;
    Footer content
  &lt;/p&gt;
&lt;/div&gt;</pre>
          </div>
        </div>

        <!-- Example 4: Dynamic Theme Switching -->
        <div style="
          background: var(--spectrum-color-surface, #ffffff);
          border: 1px solid var(--spectrum-color-outline, #e0e0e0);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
            🔄 Example 4: Dynamic Theme Switching
          </h2>
          <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0 0 1rem 0;">
            Creating a theme switcher with multiple wallpapers:
          </p>
          
          <div style="
            background: var(--spectrum-color-surface-variant, #f5f5f5);
            border: 1px solid var(--spectrum-color-outline-variant, #ccc);
            border-radius: 0.5rem;
            padding: 1.5rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
          ">
            <pre style="margin: 0; white-space: pre-wrap;">
&lt;!-- HTML --&gt;
&lt;div class="theme-switcher"&gt;
  &lt;button onclick="switchTheme('forest')"&gt;Forest Theme&lt;/button&gt;
  &lt;button onclick="switchTheme('ocean')"&gt;Ocean Theme&lt;/button&gt;
  &lt;button onclick="switchTheme('sunset')"&gt;Sunset Theme&lt;/button&gt;
  &lt;button onclick="switchTheme('solid')"&gt;Solid Theme&lt;/button&gt;
&lt;/div&gt;

&lt;spectrum-wallpaper 
  id="dynamic-wallpaper"
  background="url(https://example.com/forest.jpg)"
  apply-to-root="true"
  debug="true"&gt;
  
  &lt;div class="content"&gt;
    &lt;h1 style="color: var(--spectrum-color-primary)"&gt;Dynamic Theme&lt;/h1&gt;
    &lt;p style="color: var(--spectrum-color-on-surface)"&gt;
      Theme changes based on selected wallpaper
    &lt;/p&gt;
  &lt;/div&gt;
  
&lt;/spectrum-wallpaper&gt;

&lt;script&gt;
// JavaScript - Theme switching logic
const themes = {
  forest: 'url(https://example.com/forest.jpg)',
  ocean: 'url(https://example.com/ocean.jpg)',
  sunset: 'url(https://example.com/sunset.jpg)',
  solid: '#2196f3'
};

function switchTheme(themeName) {
  const wallpaper = document.getElementById('dynamic-wallpaper');
  wallpaper.background = themes[themeName];
  
  // Optional: Show loading state
  document.querySelector('.content h1').textContent = 'Loading theme...';
  
  // Listen for theme ready
  document.addEventListener('wallpaper-colors-ready', () => {
    document.querySelector('.content h1').textContent = 'Dynamic Theme';
  }, { once: true });
}

// Initialize with saved theme
const savedTheme = localStorage.getItem('selectedTheme') || 'forest';
switchTheme(savedTheme);
&lt;/script&gt;</pre>
          </div>
        </div>

        <!-- Example 5: React Integration -->
        <div style="
          background: var(--spectrum-color-surface, #ffffff);
          border: 1px solid var(--spectrum-color-outline, #e0e0e0);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
            ⚛️ Example 5: React Integration
          </h2>
          <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0 0 1rem 0;">
            Using theme and wallpaper components in React applications:
          </p>
          
          <div style="
            background: var(--spectrum-color-surface-variant, #f5f5f5);
            border: 1px solid var(--spectrum-color-outline-variant, #ccc);
            border-radius: 0.5rem;
            padding: 1.5rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
          ">
            <pre style="margin: 0; white-space: pre-wrap;">
// React Component
import React, { useState, useEffect } from 'react';

function ThemeAwareApp() {
  const [currentWallpaper, setCurrentWallpaper] = useState('url(https://example.com/default.jpg)');
  const [themeReady, setThemeReady] = useState(false);
  
  useEffect(() => {
    // Listen for wallpaper events
    const handleThemeReady = (event) => {
      setThemeReady(true);
      console.log('Theme colors:', event.detail);
    };
    
    const handleThemeFailed = (event) => {
      setThemeReady(false);
      console.log('Theme failed:', event.detail);
    };
    
    document.addEventListener('wallpaper-colors-ready', handleThemeReady);
    document.addEventListener('wallpaper-colors-failed', handleThemeFailed);
    
    return () => {
      document.removeEventListener('wallpaper-colors-ready', handleThemeReady);
      document.removeEventListener('wallpaper-colors-failed', handleThemeFailed);
    };
  }, []);
  
  const wallpapers = [
    { name: 'Forest', url: 'url(https://example.com/forest.jpg)' },
    { name: 'Ocean', url: 'url(https://example.com/ocean.jpg)' },
    { name: 'Mountains', url: 'url(https://example.com/mountains.jpg)' },
    { name: 'Gradient', url: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' }
  ];
  
     return (
     &lt;spectrum-theme&gt;
       &lt;spectrum-wallpaper 
         background={currentWallpaper}
         show-swatches={true}
         apply-to-root={true}
         signal-ready={true}&gt;
         
         &lt;div className="app"&gt;
        &lt;header style={{
          color: 'var(--spectrum-color-on-surface)',
          backgroundColor: 'var(--spectrum-color-surface)',
          padding: '1rem',
          borderBottom: '1px solid var(--spectrum-color-outline)'
        }}&gt;
          &lt;h1 style={{ color: 'var(--spectrum-color-primary)' }}&gt;
            React + Spectrum Theme
          &lt;/h1&gt;
          &lt;div&gt;
            Theme Status: {themeReady ? '✅ Ready' : '⏳ Loading'}
          &lt;/div&gt;
        &lt;/header&gt;
        
        &lt;nav style={{ padding: '1rem' }}&gt;
          &lt;h3 style={{ color: 'var(--spectrum-color-on-surface)' }}&gt;
            Choose Wallpaper:
          &lt;/h3&gt;
          {wallpapers.map((wallpaper, index) => (
            &lt;button
              key={index}
              onClick={() => setCurrentWallpaper(wallpaper.url)}
              style={{
                backgroundColor: 'var(--spectrum-color-primary)',
                color: 'var(--spectrum-color-on-primary)',
                border: 'none',
                padding: '0.5rem 1rem',
                margin: '0.25rem',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}&gt;
              {wallpaper.name}
            &lt;/button&gt;
          ))}
        &lt;/nav&gt;
        
        &lt;main style={{
          padding: '2rem',
          backgroundColor: 'var(--spectrum-color-surface-variant)',
          color: 'var(--spectrum-color-on-surface-variant)'
        }}&gt;
          &lt;h2 style={{ color: 'var(--spectrum-color-on-surface)' }}&gt;
            Content Area
          &lt;/h2&gt;
          &lt;p&gt;
            This content automatically adapts to the theme colors 
            extracted from the selected wallpaper.
          &lt;/p&gt;
                 &lt;/main&gt;
       &lt;/div&gt;
       
     &lt;/spectrum-wallpaper&gt;
   &lt;/spectrum-theme&gt;
   );
}

export default ThemeAwareApp;</pre>
          </div>
        </div>

        <!-- Example 6: Advanced Configuration -->
        <div style="
          background: var(--spectrum-color-surface, #ffffff);
          border: 1px solid var(--spectrum-color-outline, #e0e0e0);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
            ⚙️ Example 6: Advanced Configuration
          </h2>
          <p style="color: var(--spectrum-color-on-surface-variant, #666); margin: 0 0 1rem 0;">
            Complete setup with all available options:
          </p>
          
          <div style="
            background: var(--spectrum-color-surface-variant, #f5f5f5);
            border: 1px solid var(--spectrum-color-outline-variant, #ccc);
            border-radius: 0.5rem;
            padding: 1.5rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
          ">
            <pre style="margin: 0; white-space: pre-wrap;">
&lt;!-- HTML - Full Configuration --&gt;
&lt;spectrum-theme 
  primary-color="#1976d2"
  secondary-color="#388e3c"
  wait-for-wallpaper="true"
  font-family="'Inter', sans-serif"
  prevent-fouc="true"&gt;
  
  &lt;spectrum-wallpaper 
    background="url(https://example.com/hero-image.jpg)"
    background-position="center"
    background-size="cover"
    apply-to-root="true"
    preload-colors="true"
    signal-ready="true"
    show-swatches="false"
    debug="true"&gt;
    
    &lt;div class="app-container"&gt;
      &lt;header class="app-header"&gt;
        &lt;h1&gt;Advanced Theme Configuration&lt;/h1&gt;
        &lt;p&gt;Using all available theme and wallpaper options&lt;/p&gt;
      &lt;/header&gt;
      
      &lt;main class="app-main"&gt;
        &lt;section class="primary-section"&gt;
          &lt;h2&gt;Primary Content&lt;/h2&gt;
          &lt;p&gt;Content using primary theme colors&lt;/p&gt;
        &lt;/section&gt;
        
        &lt;section class="secondary-section"&gt;
          &lt;h2&gt;Secondary Content&lt;/h2&gt;
          &lt;p&gt;Content using secondary theme colors&lt;/p&gt;
        &lt;/section&gt;
      &lt;/main&gt;
    &lt;/div&gt;
    
  &lt;/spectrum-wallpaper&gt;
  
&lt;/spectrum-theme&gt;

&lt;style&gt;
/* CSS - Theme-aware styling */
.app-container {
  min-height: 100vh;
  background: var(--spectrum-color-surface);
  color: var(--spectrum-color-on-surface);
  font-family: var(--spectrum-font-family);
}

.app-header {
  background: var(--spectrum-color-primary-container);
  color: var(--spectrum-color-on-primary-container);
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  color: var(--spectrum-color-primary);
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
}

.app-main {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.primary-section {
  background: var(--spectrum-color-primary-container);
  color: var(--spectrum-color-on-primary-container);
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid var(--spectrum-color-primary);
}

.primary-section h2 {
  color: var(--spectrum-color-primary);
  margin-top: 0;
}

.secondary-section {
  background: var(--spectrum-color-secondary-container);
  color: var(--spectrum-color-on-secondary-container);
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid var(--spectrum-color-secondary);
}

.secondary-section h2 {
  color: var(--spectrum-color-secondary);
  margin-top: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .app-main {
    grid-template-columns: 1fr;
  }
}
&lt;/style&gt;</pre>
          </div>
        </div>

        <!-- Best Practices -->
        <div style="
          background: var(--spectrum-color-primary-container, #e3f2fd);
          border: 2px solid var(--spectrum-color-primary, #0070d2);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0 0 1rem 0;">
            💡 Best Practices
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
          ">
            <div>
              <h3 style="color: var(--spectrum-color-primary, #0070d2); margin: 0 0 0.5rem 0;">
                🎯 Component Order
              </h3>
              <ul style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0; padding-left: 1.5rem;">
                <li>Place <code>spectrum-theme</code> at the root level</li>
                <li>Use <code>spectrum-wallpaper</code> for content sections</li>
                <li>Apply <code>apply-to-root="true"</code> for global theming</li>
              </ul>
            </div>
            
            <div>
              <h3 style="color: var(--spectrum-color-primary, #0070d2); margin: 0 0 0.5rem 0;">
                🚀 Performance
              </h3>
              <ul style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0; padding-left: 1.5rem;">
                <li>Use <code>preload-colors="true"</code> for faster loading</li>
                <li>Enable <code>prevent-fouc="true"</code> to avoid flashing</li>
                <li>Optimize images for color extraction</li>
              </ul>
            </div>
            
            <div>
              <h3 style="color: var(--spectrum-color-primary, #0070d2); margin: 0 0 0.5rem 0;">
                🎨 CSS Variables
              </h3>
              <ul style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0; padding-left: 1.5rem;">
                <li>Always provide fallback values</li>
                <li>Use semantic color names (primary, surface, etc.)</li>
                <li>Test with different wallpapers</li>
              </ul>
            </div>
            
            <div>
              <h3 style="color: var(--spectrum-color-primary, #0070d2); margin: 0 0 0.5rem 0;">
                🔄 Event Handling
              </h3>
              <ul style="color: var(--spectrum-color-on-primary-container, #0d47a1); margin: 0; padding-left: 1.5rem;">
                <li>Listen for <code>wallpaper-colors-ready</code> events</li>
                <li>Handle <code>wallpaper-colors-failed</code> gracefully</li>
                <li>Use <code>signal-ready="true"</code> for coordination</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Available CSS Variables -->
        <div style="
          background: var(--spectrum-color-surface, #ffffff);
          border: 1px solid var(--spectrum-color-outline, #e0e0e0);
          border-radius: 1rem;
          padding: 2rem;
        ">
          <h2 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 1rem 0;">
            📚 Available CSS Variables
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.85rem;
            line-height: 1.4;
          ">
            <div>
              <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.5rem 0;">Primary Colors:</h4>
              <div style="color: var(--spectrum-color-on-surface-variant, #666);">
                --spectrum-color-primary<br/>
                --spectrum-color-on-primary<br/>
                --spectrum-color-primary-container<br/>
                --spectrum-color-on-primary-container
              </div>
            </div>
            
            <div>
              <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.5rem 0;">Secondary Colors:</h4>
              <div style="color: var(--spectrum-color-on-surface-variant, #666);">
                --spectrum-color-secondary<br/>
                --spectrum-color-on-secondary<br/>
                --spectrum-color-secondary-container<br/>
                --spectrum-color-on-secondary-container
              </div>
            </div>
            
            <div>
              <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.5rem 0;">Tertiary Colors:</h4>
              <div style="color: var(--spectrum-color-on-surface-variant, #666);">
                --spectrum-color-tertiary<br/>
                --spectrum-color-on-tertiary<br/>
                --spectrum-color-tertiary-container<br/>
                --spectrum-color-on-tertiary-container
              </div>
            </div>
            
            <div>
              <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.5rem 0;">Surface Colors:</h4>
              <div style="color: var(--spectrum-color-on-surface-variant, #666);">
                --spectrum-color-surface<br/>
                --spectrum-color-on-surface<br/>
                --spectrum-color-surface-variant<br/>
                --spectrum-color-on-surface-variant
              </div>
            </div>
            
            <div>
              <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.5rem 0;">Background Colors:</h4>
              <div style="color: var(--spectrum-color-on-surface-variant, #666);">
                --spectrum-color-background<br/>
                --spectrum-color-on-background<br/>
                --spectrum-color-surface-dim<br/>
                --spectrum-color-surface-bright
              </div>
            </div>
            
            <div>
              <h4 style="color: var(--spectrum-color-on-surface, #000); margin: 0 0 0.5rem 0;">Utility Colors:</h4>
              <div style="color: var(--spectrum-color-on-surface-variant, #666);">
                --spectrum-color-error<br/>
                --spectrum-color-on-error<br/>
                --spectrum-color-outline<br/>
                --spectrum-color-outline-variant
              </div>
            </div>
          </div>
        </div>

      </div>
    </spectrum-wallpaper>
  `,
  parameters: {
    docs: {
      description: {
        story: `
# 💻 Complete Integration Guide

This comprehensive guide provides **practical code examples** for integrating **spectrum-theme** and **spectrum-wallpaper** components in real-world applications.

## 🎯 **What You'll Learn**

### **1. Basic Integration**
- Simple setup for immediate results
- Minimal configuration requirements
- Quick start templates

### **2. Event-Based Coordination**
- Listening for wallpaper color events
- Coordinating theme updates
- Handling loading states

### **3. Priority Control**
- Using \`apply-to-root\` for global theming
- Managing theme hierarchy
- Resolving conflicts between components

### **4. Dynamic Theme Switching**
- Building theme selectors
- Programmatic wallpaper changes
- State management patterns

### **5. React Integration**
- Modern React patterns
- Hook-based state management
- Event handling in React

### **6. Advanced Configuration**
- Complete setup with all options
- Performance optimization
- CSS architecture patterns

## 🚀 **Key Features Covered**

- **Event System**: \`wallpaper-colors-ready\` and \`wallpaper-colors-failed\`
- **Coordination**: \`signal-ready\`, \`preload-colors\`, \`wait-for-wallpaper\`
- **Priority Control**: \`apply-to-root\` for theme hierarchy
- **Performance**: FOUC prevention and optimized loading
- **CSS Variables**: Complete list of 24 theme variables
- **Best Practices**: Component order, performance, and patterns

## 📚 **All CSS Variables**

The components provide **24 CSS custom properties** following Material Design 3:
- **Primary/Secondary/Tertiary**: Brand colors with containers
- **Surface/Background**: Layout and content backgrounds  
- **Error/Outline**: System colors and borders
- **On-* Colors**: Contrasting text for each background

Each variable includes fallback values and automatic contrast calculation for accessibility.

## 🎨 **Use Cases**

Perfect for:
- **Hero sections** with dynamic backgrounds
- **Content-driven theming** for blogs/portfolios
- **E-commerce** with product-based themes
- **Dashboard applications** with customizable themes
- **Multi-tenant** applications with brand theming

Copy any example and customize for your specific needs!
        `
      }
    }
  }
}; 