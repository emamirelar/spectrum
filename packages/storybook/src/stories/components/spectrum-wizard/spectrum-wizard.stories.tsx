import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

// Import component interfaces
interface WizardStep {
  id: string;
  title: string;
  content: string;
  estimatedTime?: number;
  completed?: boolean;
  accessible?: boolean;
}

/**
 * ## SpectrumWizard Component
 * 
 * The wizard component provides...
 * 
 * ### Key Features
 * - **Feature 1**: Description
 * - **Feature 2**: Description
 * - **Feature 3**: Description
 * 
 * ### Usage Guidelines
 * - **Use for**: Primary use case
 * - **Avoid when**: Situations to avoid
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **stepChange**: Component interaction event
 * - **wizardComplete**: Component interaction event
 */

// Component interfaces for TypeScript support
interface SpectrumWizardElement extends HTMLElement {
  steps: WizardStep[];
  currentStep: number;
  wizardId: string;
  persistProgress: boolean;
  showTimeIndicators: boolean;
  allowStepSelection: boolean;
  cookieExpirationDays: number;
  showNavigation: boolean;
  nextButtonLabel: string;
  previousButtonLabel: string;
  completeButtonLabel: string;
}

// Story arguments interface
interface SpectrumWizardArgs extends SpectrumWizardElement {}

const meta: Meta<SpectrumWizardArgs> = {
  title: 'Spectrum/Components/SpectrumWizard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The wizard component provides...

### Event System
- stepChange: Component interaction
- wizardComplete: Component interaction

### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    steps: [
      {
        id: 'step-1',
        title: 'Getting Started',
        content: '<h3>Welcome to the Wizard!</h3><p>This is the first step of our guided process. Here you can read introductory information and understand what this wizard will help you accomplish.</p><ul><li>Step-by-step guidance</li><li>Progress tracking</li><li>Cookie-based persistence</li></ul>',
        estimatedTime: 5,
        completed: false,
        accessible: true
      },
      {
        id: 'step-2',
        title: 'Basic Information',
        content: '<h3>Provide Your Details</h3><p>In this step, you would typically provide basic information required for the process.</p><p><strong>Example form fields might include:</strong></p><ul><li>Personal information</li><li>Contact details</li><li>Preferences</li></ul><p>The wizard automatically tracks your progress, so you can safely leave and return later.</p>',
        estimatedTime: 10,
        completed: false,
        accessible: false
      },
      {
        id: 'step-3',
        title: 'Configuration',
        content: '<h3>Configure Your Settings</h3><p>Configure the necessary settings for your needs. This step involves more detailed options and configurations.</p><blockquote>💡 <strong>Tip:</strong> Take your time to review all options carefully. You can always go back to previous steps if needed.</blockquote><p>Available configuration options:</p><ul><li>Advanced settings</li><li>Customization options</li><li>Integration preferences</li></ul>',
        estimatedTime: 15,
        completed: false,
        accessible: false
      },
      {
        id: 'step-4',
        title: 'Review & Confirm',
        content: '<h3>Review Your Choices</h3><p>Please review all the information and settings you have provided in the previous steps.</p><p><strong>Before completing:</strong></p><ul><li>Verify all information is correct</li><li>Check your configuration settings</li><li>Ensure you understand the next steps</li></ul><p>Once you complete the wizard, your progress will be saved and the process will begin.</p>',
        estimatedTime: 5,
        completed: false,
        accessible: false
      }
    ],
    currentStep: 0,
    wizardId: 'demo-wizard',
    persistProgress: true, // Explicitly enabled for demo
    showTimeIndicators: true,
    allowStepSelection: true,
    cookieExpirationDays: 30,
    showNavigation: true,
    nextButtonLabel: 'Next',
    previousButtonLabel: 'Previous',
    completeButtonLabel: 'Complete',
  },
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of wizard steps with id, title, content, and optional properties',
      table: {
        type: { summary: 'WizardStep[]' },
        defaultValue: { summary: '[]' }
      }
    },
    currentStep: {
      control: 'number',
      description: 'The currentStep property',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    wizardId: {
      control: 'text',
      description: 'The wizardId property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'spectrum-wizard' }
      }
    },
    persistProgress: {
      control: 'boolean',
      description: 'Whether to persist wizard progress in cookies (opt-in for privacy)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showTimeIndicators: {
      control: 'boolean',
      description: 'The showTimeIndicators property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    allowStepSelection: {
      control: 'boolean',
      description: 'The allowStepSelection property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    cookieExpirationDays: {
      control: 'number',
      description: 'The cookieExpirationDays property',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '30' }
      }
    },
    showNavigation: {
      control: 'boolean',
      description: 'The showNavigation property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    nextButtonLabel: {
      control: 'text',
      description: 'The nextButtonLabel property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Next' }
      }
    },
    previousButtonLabel: {
      control: 'text',
      description: 'The previousButtonLabel property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Previous' }
      }
    },
    completeButtonLabel: {
      control: 'text',
      description: 'The completeButtonLabel property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Complete' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumWizardArgs>;

// Interactive render function
const renderSpectrumWizard = (args: SpectrumWizardArgs) => html`
  <div style="padding: 2rem; min-height: 600px; background: var(--spectrum-sys-color-surface-variant, #f5f5f5); border-radius: 8px;">
    <spectrum-wizard
      .steps=${args.steps}
      .currentStep=${args.currentStep}
      .wizardId=${args.wizardId}
      .persistProgress=${args.persistProgress}
      .showTimeIndicators=${args.showTimeIndicators}
      .allowStepSelection=${args.allowStepSelection}
      .cookieExpirationDays=${args.cookieExpirationDays}
      .showNavigation=${args.showNavigation}
      .nextButtonLabel=${args.nextButtonLabel}
      .previousButtonLabel=${args.previousButtonLabel}
      .completeButtonLabel=${args.completeButtonLabel}
      @stepChange=${(e: CustomEvent) => action('stepChange')(e.detail)}
      @wizardComplete=${(e: CustomEvent) => action('wizardComplete')(e.detail)}
    ></spectrum-wizard>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumWizard,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.

**Try these interactions:**
- Navigate using Next/Previous buttons
- Click on step indicators (if allowStepSelection is enabled)
- Use keyboard arrow keys for navigation
- Toggle showTimeIndicators to see time estimates
- Enable persistProgress to test cookie-based progress saving (disabled by default for privacy)
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic wizard configuration showing default usage without cookies.
 */
export const BasicExample: Story = {
  render: renderSpectrumWizard,
  args: {
    steps: [
      {
        id: 'intro',
        title: 'Introduction',
        content: '<h3>Welcome!</h3><p>This is a basic wizard example with simple steps.</p>',
        estimatedTime: 3,
        accessible: true
      },
      {
        id: 'details',
        title: 'Details',
        content: '<h3>Provide Details</h3><p>Enter your information in this step.</p>',
        estimatedTime: 8,
        accessible: false
      },
      {
        id: 'finish',
        title: 'Finish',
        content: '<h3>All Done!</h3><p>Review and complete your submission.</p>',
        estimatedTime: 2,
        accessible: false
      }
    ],
    wizardId: 'basic-wizard',
    persistProgress: false, // No cookies - progress is not saved
    showTimeIndicators: true,
    allowStepSelection: true
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-wizard configuration without cookie persistence. Progress will be lost when the page is refreshed.
To enable cookie-based progress saving, set \`persistProgress={true}\`.
        `
      }
    }
  }
};

/**
 * Wizard with cookie persistence enabled for saving progress.
 */
export const WithCookiePersistence: Story = {
  render: renderSpectrumWizard,
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Account Setup',
        content: '<h3>Create Your Account</h3><p>This wizard will save your progress automatically. You can safely leave and return later!</p><p><strong>Features:</strong></p><ul><li>Progress saved in cookies</li><li>Resume from where you left off</li><li>30-day expiration</li></ul>',
        estimatedTime: 5,
        accessible: true
      },
      {
        id: 'step2',
        title: 'Preferences',
        content: '<h3>Set Your Preferences</h3><p>Configure your account settings. Your progress is being saved automatically.</p>',
        estimatedTime: 8,
        accessible: false
      },
      {
        id: 'step3',
        title: 'Complete',
        content: '<h3>All Done!</h3><p>Your setup is complete. The wizard progress has been saved throughout the process.</p>',
        estimatedTime: 2,
        accessible: false
      }
    ],
    wizardId: 'persistence-demo',
    persistProgress: true,
    cookieExpirationDays: 30,
    showTimeIndicators: true,
    allowStepSelection: true
  },
  parameters: {
    docs: {
      description: {
        story: `
Wizard with cookie persistence enabled. Progress is automatically saved and restored when returning to the wizard.
Try navigating partway through, refreshing the page, and see how it resumes from your last position.
        `
      }
    }
  }
};

/**
 * Onboarding wizard for new user experience.
 */
export const OnboardingWizard: Story = {
  render: renderSpectrumWizard,
  args: {
    steps: [
      {
        id: 'welcome',
        title: 'Welcome',
        content: '<h2>🎉 Welcome to Our Platform!</h2><p>We\'re excited to have you here. This quick setup will help you get started in just a few minutes.</p><p><strong>What you\'ll do:</strong></p><ul><li>Set up your profile</li><li>Choose your preferences</li><li>Connect your accounts</li><li>Take a quick tour</li></ul>',
        estimatedTime: 2,
        accessible: true
      },
      {
        id: 'profile',
        title: 'Profile Setup',
        content: '<h3>👤 Set Up Your Profile</h3><p>Let\'s create your profile to personalize your experience.</p><div style="background: #f0f8ff; padding: 1rem; border-radius: 4px; margin: 1rem 0;"><strong>📝 Required Information:</strong><ul><li>Display name</li><li>Profile picture</li><li>Bio (optional)</li><li>Location (optional)</li></ul></div><p>Your profile information helps others understand who you are and what you do.</p>',
        estimatedTime: 5,
        accessible: false
      },
      {
        id: 'preferences',
        title: 'Preferences',
        content: '<h3>⚙️ Configure Your Preferences</h3><p>Customize the platform to match your workflow and communication style.</p><p><strong>Preference Categories:</strong></p><ul><li><strong>Notifications:</strong> Email, push, in-app</li><li><strong>Privacy:</strong> Profile visibility, data sharing</li><li><strong>Interface:</strong> Theme, language, layout</li><li><strong>Features:</strong> Enable/disable optional features</li></ul><p>💡 <em>You can always change these settings later in your account preferences.</em></p>',
        estimatedTime: 7,
        accessible: false
      },
      {
        id: 'connections',
        title: 'Connect Accounts',
        content: '<h3>🔗 Connect Your Accounts</h3><p>Link your existing accounts to streamline your workflow and import your data.</p><p><strong>Available Integrations:</strong></p><ul><li>📧 Email providers (Gmail, Outlook)</li><li>☁️ Cloud storage (Google Drive, Dropbox)</li><li>📱 Social accounts (optional)</li><li>💼 Work tools (Slack, Teams)</li></ul><p><em>All connections are secure and you control what data is shared.</em></p>',
        estimatedTime: 10,
        accessible: false
      },
      {
        id: 'tour',
        title: 'Quick Tour',
        content: '<h3>🚀 Take a Quick Tour</h3><p>Let\'s explore the key features and interface elements you\'ll use every day.</p><p><strong>Tour Highlights:</strong></p><ul><li>🏠 Dashboard overview</li><li>📋 Main navigation</li><li>🛠️ Essential tools and features</li><li>❓ Help and support resources</li></ul><p>The tour is interactive and you can skip sections you\'re already familiar with.</p><p><strong>🎯 You\'re almost ready to get started!</strong></p>',
        estimatedTime: 8,
        accessible: false
      }
    ],
    wizardId: 'onboarding-wizard',
    persistProgress: false, // No cookies for onboarding
    nextButtonLabel: 'Continue',
    completeButtonLabel: 'Get Started',
    showTimeIndicators: true,
    allowStepSelection: false
  },
  parameters: {
    docs: {
      description: {
        story: `
Onboarding wizard example designed for new user experience. Features rich content, emojis, and disabled step selection to ensure users complete all steps in order.
Cookie persistence is disabled for this onboarding flow.
        `
      }
    }
  }
};

/**
 * Form wizard for multi-step data collection.
 */
export const FormWizard: Story = {
  render: renderSpectrumWizard,
  args: {
    steps: [
      {
        id: 'personal',
        title: 'Personal Info',
        content: '<h3>Personal Information</h3><p>Please provide your basic personal information.</p><form style="max-width: 400px;"><div style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Full Name *</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter your full name" /></div><div style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address *</label><input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter your email" /></div><div style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Phone Number</label><input type="tel" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter your phone number" /></div></form>',
        estimatedTime: 5,
        accessible: true
      },
      {
        id: 'address',
        title: 'Address',
        content: '<h3>Address Information</h3><p>Please provide your address details for shipping and billing.</p><form style="max-width: 400px;"><div style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Street Address *</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter street address" /></div><div style="display: flex; gap: 1rem; margin-bottom: 1rem;"><div style="flex: 1;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">City *</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="City" /></div><div style="flex: 1;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">ZIP Code *</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="ZIP" /></div></div><div style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Country *</label><select style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Other</option></select></div></form>',
        estimatedTime: 8,
        accessible: false
      },
      {
        id: 'payment',
        title: 'Payment',
        content: '<h3>Payment Information</h3><p>Secure payment processing for your order.</p><div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;"><strong>🔒 Secure Payment</strong><br>Your payment information is encrypted and secure.</div><form style="max-width: 400px;"><div style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Card Number *</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="1234 5678 9012 3456" /></div><div style="display: flex; gap: 1rem; margin-bottom: 1rem;"><div style="flex: 1;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Expiry Date *</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="MM/YY" /></div><div style="flex: 1;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">CVV *</label><input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" placeholder="123" /></div></div></form>',
        estimatedTime: 12,
        accessible: false
      },
      {
        id: 'review',
        title: 'Review Order',
        content: '<h3>Review Your Order</h3><p>Please review all information before completing your purchase.</p><div style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 1rem; border-radius: 4px; margin: 1rem 0;"><h4 style="margin-top: 0;">Order Summary</h4><ul style="margin: 0;"><li>Personal information: ✓ Completed</li><li>Shipping address: ✓ Completed</li><li>Payment method: ✓ Completed</li></ul></div><div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 1rem; border-radius: 4px;"><strong>📋 Next Steps</strong><br>After completing this wizard:<ol><li>Order confirmation email will be sent</li><li>Payment will be processed</li><li>Shipping notification will follow</li></ol></div>',
        estimatedTime: 5,
        accessible: false
      }
    ],
    wizardId: 'form-wizard',
    nextButtonLabel: 'Continue',
    completeButtonLabel: 'Complete Order',
    showTimeIndicators: true,
    allowStepSelection: true
  },
  parameters: {
    docs: {
      description: {
        story: `
Form wizard example for multi-step data collection. Includes realistic form fields, validation hints, and security messaging.
        `
      }
    }
  }
};

/**
 * Wizard variants and configurations.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant, #f5f5f5); border-radius: 8px;">
      
      <!-- Minimal Wizard (No Time, No Step Selection) -->
      <div>
        <h3>Minimal Configuration</h3>
        <spectrum-wizard
          .steps=${[
            { id: '1', title: 'Step 1', content: '<p>Simple step without time indicators.</p>', accessible: true },
            { id: '2', title: 'Step 2', content: '<p>Sequential navigation only.</p>', accessible: false },
            { id: '3', title: 'Step 3', content: '<p>Complete the process.</p>', accessible: false }
          ]}
          .wizardId=${'minimal-wizard'}
          .showTimeIndicators=${false}
          .allowStepSelection=${false}
          .persistProgress=${false}
        ></spectrum-wizard>
      </div>

      <!-- Custom Labels -->
      <div>
        <h3>Custom Navigation Labels</h3>
        <spectrum-wizard
          .steps=${[
            { id: 'a', title: 'Begin', content: '<p>Start your journey here.</p>', accessible: true },
            { id: 'b', title: 'Continue', content: '<p>Keep going with the process.</p>', accessible: false }
          ]}
          .wizardId=${'custom-labels-wizard'}
          .nextButtonLabel=${'Proceed'}
          .previousButtonLabel=${'Go Back'}
          .completeButtonLabel=${'Finish Now'}
          .showTimeIndicators=${false}
        ></spectrum-wizard>
      </div>

      <!-- No Navigation (External Control) -->
      <div>
        <h3>External Navigation Control</h3>
        <spectrum-wizard
          .steps=${[
            { id: 'x', title: 'Information', content: '<p>Content managed externally.</p>', accessible: true },
            { id: 'y', title: 'Details', content: '<p>Navigation controlled by parent.</p>', accessible: false }
          ]}
          .wizardId=${'external-wizard'}
          .showNavigation=${false}
          .allowStepSelection=${true}
        ></spectrum-wizard>
      </div>

    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-wizard variants and configurations showing various customization options:

- **Minimal:** No time indicators, sequential navigation only
- **Custom Labels:** Customized button text for different contexts
- **External Control:** No built-in navigation for custom implementations
        `
      }
    }
  }
};

/**
 * JSON String Example for Pure HTML Usage
 * This story demonstrates how to use the wizard with JSON strings directly in HTML,
 * without needing JavaScript object binding.
 */
export const JSONStringExample: Story = {
  render: () => html`
    <div style="padding: 2rem; min-height: 600px; background: var(--spectrum-sys-color-surface-variant, #f5f5f5); border-radius: 8px;">
      <h3 style="margin-bottom: 2rem; text-align: center;">Copy-Paste HTML Example</h3>
      <p style="background: #e3f2fd; padding: 1rem; border-radius: 4px; margin-bottom: 2rem;">
        <strong>💡 Usage:</strong> This example shows how to use spectrum-wizard with JSON strings in pure HTML. 
        You can copy the HTML below and paste it into any HTML file!
      </p>
      
      <spectrum-wizard
        steps='[{"id":"welcome","title":"Welcome to the Platform","content":"<div style=\\"text-align: center; padding: 2rem;\\"><h2>🎉 Welcome!</h2><p>We are excited to have you here. This wizard will guide you through setting up your account in just a few minutes.</p><div style=\\"background: #e3f2fd; padding: 1rem; border-radius: 8px; margin: 1rem 0;\\"><strong>What you will accomplish:</strong><ul style=\\"text-align: left; margin: 1rem 0;\\"><li>Create your profile</li><li>Set up preferences</li><li>Connect integrations</li><li>Complete your setup</li></ul></div><p><em>Let us get started on your journey!</em></p></div>","estimatedTime":2,"accessible":true},{"id":"profile","title":"Create Your Profile","content":"<div style=\\"padding: 1rem;\\"><h3>👤 Set Up Your Profile</h3><p>Tell us a bit about yourself to personalize your experience.</p><form style=\\"max-width: 400px; margin: 0 auto;\\"><div style=\\"margin-bottom: 1rem;\\"><label style=\\"display: block; margin-bottom: 0.5rem; font-weight: 500;\\">Full Name *</label><input type=\\"text\\" style=\\"width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;\\" placeholder=\\"Enter your full name\\" /></div><div style=\\"margin-bottom: 1rem;\\"><label style=\\"display: block; margin-bottom: 0.5rem; font-weight: 500;\\">Email Address *</label><input type=\\"email\\" style=\\"width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;\\" placeholder=\\"Enter your email\\" /></div><div style=\\"margin-bottom: 1rem;\\"><label style=\\"display: block; margin-bottom: 0.5rem; font-weight: 500;\\">Job Title</label><input type=\\"text\\" style=\\"width: 100%; padding: 0.75rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem;\\" placeholder=\\"What is your role?\\" /></div></form></div>","estimatedTime":5,"accessible":false},{"id":"preferences","title":"Configure Preferences","content":"<div style=\\"padding: 1rem;\\"><h3>⚙️ Your Preferences</h3><p>Customize the platform to match your workflow and needs.</p><div style=\\"display: grid; gap: 1.5rem; margin: 2rem 0;\\"><div style=\\"background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef;\\"><h4 style=\\"margin: 0 0 1rem 0; color: #495057;\\">🔔 Notifications</h4><label style=\\"display: flex; align-items: center; margin-bottom: 0.5rem;\\"><input type=\\"checkbox\\" style=\\"margin-right: 0.5rem;\\" checked> Email notifications</label><label style=\\"display: flex; align-items: center; margin-bottom: 0.5rem;\\"><input type=\\"checkbox\\" style=\\"margin-right: 0.5rem;\\"> Push notifications</label><label style=\\"display: flex; align-items: center;\\"><input type=\\"checkbox\\" style=\\"margin-right: 0.5rem;\\" checked> Weekly digest</label></div><div style=\\"background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e9ecef;\\"><h4 style=\\"margin: 0 0 1rem 0; color: #495057;\\">🎨 Interface</h4><label style=\\"display: flex; align-items: center; margin-bottom: 0.5rem;\\"><input type=\\"radio\\" name=\\"theme\\" style=\\"margin-right: 0.5rem;\\" checked> Light theme</label><label style=\\"display: flex; align-items: center; margin-bottom: 0.5rem;\\"><input type=\\"radio\\" name=\\"theme\\" style=\\"margin-right: 0.5rem;\\"> Dark theme</label><label style=\\"display: flex; align-items: center;\\"><input type=\\"radio\\" name=\\"theme\\" style=\\"margin-right: 0.5rem;\\"> Auto (system)</label></div></div></div>","estimatedTime":8,"accessible":false},{"id":"complete","title":"All Set!","content":"<div style=\\"text-align: center; padding: 2rem;\\"><h2>🎯 You are All Set!</h2><p style=\\"font-size: 1.2rem; color: #28a745; margin: 1rem 0;\\"><strong>Congratulations!</strong> Your account is now ready to use.</p><div style=\\"background: #d4edda; border: 1px solid #c3e6cb; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;\\"><h4 style=\\"color: #155724; margin: 0 0 1rem 0;\\">✅ Setup Complete</h4><ul style=\\"text-align: left; color: #155724; margin: 0;\\"><li>Profile created and configured</li><li>Preferences saved</li><li>Account fully activated</li></ul></div><p><em>Welcome to the platform - let us build something amazing together!</em></p></div>","estimatedTime":3,"accessible":false}]'
        wizard-id="json-example-wizard"
        persist-progress="true"
        cookie-expiration-days="7"
        show-time-indicators="true"
        allow-step-selection="false"
        next-button-label="Continue"
        previous-button-label="Back"
        complete-button-label="Get Started"
        @stepChange=${(e: CustomEvent) => action('stepChange')(e.detail)}
        @wizardComplete=${(e: CustomEvent) => action('wizardComplete')(e.detail)}
      ></spectrum-wizard>
      
      <div style="margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
        <h4>📋 Copy This HTML:</h4>
        <pre style="background: white; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 0.8rem; border: 1px solid #ddd;"><code>&lt;spectrum-wizard
  steps='[{"id":"welcome","title":"Welcome to the Platform","content":"&lt;div style=\\"text-align: center; padding: 2rem;\\"&gt;&lt;h2&gt;🎉 Welcome!&lt;/h2&gt;&lt;p&gt;We are excited to have you here. This wizard will guide you through setting up your account in just a few minutes.&lt;/p&gt;&lt;/div&gt;","estimatedTime":2,"accessible":true},{"id":"profile","title":"Create Your Profile","content":"&lt;div style=\\"padding: 1rem;\\"&gt;&lt;h3&gt;👤 Set Up Your Profile&lt;/h3&gt;&lt;p&gt;Tell us a bit about yourself to personalize your experience.&lt;/p&gt;&lt;/div&gt;","estimatedTime":5,"accessible":false}]'
  wizard-id="my-wizard"
  persist-progress="true"
  show-time-indicators="true"&gt;
&lt;/spectrum-wizard&gt;</code></pre>
        <p style="margin-top: 1rem; color: #666; font-style: italic;">
          ✨ This HTML works directly in any web page without JavaScript setup!
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the HTML-friendly JSON string approach for using spectrum-wizard. 

**Key Benefits:**
- ✅ Works in pure HTML without JavaScript object binding
- ✅ Copy-paste ready for any HTML file
- ✅ No framework dependencies required
- ✅ Maintains full functionality and styling

**Usage Pattern:**
\`\`\`html
<spectrum-wizard
  steps='[{"id":"step1","title":"Step 1","content":"<p>Content</p>","accessible":true}]'
  wizard-id="my-wizard">
</spectrum-wizard>
\`\`\`

This approach is perfect for:
- Static HTML pages
- Quick prototypes
- Documentation examples
- Integration testing
        `
      }
    }
  }
};