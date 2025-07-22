import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumConversationPanel Component
 * 
 * The `spectrum-conversation-panel` component provides a comprehensive chat/conversation interface designed for AI applications, customer support, and interactive dialogue systems. It features rich message display, source citations, exploration suggestions, and real-time interaction capabilities.
 * 
 * ### Key Features
 * - **Rich Message Display**: Support for user and assistant messages with timestamps
 * - **Source Citations**: Clickable source cards with overlay positioning and mobile support
 * - **Exploration Suggestions**: Interactive suggestion chips for follow-up questions
 * - **Dynamic Title Editing**: In-line title editing with real-time updates
 * - **Loading States**: Visual loading indicators with optional sound feedback
 * - **Background Options**: Multiple background levels (opaque, transparent, frost effects)
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Mobile Optimization**: Responsive design with mobile-specific source card handling
 * 
 * ### Usage Guidelines
 * - **Use for**: AI chat interfaces, customer support systems, educational tutoring, research assistance
 * - **Avoid when**: Simple form interactions, basic messaging (use simpler components instead)
 * 
 * ### Component Dependencies
 * Uses `spectrum-accordion`, `spectrum-button`, `spectrum-chip`, and `spectrum-panel` for rich interactions.
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **action**: `{ action: string, type: string, value: string, messageId?: string }` - General interactions
 * - **titleChanged**: `{ action: string, value: string }` - Title editing events
 * - **explorationSelected**: `{ action: string, exploration: string }` - Exploration chip clicks
 * - **explore**: `{ action: string, value: string }` - Exploration expansion events
 * - **sourceClick**: `{ action: string, label: string, value: string, messageId?: string }` - Source citation clicks
 */

// Component interfaces for TypeScript support
export interface ContentCard {
  title: string;
  subtitle: string;
  snippet: string;
  url: string;
  number: number;
}

export interface ExplorationItem {
  label: string;
  icon: string;
  action: string;
}

export interface Message {
  id: string;
  isRequest: boolean;
  content: string;
  timestamp: string;
  sources?: ContentCard[];
  explorations?: ExplorationItem[];
  title?: string;
  isStepwise?: boolean;
}

interface SpectrumConversationPanelElement extends HTMLElement {
  messages: string;
  conversationtitle: string;
  actions: string;
  sources: string;
  loading: boolean;
  sound: boolean;
  debug: boolean;
  background: 'opaque' | 'transparent' | 'partial-frost' | 'full-frost';
  scrollToLatest(): Promise<void>;
}

// Story arguments interface
interface SpectrumConversationPanelArgs {
  messages: string;
  conversationtitle: string;
  actions: string;
  sources: string;
  loading: boolean;
  sound: boolean;
  debug: boolean;
  background: 'opaque' | 'transparent' | 'partial-frost' | 'full-frost';
  // Helper properties for stories
  sampleMessages: Message[];
  sampleSources: ContentCard[];
  sampleExplorations: ExplorationItem[];
}

const meta: Meta<SpectrumConversationPanelArgs> = {
  title: 'Spectrum/Components/SpectrumConversationPanel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-conversation-panel\` component provides a sophisticated chat interface for AI applications and interactive dialogue systems.

### Data Structures

#### Message Interface
\`\`\`typescript
interface Message {
  id: string;           // Unique message identifier
  isRequest: boolean;   // true for user messages, false for assistant
  content: string;      // Message content (supports HTML)
  timestamp: string;    // ISO timestamp or formatted time
  sources?: ContentCard[];      // Optional source citations
  explorations?: ExplorationItem[];  // Optional follow-up suggestions
  title?: string;       // Optional message title
  isStepwise?: boolean; // Optional stepwise display
}
\`\`\`

#### ContentCard Interface (Sources)
\`\`\`typescript
interface ContentCard {
  title: string;    // Source title
  subtitle: string; // Source subtitle/author
  snippet: string;  // Content excerpt
  url: string;      // Source URL
  number: number;   // Citation number
}
\`\`\`

#### ExplorationItem Interface
\`\`\`typescript
interface ExplorationItem {
  label: string;  // Suggestion text
  icon: string;   // Material icon name
  action: string; // Action identifier
}
\`\`\`

### Background Options
- \`opaque\`: Solid background (default)
- \`transparent\`: Transparent background
- \`partial-frost\`: Subtle frost effect
- \`full-frost\`: Full frost background

### Methods
- \`scrollToLatest()\`: Scroll to the most recent message

### Event System
All events include action attributes for consistent event handling across the conversation interface.

### Basic Usage
\`\`\`html
<spectrum-conversation-panel
  messages='[{"id":"1","isRequest":true,"content":"Hello","timestamp":"2024-01-01T10:00:00Z"}]'
  conversationtitle="AI Assistant Chat"
  background="opaque"
  loading="false">
</spectrum-conversation-panel>
\`\`\`
        `
      }
    }
  },
  args: {
    conversationtitle: 'AI Assistant Conversation',
    background: 'opaque',
    loading: false,
    sound: false,
    debug: false,
    messages: '',
    actions: '',
    sources: '',
    sampleMessages: [
      {
        id: 'playground-1',
        isRequest: true,
        content: 'What are the latest developments in artificial intelligence and machine learning?',
        timestamp: '2024-01-01T10:00:00Z'
      },
      {
        id: 'playground-2',
        isRequest: false,
        content: 'Recent AI developments show remarkable progress across multiple domains. Large language models have achieved human-level performance in many tasks<sup>1</sup>, while computer vision systems now exceed human accuracy in image recognition<sup>2</sup>. Key breakthroughs include advanced reasoning capabilities, multimodal AI systems<sup>3</sup>, and more efficient training methods.',
        timestamp: '2024-01-01T10:01:00Z',
        sources: [
          {
            title: 'Nature Machine Intelligence - LLM Advances 2024',
            subtitle: 'Nature Machine Intelligence',
            snippet: 'Comprehensive review of recent breakthroughs in large language model architecture and training techniques, showing human-level performance across diverse benchmarks.',
            url: 'https://www.nature.com/articles/s42256-024-00801-0',
            number: 1
          },
          {
            title: 'Stanford AI Lab - Computer Vision Benchmarks',
            subtitle: 'Stanford AI Lab',
            snippet: 'Latest benchmark results demonstrating AI systems surpassing human performance in visual recognition tasks across multiple datasets.',
            url: 'https://ai.stanford.edu/blog/computer-vision-benchmarks-2024',
            number: 2
          },
          {
            title: 'MIT Technology Review - Multimodal AI Systems',
            subtitle: 'MIT Technology Review',
            snippet: 'Analysis of AI systems that can process and understand multiple types of data simultaneously, enabling more sophisticated reasoning.',
            url: 'https://www.technologyreview.com/2024/03/15/multimodal-ai-breakthrough/',
            number: 3
          }
        ],
        explorations: [
          { label: 'How do these AI systems compare to human intelligence?', icon: 'psychology', action: 'compare-human-ai' },
          { label: 'What are the practical applications of multimodal AI?', icon: 'integration_instructions', action: 'explore-applications' },
          { label: 'What are the ethical implications of these advances?', icon: 'balance', action: 'explore-ethics' },
          { label: 'How can businesses integrate these AI technologies?', icon: 'business', action: 'business-integration' }
        ]
      },
      {
        id: 'playground-3',
        isRequest: true,
        content: 'What are the main challenges and limitations facing AI development today?',
        timestamp: '2024-01-01T10:02:00Z'
      },
      {
        id: 'playground-4',
        isRequest: false,
        content: 'AI development faces several critical challenges including data bias and fairness issues<sup>4</sup>, enormous computational requirements<sup>5</sup>, lack of explainability in complex models, and concerns about job displacement. Additionally, ensuring AI safety<sup>6</sup> and preventing misuse remain top priorities for researchers and policymakers.',
        timestamp: '2024-01-01T10:02:30Z',
        sources: [
          {
            title: 'AI Bias and Fairness Study',
            subtitle: 'Association for Computing Machinery',
            snippet: 'Comprehensive analysis of bias patterns in AI systems and proposed mitigation strategies',
            url: 'https://acm.org/ai-bias-fairness-2024',
            number: 4
          },
          {
            title: 'Computational Requirements of Modern AI',
            subtitle: 'Nature Energy',
            snippet: 'Research on the energy consumption and environmental impact of training large AI models',
            url: 'https://nature.com/articles/ai-energy-consumption',
            number: 5
          },
          {
            title: 'AI Safety and Alignment Report',
            subtitle: 'Future of Humanity Institute',
            snippet: 'Analysis of potential risks from advanced AI systems and safety research priorities',
            url: 'https://fhi.ox.ac.uk/ai-safety-report-2024',
            number: 6
          }
        ],
        explorations: [
          { label: 'How can we reduce bias in AI systems?', icon: 'tune', action: 'reduce-bias' },
          { label: 'What are the environmental costs of AI training?', icon: 'eco', action: 'environmental-impact' },
          { label: 'How do we make AI decisions more transparent?', icon: 'visibility', action: 'explainable-ai' },
          { label: 'What jobs are most at risk from AI automation?', icon: 'work', action: 'job-automation' }
        ]
      },
      {
        id: 'playground-5',
        isRequest: true,
        content: 'How might AI transform healthcare in the next decade?',
        timestamp: '2024-01-01T10:03:00Z'
      },
      {
        id: 'playground-6',
        isRequest: false,
        content: 'AI is poised to revolutionize healthcare through personalized medicine<sup>8</sup>, early disease detection<sup>7</sup>, drug discovery acceleration<sup>9</sup>, and improved diagnostic accuracy. We can expect AI-powered imaging systems, predictive health analytics, robotic surgery assistance, and AI-driven clinical decision support systems to become mainstream.',
        timestamp: '2024-01-01T10:03:30Z',
        sources: [
          {
            title: 'AI in Medical Imaging Breakthrough',
            subtitle: 'The Lancet Digital Health',
            snippet: 'Study showing AI diagnostic accuracy exceeding radiologists in detecting early-stage cancers',
            url: 'https://thelancet.com/digital-health/ai-imaging-2024',
            number: 7
          },
          {
            title: 'Personalized Medicine and AI',
            subtitle: 'New England Journal of Medicine',
            snippet: 'Review of AI applications in genomics and personalized treatment recommendations',
            url: 'https://nejm.org/personalized-medicine-ai',
            number: 8
          },
          {
            title: 'AI-Accelerated Drug Discovery',
            subtitle: 'Science Translational Medicine',
            snippet: 'Analysis of how AI is reducing drug development timelines from decades to years',
            url: 'https://science.org/ai-drug-discovery-2024',
            number: 9
          }
        ],
        explorations: [
          { label: 'What are the privacy concerns with AI in healthcare?', icon: 'privacy_tip', action: 'healthcare-privacy' },
          { label: 'How will AI change the role of doctors and nurses?', icon: 'medical_services', action: 'healthcare-jobs' },
          { label: 'What regulatory challenges does medical AI face?', icon: 'gavel', action: 'medical-regulation' },
          { label: 'How can we ensure equitable access to AI healthcare?', icon: 'accessibility', action: 'healthcare-equity' }
        ]
      }
    ],
    sampleSources: [],
    sampleExplorations: []
  },
  argTypes: {
    conversationtitle: {
      control: 'text',
      description: 'The conversation title (editable in the UI)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No title provided' }
      }
    },
    background: {
      control: 'select',
      options: ['opaque', 'transparent', 'partial-frost', 'full-frost'],
      description: 'Background style for the panel',
      table: {
        type: { summary: "'opaque' | 'transparent' | 'partial-frost' | 'full-frost'" },
        defaultValue: { summary: 'opaque' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Show loading indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Enable sound effects',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    messages: {
      control: 'text',
      description: 'JSON string of Message array',
      table: {
        type: { summary: 'string (JSON)' },
        defaultValue: { summary: '""' }
      }
    },
    sampleMessages: {
      control: 'object',
      description: 'Sample messages for demonstration (not a real prop)',
      table: {
        type: { summary: 'Message[]' },
        defaultValue: { summary: '[]' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumConversationPanelArgs>;

// Helper function to create realistic conversation data
const createConversationData = (messages: Message[]) => {
  // Convert from our Message interface to the format the component expects
  const convertedMessages = messages.map(message => {
    const converted: any = {
      id: message.id,
      sender: message.isRequest ? 'request' : 'response',
      message: message.content, // content → message
      timestamp: message.timestamp
    };
    
    // Convert sources format if present
    if (message.sources && message.sources.length > 0) {
      converted.sources = message.sources.map(source => ({
        label: source.title,      // title → label
        value: source.url,        // url → value
        snippet: source.snippet,  // snippet stays the same
        number: source.number.toString() // ensure string format
      }));
    }
    
    // Convert explorations format if present
    if (message.explorations && message.explorations.length > 0) {
      converted.explorations = message.explorations.map(exploration => ({
        label: exploration.label,  // label stays the same
        value: exploration.label   // use label as value (what user would type)
      }));
    }
    
    return converted;
  });
  
  return JSON.stringify(convertedMessages);
};

// Interactive render function
const renderConversationPanel = (args: SpectrumConversationPanelArgs) => {
  // Use sampleMessages if provided, otherwise fall back to messages string
  const messagesJson = args.sampleMessages && args.sampleMessages.length > 0 
    ? createConversationData(args.sampleMessages) 
    : args.messages;
  
  console.log('Playground - Raw args:', args);
  console.log('Playground - sampleMessages:', args.sampleMessages);
  console.log('Playground - Final messagesJson:', messagesJson);
  console.log('Playground - messagesJson type:', typeof messagesJson);
  console.log('Playground - messagesJson length:', messagesJson?.length);
  
  return html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h4 style="margin: 0 0 1rem 0;">Debug Info: Messages length = ${messagesJson?.length || 0}</h4>
      <div style="height: 600px; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
        <spectrum-conversation-panel
          messages=${messagesJson}
          conversationtitle=${args.conversationtitle}
          background=${args.background}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${true}
          @action=${(e: CustomEvent) => action('action')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('titleChanged')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('explorationSelected')(e.detail)}
          @explore=${(e: CustomEvent) => action('explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('sourceClick')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </div>
  `;
};

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all conversation panel features and event handling.
 */
export const Playground: Story = {
  render: renderConversationPanel,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all conversation panel properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.

### Testing Tips
- Try different background options to see visual effects
- Toggle loading state to see the loading indicator
- Click on source citations to see overlay behavior
- Click on exploration chips to see suggestion interactions
- Edit the conversation title by clicking on it
- Use the debug mode to see additional logging information
        `
      }
    }
  }
};

// =================================================================
// SIMPLE TEST
// =================================================================

/**
 * Simple test to verify basic component functionality.
 */
export const SimpleTest: Story = {
  render: () => {
    const testMessages = JSON.stringify([
      {
        id: "test-1",
        sender: "request",
        message: "Hello, how are you?",
        timestamp: "2024-01-01T10:00:00Z"
      },
      {
        id: "test-2",
        sender: "response",
        message: "I am doing well, thank you for asking! This is a test message to verify the conversation panel is working correctly<sup>1</sup>.",
        timestamp: "2024-01-01T10:00:30Z",
        sources: [
          {
            label: "Test Source",
            value: "https://example.com/test",
            snippet: "This is a test source to verify citations work",
            number: "1"
          }
        ],
        explorations: [
          {
            label: "Test Exploration",
            value: "Test Exploration"
          }
        ]
      }
    ]);
    
    console.log('SimpleTest messages JSON:', testMessages);
    
    return html`
      <div style="padding: 2rem; height: 400px; border: 1px solid #ccc;">
        <spectrum-conversation-panel
          messages=${testMessages}
          conversationtitle="Simple Test"
          background="opaque"
          @action=${(e: CustomEvent) => action('action')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    `;
  }
};

// =================================================================
// FULL CONVERSATION EXAMPLE
// =================================================================

/**
 * Complete conversation example with multiple exchanges, citations, and explorations.
 */
export const FullConversationExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Complete Conversation Example</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Multi-turn conversation with questions, answers, citations, and explorations</p>
      </div>
      
      <div style="height: 600px; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
        <spectrum-conversation-panel
          messages=${createConversationData([
            {
              id: 'invest-1',
              isRequest: true,
              content: 'I am planning to start investing in renewable energy stocks. What should I know about this sector?',
              timestamp: '2024-01-15T09:00:00Z'
            },
            {
              id: 'invest-2',
              isRequest: false,
              content: 'Renewable energy is an excellent investment sector with strong growth potential. Key areas include solar, wind, hydroelectric, and energy storage technologies. The sector benefits from government incentives, declining technology costs, and increasing global climate commitments.',
              timestamp: '2024-01-15T09:00:45Z',
              sources: [
                {
                  title: 'Global Renewable Energy Market Report 2024',
                  subtitle: 'International Energy Agency (IEA)',
                  snippet: 'Comprehensive analysis of renewable energy market trends and forecasts',
                  url: 'https://iea.org/reports/renewable-energy-market-update',
                  number: 1
                },
                {
                  title: 'Clean Energy Investment Trends',
                  subtitle: 'Bloomberg New Energy Finance',
                  snippet: 'Investment flows and financing trends in clean energy sector',
                  url: 'https://about.bnef.com/clean-energy-investment/',
                  number: 2
                }
              ],
              explorations: [
                { label: 'Top Solar Companies', icon: 'wb_sunny', action: 'explore-solar-stocks' },
                { label: 'Wind Energy Leaders', icon: 'air', action: 'explore-wind-stocks' },
                { label: 'Energy Storage Tech', icon: 'battery_charging_full', action: 'explore-battery-stocks' },
                { label: 'Government Incentives', icon: 'account_balance', action: 'explore-incentives' }
              ]
            },
            {
              id: 'invest-3',
              isRequest: true,
              content: 'What are the main risks I should be aware of when investing in this sector?',
              timestamp: '2024-01-15T09:02:00Z'
            },
            {
              id: 'invest-4',
              isRequest: false,
              content: 'Key risks in renewable energy investing include: regulatory changes affecting subsidies, commodity price volatility for materials like lithium and rare earth metals, technology obsolescence as innovations advance rapidly, and weather dependency for some energy sources.',
              timestamp: '2024-01-15T09:02:30Z',
              sources: [
                {
                  title: 'Renewable Energy Investment Risks Analysis',
                  subtitle: 'S&P Global Market Intelligence',
                  snippet: 'Comprehensive risk assessment for renewable energy investments',
                  url: 'https://spglobal.com/marketintelligence/renewable-risks',
                  number: 3
                },
                {
                  title: 'Critical Materials in Clean Energy',
                  subtitle: 'U.S. Department of Energy',
                  snippet: 'Supply chain analysis of critical materials for clean energy technologies',
                  url: 'https://energy.gov/critical-materials-strategy',
                  number: 4
                }
              ],
              explorations: [
                { label: 'Regulatory Risk Analysis', icon: 'gavel', action: 'explore-regulatory-risks' },
                { label: 'Material Supply Chain', icon: 'precision_manufacturing', action: 'explore-supply-chain' },
                { label: 'Technology Disruption', icon: 'trending_up', action: 'explore-tech-disruption' },
                { label: 'Market Volatility', icon: 'show_chart', action: 'explore-volatility' }
              ]
            }
          ])}
          conversationtitle="Renewable Energy Investment Research"
          background="opaque"
          @action=${(e: CustomEvent) => action('action')(`[Full Conversation] ${JSON.stringify(e.detail)}`)}
          @sourceClick=${(e: CustomEvent) => action('sourceClick')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('explorationSelected')(e.detail)}
          @explore=${(e: CustomEvent) => action('explore')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('titleChanged')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
A complete conversation example demonstrating the full capabilities of the conversation panel with a realistic investment research dialogue.

### Conversation Flow
1. **Initial Question**: User asks about renewable energy investing
2. **Comprehensive Answer**: AI provides overview with citations and exploration options
3. **Follow-up Question**: User inquires about risks
4. **Risk Analysis**: Detailed risk breakdown with relevant sources
5. **Specific Recommendations**: User asks for actionable investment ideas
6. **Company/ETF Suggestions**: Specific recommendations with multiple citations
7. **Market Timing**: User asks about current market conditions
8. **Strategic Advice**: AI provides timing considerations and strategy suggestions

### Key Features Demonstrated
- **Multi-turn Conversation**: Natural back-and-forth dialogue
- **Contextual Citations**: 9 different source citations from authoritative sources
- **Progressive Exploration**: Each response builds on previous context
- **Practical Action Items**: Explorations provide next steps
- **Professional Sources**: IEA, Bloomberg, S&P Global, Morningstar, etc.
- **Varied Content Types**: Market analysis, risk assessment, company research

This example shows how the conversation panel handles complex, multi-part discussions with rich supporting information and actionable next steps.
        `
      }
    }
  }
};

// =================================================================
// CONVERSATION EXAMPLES
// =================================================================

/**
 * Basic conversation examples showing different message types and interactions.
 */
export const ConversationExamples: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Conversation Examples</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Different conversation patterns and message types</p>
      </div>
      
      <div style="display: grid; gap: 2rem;">
        <!-- Simple Q&A -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-primary-container); color: var(--spectrum-sys-color-on-primary-container);">
            <h4 style="margin: 0;">Simple Q&A</h4>
          </div>
          <div style="height: 400px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'simple-1',
                  isRequest: true,
                  content: 'What is machine learning?',
                  timestamp: '2024-01-01T09:00:00Z'
                },
                {
                  id: 'simple-2',
                  isRequest: false,
                  content: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make predictions or decisions.',
                  timestamp: '2024-01-01T09:00:30Z'
                }
              ])}
              conversationtitle="Simple AI Chat"
              background="opaque"
              @action=${(e: CustomEvent) => action('action')(`[Simple] ${JSON.stringify(e.detail)}`)}
              @titleChanged=${(e: CustomEvent) => action('titleChanged')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
        
        <!-- Conversation with Sources -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-secondary-container); color: var(--spectrum-sys-color-on-secondary-container);">
            <h4 style="margin: 0;">With Source Citations</h4>
          </div>
          <div style="height: 400px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'sources-1',
                  isRequest: true,
                  content: 'What are the latest developments in quantum computing?',
                  timestamp: '2024-01-01T10:00:00Z'
                },
                {
                  id: 'sources-2',
                  isRequest: false,
                  content: 'Recent quantum computing developments include IBM\'s 1000+ qubit processors, Google\'s quantum error correction breakthroughs, and new quantum algorithms for optimization problems.',
                  timestamp: '2024-01-01T10:01:00Z',
                  sources: [
                    {
                      title: 'IBM Quantum Roadmap 2024',
                      subtitle: 'IBM Research',
                      snippet: 'Overview of IBM\'s latest quantum processor developments',
                      url: 'https://research.ibm.com/quantum',
                      number: 1
                    },
                    {
                      title: 'Google Quantum AI Progress',
                      subtitle: 'Nature Journal',
                      snippet: 'Breakthrough in quantum error correction published in Nature',
                      url: 'https://nature.com/quantum-error-correction',
                      number: 2
                    },
                    {
                      title: 'Quantum Algorithms Review',
                      subtitle: 'MIT Technology Review',
                      snippet: 'Latest advances in quantum optimization algorithms',
                      url: 'https://technologyreview.mit.edu/quantum',
                      number: 3
                    }
                  ]
                }
              ])}
              conversationtitle="Quantum Computing Research"
              background="opaque"
              @sourceClick=${(e: CustomEvent) => action('sourceClick')(`[Sources] ${JSON.stringify(e.detail)}`)}
              @action=${(e: CustomEvent) => action('action')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
        
        <!-- Conversation with Explorations -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-tertiary-container); color: var(--spectrum-sys-color-on-tertiary-container);">
            <h4 style="margin: 0;">With Exploration Suggestions</h4>
          </div>
          <div style="height: 400px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'explore-1',
                  isRequest: true,
                  content: 'How can I improve my coding skills?',
                  timestamp: '2024-01-01T11:00:00Z'
                },
                {
                  id: 'explore-2',
                  isRequest: false,
                  content: 'To improve your coding skills, focus on: practicing regularly with coding challenges, contributing to open source projects, learning new programming languages, reading others\' code, and building personal projects.',
                  timestamp: '2024-01-01T11:01:00Z',
                  explorations: [
                    { label: 'Best Coding Platforms', icon: 'code', action: 'explore-platforms' },
                    { label: 'Open Source Guide', icon: 'public', action: 'explore-opensource' },
                    { label: 'Learning Resources', icon: 'school', action: 'explore-resources' },
                    { label: 'Project Ideas', icon: 'lightbulb', action: 'explore-projects' }
                  ]
                }
              ])}
              conversationtitle="Coding Skills Development"
              background="opaque"
              @explorationSelected=${(e: CustomEvent) => action('explorationSelected')(`[Explore] ${JSON.stringify(e.detail)}`)}
              @explore=${(e: CustomEvent) => action('explore')(e.detail)}
              @action=${(e: CustomEvent) => action('action')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Examples of different conversation patterns and message types:

### Simple Q&A
Basic question and answer conversation showing the fundamental message display format.

### With Source Citations
Demonstrates how source citations appear as numbered chips that can be clicked to view source details in overlay cards.

### With Exploration Suggestions
Shows exploration chips that provide follow-up question suggestions, allowing users to dive deeper into topics.

Each example demonstrates the event system with proper action attributes for different interaction types.
        `
      }
    }
  }
};

// =================================================================
// BACKGROUND VARIATIONS
// =================================================================

/**
 * Demonstrates all background options for different visual contexts.
 */
export const BackgroundVariations: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: white;">Background Variations</h3>
        <p style="margin: 0; color: rgba(255,255,255,0.8);">Different background options for various contexts</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
        ${['opaque', 'transparent', 'partial-frost', 'full-frost'].map(background => html`
          <div style="border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; overflow: hidden;">
            <div style="padding: 0.75rem; background: rgba(255,255,255,0.1); color: white; text-align: center; font-weight: 500; text-transform: capitalize;">
              ${background.replace('-', ' ')} Background
            </div>
            <div style="height: 300px;">
              <spectrum-conversation-panel
                messages=${createConversationData([
                  {
                    id: `bg-${background}-1`,
                    isRequest: true,
                    content: 'How does this background look?',
                    timestamp: '2024-01-01T12:00:00Z'
                  },
                  {
                    id: `bg-${background}-2`,
                    isRequest: false,
                    content: `This is how the conversation panel looks with ${background.replace('-', ' ')} background. The visual effect adapts to different contexts and branding needs.`,
                    timestamp: '2024-01-01T12:00:30Z'
                  }
                ])}
                conversationtitle="${background.replace('-', ' ')} Demo"
                background=${background as any}
                @action=${(e: CustomEvent) => action('action')(`[${background}] ${JSON.stringify(e.detail)}`)}
              ></spectrum-conversation-panel>
            </div>
          </div>
        `)}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates all four background options to see how the conversation panel adapts to different visual contexts:

### Background Options
- **Opaque**: Solid background for standard interfaces (default)
- **Transparent**: Transparent background for overlay scenarios
- **Partial Frost**: Subtle frost effect for modern glass-morphism designs
- **Full Frost**: Full frost background for premium visual effects

Each background option is designed to work well in different branding contexts and user interface requirements. The frost effects are particularly useful for modern design systems and premium applications.
        `
      }
    }
  }
};

// =================================================================
// STATE EXAMPLES
// =================================================================

/**
 * Shows different component states including loading, empty, and error scenarios.
 */
export const StateExamples: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Component States</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Loading, empty, and error states</p>
      </div>
      
      <div style="display: grid; gap: 2rem;">
        <!-- Loading State -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-primary-container); color: var(--spectrum-sys-color-on-primary-container);">
            <h4 style="margin: 0;">Loading State</h4>
          </div>
          <div style="height: 350px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'loading-1',
                  isRequest: true,
                  content: 'Please analyze this dataset for insights.',
                  timestamp: '2024-01-01T13:00:00Z'
                }
              ])}
              conversationtitle="Data Analysis Assistant"
              background="opaque"
              .loading=${true}
              .sound=${true}
              @action=${(e: CustomEvent) => action('action')(`[Loading] ${JSON.stringify(e.detail)}`)}
            ></spectrum-conversation-panel>
          </div>
        </div>
        
        <!-- Empty State -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-secondary-container); color: var(--spectrum-sys-color-on-secondary-container);">
            <h4 style="margin: 0;">Empty State</h4>
          </div>
          <div style="height: 350px;">
            <spectrum-conversation-panel
              messages=${createConversationData([])}
              conversationtitle="New Conversation"
              background="opaque"
              @action=${(e: CustomEvent) => action('action')(`[Empty] ${JSON.stringify(e.detail)}`)}
              @titleChanged=${(e: CustomEvent) => action('titleChanged')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
        
        <!-- Debug Mode -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-tertiary-container); color: var(--spectrum-sys-color-on-tertiary-container);">
            <h4 style="margin: 0;">Debug Mode</h4>
          </div>
          <div style="height: 350px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'debug-1',
                  isRequest: true,
                  content: 'Test debug functionality',
                  timestamp: '2024-01-01T14:00:00Z'
                },
                {
                  id: 'debug-2',
                  isRequest: false,
                  content: 'Debug mode is enabled. Check the browser console for detailed logging information.',
                  timestamp: '2024-01-01T14:00:15Z'
                }
              ])}
              conversationtitle="Debug Mode Demo"
              background="opaque"
              .debug=${true}
              @action=${(e: CustomEvent) => action('action')(`[Debug] ${JSON.stringify(e.detail)}`)}
            ></spectrum-conversation-panel>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates different component states for various scenarios:

### Loading State
Shows the loading indicator when the AI is processing a request. Can be combined with sound effects for audio feedback.

### Empty State
Displays when no messages are present, showing the clean initial interface with editable title.

### Debug Mode
Enables debug logging to the browser console for development and troubleshooting. Useful for monitoring event flows and component state changes.

These states help provide appropriate feedback to users during different phases of the conversation lifecycle.
        `
      }
    }
  }
};

// =================================================================
// USAGE SCENARIOS
// =================================================================

/**
 * Real-world usage scenarios for different application contexts.
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Real-World Usage Scenarios</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Examples from different application domains</p>
      </div>
      
      <div style="display: grid; gap: 2rem;">
        <!-- Customer Support -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-primary-container); color: var(--spectrum-sys-color-on-primary-container);">
            <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-symbols-outlined">support_agent</span>
              Customer Support Chat
            </h4>
          </div>
          <div style="height: 400px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'support-1',
                  isRequest: true,
                  content: 'I\'m having trouble with my recent order. The tracking shows it was delivered but I haven\'t received it.',
                  timestamp: '2024-01-01T15:00:00Z'
                },
                {
                  id: 'support-2',
                  isRequest: false,
                  content: 'I understand your concern about the missing package. Let me help you resolve this. I\'ve checked your order #12345 and can see the delivery confirmation from yesterday at 2:30 PM.',
                  timestamp: '2024-01-01T15:01:00Z',
                  sources: [
                    {
                      title: 'Order #12345 Details',
                      subtitle: 'Order Management System',
                      snippet: 'Complete order tracking and delivery information',
                      url: 'https://orders.company.com/12345',
                      number: 1
                    }
                  ],
                  explorations: [
                    { label: 'Check with Neighbors', icon: 'home', action: 'check-neighbors' },
                    { label: 'Contact Carrier', icon: 'local_shipping', action: 'contact-carrier' },
                    { label: 'File Missing Package Report', icon: 'report_problem', action: 'file-report' },
                    { label: 'Request Replacement', icon: 'cached', action: 'request-replacement' }
                  ]
                }
              ])}
              conversationtitle="Customer Support - Order Issue"
              background="opaque"
              @action=${(e: CustomEvent) => action('action')(`[Support] ${JSON.stringify(e.detail)}`)}
              @sourceClick=${(e: CustomEvent) => action('sourceClick')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('explorationSelected')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
        
        <!-- Educational Tutoring -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-secondary-container); color: var(--spectrum-sys-color-on-secondary-container);">
            <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-symbols-outlined">school</span>
              AI Math Tutor
            </h4>
          </div>
          <div style="height: 400px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'tutor-1',
                  isRequest: true,
                  content: 'Can you help me understand how to solve quadratic equations?',
                  timestamp: '2024-01-01T16:00:00Z'
                },
                {
                  id: 'tutor-2',
                  isRequest: false,
                  content: 'I\'d be happy to help you with quadratic equations! A quadratic equation has the form ax² + bx + c = 0. There are several methods to solve them: factoring, completing the square, and using the quadratic formula.',
                  timestamp: '2024-01-01T16:01:00Z',
                  sources: [
                    {
                      title: 'Quadratic Formula Guide',
                      subtitle: 'Khan Academy',
                      snippet: 'Step-by-step explanation of the quadratic formula',
                      url: 'https://khanacademy.org/quadratic-formula',
                      number: 1
                    },
                    {
                      title: 'Factoring Methods',
                      subtitle: 'Math is Fun',
                      snippet: 'Different approaches to factoring quadratic expressions',
                      url: 'https://mathisfun.com/factoring',
                      number: 2
                    }
                  ],
                  explorations: [
                    { label: 'Practice Problems', icon: 'quiz', action: 'practice-problems' },
                    { label: 'Factoring Method', icon: 'functions', action: 'learn-factoring' },
                    { label: 'Quadratic Formula', icon: 'calculate', action: 'quadratic-formula' },
                    { label: 'Graphing Parabolas', icon: 'show_chart', action: 'graph-parabolas' }
                  ]
                }
              ])}
              conversationtitle="Math Tutoring Session"
              background="partial-frost"
              @action=${(e: CustomEvent) => action('action')(`[Tutor] ${JSON.stringify(e.detail)}`)}
              @sourceClick=${(e: CustomEvent) => action('sourceClick')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('explorationSelected')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
        
        <!-- Research Assistant -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-tertiary-container); color: var(--spectrum-sys-color-on-tertiary-container);">
            <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-symbols-outlined">science</span>
              Research Assistant
            </h4>
          </div>
          <div style="height: 400px;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'research-1',
                  isRequest: true,
                  content: 'What are the latest findings on climate change impacts on marine ecosystems?',
                  timestamp: '2024-01-01T17:00:00Z'
                },
                {
                  id: 'research-2',
                  isRequest: false,
                  content: 'Recent research shows significant impacts on marine ecosystems from climate change, including ocean acidification, rising sea temperatures, and coral bleaching events. Key findings include 50% coral reef decline and shifting fish populations.',
                  timestamp: '2024-01-01T17:02:00Z',
                  sources: [
                    {
                      title: 'Ocean Acidification Study 2024',
                      subtitle: 'Nature Climate Change',
                      snippet: 'Comprehensive analysis of pH changes in global oceans',
                      url: 'https://nature.com/ocean-acidification-2024',
                      number: 1
                    },
                    {
                      title: 'Coral Reef Status Report',
                      subtitle: 'NOAA Coral Reef Watch',
                      snippet: 'Global coral bleaching events and recovery patterns',
                      url: 'https://coralreefwatch.noaa.gov/status-report',
                      number: 2
                    },
                    {
                      title: 'Marine Species Migration',
                      subtitle: 'Science Journal',
                      snippet: 'Documentation of changing fish population distributions',
                      url: 'https://science.org/marine-migration-climate',
                      number: 3
                    }
                  ],
                  explorations: [
                    { label: 'Regional Impact Analysis', icon: 'public', action: 'regional-analysis' },
                    { label: 'Mitigation Strategies', icon: 'eco', action: 'mitigation-strategies' },
                    { label: 'Economic Implications', icon: 'trending_down', action: 'economic-impact' },
                    { label: 'Conservation Efforts', icon: 'forest', action: 'conservation-efforts' }
                  ]
                }
              ])}
              conversationtitle="Climate Research Analysis"
              background="full-frost"
              @action=${(e: CustomEvent) => action('action')(`[Research] ${JSON.stringify(e.detail)}`)}
              @sourceClick=${(e: CustomEvent) => action('sourceClick')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('explorationSelected')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-world usage scenarios demonstrating the conversation panel in different application contexts:

### Customer Support Chat
- Order tracking and issue resolution
- Integration with order management systems
- Action-oriented explorations for next steps
- Professional support tone and helpful suggestions

### AI Math Tutor
- Educational content with learning resources
- Step-by-step problem-solving approach
- Practice-focused exploration suggestions
- Academic source citations from educational platforms

### Research Assistant
- Scientific literature and data analysis
- Multiple authoritative source citations
- Research-focused exploration paths
- Academic and technical communication style

Each scenario showcases how the conversation panel adapts to different domains while maintaining consistent interaction patterns and event handling.
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLE
// =================================================================

/**
 * Demonstrates accessibility features and keyboard navigation for the conversation panel.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Accessibility Features</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Full keyboard navigation and screen reader support</p>
      </div>
      
      <div style="display: grid; gap: 1.5rem;">
        <div style="background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Accessible Conversation Interface</h4>
          <p style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface-variant);">Test keyboard navigation: Tab through interactive elements, Enter to activate, Escape to close overlays</p>
          
          <div style="height: 500px; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 6px; overflow: hidden;">
            <spectrum-conversation-panel
              messages=${createConversationData([
                {
                  id: 'a11y-1',
                  isRequest: true,
                  content: 'How accessible is this conversation interface?',
                  timestamp: '2024-01-01T18:00:00Z'
                },
                {
                  id: 'a11y-2',
                  isRequest: false,
                  content: 'This conversation panel is fully accessible with comprehensive keyboard navigation, screen reader support, and WCAG compliance. All interactive elements are focusable and properly labeled.',
                  timestamp: '2024-01-01T18:00:30Z',
                  sources: [
                    {
                      title: 'WCAG 2.1 Guidelines',
                      subtitle: 'W3C Accessibility',
                      snippet: 'Web Content Accessibility Guidelines for inclusive design',
                      url: 'https://w3.org/WAI/WCAG21/quickref/',
                      number: 1
                    },
                    {
                      title: 'Keyboard Navigation Patterns',
                      subtitle: 'WAI-ARIA Authoring Practices',
                      snippet: 'Best practices for keyboard-accessible interfaces',
                      url: 'https://w3.org/WAI/ARIA/apg/',
                      number: 2
                    }
                  ],
                  explorations: [
                    { label: 'Screen Reader Testing', icon: 'accessibility', action: 'test-screen-reader' },
                    { label: 'Keyboard Navigation', icon: 'keyboard', action: 'test-keyboard' },
                    { label: 'Color Contrast', icon: 'contrast', action: 'test-contrast' },
                    { label: 'Focus Management', icon: 'center_focus_strong', action: 'test-focus' }
                  ]
                },
                {
                  id: 'a11y-3',
                  isRequest: true,
                  content: 'What specific accessibility features are included?',
                  timestamp: '2024-01-01T18:01:00Z'
                },
                {
                  id: 'a11y-4',
                  isRequest: false,
                  content: 'Key accessibility features include: semantic HTML structure, ARIA labels and roles, keyboard navigation support, high contrast mode compatibility, screen reader announcements, and focus management.',
                  timestamp: '2024-01-01T18:01:30Z'
                }
              ])}
              conversationtitle="Accessibility Demonstration"
              background="opaque"
              @action=${(e: CustomEvent) => action('action')(`[A11y] ${JSON.stringify(e.detail)}`)}
              @sourceClick=${(e: CustomEvent) => action('sourceClick')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('explorationSelected')(e.detail)}
              @titleChanged=${(e: CustomEvent) => action('titleChanged')(e.detail)}
            ></spectrum-conversation-panel>
          </div>
        </div>
        
        <div style="background: var(--spectrum-sys-color-primary-container); color: var(--spectrum-sys-color-on-primary-container); padding: 1.5rem; border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0;">Accessibility Features</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <div>
              <h5 style="margin: 0 0 0.5rem 0;">Keyboard Navigation</h5>
              <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6;">
                <li>Tab to navigate between interactive elements</li>
                <li>Enter/Space to activate buttons and links</li>
                <li>Escape to close overlays and modals</li>
                <li>Arrow keys for exploring suggestions</li>
              </ul>
            </div>
            <div>
              <h5 style="margin: 0 0 0.5rem 0;">Screen Reader Support</h5>
              <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6;">
                <li>Semantic HTML structure with proper roles</li>
                <li>ARIA labels for all interactive elements</li>
                <li>Live regions for dynamic content updates</li>
                <li>Clear content hierarchy and landmarks</li>
              </ul>
            </div>
            <div>
              <h5 style="margin: 0 0 0.5rem 0;">Visual Accessibility</h5>
              <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6;">
                <li>High contrast mode compatibility</li>
                <li>Scalable text up to 200% zoom</li>
                <li>Clear focus indicators</li>
                <li>Color-independent information design</li>
              </ul>
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
Comprehensive accessibility example demonstrating all accessibility features of the conversation panel:

### Keyboard Navigation
- **Tab Navigation**: Move between title, messages, source chips, and exploration buttons
- **Activation**: Use Enter or Space to activate interactive elements
- **Escape Key**: Close source overlays and exploration accordions
- **Arrow Keys**: Navigate within exploration suggestions

### Screen Reader Support
- **Semantic Structure**: Proper HTML landmarks and heading hierarchy
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Live Regions**: Dynamic announcements for new messages and state changes
- **Role Attributes**: Clear roles for conversation elements and interactions

### Visual Accessibility
- **High Contrast Mode**: Enhanced visibility in system high contrast mode
- **Focus Management**: Clear, visible focus indicators throughout the interface
- **Text Scaling**: Supports browser zoom up to 200% without layout issues
- **Color Independence**: Information conveyed through multiple visual cues

### Motor Accessibility
- **Large Touch Targets**: Minimum 44px click targets for all interactive elements
- **Generous Hover Areas**: Tolerant hover zones for imprecise pointing
- **Reduced Motion**: Respects prefers-reduced-motion for animations
- **Alternative Interaction Methods**: Multiple ways to access the same functionality

Test with keyboard navigation, screen readers (NVDA, JAWS, VoiceOver), and browser accessibility tools to experience the full accessible interface.
        `
      }
    }
  }
};