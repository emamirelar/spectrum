import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumConversationPanel } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-conversation-panel/spectrum-conversation-panel";
import type { SpectrumWallpaper } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-wallpaper/spectrum-wallpaper";
import type { SpectrumTheme } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-theme/spectrum-theme";

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
  // TODO: for now we won't use autodocs but will in the future when we right a template
  tags: ['autodocs'],
  args: {
    messages: `[
      {
        "id": "msg-001",
        "message": "Tell me about the Apollo 11 moon landing",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-002",
        "message": "The Apollo 11 mission was the first manned mission to land on the Moon. Launched on July 16, 1969, it carried astronauts Neil Armstrong, Buzz Aldrin, and Michael Collins. Armstrong and Aldrin became the first humans to walk on the lunar surface on July 20, 1969, while Collins remained in lunar orbit.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "NASA Apollo 11 Mission Overview",
            "value": "https://www.nasa.gov/mission/apollo-11/",
            "snippet": "The primary objective of Apollo 11 was to complete a national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return to Earth.",
            "number": 1
          }
        ],
        "explorations": [
          {
            "label": "What was the famous quote Neil Armstrong said when he first stepped on the moon?",
            "value": "What was the famous quote Neil Armstrong said when he first stepped on the moon?"
          },
          {
            "label": "How long did the astronauts stay on the lunar surface?",
            "value": "How long did the astronauts stay on the lunar surface?"
          },
          {
            "label": "What scientific experiments did they conduct on the moon?",
            "value": "What scientific experiments did they conduct on the moon?"
          },
          {
            "label": "What was the role of Michael Collins during the mission?",
            "value": "What was the role of Michael Collins during the mission?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Apollo 11 Moon Landing',
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
    sources: `[
      {
        "label": "NASA Apollo 11 Mission Overview",
        "value": "https://www.nasa.gov/mission/apollo-11/",
        "snippet": "The primary objective of Apollo 11 was to complete a national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return to Earth.",
        "number": 1
      },
      {
        "label": "Kennedy Space Center Apollo 11 Archive",
        "value": "https://www.kennedyspacecenter.com/apollo-11",
        "snippet": "Comprehensive archive of Apollo 11 mission documentation, including crew communications and flight plans.",
        "number": 2
      },
      {
        "label": "National Air and Space Museum Collection",
        "value": "https://airandspace.si.edu/apollo-11",
        "snippet": "Artifacts and detailed information about the spacecraft, spacesuits, and equipment used during the historic mission.",
        "number": 3
      },
      {
        "label": "Apollo 11 Flight Journal",
        "value": "https://www.hq.nasa.gov/alsj/a11/a11.html",
        "snippet": "Complete mission transcript and timeline from launch to splashdown, including all crew communications.",
        "number": 4
      },
      {
        "label": "Smithsonian Apollo 11 Documentation",
        "value": "https://www.smithsonianmag.com/apollo-11",
        "snippet": "Historical context and behind-the-scenes stories from the mission that changed human history.",
        "number": 5
      }
    ]`,
    loading: false,
    sound: false,
    background: 'opaque'
  },
  argTypes: {
    messages: {
      control: 'text',
      description: 'JSON string containing an array of message objects',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON string containing an array of message objects with message, sender, timestamp, and optional sources'
        }
      }
    },
    conversationtitle: {
      control: 'text',
      description: 'Title of the conversation',
      table: {
        type: { summary: 'string' }
      }
    },
    actions: {
      control: 'text',
      description: 'JSON string containing an array of action objects',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON string containing an array of action objects with label, icon, and value'
        }
      }
    },
    sources: {
      control: 'text',
      description: 'JSON string containing an array of source objects',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON string containing an array of source objects with label, value, and snippet'
        }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show the loading indicator',
      table: {
        type: { summary: 'boolean' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Whether to enable sound',
      table: {
        type: { summary: 'boolean' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Whether to enable debug mode',
      table: {
        type: { summary: 'boolean' }
      }
    },
    background: {
      control: 'select',
      description: 'Background level',
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
          A conversation panel component that displays messages, actions, sources, and explorations.
          
          ## Source Citations
          The conversation panel automatically converts inline citation tags into interactive spectrum-chip components:
          
          - **Dual Tag Support**: Both \`<sup>1</sup>\` and \`<cite>2</cite>\` tags are supported
          - **Identical Behavior**: Both tag types convert to the same extra-small spectrum-chip components
          - **Mixed Usage**: You can use both tag types in the same message (e.g., \`<sup>1</sup>\` and \`<cite>2</cite>\`)
          - **Interactive Chips**: Hover on desktop or tap on mobile to see source details
          - **Source Matching**: Tags are matched to sources array by number (1, 2, 3, etc.)
          - **Event Emission**: Clicking chips emits \`sourceClick\` events with full source data
          
          ### Citation Examples
          \`\`\`html
          <!-- Using sup tags (footnote style) -->
          Climate change affects polar ice<sup>1</sup> and sea levels<sup>2</sup>.
          
          <!-- Using cite tags (academic style) -->
          Research shows<cite>1</cite> that temperatures are rising<cite>2</cite>.
          
          <!-- Mixed usage -->
          Studies indicate<sup>1</sup> while data confirms<cite>2</cite> the trend.
          \`\`\`
          
          ## Message IDs
          Messages can now include an optional \`id\` field. If provided, this ID will be used internally and emitted with actions. If not provided, a fallback ID will be generated (e.g., "msg-0", "msg-1").
          
          ## Events
          All events now include an action attribute to identify the type of action performed. Actions related to specific messages also include a \`messageId\` field:
          
          - **action**: When action buttons are clicked
            - Payload: \`{ action: string, type: string, value: string, messageId?: string }\`
          - **explorationSelected**: When an exploration is selected  
            - Payload: \`{ action: string, exploration: string }\`
          - **explore**: When exploring content
            - Payload: \`{ action: string, value: string, messageId?: string }\`
          - **sourceClick**: When a source link is clicked
            - Payload: \`{ action: string, label: string, value: string, messageId?: string }\`
          - **titleChanged**: When the conversation title is edited
            - Payload: \`{ action: string, value: string }\`
          
          ## Example Usage
          \`\`\`html
          <spectrum-conversation-panel
            @action={(e) => {
              // e.detail = { action: "share", type: "action", value: "share", messageId: "msg-002" }
              console.log('Action:', e.detail);
            }}
            @explorationSelected={(e) => {
              // e.detail = { action: "explorationSelected", exploration: "exploration text" }
              console.log('Exploration selected:', e.detail);
            }}
            @explore={(e) => {
              // e.detail = { action: "explore", value: "exploration content", messageId: "msg-002" }
              console.log('Explore:', e.detail);
            }}
            @sourceClick={(e) => {
              // e.detail = { action: "sourceClick", label: "NASA", value: "https://nasa.gov", messageId: "msg-002" }
              console.log('Source clicked:', e.detail);
            }}
            @titleChanged={(e) => {
              // e.detail = { action: "titleChanged", value: "New Title" }
              console.log('Title changed:', e.detail);
            }}
          />
          \`\`\`
        `
      }
    }
  }
} satisfies Meta<SpectrumConversationPanel>;

export default meta;

export const Default: StoryObj<SpectrumConversationPanelArgs> = {
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 2rem; position: relative; background: var(--spectrum-sys-color-background, #f6f6f6);">
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${args.debug}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `,
};

// Scrolling Behavior - Many Messages for Testing
export const ScrollingBehavior: StoryObj<SpectrumConversationPanelArgs> = {
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 2rem; position: relative; background: var(--spectrum-sys-color-background, #f6f6f6);">
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${args.debug}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `,
  args: {
    messages: `[
      {
        "message": "Hello! Can you help me understand quantum computing?",
        "sender": "request",
        "timestamp": "2024-03-20T09:00:00Z"
      },
      {
        "message": "I'd be happy to help you understand quantum computing! It's a fascinating field that leverages quantum mechanical phenomena to process information in ways classical computers cannot.",
        "sender": "response",
        "timestamp": "2024-03-20T09:00:05Z",
        "sources": [
          {
            "label": "IBM Quantum Computing",
            "value": "https://www.ibm.com/quantum",
            "snippet": "Quantum computing uses quantum bits (qubits) instead of classical bits to perform calculations.",
            "number": 1
          }
        ],
        "explorations": [
          {
            "label": "What are qubits?",
            "value": "What are qubits and how do they differ from classical bits?"
          }
        ]
      },
      {
        "message": "What makes quantum computers different from regular computers?",
        "sender": "request",
        "timestamp": "2024-03-20T09:01:00Z"
      },
      {
        "message": "Great question! The key differences are: Classical computers use bits (0 or 1), while quantum computers use qubits that can be 0, 1, or both simultaneously through superposition. Qubits can also be entangled, creating connections that don't exist in classical systems.",
        "sender": "response",
        "timestamp": "2024-03-20T09:01:10Z"
      },
      {
        "message": "How do qubits work exactly?",
        "sender": "request",
        "timestamp": "2024-03-20T09:02:00Z"
      },
      {
        "message": "Qubits are the fundamental units of quantum information. Unlike classical bits, they can exist in a superposition of both 0 and 1 states simultaneously. This is represented mathematically as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are probability amplitudes.",
        "sender": "response",
        "timestamp": "2024-03-20T09:02:15Z"
      },
      {
        "message": "What are some practical applications of quantum computing?",
        "sender": "request",
        "timestamp": "2024-03-20T09:03:00Z"
      },
      {
        "message": "Quantum computing has several promising applications: Cryptography for breaking current encryption and creating quantum-safe methods, Drug Discovery for simulating molecular interactions, Financial Modeling for portfolio optimization, Machine Learning with quantum algorithms, Weather Forecasting for complex atmospheric modeling, and Supply Chain optimization.",
        "sender": "response",
        "timestamp": "2024-03-20T09:03:20Z",
        "explorations": [
          {
            "label": "How does quantum cryptography work?",
            "value": "How does quantum cryptography provide better security?"
          },
          {
            "label": "What is quantum machine learning?",
            "value": "How do quantum computers enhance machine learning?"
          }
        ]
      },
      {
        "message": "Are quantum computers available today?",
        "sender": "request",
        "timestamp": "2024-03-20T09:04:00Z"
      },
      {
        "message": "Yes, but they're still in early stages! Current quantum computers include IBM Quantum with cloud-accessible processors, Google Sycamore that achieved quantum supremacy in 2019, Rigetti Computing with quantum cloud services, IonQ with trapped-ion systems, and D-Wave with quantum annealing systems. However, these are mostly for research and experimentation.",
        "sender": "response",
        "timestamp": "2024-03-20T09:04:25Z"
      },
      {
        "message": "What are the main challenges with quantum computing?",
        "sender": "request",
        "timestamp": "2024-03-20T09:05:00Z"
      },
      {
        "message": "Quantum computing faces several significant challenges: Decoherence where qubits lose their quantum properties quickly, high error rates in current systems, extreme temperature requirements near absolute zero, limited qubit connectivity, the need for quantum error correction requiring many physical qubits for one logical qubit, and programming complexity since quantum algorithms are fundamentally different from classical ones.",
        "sender": "response",
        "timestamp": "2024-03-20T09:05:30Z",
        "sources": [
          {
            "label": "Quantum Error Correction Research",
            "value": "https://quantum-error-correction.org",
            "snippet": "Error correction is crucial for building large-scale quantum computers that can solve real-world problems.",
            "number": 1
          },
          {
            "label": "Nature Quantum Information Journal",
            "value": "https://www.nature.com/npjqi/",
            "snippet": "Latest research papers on quantum information science and technology.",
            "number": 2
          },
          {
            "label": "Quantum Computing Stack Exchange",
            "value": "https://quantumcomputing.stackexchange.com/",
            "snippet": "Community-driven Q&A platform for quantum computing questions and discussions.",
            "number": 3
          },
          {
            "label": "arXiv Quantum Physics",
            "value": "https://arxiv.org/list/quant-ph/recent",
            "snippet": "Preprint repository for the latest quantum physics and quantum computing research.",
            "number": 4
          }
        ]
      },
      {
        "message": "How long until quantum computers become mainstream?",
        "sender": "request",
        "timestamp": "2024-03-20T09:06:00Z"
      },
      {
        "message": "The timeline is uncertain, but estimates suggest: Near-term (2-5 years) quantum advantage in specific applications like optimization, Medium-term (5-15 years) practical quantum computers for specialized industries, and Long-term (15+ years) fault-tolerant quantum computers that could impact broader computing. Quantum computers won't replace classical computers entirely.",
        "sender": "response",
        "timestamp": "2024-03-20T09:06:40Z"
      },
      {
        "message": "Can I learn quantum computing without a physics background?",
        "sender": "request",
        "timestamp": "2024-03-20T09:07:00Z"
      },
      {
        "message": "Absolutely! While physics helps, you can learn quantum computing from a computer science perspective. You'll need mathematics like linear algebra, complex numbers, and basic probability. For programming, learn Python with quantum libraries like Qiskit, Cirq, or PennyLane. Try online courses like IBM Qiskit Textbook and Microsoft Quantum Katas.",
        "sender": "response",
        "timestamp": "2024-03-20T09:07:35Z",
        "explorations": [
          {
            "label": "What quantum programming languages exist?",
            "value": "What programming languages are used for quantum computing?"
          },
          {
            "label": "Best quantum computing courses for beginners?",
            "value": "What are the best quantum computing courses for beginners?"
          }
        ]
      },
      {
        "message": "What's the difference between quantum computing and quantum AI?",
        "sender": "request",
        "timestamp": "2024-03-20T09:08:00Z"
      },
      {
        "message": "Great distinction! Quantum Computing is the broader field of using quantum mechanics for computation, while Quantum AI/ML specifically uses quantum computers for artificial intelligence and machine learning tasks. Quantum AI could offer advantages in pattern recognition, neural network optimization, complex probability distributions, and feature mapping.",
        "sender": "response",
        "timestamp": "2024-03-20T09:08:30Z"
      },
      {
        "message": "Are there any quantum computing companies I should know about?",
        "sender": "request",
        "timestamp": "2024-03-20T09:09:00Z"
      },
      {
        "message": "Yes! Key hardware companies include IBM with Quantum Network, Google's Quantum AI division, Rigetti for quantum cloud computing, IonQ with trapped-ion systems, Honeywell/Quantinuum, and D-Wave for quantum annealing. For software and cloud services: Microsoft Azure Quantum, Amazon Braket, Xanadu for photonic quantum computing, and PsiQuantum for large-scale systems.",
        "sender": "response",
        "timestamp": "2024-03-20T09:09:45Z",
        "sources": [
          {
            "label": "Quantum Computing Market Report",
            "value": "https://quantum-market-report.com",
            "snippet": "The quantum computing market is expected to grow significantly in the coming decade with major investments from tech giants.",
            "number": 1
          },
          {
            "label": "MIT Technology Review Quantum",
            "value": "https://www.technologyreview.com/topic/quantum-computing/",
            "snippet": "Analysis and insights on the latest developments in quantum computing technology.",
            "number": 2
          },
          {
            "label": "IEEE Spectrum Quantum Computing",
            "value": "https://spectrum.ieee.org/topic/quantum-computing/",
            "snippet": "Technical articles and industry news covering quantum computing advancements.",
            "number": 3
          },
          {
            "label": "Quantum Computing Companies Database",
            "value": "https://quantumcomputingcompanies.com/",
            "snippet": "Comprehensive directory of companies working in quantum computing hardware and software.",
            "number": 4
          },
          {
            "label": "CB Insights Quantum Computing Report",
            "value": "https://www.cbinsights.com/research/quantum-computing-market-map/",
            "snippet": "Market analysis and funding trends in the quantum computing industry.",
            "number": 5
          }
        ]
      },
      {
        "message": "What about quantum internet? Is that related?",
        "sender": "request",
        "timestamp": "2024-03-20T09:10:00Z"
      },
      {
        "message": "Yes, quantum internet is closely related! It's a theoretical network using quantum entanglement to transmit information with perfect security. Key features include quantum key distribution for unbreakable encryption, quantum teleportation for information transfer, distributed quantum computing across networks, and ultra-secure communications. China, EU, and US are investing heavily in this research.",
        "sender": "response",
        "timestamp": "2024-03-20T09:10:40Z"
      },
      {
        "message": "This has been incredibly informative! Any final thoughts?",
        "sender": "request",
        "timestamp": "2024-03-20T09:11:00Z"
      },
      {
        "message": "I'm glad you found it helpful! Quantum computing represents one of the most exciting frontiers in technology. Key takeaways: Quantum computers won't replace classical computers but will solve specific problems much faster, the technology is advancing rapidly but faces significant challenges, there are already opportunities to experiment with quantum programming, and the intersection with AI is particularly promising. Stay curious and keep learning!",
        "sender": "response",
        "timestamp": "2024-03-20T09:11:30Z",
        "explorations": [
          {
            "label": "How to get started with quantum programming?",
            "value": "What's the best way to start programming quantum computers?"
          },
          {
            "label": "Future of quantum computing in 2030?",
            "value": "What will quantum computing look like in 2030?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Quantum Computing Deep Dive - Scrolling Test',
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
      },
      {
        "label": "Bookmark",
        "icon": "bookmark",
        "value": "bookmark"
      }
    ]`,
    sources: `[
      {
        "label": "IBM Quantum Computing",
        "value": "https://www.ibm.com/quantum",
        "snippet": "IBM's comprehensive quantum computing platform and resources.",
        "number": 1
      },
      {
        "label": "Google Quantum AI",
        "value": "https://ai.google/discover/quantumai/",
        "snippet": "Google's quantum computing research and Sycamore processor achievements.",
        "number": 2
      },
      {
        "label": "Microsoft Azure Quantum",
        "value": "https://azure.microsoft.com/en-us/services/quantum/",
        "snippet": "Cloud-based quantum computing services and development tools.",
        "number": 3
      },
      {
        "label": "Rigetti Computing",
        "value": "https://www.rigetti.com/",
        "snippet": "Quantum cloud services and quantum processor development.",
        "number": 4
      },
      {
        "label": "IonQ Quantum Systems",
        "value": "https://ionq.com/",
        "snippet": "Trapped-ion quantum computing technology and cloud access.",
        "number": 5
      },
      {
        "label": "D-Wave Quantum Annealing",
        "value": "https://www.dwavesys.com/",
        "snippet": "Quantum annealing systems for optimization problems.",
        "number": 6
      }
    ]`,
    loading: false
  }
};

// Sources Horizontal Scrolling Demo
export const SourcesScrollingDemo: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    messages: `[
      {
        "message": "I need comprehensive information about renewable energy technologies and their implementation.",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "message": "Here's a comprehensive overview of renewable energy technologies: Solar power harnesses sunlight through photovoltaic panels or concentrated solar power systems. Wind energy captures kinetic energy through turbines in onshore and offshore installations. Hydroelectric power uses flowing water to generate electricity. Geothermal energy taps into Earth's internal heat. Biomass converts organic materials into energy. Each technology has unique advantages, costs, and implementation considerations.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "International Energy Agency (IEA) Renewable Report",
            "value": "https://www.iea.org/reports/renewables-2023",
            "snippet": "Comprehensive analysis of renewable energy market trends, forecasts, and policy recommendations from the world's leading energy authority.",
            "number": 1
          },
          {
            "label": "IRENA Global Energy Transformation Report",
            "value": "https://www.irena.org/publications/2023/Jun/Global-energy-transformation",
            "snippet": "International Renewable Energy Agency's roadmap for achieving sustainable energy transformation by 2050.",
            "number": 2
          },
          {
            "label": "National Renewable Energy Laboratory (NREL)",
            "value": "https://www.nrel.gov/analysis/tech-lcoe-re-cost-est.html",
            "snippet": "Technical and economic analysis of renewable energy technologies, including cost estimates and performance data.",
            "number": 3
          },
          {
            "label": "BloombergNEF Energy Transition Report",
            "value": "https://about.bnef.com/energy-transition-investment/",
            "snippet": "Market intelligence and financial analysis of clean energy investments and technology deployment trends.",
            "number": 4
          },
          {
            "label": "MIT Energy Initiative Technology Review",
            "value": "https://energy.mit.edu/research/renewables/",
            "snippet": "Research insights on renewable energy technologies, grid integration, and energy storage solutions.",
            "number": 5
          },
          {
            "label": "World Bank Energy Sector Management",
            "value": "https://www.worldbank.org/en/topic/energy/overview",
            "snippet": "Global perspective on energy access, renewable energy financing, and sustainable development goals.",
            "number": 6
          },
          {
            "label": "European Environment Agency Report",
            "value": "https://www.eea.europa.eu/themes/energy/renewable-energy",
            "snippet": "Environmental impact assessment and policy analysis of renewable energy deployment in Europe.",
            "number": 7
          },
          {
            "label": "Solar Power World Industry Analysis",
            "value": "https://www.solarpowerworldonline.com/solar-market-insight/",
            "snippet": "Latest trends in solar photovoltaic technology, market growth, and installation statistics worldwide.",
            "number": 8
          },
          {
            "label": "Global Wind Energy Council Report",
            "value": "https://gwec.net/global-wind-report-2023/",
            "snippet": "Comprehensive statistics and analysis of global wind energy capacity, technology developments, and future outlook.",
            "number": 9
          },
          {
            "label": "International Hydropower Association Database",
            "value": "https://www.hydropower.org/status-report",
            "snippet": "Global hydropower statistics, technological innovations, and sustainability guidelines for water-based energy generation.",
            "number": 10
          }
        ],
        "explorations": [
          {
            "label": "What are the latest solar panel efficiency improvements?",
            "value": "What are the latest solar panel efficiency improvements?"
          },
          {
            "label": "How do offshore wind farms compare to onshore installations?",
            "value": "How do offshore wind farms compare to onshore installations?"
          },
          {
            "label": "What role does energy storage play in renewable integration?",
            "value": "What role does energy storage play in renewable integration?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Renewable Energy Sources - Horizontal Scrolling Demo',
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
    sources: `[]`,
    loading: false
  },
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa); border: 1px solid var(--spectrum-sys-color-outline-variant, #e9ecef); border-radius: var(--spectrum-sys-shape-corner-large, 8px);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-surface, #fff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); box-shadow: var(--spectrum-sys-elevation-2, 0 2px 4px rgba(0,0,0,0.1));">
          <h3 style="margin: 0 0 var(--spectrum-sys-spacing-small, 0.5rem) 0; color: var(--spectrum-sys-color-on-surface, #495057);">Sources Horizontal Scrolling Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant, #6c757d); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            This demo showcases <strong>10 numbered sources</strong> that scroll horizontally. Each source has an identifying number
            for easy reference. Test the horizontal scrolling behavior in the sources section.
          </p>
        </div>
        
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
        
        <div style="margin-top: var(--spectrum-sys-spacing, 1rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-primary-container, #e7f3ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-primary, #007bff);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container, #004085); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            <strong>💡 Demo Features:</strong><br>
            • Each source has a numbered identifier (1-10)<br>
            • Sources scroll horizontally when expanded<br>
            • Click on "Sources and related content" to expand<br>
            • Scroll through sources using mouse or touch<br>
            • Click any source to test the sourceClick event
          </p>
        </div>
      </div>
    </spectrum-theme>
  `,
};

// Source Citations with Chips Demo
export const SourceCitationsWithChips: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    messages: `[
      {
        "message": "Tell me about the effects of climate change on polar ice caps",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "message": "Climate change is causing dramatic effects on polar ice caps. Arctic sea ice is declining at a rate of 13% per decade<sup>1</sup>, while Antarctic ice sheets are losing mass at an accelerating pace<cite>2</cite>. The Greenland ice sheet has lost approximately 280 billion tons of ice annually since 2002<sup>3</sup>, contributing to global sea level rise of about 1.5mm per year<cite>4</cite>. Polar bears and other Arctic wildlife are facing habitat loss as their ice platforms disappear<sup>5</sup>.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "NASA Climate Change and Global Warming",
            "value": "https://climate.nasa.gov/effects/",
            "snippet": "Official NASA data on Arctic sea ice decline rates and climate change impacts on polar regions.",
            "number": "1"
          },
          {
            "label": "IPCC Climate Change 2023 Report",
            "value": "https://www.ipcc.ch/report/ar6/wg1/",
            "snippet": "Comprehensive assessment of Antarctic ice sheet mass loss and contribution to sea level rise.",
            "number": "2"
          },
          {
            "label": "GRACE Satellite Data - Greenland Ice Loss",
            "value": "https://grace.jpl.nasa.gov/resources/30/greenland-ice-loss/",
            "snippet": "Satellite measurements showing Greenland ice sheet mass loss from 2002 to present.",
            "number": "3"
          },
          {
            "label": "NOAA Sea Level Trends",
            "value": "https://tidesandcurrents.noaa.gov/sltrends/",
            "snippet": "Historical and current sea level rise data from NOAA tide gauge stations worldwide.",
            "number": "4"
          },
          {
            "label": "WWF Arctic Wildlife Conservation",
            "value": "https://www.worldwildlife.org/places/arctic",
            "snippet": "Impact of sea ice loss on polar bear populations and Arctic ecosystem conservation efforts.",
            "number": "5"
          }
        ],
        "explorations": [
          {
            "label": "What are the tipping points for polar ice sheet collapse?",
            "value": "What are the tipping points for polar ice sheet collapse?"
          },
          {
            "label": "How do melting ice caps affect ocean currents?",
            "value": "How do melting ice caps affect ocean currents?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Climate Change and Polar Ice - Source Citations Demo',
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
    sources: `[]`,
    loading: false,
    sound: false,
    debug: false,
    background: 'opaque'
  },
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa); border: 1px solid var(--spectrum-sys-color-outline-variant, #e9ecef); border-radius: var(--spectrum-sys-shape-corner-large, 8px);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-surface, #fff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); box-shadow: var(--spectrum-sys-elevation-2, 0 2px 4px rgba(0,0,0,0.1));">
          <h3 style="margin: 0 0 var(--spectrum-sys-spacing-small, 0.5rem) 0; color: var(--spectrum-sys-color-on-surface, #495057);">Source Citations with Chips Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant, #6c757d); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            This demo shows <strong>inline source citations</strong> using both <code>&lt;sup&gt;</code> and <code>&lt;cite&gt;</code> tags that are automatically converted to 
            <strong>extra-small spectrum-chip</strong> components. Hover over chips on desktop or tap on mobile to see source details.
          </p>
        </div>
        
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${args.debug}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
        
        <div style="margin-top: var(--spectrum-sys-spacing, 1rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-primary-container, #e7f3ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-primary, #007bff);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container, #004085); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            <strong>💡 New Features:</strong><br>
            • <code>&lt;sup&gt;1&lt;/sup&gt;</code> and <code>&lt;cite&gt;2&lt;/cite&gt;</code> tags automatically become extra-small chips<br>
            • <strong>Desktop:</strong> Hover over chips to see source details<br>
            • <strong>Mobile:</strong> Tap chips to see source card slide up from bottom<br>
            • Chips show corresponding source information from the sources array<br>
            • Click chips to emit sourceClick events with message context
          </p>
        </div>
      </div>
    </spectrum-theme>
  `,
};

// Citation Hover Scroll Bug Test
export const CitationHoverScrollTest: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    messages: `[
      {
        "message": "Can you explain quantum entanglement and its applications?",
        "sender": "request",
        "timestamp": "2024-03-20T09:00:00Z"
      },
      {
        "message": "Quantum entanglement is a phenomenon where two particles become connected in such a way that measuring one instantly affects the other<sup>1</sup>. This occurs regardless of distance<cite>2</cite>. Applications include quantum computing<sup>3</sup>, quantum cryptography<cite>4</cite>, and quantum teleportation<sup>5</sup>.",
        "sender": "response",
        "timestamp": "2024-03-20T09:00:05Z",
        "sources": [
          {
            "label": "Nature Physics - Quantum Entanglement Review",
            "value": "https://www.nature.com/articles/nphys1338",
            "snippet": "Comprehensive review of quantum entanglement phenomena and theoretical foundations.",
            "number": "1"
          },
          {
            "label": "Einstein-Podolsky-Rosen Paradox",
            "value": "https://journals.aps.org/pr/abstract/10.1103/PhysRev.47.777",
            "snippet": "Original paper describing the EPR paradox and quantum non-locality.",
            "number": "2"
          },
          {
            "label": "IBM Quantum Computing Research",
            "value": "https://research.ibm.com/quantum-computing",
            "snippet": "Latest developments in quantum computing using entangled qubits.",
            "number": "3"
          },
          {
            "label": "Quantum Cryptography Protocols",
            "value": "https://arxiv.org/abs/quant-ph/0101098",
            "snippet": "Secure communication protocols based on quantum key distribution.",
            "number": "4"
          },
          {
            "label": "Quantum Teleportation Experiments",
            "value": "https://www.science.org/doi/10.1126/science.1253512",
            "snippet": "Experimental demonstrations of quantum state teleportation.",
            "number": "5"
          }
        ]
      },
      {
        "message": "What are the practical challenges in quantum communication?",
        "sender": "request",
        "timestamp": "2024-03-20T09:01:00Z"
      },
      {
        "message": "Quantum communication faces several challenges: decoherence limits transmission distance<sup>1</sup>, quantum states are fragile and easily disturbed<cite>2</cite>, current technology requires extremely low temperatures<sup>3</sup>, error rates increase with distance<cite>4</cite>, and scaling to large networks is complex<sup>5</sup>. Despite these challenges, progress is being made<cite>6</cite>.",
        "sender": "response",
        "timestamp": "2024-03-20T09:01:15Z",
        "sources": [
          {
            "label": "Quantum Decoherence Studies",
            "value": "https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.75.715",
            "snippet": "Analysis of decoherence effects in quantum information systems.",
            "number": "1"
          },
          {
            "label": "Quantum State Fragility Research",
            "value": "https://www.nature.com/articles/ncomms5732",
            "snippet": "Environmental effects on quantum state preservation.",
            "number": "2"
          },
          {
            "label": "Cryogenic Quantum Systems",
            "value": "https://aip.scitation.org/doi/10.1063/1.4905356",
            "snippet": "Temperature requirements for quantum coherence maintenance.",
            "number": "3"
          },
          {
            "label": "Quantum Error Rate Analysis",
            "value": "https://arxiv.org/abs/1809.10704",
            "snippet": "Distance-dependent error rates in quantum communication channels.",
            "number": "4"
          },
          {
            "label": "Quantum Network Scaling",
            "value": "https://www.nature.com/articles/s41566-018-0257-6",
            "snippet": "Challenges in building large-scale quantum networks.",
            "number": "5"
          },
          {
            "label": "Recent Quantum Communication Advances",
            "value": "https://science.sciencemag.org/content/372/6539/eabb2998",
            "snippet": "Latest breakthroughs in quantum communication technology.",
            "number": "6"
          }
        ],
        "explorations": [
          {
            "label": "How do quantum repeaters work?",
            "value": "How do quantum repeaters extend quantum communication range?"
          }
        ]
      },
      {
        "message": "Tell me about quantum internet prospects",
        "sender": "request",
        "timestamp": "2024-03-20T09:02:00Z"
      },
      {
        "message": "The quantum internet represents the future of secure communication<sup>1</sup>. China has demonstrated quantum satellite communication<cite>2</cite>, Europe is building quantum infrastructure<sup>3</sup>, and the US is investing heavily in research<cite>4</cite>. Applications include unhackable communications<sup>5</sup>, distributed quantum computing<cite>6</cite>, and quantum sensor networks<sup>7</sup>.",
        "sender": "response",
        "timestamp": "2024-03-20T09:02:25Z",
        "sources": [
          {
            "label": "Quantum Internet Vision Paper",
            "value": "https://www.nature.com/articles/s41586-018-0200-5",
            "snippet": "Roadmap for developing a global quantum internet.",
            "number": "1"
          },
          {
            "label": "China Quantum Satellite Program",
            "value": "https://www.nature.com/articles/nature23675",
            "snippet": "Micius quantum satellite achievements and capabilities.",
            "number": "2"
          },
          {
            "label": "European Quantum Flagship",
            "value": "https://qt.eu/",
            "snippet": "EU's billion-euro quantum technology initiative.",
            "number": "3"
          },
          {
            "label": "US National Quantum Initiative",
            "value": "https://www.quantum.gov/",
            "snippet": "American strategy for quantum information science leadership.",
            "number": "4"
          },
          {
            "label": "Quantum Cryptography Security",
            "value": "https://arxiv.org/abs/1402.1385",
            "snippet": "Information-theoretic security of quantum communication.",
            "number": "5"
          },
          {
            "label": "Distributed Quantum Computing",
            "value": "https://www.nature.com/articles/s41534-019-0146-y",
            "snippet": "Networked quantum processors for enhanced computation.",
            "number": "6"
          },
          {
            "label": "Quantum Sensor Networks",
            "value": "https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.89.035002",
            "snippet": "Quantum-enhanced sensing and metrology networks.",
            "number": "7"
          }
        ]
      },
      {
        "message": "What about quantum computing hardware requirements?",
        "sender": "request",
        "timestamp": "2024-03-20T09:03:00Z"
      },
      {
        "message": "Quantum computers require extreme conditions: superconducting qubits need temperatures near absolute zero<sup>1</sup>, trapped ions require ultra-high vacuum<cite>2</cite>, photonic systems need precise lasers<sup>3</sup>, and all systems require extensive error correction<cite>4</cite>. The infrastructure is complex<sup>5</sup> but progress continues<cite>6</cite>.",
        "sender": "response",
        "timestamp": "2024-03-20T09:03:20Z",
        "sources": [
          {
            "label": "Superconducting Qubit Physics",
            "value": "https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.73.357",
            "snippet": "Physics of superconducting circuits for quantum computing.",
            "number": "1"
          },
          {
            "label": "Trapped Ion Quantum Computing",
            "value": "https://www.nature.com/articles/nphys1453",
            "snippet": "Ion trap systems for quantum information processing.",
            "number": "2"
          },
          {
            "label": "Photonic Quantum Computing",
            "value": "https://www.nature.com/articles/nphoton.2017.95",
            "snippet": "Light-based quantum computing architectures.",
            "number": "3"
          },
          {
            "label": "Quantum Error Correction",
            "value": "https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.87.307",
            "snippet": "Methods for correcting quantum computation errors.",
            "number": "4"
          },
          {
            "label": "Quantum Computing Infrastructure",
            "value": "https://ieeexplore.ieee.org/document/8586887",
            "snippet": "Engineering challenges in quantum computer systems.",
            "number": "5"
          },
          {
            "label": "Quantum Hardware Progress",
            "value": "https://www.nature.com/articles/s41586-019-1666-5",
            "snippet": "Recent advances in quantum processor development.",
            "number": "6"
          }
        ]
      }
    ]`,
    conversationtitle: 'Quantum Technologies - Citation Hover Test',
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
    sources: `[]`,
    loading: false,
    sound: false,
    debug: true,
    background: 'partial-frost'
  },
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa); border: 1px solid var(--spectrum-sys-color-outline-variant, #e9ecef); border-radius: var(--spectrum-sys-shape-corner-large, 8px);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-warning-container, #fff3cd); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-warning, #ffc107);">
          <h3 style="margin: 0 0 var(--spectrum-sys-spacing-small, 0.5rem) 0; color: var(--spectrum-sys-color-on-warning-container, #856404);">🐛 Citation Hover Scroll Bug Test</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-warning-container, #856404); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            <strong>Test the scroll behavior fix:</strong><br>
            • Scroll down in the conversation panel<br>
            • <strong>Hover over citation chips</strong> (like <code>¹</code> and <code>²</code>) in the messages<br>
            • <strong>Verify that hovering does NOT cause unwanted scrolling</strong><br>
            • The panel should maintain its scroll position during hover events<br>
            • Debug mode is enabled to show detailed logging in browser console
          </p>
        </div>
        
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${args.debug}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
        
        <div style="margin-top: var(--spectrum-sys-spacing, 1rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-info-container, #d1ecf1); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-info, #bee5eb);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-info-container, #0c5460); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            <strong>🔧 Bug Fix Details:</strong><br>
            • <strong>Before:</strong> Hovering citations triggered <code>componentDidUpdate()</code> → <code>scrollToLatest()</code><br>
            • <strong>After:</strong> <code>componentDidUpdate()</code> only scrolls when messages change or loading state changes<br>
            • <strong>Fix:</strong> Added tracking for <code>messageCount</code> and <code>loadingState</code> to prevent unnecessary scrolling<br>
            • <strong>Expected:</strong> Citations hover smoothly without affecting scroll position<br>
            • Both <code>&lt;sup&gt;</code> and <code>&lt;cite&gt;</code> tags are converted to chips
          </p>
        </div>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Test story for verifying the citation hover scroll bug fix. Hover over citation chips and verify the scroll position remains stable.',
      },
    },
  },
};

// Sound Support Demo
export const SoundSupport: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    messages: `[
      {
        "message": "Tell me about artificial intelligence",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "message": "Artificial Intelligence (AI) is a branch of computer science that aims to create machines capable of intelligent behavior. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "explorations": [
          {
            "label": "What are the different types of AI?",
            "value": "What are the different types of AI?"
          },
          {
            "label": "How is machine learning related to AI?",
            "value": "How is machine learning related to AI?"
          }
        ]
      }
    ]`,
    conversationtitle: 'AI Sound Demo - Enable Loading',
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
    sources: `[]`,
    loading: false,
    sound: true,
    debug: false,
    background: 'full-frost'
  },
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa); border: 1px solid var(--spectrum-sys-color-outline-variant, #e9ecef); border-radius: var(--spectrum-sys-shape-corner-large, 8px);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-surface, #fff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); box-shadow: var(--spectrum-sys-elevation-2, 0 2px 4px rgba(0,0,0,0.1));">
          <h3 style="margin: 0 0 var(--spectrum-sys-spacing-small, 0.5rem) 0; color: var(--spectrum-sys-color-on-surface, #495057);">Sound Support Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant, #6c757d); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            This demo shows the <strong>sound support</strong> for the conversation panel. 
            Enable the <strong>loading</strong> control to hear the waiting sound loop. 
            When sound is enabled, <strong>all buttons and chips</strong> will also play sounds when clicked.
            Make sure your volume is on and sound is enabled!
          </p>
        </div>
        
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${args.debug}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
        
        <div style="margin-top: var(--spectrum-sys-spacing, 1rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-success-container, #d4edda); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-success, #28a745);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-success-container, #155724); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem);">
            <strong>🔊 Sound Features:</strong><br>
            • <strong>Enable "sound" control:</strong> Turns on audio support<br>
            • <strong>Enable "loading" control:</strong> Plays waiting.mp3 in a loop<br>
            • <strong>Click action buttons:</strong> Play button.mp3 sounds<br>
            • <strong>Click "Dive Deeper" chip:</strong> Plays chip.mp3 sound<br>
            • <strong>Disable "loading":</strong> Stops the audio<br>
            • All interactive elements inherit the panel's sound setting<br>
            • Proper cleanup when component unmounts
          </p>
        </div>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates sound support with looping waiting.mp3 during loading state. Enable both sound and loading controls to test the audio functionality.',
      },
    },
  },
};

// Grouped Citations Demo
export const GroupedCitations: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    messages: `[
      {
        "id": "msg-001",
        "message": "What are the major benefits of renewable energy?",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-002",
        "message": "Renewable energy offers numerous benefits including environmental protection<sup>1</sup><sup>2</sup><sup>3</sup>, economic advantages<cite>4</cite>, and energy security<sup>5</sup>. The technology has advanced rapidly<cite>6</cite><cite>7</cite><cite>8</cite> in recent years, making it increasingly cost-effective<sup>9</sup>. Studies show that wind and solar power<sup>10</sup><sup>11</sup> are now the cheapest sources of electricity in many regions.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "EPA Environmental Benefits of Renewable Energy",
            "value": "https://www.epa.gov/renewable-energy-benefits",
            "snippet": "Renewable energy reduces greenhouse gas emissions and air pollution, improving public health and environmental quality.",
            "number": "1"
          },
          {
            "label": "IPCC Climate Change and Renewable Energy Report",
            "value": "https://www.ipcc.ch/report/renewable-energy-sources",
            "snippet": "Comprehensive analysis of renewable energy's role in climate change mitigation and sustainable development.",
            "number": "2"
          },
          {
            "label": "Nature Climate Change: Renewable Energy Impact",
            "value": "https://www.nature.com/articles/nclimate3463",
            "snippet": "Peer-reviewed research on the environmental impacts and benefits of renewable energy technologies.",
            "number": "3"
          },
          {
            "label": "International Economic Benefits of Renewables",
            "value": "https://www.irena.org/publications/2019/Jan/Global-energy-transformation",
            "snippet": "Economic analysis showing job creation, GDP growth, and cost savings from renewable energy transition.",
            "number": "4"
          },
          {
            "label": "Energy Security and Independence Report",
            "value": "https://www.iea.org/reports/energy-security",
            "snippet": "How renewable energy enhances national energy security and reduces dependence on fossil fuel imports.",
            "number": "5"
          },
          {
            "label": "Renewable Energy Technology Roadmap 2023",
            "value": "https://www.irena.org/publications/2023/technology-roadmap",
            "snippet": "Latest technological advances in solar, wind, hydro, and other renewable energy systems.",
            "number": "6"
          },
          {
            "label": "Solar Energy Innovation Report",
            "value": "https://www.nrel.gov/docs/solar-innovations",
            "snippet": "National Renewable Energy Laboratory's comprehensive report on solar technology breakthroughs.",
            "number": "7"
          },
          {
            "label": "Wind Power Technological Progress",
            "value": "https://www.windpower.org/tech-progress-2023",
            "snippet": "Analysis of recent improvements in wind turbine efficiency and capacity factors.",
            "number": "8"
          },
          {
            "label": "LCOE Analysis: Renewable vs Fossil Fuels",
            "value": "https://www.lazard.com/insights/levelized-cost-of-energy",
            "snippet": "Comprehensive cost analysis showing renewable energy is now the lowest-cost option in most markets.",
            "number": "9"
          },
          {
            "label": "Global Wind Energy Council Report",
            "value": "https://gwec.net/global-wind-report-2023",
            "snippet": "Statistics and analysis of global wind energy capacity, growth, and market trends.",
            "number": "10"
          },
          {
            "label": "Solar Power Europe Market Report",
            "value": "https://www.solarpowereurope.org/market-report-2023",
            "snippet": "European solar market analysis including cost trends, capacity additions, and policy impacts.",
            "number": "11"
          }
        ],
        "explorations": [
          {
            "label": "What are the main challenges facing renewable energy adoption?",
            "value": "What are the main challenges facing renewable energy adoption?"
          },
          {
            "label": "How do storage technologies support renewable energy?",
            "value": "How do storage technologies support renewable energy?"
          },
          {
            "label": "What policies best support renewable energy development?",
            "value": "What policies best support renewable energy development?"
          }
        ]
      },
      {
        "id": "msg-003",
        "message": "Can you explain the different types of renewable energy sources?",
        "sender": "request",
        "timestamp": "2024-03-20T10:01:00Z"
      },
      {
        "id": "msg-004",
        "message": "There are several major types of renewable energy sources:<br><br><strong>Solar Energy</strong>: Photovoltaic panels<sup>1</sup> and thermal systems<sup>2</sup> harness sunlight. <strong>Wind Energy</strong>: Onshore<cite>3</cite> and offshore<cite>4</cite><cite>5</cite> wind turbines generate electricity. <strong>Hydropower</strong>: Traditional dams<sup>6</sup> and run-of-river systems<sup>7</sup><sup>8</sup> use flowing water. <strong>Geothermal</strong>: Underground heat<cite>9</cite> powers turbines. <strong>Biomass</strong>: Organic materials<sup>10</sup> provide fuel and energy.<br><br><strong>Key advantages by technology type:</strong><ul><li>Solar panels are cost-effective<sup>11</sup><sup>12</sup> and have minimal maintenance requirements<cite>13</cite></li><li>Wind turbines offer excellent scalability<cite>14</cite><cite>15</cite><cite>16</cite> for both small and large installations</li><li>Hydroelectric systems provide reliable baseload power<sup>17</sup> with long operational lifespans<sup>18</sup><sup>19</sup></li><li>Geothermal energy delivers consistent output<cite>20</cite> regardless of weather conditions</li><li>Biomass technology enables carbon-neutral energy production<sup>21</sup><sup>22</sup> from waste materials<cite>23</cite></li></ul>",
        "sender": "response",
        "timestamp": "2024-03-20T10:01:15Z",
        "sources": [
          {
            "label": "Solar Photovoltaic Technology Guide",
            "value": "https://www.nrel.gov/pv/",
            "snippet": "Comprehensive guide to photovoltaic technology, efficiency improvements, and installation best practices.",
            "number": "1"
          },
          {
            "label": "Solar Thermal Energy Systems",
            "value": "https://www.energy.gov/eere/solar/solar-thermal-energy",
            "snippet": "Overview of concentrating solar power and solar heating technologies for residential and industrial use.",
            "number": "2"
          },
          {
            "label": "Onshore Wind Energy Development",
            "value": "https://www.energy.gov/eere/wind/onshore-wind",
            "snippet": "Land-based wind energy systems, from small residential turbines to large utility-scale wind farms.",
            "number": "3"
          },
          {
            "label": "Offshore Wind Technology",
            "value": "https://www.offshore-energy.biz/wind",
            "snippet": "Ocean-based wind energy systems with higher capacity factors and stronger, more consistent winds.",
            "number": "4"
          },
          {
            "label": "Floating Offshore Wind Platforms",
            "value": "https://www.floating-offshore-wind.com/",
            "snippet": "Advanced floating wind turbine platforms that enable wind energy in deeper waters.",
            "number": "5"
          },
          {
            "label": "Hydroelectric Power Systems",
            "value": "https://www.energy.gov/eere/water/hydroelectric-power",
            "snippet": "Traditional dam-based hydroelectric generation, including pumped storage and environmental considerations.",
            "number": "6"
          },
          {
            "label": "Run-of-River Hydropower",
            "value": "https://www.hydroworld.com/run-of-river",
            "snippet": "Small-scale hydropower systems that don't require large dams, minimizing environmental impact.",
            "number": "7"
          },
          {
            "label": "Micro-Hydro Energy Systems",
            "value": "https://www.micro-hydro-power.com/",
            "snippet": "Small-scale hydroelectric systems for rural communities and distributed energy generation.",
            "number": "8"
          },
          {
            "label": "Geothermal Energy Association",
            "value": "https://www.geothermal.org/",
            "snippet": "Geothermal power generation from underground heat sources, including enhanced geothermal systems.",
            "number": "9"
          },
          {
            "label": "Biomass Energy Production",
            "value": "https://www.energy.gov/eere/bioenergy/biomass-basics",
            "snippet": "Converting organic materials like wood, agricultural waste, and dedicated energy crops into electricity and fuel.",
            "number": "10"
          },
          {
            "label": "Solar Panel Cost Analysis 2024",
            "value": "https://www.solar.com/learn/solar-panel-cost/",
            "snippet": "Comprehensive analysis of solar panel costs, showing dramatic price reductions and improved cost-effectiveness.",
            "number": "11"
          },
          {
            "label": "IRENA Solar Cost Trends Report",
            "value": "https://www.irena.org/costs/solar",
            "snippet": "International renewable energy analysis of solar technology cost trends and market competitiveness.",
            "number": "12"
          },
          {
            "label": "Solar Maintenance Requirements Study",
            "value": "https://www.nrel.gov/docs/solar-maintenance",
            "snippet": "Research on solar panel maintenance needs, showing minimal requirements for optimal performance.",
            "number": "13"
          },
          {
            "label": "Wind Energy Scalability Report",
            "value": "https://www.energy.gov/eere/wind/wind-energy-scalability",
            "snippet": "Analysis of wind energy scalability from residential to utility-scale applications.",
            "number": "14"
          },
          {
            "label": "Distributed Wind Energy Systems",
            "value": "https://www.distributedwind.org/",
            "snippet": "Small-scale wind turbine systems for residential and commercial applications.",
            "number": "15"
          },
          {
            "label": "Utility-Scale Wind Development",
            "value": "https://www.windpowerengineering.com/utility-scale/",
            "snippet": "Large-scale wind farm development, installation, and grid integration strategies.",
            "number": "16"
          },
          {
            "label": "Hydroelectric Baseload Power Study",
            "value": "https://www.hydro.org/baseload-power",
            "snippet": "Research on hydroelectric power's role in providing reliable, consistent baseload electricity generation.",
            "number": "17"
          },
          {
            "label": "Hydropower Infrastructure Longevity",
            "value": "https://www.usbr.gov/power/data/longevity.html",
            "snippet": "US Bureau of Reclamation data on hydroelectric facility operational lifespans and longevity.",
            "number": "18"
          },
          {
            "label": "Dam Lifespan and Maintenance Analysis",
            "value": "https://www.icold-cigb.org/dam-lifespan",
            "snippet": "International Commission on Large Dams analysis of hydroelectric infrastructure longevity.",
            "number": "19"
          },
          {
            "label": "Geothermal Consistent Output Analysis",
            "value": "https://www.geothermal-energy.org/consistent-output",
            "snippet": "Analysis of geothermal energy's ability to provide consistent power output regardless of weather.",
            "number": "20"
          },
          {
            "label": "Biomass Carbon Neutrality Research",
            "value": "https://www.biomassmagazine.com/articles/carbon-neutral",
            "snippet": "Research on biomass energy's carbon-neutral potential and lifecycle carbon analysis.",
            "number": "21"
          },
          {
            "label": "Sustainable Biomass Production Methods",
            "value": "https://www.sustainablebiomass.org/production-methods",
            "snippet": "Sustainable methods for biomass production and energy conversion with minimal environmental impact.",
            "number": "22"
          },
          {
            "label": "Waste-to-Energy Biomass Systems",
            "value": "https://www.energy.gov/eere/bioenergy/waste-to-energy",
            "snippet": "Converting agricultural and organic waste materials into clean, renewable energy sources.",
            "number": "23"
          }
        ]
      }
    ]`,
    conversationtitle: 'Grouped Citations Demo',
    actions: `[
      {
        "label": "Share",
        "icon": "share",
        "value": "share"
      },
      {
        "label": "Copy",
        "icon": "content_copy",
        "value": "copy"
      }
    ]`,
    sources: `[]`,
    loading: false,
    sound: false,
    debug: true,
    background: 'full-frost'
  },
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa); border: 1px solid var(--spectrum-sys-color-outline-variant, #e9ecef); border-radius: var(--spectrum-sys-shape-corner-large, 8px);">
        <div style="margin-bottom: 1rem; padding: 1.5rem; background: linear-gradient(135deg, var(--spectrum-sys-color-primary, #667eea) 0%, var(--spectrum-sys-color-secondary, #764ba2) 100%); color: var(--spectrum-sys-color-on-primary, white); border-radius: var(--spectrum-sys-shape-corner-large, 8px); box-shadow: var(--spectrum-sys-elevation-2, 0 4px 6px rgba(0,0,0,0.1));">
          <h3 style="margin: 0 0 var(--spectrum-sys-spacing-small, 0.75rem) 0; font-size: var(--spectrum-sys-typescale-headline-small-size, 1.25rem); font-weight: var(--spectrum-sys-typescale-headline-small-weight, 600);">🔗 Grouped Citations Demo</h3>
          <p style="margin: 0; opacity: 0.95; font-size: var(--spectrum-sys-typescale-body-small-size, 0.9rem); line-height: 1.5;">
            <strong>This demonstrates the new grouped citation functionality:</strong><br>
            • <strong>Adjacent citations</strong> (like <sup>1</sup><sup>2</sup><sup>3</sup>) are automatically grouped into chips showing "3 citations"<br>
            • <strong>Single citations</strong> continue to show the source title as before<br>
            • <strong>List items with citations</strong> work seamlessly with grouped citations<br>
            • <strong>Hover over grouped chips</strong> to see individual cards for each citation<br>
            • <strong>Mixed citation styles</strong> are supported: &lt;sup&gt; and &lt;cite&gt; tags both work<br>
            • Debug mode is enabled for detailed console logging
          </p>
        </div>
        
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${args.debug}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
        
        <div style="margin-top: var(--spectrum-sys-spacing, 1rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-success-container, #e8f5e8); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-success, #28a745);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-success-container, #0d5016); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem); line-height: 1.5;">
            <strong>✅ Citation Grouping Rules:</strong><br>
            • <strong>Adjacent Check:</strong> Citations are grouped if separated only by whitespace, punctuation, or ≤3 characters<br>
            • <strong>Single Citations:</strong> Show the source title (e.g., "EPA Environmental Benefits")<br>
            • <strong>Grouped Citations:</strong> Show count (e.g., "3 citations") with stacked hover cards<br>
            • <strong>Both Tag Types:</strong> &lt;sup&gt;1&lt;/sup&gt; and &lt;cite&gt;4&lt;/cite&gt; are processed identically<br>
            • <strong>Mobile Support:</strong> Grouped citations work with mobile source cards<br>
            • <strong>Event Emission:</strong> All citations emit the same sourceClick events
          </p>
        </div>
        
        <div style="margin-top: var(--spectrum-sys-spacing-small, 0.5rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-warning-container, #fff3cd); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-warning, #ffc107);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-warning-container, #856404); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem); line-height: 1.5;">
            <strong>🧪 Test Cases in this Demo:</strong><br>
            • <strong>Message 1:</strong> &lt;sup&gt;1&lt;/sup&gt;&lt;sup&gt;2&lt;/sup&gt;&lt;sup&gt;3&lt;/sup&gt; → "3 citations" group<br>
            • <strong>Message 1:</strong> &lt;cite&gt;4&lt;/cite&gt; → single citation showing source title<br>
            • <strong>Message 1:</strong> &lt;cite&gt;6&lt;/cite&gt;&lt;cite&gt;7&lt;/cite&gt;&lt;cite&gt;8&lt;/cite&gt; → "3 citations" group<br>
            • <strong>Message 1:</strong> &lt;sup&gt;10&lt;/sup&gt;&lt;sup&gt;11&lt;/sup&gt; → "2 citations" group<br>
            • <strong>Message 2:</strong> Mixed single and grouped citations throughout the text<br>
            • <strong>List Items:</strong> &lt;sup&gt;11&lt;/sup&gt;&lt;sup&gt;12&lt;/sup&gt; → "2 citations" group in list<br>
            • <strong>List Items:</strong> &lt;cite&gt;14&lt;/cite&gt;&lt;cite&gt;15&lt;/cite&gt;&lt;cite&gt;16&lt;/cite&gt; → "3 citations" group in list<br>
            • <strong>List Items:</strong> &lt;sup&gt;18&lt;/sup&gt;&lt;sup&gt;19&lt;/sup&gt; → "2 citations" group in list<br>
            • <strong>List Items:</strong> &lt;sup&gt;21&lt;/sup&gt;&lt;sup&gt;22&lt;/sup&gt; → "2 citations" group in list
          </p>
        </div>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: `
          Demonstrates the new grouped citation functionality where adjacent citations are automatically grouped together in both regular text and list items.
          
          ## Key Features Demonstrated:
          
          ### Automatic Grouping
          - Citations like \`<sup>1</sup><sup>2</sup><sup>3</sup>\` become a single chip showing "3 citations"
          - Works with both \`<sup>\` and \`<cite>\` tags
          - Groups citations separated by whitespace, punctuation, or ≤3 characters
          - **List item support**: Citations within bullet points are grouped the same way as in regular text
          
          ### Content Types Supported
          - **Regular text**: Standard paragraph text with grouped citations
          - **List items**: Bullet point lists with both single and grouped citations
          - **Mixed content**: Both text and lists can contain citations in the same message
          
          ### Hover Behavior
          - **Single citations**: Show individual source card with title, URL, and snippet
          - **Grouped citations**: Show stacked cards for each citation in the group
          - Each card in a group can be clicked individually
          - **Works in lists**: Same hover behavior applies to citations within list items
          
          ### Responsive Design
          - Desktop: Hover overlay with multiple cards for groups
          - Mobile: Tap to open full-screen source card (shows first source in group)
          
          ### Event Handling
          - All citations emit \`sourceClick\` events with full source data
          - Events include \`messageId\` for tracking which message the citation came from
          - Maintains backward compatibility with existing citation handling
          
          ## Test the Functionality:
          1. **Hover over grouped citations** (showing "X citations") to see multiple cards
          2. **Hover over single citations** to see individual source cards  
          3. **Test list item citations** - they work identically to text citations
          4. **Click any citation** to emit sourceClick events (check Actions panel)
          5. **Test on mobile** by resizing browser window below 768px width
        `,
      },
    },
  },
};

// Nine Citations Grid Test
export const NineCitationsGrid: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    messages: `[
      {
        "id": "msg-001",
        "message": "Can you explain how renewable energy has evolved over the past decade?",
        "sender": "request",
        "timestamp": "2024-03-20T09:55:00Z"
      },
      {
        "id": "msg-002",
        "message": "Renewable energy has undergone remarkable transformation over the past decade. The most significant changes include dramatic cost reductions, with solar and wind power becoming the cheapest sources of electricity in most regions. Technology improvements have increased efficiency rates across all renewable sources, while energy storage solutions have addressed intermittency challenges. Government policies and corporate commitments have accelerated adoption globally.",
        "sender": "response",
        "timestamp": "2024-03-20T09:55:15Z"
      },
      {
        "id": "msg-003",
        "message": "What role does energy storage play in renewable energy systems?",
        "sender": "request",
        "timestamp": "2024-03-20T09:56:00Z"
      },
      {
        "id": "msg-004",
        "message": "Energy storage is crucial for renewable energy systems because it addresses the intermittency challenge of solar and wind power. Battery technologies, particularly lithium-ion systems, have seen dramatic cost reductions and performance improvements. Grid-scale storage installations are now economically viable and help stabilize electricity supply. Other storage technologies like pumped hydro, compressed air, and emerging solutions like hydrogen storage are also contributing to a more flexible and reliable renewable energy grid.",
        "sender": "response",
        "timestamp": "2024-03-20T09:56:20Z"
      },
      {
        "id": "msg-005",
        "message": "How do government policies impact renewable energy adoption?",
        "sender": "request",
        "timestamp": "2024-03-20T09:57:00Z"
      },
      {
        "id": "msg-006",
        "message": "Government policies play a pivotal role in renewable energy adoption through various mechanisms. Tax incentives and subsidies make renewable projects more financially attractive to investors and developers. Renewable portfolio standards require utilities to source a certain percentage of electricity from clean sources. Net metering policies allow homeowners with solar panels to sell excess electricity back to the grid. International agreements like the Paris Climate Accord create policy frameworks that drive national renewable energy targets and investments.",
        "sender": "response",
        "timestamp": "2024-03-20T09:57:25Z"
      },
      {
        "id": "msg-007",
        "message": "What are the main challenges still facing renewable energy deployment?",
        "sender": "request",
        "timestamp": "2024-03-20T09:58:00Z"
      },
      {
        "id": "msg-008",
        "message": "Despite significant progress, renewable energy deployment still faces several key challenges. Grid infrastructure needs substantial upgrades to handle distributed generation and variable power sources. Intermittency remains a technical challenge, requiring advanced forecasting and storage solutions. Supply chain constraints and material shortages can impact project timelines and costs. Regulatory barriers and lengthy permitting processes can delay project development. Social acceptance and community engagement are also important factors, particularly for large-scale wind and solar installations.",
        "sender": "response",
        "timestamp": "2024-03-20T09:58:30Z"
      },
      {
        "id": "msg-009",
        "message": "What are the latest developments in renewable energy technology?",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-010",
        "message": "Recent renewable energy developments show remarkable progress across multiple technologies. The latest innovations include advanced solar panel efficiency<sup>1</sup><sup>2</sup><sup>3</sup><sup>4</sup><sup>5</sup><sup>6</sup><sup>7</sup><sup>8</sup><sup>9</sup> reaching new record levels, making solar power more cost-effective than ever before.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "Advanced Perovskite Solar Cell Technology",
            "value": "https://www.nature.com/articles/perovskite-solar-2024",
            "snippet": "Revolutionary perovskite-silicon tandem cells achieve 33.7% efficiency in laboratory conditions, pushing beyond traditional silicon limits.",
            "number": "1"
          },
          {
            "label": "Organic Photovoltaic Breakthrough",
            "value": "https://www.science.org/organic-pv-efficiency",
            "snippet": "Flexible organic solar cells reach 19% efficiency with improved stability and manufacturing scalability.",
            "number": "2"
          },
          {
            "label": "Concentrated Solar Power Innovations",
            "value": "https://www.nrel.gov/csp/molten-salt-storage",
            "snippet": "Next-generation molten salt storage systems enable 24-hour solar power generation with 95% efficiency retention.",
            "number": "3"
          },
          {
            "label": "Bifacial Solar Panel Advances",
            "value": "https://www.pv-magazine.com/bifacial-efficiency-2024",
            "snippet": "Bifacial solar panels now capture up to 30% more energy by utilizing both direct and reflected sunlight.",
            "number": "4"
          },
          {
            "label": "Floating Solar Farm Technology",
            "value": "https://www.reuters.com/floating-solar-innovations",
            "snippet": "Floating photovoltaic systems reduce water evaporation while achieving 10-15% higher efficiency due to cooling effects.",
            "number": "5"
          },
          {
            "label": "AI-Optimized Solar Tracking Systems",
            "value": "https://www.ieee.org/ai-solar-tracking-2024",
            "snippet": "Machine learning algorithms optimize solar panel positioning, increasing energy capture by 25% compared to fixed installations.",
            "number": "6"
          },
          {
            "label": "Quantum Dot Solar Technology",
            "value": "https://www.mit.edu/quantum-dot-solar-cells",
            "snippet": "Quantum dot enhancement layers promise to unlock near-theoretical efficiency limits in silicon solar cells.",
            "number": "7"
          },
          {
            "label": "Solar Panel Recycling Breakthrough",
            "value": "https://www.greentech.com/solar-recycling-2024",
            "snippet": "New recycling processes recover 95% of materials from end-of-life solar panels, solving long-term sustainability concerns.",
            "number": "8"
          },
          {
            "label": "Building-Integrated Photovoltaics",
            "value": "https://www.solar-today.com/bipv-innovations",
            "snippet": "Transparent solar cells and solar roof tiles integrate seamlessly into building design while generating clean energy.",
            "number": "9"
          }
        ],
        "explorations": [
          {
            "label": "How do these new solar technologies compare in terms of cost?",
            "value": "How do these new solar technologies compare in terms of cost?"
          },
          {
            "label": "What are the manufacturing challenges for these advanced solar cells?",
            "value": "What are the manufacturing challenges for these advanced solar cells?"
          },
          {
            "label": "When will these technologies become commercially available?",
            "value": "When will these technologies become commercially available?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Nine Citations Grid Test',
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
    sources: `[]`,
    loading: false,
    sound: false,
    debug: true,
    background: 'transparent'
  },
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa); border: 1px solid var(--spectrum-sys-color-outline-variant, #e9ecef); border-radius: var(--spectrum-sys-shape-corner-large, 8px);">
        <div style="margin-bottom: 1rem; padding: 1.5rem; background: linear-gradient(135deg, var(--spectrum-sys-color-primary, #667eea) 0%, var(--spectrum-sys-color-tertiary, #f093fb) 100%); color: var(--spectrum-sys-color-on-primary, white); border-radius: var(--spectrum-sys-shape-corner-large, 8px); box-shadow: var(--spectrum-sys-elevation-2, 0 4px 6px rgba(0,0,0,0.1));">
          <h3 style="margin: 0 0 var(--spectrum-sys-spacing-small, 0.75rem) 0; font-size: var(--spectrum-sys-typescale-headline-small-size, 1.25rem); font-weight: var(--spectrum-sys-typescale-headline-small-weight, 600);">🎯 Nine Citations Grid Test</h3>
                     <p style="margin: 0; opacity: 0.95; font-size: var(--spectrum-sys-typescale-body-small-size, 0.9rem); line-height: 1.5;">
             <strong>Testing the new 3x3 grid layout for grouped citations:</strong><br>
             • <strong>9 consecutive citations</strong> (&lt;sup&gt;1&lt;/sup&gt;&lt;sup&gt;2&lt;/sup&gt;...&lt;sup&gt;9&lt;/sup&gt;) in the final message<br>
             • <strong>Multiple messages</strong> above to test overflow positioning behavior<br>
             • <strong>3x3 grid layout</strong> with smart positioning to avoid viewport clipping<br>
             • <strong>Scroll down</strong> to see the grid appear above citations when space is limited<br>
             • <strong>Fixed card dimensions</strong> (280px width, 120px height) for consistent layout<br>
             • Debug mode enabled for detailed console logging
           </p>
        </div>
        
        <spectrum-conversation-panel
          .messages=${args.messages}
          .conversationtitle=${args.conversationtitle}
          .actions=${args.actions}
          .sources=${args.sources}
          .loading=${args.loading}
          .sound=${args.sound}
          .debug=${args.debug}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
        
        <div style="margin-top: var(--spectrum-sys-spacing, 1rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-primary-container, #e3f2fd); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-primary, #2196f3);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container, #0d47a1); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem); line-height: 1.5;">
            <strong>🎯 Grid Layout Features:</strong><br>
            • <strong>3x3 Maximum:</strong> Up to 9 cards arranged in a 3-column, 3-row grid<br>
            • <strong>Smart Positioning:</strong> Grid appears above citation if it would be clipped below<br>
            • <strong>Viewport Awareness:</strong> Horizontal position adjusts to stay within screen bounds<br>
            • <strong>Fixed Dimensions:</strong> Each card is exactly 280px × 120px for consistent layout<br>
            • <strong>Optimal Spacing:</strong> 8px gaps between cards for clean visual separation<br>
            • <strong>Hover Interaction:</strong> Individual cards still have hover effects within the grid
          </p>
        </div>
        
        <div style="margin-top: var(--spectrum-sys-spacing-small, 0.5rem); padding: var(--spectrum-sys-spacing, 1rem); background: var(--spectrum-sys-color-warning-container, #fff3cd); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border-left: 4px solid var(--spectrum-sys-color-warning, #ffc107);">
                     <p style="margin: 0; color: var(--spectrum-sys-color-on-warning-container, #856404); font-size: var(--spectrum-sys-typescale-body-small-size, 0.875rem); line-height: 1.5;">
             <strong>🧪 Test Instructions:</strong><br>
             1. <strong>Scroll down</strong> to the last message with 9 citations<br>
             2. <strong>Hover over the "9 citations" chip</strong> to see the 3x3 grid layout<br>
             3. <strong>Test overflow behavior:</strong> When near bottom, grid should appear above citation<br>
             4. <strong>Test normal positioning:</strong> Scroll up so citation has space below<br>
             5. <strong>Resize browser window</strong> to test viewport edge detection<br>
             6. <strong>Hover individual cards</strong> within the grid to test card-level interactions<br>
             7. <strong>Check console</strong> for debug information about grid calculations
           </p>
        </div>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: `
          Tests the new 3x3 grid layout functionality for grouped citations with 9 source cards.
          
          ## Grid Layout System
          
          ### Maximum Grid Size
          - **3x3 Grid**: Up to 9 citations can be displayed in a single grouped hover overlay
          - **Fixed Card Size**: Each card maintains 280px width × 120px height for consistency
          - **Optimal Spacing**: 8px gaps between cards provide clean visual separation
          
          ### Smart Positioning Algorithm
          - **Viewport Detection**: Calculates available space above and below the citation
          - **Anti-Clipping Logic**: Automatically positions grid above citation if it would be clipped below
          - **Horizontal Adjustment**: Shifts grid left if it would extend beyond right edge of viewport
          - **Responsive Behavior**: Adapts to different screen sizes and window dimensions
          
          ### Grid Calculation
          - **Dynamic Classes**: Grid receives classes like \`grid-3x3\`, \`position-above\`, etc.
          - **CSS Grid Layout**: Uses CSS Grid for optimal card arrangement and spacing
          - **Performance Optimized**: Efficient calculation of grid dimensions and positioning
          
          ### User Experience
          - **Visual Consistency**: All cards maintain uniform appearance regardless of grid size
          - **Hover Effects**: Individual cards still have elevation effects when hovered
          - **Accessibility**: Full keyboard navigation and screen reader support maintained
          - **Mobile Compatibility**: Falls back to mobile card behavior on small screens
          
          ## Testing Scenarios
          
          ### Positioning Tests
          1. **Bottom Clipping**: Scroll conversation so citation is near bottom - grid should appear above
          2. **Right Clipping**: Narrow browser window - grid should shift left to stay in viewport
          3. **Normal Position**: With adequate space, grid appears below citation as expected
          
          ### Grid Layout Tests
          1. **3x3 Layout**: Verify all 9 cards arrange in 3 columns and 3 rows
          2. **Card Consistency**: Check that all cards maintain 280px × 120px dimensions
          3. **Spacing Verification**: Confirm 8px gaps between all cards
          4. **Hover Interactions**: Test individual card hover effects within the grid
          
          ### Performance Tests
          1. **Smooth Positioning**: Grid should appear instantly without layout shifts
          2. **Hover Responsiveness**: Quick hover on/off should not cause flickering
          3. **Memory Efficiency**: No memory leaks from repeated grid calculations
          
          This test ensures the grid system works flawlessly with the maximum number of citations while maintaining optimal user experience across all device sizes and viewport configurations.
        `,
      },
    },
  },
};

// Background Levels Demo
export const BackgroundLevels: StoryObj<SpectrumConversationPanelArgs> = {
  name: 'Background Levels',
  args: {
    messages: `[
      {
        "id": "msg-001",
        "message": "What are the different background levels available?",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-002",
        "message": "The conversation panel now supports four background levels that match the image gallery approach: opaque (default), partial-frost, full-frost, and transparent. These provide different visual effects for various use cases.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "Background System Documentation",
            "value": "https://example.com/background-system",
            "snippet": "Complete guide to the four-level background system used across all panel components.",
            "number": 1
          }
        ],
        "explorations": [
          {
            "label": "When should I use each background level?",
            "value": "When should I use each background level?"
          },
          {
            "label": "How do frost effects work?",
            "value": "How do frost effects work?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Background Levels Demo',
    actions: `[
      {
        "label": "Share",
        "icon": "share",
        "value": "share"
      }
    ]`,
    sources: `[]`,
    loading: false,
    sound: false,
    debug: false,
    background: 'opaque'
  },
  render: (args) => html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
        <h2 style="color: white; margin-bottom: 2rem; text-align: center; font-size: 2rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          Background Levels Demo
        </h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; max-width: 1400px; margin: 0 auto;">
          
          <!-- Opaque Background -->
          <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
            <h3 style="color: white; margin-bottom: 1rem; font-size: 1.25rem;">Opaque (Default)</h3>
            <spectrum-conversation-panel
              .messages=${args.messages}
              .conversationtitle=${args.conversationtitle}
              .actions=${args.actions}
              .sources=${args.sources}
              .loading=${args.loading}
              .sound=${args.sound}
              .debug=${args.debug}
              .background=${'opaque'}
              @action=${(e: CustomEvent) => action('Action')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
              @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
              @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
              @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
            ></spectrum-conversation-panel>
            <p style="color: white; font-size: 0.875rem; margin-top: 1rem; opacity: 0.9;">
              <strong>Opaque:</strong> Solid background with no transparency. Best for main content areas.
            </p>
          </div>
          
          <!-- Partial Frost Background -->
          <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
            <h3 style="color: white; margin-bottom: 1rem; font-size: 1.25rem;">Partial Frost</h3>
            <spectrum-conversation-panel
              .messages=${args.messages}
              .conversationtitle=${args.conversationtitle}
              .actions=${args.actions}
              .sources=${args.sources}
              .loading=${args.loading}
              .sound=${args.sound}
              .debug=${args.debug}
              .background=${'partial-frost'}
              @action=${(e: CustomEvent) => action('Action')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
              @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
              @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
              @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
            ></spectrum-conversation-panel>
            <p style="color: white; font-size: 0.875rem; margin-top: 1rem; opacity: 0.9;">
              <strong>Partial Frost:</strong> 33% white tint with subtle blur. Good for overlay content.
            </p>
          </div>
          
          <!-- Full Frost Background -->
          <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
            <h3 style="color: white; margin-bottom: 1rem; font-size: 1.25rem;">Full Frost</h3>
            <spectrum-conversation-panel
              .messages=${args.messages}
              .conversationtitle=${args.conversationtitle}
              .actions=${args.actions}
              .sources=${args.sources}
              .loading=${args.loading}
              .sound=${args.sound}
              .debug=${args.debug}
              .background=${'full-frost'}
              @action=${(e: CustomEvent) => action('Action')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
              @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
              @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
              @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
            ></spectrum-conversation-panel>
            <p style="color: white; font-size: 0.875rem; margin-top: 1rem; opacity: 0.9;">
              <strong>Full Frost:</strong> 66% white tint with strong blur. Maximum glassmorphism effect.
            </p>
          </div>
          
          <!-- Transparent Background -->
          <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
            <h3 style="color: white; margin-bottom: 1rem; font-size: 1.25rem;">Transparent</h3>
            <spectrum-conversation-panel
              .messages=${args.messages}
              .conversationtitle=${args.conversationtitle}
              .actions=${args.actions}
              .sources=${args.sources}
              .loading=${args.loading}
              .sound=${args.sound}
              .debug=${args.debug}
              .background=${'transparent'}
              @action=${(e: CustomEvent) => action('Action')(e.detail)}
              @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
              @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
              @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
              @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
            ></spectrum-conversation-panel>
            <p style="color: white; font-size: 0.875rem; margin-top: 1rem; opacity: 0.9;">
              <strong>Transparent:</strong> No background, border, or shadow. Content floats over background.
            </p>
          </div>
          
        </div>
        
        <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); max-width: 800px; margin-left: auto; margin-right: auto;">
          <h3 style="color: white; margin-bottom: 1rem; font-size: 1.25rem;">Background Level Usage Guide</h3>
          <ul style="color: white; opacity: 0.9; line-height: 1.6;">
            <li><strong>Opaque:</strong> Main content areas, primary panels, default behavior</li>
            <li><strong>Partial Frost:</strong> Overlay content, modal dialogs, secondary panels</li>
            <li><strong>Full Frost:</strong> Hero sections, feature highlights, maximum visual impact</li>
            <li><strong>Transparent:</strong> Floating content, minimalist designs, content that blends with background</li>
          </ul>
        </div>
      </div>
    </spectrum-theme>
  `,
  parameters: {
    docs: {
      description: {
        story: `
          Demonstrates all four background levels available for the conversation panel component.
          
          ## Background Levels
          
          ### Opaque (Default)
          - **Usage**: Main content areas, primary panels
          - **Effect**: Solid background with no transparency
          - **Best For**: Default behavior, ensuring content readability
          
          ### Partial Frost
          - **Usage**: Overlay content, modal dialogs  
          - **Effect**: 33% white tint with subtle blur (5px)
          - **Best For**: Content that needs to stand out while showing some background
          
          ### Full Frost
          - **Usage**: Hero sections, feature highlights
          - **Effect**: 66% white tint with strong blur (10px)
          - **Best For**: Maximum glassmorphism effect, premium appearance
          
          ### Transparent
          - **Usage**: Floating content, minimalist designs
          - **Effect**: No background, border, or shadow
          - **Best For**: Content that should blend seamlessly with background
          
          ## Implementation
          
          \`\`\`html
          <!-- Opaque (default) -->
          <spectrum-conversation-panel background="opaque">
            <!-- Content -->
          </spectrum-conversation-panel>
          
          <!-- Partial frost -->
          <spectrum-conversation-panel background="partial-frost">
            <!-- Content with subtle frost effect -->
          </spectrum-conversation-panel>
          
          <!-- Full frost -->
          <spectrum-conversation-panel background="full-frost">
            <!-- Content with strong frost effect -->
          </spectrum-conversation-panel>
          
          <!-- Transparent -->
          <spectrum-conversation-panel background="transparent">
            <!-- Content with no background -->
          </spectrum-conversation-panel>
          \`\`\`
          
          ## Design Considerations
          
          - **Accessibility**: All levels maintain proper contrast ratios
          - **Performance**: Backdrop blur effects are optimized for smooth performance
          - **Consistency**: Matches the background system used in image gallery and other panel components
          - **Responsive**: All effects work consistently across different screen sizes
          
          Choose the background level that best fits your use case and design requirements.
        `,
      },
    },
  },
};

export type Story = StoryObj<SpectrumConversationPanelArgs>;

// Wallpaper Background Examples
export const WithWallpaperBackground: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    background: 'partial-frost',
    conversationtitle: 'Chat with Frost Effect',
    messages: `[
      {
        "id": "msg-001",
        "message": "Show me the conversation panel with a beautiful background",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-002",
        "message": "Here's the conversation panel displayed over a dynamic wallpaper background. Notice how the frost effect creates a beautiful glassmorphism appearance that allows the background to show through while maintaining readability of the text content.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "Glassmorphism Design Guide",
            "value": "https://example.com/glassmorphism",
            "snippet": "Glassmorphism is a design trend that uses transparency and blur effects to create depth.",
            "number": 1
          }
        ],
        "explorations": [
          {
            "label": "What other background effects are available?",
            "value": "What other background effects are available?"
          },
          {
            "label": "How does the frost effect work technically?",
            "value": "How does the frost effect work technically?"
          }
        ]
      }
    ]`,
    loading: false,
    sound: false,
    debug: false
  },
  render: (args) => html`
    <div style="height: 100vh; width: 100%; position: relative;">
      <!-- Theme Component with Wallpaper Coordination -->
      <spectrum-theme
        wait-for-wallpaper="true"
        theme="material-auto"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
      </spectrum-theme>
      
      <!-- Wallpaper Background -->
      <spectrum-wallpaper 
        background="url(https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1200&h=800&fit=crop&crop=entropy&cs=tinysrgb)"
        background-size="cover"
        background-position="center"
        signal-ready="true"
        apply-to-root="true"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
      </spectrum-wallpaper>
      
      <!-- Conversation Panel Overlay -->
      <div style="position: absolute; top: 2rem; left: 2rem; right: 2rem; bottom: 2rem; z-index: 2;">
        <spectrum-conversation-panel
          messages=${args.messages}
          conversationtitle=${args.conversationtitle}
          actions=${ifDefined(args.actions)}
          sources=${ifDefined(args.sources)}
          ?loading=${args.loading}
          ?sound=${args.sound}
          ?debug=${args.debug}
          background=${args.background}
          @explorationSelected=${action('explorationSelected')}
          @action=${action('action')}
          @explore=${action('explore')}
          @sourceClick=${action('sourceClick')}
          @titleChanged=${action('titleChanged')}
        ></spectrum-conversation-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Conversation panel with coordinated theme and wallpaper background, demonstrating the frost effect with proper color extraction and theming.',
      },
    },
  },
};

// Background Effect Comparison on Wallpaper
export const BackgroundEffectsOnWallpaper: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    conversationtitle: 'Background Effects Demo',
    messages: `[
      {
        "id": "msg-001",
        "message": "Compare different background effects",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-002",
        "message": "This demo shows how different background effects look over a wallpaper. Switch between opaque, partial-frost, full-frost, and transparent to see the differences.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z"
      }
    ]`,
    loading: false,
    sound: false,
    debug: false,
    background: 'partial-frost'
  },
  render: (args) => html`
    <div style="height: 100vh; width: 100%; position: relative;">
      <!-- Theme Component with Wallpaper Coordination -->
      <spectrum-theme
        wait-for-wallpaper="true"
        theme="material-auto"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
      </spectrum-theme>
      
      <!-- Wallpaper Background -->
      <spectrum-wallpaper 
        background="url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=entropy&cs=tinysrgb)"
        background-size="cover"
        background-position="center"
        signal-ready="true"
        apply-to-root="true"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
      </spectrum-wallpaper>
      
      <!-- Grid of panels with different background effects -->
      <div style="position: absolute; top: 1rem; left: 1rem; right: 1rem; bottom: 1rem; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 1rem;">
        
        <!-- Opaque Background -->
        <spectrum-conversation-panel
          messages='[{"id": "1", "message": "Opaque Background - solid panel that completely blocks the background image", "sender": "response", "timestamp": "2024-03-20T10:00:00Z"}]'
          conversationtitle="Opaque"
          background="opaque"
          style="grid-area: 1 / 1;"
        ></spectrum-conversation-panel>
        
        <!-- Partial Frost Background -->
        <spectrum-conversation-panel
          messages='[{"id": "2", "message": "Partial Frost Effect - 33% tint with subtle blur for elegant glassmorphism", "sender": "response", "timestamp": "2024-03-20T10:00:00Z"}]'
          conversationtitle="Partial Frost"
          background="partial-frost"
          style="grid-area: 1 / 2;"
        ></spectrum-conversation-panel>
        
        <!-- Full Frost Background -->
        <spectrum-conversation-panel
          messages='[{"id": "3", "message": "Full Frost Effect - 66% tint with strong blur for enhanced readability", "sender": "response", "timestamp": "2024-03-20T10:00:00Z"}]'
          conversationtitle="Full Frost"
          background="full-frost"
          style="grid-area: 2 / 1;"
        ></spectrum-conversation-panel>
        
        <!-- Transparent Background -->
        <spectrum-conversation-panel
          messages='[{"id": "4", "message": "Transparent Background - no panel styling, content appears directly over the background", "sender": "response", "timestamp": "2024-03-20T10:00:00Z"}]'
          conversationtitle="Transparent"
          background="transparent"
          style="grid-area: 2 / 2;"
        ></spectrum-conversation-panel>
        
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all background effects with coordinated theme and wallpaper color extraction from a mountain landscape.',
      },
    },
  },
};

// Mobile Wallpaper Example
export const MobileWithWallpaper: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    background: 'full-frost',
    conversationtitle: 'Mobile Chat',
    messages: `[
      {
        "id": "msg-001",
        "message": "How does this look on mobile?",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-002",
        "message": "The conversation panel adapts beautifully to mobile viewports while maintaining the frost effect over the dynamic wallpaper background. The source chips <cite>1</cite> work perfectly on touch devices.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "Mobile UX Best Practices",
            "value": "https://example.com/mobile-ux",
            "snippet": "Designing effective mobile interfaces requires careful attention to touch targets and readability.",
            "number": 1
          }
        ]
      }
    ]`,
    loading: false,
    sound: false,
    debug: false
  },
  render: (args) => html`
    <div style="height: 100vh; width: 375px; max-width: 100%; margin: 0 auto; position: relative; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;">
      <!-- Theme Component with Wallpaper Coordination -->
      <spectrum-theme
        wait-for-wallpaper="true"
        theme="material-auto"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
      </spectrum-theme>
      
      <!-- Wallpaper Background -->
      <spectrum-wallpaper 
        background="url(https://images.unsplash.com/photo-1551524164-6cf2ac8aee8c?w=600&h=800&fit=crop&crop=entropy&cs=tinysrgb)"
        background-size="cover"
        background-position="center"
        signal-ready="true"
        apply-to-root="true"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"
        debug="false">
      </spectrum-wallpaper>
      
      <!-- Conversation Panel Overlay -->
      <div style="position: absolute; top: 0.5rem; left: 0.5rem; right: 0.5rem; bottom: 0.5rem; z-index: 2;">
        <spectrum-conversation-panel
          messages=${args.messages}
          conversationtitle=${args.conversationtitle}
          actions=${ifDefined(args.actions)}
          sources=${ifDefined(args.sources)}
          ?loading=${args.loading}
          ?sound=${args.sound}
          ?debug=${args.debug}
          background=${args.background}
          @explorationSelected=${action('explorationSelected')}
          @action=${action('action')}
          @explore=${action('explore')}
          @sourceClick=${action('sourceClick')}
          @titleChanged=${action('titleChanged')}
        ></spectrum-conversation-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized view with coordinated theme and wallpaper color extraction from a city skyline background.',
      },
    },
  },
};

// Urban Landscape Example
export const UrbanLandscapeWallpaper: StoryObj<SpectrumConversationPanelArgs> = {
  args: {
    background: 'partial-frost',
    conversationtitle: 'Urban Discussion',
    messages: `[
      {
        "id": "msg-001",
        "message": "Tell me about modern urban architecture",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "id": "msg-002",
        "message": "Modern urban architecture emphasizes sustainable design, mixed-use development, and integration with public transportation. Cities are increasingly adopting green building standards and smart infrastructure <cite>1</cite> to create more livable environments.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "Smart Cities Initiative",
            "value": "https://example.com/smart-cities",
            "snippet": "Comprehensive guide to modern urban planning and sustainable architecture practices.",
            "number": 1
          }
        ],
        "explorations": [
          {
            "label": "What are green building standards?",
            "value": "What are green building standards?"
          },
          {
            "label": "How do smart cities use technology?",
            "value": "How do smart cities use technology?"
          }
        ]
      }
    ]`,
    loading: false,
    sound: false,
    debug: false
  },
  render: (args) => html`
    <div style="height: 100vh; width: 100%; position: relative;">
      <!-- Theme Component with Wallpaper Coordination -->
      <spectrum-theme
        wait-for-wallpaper="true"
        theme="material-auto"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
      </spectrum-theme>
      
      <!-- Urban Wallpaper Background -->
      <spectrum-wallpaper 
        background="url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop&crop=entropy&cs=tinysrgb)"
        background-size="cover"
        background-position="center"
        signal-ready="true"
        apply-to-root="true"
        debug="false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
      </spectrum-wallpaper>
      
      <!-- Conversation Panel Overlay -->
      <div style="position: absolute; top: 3rem; left: 3rem; right: 3rem; bottom: 3rem; z-index: 2;">
        <spectrum-conversation-panel
          messages=${args.messages}
          conversationtitle=${args.conversationtitle}
          actions=${ifDefined(args.actions)}
          sources=${ifDefined(args.sources)}
          ?loading=${args.loading}
          ?sound=${args.sound}
          ?debug=${args.debug}
          background=${args.background}
          @explorationSelected=${action('explorationSelected')}
          @action=${action('action')}
          @explore=${action('explore')}
          @sourceClick=${action('sourceClick')}
          @titleChanged=${action('titleChanged')}
        ></spectrum-conversation-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Professional discussion with coordinated theme and wallpaper color extraction from an urban cityscape background.',
      },
    },
  },
};
