import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumSearchInput Component
 * 
 * The search input component provides an advanced search interface with voice input capabilities, multi-line support, real-time filtering, and configurable layout options. It combines intelligent text input with optional speech recognition for modern search experiences.
 * 
 * ### Key Features
 * - **Voice Input**: Browser-based speech recognition for hands-free searching
 * - **Multi-line Support**: Auto-expanding textarea with configurable maximum lines
 * - **Real-time Filtering**: Live input events for instant search-as-you-type
 * - **Configurable Layout**: Search icon positioning and button variants
 * - **Keyboard Interaction**: Enter to submit, Shift+Enter for new lines
 * - **Focus Management**: Programmatic focus control with setFocus method
 * - **Smart Clearing**: Optional input clearing after successful searches
 * 
 * ### Component Dependencies
 * - **spectrum-button**: Search and voice input buttons with configurable variants
 * 
 * ### Usage Guidelines
 * - **Use for**: Global search, filtering interfaces, AI chat inputs, command interfaces
 * - **Perfect for**: Admin panels, data tables, knowledge bases, conversational interfaces
 * - **Avoid when**: Simple single-line text inputs, basic forms, password fields
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **searchSubmit**: Search submission events with action context and search value
 * - **searchInput**: Real-time input changes for live filtering and suggestions
 */

// Component interfaces for TypeScript support
interface SpectrumSearchInputElement extends HTMLElement {
  maxLines: number;
  placeholder: string;
  enableVoiceInput: boolean;
  enableEnterSubmit: boolean;
  searchIconPosition: 'left' | 'right';
  searchButtonVariant: 'primary' | 'ghost';
  clearOnSubmit: boolean;
  disableSubmitWhenEmpty: boolean;
  setFocus(): Promise<void>;
}

// Story arguments interface
interface SpectrumSearchInputArgs extends SpectrumSearchInputElement {
  demoMode: string;
  withLiveResults: boolean;
}

const meta: Meta<SpectrumSearchInputArgs> = {
  title: 'Spectrum/Components/SpectrumSearchInput', // [[memory:3543783]]
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-search-input\` component provides an advanced search interface with modern features:

### Search Capabilities

#### Text Input
- **Multi-line Support**: Auto-expanding textarea that grows with content
- **Smart Height**: Configurable maximum lines with scroll after limit
- **Keyboard Shortcuts**: Enter to submit, Shift+Enter for new lines
- **Real-time Events**: Live input events for instant filtering and suggestions

#### Voice Input (Browser Dependent)
- **Speech Recognition**: Webkit-based voice input where supported
- **Visual Feedback**: Active state indication during voice recording
- **Automatic Transcription**: Speech-to-text conversion with result insertion
- **Graceful Degradation**: Voice button hidden when not supported

### Layout Configurations

#### Icon Positioning
- **Right Position** (default): Search icon on right with voice button
- **Left Position**: Search icon on left for alternative layouts
- **Button Variants**: Primary (filled) or ghost (outline) search buttons

#### Responsive Behavior
- **Single Line**: Compact mode for simple searches
- **Multi-line**: Expands automatically for longer queries
- **Maximum Height**: Configurable line limit with scrolling overflow

### Event System

#### Search Events
- **searchSubmit**: Triggered by Enter key or search button click
- **searchInput**: Real-time input changes for live filtering
- **Action Context**: All events include action type and search value

#### Integration Patterns
- **Real-time Filtering**: Connect searchInput to filter functions
- **Search Submission**: Handle searchSubmit for search execution
- **Focus Management**: Use setFocus() method for programmatic control

### Use Cases

#### Global Search
- **Application Search**: Site-wide content discovery
- **Data Filtering**: Real-time table and list filtering
- **Command Interface**: Command palette and quick actions

#### Conversational Interfaces
- **AI Chat**: Natural language query input
- **Voice Assistants**: Speech-enabled interaction
- **Smart Search**: Context-aware search with suggestions

#### Administrative Tools
- **System Search**: Configuration and log searching
- **User Search**: Account and profile discovery
- **Content Search**: Document and media finding

### Voice Input Features

#### Browser Support
- **WebKit Recognition**: Uses webkitSpeechRecognition API
- **Feature Detection**: Automatically detects browser capability
- **Progressive Enhancement**: Works without voice input as fallback

#### User Experience
- **Visual Feedback**: Recording state with button highlighting
- **Automatic Insertion**: Voice results populate input field
- **Error Handling**: Graceful handling of recognition failures

### Basic Usage

**Simple Search Input**
- Use default configuration for basic search functionality
- Add placeholder text for user guidance

**Real-time Filtering**
- Listen to searchInput events for instant filtering
- Set placeholder to indicate filtering purpose

**Voice-enabled Search**
- Enable voice input with enable-voice-input="true"
- Handle searchSubmit events for search execution

**Multi-line Input**
- Set max-lines for extended input area
- Perfect for detailed queries and chat interfaces
        `
      }
    }
  },
  args: {
    maxLines: 4,
    placeholder: 'Ask anything...',
    enableVoiceInput: true,
    enableEnterSubmit: true,
    searchIconPosition: 'right',
    searchButtonVariant: 'primary',
    clearOnSubmit: false,
    disableSubmitWhenEmpty: true,
    demoMode: 'standard',
    withLiveResults: false
  },
  argTypes: {
    maxLines: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Maximum number of lines before scrolling',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Ask anything...' }
      }
    },
    enableVoiceInput: {
      control: 'boolean',
      description: 'Enable voice input button (requires browser support)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    enableEnterSubmit: {
      control: 'boolean',
      description: 'Submit search when Enter key is pressed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    searchIconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the search icon and button',
      table: {
        type: { summary: 'left | right' },
        defaultValue: { summary: 'right' }
      }
    },
    searchButtonVariant: {
      control: { type: 'select' },
      options: ['primary', 'ghost'],
      description: 'Visual style of the search button',
      table: {
        type: { summary: 'primary | ghost' },
        defaultValue: { summary: 'primary' }
      }
    },
    clearOnSubmit: {
      control: 'boolean',
      description: 'Clear input field after successful search submission',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disableSubmitWhenEmpty: {
      control: 'boolean',
      description: 'Disable the submit button when the input is empty',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    demoMode: {
      control: { type: 'select' },
      options: ['standard', 'filtering', 'chat', 'command'],
      description: 'Demo mode for different use case scenarios (story control)',
      table: {
        type: { summary: 'string' },
        category: 'Story Controls'
      }
    },
    withLiveResults: {
      control: 'boolean',
      description: 'Show live filtering results simulation (story control)',
      table: {
        type: { summary: 'boolean' },
        category: 'Story Controls'
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumSearchInputArgs>;

// Interactive render function
const renderSearchInput = (args: SpectrumSearchInputArgs) => {
  return html`
    <div style="max-width: 600px; margin: 0 auto; padding: 2rem;">
      <spectrum-search-input
        max-lines=${args.maxLines}
        placeholder=${args.placeholder}
        .enableVoiceInput=${args.enableVoiceInput}
        .enableEnterSubmit=${args.enableEnterSubmit}
        search-icon-position=${args.searchIconPosition}
        search-button-variant=${args.searchButtonVariant}
        .clearOnSubmit=${args.clearOnSubmit}
        .disableSubmitWhenEmpty=${args.disableSubmitWhenEmpty}
        @searchSubmit=${(e: CustomEvent) => action('searchSubmit')(e.detail)}
        @searchInput=${(e: CustomEvent) => {
          action('searchInput')(e.detail);
          // Simulate live results in demo
          if (args.withLiveResults) {
            const resultsArea = document.querySelector('#live-results');
            if (resultsArea) {
              const value = e.detail.value;
              if (value.length > 0) {
                resultsArea.innerHTML = `
                  <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px;">
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Live Results for "${value}"</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      ${Array.from({length: Math.min(3, value.length)}, (_, i) => `
                        <div style="padding: 0.5rem; background: var(--spectrum-sys-color-surface); border-radius: 4px; color: var(--spectrum-sys-color-on-surface);">
                          Result ${i + 1}: ${value} related content
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `;
              } else {
                resultsArea.innerHTML = '';
              }
            }
          }
        }}
      ></spectrum-search-input>
      
      ${args.withLiveResults ? html`<div id="live-results"></div>` : ''}
      
      <div style="margin-top: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 6px;">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Component Features</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div style="padding: 0.75rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
            <strong style="color: var(--spectrum-sys-color-primary);">🎤 Voice Input</strong><br/>
            <small style="color: var(--spectrum-sys-color-on-surface-variant);">
              ${args.enableVoiceInput ? 'Enabled (browser dependent)' : 'Disabled'}
            </small>
          </div>
          <div style="padding: 0.75rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
            <strong style="color: var(--spectrum-sys-color-secondary);">📝 Multi-line</strong><br/>
            <small style="color: var(--spectrum-sys-color-on-surface-variant);">
              Max ${args.maxLines} lines
            </small>
          </div>
          <div style="padding: 0.75rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
            <strong style="color: var(--spectrum-sys-color-tertiary);">⌨️ Enter Submit</strong><br/>
            <small style="color: var(--spectrum-sys-color-on-surface-variant);">
              ${args.enableEnterSubmit ? 'Enabled' : 'Disabled'}
            </small>
          </div>
          <div style="padding: 0.75rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
            <strong style="color: var(--spectrum-sys-color-success);">🧹 Clear on Submit</strong><br/>
            <small style="color: var(--spectrum-sys-color-on-surface-variant);">
              ${args.clearOnSubmit ? 'Enabled' : 'Disabled'}
            </small>
          </div>
          <div style="padding: 0.75rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
            <strong style="color: var(--spectrum-sys-color-warning);">🚫 Disable When Empty</strong><br/>
            <small style="color: var(--spectrum-sys-color-on-surface-variant);">
              ${args.disableSubmitWhenEmpty ? 'Enabled' : 'Disabled'}
            </small>
          </div>
        </div>
      </div>
    </div>
  `;
};

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring all search input features and configurations.
 * Experiment with voice input, multi-line support, icon positioning, and event handling.
 */
export const Playground: Story = {
  render: renderSearchInput
};

/**
 * Icon positioning and button variant showcase.
 * Demonstrates different visual layouts and styling options.
 */
export const LayoutVariants: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <h3 style="text-align: center; margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface);">Search Input Layout Variants</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
        <!-- Right Icon, Primary Button -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Right Icon + Primary Button</h4>
          <spectrum-search-input
            placeholder="Search with primary button..."
            search-icon-position="right"
            search-button-variant="primary"
            .enableVoiceInput=${true}
            @searchSubmit=${(e: CustomEvent) => action('right-primary-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('right-primary-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Default Layout:</strong> Search icon on right with filled button style. Voice button appears next to search.
          </p>
        </div>
        
        <!-- Right Icon, Ghost Button -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Right Icon + Ghost Button</h4>
          <spectrum-search-input
            placeholder="Search with ghost button..."
            search-icon-position="right"
            search-button-variant="ghost"
            .enableVoiceInput=${true}
            @searchSubmit=${(e: CustomEvent) => action('right-ghost-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('right-ghost-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Subtle Style:</strong> Outline button variant for less prominent search action. Good for filtering interfaces.
          </p>
        </div>
        
        <!-- Left Icon, Primary Button -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Left Icon + Primary Button</h4>
          <spectrum-search-input
            placeholder="Search with left icon..."
            search-icon-position="left"
            search-button-variant="primary"
            .enableVoiceInput=${true}
            @searchSubmit=${(e: CustomEvent) => action('left-primary-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('left-primary-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Traditional Layout:</strong> Search icon on left like classic search boxes. Voice button positioned on right.
          </p>
        </div>
        
        <!-- Left Icon, Ghost Button -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Left Icon + Ghost Button</h4>
          <spectrum-search-input
            placeholder="Search with left ghost..."
            search-icon-position="left"
            search-button-variant="ghost"
            .enableVoiceInput=${true}
            @searchSubmit=${(e: CustomEvent) => action('left-ghost-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('left-ghost-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Minimal Style:</strong> Left icon with subtle ghost button. Perfect for embedded search in content areas.
          </p>
        </div>
      </div>
      
      <!-- Layout Guidelines -->
      <div style="margin-top: 2rem; padding: 1.5rem; background: var(--spectrum-sys-color-primary-container); border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-primary-container);">Layout Guidelines</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>Right Icon (Default)</strong><br/>
            <small>• Modern, action-oriented layout<br/>• Search button as primary action<br/>• Good for conversational interfaces</small>
          </div>
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>Left Icon (Traditional)</strong><br/>
            <small>• Familiar search box pattern<br/>• Icon indicates search function<br/>• Good for data filtering</small>
          </div>
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>Primary Button</strong><br/>
            <small>• Prominent search action<br/>• High visual weight<br/>• Main search interfaces</small>
          </div>
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>Ghost Button</strong><br/>
            <small>• Subtle, secondary action<br/>• Reduced visual weight<br/>• Embedded search contexts</small>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Icon positioning and button variant showcase:

### Layout Options

#### Icon Positioning
- **Right Position**: Modern layout with search button as primary action
- **Left Position**: Traditional search box with icon indicating function

#### Button Variants
- **Primary**: Filled button style for prominent search actions
- **Ghost**: Outline button style for subtle, secondary actions

### Use Case Guidelines

#### Right Icon + Primary Button (Default)
- **Best for**: Main search interfaces, conversational UI, command palettes
- **User Pattern**: Action-oriented search where submission is primary goal
- **Visual Weight**: High prominence for search functionality

#### Right Icon + Ghost Button
- **Best for**: Filtering interfaces, secondary search, embedded contexts
- **User Pattern**: Continuous search-as-you-type with optional submission
- **Visual Weight**: Reduced prominence to avoid overwhelming content

#### Left Icon + Primary Button
- **Best for**: Traditional search interfaces, data tables, content discovery
- **User Pattern**: Familiar search box pattern with clear submission action
- **Visual Weight**: Balanced between search indication and action prominence

#### Left Icon + Ghost Button
- **Best for**: Subtle filtering, content area search, minimalist interfaces
- **User Pattern**: Understated search functionality within content flows
- **Visual Weight**: Minimal visual impact while maintaining functionality

Perfect for choosing the right search input layout based on your interface context and user interaction patterns.
        `
      }
    }
  }
};

/**
 * Multi-line input capabilities and height management.
 * Shows how the component adapts to longer text with configurable limits.
 */
export const MultiLineSupport: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
      <h3 style="text-align: center; margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface);">Multi-line Input Support</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 2rem;">
        <!-- 2 Lines Maximum -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">2 Lines Maximum</h4>
          <spectrum-search-input
            max-lines="2"
            placeholder="Try typing a longer query to see height expansion..."
            @searchSubmit=${(e: CustomEvent) => action('2-lines-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('2-lines-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Compact Mode:</strong> Limited to 2 lines for tight layouts. Scrolls after reaching limit.
          </p>
        </div>
        
        <!-- 4 Lines Maximum (Default) -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">4 Lines Maximum (Default)</h4>
          <spectrum-search-input
            max-lines="4"
            placeholder="Type multiple lines of text to see auto-expansion..."
            @searchSubmit=${(e: CustomEvent) => action('4-lines-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('4-lines-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Standard Mode:</strong> Default 4-line limit balances space usage with content visibility.
          </p>
        </div>
        
        <!-- 8 Lines Maximum -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">8 Lines Maximum</h4>
          <spectrum-search-input
            max-lines="8"
            placeholder="Extended input area for detailed queries or chat messages..."
            @searchSubmit=${(e: CustomEvent) => action('8-lines-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('8-lines-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Extended Mode:</strong> Larger input area for detailed queries, chat interfaces, or command input.
          </p>
        </div>
        
        <!-- No Enter Submit -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Enter Disabled</h4>
          <spectrum-search-input
            max-lines="6"
            placeholder="Enter key creates new lines instead of submitting..."
            .enableEnterSubmit=${false}
            @searchSubmit=${(e: CustomEvent) => action('no-enter-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('no-enter-input')(e.detail)}
          ></spectrum-search-input>
          <p style="margin-top: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Pure Textarea Mode:</strong> Enter key adds new lines. Submit only via search button.
          </p>
        </div>
      </div>
      
      <!-- Usage Instructions -->
      <div style="margin-top: 2rem; padding: 1.5rem; background: var(--spectrum-sys-color-secondary-container); border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-secondary-container);">Multi-line Usage Tips</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; color: var(--spectrum-sys-color-on-secondary-container);">
          <div>
            <strong>⌨️ Keyboard Shortcuts</strong><br/>
            <small>• <kbd>Enter</kbd> - Submit search (if enabled)<br/>• <kbd>Shift + Enter</kbd> - New line<br/>• <kbd>Ctrl/Cmd + Enter</kbd> - Force submit</small>
          </div>
          <div>
            <strong>📏 Height Management</strong><br/>
            <small>• Auto-expands up to max lines<br/>• Scrolls when content exceeds limit<br/>• Single-line mode for short content</small>
          </div>
          <div>
            <strong>🎯 Use Cases</strong><br/>
            <small>• Chat interfaces (6-8 lines)<br/>• Search boxes (2-4 lines)<br/>• Command input (4-6 lines)</small>
          </div>
          <div>
            <strong>♿ Accessibility</strong><br/>
            <small>• Screen reader compatible<br/>• Keyboard navigation support<br/>• Focus management included</small>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Multi-line input capabilities and intelligent height management:

### Auto-expansion Behavior
- **Single Line Start**: All inputs begin as single-line text fields
- **Content-based Growth**: Height expands automatically as content increases
- **Maximum Limit**: Configurable maximum lines with scroll overflow
- **Smart Scrolling**: Vertical scroll appears when content exceeds limit

### Line Limit Guidelines

#### 2 Lines (Compact)
- **Use for**: Tight layouts, mobile interfaces, simple search
- **User Pattern**: Brief queries, keywords, simple filters
- **Space Usage**: Minimal vertical space consumption

#### 4 Lines (Default)
- **Use for**: General search, moderate complexity queries
- **User Pattern**: Detailed searches, multiple keywords, short descriptions
- **Space Usage**: Balanced between functionality and space efficiency

#### 6-8 Lines (Extended)
- **Use for**: Chat interfaces, command input, detailed queries
- **User Pattern**: Conversational input, complex commands, multi-line content
- **Space Usage**: Generous input area for rich content

### Keyboard Interaction
- **Enter Key**: Submit search (when enableEnterSubmit is true)
- **Shift + Enter**: Always creates new line regardless of submit setting
- **Smart Submit**: Respects enter submit setting for intuitive behavior

### Height Management
- **Dynamic Sizing**: Component height adjusts based on content
- **Smooth Transitions**: Animated height changes for better UX
- **Scroll Behavior**: Clean scrolling when content exceeds maximum
- **Reset Capability**: Height resets when content is cleared

Perfect for interfaces requiring flexible text input that adapts to user content while maintaining layout constraints.
        `
      }
    }
  }
};

/**
 * Real-time filtering and live search capabilities.
 * Demonstrates searchInput event for instant results and suggestions.
 */
export const LiveFiltering: Story = {
  args: {
    placeholder: 'Type to filter results...',
    searchButtonVariant: 'ghost',
    enableVoiceInput: true,
    maxLines: 2,
    withLiveResults: true
  },
  render: (args) => html`
    <div style="max-width: 600px; margin: 0 auto; padding: 2rem;">
      <h3 style="text-align: center; margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Live Filtering Demo</h3>
      <p style="text-align: center; margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface-variant);">
        Type in the search box to see real-time filtering results appear below
      </p>
      
      <spectrum-search-input
        placeholder=${args.placeholder}
        search-button-variant=${args.searchButtonVariant}
        .enableVoiceInput=${args.enableVoiceInput}
        max-lines=${args.maxLines}
        @searchSubmit=${(e: CustomEvent) => action('live-filter-submit')(e.detail)}
        @searchInput=${(e: CustomEvent) => {
          action('live-filter-input')(e.detail);
          const value = e.detail.value;
          const resultsArea = document.querySelector('#live-filter-results');
          
          if (resultsArea) {
            if (value.length > 0) {
              // Simulate filtering a dataset
              const mockData = [
                'Product Analytics Dashboard',
                'User Management System', 
                'Content Publishing Platform',
                'Search and Discovery Tools',
                'Real-time Collaboration Features',
                'Data Visualization Components',
                'Security and Access Controls',
                'API Integration Services',
                'Mobile Application Framework',
                'Performance Monitoring Tools'
              ];
              
              const filtered = mockData.filter(item => 
                item.toLowerCase().includes(value.toLowerCase())
              );
              
              resultsArea.innerHTML = `
                <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; border: 1px solid var(--spectrum-sys-color-outline);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <h4 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">Search Results</h4>
                    <span style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">${filtered.length} found</span>
                  </div>
                  ${filtered.length > 0 ? `
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      ${filtered.slice(0, 5).map(item => `
                        <div style="padding: 0.75rem; background: var(--spectrum-sys-color-surface); border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline); color: var(--spectrum-sys-color-on-surface); cursor: pointer;" onclick="this.style.background='var(--spectrum-sys-color-primary-container)'">
                          ${item.replace(new RegExp(value, 'gi'), `<mark style="background: var(--spectrum-sys-color-primary-container); color: var(--spectrum-sys-color-on-primary-container); padding: 0.1rem 0.2rem; border-radius: 2px;">$&</mark>`)}
                        </div>
                      `).join('')}
                      ${filtered.length > 5 ? `
                        <div style="padding: 0.5rem; text-align: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
                          +${filtered.length - 5} more results
                        </div>
                      ` : ''}
                    </div>
                  ` : `
                    <div style="padding: 2rem; text-align: center; color: var(--spectrum-sys-color-on-surface-variant);">
                      <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔍</div>
                      <div>No results found for "${value}"</div>
                      <small>Try a different search term</small>
                    </div>
                  `}
                </div>
              `;
            } else {
              resultsArea.innerHTML = `
                <div style="margin-top: 1rem; padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; text-align: center; color: var(--spectrum-sys-color-on-surface-variant);">
                  <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">💡</div>
                  <div>Start typing to see live search results</div>
                  <small>Results will appear instantly as you type</small>
                </div>
              `;
            }
          }
        }}
      ></spectrum-search-input>
      
      <div id="live-filter-results">
        <div style="margin-top: 1rem; padding: 2rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; text-align: center; color: var(--spectrum-sys-color-on-surface-variant);">
          <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">💡</div>
          <div>Start typing to see live search results</div>
          <small>Results will appear instantly as you type</small>
        </div>
      </div>
      
      <!-- Feature Explanation -->
      <div style="margin-top: 2rem; padding: 1.5rem; background: var(--spectrum-sys-color-tertiary-container); border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-tertiary-container);">Live Filtering Implementation</h4>
        <div style="color: var(--spectrum-sys-color-on-tertiary-container);">
          <p style="margin: 0 0 1rem 0;">
            The <code>searchInput</code> event fires on every keystroke, enabling real-time filtering and instant search results. 
            This demo simulates filtering a dataset of 10 items and highlights matching text.
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div>
              <strong>Event Timing</strong><br/>
              <small>• Fires on every keystroke<br/>• Debouncing can be added<br/>• Immediate user feedback</small>
            </div>
            <div>
              <strong>Use Cases</strong><br/>
              <small>• Data table filtering<br/>• Autocomplete suggestions<br/>• Live search results</small>
            </div>
            <div>
              <strong>Performance</strong><br/>
              <small>• Client-side filtering<br/>• Server-side with debouncing<br/>• Progressive loading</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-time filtering and live search capabilities using the searchInput event:

### Live Search Features
- **Instant Results**: Results update on every keystroke without delay
- **Highlighted Matches**: Search terms highlighted in results for easy scanning
- **Result Counting**: Shows number of matching items found
- **Empty State**: Helpful message when no results match the query

### Event Implementation
- **searchInput Event**: Fires on every character input for real-time feedback
- **searchSubmit Event**: Fires when Enter is pressed or search button clicked
- **Debouncing**: Can be implemented in parent components for performance

### Real-world Integration Patterns

#### Client-side Filtering
**Event Handling**: Listen for searchInput events to filter data in real-time
- Get query value from event.detail.value
- Filter dataset using toLowerCase() for case-insensitive matching
- Update display with filtered results immediately

#### Server-side Search with Debouncing
**Performance Optimization**: Use debouncing to limit server requests
- Clear existing timeout on each keystroke
- Set new timeout (300ms recommended) before making request
- Fetch search results when timeout completes

### Performance Considerations
- **Client-side**: Instant filtering for small datasets (< 1000 items)
- **Server-side**: Debounced requests for large datasets or remote search
- **Hybrid**: Client-side filtering with server-side fallback

### UX Best Practices
- **Minimum Query Length**: Consider requiring 2-3 characters before filtering
- **Loading States**: Show loading indicators for async searches
- **Error Handling**: Graceful degradation when search fails
- **Keyboard Navigation**: Support arrow keys for result selection

Perfect for implementing instant search and filtering interfaces with real-time user feedback.
        `
      }
    }
  }
};

/**
 * Voice input capabilities and speech recognition features.
 * Demonstrates browser-based speech-to-text functionality.
 */
export const VoiceInput: Story = {
  render: () => html`
    <div style="max-width: 700px; margin: 0 auto; padding: 2rem;">
      <h3 style="text-align: center; margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Voice Input Capabilities</h3>
      <p style="text-align: center; margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface-variant);">
        Click the microphone button to try speech recognition (requires browser support)
      </p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        <!-- Voice Enabled -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Voice Input Enabled</h4>
          <spectrum-search-input
            placeholder="Try voice input with the mic button..."
            .enableVoiceInput=${true}
            @searchSubmit=${(e: CustomEvent) => action('voice-enabled-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('voice-enabled-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-sys-color-success-container); border-radius: 6px;">
            <strong style="color: var(--spectrum-sys-color-on-success-container);">🎤 Voice Features</strong>
            <div style="color: var(--spectrum-sys-color-on-success-container); font-size: 0.9rem; margin-top: 0.5rem;">
              • Speech recognition available<br/>
              • Click mic button to start recording<br/>
              • Automatic text insertion<br/>
              • Visual feedback during recording
            </div>
          </div>
        </div>
        
        <!-- Voice Disabled -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Voice Input Disabled</h4>
          <spectrum-search-input
            placeholder="Text input only..."
            .enableVoiceInput=${false}
            @searchSubmit=${(e: CustomEvent) => action('voice-disabled-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('voice-disabled-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-sys-color-warning-container); border-radius: 6px;">
            <strong style="color: var(--spectrum-sys-color-on-warning-container);">⌨️ Text Only Mode</strong>
            <div style="color: var(--spectrum-sys-color-on-warning-container); font-size: 0.9rem; margin-top: 0.5rem;">
              • Voice input disabled<br/>
              • Mic button hidden<br/>
              • Keyboard input only<br/>
              • Reduced interface complexity
            </div>
          </div>
        </div>
      </div>
      
      <!-- Browser Compatibility -->
      <div style="margin-top: 2rem; padding: 1.5rem; background: var(--spectrum-sys-color-primary-container); border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-primary-container);">Voice Input Browser Support</h4>
        <div id="voice-support-status" style="color: var(--spectrum-sys-color-on-primary-container);"></div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem; color: var(--spectrum-sys-color-on-primary-container);">
          <div>
            <strong>✅ Supported Browsers</strong><br/>
            <small>• Chrome (all platforms)<br/>• Edge (Windows/Android)<br/>• Safari (iOS 14.5+)<br/>• Chrome Mobile</small>
          </div>
          <div>
            <strong>❌ Not Supported</strong><br/>
            <small>• Firefox (all platforms)<br/>• Safari (macOS)<br/>• Internet Explorer<br/>• Older mobile browsers</small>
          </div>
          <div>
            <strong>🔧 Implementation</strong><br/>
            <small>• WebKit Speech Recognition<br/>• Feature detection included<br/>• Graceful degradation<br/>• Progressive enhancement</small>
          </div>
          <div>
            <strong>🔒 Privacy</strong><br/>
            <small>• User permission required<br/>• No data stored<br/>• Browser-based processing<br/>• One-time recognition</small>
          </div>
        </div>
      </div>
      
      <!-- Usage Instructions -->
      <div style="margin-top: 1.5rem; padding: 1.5rem; background: var(--spectrum-sys-color-secondary-container); border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-secondary-container);">How to Use Voice Input</h4>
        <div style="color: var(--spectrum-sys-color-on-secondary-container);">
          <ol style="margin: 0; padding-left: 1.5rem;">
            <li style="margin-bottom: 0.5rem;"><strong>Click the microphone button</strong> - Located next to the search button</li>
            <li style="margin-bottom: 0.5rem;"><strong>Grant microphone permission</strong> - Browser will request access on first use</li>
            <li style="margin-bottom: 0.5rem;"><strong>Speak your query</strong> - The button will show active state while recording</li>
            <li style="margin-bottom: 0.5rem;"><strong>Wait for transcription</strong> - Speech is converted to text automatically</li>
            <li><strong>Edit if needed</strong> - You can modify the transcribed text before searching</li>
          </ol>
        </div>
      </div>
    </div>
    
    <script>
      // Check voice input support and update status
      setTimeout(() => {
        const statusEl = document.getElementById('voice-support-status');
        if (statusEl) {
          if ('webkitSpeechRecognition' in window) {
            statusEl.innerHTML = \`
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <span style="background: var(--spectrum-sys-color-success); color: var(--spectrum-sys-color-on-success); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold;">✅ SUPPORTED</span>
                <span>Voice input is available in your browser!</span>
              </div>
              <p style="margin: 0; font-size: 0.9rem;">
                Your browser supports WebKit Speech Recognition. Try clicking the microphone button in the search input above to test voice input functionality.
              </p>
            \`;
          } else {
            statusEl.innerHTML = \`
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <span style="background: var(--spectrum-sys-color-error); color: var(--spectrum-sys-color-on-error); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold;">❌ NOT SUPPORTED</span>
                <span>Voice input is not available in your browser</span>
              </div>
              <p style="margin: 0; font-size: 0.9rem;">
                Your browser doesn't support WebKit Speech Recognition. The microphone button will be hidden. Try Chrome, Edge, or Safari on mobile for voice input support.
              </p>
            \`;
          }
        }
      }, 100);
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Voice input capabilities using browser-based speech recognition:

### Speech Recognition Features
- **WebKit-based**: Uses webkitSpeechRecognition API where available
- **Feature Detection**: Automatically detects browser support
- **Visual Feedback**: Button shows active state during recording
- **Automatic Insertion**: Speech converted to text and inserted into input

### Browser Support Status
The component automatically detects browser support and shows/hides the voice button accordingly:

#### ✅ Supported Browsers
- **Chrome**: Full support on all platforms (desktop and mobile)
- **Microsoft Edge**: Windows and Android support
- **Safari**: iOS 14.5+ and iPadOS support
- **Chrome Mobile**: Android and iOS support

#### ❌ Not Supported
- **Firefox**: No support on any platform currently
- **Safari (macOS)**: Desktop Safari doesn't support speech recognition
- **Internet Explorer**: Legacy browser without modern speech APIs
- **Older Browsers**: Browsers without WebKit speech support

### Implementation Details
- **Permission-based**: Requires user permission for microphone access
- **Privacy-focused**: No data storage, browser-based processing only
- **One-time Recognition**: Single recording session per button press
- **Error Handling**: Graceful handling of recognition failures

### User Experience
1. **Discovery**: Voice button appears when support is detected
2. **Permission**: Browser requests microphone permission on first use
3. **Recording**: Clear visual feedback during speech recognition
4. **Transcription**: Automatic text insertion with editing capability
5. **Fallback**: Text input always available as primary method

### Development Considerations
- **Progressive Enhancement**: Voice input enhances but doesn't replace text input
- **Graceful Degradation**: Component works fully without voice support
- **Feature Detection**: Runtime detection prevents unsupported feature exposure
- **Accessibility**: Voice input complements, doesn't replace keyboard accessibility

Perfect for modern interfaces where voice input can enhance user experience while maintaining full functionality for all users.
        `
      }
    }
  }
};

/**
 * Real-world application scenarios and integration patterns.
 * Shows different configurations for various use cases.
 */
export const UseCaseScenarios: Story = {
  render: () => html`
    <div style="max-width: 900px; margin: 0 auto; padding: 2rem;">
      <h3 style="text-align: center; margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface);">Real-world Use Case Scenarios</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 2rem;">
        <!-- Global Search -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); display: flex; align-items: center; gap: 0.5rem;">
            🌐 Global Application Search
          </h4>
          <spectrum-search-input
            placeholder="Search anything..."
            search-icon-position="right"
            search-button-variant="primary"
            .enableVoiceInput=${true}
            .enableEnterSubmit=${true}
            max-lines="2"
            @searchSubmit=${(e: CustomEvent) => action('global-search-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('global-search-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Configuration:</strong> Primary button, voice enabled, 2-line limit<br/>
            <strong>Use for:</strong> Site-wide search, main navigation, help systems
          </div>
        </div>
        
        <!-- Data Table Filter -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); display: flex; align-items: center; gap: 0.5rem;">
            📊 Data Table Filtering
          </h4>
          <spectrum-search-input
            placeholder="Filter table rows..."
            search-icon-position="left"
            search-button-variant="ghost"
            .enableVoiceInput=${false}
            .enableEnterSubmit=${false}
            max-lines="1"
            @searchInput=${(e: CustomEvent) => action('table-filter-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Configuration:</strong> Ghost button, no voice, single line, no submit<br/>
            <strong>Use for:</strong> Table filtering, list searching, data refinement
          </div>
        </div>
        
        <!-- AI Chat Interface -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); display: flex; align-items: center; gap: 0.5rem;">
            🤖 AI Chat Interface
          </h4>
          <spectrum-search-input
            placeholder="Ask me anything..."
            search-icon-position="right"
            search-button-variant="primary"
            .enableVoiceInput=${true}
            .enableEnterSubmit=${true}
            .clearOnSubmit=${true}
            max-lines="6"
            @searchSubmit=${(e: CustomEvent) => action('ai-chat-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('ai-chat-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Configuration:</strong> Primary button, voice enabled, 6 lines, clear on submit<br/>
            <strong>Use for:</strong> Chatbots, AI assistants, conversational interfaces
          </div>
        </div>
        
        <!-- Command Palette -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); display: flex; align-items: center; gap: 0.5rem;">
            ⌨️ Command Palette
          </h4>
          <spectrum-search-input
            placeholder="Type a command..."
            search-icon-position="left"
            search-button-variant="ghost"
            .enableVoiceInput=${false}
            .enableEnterSubmit=${true}
            .clearOnSubmit=${true}
            max-lines="3"
            @searchSubmit=${(e: CustomEvent) => action('command-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('command-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Configuration:</strong> Left icon, ghost button, 3 lines, keyboard focused<br/>
            <strong>Use for:</strong> Command palettes, keyboard shortcuts, quick actions
          </div>
        </div>
        
        <!-- Content Search -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); display: flex; align-items: center; gap: 0.5rem;">
            📄 Content Search
          </h4>
          <spectrum-search-input
            placeholder="Search articles, docs, media..."
            search-icon-position="right"
            search-button-variant="primary"
            .enableVoiceInput=${true}
            .enableEnterSubmit=${true}
            max-lines="4"
            @searchSubmit=${(e: CustomEvent) => action('content-search-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('content-search-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Configuration:</strong> Standard setup with voice, 4 lines, submit enabled<br/>
            <strong>Use for:</strong> Knowledge bases, documentation, content libraries
          </div>
        </div>
        
        <!-- Mobile Optimized -->
        <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); display: flex; align-items: center; gap: 0.5rem;">
            📱 Mobile Optimized
          </h4>
          <spectrum-search-input
            placeholder="Search..."
            search-icon-position="right"
            search-button-variant="primary"
            .enableVoiceInput=${true}
            .enableEnterSubmit=${true}
            max-lines="2"
            @searchSubmit=${(e: CustomEvent) => action('mobile-search-submit')(e.detail)}
            @searchInput=${(e: CustomEvent) => action('mobile-search-input')(e.detail)}
          ></spectrum-search-input>
          <div style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            <strong>Configuration:</strong> Compact design, voice prominent, 2-line limit<br/>
            <strong>Use for:</strong> Mobile apps, touch interfaces, space-constrained layouts
          </div>
        </div>
      </div>
      
      <!-- Configuration Guide -->
      <div style="margin-top: 2rem; padding: 2rem; background: var(--spectrum-sys-color-primary-container); border-radius: 8px;">
        <h4 style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-primary-container);">Configuration Guide</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>🎯 Search Purpose</strong>
            <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.9rem;">
              <li>Global search: Primary button, voice enabled</li>
              <li>Filtering: Ghost button, no voice, no submit</li>
              <li>Commands: Left icon, keyboard-focused</li>
              <li>Chat: Voice enabled, clear on submit</li>
            </ul>
          </div>
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>📏 Space Constraints</strong>
            <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.9rem;">
              <li>Tight layouts: 1-2 lines maximum</li>
              <li>Standard: 4 lines (default)</li>
              <li>Chat/detailed: 6-8 lines</li>
              <li>Mobile: 2 lines, prominent voice</li>
            </ul>
          </div>
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>⚡ Interaction Model</strong>
            <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.9rem;">
              <li>Real-time: Enable searchInput event</li>
              <li>Submission: Enable searchSubmit event</li>
              <li>Continuous: Disable clearOnSubmit</li>
              <li>One-shot: Enable clearOnSubmit</li>
            </ul>
          </div>
          <div style="color: var(--spectrum-sys-color-on-primary-container);">
            <strong>♿ Accessibility</strong>
            <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.9rem;">
              <li>Voice as enhancement, not replacement</li>
              <li>Keyboard navigation always available</li>
              <li>Clear placeholder text</li>
              <li>Proper ARIA labels included</li>
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
Real-world application scenarios showing different configurations:

### Configuration Patterns

#### Global Application Search
- **Purpose**: Site-wide content discovery and navigation
- **Setup**: Primary button, voice enabled, 2-line limit for compact header
- **Events**: Both searchInput (suggestions) and searchSubmit (execution)
- **Best for**: Main navigation, help systems, universal search

#### Data Table Filtering
- **Purpose**: Real-time filtering of displayed data
- **Setup**: Ghost button, no voice, single line, no submit
- **Events**: Only searchInput for instant filtering
- **Best for**: Data grids, list filtering, content refinement

#### AI Chat Interface
- **Purpose**: Conversational AI and chatbot interactions
- **Setup**: Primary button, voice enabled, 6 lines, clear on submit
- **Events**: searchSubmit for message sending, searchInput for typing indicators
- **Best for**: Chatbots, AI assistants, customer service

#### Command Palette
- **Purpose**: Keyboard-driven application commands
- **Setup**: Left icon, ghost button, 3 lines, keyboard-focused
- **Events**: searchSubmit for command execution, searchInput for command suggestions
- **Best for**: Developer tools, productivity apps, power user features

#### Content Search
- **Purpose**: Searching through articles, docs, and media
- **Setup**: Standard configuration with voice support
- **Events**: Both events for suggestions and full search
- **Best for**: Knowledge bases, documentation sites, content libraries

#### Mobile Optimized
- **Purpose**: Touch-first mobile interfaces
- **Setup**: Compact design with prominent voice button
- **Events**: Optimized for touch interaction patterns
- **Best for**: Mobile apps, responsive designs, touch interfaces

### Implementation Strategy

#### Event Usage Patterns
- **searchInput Only**: Real-time filtering, autocomplete, live suggestions
- **searchSubmit Only**: Traditional search, command execution, form submission  
- **Both Events**: Comprehensive search with suggestions and execution
- **Neither**: Static input field (not recommended for search use cases)

#### Voice Input Strategy
- **Enable for**: Conversational interfaces, mobile apps, accessibility
- **Disable for**: Data entry, commands, privacy-sensitive contexts
- **Consider**: Browser support, user context, interface complexity

#### Button Variant Selection
- **Primary**: Main search actions, prominent search interfaces
- **Ghost**: Secondary search, embedded contexts, filtering interfaces
- **Consider**: Visual hierarchy, interface density, user attention

Perfect for choosing the right search input configuration based on your specific use case and user interaction patterns.
        `
      }
    }
  }
}; 