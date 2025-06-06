import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumConversationPanel } from "@stencil-storybook-boilerplate/core/src/components/spectrum-conversation-panel/spectrum-conversation-panel";

interface SpectrumConversationPanelArgs {
  messages: string;
  conversationtitle: string;
  actions: string;
  sources: string;
  loading: boolean;
}

const meta = {
  title: 'Components/SpectrumConversationPanel',
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
    loading: false
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
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A conversation panel component that displays messages, actions, sources, and explorations.
          
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
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-conversation-panel
        .messages=${args.messages}
        .conversationtitle=${args.conversationtitle}
        .actions=${args.actions}
        .sources=${args.sources}
        .loading=${args.loading}
        @action=${(e: CustomEvent) => action('Action')(e.detail)}
        @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
        @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
        @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
        @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
      ></spectrum-conversation-panel>
    </div>
  `,
};

// Scrolling Behavior - Many Messages for Testing
export const ScrollingBehavior: StoryObj<SpectrumConversationPanelArgs> = {
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
  },
  render: (args) => html`
    <div style="height: 600px; padding: 1rem; position: relative; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px;">
      <div style="margin-bottom: 1rem; padding: 1rem; background: #fff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 0.5rem 0; color: #495057;">Internal Scrolling Behavior Test</h3>
        <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">
          This panel contains <strong>24 messages</strong> (12 requests + 12 responses) and is constrained to 350px height 
          to force internal scrolling. Test the scrolling behavior within the conversation panel.
        </p>
      </div>
      
      <spectrum-conversation-panel
        
        .messages=${args.messages}
        .conversationtitle=${args.conversationtitle}
        .actions=${args.actions}
        .sources=${args.sources}
        .loading=${args.loading}
        @action=${(e: CustomEvent) => action('Action')(e.detail)}
        @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
        @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
        @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
        @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
      ></spectrum-conversation-panel>
      
      <div style="margin-top: 1rem; padding: 1rem; background: #e7f3ff; border-radius: 6px; border-left: 4px solid #007bff;">
        <p style="margin: 0; color: #004085; font-size: 0.875rem;">
          <strong>💡 Test Instructions:</strong><br>
          • The conversation panel above is constrained to 350px height<br>
          • Scroll within the panel to see all 24 messages<br>
          • Test scrolling performance and smoothness<br>
          • Try clicking sources and explorations while scrolled<br>
          • Check if scroll position is maintained during interactions
        </p>
      </div>
    </div>
  `,
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
    <div style="height: 600px; padding: 1rem; position: relative; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px;">
      <div style="margin-bottom: 1rem; padding: 1rem; background: #fff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 0.5rem 0; color: #495057;">Sources Horizontal Scrolling Demo</h3>
        <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">
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
        @action=${(e: CustomEvent) => action('Action')(e.detail)}
        @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
        @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
        @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
        @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
      ></spectrum-conversation-panel>
      
      <div style="margin-top: 1rem; padding: 1rem; background: #e7f3ff; border-radius: 6px; border-left: 4px solid #007bff;">
        <p style="margin: 0; color: #004085; font-size: 0.875rem;">
          <strong>💡 Demo Features:</strong><br>
          • Each source has a numbered identifier (1-10)<br>
          • Sources scroll horizontally when expanded<br>
          • Click on "Sources and related content" to expand<br>
          • Scroll through sources using mouse or touch<br>
          • Click any source to test the sourceClick event
        </p>
      </div>
    </div>
  `,
};
