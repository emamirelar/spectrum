import type { Meta, StoryObj } from "@storybook/web-components-vite";
import type { SpectrumConversationPanel } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-conversation-panel/spectrum-conversation-panel";

// Import all examples from organized files
import {
  SimpleConversation,
  ConversationWithSources,
  ConversationWithExplorations,
  EmptyConversation,
  LoadingState,
  EditableTitle,
  MinimalConfiguration
} from './Examples/BasicExamples';

import {
  OpaqueBackground,
  PartialFrostBackground,
  FullFrostBackground,
  TransparentBackground,
  AITutorVariant,
  CustomerSupportVariant,
  ResearchAssistantVariant,
  DarkThemeVariant,
  MobileOptimizedVariant
} from './Examples/VariantExamples';

import {
  GroupedCitationsDemo,
  SoundFeaturesDemo,
  ScrollBehaviorDemo,
  DebugModeDemo,
  LoadingWithSoundDemo,
  MobileSourceCardDemo
} from './Examples/FeatureExamples';

import {
  CustomerSupportScenario,
  EducationalTutoringScenario,
  AcademicResearchScenario,
  HealthcareInformationScenario,
  BusinessConsultingScenario,
  MultiModalConversation
} from './Examples/UsageExamples';

interface SpectrumConversationPanelArgs {
  messages: string;
  conversationtitle: string;
  actions: string;
  sources: string;
  loading: boolean;
  sound: boolean;
  debug?: boolean;
  background: 'opaque' | 'partial-frost' | 'full-frost' | 'transparent';
}

const meta = {
  title: 'Spectrum/Components/SpectrumConversationPanel',
  component: 'spectrum-conversation-panel',
  tags: ['autodocs'],
  args: {
    messages: `[
      {
        "id": "demo-001",
        "message": "Hello! Can you help me understand how this conversation panel works?",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "demo-002",
        "message": "Absolutely! The Spectrum Conversation Panel is a comprehensive component for AI conversations. It supports source citations<sup>1</sup>, interactive explorations, and rich content formatting<cite>2</cite>.<br><br><strong>Key Features:</strong><br>• **Editable titles** - Click the title above to edit<br>• **Source citations** - Hover over numbered chips to see source details<br>• **Explorations** - Expandable suggestions for follow-up questions<br>• **Action buttons** - Contextual actions for each conversation<br>• **Sound support** - Audio feedback for interactions<br>• **Mobile optimized** - Touch-friendly interactions",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:15Z",
        "sources": [
          {
            "label": "Conversation Panel Documentation",
            "value": "https://spectrum.unops.org/conversation-panel",
            "snippet": "Complete documentation for the Spectrum Conversation Panel component.",
            "number": "1"
          },
          {
            "label": "Source Citation Guide",
            "value": "https://spectrum.unops.org/citations",
            "snippet": "How to use inline citations with sup and cite tags in conversation content.",
            "number": "2"
          }
        ],
        "explorations": [
          {
            "label": "How do I customize the appearance?",
            "value": "Can you show me the different background and theme options?"
          },
          {
            "label": "What about mobile interactions?",
            "value": "How does the component work on mobile devices?"
          },
          {
            "label": "Can I add sound effects?",
            "value": "How do I enable and configure sound feedback?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Spectrum Conversation Panel Demo',
    actions: `[
      {
        "label": "Share",
        "icon": "share",
        "value": "share"
      },
      {
        "label": "Export",
        "icon": "download",
        "value": "export"
      }
    ]`,
    sources: '[]',
    loading: false,
    sound: false,
    debug: false,
    background: 'opaque'
  },
  argTypes: {
    messages: {
      control: 'text',
      description: 'JSON string containing an array of message objects with sender, content, sources, and explorations',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON array of message objects with id, message, sender, timestamp, and optional sources/explorations'
        }
      }
    },
    conversationtitle: {
      control: 'text',
      description: 'Editable title displayed at the top of the conversation panel',
      table: {
        type: { summary: 'string' }
      }
    },
    actions: {
      control: 'text',
      description: 'JSON string containing an array of action button objects with label, icon, and value',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON array of action objects with label, icon, and value properties'
        }
      }
    },
    sources: {
      control: 'text',
      description: 'JSON string containing an array of source objects for citations',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON array of source objects with label, value, snippet, and number properties'
        }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Shows animated loading indicator and plays waiting sound if sound is enabled',
      table: {
        type: { summary: 'boolean' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Enables audio feedback for all interactive elements (buttons, chips, loading)',
      table: {
        type: { summary: 'boolean' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enables detailed console logging for development and troubleshooting',
      table: {
        type: { summary: 'boolean' }
      }
    },
    background: {
      control: 'select',
      description: 'Panel background style affecting transparency and visual hierarchy',
      options: ['opaque', 'partial-frost', 'full-frost', 'transparent'],
      table: {
        type: { summary: 'string' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Conversation Panel

A comprehensive conversation interface component designed for AI assistants, customer support, educational platforms, and professional consultations. Built on spectrum-panel with advanced features for rich conversations.

## Core Features

### 🗣️ Message System
- **Dual message types**: Request (user) and Response (AI/agent) messages
- **Rich content**: Full HTML support with proper parsing and rendering
- **Message IDs**: Optional unique identifiers for tracking and event context
- **Timestamps**: Support for conversation chronology

### 📝 Source Citations
- **Automatic conversion**: \`<sup>1</sup>\` and \`<cite>2</cite>\` tags become interactive chips
- **Grouped citations**: Adjacent citations automatically group into single chips
- **Hover interactions**: Desktop hover shows source details in positioned overlays
- **Mobile support**: Touch interactions show slide-up source cards
- **Smart positioning**: Overlays avoid viewport clipping with grid layouts

### 🔍 Interactive Explorations
- **Expandable suggestions**: Chip-based exploration questions in accordions
- **Follow-up prompts**: Contextual suggestions for conversation continuation
- **Event emission**: All interactions emit structured events with message context

### 🎵 Audio Support
- **Sound effects**: Button clicks and chip interactions play audio feedback
- **Loading audio**: Continuous waiting sound during loading states
- **Configurable**: Sound can be enabled/disabled globally for all interactions

### ✏️ Editable Titles
- **Click to edit**: Conversation titles are editable with click interaction
- **Keyboard support**: Enter to save, Escape to cancel, full accessibility
- **Event emission**: Title changes emit events for external handling

### 📱 Mobile Optimization
- **Touch-friendly**: Large touch targets and gesture support
- **Responsive layout**: Adaptive design for different screen sizes
- **Mobile source cards**: Slide-up cards instead of hover overlays

### 🎨 Visual Variants
- **Background levels**: Opaque, partial-frost, full-frost, transparent options
- **Theme integration**: Works with all Spectrum theme colors and variants
- **Accessibility**: High contrast support and screen reader compatibility

## Advanced Features

### Event System
All user interactions emit structured events with consistent payloads:

\`\`\`typescript
// Action button clicks
{ action: "share", type: "action", value: "share", messageId: "msg-001" }

// Source citation clicks  
{ action: "sourceClick", label: "NASA", value: "https://nasa.gov", messageId: "msg-001" }

// Exploration selections
{ action: "explore", value: "exploration content", messageId: "msg-001" }

// Title edits
{ action: "titleChanged", value: "New Title" }
\`\`\`

### Citation Processing
The component intelligently processes HTML content:

1. **Parses** HTML using DOMParser for safe rendering
2. **Identifies** \`<sup>\` and \`<cite>\` tags with numeric content
3. **Groups** adjacent citations for better UX
4. **Converts** to interactive spectrum-chip components
5. **Matches** citations to source data by number
6. **Positions** hover overlays to avoid viewport clipping

### Auto-Scrolling
Smart scrolling behavior maintains good UX:

- **Auto-scroll to latest**: New messages automatically scroll into view
- **Stable during hover**: Citation hovers don't trigger unwanted scrolling
- **Exploration expansion**: Scrolls to show expanded accordion content
- **Performance optimized**: Only scrolls when necessary

## Usage Examples

### Basic Conversation
\`\`\`html
<spectrum-conversation-panel
  messages='[{"message": "Hello!", "sender": "request", "timestamp": "2024-03-20T10:00:00Z"}]'
  conversationtitle="Basic Chat"
  @action="\${handleAction}"
  @titleChanged="\${handleTitleChange}">
</spectrum-conversation-panel>
\`\`\`

### With Source Citations
\`\`\`html
<spectrum-conversation-panel
  messages='[{
    "message": "Climate change is accelerating<sup>1</sup> with significant impacts<cite>2</cite>.",
    "sender": "response",
    "sources": [
      {"label": "IPCC Report", "value": "https://ipcc.ch", "number": "1"},
      {"label": "NASA Data", "value": "https://nasa.gov", "number": "2"}
    ]
  }]'
  @sourceClick="\${handleSourceClick}">
</spectrum-conversation-panel>
\`\`\`

### With Explorations
\`\`\`html
<spectrum-conversation-panel
  messages='[{
    "message": "AI can help with many tasks.",
    "sender": "response", 
    "explorations": [
      {"label": "What tasks can AI help with?", "value": "Specific AI capabilities"}
    ]
  }]'
  @explore="\${handleExploration}">
</spectrum-conversation-panel>
\`\`\`

## Integration Patterns

### Customer Support
- Structured troubleshooting steps
- Resource links and documentation
- Follow-up question suggestions
- Escalation and transcript actions

### Educational/Tutoring
- Explanatory content with examples
- Source citations to learning materials
- Practice and quiz suggestions
- Progress tracking actions

### Research Assistant
- Academic source citations
- Methodology guidance
- Bibliography generation
- Citation formatting help

### Healthcare Information
- Symptom tracking guidance
- Medical resource links
- Warning sign identification
- Appointment preparation help

## Accessibility

- **Keyboard navigation**: Full keyboard support for all interactions
- **Screen readers**: Proper ARIA labels and semantic structure
- **High contrast**: Support for high contrast display preferences
- **Focus management**: Logical tab order and visible focus indicators
- **Reduced motion**: Respects prefers-reduced-motion settings

## Performance

- **Lazy rendering**: Efficient DOM updates for large conversations
- **Event delegation**: Optimized event handling for many citations
- **Memory management**: Proper cleanup of audio resources and event listeners
- **Responsive images**: Source cards use optimized image loading
        `
      }
    }
  }
} satisfies Meta<SpectrumConversationPanel>;

export default meta;
type Story = StoryObj<SpectrumConversationPanelArgs>;

// ============================================================================
// PLAYGROUND STORY
// ============================================================================

export const SpectrumPlayground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing all conversation panel features. Customize messages, actions, background, and audio settings using the controls below.'
      }
    }
  }
};

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const SpectrumBasicExamples: Story = {
  render: () => SimpleConversation(),
  parameters: {
    docs: {
      description: {
        story: 'Fundamental conversation patterns including simple exchanges, source citations, explorations, and loading states. These examples demonstrate the core functionality and basic configurations.'
      }
    }
  }
};

export const SpectrumConversationWithSources: Story = {
  render: () => ConversationWithSources(),
  parameters: {
    docs: {
      description: {
        story: 'Conversation demonstrating source citations using both `<sup>` and `<cite>` tags. Citations are automatically converted to interactive chips that show detailed source information on hover or tap.'
      }
    }
  }
};

export const SpectrumConversationWithExplorations: Story = {
  render: () => ConversationWithExplorations(),
  parameters: {
    docs: {
      description: {
        story: 'Conversation featuring exploration suggestions displayed in an expandable accordion. Explorations provide follow-up questions and conversation starters for users.'
      }
    }
  }
};

export const SpectrumEmptyConversation: Story = {
  render: () => EmptyConversation(),
  parameters: {
    docs: {
      description: {
        story: 'Empty conversation panel showing the initial state before any messages are added. Useful for testing initial render and placeholder states.'
      }
    }
  }
};

export const SpectrumLoadingState: Story = {
  render: () => LoadingState(),
  parameters: {
    docs: {
      description: {
        story: 'Conversation panel in loading state with animated dots indicator. When sound is enabled, a continuous waiting sound plays during loading.'
      }
    }
  }
};

export const SpectrumEditableTitle: Story = {
  render: () => EditableTitle(),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the editable title feature. Click the conversation title to edit it inline. Changes emit titleChanged events for external handling.'
      }
    }
  }
};

export const SpectrumMinimalConfiguration: Story = {
  render: () => MinimalConfiguration(),
  parameters: {
    docs: {
      description: {
        story: 'Minimal conversation panel configuration with only essential props. Shows the component with default settings and minimal content.'
      }
    }
  }
};

// ============================================================================
// VARIANT SHOWCASE
// ============================================================================

export const SpectrumBackgroundVariants: Story = {
  render: () => OpaqueBackground(),
  parameters: {
    docs: {
      description: {
        story: 'Background variant examples showing different transparency levels: opaque (solid), partial-frost (semi-transparent), full-frost (highly frosted), and transparent (fully transparent).'
      }
    }
  }
};

export const SpectrumOpaqueBackground: Story = {
  render: () => OpaqueBackground(),
  parameters: {
    docs: {
      description: {
        story: 'Opaque background variant providing solid, high-contrast background ideal for professional environments and maximum readability.'
      }
    }
  }
};

export const SpectrumPartialFrostBackground: Story = {
  render: () => PartialFrostBackground(),
  parameters: {
    docs: {
      description: {
        story: 'Partial frost background with subtle transparency and blur effect. Balances visual appeal with good readability.'
      }
    }
  }
};

export const SpectrumFullFrostBackground: Story = {
  render: () => FullFrostBackground(),
  parameters: {
    docs: {
      description: {
        story: 'Full frost background with strong glass-like blur effect. Creates modern, floating aesthetic while maintaining text readability.'
      }
    }
  }
};

export const SpectrumTransparentBackground: Story = {
  render: () => TransparentBackground(),
  parameters: {
    docs: {
      description: {
        story: 'Transparent background showing complete backdrop. Requires high-contrast content and careful background selection for optimal readability.'
      }
    }
  }
};

export const SpectrumAITutorVariant: Story = {
  render: () => AITutorVariant(),
  parameters: {
    docs: {
      description: {
        story: 'AI tutor conversation variant with educational content, mathematical explanations, and learning-focused actions. Demonstrates academic use case styling.'
      }
    }
  }
};

export const SpectrumCustomerSupportVariant: Story = {
  render: () => CustomerSupportVariant(),
  parameters: {
    docs: {
      description: {
        story: 'Customer support conversation variant with troubleshooting steps, help resources, and support-specific actions like escalation and transcript sharing.'
      }
    }
  }
};

export const SpectrumResearchAssistantVariant: Story = {
  render: () => ResearchAssistantVariant(),
  parameters: {
    docs: {
      description: {
        story: 'Research assistant conversation variant with extensive citations, academic sources, and research-specific actions like bibliography generation.'
      }
    }
  }
};

export const SpectrumDarkThemeVariant: Story = {
  render: () => DarkThemeVariant(),
  parameters: {
    docs: {
      description: {
        story: 'Dark theme conversation variant optimized for low-light environments. All UI elements adapt to dark color schemes automatically.'
      }
    }
  }
};

export const SpectrumMobileOptimizedVariant: Story = {
  render: () => MobileOptimizedVariant(),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized conversation panel in a mobile viewport. Demonstrates touch-friendly interactions and responsive layout adjustments.'
      }
    }
  }
};

// ============================================================================
// FEATURE DEMONSTRATIONS
// ============================================================================

export const SpectrumGroupedCitationsDemo: Story = {
  render: () => GroupedCitationsDemo(),
  parameters: {
    docs: {
      description: {
        story: 'Advanced citation grouping where adjacent `<sup>` and `<cite>` tags are automatically grouped into single chips. Hover to see multiple source cards in grid layout.'
      }
    }
  }
};

export const SpectrumSoundFeaturesDemo: Story = {
  render: () => SoundFeaturesDemo(),
  parameters: {
    docs: {
      description: {
        story: 'Audio features demonstration. Enable sound control to hear button clicks (button.mp3), chip interactions (chip.mp3), and loading sounds (waiting.mp3).'
      }
    }
  }
};

export const SpectrumScrollBehaviorDemo: Story = {
  render: () => ScrollBehaviorDemo(),
  parameters: {
    docs: {
      description: {
        story: 'Scroll behavior testing with a long conversation. Tests automatic scrolling to latest messages and stable scroll position during hover interactions.'
      }
    }
  }
};

export const SpectrumDebugModeDemo: Story = {
  render: () => DebugModeDemo(),
  parameters: {
    docs: {
      description: {
        story: 'Debug mode demonstration with detailed console logging enabled. Open browser DevTools to see component operation logs, event handling, and state changes.'
      }
    }
  }
};

export const SpectrumLoadingWithSoundDemo: Story = {
  render: () => LoadingWithSoundDemo(),
  parameters: {
    docs: {
      description: {
        story: 'Loading state with sound demonstration. Shows loading animation with continuous waiting.mp3 audio loop when both loading and sound are enabled.'
      }
    }
  }
};

export const SpectrumMobileSourceCardDemo: Story = {
  render: () => MobileSourceCardDemo(),
  parameters: {
    docs: {
      description: {
        story: 'Mobile source card interactions in a mobile viewport. Tapping citation chips shows slide-up source cards instead of hover overlays.'
      }
    }
  }
};

// ============================================================================
// REAL-WORLD USAGE EXAMPLES
// ============================================================================

export const SpectrumCustomerSupportScenario: Story = {
  render: () => CustomerSupportScenario(),
  parameters: {
    docs: {
      description: {
        story: 'Complete customer support scenario with technical troubleshooting, structured help steps, resource links, and support-specific actions. Demonstrates professional support workflow.'
      }
    }
  }
};

export const SpectrumEducationalTutoringScenario: Story = {
  render: () => EducationalTutoringScenario(),
  parameters: {
    docs: {
      description: {
        story: 'Educational tutoring scenario explaining complex concepts with examples, memory aids, and practice opportunities. Perfect for AI tutoring applications.'
      }
    }
  }
};

export const SpectrumAcademicResearchScenario: Story = {
  render: () => AcademicResearchScenario(),
  parameters: {
    docs: {
      description: {
        story: 'Academic research consultation with extensive scholarly citations, research methodology guidance, and academic source recommendations.'
      }
    }
  }
};

export const SpectrumHealthcareInformationScenario: Story = {
  render: () => HealthcareInformationScenario(),
  parameters: {
    docs: {
      description: {
        story: 'Healthcare information scenario with symptom tracking guidance, medical resource links, and preparation for medical visits. For informational purposes only.'
      }
    }
  }
};

export const SpectrumBusinessConsultingScenario: Story = {
  render: () => BusinessConsultingScenario(),
  parameters: {
    docs: {
      description: {
        story: 'Business consulting scenario with strategic planning, project management guidance, risk assessment, and stakeholder communication strategies.'
      }
    }
  }
};

export const SpectrumMultiModalConversation: Story = {
  render: () => MultiModalConversation(),
  parameters: {
    docs: {
      description: {
        story: 'Multi-modal AI assistant combining different conversation types in one interface. Demonstrates versatility for comprehensive AI assistant applications.'
      }
    }
  }
};

// ============================================================================
// ACCESSIBILITY EXAMPLES
// ============================================================================

export const SpectrumAccessibilityExamples: Story = {
  render: () => EditableTitle(),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features demonstration including keyboard navigation, screen reader support, focus management, and high contrast compatibility. Test with keyboard-only navigation and screen readers.'
      }
    }
  }
};
