import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumCookieCompliance Component
 * 
 * A comprehensive GDPR-compliant cookie consent component that manages user preferences and integrates with Google Tag Manager.
 * 
 * ### Key Features
 * - **GDPR Compliance**: Full compliance with European data protection regulations
 * - **Google Tag Manager Integration**: Automatic consent mode configuration
 * - **Flexible Positioning**: Top, bottom, or center modal positioning
 * - **Detailed Cookie Options**: Granular control over cookie categories
 * - **Persistent Storage**: Stores user preferences with versioning
 * 
 * ### Usage Guidelines
 * - **Use for**: GDPR compliance, cookie consent management, privacy compliance
 * - **Avoid when**: For non-cookie related consent or simple alerts
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **consentUpdated**: Emitted when user updates consent preferences
 * - **consentDismissed**: Emitted when consent banner is dismissed

 */

// Type definition for translations (duplicated here to avoid import issues)
interface CookieTranslations {
  toastTitle?: string;
  acceptAll?: string;
  rejectAll?: string;
  customize?: string;
  dialog?: {
    title?: string;
    description?: string;
    savePreferences?: string;
  };
  categories?: {
    necessary?: { label?: string; description?: string; };
    analytics?: { label?: string; description?: string; };
    marketing?: { label?: string; description?: string; };
    preferences?: { label?: string; description?: string; };
  };
  policyLinks?: {
    learnMore?: string;
    privacyPolicy?: string;
    cookiePolicy?: string;
  };
  accessibility?: {
    cookiesEnabled?: string;
    cookiesDisabled?: string;
  };
}

// Component interfaces for TypeScript support
interface SpectrumCookieComplianceElement extends HTMLElement {
  message: string;
  position: 'top' | 'bottom' | 'center';
  showDetails: boolean;
  showCookieStatus: boolean;
  showOnFirstVisit: boolean;
  cookieName: string;
  cookieExpireDays: number;
  gtmContainerId: string;
  autoLoadGTM: boolean;
  privacyPolicyUrl: string;
  cookiePolicyUrl: string;
  consentVersion: string;
  debug: boolean;
  translations: CookieTranslations;
}

// Story arguments interface
interface SpectrumCookieComplianceArgs extends SpectrumCookieComplianceElement {}

const meta: Meta<SpectrumCookieComplianceArgs> = {
  title: 'Spectrum/Components/SpectrumCookieCompliance',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A comprehensive GDPR-compliant cookie consent component that manages user preferences and integrates with Google Tag Manager.

### Cookie Categories
- **Necessary**: Always enabled, essential for website functionality
- **Analytics**: Track website usage and performance metrics  
- **Marketing**: Personalized advertising and campaign tracking
- **Preferences**: Remember user choices and settings

### Event System
- **consentUpdated**: Emitted when user updates consent with full consent object
- **consentDismissed**: Emitted when consent banner is dismissed

### Basic Usage
Configure the component with your GTM container ID and customize the consent message and positioning.
        `
      }
    }
  },
  args: {
    message: 'We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.',
    position: 'bottom',
    showDetails: true,
    showCookieStatus: false,
    showOnFirstVisit: true,
    cookieName: 'spectrum_cookie_consent_demo',
    cookieExpireDays: 365,
    gtmContainerId: 'GTM-XXXXXXX',
    autoLoadGTM: false,
    privacyPolicyUrl: '/privacy-policy',
    cookiePolicyUrl: '/cookie-policy',
    consentVersion: '1.0.0',
    debug: false,
    translations: {}
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Custom message to display in the consent banner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking Accept All, you consent to our use of cookies.' }
      }
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'center'],
      description: 'Position of the consent banner (center creates modal overlay)',
      table: {
        type: { summary: `'top' | 'bottom' | 'center'` },
        defaultValue: { summary: 'bottom' }
      }
    },
    showDetails: {
      control: 'boolean',
      description: 'Whether to show detailed cookie category options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showCookieStatus: {
      control: 'boolean',
      description: 'Whether to show the persistent cookie status indicator (sticky icon) that allows relaunching the consent banner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumCookieComplianceArgs>;

// Helper function for reset button
const handleResetDemo = () => {
  // Clear all possible demo cookies
  const cookieNames = [
    'spectrum_cookie_consent_demo',
    'spectrum_cookie_consent',
    'gtm_demo_consent',
    'custom_consent'
  ];
  
  cookieNames.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  // Force component to reset and show
  const component = document.querySelector('spectrum-cookie-compliance');
  if (component) {
    (component as any).resetConsent?.();
    // Force a small delay to ensure the component processes the reset
    setTimeout(() => {
      (component as any).showConsent?.();
    }, 100);
  }
  
  // Reload the page to ensure clean state
  setTimeout(() => {
    window.location.reload();
  }, 200);
};

// Interactive render function with forced visibility
const renderSpectrumCookieCompliance = (args: SpectrumCookieComplianceArgs) => {
  // Clear demo cookies on every render
  const cookieNames = [
    'spectrum_cookie_consent_demo',
    'spectrum_cookie_consent', 
    'gtm_demo_consent',
    'custom_consent'
  ];
  
  cookieNames.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  return html`
    <div style="padding: 2rem; min-height: 500px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; position: relative;">
      <div style="text-align: center; padding: 2rem;">
        <h2>Cookie Compliance Demo</h2>
        <p>The consent banner should appear below. If not visible, click "Reset Demo" to clear all cookies and refresh.</p>
        <button @click=${handleResetDemo} style="padding: 8px 16px; margin-top: 1rem; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reset Demo & Refresh
        </button>
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.1); border-radius: 4px; font-size: 0.875rem;">
          <strong>Demo Instructions:</strong><br/>
          1. The consent banner should appear at the ${args.position} of this demo area<br/>
          2. Try "Accept All", "Reject All", or "Customize" (if enabled)<br/>
          3. Check browser console for event logs<br/>
          4. Use "Reset Demo" to see the banner again
        </div>
      </div>
      
      <spectrum-cookie-compliance
        .message=${args.message}
        .position=${args.position}
        .showDetails=${args.showDetails}
        .showCookieStatus=${args.showCookieStatus}
        .showOnFirstVisit=${true}
        .cookieName=${args.cookieName || 'spectrum_cookie_consent_demo'}
        .cookieExpireDays=${args.cookieExpireDays}
        .gtmContainerId=${args.gtmContainerId}
        .autoLoadGTM=${args.autoLoadGTM}
        .privacyPolicyUrl=${args.privacyPolicyUrl}
        .cookiePolicyUrl=${args.cookiePolicyUrl}
        .consentVersion=${args.consentVersion}
        .debug=${args.debug}
        .translations=${args.translations || {}}
        @consentUpdated=${action('consentUpdated')}
        @consentDismissed=${action('consentDismissed')}
      >
      </spectrum-cookie-compliance>
      
      <div style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem; padding: 1rem; background: rgba(255,255,255,0.9); border-radius: 4px; font-size: 0.75rem; border: 1px solid #ddd;">
        <strong>Current Settings:</strong> Position: ${args.position}, Show Details: ${args.showDetails ? 'Yes' : 'No'}, GTM: ${args.gtmContainerId || 'Not configured'}, Auto-load: ${args.autoLoadGTM ? 'Yes' : 'No'}
      </div>
    </div>
  `;
};

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumCookieCompliance,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic component configuration showing default usage.
 */
export const BasicExample: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    showDetails: false,
    position: 'bottom'
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic cookie consent banner with Accept All and Reject All options. Perfect for simple GDPR compliance.
        `
      }
    }
  }
};

/**
 * Force show the consent banner for demonstration purposes.
 */
export const ForceShow: Story = {
  render: (args) => {
    // Simple render that always shows the component
    return html`
      <div style="padding: 2rem; min-height: 400px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; position: relative;">
        <div style="text-align: center; padding: 1rem; margin-bottom: 2rem; background: rgba(0,100,200,0.1); border-radius: 4px;">
          <h3>🍪 Cookie Consent Demo</h3>
          <p>This story forces the consent banner to show. Try the different interactions!</p>
        </div>
        
        <spectrum-cookie-compliance
          .message=${args.message}
          .position=${args.position}
          .showDetails=${args.showDetails}
          .showCookieStatus=${args.showCookieStatus}
          .showOnFirstVisit=${true}
          .cookieName=${'force_show_demo_' + Date.now()} // Unique cookie name to force showing
          .cookieExpireDays=${365}
          .gtmContainerId=${'GTM-DEMO123'}
          .autoLoadGTM=${false}
          .privacyPolicyUrl=${'/privacy-policy'}
          .cookiePolicyUrl=${'/cookie-policy'}
          .consentVersion=${'1.0.0'}
          .debug=${false}
          @consentUpdated=${action('consentUpdated')}
          @consentDismissed=${action('consentDismissed')}
        >
        </spectrum-cookie-compliance>
      </div>
    `;
  },
  args: {
    showDetails: false,
    position: 'bottom',
    message: 'We use cookies to enhance your experience. Please choose your preferences.'
  },
  parameters: {
    docs: {
      description: {
        story: `
This story forces the cookie consent banner to appear by using a unique cookie name on each render. 
Perfect for testing and demonstration without needing to reset cookies.
        `
      }
    }
  }
};

/**
 * Component with detailed cookie options enabled.
 */
export const WithDetailedOptions: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    showDetails: true,
    position: 'bottom'
  },
  parameters: {
    docs: {
      description: {
        story: `
Cookie consent with detailed options allowing users to customize their cookie preferences by category.
        `
      }
    }
  }
};

/**
 * Component positioned at the top of the screen.
 */
export const TopPosition: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    position: 'top',
    showDetails: true
  },
  parameters: {
    docs: {
      description: {
        story: `
Cookie consent banner positioned at the top of the screen instead of the bottom.
        `
      }
    }
  }
};

/**
 * Component as a center modal with backdrop.
 */
export const CenterModal: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    position: 'center',
    showDetails: true,
    message: 'This website uses cookies to improve your experience. Please choose your cookie preferences below.'
  },
  parameters: {
    docs: {
      description: {
        story: `
Cookie consent as a modal dialog in the center of the screen with backdrop overlay.
        `
      }
    }
  }
};

/**
 * Component with Google Tag Manager integration.
 */
export const WithGTMIntegration: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    showOnFirstVisit: true,
    cookieName: 'gtm_demo_consent',
    cookieExpireDays: 365,
    gtmContainerId: 'GTM-DEMO123',
    autoLoadGTM: false,
    privacyPolicyUrl: 'https://example.com/privacy',
    cookiePolicyUrl: 'https://example.com/cookies',
    consentVersion: '1.0.0',
    debug: false,
    showDetails: true,
    message: 'We use cookies and similar technologies to provide the best experience on our website. You can manage your preferences below.'
  },
  parameters: {
    docs: {
      description: {
        story: `
Cookie consent configured with Google Tag Manager integration for comprehensive tracking consent management.
        `
      }
    }
  }
};

// Auto-loading GTM story
export const AutoLoadGTM: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    message: 'This example demonstrates automatic GTM script loading. The component will inject the GTM script when consent is granted.',
    position: 'bottom',
    showDetails: true,
    showOnFirstVisit: true,
    cookieName: 'spectrum_cookie_consent_autogtm',
    cookieExpireDays: 365,
    gtmContainerId: 'GTM-DEMO456',
    autoLoadGTM: true, // Enable automatic GTM script loading
    privacyPolicyUrl: 'https://example.com/privacy',
    cookiePolicyUrl: 'https://example.com/cookies',
    consentVersion: '1.0.0',
    debug: false
  },
  parameters: {
    docs: {
      description: {
        story: `
**Auto-Loading GTM Example**

When \`autoLoadGTM: true\` is set in the config, the component will automatically:
1. Inject the Google Tag Manager script into the page
2. Initialize the dataLayer
3. Handle consent mode updates
4. Manage script loading state to prevent duplicates

This is useful when you want the cookie compliance component to be fully self-contained and handle GTM integration automatically.

**Note**: Set \`autoLoadGTM: false\` (default) if GTM is already loaded on your page.
        `
      }
    }
  }
};

// Special render function for cookie status demo that doesn't clear the status cookie
const renderCookieStatusDemo = (args: SpectrumCookieComplianceArgs) => {
  // Clear other demo cookies but preserve the status demo cookie
  const cookieNames = [
    'spectrum_cookie_consent_demo',
    'spectrum_cookie_consent', 
    'gtm_demo_consent',
    'custom_consent',
    'spectrum_cookie_consent_autogtm' // Don't clear status demo cookie
  ];
  
  cookieNames.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  return html`
    <div style="padding: 2rem; min-height: 500px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; position: relative;">
      <div style="text-align: center; padding: 2rem;">
        <h2>Cookie Status Indicator Demo</h2>
        <p>First, make a consent choice to see the status indicator. Then it will persist in the bottom-right corner.</p>
        <button @click=${() => {
          // Clear status cookie to reset demo
          document.cookie = `spectrum_cookie_consent_status_demo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          window.location.reload();
        }} style="padding: 8px 16px; margin-top: 1rem; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reset Status Demo
        </button>
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.1); border-radius: 4px; font-size: 0.875rem;">
          <strong>Demo Instructions:</strong><br/>
          1. Make a consent choice (Accept All, Reject All, or Customize)<br/>
          2. Notice the cookie status icon appears in the bottom-right corner<br/>
          3. The icon shows your current tracking status (cookie 🍪 or block 🚫)<br/>
          4. Click the icon to reopen the consent banner<br/>
          5. Use "Reset Status Demo" to clear and start over
        </div>
      </div>
      
      <spectrum-cookie-compliance
        .message=${args.message}
        .position=${args.position}
        .showDetails=${args.showDetails}
        .showCookieStatus=${args.showCookieStatus}
        .showOnFirstVisit=${true}
        .cookieName=${args.cookieName || 'spectrum_cookie_consent_status_demo'}
        .cookieExpireDays=${args.cookieExpireDays}
        .gtmContainerId=${args.gtmContainerId}
        .autoLoadGTM=${args.autoLoadGTM}
        .privacyPolicyUrl=${args.privacyPolicyUrl}
        .cookiePolicyUrl=${args.cookiePolicyUrl}
        .consentVersion=${args.consentVersion}
        .debug=${args.debug}
        @consentUpdated=${action('consentUpdated')}
        @consentDismissed=${action('consentDismissed')}
      >
      </spectrum-cookie-compliance>
      
      <div style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem; padding: 1rem; background: rgba(255,255,255,0.9); border-radius: 4px; font-size: 0.75rem; border: 1px solid #ddd;">
        <strong>Current Settings:</strong> Position: ${args.position}, Show Details: ${args.showDetails ? 'Yes' : 'No'}, Status Indicator: ${args.showCookieStatus ? 'Enabled' : 'Disabled'}
      </div>
    </div>
  `;
};

// Cookie status indicator story
export const CookieStatusIndicator: Story = {
  render: renderCookieStatusDemo,
  args: {
    message: 'This example demonstrates the cookie status indicator. Accept or reject cookies first, then see the sticky icon in the bottom-right corner.',
    position: 'bottom',
    showDetails: true,
    showCookieStatus: true, // Enable the cookie status indicator
    showOnFirstVisit: true,
    cookieName: 'spectrum_cookie_consent_status_demo',
    cookieExpireDays: 365,
    gtmContainerId: 'GTM-STATUS',
    autoLoadGTM: false,
    privacyPolicyUrl: 'https://example.com/privacy',
    cookiePolicyUrl: 'https://example.com/cookies',
    consentVersion: '1.0.0',
    debug: false
  },
  parameters: {
    docs: {
      description: {
        story: `
**Cookie Status Indicator Example**

When \`showCookieStatus: true\` is set, the component will display a persistent cookie status icon:

1. **Cookie Icon**: Shows when any tracking cookies are enabled (analytics, marketing, or preferences)
2. **No-Cookie Icon**: Shows when all tracking cookies are disabled (only necessary cookies enabled)
3. **Bottom-Right Position**: Sticky positioning in the bottom-right corner
4. **Click to Reopen**: Clicking the icon relaunches the simple consent toast
5. **Responsive Design**: Adjusts size and position on mobile devices

The status indicator only appears after the user has made an initial consent choice and is useful for:
- Allowing users to review and change their cookie preferences
- Providing visual feedback about current cookie consent status
- Meeting GDPR requirements for easy access to consent management
        `
      }
    }
  }
};

// Localization example story  
export const LocalizationExample: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    message: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic du site et personnaliser le contenu. En cliquant sur "Tout accepter", vous consentez à notre utilisation des cookies.',
    position: 'bottom',
    showDetails: true,
    showCookieStatus: false,
    showOnFirstVisit: true,
    cookieName: 'spectrum_cookie_consent_fr_demo',
    cookieExpireDays: 365,
    gtmContainerId: 'GTM-FRENCH',
    autoLoadGTM: false,
    privacyPolicyUrl: 'https://example.com/politique-de-confidentialite',
    cookiePolicyUrl: 'https://example.com/politique-des-cookies',
    consentVersion: '1.0.0',
    debug: false,
    // Single translations object - much cleaner! 🎯
    translations: {
      toastTitle: 'Consentement aux Cookies',
      acceptAll: 'Tout Accepter',
      rejectAll: 'Tout Refuser',
      customize: 'Personnaliser',
      dialog: {
        title: 'Préférences des Cookies',
        description: 'Choisissez quels types de cookies vous souhaitez autoriser. Vous pouvez modifier ces paramètres à tout moment.',
        savePreferences: 'Enregistrer les Préférences'
      },
      categories: {
        necessary: {
          label: 'Cookies Nécessaires',
          description: 'Essentiels au bon fonctionnement du site Web et ne peuvent pas être désactivés.'
        },
        analytics: {
          label: 'Cookies d\'Analyse',
          description: 'Nous aident à comprendre comment les visiteurs interagissent avec notre site Web.'
        },
        marketing: {
          label: 'Cookies Marketing',
          description: 'Utilisés pour diffuser des publicités personnalisées.'
        },
        preferences: {
          label: 'Cookies de Préférence',
          description: 'Mémorisent vos choix et préférences.'
        }
      },
      policyLinks: {
        learnMore: 'En Savoir Plus :',
        privacyPolicy: 'Politique de Confidentialité',
        cookiePolicy: 'Politique des Cookies'
      },
      accessibility: {
        cookiesEnabled: 'Cookies activés - cliquez pour gérer les préférences',
        cookiesDisabled: 'Cookies désactivés - cliquez pour gérer les préférences'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**🌐 Single Translation Object Approach**

This story demonstrates the **improved localization approach** using a single \`translations\` object instead of 21+ individual props.

### ✅ **Much Better Than Before**:

**❌ Old approach (verbose)**:
\`\`\`typescript
<spectrum-cookie-compliance
  toastTitle="Consentement aux Cookies"
  acceptAllLabel="Tout Accepter"
  rejectAllLabel="Tout Refuser" 
  customizeLabel="Personnaliser"
  dialogTitle="Préférences des Cookies"
  dialogDescription="Choisissez quels types..."
  necessaryCookiesLabel="Cookies Nécessaires"
  necessaryCookiesDescription="Essentiels au..."
  // ... 13 more individual props! 😰
/>
\`\`\`

**✅ New approach (clean & organized)**:
\`\`\`typescript
const frenchTranslations = {
  toastTitle: 'Consentement aux Cookies',
  acceptAll: 'Tout Accepter',
  rejectAll: 'Tout Refuser',
  customize: 'Personnaliser',
  dialog: {
    title: 'Préférences des Cookies',
    description: 'Choisissez quels types de cookies vous souhaitez autoriser.',
    savePreferences: 'Enregistrer les Préférences'
  },
  categories: {
    necessary: { label: 'Cookies Nécessaires', description: '...' },
    analytics: { label: 'Cookies d\\'Analyse', description: '...' },
    // etc...
  }
};

<spectrum-cookie-compliance 
  translations={frenchTranslations} 
/>
\`\`\`

### 🚀 **Benefits**:
- **Cleaner API**: One prop instead of 21+
- **Better organization**: Logical grouping of related strings
- **Partial overrides**: Only specify what you want to change
- **TypeScript support**: Full intellisense and type safety
- **Translation system friendly**: Perfect for i18next, react-intl, etc.

### 💡 **Integration Examples**:

\`\`\`typescript
// With i18next
<spectrum-cookie-compliance 
  translations={t('cookieConsent', { returnObjects: true })} 
/>

// With static imports  
import frenchTranslations from './translations/fr.json';
<spectrum-cookie-compliance translations={frenchTranslations} />

// Partial overrides only
<spectrum-cookie-compliance 
  translations={{ 
    acceptAll: 'Oui, tout accepter!',
    rejectAll: 'Non merci' 
  }} 
/>
\`\`\`

**Perfect for global applications! 🌍✨**
        `
      }
    }
  }
};

// Alternative layout solutions story
export const TranslationLayoutSolutions: Story = {
  render: renderSpectrumCookieCompliance,
  args: {
    message: 'Nous utilisons des cookies pour améliorer significativement votre expérience utilisateur, analyser en détail le trafic du site et personnaliser le contenu selon vos préférences.',
    position: 'bottom',
    showDetails: true,
    showCookieStatus: false,
    showOnFirstVisit: true,
    cookieName: 'spectrum_cookie_consent_layout_demo',
    cookieExpireDays: 365,
    gtmContainerId: 'GTM-LAYOUT',
    autoLoadGTM: false,
    privacyPolicyUrl: 'https://example.com/politique-de-confidentialite',
    cookiePolicyUrl: 'https://example.com/politique-des-cookies',
    consentVersion: '1.0.0',
    debug: false,
    // Very long translations to test layout
    translations: {
      toastTitle: 'Consentement aux Cookies et Confidentialité',
      acceptAll: 'Tout Accepter et Continuer',
      rejectAll: 'Tout Refuser Catégoriquement',
      customize: 'Personnaliser en Détail',
      dialog: {
        title: 'Préférences Détaillées des Cookies',
        description: 'Choisissez précisément quels types de cookies vous souhaitez autoriser pour personnaliser votre expérience. Vous pouvez modifier ces paramètres à tout moment selon vos préférences.',
        savePreferences: 'Enregistrer Mes Préférences'
      },
      categories: {
        necessary: {
          label: 'Cookies Strictement Nécessaires',
          description: 'Ces cookies sont absolument essentiels au bon fonctionnement du site Web et ne peuvent pas être désactivés.'
        },
        analytics: {
          label: 'Cookies d\'Analyse et Statistiques',
          description: 'Ces cookies nous aident à comprendre en détail comment les visiteurs interagissent avec notre site Web.'
        },
        marketing: {
          label: 'Cookies Marketing et Publicité',
          description: 'Ces cookies sont utilisés pour diffuser des publicités personnalisées et des campagnes marketing ciblées.'
        },
        preferences: {
          label: 'Cookies de Préférences Utilisateur',
          description: 'Ces cookies mémorisent vos choix personnels et vos préférences de navigation.'
        }
      },
      policyLinks: {
        learnMore: 'Pour En Savoir Plus :',
        privacyPolicy: 'Politique de Confidentialité Complète',
        cookiePolicy: 'Politique Détaillée des Cookies'
      },
      accessibility: {
        cookiesEnabled: 'Cookies activés - cliquez pour gérer vos préférences détaillées',
        cookiesDisabled: 'Cookies désactivés - cliquez pour gérer vos préférences détaillées'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
**🔧 Layout Solutions for Long Translations**

This story demonstrates how the component handles **very long translations** with multiple layout improvement strategies.

### ✅ **Implemented Solutions**:

#### **1. Enhanced Toast Component** ⭐ *(Clean Architecture)*
- **Added**: \`maxWidth\` and \`minWidth\` props to \`spectrum-toast\`
- **Before**: Fixed \`max-width: 480px\` 
- **After**: Configurable \`max-width: 640px\` + \`min-width: 400px\`
- **Result**: 33% more space for button text without CSS hacks

#### **2. Cookie Compliance Integration**
- **Toast Usage**: \`<spectrum-toast maxWidth="640px" minWidth="400px">\`
- **Proper API**: Uses component props instead of CSS overrides
- **Maintainable**: Changes isolated to toast component

#### **3. Clean Component Architecture**
- **No CSS Overrides**: No \`!important\` or specificity battles
- **Reusable**: Other components can also use custom toast sizing
- **Type Safe**: Full TypeScript support for new props

### 🎯 **Alternative Solutions Available**:

#### **Option A: Shorter Button Text** 
\`\`\`typescript
translations: {
  acceptAll: 'Accepter',     // Instead of 'Tout Accepter et Continuer'
  rejectAll: 'Refuser',      // Instead of 'Tout Refuser Catégoriquement'  
  customize: 'Options'       // Instead of 'Personnaliser en Détail'
}
\`\`\`

#### **Option B: Vertical Button Layout**
Force vertical stacking with CSS:
\`\`\`css
.spectrum-cookie-compliance__actions {
  flex-direction: column !important;
}
\`\`\`

#### **Option C: Icon + Text Buttons**
\`\`\`typescript
<spectrum-button 
  leftIcon="check"
  buttonText="Accepter"
  showLeftIcon={true}
  showButtonText={true}
/>
\`\`\`

#### **Option D: Toast Component Enhancement** ⭐ *(Implemented)*
Enhanced the \`spectrum-toast\` component itself:
\`\`\`typescript
// New toast props for custom sizing
<spectrum-toast 
  maxWidth="640px"    // Custom max width
  minWidth="400px"    // Custom min width
  // ... other props
/>
\`\`\`

#### **Option E: Modal for Detailed Options**
Use the existing dialog approach (already implemented) for detailed options instead of cramming everything in the toast.

### 📱 **Responsive Behavior**:
- **Desktop (>640px)**: Horizontal layout, wider toast
- **Tablet (480-640px)**: Horizontal with wrapping  
- **Mobile (<480px)**: Vertical stacking, full-width buttons

**Try resizing your browser to see the responsive behavior! 📱💻**
        `
      }
    }
  }
};