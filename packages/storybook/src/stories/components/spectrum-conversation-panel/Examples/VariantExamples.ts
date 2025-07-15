import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Sample conversations for different variants
export const aiTutorConversation = `[
  {
    "id": "tutorial-001",
    "message": "I'm struggling with calculus derivatives. Can you help me understand the basics?",
    "sender": "request",
    "timestamp": "2024-03-20T14:30:00Z"
  },
  {
    "id": "tutorial-002",
    "message": "I'd be happy to help you with calculus derivatives! The derivative measures how much a function changes as its input changes<sup>1</sup>. Think of it as the 'rate of change' or the slope of a function at any given point<cite>2</cite>.<br><br><strong>Basic Rules:</strong><br>• Power Rule: d/dx(x^n) = nx^(n-1)<sup>3</sup><br>• Constant Rule: d/dx(c) = 0<br>• Sum Rule: d/dx(f + g) = f' + g'<cite>4</cite>",
    "sender": "response",
    "timestamp": "2024-03-20T14:30:15Z",
    "sources": [
      {
        "label": "Khan Academy - Introduction to Derivatives",
        "value": "https://www.khanacademy.org/math/calculus-1/derivatives",
        "snippet": "Interactive lessons on derivative fundamentals with step-by-step explanations.",
        "number": "1"
      },
      {
        "label": "MIT OpenCourseWare - Single Variable Calculus",
        "value": "https://ocw.mit.edu/courses/mathematics/18-01-single-variable-calculus/",
        "snippet": "Comprehensive calculus course materials including derivative concepts and applications.",
        "number": "2"
      },
      {
        "label": "Calculus Power Rule Explanation",
        "value": "https://www.mathsisfun.com/calculus/power-rule.html",
        "snippet": "Clear explanation of the power rule with examples and practice problems.",
        "number": "3"
      },
      {
        "label": "Derivative Rules Reference",
        "value": "https://www.derivative-calculator.net/rules",
        "snippet": "Complete reference guide for all basic derivative rules and formulas.",
        "number": "4"
      }
    ],
    "explorations": [
      {
        "label": "Can you show me how to find the derivative of x² + 3x?",
        "value": "How do I apply derivative rules to find d/dx(x² + 3x)?"
      },
      {
        "label": "What are derivatives used for in real life?",
        "value": "What are the practical applications of derivatives?"
      },
      {
        "label": "How do I handle more complex functions?",
        "value": "What about derivatives of trigonometric or exponential functions?"
      }
    ]
  }
]`;

export const customerSupportConversation = `[
  {
    "id": "support-001",
    "message": "I'm having trouble with my account login. It keeps saying my password is incorrect.",
    "sender": "request",
    "timestamp": "2024-03-20T11:15:00Z"
  },
  {
    "id": "support-002",
    "message": "I'm sorry to hear you're having login trouble! Let's get this resolved quickly. Here are some immediate steps to try:<br><br><strong>Quick Fixes:</strong><br>1. **Clear your browser cache and cookies**<sup>1</sup><br>2. **Try an incognito/private browser window**<br>3. **Check if Caps Lock is enabled**<cite>2</cite><br>4. **Reset your password using the 'Forgot Password' link**<sup>3</sup><br><br>If these don't work, I can help you with additional troubleshooting steps.",
    "sender": "response",
    "timestamp": "2024-03-20T11:15:30Z",
    "sources": [
      {
        "label": "Browser Cache Clearing Guide",
        "value": "https://support.help/clear-browser-cache",
        "snippet": "Step-by-step instructions for clearing cache in all major browsers.",
        "number": "1"
      },
      {
        "label": "Login Troubleshooting FAQ",
        "value": "https://support.help/login-issues",
        "snippet": "Common login problems and solutions for account access issues.",
        "number": "2"
      },
      {
        "label": "Password Reset Instructions",
        "value": "https://support.help/password-reset",
        "snippet": "Complete guide to resetting your account password safely and securely.",
        "number": "3"
      }
    ],
    "explorations": [
      {
        "label": "How do I enable two-factor authentication?",
        "value": "Can you help me set up two-factor authentication for better security?"
      },
      {
        "label": "What if I forgot my username too?",
        "value": "I don't remember my username either, how can I recover it?"
      }
    ]
  }
]`;

export const researchAssistantConversation = `[
  {
    "id": "research-001", 
    "message": "I need to write a paper on climate change impacts. Can you help me find recent research?",
    "sender": "request",
    "timestamp": "2024-03-20T16:45:00Z"
  },
  {
    "id": "research-002",
    "message": "I'd be happy to help with your climate change research! Here are recent key findings and sources:<br><br><strong>Major Impact Categories:</strong><br>• **Temperature Rise**: Global average temperature has increased by 1.1°C since 1880<sup>1</sup><sup>2</sup><br>• **Sea Level Rise**: Currently rising at 3.4mm per year<cite>3</cite><br>• **Extreme Weather**: Increased frequency of heat waves, droughts, and intense storms<sup>4</sup><cite>5</cite><br>• **Ecosystem Disruption**: Species migration patterns and habitat loss<cite>6</cite><sup>7</sup><br>• **Human Systems**: Agricultural impacts and water resource stress<sup>8</sup><cite>9</cite>",
    "sender": "response",
    "timestamp": "2024-03-20T16:45:45Z",
    "sources": [
      {
        "label": "IPCC Sixth Assessment Report (2023)",
        "value": "https://www.ipcc.ch/report/ar6/",
        "snippet": "Latest comprehensive assessment of climate change science, impacts, and solutions.",
        "number": "1"
      },
      {
        "label": "NASA GISS Temperature Data",
        "value": "https://data.giss.nasa.gov/gistemp/",
        "snippet": "Official NASA temperature records showing global warming trends.",
        "number": "2"
      },
      {
        "label": "NOAA Sea Level Trends",
        "value": "https://tidesandcurrents.noaa.gov/sltrends/",
        "snippet": "Real-time sea level measurements and long-term trend analysis.",
        "number": "3"
      },
      {
        "label": "Nature Climate Change - Extreme Weather Attribution",
        "value": "https://www.nature.com/articles/s41558-023-01603-3",
        "snippet": "Peer-reviewed research on linking extreme weather events to climate change.",
        "number": "4"
      },
      {
        "label": "Climate Central Weather Attribution Studies",
        "value": "https://www.climatecentral.org/climate-matters/extreme-weather",
        "snippet": "Analysis of how climate change influences extreme weather frequency and intensity.",
        "number": "5"
      },
      {
        "label": "Conservation Biology - Species Response to Climate",
        "value": "https://conbio.onlinelibrary.wiley.com/climate-species",
        "snippet": "Research on how species are adapting to changing climate conditions.",
        "number": "6"
      },
      {
        "label": "Ecological Applications - Habitat Shifts",
        "value": "https://esajournals.onlinelibrary.wiley.com/habitat-climate",
        "snippet": "Studies documenting ecosystem and habitat changes due to climate impacts.",
        "number": "7"
      },
      {
        "label": "Agricultural and Food Security Reports",
        "value": "https://www.fao.org/climate-change/resources/",
        "snippet": "FAO analysis of climate change impacts on global food systems and agriculture.",
        "number": "8"
      },
      {
        "label": "Water Resources Management Review",
        "value": "https://www.unwater.org/water-facts/climate-change/",
        "snippet": "UN Water assessment of climate change impacts on global water resources.",
        "number": "9"
      }
    ],
    "explorations": [
      {
        "label": "What are the latest climate tipping points research?",
        "value": "Can you find recent studies on climate tipping points and irreversible changes?"
      },
      {
        "label": "How do I cite IPCC reports properly?",
        "value": "What's the correct academic citation format for IPCC assessment reports?"
      },
      {
        "label": "Where can I find peer-reviewed climate data?",
        "value": "What are the best databases for peer-reviewed climate research papers?"
      }
    ]
  }
]`;

// Background variant template
export const BackgroundVariantTemplate = (background: string, title: string, description: string) => html`
  <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
    <div style="height: 600px; padding: 1rem; position: relative; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.9); border-radius: var(--spectrum-sys-shape-corner-medium, 6px); backdrop-filter: blur(10px);">
        <h3 style="margin: 0 0 0.5rem 0; color: #333;">${title}</h3>
        <p style="margin: 0; color: #666; font-size: 0.875rem;">${description}</p>
      </div>
      <spectrum-conversation-panel
        .messages=${aiTutorConversation}
        .conversationtitle=${'AI Tutor - ' + title}
        .actions=${'[{"label": "Share", "icon": "share", "value": "share"}]'}
        .background=${background}
        @action=${(e: CustomEvent) => action('Action')(e.detail)}
        @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
        @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
        @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
        @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
      ></spectrum-conversation-panel>
    </div>
  </spectrum-theme>
`;

// Story functions for variant examples
export function OpaqueBackground() {
  return BackgroundVariantTemplate(
    'opaque',
    'Opaque Background',
    'Solid background that completely blocks the backdrop. Best for high-contrast, professional environments.'
  );
}

export function PartialFrostBackground() {
  return BackgroundVariantTemplate(
    'partial-frost',
    'Partial Frost Background',
    'Semi-transparent background with subtle blur effect. Provides good readability while showing some backdrop.'
  );
}

export function FullFrostBackground() {
  return BackgroundVariantTemplate(
    'full-frost',
    'Full Frost Background',
    'Highly frosted glass effect with strong blur. Creates floating, modern aesthetic while maintaining readability.'
  );
}

export function TransparentBackground() {
  return BackgroundVariantTemplate(
    'transparent',
    'Transparent Background',
    'Fully transparent background showing complete backdrop. Use with high-contrast content for readability.'
  );
}

export function AITutorVariant() {
  return html`
    <spectrum-theme color="#4f46e5" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container, #e7f3ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-primary-container);">📚 AI Tutor Conversation</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.875rem;">
            Educational conversation with mathematical content, source citations, and learning explorations.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${aiTutorConversation}
          .conversationtitle=${'Calculus Help Session'}
          .actions=${'[{"label": "Save Notes", "icon": "bookmark", "value": "save"}, {"label": "Share", "icon": "share", "value": "share"}]'}
          .background=${'opaque'}
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

export function CustomerSupportVariant() {
  return html`
    <spectrum-theme color="#10b981" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f0fdf4);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-success-container, #d4edda); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-success-container);">🎧 Customer Support Chat</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-success-container); font-size: 0.875rem;">
            Support conversation with troubleshooting steps, helpful resources, and follow-up suggestions.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${customerSupportConversation}
          .conversationtitle=${'Support Ticket #CS-2024-0145'}
          .actions=${'[{"label": "Escalate", "icon": "person_add", "value": "escalate"}, {"label": "Export Chat", "icon": "download", "value": "export"}, {"label": "Rate Support", "icon": "star", "value": "rate"}]'}
          .background=${'opaque'}
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

export function ResearchAssistantVariant() {
  return html`
    <spectrum-theme color="#7c3aed" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #faf5ff);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-secondary-container, #f3e8ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-secondary-container);">🔬 Research Assistant</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-secondary-container); font-size: 0.875rem;">
            Academic research conversation with extensive citations, grouped references, and research guidance.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${researchAssistantConversation}
          .conversationtitle=${'Climate Change Research Project'}
          .actions=${'[{"label": "Export Bibliography", "icon": "assignment", "value": "bibliography"}, {"label": "Generate Citation", "icon": "format_quote", "value": "cite"}, {"label": "Share Sources", "icon": "share", "value": "share"}]'}
          .background=${'opaque'}
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

export function DarkThemeVariant() {
  return html`
    <spectrum-theme color="#1f2937" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: #111827; color: #f9fafb;">
        <div style="margin-bottom: 1rem; padding: 1rem; background: #374151; border-radius: var(--spectrum-sys-shape-corner-medium, 6px); border: 1px solid #4b5563;">
          <h3 style="margin: 0 0 0.5rem 0; color: #f9fafb;">🌙 Dark Theme Conversation</h3>
          <p style="margin: 0; color: #d1d5db; font-size: 0.875rem;">
            Dark theme variant for low-light environments and modern aesthetics.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${aiTutorConversation}
          .conversationtitle=${'Dark Mode Session'}
          .actions=${'[{"label": "Toggle Theme", "icon": "dark_mode", "value": "theme"}, {"label": "Share", "icon": "share", "value": "share"}]'}
          .background=${'opaque'}
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

export function MobileOptimizedVariant() {
  return html`
    <spectrum-theme color="#ec4899" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; width: 375px; margin: 0 auto; padding: 0.5rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #fdf2f8); border: 1px solid #d1d5db; border-radius: 12px;">
        <div style="margin-bottom: 0.5rem; padding: 0.75rem; background: var(--spectrum-sys-color-surface, #fff); border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 0.25rem 0; font-size: 1rem; color: var(--spectrum-sys-color-on-surface);">📱 Mobile Optimized</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.75rem;">
            Mobile-first design with touch-friendly interactions and responsive layout.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${customerSupportConversation}
          .conversationtitle=${'Mobile Support Chat'}
          .actions=${'[{"label": "Call", "icon": "phone", "value": "call"}, {"label": "Share", "icon": "share", "value": "share"}]'}
          .background=${'opaque'}
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