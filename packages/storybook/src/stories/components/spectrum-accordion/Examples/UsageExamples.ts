import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// FAQ and Help Documentation
// ==============================================

export const FAQAccordion = {
  args: {
    variant: 'standard',
    expandMode: 'single',
    sections: JSON.stringify([
      {
        id: 'faq-account',
        title: 'How do I create an account?',
        content: `<div style="line-height: 1.6;">
          <p>Creating an account is simple and takes less than a minute:</p>
          <ol style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Click the "Sign Up" button in the top right corner</li>
            <li>Enter your email address and create a secure password</li>
            <li>Verify your email address by clicking the link we send you</li>
            <li>Complete your profile with basic information</li>
          </ol>
          <p><strong>Need help?</strong> Contact our support team at support@example.com</p>
        </div>`
      },
      {
        id: 'faq-billing',
        title: 'What payment methods do you accept?',
        content: `<div style="line-height: 1.6;">
          <p>We accept all major payment methods including:</p>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Credit Cards (Visa, MasterCard, American Express)</li>
            <li>PayPal and Apple Pay</li>
            <li>Bank transfers for enterprise customers</li>
            <li>Cryptocurrency payments (Bitcoin, Ethereum)</li>
          </ul>
          <p>All payments are processed securely through our encrypted payment gateway.</p>
        </div>`
      },
      {
        id: 'faq-security',
        title: 'How is my data protected?',
        content: `<div style="line-height: 1.6;">
          <p>Your data security is our top priority. We implement multiple layers of protection:</p>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256</li>
            <li><strong>Access Control:</strong> Role-based permissions and multi-factor authentication</li>
            <li><strong>Compliance:</strong> SOC 2 Type II, GDPR, and HIPAA compliant</li>
            <li><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
          </ul>
          <p>Read our full <a href="#" style="color: var(--spectrum-color-primary);">Privacy Policy</a> for more details.</p>
        </div>`
      },
      {
        id: 'faq-integrations',
        title: 'What integrations are available?',
        content: `<div style="line-height: 1.6;">
          <p>Connect with over 100+ popular tools and services:</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <div style="padding: 0.5rem; background: var(--spectrum-color-surface-variant); border-radius: 4px;">
              <strong>Productivity</strong><br>
              Slack, Microsoft Teams, Asana, Trello
            </div>
            <div style="padding: 0.5rem; background: var(--spectrum-color-surface-variant); border-radius: 4px;">
              <strong>Development</strong><br>
              GitHub, GitLab, Jira, Jenkins
            </div>
            <div style="padding: 0.5rem; background: var(--spectrum-color-surface-variant); border-radius: 4px;">
              <strong>Analytics</strong><br>
              Google Analytics, Mixpanel, Amplitude
            </div>
          </div>
          <p>Don't see your tool? <a href="#" style="color: var(--spectrum-color-primary);">Request an integration</a></p>
        </div>`
      }
    ]),
    collapsedIcon: 'help_outline',
    expandedIcon: 'help',
    accordionId: 'faq-accordion'
  },
  render: (args: any) => html`
    <div style="max-width: 800px;">
      <div style="margin-bottom: 2rem; text-align: center;">
        <h2 style="color: var(--spectrum-color-on-surface); margin-bottom: 0.5rem;">Frequently Asked Questions</h2>
        <p style="color: var(--spectrum-color-on-surface-variant);">Find answers to common questions about our platform</p>
      </div>
      <spectrum-accordion
        .variant=${args.variant}
        .expandMode=${args.expandMode}
        .sections=${args.sections}
        .collapsedIcon=${args.collapsedIcon}
        .expandedIcon=${args.expandedIcon}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('FAQ Section Toggled')(e.detail)}
      >
      </spectrum-accordion>
    </div>
  `
};

// ==============================================
// Product Features and Pricing
// ==============================================

export const ProductFeaturesAccordion = {
  args: {
    variant: 'standard',
    expandMode: 'multi',
    sections: JSON.stringify([
      {
        id: 'analytics-pro',
        title: '📊 Analytics Pro - $29/month',
        expanded: true,
        content: `<div style="padding: 1rem; background: var(--spectrum-color-primary-container); color: var(--spectrum-color-on-primary-container); border-radius: 8px;">
          <h4 style="margin-bottom: 1rem;">Professional Analytics Suite</h4>
          <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
            <li>Real-time dashboard with 20+ widgets</li>
            <li>Custom reports and automated scheduling</li>
            <li>Advanced segmentation and cohort analysis</li>
            <li>API access for custom integrations</li>
            <li>Email and Slack notifications</li>
          </ul>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button style="padding: 0.5rem 1rem; background: var(--spectrum-color-primary); color: var(--spectrum-color-on-primary); border: none; border-radius: 4px; cursor: pointer;">Start Free Trial</button>
            <button style="padding: 0.5rem 1rem; background: transparent; color: var(--spectrum-color-on-primary-container); border: 1px solid; border-radius: 4px; cursor: pointer;">Learn More</button>
          </div>
        </div>`
      },
      {
        id: 'team-collaboration',
        title: '👥 Team Collaboration - $19/month',
        content: `<div style="padding: 1rem; background: var(--spectrum-color-secondary-container); color: var(--spectrum-color-on-secondary-container); border-radius: 8px;">
          <h4 style="margin-bottom: 1rem;">Enhanced Team Features</h4>
          <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
            <li>Unlimited team members and projects</li>
            <li>Real-time collaborative editing</li>
            <li>Comment system and task assignments</li>
            <li>Version history and rollback</li>
            <li>Team activity feed and notifications</li>
          </ul>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button style="padding: 0.5rem 1rem; background: var(--spectrum-color-secondary); color: var(--spectrum-color-on-secondary); border: none; border-radius: 4px; cursor: pointer;">Get Started</button>
            <button style="padding: 0.5rem 1rem; background: transparent; color: var(--spectrum-color-on-secondary-container); border: 1px solid; border-radius: 4px; cursor: pointer;">View Demo</button>
          </div>
        </div>`
      },
      {
        id: 'enterprise',
        title: '🏢 Enterprise - Custom Pricing',
        content: `<div style="padding: 1rem; background: var(--spectrum-color-tertiary-container); color: var(--spectrum-color-on-tertiary-container); border-radius: 8px;">
          <h4 style="margin-bottom: 1rem;">Enterprise-Grade Solutions</h4>
          <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
            <li>Dedicated account manager and support</li>
            <li>Custom integrations and white-labeling</li>
            <li>Advanced security and compliance features</li>
            <li>On-premise deployment options</li>
            <li>SLA guarantees and priority support</li>
          </ul>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button style="padding: 0.5rem 1rem; background: var(--spectrum-color-tertiary); color: var(--spectrum-color-on-tertiary); border: none; border-radius: 4px; cursor: pointer;">Contact Sales</button>
            <button style="padding: 0.5rem 1rem; background: transparent; color: var(--spectrum-color-on-tertiary-container); border: 1px solid; border-radius: 4px; cursor: pointer;">Download Brochure</button>
          </div>
        </div>`
      }
    ]),
    collapsedIcon: 'add',
    expandedIcon: 'remove',
    accordionId: 'features-accordion'
  },
  render: (args: any) => html`
    <div style="max-width: 900px;">
      <div style="margin-bottom: 2rem; text-align: center;">
        <h2 style="color: var(--spectrum-color-on-surface); margin-bottom: 0.5rem;">Choose Your Plan</h2>
        <p style="color: var(--spectrum-color-on-surface-variant);">Select the features that match your needs</p>
      </div>
      <spectrum-accordion
        .variant=${args.variant}
        .expandMode=${args.expandMode}
        .sections=${args.sections}
        .collapsedIcon=${args.collapsedIcon}
        .expandedIcon=${args.expandedIcon}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Feature Plan Toggled')(e.detail)}
      >
      </spectrum-accordion>
    </div>
  `
};

// ==============================================
// Navigation and Menu Systems
// ==============================================

export const NavigationAccordion = {
  args: {
    variant: 'standard',
    expandMode: 'single',
    sections: JSON.stringify([
      {
        id: 'nav-dashboard',
        title: '🏠 Dashboard',
        content: `<div style="padding: 0.5rem 0;">
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">📈 Analytics Overview</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">⚡ Quick Actions</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">📊 Recent Reports</a>
        </div>`
      },
      {
        id: 'nav-projects',
        title: '📁 Projects',
        content: `<div style="padding: 0.5rem 0;">
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">➕ Create New Project</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">📂 All Projects</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">⭐ Favorites</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">🗂️ Archive</a>
        </div>`
      },
      {
        id: 'nav-team',
        title: '👥 Team',
        content: `<div style="padding: 0.5rem 0;">
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">👤 Team Members</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">📧 Invitations</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">🔐 Permissions</a>
        </div>`
      },
      {
        id: 'nav-settings',
        title: '⚙️ Settings',
        content: `<div style="padding: 0.5rem 0;">
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">👤 Profile</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">🔔 Notifications</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">💳 Billing</a>
          <a href="#" style="display: block; padding: 0.5rem 1rem; color: var(--spectrum-color-on-surface); text-decoration: none; border-radius: 4px;" onmouseover="this.style.background='var(--spectrum-color-surface-variant)'" onmouseout="this.style.background='transparent'">🔒 Security</a>
        </div>`
      }
    ]),
    collapsedIcon: 'chevron_right',
    expandedIcon: 'expand_more',
    accordionId: 'navigation-accordion'
  },
  render: (args: any) => html`
    <div style="max-width: 300px; background: var(--spectrum-color-surface); border: 1px solid var(--spectrum-color-outline); border-radius: 8px; overflow: hidden;">
      <div style="padding: 1rem; background: var(--spectrum-color-primary); color: var(--spectrum-color-on-primary);">
        <h3 style="margin: 0; font-size: 1.1rem;">Navigation Menu</h3>
      </div>
      <div style="padding: 1rem;">
        <spectrum-accordion
          .variant=${args.variant}
          .expandMode=${args.expandMode}
          .sections=${args.sections}
          .collapsedIcon=${args.collapsedIcon}
          .expandedIcon=${args.expandedIcon}
          .accordionId=${args.accordionId}
          @accordionToggle=${(e: CustomEvent) => action('Navigation Section Toggled')(e.detail)}
        >
        </spectrum-accordion>
      </div>
    </div>
  `
};

// ==============================================
// Content Organization and Documentation
// ==============================================

export const DocumentationAccordion = {
  args: {
    variant: 'standard',
    expandMode: 'multi',
    sections: JSON.stringify([
      {
        id: 'getting-started',
        title: '🚀 Getting Started',
        expanded: true,
        content: `<div style="line-height: 1.6;">
          <h4>Quick Start Guide</h4>
          <p>Get up and running in under 5 minutes with our step-by-step guide.</p>
          <div style="margin: 1rem 0; padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 4px;">
            <code style="color: var(--spectrum-color-primary);">npm install @spectrum/components</code>
          </div>
          <p><a href="#" style="color: var(--spectrum-color-primary);">View Full Installation Guide →</a></p>
        </div>`
      },
      {
        id: 'api-reference',
        title: '📖 API Reference',
        content: `<div style="line-height: 1.6;">
          <h4>Component APIs</h4>
          <p>Comprehensive documentation for all component properties, methods, and events.</p>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li><a href="#" style="color: var(--spectrum-color-primary);">Properties & Attributes</a></li>
            <li><a href="#" style="color: var(--spectrum-color-primary);">Methods & Events</a></li>
            <li><a href="#" style="color: var(--spectrum-color-primary);">CSS Custom Properties</a></li>
            <li><a href="#" style="color: var(--spectrum-color-primary);">TypeScript Interfaces</a></li>
          </ul>
        </div>`
      },
      {
        id: 'examples',
        title: '💡 Examples & Tutorials',
        content: `<div style="line-height: 1.6;">
          <h4>Learn by Example</h4>
          <p>Interactive examples and step-by-step tutorials for common use cases.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 4px; text-align: center;">
              <span style="font-size: 2rem;">🎨</span>
              <div style="margin-top: 0.5rem; font-weight: bold;">Theming</div>
            </div>
            <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 4px; text-align: center;">
              <span style="font-size: 2rem;">🏗️</span>
              <div style="margin-top: 0.5rem; font-weight: bold;">Layouts</div>
            </div>
            <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 4px; text-align: center;">
              <span style="font-size: 2rem;">🎛️</span>
              <div style="margin-top: 0.5rem; font-weight: bold;">Forms</div>
            </div>
          </div>
        </div>`
      },
      {
        id: 'best-practices',
        title: '⭐ Best Practices',
        content: `<div style="line-height: 1.6;">
          <h4>Design & Development Guidelines</h4>
          <p>Learn the recommended patterns for building great user experiences.</p>
          <div style="margin: 1rem 0;">
            <div style="padding: 1rem; border-left: 4px solid var(--spectrum-color-success); background: var(--spectrum-color-success-container); color: var(--spectrum-color-on-success-container); margin-bottom: 1rem;">
              <strong>✅ Do:</strong> Use consistent spacing and follow accessibility guidelines
            </div>
            <div style="padding: 1rem; border-left: 4px solid var(--spectrum-color-error); background: var(--spectrum-color-error-container); color: var(--spectrum-color-on-error-container);">
              <strong>❌ Don't:</strong> Override core component styles or ignore responsive design
            </div>
          </div>
        </div>`
      }
    ]),
    collapsedIcon: 'article',
    expandedIcon: 'menu_book',
    accordionId: 'documentation-accordion'
  },
  render: (args: any) => html`
    <div style="max-width: 800px;">
      <div style="margin-bottom: 2rem; text-align: center;">
        <h2 style="color: var(--spectrum-color-on-surface); margin-bottom: 0.5rem;">Documentation</h2>
        <p style="color: var(--spectrum-color-on-surface-variant);">Everything you need to know about using our components</p>
      </div>
      <spectrum-accordion
        .variant=${args.variant}
        .expandMode=${args.expandMode}
        .sections=${args.sections}
        .collapsedIcon=${args.collapsedIcon}
        .expandedIcon=${args.expandedIcon}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Documentation Section Toggled')(e.detail)}
      >
      </spectrum-accordion>
    </div>
  `
};

// ==============================================
// Action-Oriented Chip Accordions
// ==============================================

export const ActionToolsAccordion = {
  args: {
    variant: 'chip',
    label: 'Quick Tools',
    chipVariant: 'primary',
    outline: false,
    sound: true,
    accordionId: 'action-tools'
  },
  render: (args: any) => html`
    <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Project Dashboard</h3>
      <div style="margin-bottom: 1rem;">
        <spectrum-accordion
          .variant=${args.variant}
          .label=${args.label}
          .chipVariant=${args.chipVariant}
          .outline=${args.outline}
          .sound=${args.sound}
          .accordionId=${args.accordionId}
          @accordionToggle=${(e: CustomEvent) => action('Quick Tools Toggled')(e.detail)}
        >
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem;">
            <spectrum-button variant="secondary" size="sm" @click=${() => action('Tool Used')('Export')}>📤 Export</spectrum-button>
            <spectrum-button variant="secondary" size="sm" @click=${() => action('Tool Used')('Import')}>📥 Import</spectrum-button>
            <spectrum-button variant="secondary" size="sm" @click=${() => action('Tool Used')('Share')}>🔗 Share</spectrum-button>
            <spectrum-button variant="secondary" size="sm" @click=${() => action('Tool Used')('Clone')}>🔄 Clone</spectrum-button>
            <spectrum-button variant="secondary" size="sm" @click=${() => action('Tool Used')('Archive')}>📦 Archive</spectrum-button>
          </div>
        </spectrum-accordion>
      </div>
      <p style="color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Access frequently used project tools and actions
      </p>
    </div>
  `
};

export const ExplorationChipsAccordion = {
  args: {
    variant: 'chip',
    label: 'Explore Topics',
    chipVariant: 'secondary',
    outline: true,
    horizontalScroll: true,
    accordionId: 'exploration-chips'
  },
  render: (args: any) => html`
    <div style="max-width: 600px;">
      <div style="margin-bottom: 1rem;">
        <h3 style="color: var(--spectrum-color-on-surface); margin-bottom: 0.5rem;">Research Areas</h3>
        <p style="color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Discover related topics and expand your knowledge
        </p>
      </div>
      <spectrum-accordion
        .variant=${args.variant}
        .label=${args.label}
        .chipVariant=${args.chipVariant}
        .outline=${args.outline}
        .horizontalScroll=${args.horizontalScroll}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Exploration Toggled')(e.detail)}
      >
        <div style="display: flex; gap: 0.5rem; min-width: 800px;">
          <spectrum-chip variant="secondary" label="🧬 Biotechnology" @click=${() => action('Topic Explored')('Biotechnology')}></spectrum-chip>
          <spectrum-chip variant="secondary" label="🌍 Climate Science" @click=${() => action('Topic Explored')('Climate Science')}></spectrum-chip>
          <spectrum-chip variant="secondary" label="🚀 Space Technology" @click=${() => action('Topic Explored')('Space Technology')}></spectrum-chip>
          <spectrum-chip variant="secondary" label="🤖 Robotics" @click=${() => action('Topic Explored')('Robotics')}></spectrum-chip>
          <spectrum-chip variant="secondary" label="🔬 Nanotechnology" @click=${() => action('Topic Explored')('Nanotechnology')}></spectrum-chip>
          <spectrum-chip variant="secondary" label="🧠 Neuroscience" @click=${() => action('Topic Explored')('Neuroscience')}></spectrum-chip>
        </div>
      </spectrum-accordion>
    </div>
  `
};

// ==============================================
// E-commerce and Shopping
// ==============================================

export const ProductCategoriesAccordion = {
  args: {
    variant: 'standard',
    expandMode: 'multi',
    sections: JSON.stringify([
      {
        id: 'electronics',
        title: '📱 Electronics & Gadgets',
        expanded: true,
        content: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; padding: 1rem 0;">
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📱</div>
            <div style="font-weight: bold; margin-bottom: 0.25rem;">Smartphones</div>
            <div style="font-size: 0.8rem; color: var(--spectrum-color-on-surface-variant);">Latest models</div>
          </div>
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">💻</div>
            <div style="font-weight: bold; margin-bottom: 0.25rem;">Laptops</div>
            <div style="font-size: 0.8rem; color: var(--spectrum-color-on-surface-variant);">Work & gaming</div>
          </div>
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎧</div>
            <div style="font-weight: bold; margin-bottom: 0.25rem;">Audio</div>
            <div style="font-size: 0.8rem; color: var(--spectrum-color-on-surface-variant);">Headphones & speakers</div>
          </div>
        </div>`
      },
      {
        id: 'fashion',
        title: '👕 Fashion & Apparel',
        content: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; padding: 1rem 0;">
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👔</div>
            <div style="font-weight: bold;">Men's</div>
          </div>
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👗</div>
            <div style="font-weight: bold;">Women's</div>
          </div>
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👶</div>
            <div style="font-weight: bold;">Kids</div>
          </div>
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👟</div>
            <div style="font-weight: bold;">Shoes</div>
          </div>
        </div>`
      },
      {
        id: 'home',
        title: '🏠 Home & Garden',
        content: `<div style="padding: 1rem 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <h4 style="margin-bottom: 0.5rem;">🛋️ Furniture</h4>
              <ul style="margin: 0; padding-left: 1rem; color: var(--spectrum-color-on-surface-variant);">
                <li>Living Room</li>
                <li>Bedroom</li>
                <li>Office</li>
              </ul>
            </div>
            <div>
              <h4 style="margin-bottom: 0.5rem;">🌱 Garden</h4>
              <ul style="margin: 0; padding-left: 1rem; color: var(--spectrum-color-on-surface-variant);">
                <li>Plants & Seeds</li>
                <li>Tools</li>
                <li>Outdoor</li>
              </ul>
            </div>
          </div>
        </div>`
      }
    ]),
    collapsedIcon: 'storefront',
    expandedIcon: 'store',
    accordionId: 'product-categories'
  },
  render: (args: any) => html`
    <div style="max-width: 700px;">
      <div style="margin-bottom: 2rem; text-align: center;">
        <h2 style="color: var(--spectrum-color-on-surface); margin-bottom: 0.5rem;">Shop by Category</h2>
        <p style="color: var(--spectrum-color-on-surface-variant);">Browse our wide selection of products</p>
      </div>
      <spectrum-accordion
        .variant=${args.variant}
        .expandMode=${args.expandMode}
        .sections=${args.sections}
        .collapsedIcon=${args.collapsedIcon}
        .expandedIcon=${args.expandedIcon}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Product Category Toggled')(e.detail)}
      >
      </spectrum-accordion>
    </div>
  `
}; 