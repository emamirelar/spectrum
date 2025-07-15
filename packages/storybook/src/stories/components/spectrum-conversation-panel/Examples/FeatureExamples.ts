import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Advanced conversation with grouped citations
export const groupedCitationsConversation = `[
  {
    "id": "citations-001",
    "message": "What are the major renewable energy technologies and their efficiency rates?",
    "sender": "request",
    "timestamp": "2024-03-20T10:00:00Z"
  },
  {
    "id": "citations-002",
    "message": "Renewable energy technologies have made significant advances in efficiency:<br><br><strong>Solar Power:</strong> Modern photovoltaic panels achieve 20-26% efficiency<sup>1</sup><sup>2</sup><sup>3</sup>, while concentrated solar power systems can reach up to 35%<cite>4</cite>.<br><br><strong>Wind Energy:</strong> Current wind turbines operate at 35-45% efficiency<cite>5</cite><cite>6</cite>, with offshore installations achieving higher performance<sup>7</sup><sup>8</sup><sup>9</sup>.<br><br><strong>Hydroelectric Power:</strong> The most efficient renewable technology at 80-95% efficiency<sup>10</sup><cite>11</cite>, though environmental impact varies<cite>12</cite><cite>13</cite><cite>14</cite>.<br><br><strong>Geothermal Systems:</strong> Achieve 10-15% electrical efficiency<sup>15</sup><sup>16</sup> but provide excellent heating efficiency<cite>17</cite>.",
    "sender": "response",
    "timestamp": "2024-03-20T10:00:15Z",
    "sources": [
      {
        "label": "NREL Solar Panel Efficiency Report 2024",
        "value": "https://www.nrel.gov/docs/fy24osti/solar-efficiency.pdf",
        "snippet": "Comprehensive analysis of modern photovoltaic panel efficiency improvements and market trends.",
        "number": "1"
      },
      {
        "label": "Nature Energy - Perovskite Solar Cell Advances",
        "value": "https://www.nature.com/articles/s41560-024-01234-5",
        "snippet": "Latest research on next-generation solar cell technologies achieving record efficiencies.",
        "number": "2"
      },
      {
        "label": "Solar Power World Efficiency Comparison",
        "value": "https://www.solarpowerworldonline.com/efficiency-comparison-2024/",
        "snippet": "Industry comparison of commercial solar panel efficiency ratings from major manufacturers.",
        "number": "3"
      },
      {
        "label": "Concentrated Solar Power Technology Review",
        "value": "https://www.energy.gov/eere/solar/concentrated-solar-power",
        "snippet": "Department of Energy analysis of CSP systems and their thermal-to-electric conversion efficiency.",
        "number": "4"
      },
      {
        "label": "Global Wind Energy Council Efficiency Report",
        "value": "https://gwec.net/wind-turbine-efficiency-2024/",
        "snippet": "Global analysis of wind turbine performance metrics and efficiency improvements.",
        "number": "5"
      },
      {
        "label": "Wind Power Engineering Efficiency Study",
        "value": "https://www.windpowerengineering.com/efficiency-study-2024/",
        "snippet": "Technical analysis of wind turbine aerodynamics and power conversion efficiency.",
        "number": "6"
      },
      {
        "label": "Offshore Wind Performance Analysis",
        "value": "https://www.offshore-technology.com/analysis/wind-performance/",
        "snippet": "Comparative study of offshore vs onshore wind turbine efficiency and capacity factors.",
        "number": "7"
      },
      {
        "label": "European Wind Energy Association Report",
        "value": "https://windeurope.org/offshore-efficiency-2024/",
        "snippet": "European offshore wind farm performance data showing improved efficiency rates.",
        "number": "8"
      },
      {
        "label": "Floating Wind Platform Efficiency",
        "value": "https://www.floating-wind.org/efficiency-report/",
        "snippet": "Analysis of floating offshore wind platform efficiency in deeper water installations.",
        "number": "9"
      },
      {
        "label": "International Hydropower Association Statistics",
        "value": "https://www.hydropower.org/efficiency-data",
        "snippet": "Global hydroelectric power efficiency statistics and performance benchmarks.",
        "number": "10"
      },
      {
        "label": "Hydroelectric Turbine Efficiency Analysis",
        "value": "https://www.hydro-turbines.com/efficiency-analysis/",
        "snippet": "Technical study of modern hydroelectric turbine designs and efficiency improvements.",
        "number": "11"
      },
      {
        "label": "Environmental Impact of Hydroelectric Power",
        "value": "https://www.nature.com/articles/environmental-hydro-2024",
        "snippet": "Comprehensive assessment of hydroelectric power environmental considerations and mitigation strategies.",
        "number": "12"
      },
      {
        "label": "River Ecosystem Impact Studies",
        "value": "https://www.freshwaterscience.org/hydro-impacts/",
        "snippet": "Research on hydroelectric power impacts on river ecosystems and fish migration patterns.",
        "number": "13"
      },
      {
        "label": "Sustainable Hydropower Development Guidelines",
        "value": "https://www.iea.org/reports/sustainable-hydropower",
        "snippet": "IEA guidelines for environmentally sustainable hydroelectric power development.",
        "number": "14"
      },
      {
        "label": "Geothermal Energy Efficiency Report",
        "value": "https://www.geothermal.org/efficiency-report-2024/",
        "snippet": "Geothermal Energy Association analysis of power plant efficiency and heat pump performance.",
        "number": "15"
      },
      {
        "label": "Enhanced Geothermal Systems Study",
        "value": "https://www.energy.gov/eere/geothermal/enhanced-geothermal-systems",
        "snippet": "DOE research on enhanced geothermal systems improving efficiency and expanding accessibility.",
        "number": "16"
      },
      {
        "label": "Geothermal Heat Pump Efficiency Analysis",
        "value": "https://www.ashrae.org/geothermal-heat-pump-efficiency/",
        "snippet": "ASHRAE technical analysis of geothermal heat pump systems and their superior heating efficiency.",
        "number": "17"
      }
    ],
    "explorations": [
      {
        "label": "What are the latest breakthrough technologies in renewable energy?",
        "value": "What emerging renewable energy technologies show the most promise?"
      },
      {
        "label": "How do energy storage systems affect renewable efficiency?",
        "value": "How do battery storage and grid integration impact renewable energy efficiency?"
      },
      {
        "label": "What are the cost trends for renewable energy technologies?",
        "value": "How have renewable energy costs changed and what are future projections?"
      }
    ]
  }
]`;

// Conversation for sound testing
export const soundTestConversation = `[
  {
    "id": "sound-001",
    "message": "Can you demonstrate the sound features?",
    "sender": "request",
    "timestamp": "2024-03-20T15:30:00Z"
  },
  {
    "id": "sound-002",
    "message": "Absolutely! When sound is enabled, several interactive elements will play audio feedback:<br><br><strong>Sound Features:</strong><br>• **Action buttons** play button.mp3 when clicked<br>• **Exploration chips** play chip.mp3 when clicked<br>• **Loading state** plays waiting.mp3 in a continuous loop<br>• **Source citation chips** also play chip.mp3<br><br>Try enabling the 'sound' control and interacting with the buttons and explorations below!",
    "sender": "response",
    "timestamp": "2024-03-20T15:30:10Z",
    "explorations": [
      {
        "label": "Click me to test chip sound!",
        "value": "Testing chip sound effect"
      },
      {
        "label": "Another chip to test audio",
        "value": "Testing another chip sound"
      },
      {
        "label": "Try this one too!",
        "value": "Testing third chip sound"
      }
    ]
  }
]`;

// Long conversation for scroll testing
export const longScrollConversation = `[
  {
    "id": "scroll-001",
    "message": "Can you tell me about the history of computing?",
    "sender": "request",
    "timestamp": "2024-03-20T08:00:00Z"
  },
  {
    "id": "scroll-002",
    "message": "The history of computing spans several millennia, from ancient calculating devices to modern supercomputers. Early mechanical calculators like the abacus<sup>1</sup> laid the foundation for automated computation.",
    "sender": "response",
    "timestamp": "2024-03-20T08:00:15Z",
    "sources": [
      {
        "label": "History of Computing Devices",
        "value": "https://www.computerhistory.org/timeline/",
        "snippet": "Comprehensive timeline of computing device evolution from ancient times to present.",
        "number": "1"
      }
    ]
  },
  {
    "id": "scroll-003",
    "message": "What about the first electronic computers?",
    "sender": "request",
    "timestamp": "2024-03-20T08:01:00Z"
  },
  {
    "id": "scroll-004",
    "message": "The first electronic computers emerged in the 1940s. ENIAC<sup>1</sup>, completed in 1946, was one of the first general-purpose electronic computers. It weighed 30 tons and filled an entire room<cite>2</cite>.",
    "sender": "response",
    "timestamp": "2024-03-20T08:01:20Z",
    "sources": [
      {
        "label": "ENIAC Computer History",
        "value": "https://www.upenn.edu/eniac/",
        "snippet": "University of Pennsylvania's documentation of the ENIAC computer development and operation.",
        "number": "1"
      },
      {
        "label": "Early Computer Size and Weight",
        "value": "https://www.computerhistory.org/eniac-size/",
        "snippet": "Physical specifications and operational requirements of early electronic computers.",
        "number": "2"
      }
    ]
  },
  {
    "id": "scroll-005", 
    "message": "How did personal computers develop?",
    "sender": "request",
    "timestamp": "2024-03-20T08:02:00Z"
  },
  {
    "id": "scroll-006",
    "message": "Personal computers evolved from room-sized machines to desktop systems. The Altair 8800<sup>1</sup> in 1975 is often considered the first successful personal computer. Apple II<cite>2</cite> and IBM PC<sup>3</sup> popularized personal computing.",
    "sender": "response",
    "timestamp": "2024-03-20T08:02:30Z",
    "sources": [
      {
        "label": "Altair 8800 Development",
        "value": "https://www.computerhistory.org/altair/",
        "snippet": "The story of the Altair 8800 and its role in launching the personal computer revolution.",
        "number": "1"
      },
      {
        "label": "Apple II Impact on Computing",
        "value": "https://www.apple.com/apple-ii-history/",
        "snippet": "Apple's documentation of the Apple II computer and its influence on personal computing.",
        "number": "2"
      },
      {
        "label": "IBM PC Market Impact",
        "value": "https://www.ibm.com/ibm/history/ibm100/us/en/icons/personalcomputer/",
        "snippet": "IBM's history of the personal computer and its standardization of the PC architecture.",
        "number": "3"
      }
    ],
    "explorations": [
      {
        "label": "What role did Microsoft play in PC development?",
        "value": "How did Microsoft contribute to personal computer evolution?"
      },
      {
        "label": "When did graphical user interfaces become popular?",
        "value": "What was the timeline for GUI adoption in personal computers?"
      }
    ]
  },
  {
    "id": "scroll-007",
    "message": "What about the internet era?",
    "sender": "request",
    "timestamp": "2024-03-20T08:03:00Z"
  },
  {
    "id": "scroll-008",
    "message": "The internet transformed computing from isolated machines to interconnected systems. ARPANET<sup>1</sup> in the 1960s evolved into the modern internet. The World Wide Web<cite>2</cite>, created by Tim Berners-Lee in 1989, made the internet accessible to everyone.",
    "sender": "response",
    "timestamp": "2024-03-20T08:03:45Z",
    "sources": [
      {
        "label": "ARPANET Development History",
        "value": "https://www.darpa.mil/about-us/timeline/arpanet",
        "snippet": "DARPA's official history of ARPANET development and its evolution into the internet.",
        "number": "1"
      },
      {
        "label": "World Wide Web Creation Story",
        "value": "https://www.w3.org/History.html",
        "snippet": "W3C documentation of the World Wide Web's creation and early development.",
        "number": "2"
      }
    ]
  },
  {
    "id": "scroll-009",
    "message": "How has mobile computing changed things?",
    "sender": "request",
    "timestamp": "2024-03-20T08:04:00Z"
  },
  {
    "id": "scroll-010",
    "message": "Mobile computing revolutionized how we interact with technology. Smartphones<sup>1</sup> put powerful computers in our pockets. The iPhone<cite>2</cite> in 2007 and Android<sup>3</sup> created the modern mobile ecosystem we know today.",
    "sender": "response",
    "timestamp": "2024-03-20T08:04:30Z",
    "sources": [
      {
        "label": "Smartphone Evolution Timeline",
        "value": "https://www.gsmarena.com/smartphone-history/",
        "snippet": "Complete timeline of smartphone development from early devices to modern flagships.",
        "number": "1"
      },
      {
        "label": "iPhone Impact on Mobile Computing",
        "value": "https://www.apple.com/iphone/timeline/",
        "snippet": "Apple's timeline of iPhone development and its influence on mobile computing.",
        "number": "2"
      },
      {
        "label": "Android Operating System History",
        "value": "https://www.android.com/history/",
        "snippet": "Google's documentation of Android development and mobile platform evolution.",
        "number": "3"
      }
    ],
    "explorations": [
      {
        "label": "What's next in computing technology?",
        "value": "What are the emerging trends in computing for the next decade?"
      },
      {
        "label": "How has cloud computing changed software?",
        "value": "What impact has cloud computing had on software development and deployment?"
      }
    ]
  }
]`;

// Debug mode conversation
export const debugConversation = `[
  {
    "id": "debug-001",
    "message": "Test debug mode features",
    "sender": "request",
    "timestamp": "2024-03-20T12:00:00Z"
  },
  {
    "id": "debug-002",
    "message": "Debug mode is now enabled! Check the browser console for detailed logging information. You'll see logs for:<br><br>• Message parsing and rendering<br>• Event handling and emission<br>• Scroll behavior and positioning<br>• Audio initialization and playback<br>• Source citation processing<br>• Component lifecycle events",
    "sender": "response",
    "timestamp": "2024-03-20T12:00:10Z",
    "sources": [
      {
        "label": "Browser Developer Tools Guide",
        "value": "https://developer.chrome.com/docs/devtools/",
        "snippet": "Chrome DevTools documentation for debugging web applications.",
        "number": "1"
      }
    ],
    "explorations": [
      {
        "label": "Test exploration logging",
        "value": "This will trigger debug logs for exploration click events"
      }
    ]
  }
]`;

// Feature demo functions
export function GroupedCitationsDemo() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-info-container, #e7f3ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-info-container);">📚 Grouped Citations Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-info-container); font-size: 0.875rem;">
            This demo shows <strong>grouped citations</strong> where adjacent <code>&lt;sup&gt;</code> and <code>&lt;cite&gt;</code> tags are automatically grouped into single chips. Hover over grouped chips to see multiple source cards displayed in a grid layout.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${groupedCitationsConversation}
          .conversationtitle=${'Grouped Citations Example'}
          .actions=${'[{"label": "Export Sources", "icon": "assignment", "value": "export"}]'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function SoundFeaturesDemo() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-success-container, #d4edda); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-success-container);">🔊 Sound Features Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-success-container); font-size: 0.875rem;">
            Enable the <strong>sound</strong> control to test audio features. Click action buttons, exploration chips, and enable loading to hear different sound effects. All interactive elements inherit the panel's sound setting.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${soundTestConversation}
          .conversationtitle=${'Sound Testing Panel'}
          .actions=${'[{"label": "Test Button Sound", "icon": "volume_up", "value": "sound"}, {"label": "Another Button", "icon": "play_arrow", "value": "play"}]'}
          .sound=${true}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function ScrollBehaviorDemo() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-warning-container, #fff3cd); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-warning-container);">📜 Scroll Behavior Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-warning-container); font-size: 0.875rem;">
            This demo tests <strong>automatic scrolling</strong> and scroll position stability. The panel should automatically scroll to the latest message and maintain position during hover interactions.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${longScrollConversation}
          .conversationtitle=${'Long Conversation - Scroll Test'}
          .actions=${'[{"label": "Scroll to Top", "icon": "keyboard_arrow_up", "value": "top"}, {"label": "Export", "icon": "download", "value": "export"}]'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function DebugModeDemo() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-error-container, #f8d7da); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-error-container);">🐛 Debug Mode Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-error-container); font-size: 0.875rem;">
            Debug mode is <strong>enabled</strong>. Open browser Developer Tools console to see detailed logging for all component operations, event handling, and internal state changes.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${debugConversation}
          .conversationtitle=${'Debug Mode Test'}
          .actions=${'[{"label": "Test Action Log", "icon": "bug_report", "value": "debug"}]'}
          .debug=${true}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function LoadingWithSoundDemo() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-info-container, #e7f3ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-info-container);">⏳ Loading + Sound Demo</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-info-container); font-size: 0.875rem;">
            This demo shows the <strong>loading state with sound</strong>. When both loading and sound are enabled, waiting.mp3 plays in a continuous loop. Toggle the loading control to test the audio behavior.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${soundTestConversation}
          .conversationtitle=${'Loading Sound Test'}
          .actions=${'[{"label": "Toggle Loading", "icon": "refresh", "value": "loading"}]'}
          .loading=${true}
          .sound=${true}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function MobileSourceCardDemo() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; width: 375px; margin: 0 auto; padding: 0.5rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa); border: 1px solid #ddd; border-radius: 12px;">
        <div style="margin-bottom: 0.5rem; padding: 0.75rem; background: var(--spectrum-sys-color-surface, #fff); border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 0.25rem 0; font-size: 1rem; color: var(--spectrum-sys-color-on-surface);">📱 Mobile Source Cards</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.75rem;">
            On mobile, tapping source citation chips shows a <strong>slide-up card</strong> instead of hover overlays. Tap the citation chips in the message below to test the mobile behavior.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${groupedCitationsConversation}
          .conversationtitle=${'Mobile Citations Test'}
          .actions=${'[{"label": "Share", "icon": "share", "value": "share"}]'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
} 