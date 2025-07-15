# Spectrum Conversation Panel

A sophisticated conversation interface component designed for AI assistants, customer support platforms, educational applications, and professional consultations. Built on the Spectrum design system with advanced features for rich, interactive conversations.

## Overview

The Spectrum Conversation Panel provides a complete solution for conversational interfaces with support for rich content, source citations, interactive explorations, audio feedback, and mobile optimization. It's perfect for applications requiring structured, accessible, and engaging conversation experiences.

### Key Features

- 🗣️ **Dual Message Types**: Request (user) and Response (AI/agent) with rich HTML content
- 📝 **Smart Citations**: Automatic `<sup>` and `<cite>` tag conversion to interactive chips
- 🔍 **Interactive Explorations**: Expandable accordion sections with follow-up suggestions
- 🎵 **Audio Support**: Configurable sound effects for all interactions
- ✏️ **Editable Titles**: Click-to-edit conversation titles with event emission
- 📱 **Mobile Optimized**: Touch-friendly interactions and responsive design
- 🎨 **Visual Variants**: Multiple background levels and theme integration
- ♿ **Accessibility**: Full keyboard navigation and screen reader support

## Installation

```bash
npm install @unops-itg-npm/cpit-spectrum
```

## Basic Usage

### HTML
```html
<spectrum-conversation-panel
  messages='[{"message": "Hello!", "sender": "request", "timestamp": "2024-03-20T10:00:00Z"}]'
  conversationtitle="My Conversation"
  actions='[{"label": "Share", "icon": "share", "value": "share"}]'>
</spectrum-conversation-panel>
```

### React
```tsx
import { SpectrumConversationPanel } from '@unops-itg-npm/cpit-spectrum/react';

function MyApp() {
  const messages = [
    {
      id: "msg-001",
      message: "Hello! How can I help you today?",
      sender: "request",
      timestamp: "2024-03-20T10:00:00Z"
    }
  ];

  return (
    <SpectrumConversationPanel
      messages={JSON.stringify(messages)}
      conversationtitle="Support Chat"
      onAction={(e) => console.log('Action:', e.detail)}
    />
  );
}
```

### Vue
```vue
<template>
  <spectrum-conversation-panel
    :messages="messagesJson"
    conversationtitle="AI Assistant"
    @action="handleAction"
  />
</template>

<script setup>
import { ref, computed } from 'vue';

const messages = ref([
  {
    message: "Welcome! I'm here to help.",
    sender: "response",
    timestamp: new Date().toISOString()
  }
]);

const messagesJson = computed(() => JSON.stringify(messages.value));

const handleAction = (event) => {
  console.log('User action:', event.detail);
};
</script>
```

## API Reference

### Properties

#### `messages` (string, required)
JSON string containing an array of message objects.

**Message Object Structure:**
```typescript
interface Message {
  id?: string;                    // Optional unique identifier
  message: string;                // HTML content of the message
  sender: 'request' | 'response'; // Message type
  timestamp: string;              // ISO datetime string
  sources?: ContentCard[];        // Optional source citations
  explorations?: ExplorationItem[]; // Optional follow-up suggestions
  title?: string;                 // Optional message title
  isStepwise?: boolean;           // Optional stepwise indicator
}
```

**Example:**
```json
[
  {
    "id": "msg-001",
    "message": "Climate change is accelerating<sup>1</sup> with impacts<cite>2</cite>.",
    "sender": "response",
    "timestamp": "2024-03-20T10:00:00Z",
    "sources": [
      {
        "label": "IPCC Report 2023",
        "value": "https://ipcc.ch/report",
        "snippet": "Latest climate science assessment",
        "number": "1"
      },
      {
        "label": "NASA Climate Data",
        "value": "https://climate.nasa.gov",
        "snippet": "Real-time climate monitoring data",
        "number": "2"
      }
    ],
    "explorations": [
      {
        "label": "What are the main climate impacts?",
        "value": "Explain the primary effects of climate change"
      }
    ]
  }
]
```

#### `conversationtitle` (string, required)
The title displayed at the top of the conversation panel. This title is editable - users can click it to modify inline.

#### `actions` (string, optional)
JSON string containing an array of action button objects.

**Action Object Structure:**
```typescript
interface Action {
  label: string;  // Button label text
  icon: string;   // Material icon name
  value: string;  // Value emitted in action events
}
```

**Example:**
```json
[
  {
    "label": "Share Conversation",
    "icon": "share",
    "value": "share"
  },
  {
    "label": "Export PDF",
    "icon": "download",
    "value": "export"
  }
]
```

#### `sources` (string, optional)
JSON string containing an array of source objects for citation matching.

**Source Object Structure:**
```typescript
interface ContentCard {
  label: string;   // Display name of the source
  value: string;   // URL or identifier
  snippet: string; // Description or preview text
  number: string | number; // Citation number for matching
}
```

#### `loading` (boolean, optional, default: false)
Shows animated loading indicator with three dots. When combined with `sound: true`, plays a continuous waiting sound.

#### `sound` (boolean, optional, default: false)
Enables audio feedback for all interactive elements:
- **Button clicks**: Plays `button.mp3`
- **Chip interactions**: Plays `chip.mp3`
- **Loading state**: Plays `waiting.mp3` in loop

#### `debug` (boolean, optional, default: false)
Enables detailed console logging for development and troubleshooting. Logs include:
- Message parsing and rendering
- Event handling and emission
- Scroll behavior and positioning
- Audio initialization and playback
- Citation processing pipeline

#### `background` (string, optional, default: 'opaque')
Controls the panel background transparency and visual style.

**Options:**
- `'opaque'`: Solid background for maximum contrast
- `'partial-frost'`: Semi-transparent with subtle blur
- `'full-frost'`: Strong glass-like blur effect
- `'transparent'`: Fully transparent background

### Events

All events emit structured data with consistent action identification:

#### `action`
Emitted when action buttons are clicked.

**Event Detail:**
```typescript
{
  action: string;     // Action type identifier
  type: string;       // Always "action"
  value: string;      // Action value from button config
  messageId?: string; // ID of associated message (if any)
}
```

**Example:**
```javascript
conversationPanel.addEventListener('action', (event) => {
  const { action, value, messageId } = event.detail;
  
  if (action === 'share') {
    shareConversation(messageId);
  } else if (action === 'export') {
    exportToPDF();
  }
});
```

#### `sourceClick`
Emitted when source citation chips are clicked.

**Event Detail:**
```typescript
{
  action: string;     // Always "sourceClick"
  label: string;      // Source display name
  value: string;      // Source URL or identifier
  messageId?: string; // ID of message containing the citation
}
```

#### `explore`
Emitted when exploration suggestions are clicked.

**Event Detail:**
```typescript
{
  action: string;     // Always "explore"
  value: string;      // Exploration content/question
  messageId?: string; // ID of message containing the exploration
}
```

#### `explorationSelected`
Emitted when exploration accordion is toggled.

**Event Detail:**
```typescript
{
  action: string;      // Always "explorationSelected"
  exploration: string; // Exploration identifier
}
```

#### `titleChanged`
Emitted when the conversation title is edited.

**Event Detail:**
```typescript
{
  action: string; // Always "titleChanged"
  value: string;  // New title text
}
```

### Methods

#### `scrollToLatest()`
Programmatically scrolls the conversation to the latest message.

```javascript
const panel = document.querySelector('spectrum-conversation-panel');
await panel.scrollToLatest();
```

## Advanced Features

### Source Citations

The component automatically converts `<sup>` and `<cite>` tags with numeric content into interactive chips:

```html
<!-- Input HTML -->
<p>Climate change is accelerating<sup>1</sup> with impacts on weather<cite>2</cite><cite>3</cite>.</p>

<!-- Renders as -->
<p>Climate change is accelerating [Interactive Chip: 1] with impacts on weather [Grouped Chip: 2 citations].</p>
```

**Features:**
- **Automatic grouping**: Adjacent citations become single grouped chips
- **Hover interactions**: Desktop shows source details in positioned overlays
- **Mobile support**: Touch shows slide-up source cards
- **Smart positioning**: Overlays avoid viewport clipping

### Explorations System

Exploration suggestions appear in expandable accordions using spectrum-accordion:

```json
{
  "explorations": [
    {
      "label": "What are the main causes of climate change?",
      "value": "Explain primary causes of global warming"
    },
    {
      "label": "How can we reduce our carbon footprint?",
      "value": "Personal actions for climate change mitigation"
    }
  ]
}
```

### Audio Integration

When `sound: true` is enabled:

1. **Action buttons** inherit sound setting and play button.mp3
2. **Exploration chips** play chip.mp3 when clicked
3. **Citation chips** play chip.mp3 when clicked
4. **Loading state** plays waiting.mp3 in continuous loop

**Audio Files Required:**
- `button.mp3`: Button click sound
- `chip.mp3`: Chip interaction sound  
- `waiting.mp3`: Loading loop sound

### Mobile Optimization

The component adapts automatically for mobile devices:

- **Touch targets**: Larger, finger-friendly interaction areas
- **Source cards**: Slide-up cards instead of hover overlays
- **Responsive layout**: Stacked elements for narrow screens
- **Gesture support**: Touch-friendly scrolling and interactions

## Styling and Theming

### CSS Custom Properties

The component uses Spectrum design tokens and provides these custom properties:

```css
spectrum-conversation-panel {
  /* Panel configuration */
  --conversation-panel-background: var(--spectrum-sys-color-surface);
  --conversation-panel-color: var(--spectrum-sys-color-on-surface);
  
  /* Message styling */
  --message-padding: var(--spectrum-sys-spacing);
  --message-border-radius: var(--spectrum-sys-shape-corner-medium);
  
  /* Citation styling */
  --citation-chip-size: extra-small;
  --citation-overlay-background: var(--spectrum-sys-color-surface);
  
  /* Animation timing */
  --conversation-transition: var(--spectrum-sys-motion-duration-medium);
}
```

### Background Variants

```css
/* Opaque background */
spectrum-conversation-panel[background="opaque"] {
  --panel-background: var(--spectrum-sys-color-surface);
}

/* Frost backgrounds */
spectrum-conversation-panel[background="partial-frost"] {
  --panel-background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}

spectrum-conversation-panel[background="full-frost"] {
  --panel-background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
}
```

### Theme Integration

Works seamlessly with all Spectrum theme colors:

```html
<!-- Blue theme -->
<spectrum-theme color="#0070d2">
  <spectrum-conversation-panel>
    <!-- Content adapts to theme -->
  </spectrum-conversation-panel>
</spectrum-theme>

<!-- Green theme -->
<spectrum-theme color="#10b981">
  <spectrum-conversation-panel>
    <!-- Content adapts to theme -->
  </spectrum-conversation-panel>
</spectrum-theme>
```

## Use Cases and Examples

### Customer Support Chat
```html
<spectrum-conversation-panel
  messages='[{
    "message": "I can help you resolve this issue<sup>1</sup>. Please try these troubleshooting steps<cite>2</cite>:<br><br>1. Clear your browser cache<br>2. Restart the application<br>3. Check your internet connection",
    "sender": "response",
    "sources": [
      {"label": "Troubleshooting Guide", "value": "https://support.com/guide", "number": "1"},
      {"label": "Common Issues FAQ", "value": "https://support.com/faq", "number": "2"}
    ],
    "explorations": [
      {"label": "What if these steps don't work?", "value": "Alternative troubleshooting options"}
    ]
  }]'
  conversationtitle="Support Case #12345"
  actions='[
    {"label": "Escalate", "icon": "person_add", "value": "escalate"},
    {"label": "Close Case", "icon": "check", "value": "close"}
  ]'>
</spectrum-conversation-panel>
```

### Educational Tutoring
```html
<spectrum-conversation-panel
  messages='[{
    "message": "Great question! The quadratic formula<sup>1</sup> is: x = (-b ± √(b² - 4ac)) / 2a<cite>2</cite><br><br>Let me walk you through solving x² + 5x + 6 = 0:<br><br>• a = 1, b = 5, c = 6<br>• x = (-5 ± √(25 - 24)) / 2<br>• x = (-5 ± 1) / 2<br>• Solutions: x = -2 or x = -3",
    "sender": "response",
    "sources": [
      {"label": "Algebra Textbook Ch. 4", "value": "https://math.edu/algebra/ch4", "number": "1"},
      {"label": "Khan Academy - Quadratic Formula", "value": "https://khanacademy.org/quadratic", "number": "2"}
    ],
    "explorations": [
      {"label": "Can you give me another practice problem?", "value": "More quadratic equation practice"},
      {"label": "What if the discriminant is negative?", "value": "Complex solutions in quadratic equations"}
    ]
  }]'
  conversationtitle="Algebra Help Session"
  actions='[
    {"label": "Practice Quiz", "icon": "quiz", "value": "quiz"},
    {"label": "Save Notes", "icon": "bookmark", "value": "save"}
  ]'
  sound="true">
</spectrum-conversation-panel>
```

### Research Assistant
```html
<spectrum-conversation-panel
  messages='[{
    "message": "Here are recent peer-reviewed sources on renewable energy<sup>1</sup><sup>2</sup><sup>3</sup>:<br><br><strong>Solar Technology</strong>:<br>• Efficiency improvements: Green et al. (2023)<cite>4</cite><br>• Cost analysis: Solar Economics Quarterly<sup>5</sup><br><br><strong>Wind Power</strong>:<br>• Offshore developments: Wind Research Journal<cite>6</cite><br>• Grid integration: IEEE Power Systems<sup>7</sup>",
    "sender": "response",
    "sources": [
      {"label": "Nature Energy - Solar Advances 2023", "value": "https://nature.com/solar-2023", "number": "1"},
      {"label": "Renewable Energy Journal", "value": "https://journals.elsevier.com/renewable", "number": "2"},
      {"label": "IRENA Global Energy Report", "value": "https://irena.org/global-report", "number": "3"},
      {"label": "Green et al. Solar Efficiency Study", "value": "https://doi.org/solar-efficiency", "number": "4"},
      {"label": "Solar Economics Quarterly Q3", "value": "https://solar-economics.org/q3", "number": "5"},
      {"label": "Wind Research Journal Vol 45", "value": "https://wind-research.org/vol45", "number": "6"},
      {"label": "IEEE Power Systems Integration", "value": "https://ieee.org/power-systems", "number": "7"}
    ],
    "explorations": [
      {"label": "What are the latest efficiency records?", "value": "Recent solar and wind efficiency breakthroughs"},
      {"label": "How do I cite these sources in APA format?", "value": "APA citation formatting for academic papers"}
    ]
  }]'
  conversationtitle="Renewable Energy Research"
  actions='[
    {"label": "Export Bibliography", "icon": "assignment", "value": "bibliography"},
    {"label": "Generate Citations", "icon": "format_quote", "value": "citations"}
  ]'>
</spectrum-conversation-panel>
```

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and chips
- **Escape**: Cancel title editing
- **Arrow keys**: Navigate within accordions

### Screen Reader Support
- **Semantic HTML**: Proper heading structure and landmarks
- **ARIA labels**: Descriptive labels for all interactive elements
- **Live regions**: Dynamic content announcements
- **Focus management**: Logical tab order and focus indicators

### High Contrast Support
```css
@media (prefers-contrast: high) {
  spectrum-conversation-panel {
    --citation-chip-border: 2px solid;
    --message-border: 1px solid var(--spectrum-sys-color-outline);
  }
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  spectrum-conversation-panel {
    --conversation-transition: none;
    --scroll-behavior: auto;
  }
}
```

## Performance

### Optimization Features
- **Lazy rendering**: Efficient DOM updates for large conversations
- **Event delegation**: Optimized event handling for multiple citations
- **Memory management**: Proper cleanup of audio resources and listeners
- **Viewport culling**: Only renders visible message content

### Best Practices
1. **Limit message history**: Consider pagination for conversations over 50 messages
2. **Optimize images**: Use appropriate source card image sizes
3. **Audio preloading**: Preload sound files for better user experience
4. **Debounce events**: Avoid excessive event emission in rapid interactions

## Troubleshooting

### Common Issues

#### Citations not appearing as chips
**Problem**: `<sup>` and `<cite>` tags not converting to interactive chips
**Solution**: 
- Ensure tags contain numeric content (e.g., `<sup>1</sup>`)
- Verify sources array has matching number values
- Check that sources prop is valid JSON

#### Audio not playing
**Problem**: Sound effects not working despite `sound: true`
**Solution**:
- Verify audio files (button.mp3, chip.mp3, waiting.mp3) are accessible
- Check browser autoplay policies
- Test in different browsers (Safari has stricter audio policies)

#### Mobile source cards not showing
**Problem**: Source citations not showing slide-up cards on mobile
**Solution**:
- Verify viewport width detection
- Check for CSS conflicts with slide-up animations
- Test touch event handling

#### Title editing not working
**Problem**: Clicking title doesn't enable editing
**Solution**:
- Ensure spectrum-panel dependency is loaded
- Check for event propagation conflicts
- Verify title editing is enabled on spectrum-panel

### Debug Mode
Enable debug mode to troubleshoot issues:

```html
<spectrum-conversation-panel debug="true">
```

This enables detailed console logging for:
- Message parsing and validation
- Citation processing pipeline
- Event emission and handling
- Audio initialization and playback
- Scroll behavior and positioning

## Dependencies

### Required Components
- **spectrum-panel**: Base container and title editing
- **spectrum-accordion**: Exploration sections
- **spectrum-button**: Action buttons
- **spectrum-chip**: Citations and explorations

### Required Theme
- **spectrum-theme**: Provides design tokens and theming

### Optional Audio Files
- `button.mp3`: Action button sounds
- `chip.mp3`: Chip interaction sounds
- `waiting.mp3`: Loading state audio loop

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Known Limitations
- **Safari audio**: Requires user interaction before audio playback
- **iOS Safari**: Limited support for backdrop-filter in older versions
- **Internet Explorer**: Not supported

## Contributing

For bug reports, feature requests, or contributions, please visit the [Spectrum Component Library repository](https://github.com/unops/spectrum-components).

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run start

# Run tests
npm run test

# Build for production
npm run build
```

## License

This component is part of the UNOPS Spectrum Design System and is licensed under the MIT License. 