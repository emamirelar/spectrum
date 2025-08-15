import { Component, Host, h, Prop, State, Event, EventEmitter, Method, Watch } from '@stencil/core';

/**
 * Cookie consent types for GDPR compliance
 */
export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  version: string;
}



/**
 * Translation interface for comprehensive localization support
 */
export interface CookieTranslations {
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
    necessary?: {
      label?: string;
      description?: string;
    };
    analytics?: {
      label?: string;
      description?: string;
    };
    marketing?: {
      label?: string;
      description?: string;
    };
    preferences?: {
      label?: string;
      description?: string;
    };
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

/**
 * Google Tag Manager dataLayer event
 */
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

@Component({
  tag: 'spectrum-cookie-compliance',
  styleUrl: 'spectrum-cookie-compliance.scss',
  shadow: true,
})
export class SpectrumCookieCompliance {
  /**
   * Custom message to display in the consent banner
   */
  @Prop() message: string = 'We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.';

  /**
   * Position of the consent banner
   */
  @Prop() position: 'top' | 'bottom' | 'center' = 'bottom';

  /**
   * Whether to show detailed cookie options
   */
  @Prop() showDetails: boolean = false;

  /**
   * Whether to show the banner on first visit
   */
  @Prop() showOnFirstVisit: boolean = true;

  /**
   * Cookie name for storing consent preferences
   */
  @Prop() cookieName: string = 'spectrum_cookie_consent';

  /**
   * Number of days before cookie expires
   */
  @Prop() cookieExpireDays: number = 365;

  /**
   * Google Tag Manager container ID
   */
  @Prop() gtmContainerId: string = '';

  /**
   * Automatically load GTM script when consent is granted
   */
  @Prop() autoLoadGTM: boolean = false;

  /**
   * URL to privacy policy page
   */
  @Prop() privacyPolicyUrl: string = '/privacy-policy';

  /**
   * URL to cookie policy page  
   */
  @Prop() cookiePolicyUrl: string = '/cookie-policy';

  /**
   * Consent version for tracking updates
   */
  @Prop() consentVersion: string = '1.0.0';

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  // ==============================================
  // Localization Support
  // ==============================================

  /**
   * Translation object for customizing all user-facing text.
   * Provide only the strings you want to override - missing values will use English defaults.
   * 
   * @example
   * ```typescript
   * // French translation
   * const frenchTranslations = {
   *   toastTitle: 'Consentement aux Cookies',
   *   acceptAll: 'Tout Accepter',
   *   rejectAll: 'Tout Refuser',
   *   customize: 'Personnaliser',
   *   dialog: {
   *     title: 'Préférences des Cookies',
   *     description: 'Choisissez quels types de cookies vous souhaitez autoriser.',
   *     savePreferences: 'Enregistrer les Préférences'
   *   },
   *   categories: {
   *     necessary: {
   *       label: 'Cookies Nécessaires',
   *       description: 'Essentiels au bon fonctionnement du site Web.'
   *     }
   *   }
   * };
   * ```
   */
  @Prop() translations: CookieTranslations = {};

  /**
   * Whether to show the cookie status indicator (sticky icon)
   */
  @Prop() showCookieStatus: boolean = false;

  // ==============================================
  // Default English Translations
  // ==============================================

  private readonly defaultTranslations: CookieTranslations = {
    toastTitle: 'Cookie Consent',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    customize: 'Customize',
    dialog: {
      title: 'Cookie Preferences',
      description: 'Choose which types of cookies you want to allow. You can change these settings at any time.',
      savePreferences: 'Save Preferences'
    },
    categories: {
      necessary: {
        label: 'Necessary Cookies',
        description: 'Essential for the website to function properly and cannot be disabled.'
      },
      analytics: {
        label: 'Analytics Cookies',
        description: 'Help us understand how visitors interact with our website.'
      },
      marketing: {
        label: 'Marketing Cookies',
        description: 'Used to deliver personalized advertisements.'
      },
      preferences: {
        label: 'Preference Cookies',
        description: 'Remember your choices and preferences.'
      }
    },
    policyLinks: {
      learnMore: 'Learn More:',
      privacyPolicy: 'Privacy Policy',
      cookiePolicy: 'Cookie Policy'
    },
    accessibility: {
      cookiesEnabled: 'Cookies enabled - click to manage preferences',
      cookiesDisabled: 'Cookies disabled - click to manage preferences'
    }
  };

  /**
   * Get merged translations (defaults + user overrides)
   */
  private getTranslations(): CookieTranslations {
    return {
      toastTitle: this.translations.toastTitle ?? this.defaultTranslations.toastTitle,
      acceptAll: this.translations.acceptAll ?? this.defaultTranslations.acceptAll,
      rejectAll: this.translations.rejectAll ?? this.defaultTranslations.rejectAll,
      customize: this.translations.customize ?? this.defaultTranslations.customize,
      dialog: {
        title: this.translations.dialog?.title ?? this.defaultTranslations.dialog.title,
        description: this.translations.dialog?.description ?? this.defaultTranslations.dialog.description,
        savePreferences: this.translations.dialog?.savePreferences ?? this.defaultTranslations.dialog.savePreferences
      },
      categories: {
        necessary: {
          label: this.translations.categories?.necessary?.label ?? this.defaultTranslations.categories.necessary.label,
          description: this.translations.categories?.necessary?.description ?? this.defaultTranslations.categories.necessary.description
        },
        analytics: {
          label: this.translations.categories?.analytics?.label ?? this.defaultTranslations.categories.analytics.label,
          description: this.translations.categories?.analytics?.description ?? this.defaultTranslations.categories.analytics.description
        },
        marketing: {
          label: this.translations.categories?.marketing?.label ?? this.defaultTranslations.categories.marketing.label,
          description: this.translations.categories?.marketing?.description ?? this.defaultTranslations.categories.marketing.description
        },
        preferences: {
          label: this.translations.categories?.preferences?.label ?? this.defaultTranslations.categories.preferences.label,
          description: this.translations.categories?.preferences?.description ?? this.defaultTranslations.categories.preferences.description
        }
      },
      policyLinks: {
        learnMore: this.translations.policyLinks?.learnMore ?? this.defaultTranslations.policyLinks.learnMore,
        privacyPolicy: this.translations.policyLinks?.privacyPolicy ?? this.defaultTranslations.policyLinks.privacyPolicy,
        cookiePolicy: this.translations.policyLinks?.cookiePolicy ?? this.defaultTranslations.policyLinks.cookiePolicy
      },
      accessibility: {
        cookiesEnabled: this.translations.accessibility?.cookiesEnabled ?? this.defaultTranslations.accessibility.cookiesEnabled,
        cookiesDisabled: this.translations.accessibility?.cookiesDisabled ?? this.defaultTranslations.accessibility.cookiesDisabled
      }
    };
  }

  /**
   * Whether the consent banner is currently visible
   */
  @State() isVisible: boolean = false;

  /**
   * Whether the detailed options are expanded
   */
  @State() showDetailedOptions: boolean = false;

  /**
   * Current consent state
   */
  @State() currentConsent: CookieConsent | null = null;

  /**
   * Event emitted when consent is given or updated
   */
  @Event() consentUpdated: EventEmitter<CookieConsent>;

  /**
   * Event emitted when consent banner is dismissed
   */
  @Event() consentDismissed: EventEmitter<void>;



  componentDidLoad() {
    this.initializeComponent();
  }

  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`🍪 [Cookie-Compliance] ${message}`, ...args);
    }
  }

  /**
   * Check if any tracking cookies are enabled
   */
  private hasTrackingEnabled(): boolean {
    if (!this.currentConsent) return false;
    return this.currentConsent.analytics || this.currentConsent.marketing || this.currentConsent.preferences;
  }

  @Watch('gtmContainerId')
  @Watch('cookieName')
  @Watch('showOnFirstVisit')
  propsChanged() {
    this.initializeComponent();
  }

  private async initializeComponent() {
    const existingConsent = await this.getStoredConsent();

    if (existingConsent && existingConsent.version === this.consentVersion) {
      this.currentConsent = existingConsent;
      this.applyConsent(existingConsent);
      this.isVisible = false;
    } else {
      this.isVisible = this.showOnFirstVisit;
    }
  }

  /**
   * Get stored consent from cookies
   */
  @Method()
  async getStoredConsent(): Promise<CookieConsent | null> {
    const cookieValue = this.getCookie(this.cookieName);
    
    if (!cookieValue) return null;

    try {
      return JSON.parse(decodeURIComponent(cookieValue));
    } catch {
      return null;
    }
  }

  /**
   * Update consent preferences
   */
  @Method()
  async updateConsent(consent: Partial<CookieConsent>): Promise<void> {
    const newConsent: CookieConsent = {
      necessary: true, // Always required
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      preferences: consent.preferences ?? false,
      timestamp: Date.now(),
      version: this.consentVersion
    };

    this.currentConsent = newConsent;
    this.storeConsent(newConsent);
    this.applyConsent(newConsent);
    this.consentUpdated.emit(newConsent);
    this.hideConsent();
  }

  /**
   * Show the consent banner
   */
  @Method()
  async showConsent(): Promise<void> {
    this.isVisible = true;
  }

  /**
   * Hide the consent banner
   */
  @Method()
  async hideConsent(): Promise<void> {
    this.isVisible = false;
    this.showDetailedOptions = false;
    this.consentDismissed.emit();
  }

  /**
   * Reset all consent preferences
   */
  @Method()
  async resetConsent(): Promise<void> {
    this.deleteCookie(this.cookieName);
    this.currentConsent = null;
    this.isVisible = true;
    this.removeGTMConsent();
  }

  private storeConsent(consent: CookieConsent): void {
    const cookieValue = encodeURIComponent(JSON.stringify(consent));
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.cookieExpireDays);
    
    document.cookie = `${this.cookieName}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }

  private applyConsent(consent: CookieConsent): void {
    this.updateGTMConsent(consent);
    this.updateGoogleAnalytics(consent);
  }

  /**
   * Initialize basic GTM infrastructure (dataLayer and gtag function)
   */
  private initializeGTMBasics(): void {
    this.debugLog('Initializing GTM basics...');
    this.debugLog('Current window.gtag:', typeof window.gtag);
    this.debugLog('Current window.dataLayer:', window.dataLayer);
    
    // Force initialize dataLayer on the top-level window
    const topWindow = window.top || window.parent || window;
    topWindow.dataLayer = topWindow.dataLayer || [];
    window.dataLayer = topWindow.dataLayer;
    
    // Force initialize gtag function on the top-level window
    if (!topWindow.gtag) {
      topWindow.gtag = function gtag() {
        topWindow.dataLayer = topWindow.dataLayer || [];
        topWindow.dataLayer.push(arguments);
      };
      this.debugLog('Initialized gtag function on top window');
    }
    
    // Also set on current window
    window.gtag = topWindow.gtag;
    
    this.debugLog('GTM basics initialized:', {
      windowGtag: typeof window.gtag,
      topWindowGtag: typeof topWindow.gtag,
      windowDataLayer: window.dataLayer?.length || 'undefined',
      topWindowDataLayer: topWindow.dataLayer?.length || 'undefined'
    });
    
    // Test immediately
    if (window.gtag) {
      window.gtag('event', 'gtm_initialized', { source: 'spectrum_component' });
      this.debugLog('Sent test event to verify gtag is working');
    }
  }

  /**
   * Load Google Tag Manager script if autoLoadGTM is enabled
   */
  private loadGTMScript(): void {
    this.debugLog('loadGTMScript called', { autoLoadGTM: this.autoLoadGTM, gtmContainerId: this.gtmContainerId });
    
    if (!this.autoLoadGTM || !this.gtmContainerId) {
      this.debugLog('Skipping GTM script loading', { autoLoadGTM: this.autoLoadGTM, gtmContainerId: this.gtmContainerId });
      return;
    }
    
    // Check if GTM script is already loaded
    if (document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${this.gtmContainerId}"]`)) {
      this.debugLog(`GTM script already loaded for: ${this.gtmContainerId}`);
      return;
    }

    // Add GTM initialization event to dataLayer
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      'event': 'gtm.js'
    });
    
    this.debugLog('Added GTM initialization to dataLayer');

    // Create and inject GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${this.gtmContainerId}`;
    script.onload = () => {
      this.debugLog(`GTM script loaded successfully: ${this.gtmContainerId}`, {
        gtagType: typeof window.gtag,
        dataLayerLength: window.dataLayer?.length || 0
      });
    };
    script.onerror = () => {
      console.error(`❌ Failed to load GTM script: ${this.gtmContainerId}`);
      if (this.gtmContainerId.includes('DEMO') || this.gtmContainerId.includes('XXX')) {
        console.warn(`⚠️ Note: ${this.gtmContainerId} appears to be a demo/placeholder container ID.`);
        console.warn(`⚠️ For production use, replace with a real GTM container ID (e.g., GTM-XXXXXXX)`);
        console.warn(`⚠️ The gtag function is still available for testing via dataLayer.`);
      }
    };
    
    document.head.appendChild(script);
    this.debugLog(`GTM script injection started for: ${this.gtmContainerId}`, { dataLayer: window.dataLayer });
  }

  private updateGTMConsent(consent: CookieConsent): void {
    this.debugLog('updateGTMConsent called', { gtmContainerId: this.gtmContainerId, autoLoadGTM: this.autoLoadGTM });
    
    if (!this.gtmContainerId) {
      this.debugLog('No GTM container ID - skipping GTM integration');
      return;
    }

    // Always initialize dataLayer and gtag function first
    this.initializeGTMBasics();

    // Load GTM script if auto-loading is enabled
    this.loadGTMScript();

    // Update GTM consent mode
    const consentEvent = {
      event: 'consent_update',
      consent_mode: {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        personalization_storage: consent.preferences ? 'granted' : 'denied',
        functionality_storage: 'granted', // Always granted for necessary cookies
        security_storage: 'granted' // Always granted for necessary cookies
      },
      consent_timestamp: consent.timestamp,
      consent_version: consent.version
    };
    
    window.dataLayer.push(consentEvent);
    this.debugLog('Pushed consent update to dataLayer', consentEvent);

    // Also update Google Analytics gtag consent if available
    if (window.gtag) {
      const gtagConsent = {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        personalization_storage: consent.preferences ? 'granted' : 'denied'
      };
      window.gtag('consent', 'update', gtagConsent);
      this.debugLog('Updated gtag consent', gtagConsent);
    } else {
      this.debugLog('gtag function not available yet, only dataLayer updated');
    }
  }

  private updateGoogleAnalytics(consent: CookieConsent): void {
    // If analytics consent is denied, disable GA tracking
    if (!consent.analytics && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    }
  }

  private removeGTMConsent(): void {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'consent_update',
        consent_mode: {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          personalization_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted'
        }
      });
    }
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  private handleAcceptAll = (): void => {
    this.debugLog('Accept All clicked', {
      gtagBefore: typeof window.gtag,
      dataLayerBefore: window.dataLayer?.length || 0
    });
    
    this.updateConsent({
      analytics: true,
      marketing: true,
      preferences: true
    });
  };

  private handleRejectAll = (): void => {
    this.updateConsent({
      analytics: false,
      marketing: false,
      preferences: false
    });
  };

  private handleShowDetails = (): void => {
    this.showDetailedOptions = true;
  };

  private handleCookieStatusClick = (): void => {
    this.debugLog('Cookie status icon clicked - relaunching simple toast');
    this.showDetailedOptions = false;
    this.isVisible = true;
  };

  private handleSavePreferences = (): void => {
    const form = this.el.shadowRoot?.querySelector('#consent-form') as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    this.updateConsent({
      analytics: formData.get('analytics') === 'on',
      marketing: formData.get('marketing') === 'on',
      preferences: formData.get('preferences') === 'on'
    });
  };

  private handleDialogAction = (event: CustomEvent<{action: string; dialogId?: string; buttonId?: string}>) => {
    const { buttonId } = event.detail;
    
    if (!buttonId) {
      return;
    }
    
    switch (buttonId) {
      case 'save':
        this.handleSavePreferences();
        break;
      
      case 'acceptAll':
        this.handleAcceptAll();
        break;
        
      case 'rejectAll':
        this.handleRejectAll();
        break;
        
      default:
        return;
    }
    
    this.isVisible = false;
    this.showDetailedOptions = false;
  };

  private get el(): HTMLElement {
    return document.querySelector('spectrum-cookie-compliance') as HTMLElement;
  }





  render() {
    return (
      <Host>
        {/* Cookie status indicator (sticky icon) */}
        {this.showCookieStatus && this.currentConsent && (
          <div class="spectrum-cookie-compliance__status-indicator">
            <spectrum-button
              variant="ghost"
              size="sm"
              icon-only="true"
              show-left-icon="true"
              left-icon={this.hasTrackingEnabled() ? "cookie" : "cookie_off"}
              onClick={this.handleCookieStatusClick}
              aria-label={this.hasTrackingEnabled() ? this.getTranslations().accessibility.cookiesEnabled : this.getTranslations().accessibility.cookiesDisabled}
            >
            </spectrum-button>
          </div>
        )}

        {/* Consent banner and dialog (only show when visible) */}
        {this.isVisible && (
          <div class="spectrum-cookie-compliance__modal-content">
        {/* Simple toast for quick consent - only show when not in detailed mode */}
        {!this.showDetailedOptions && (
          <spectrum-toast
            visible={true}
            position={this.position === 'center' ? 'bottom' : this.position}
            variant="ghost"
            persistent={true}
            autoClose={false}
            dismissible={false}
            toastTitle={this.getTranslations().toastTitle}
            message={this.message}
            maxWidth="640px"
            minWidth="400px"
          >
            <div class="spectrum-cookie-compliance__actions">
              <spectrum-button 
                variant="warning"
                size="sm"
                buttonText={this.getTranslations().rejectAll}
                showButtonText={true}
                onClick={this.handleRejectAll}
              >
                {this.getTranslations().rejectAll}
              </spectrum-button>
              {this.showDetails && (
                <spectrum-button 
                  variant="secondary" 
                  size="sm"
                  buttonText={this.getTranslations().customize}
                  showButtonText={true}
                  onClick={this.handleShowDetails}
                >
                  {this.getTranslations().customize}
                </spectrum-button>
              )}
              <spectrum-button 
                variant="success"
                size="sm"
                buttonText={this.getTranslations().acceptAll}
                showButtonText={true}
                onClick={this.handleAcceptAll}
              >
                {this.getTranslations().acceptAll}
              </spectrum-button>
            </div>
          </spectrum-toast>
        )}

        {/* Detailed dialog for customization */}
        {this.showDetailedOptions && (
          <spectrum-dialog
            open={true}
            dialogTitle={this.getTranslations().dialog.title}
            size="large"
            closeOnOutsideClick={true}
            closeOnEscape={true}
            showCloseButton={true}
            buttons={[
              { id: 'rejectAll', label: this.getTranslations().rejectAll, variant: 'warning', action: 'rejectAll' },
              { id: 'save', label: this.getTranslations().dialog.savePreferences, variant: 'secondary', action: 'save' },
              { id: 'acceptAll', label: this.getTranslations().acceptAll, variant: 'success', action: 'acceptAll' }
            ]}
            onDialogAction={this.handleDialogAction}
          >
            <div slot="content">
              <p style={{ marginBottom: '1rem', fontSize: '14px' }}>
                {this.getTranslations().dialog.description}
              </p>
              
              <form id="consent-form">
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>{this.getTranslations().categories.necessary.label}</strong>
                    <input type="checkbox" checked disabled />
                  </div>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{this.getTranslations().categories.necessary.description}</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>{this.getTranslations().categories.analytics.label}</strong>
                    <input type="checkbox" name="analytics" />
                  </div>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{this.getTranslations().categories.analytics.description}</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>{this.getTranslations().categories.marketing.label}</strong>
                    <input type="checkbox" name="marketing" />
                  </div>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{this.getTranslations().categories.marketing.description}</p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>{this.getTranslations().categories.preferences.label}</strong>
                    <input type="checkbox" name="preferences" />
                  </div>
                  <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{this.getTranslations().categories.preferences.description}</p>
                </div>
              </form>

              {/* Policy Links */}
              {(this.privacyPolicyUrl || this.cookiePolicyUrl) && (
                <div style={{ 
                  marginTop: '1.5rem', 
                  paddingTop: '1rem', 
                  borderTop: '1px solid var(--spectrum-sys-color-outline, #e0e0e0)', 
                  fontSize: '14px' 
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>{this.getTranslations().policyLinks.learnMore}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {this.privacyPolicyUrl && (
                      <a 
                        href={this.privacyPolicyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          color: 'var(--spectrum-sys-color-primary, #0066cc)', 
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseOver={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'}
                        onMouseOut={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}
                      >
                        <span class="material-symbols-outlined" style={{ fontSize: '16px' }}>privacy_tip</span>
                        <span>{this.getTranslations().policyLinks.privacyPolicy}</span>
                        <span class="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_outward</span>
                      </a>
                    )}
                    {this.cookiePolicyUrl && (
                      <a 
                        href={this.cookiePolicyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          color: 'var(--spectrum-sys-color-primary, #0066cc)', 
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseOver={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'}
                        onMouseOut={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}
                      >
                        <span class="material-symbols-outlined" style={{ fontSize: '16px' }}>cookie</span>
                        <span>{this.getTranslations().policyLinks.cookiePolicy}</span>
                        <span class="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_outward</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </spectrum-dialog>
        )}
          </div>
        )}
      </Host>
    );
  }
}
