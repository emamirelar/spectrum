import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Spectrum/Demo',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Components Demo

This comprehensive demo showcases multiple Spectrum components working together to create a complete interface similar to modern chat applications and admin panels.

## Components Featured

- **spectrum-theme**: Material Design 3 theming system with dynamic color generation
- **spectrum-wallpaper**: Dynamic background theming with color extraction from images
- **spectrum-rail**: Collapsible navigation rail with integrated search and actions
- **spectrum-collapsible-list**: Hierarchical navigation with expandable sections
- **spectrum-conversation-panel**: Rich chat interface with messages, actions, and explorations
- **spectrum-search-input**: Enhanced search functionality with voice input and submit actions

## Key Features Demonstrated

### Theming Integration
- **Dynamic Color Extraction**: Wallpaper extracts dominant colors from the mountain landscape
- **Material Design 3**: Complete color palette generation with proper contrast ratios
- **Coordinated Loading**: Theme waits for wallpaper colors before showing content
- **FOUC Prevention**: Content is hidden until theme is fully ready

### Navigation System
- **Collapsible Rail**: Toggles between compact and expanded states
- **Integrated Search**: Built-in search with optional add button
- **Hierarchical Lists**: Organized navigation with counts and expand/collapse functionality
- **Responsive Design**: Adapts to different screen sizes automatically

### Conversation Interface
- **Rich Messages**: Support for text, explorations, and interactive elements
- **Action Bar**: Customizable header actions (Share, Export, Clear)
- **Exploration Chips**: Clickable suggestions to continue conversations
- **Responsive Layout**: Adapts to container size and content

### Event Communication
- Components communicate via well-structured CustomEvents
- Action-based event payloads for consistent handling
- Event bubbling for loose coupling between components

## Usage Patterns

This interface pattern works well for:
- **AI Chat Applications**: Assistant interfaces, conversational AI
- **Admin Panels**: System management, configuration interfaces  
- **Content Management**: Document organization, project management
- **Collaboration Tools**: Team communication, shared workspaces
- **Data Exploration**: Analytics dashboards, reporting interfaces

The modular design allows individual components to be used separately or combined in different configurations.
        `
      }
    },
    layout: 'fullscreen'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

// Create sample data for the navigation rail
const navigationData = [
  {
    label: 'Settings',
    icon: 'settings',
    expanded: false,
    id: 'settings',
    count: 2,
    children: [
      { label: 'General Settings', action: 'open-general-settings', id: 'general-settings' },
      { label: 'Theme Preferences', action: 'open-theme-preferences', id: 'theme-preferences' }
    ]
  },
  {
    label: 'Recent conversations',
    icon: 'schedule',
    expanded: false,
    id: 'recent-conversations',
    count: 13,
    children: [
      { label: 'AI Assistant Chat', action: 'open-ai-chat', id: 'ai-chat' },
      { label: 'Project Planning', action: 'open-project-planning', id: 'project-planning' },
      { label: 'Code Review Discussion', action: 'open-code-review', id: 'code-review' },
      { label: 'Design System Questions', action: 'open-design-questions', id: 'design-questions' },
      { label: 'Weekly Status Update', action: 'open-weekly-status', id: 'weekly-status' },
      { label: 'Team Collaboration', action: 'open-team-collab', id: 'team-collab' },
      { label: 'Feature Requirements', action: 'open-feature-requirements', id: 'feature-requirements' },
      { label: 'Bug Report Analysis', action: 'open-bug-analysis', id: 'bug-analysis' },
      { label: 'User Experience Research', action: 'open-ux-research', id: 'ux-research' },
      { label: 'Performance Optimization', action: 'open-performance', id: 'performance' },
      { label: 'Security Best Practices', action: 'open-security', id: 'security' },
      { label: 'Documentation Update', action: 'open-docs-update', id: 'docs-update' },
      { label: 'API Integration Guide', action: 'open-api-guide', id: 'api-guide' }
    ]
  }
];

// Welcome conversation data
const conversationMessages = [
  {
    id: "welcome-msg",
    message: "Welcome to the Spectrum Components Demo! This interface showcases how our components work together to create beautiful, functional applications. Try expanding the navigation rail on the left to see the hierarchical menu structure.",
    sender: "response",
    timestamp: new Date().toISOString(),
    explorations: [
      {
        label: "Tell me about the Spectrum component system",
        value: "Tell me about the Spectrum component system"
      },
      {
        label: "How do I implement a navigation rail?",
        value: "How do I implement a navigation rail?"
      },
      {
        label: "What theming options are available?",
        value: "What theming options are available?"
      },
      {
        label: "How does the wallpaper component work?",
        value: "How does the wallpaper component work?"
      }
    ]
  }
];

// Conversation action buttons
const conversationActions = [
  {
    label: "Share",
    icon: "share",
    value: "share"
  },
  {
    label: "Export",
    icon: "download", 
    value: "export"
  },
  {
    label: "Clear",
    icon: "clear",
    value: "clear"
  }
];

export const CompleteInterface: Story = {
  name: 'Complete Interface',
  render: () => html`
    <style>
      .demo-container {
        display: flex;
        height: 100vh;
        width: 100%;
        overflow: hidden;
      }
      .demo-rail {
        z-index: 10;
        position: relative;
      }
      .demo-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }
      .demo-conversation {
        flex: 1;
        margin: 1rem;
        margin-bottom: 0;
      }
      .demo-search-container {
        padding: 1rem;
        border-top: 1px solid var(--spectrum-sys-color-outline);
      }
      .demo-search-input {
        width: 100%;
        max-width: none;
      }
      /* Ensure proper stacking and rendering */
      spectrum-wallpaper {
        min-height: 100vh;
      }
      /* Hide content until theme is ready */
      .demo-container[data-hide-until-ready] {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      .demo-container:not([data-hide-until-ready]) {
        opacity: 1;
      }
    </style>
    
    <spectrum-theme 
      color="#2196F3" 
      wait-for-wallpaper="true"
      hide-content-until-ready="true"
      @themeReady=${action('theme-ready')}
    >
      <spectrum-wallpaper 
        background="linear-gradient(135deg, #c62828 0%, #d32f2f 25%, #f44336 50%, #ff5722 75%, #ff8a65 100%)"
        background-position="center"
        background-size="cover"
        @wallpaperColorsReady=${action('wallpaper-colors-ready')}
      >
        <div class="demo-container" data-hide-until-ready>
          <spectrum-rail 
            class="demo-rail"
            app-name="Spectrum Demo"
            expanded-width="340px"
            more-label="More"
            add-label="Add new"
            @railAction=${action('rail-action')}
            @searchChange=${action('search-change')}
            @expandedChange=${action('expanded-change')}
            @addAction=${action('add-action')}
          >
            <spectrum-collapsible-list 
              slot="items" 
              .data=${navigationData}
              @childAction=${action('child-action')}
              @expandAction=${action('expand-action')}
              @contractAction=${action('contract-action')}
            >
            </spectrum-collapsible-list>
          </spectrum-rail>
          
          <div class="demo-main">
            <spectrum-conversation-panel 
              class="demo-conversation"
              conversation-title="New Conversation"
              messages=${JSON.stringify(conversationMessages)}
              actions=${JSON.stringify(conversationActions)}
              @actionClick=${action('conversation-action')}
              @explorationClick=${action('exploration-click')}
              @messageAction=${action('message-action')}
            >
            </spectrum-conversation-panel>
            
            <div class="demo-search-container">
              <spectrum-search-input 
                class="demo-search-input"
                placeholder="Ask anything..."
                show-voice-button="true"
                show-submit-button="true"
                submit-icon="send"
                @searchChange=${action('search-input-change')}
                @searchSubmit=${action('search-submit')}
                @voiceAction=${action('voice-action')}
              >
              </spectrum-search-input>
            </div>
          </div>
        </div>
      </spectrum-wallpaper>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the complete interface with all components working together:

### Layout Structure
- **Full Height**: Uses viewport height for a complete application feel
- **Flexible Layout**: Rail and main content area adapt to screen size
- **Proper Stacking**: Z-index management for overlays and interactions

### Component Integration
- **Theme Coordination**: Wallpaper and theme work together for cohesive styling
- **Event Handling**: All component events are logged to Actions panel
- **Loading States**: Content appears smoothly after theme initialization

### Interactive Elements
- **Navigation Rail**: Click the menu button to expand/collapse
- **Hierarchical Lists**: Expand "Settings" and "Recent conversations" to see children
- **Conversation Actions**: Try the Share, Export, and Clear buttons
- **Search Input**: Test both the text input and voice/submit buttons
- **Exploration Chips**: Click on suggested questions in the conversation

### Responsive Behavior
- **Mobile Friendly**: Rail collapses appropriately on smaller screens
- **Flexible Content**: Conversation and search areas adapt to available space
- **Touch Interactions**: All components support touch interactions

Try interacting with different elements and watch the Actions panel to see the event communication patterns.
        `
      }
    }
  }
};

export const MinimalDemo: Story = {
  name: 'Minimal Demo',
  render: () => html`
    <style>
      .minimal-demo {
        display: flex;
        height: 80vh;
        width: 100%;
        overflow: hidden;
        border: 1px solid var(--spectrum-sys-color-outline);
        border-radius: 8px;
      }
      .minimal-rail {
        z-index: 10;
      }
      .minimal-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: var(--spectrum-sys-color-surface);
      }
      .minimal-content {
        flex: 1;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--spectrum-sys-color-on-surface);
      }
      .minimal-search {
        padding: 1rem;
        border-top: 1px solid var(--spectrum-sys-color-outline);
      }
    </style>
    
    <spectrum-theme color="#4CAF50">
      <div class="minimal-demo">
        <spectrum-rail 
          class="minimal-rail"
          app-name="Minimal Demo"
          expanded-width="280px"
          @railAction=${action('minimal-rail-action')}
        >
          <spectrum-collapsible-list 
            slot="items"
            .data=${[
              {
                label: 'Quick Actions',
                icon: 'flash_on',
                expanded: false,
                id: 'quick-actions',
                children: [
                  { label: 'New Document', action: 'new-document', id: 'new-doc' },
                  { label: 'Import Files', action: 'import-files', id: 'import' }
                ]
              }
            ]}
            @childAction=${action('minimal-child-action')}
          >
          </spectrum-collapsible-list>
        </spectrum-rail>
        
        <div class="minimal-main">
          <div class="minimal-content">
            <div>
              <h2>Minimal Spectrum Demo</h2>
              <p>A simplified version showcasing the core layout pattern with rail navigation and search.</p>
              <p>Expand the rail to see the navigation options.</p>
            </div>
          </div>
          
          <div class="minimal-search">
            <spectrum-search-input 
              placeholder="Search..."
              show-submit-button="true"
              @searchChange=${action('minimal-search')}
            >
            </spectrum-search-input>
          </div>
        </div>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: `
A simplified version of the interface demonstrating the core layout pattern without the complexity of the full demo.

This version shows:
- **Basic Rail Navigation**: Simple collapsible structure
- **Clean Layout**: Focus on the fundamental layout pattern  
- **Essential Theming**: Basic theme integration without wallpaper
- **Core Interactions**: Key user interaction patterns

Perfect for understanding the basic component relationships before exploring the full-featured demo.
        `
      }
    }
  }
};

export const ComponentShowcase: Story = {
  name: 'Component Showcase',
  render: () => html`
    <style>
      .showcase-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .showcase-section {
        margin-bottom: 3rem;
        padding: 2rem;
        border: 1px solid var(--spectrum-sys-color-outline);
        border-radius: 8px;
        background: var(--spectrum-sys-color-surface);
      }
      .showcase-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--spectrum-sys-color-primary);
      }
      .showcase-description {
        margin-bottom: 1.5rem;
        color: var(--spectrum-sys-color-on-surface);
        line-height: 1.6;
      }
      .rail-demo {
        height: 400px;
        border: 1px solid var(--spectrum-sys-color-outline);
        border-radius: 4px;
        overflow: hidden;
        display: flex;
      }
      .rail-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--spectrum-sys-color-surface-variant);
        color: var(--spectrum-sys-color-on-surface-variant);
      }
      .conversation-demo {
        height: 300px;
      }
      .search-demo {
        max-width: 500px;
      }
    </style>
    
    <spectrum-theme color="#9C27B0">
      <div class="showcase-container">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h1>Spectrum Components Showcase</h1>
          <p>Individual component demonstrations</p>
        </div>
        
        <div class="showcase-section">
          <div class="showcase-title">Navigation Rail</div>
          <div class="showcase-description">
            A collapsible navigation rail with integrated search and hierarchical menu structure. 
            Perfect for applications that need organized navigation with space efficiency.
          </div>
          <div class="rail-demo">
            <spectrum-rail 
              app-name="Component Demo"
              expanded-width="300px"
              @railAction=${action('showcase-rail')}
            >
              <spectrum-collapsible-list 
                slot="items"
                .data=${[
                  {
                    label: 'Navigation Demo',
                    icon: 'navigation',
                    expanded: true,
                    id: 'nav-demo',
                    children: [
                      { label: 'Dashboard', action: 'dashboard', id: 'dashboard' },
                      { label: 'Analytics', action: 'analytics', id: 'analytics' },
                      { label: 'Reports', action: 'reports', id: 'reports' }
                    ]
                  }
                ]}
                @childAction=${action('showcase-nav')}
              >
              </spectrum-collapsible-list>
            </spectrum-rail>
            <div class="rail-content">
              <div>Main content area - click menu to toggle rail</div>
            </div>
          </div>
        </div>
        
        <div class="showcase-section">
          <div class="showcase-title">Conversation Panel</div>
          <div class="showcase-description">
            Rich conversation interface supporting messages, actions, and interactive exploration suggestions.
            Ideal for chat applications, AI assistants, and collaborative interfaces.
          </div>
          <spectrum-conversation-panel 
            class="conversation-demo"
            conversation-title="Component Demo Chat"
            messages=${JSON.stringify([
              {
                id: "demo-msg",
                message: "This is a demonstration of the conversation panel component. It supports rich messages with exploration suggestions.",
                sender: "response", 
                timestamp: new Date().toISOString(),
                explorations: [
                  { label: "Show me more features", value: "Show me more features" },
                  { label: "How do I customize this?", value: "How do I customize this?" }
                ]
              }
            ])}
            actions=${JSON.stringify([
              { label: "Demo Action", icon: "star", value: "demo" }
            ])}
            @actionClick=${action('showcase-conversation')}
          >
          </spectrum-conversation-panel>
        </div>
        
        <div class="showcase-section">
          <div class="showcase-title">Enhanced Search Input</div>
          <div class="showcase-description">
            Advanced search input with optional voice recording and customizable submit actions.
            Features include visual feedback, accessibility support, and flexible styling.
          </div>
          <spectrum-search-input 
            class="search-demo"
            placeholder="Try typing, or use voice input..."
            show-voice-button="true"
            show-submit-button="true"
            submit-icon="search"
            @searchChange=${action('showcase-search-change')}
            @searchSubmit=${action('showcase-search-submit')}
            @voiceAction=${action('showcase-voice')}
          >
          </spectrum-search-input>
        </div>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Individual component demonstrations showing each major component in isolation.

This breakdown helps you understand:
- **Component Capabilities**: What each component can do on its own
- **Configuration Options**: Key properties and customization points
- **Event Patterns**: How components communicate through events
- **Integration Points**: Where components can be combined

Use this to explore individual components before combining them into complex interfaces.
        `
      }
    }
  }
}; 