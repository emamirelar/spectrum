import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Documentation/CSS Variables',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// Helper styles for all examples
const exampleStyles = html`
  <style>
    .example-container {
      padding: var(--spectrum-sys-padding);
      margin-bottom: var(--spectrum-sys-spacing-large);
    }
    
    .example-grid {
      display: grid;
      gap: var(--spectrum-sys-spacing);
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    
    .example-title {
      font-family: var(--spectrum-sys-font-family);
      font-size: var(--spectrum-sys-font-size-large);
      font-weight: var(--spectrum-sys-font-weight-bold);
      color: var(--spectrum-color-on-surface);
      margin-bottom: var(--spectrum-sys-spacing);
    }
    
    .example-subtitle {
      font-family: var(--spectrum-sys-font-family);
      font-size: var(--spectrum-sys-font-size);
      font-weight: var(--spectrum-sys-font-weight-medium);
      color: var(--spectrum-color-on-surface-variant);
      margin: var(--spectrum-sys-spacing) 0 var(--spectrum-sys-spacing-small) 0;
    }
  </style>
`;

export const BrandColors: Story = {
  render: () => html`
    ${exampleStyles}
    <div class="example-container">
      <h2 class="example-title">🎨 UNOPS Brand Colors</h2>
      
      <h3 class="example-subtitle">Core Brand Colors</h3>
      <div class="example-grid">
        <div style="background-color: var(--unops-color-blue); color: var(--unops-color-white); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          Blue<br><code>--unops-color-blue</code>
        </div>
        <div style="background-color: var(--unops-color-midnight); color: var(--unops-color-white); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          Midnight<br><code>--unops-color-midnight</code>
        </div>
        <div style="background-color: var(--unops-color-success); color: var(--unops-color-white); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          Success<br><code>--unops-color-success</code>
        </div>
        <div style="background-color: var(--unops-color-warning); color: var(--unops-color-white); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          Warning<br><code>--unops-color-warning</code>
        </div>
        <div style="background-color: var(--unops-color-danger); color: var(--unops-color-white); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          Danger<br><code>--unops-color-danger</code>
        </div>
      </div>

      <h3 class="example-subtitle">2Blue Color Scale</h3>
      <div class="example-grid">
        <div style="background-color: var(--unops-color-2blue-50); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">50</div>
        <div style="background-color: var(--unops-color-2blue-100); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">100</div>
        <div style="background-color: var(--unops-color-2blue-200); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">200</div>
        <div style="background-color: var(--unops-color-2blue-300); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">300</div>
        <div style="background-color: var(--unops-color-2blue-400); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">400</div>
        <div style="background-color: var(--unops-color-2blue-500); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">500</div>
        <div style="background-color: var(--unops-color-2blue-600); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">600</div>
        <div style="background-color: var(--unops-color-2blue-700); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">700</div>
        <div style="background-color: var(--unops-color-2blue-800); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">800</div>
        <div style="background-color: var(--unops-color-2blue-900); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">900</div>
      </div>

      <h3 class="example-subtitle">Teal Color Scale</h3>
      <div class="example-grid">
        <div style="background-color: var(--unops-color-teal-50); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">50</div>
        <div style="background-color: var(--unops-color-teal-100); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">100</div>
        <div style="background-color: var(--unops-color-teal-200); padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">200</div>
        <div style="background-color: var(--unops-color-teal-300); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">300</div>
        <div style="background-color: var(--unops-color-teal-400); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">400</div>
        <div style="background-color: var(--unops-color-teal-500); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">500</div>
        <div style="background-color: var(--unops-color-teal-600); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">600</div>
        <div style="background-color: var(--unops-color-teal-700); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">700</div>
        <div style="background-color: var(--unops-color-teal-800); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">800</div>
        <div style="background-color: var(--unops-color-teal-900); color: white; padding: var(--spectrum-sys-padding); border-radius: var(--spectrum-sys-border-radius); text-align: center;">900</div>
      </div>
    </div>
  `,
};

export const SemanticColors: Story = {
  render: () => html`
    ${exampleStyles}
    <div class="example-container">
      <h2 class="example-title">🌈 Semantic System Colors</h2>
      
      <div class="example-grid">
        <div style="background-color: var(--spectrum-sys-color-primary); color: var(--spectrum-sys-color-on-primary); padding: var(--spectrum-sys-padding-large); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          <strong>Primary</strong><br>
          <code>--spectrum-sys-color-primary</code>
        </div>
        <div style="background-color: var(--spectrum-sys-color-secondary); color: var(--spectrum-sys-color-on-secondary); padding: var(--spectrum-sys-padding-large); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          <strong>Secondary</strong><br>
          <code>--spectrum-sys-color-secondary</code>
        </div>
        <div style="background-color: var(--spectrum-sys-color-success); color: var(--spectrum-sys-color-on-success); padding: var(--spectrum-sys-padding-large); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          <strong>Success</strong><br>
          <code>--spectrum-sys-color-success</code>
        </div>
        <div style="background-color: var(--spectrum-sys-color-warning); color: var(--spectrum-sys-color-on-warning); padding: var(--spectrum-sys-padding-large); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          <strong>Warning</strong><br>
          <code>--spectrum-sys-color-warning</code>
        </div>
        <div style="background-color: var(--spectrum-sys-color-danger); color: var(--spectrum-sys-color-on-danger); padding: var(--spectrum-sys-padding-large); border-radius: var(--spectrum-sys-border-radius); text-align: center;">
          <strong>Danger</strong><br>
          <code>--spectrum-sys-color-danger</code>
        </div>
      </div>
    </div>
  `,
};

export const Gradients: Story = {
  render: () => html`
    ${exampleStyles}
    <div class="example-container">
      <h2 class="example-title">🌅 UNOPS Gradients</h2>
      
      <div style="display: grid; gap: var(--spectrum-sys-spacing); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        <div style="background: var(--unops-gradient-1); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 1</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-1</code>
        </div>
        <div style="background: var(--unops-gradient-2); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 2</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-2</code>
        </div>
        <div style="background: var(--unops-gradient-3); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 3</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-3</code>
        </div>
        <div style="background: var(--unops-gradient-4); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 4</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-4</code>
        </div>
        <div style="background: var(--unops-gradient-5); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 5</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-5</code>
        </div>
        <div style="background: var(--unops-gradient-6); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 6</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-6</code>
        </div>
        <div style="background: var(--unops-gradient-7); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 7</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-7</code>
        </div>
        <div style="background: var(--unops-gradient-8); color: white; padding: var(--spectrum-sys-padding-x-large); border-radius: var(--spectrum-sys-border-radius); text-align: center; min-height: 150px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
          <strong style="font-size: var(--spectrum-sys-font-size-large);">Gradient 8</strong>
          <code style="font-size: var(--spectrum-sys-font-size-small); margin-top: var(--spectrum-sys-spacing-small);">--unops-gradient-8</code>
        </div>
      </div>
    </div>
  `,
};

export const ButtonExample: Story = {
  render: () => html`
    ${exampleStyles}
    <style>
      .demo-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spectrum-sys-spacing-small);
        font-family: var(--spectrum-sys-font-family);
        font-size: var(--spectrum-sys-font-size);
        font-weight: var(--spectrum-sys-font-weight-medium);
        background-color: var(--spectrum-sys-color-primary);
        color: var(--spectrum-sys-color-on-primary);
        padding: var(--spectrum-sys-padding-small) var(--spectrum-sys-padding);
        border: none;
        border-radius: var(--spectrum-sys-border-radius);
        transition: all var(--spectrum-sys-animation-duration) var(--spectrum-sys-animation-timing-function);
        cursor: pointer;
      }
      
      .demo-button:hover {
        background-color: var(--unops-color-midnight);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .demo-button:active {
        transform: translateY(0);
      }
      
      .demo-button--secondary {
        background-color: var(--spectrum-sys-color-secondary);
        color: var(--spectrum-sys-color-on-secondary);
      }
      
      .demo-button--success {
        background-color: var(--spectrum-sys-color-success);
        color: var(--spectrum-sys-color-on-success);
      }
      
      .demo-button--warning {
        background-color: var(--spectrum-sys-color-warning);
        color: var(--spectrum-sys-color-on-warning);
      }
      
      .demo-button--danger {
        background-color: var(--spectrum-sys-color-danger);
        color: var(--spectrum-sys-color-on-danger);
      }
      
      .demo-button--outlined {
        background-color: transparent;
        color: var(--spectrum-sys-color-primary);
        border: var(--spectrum-sys-border) solid var(--spectrum-sys-color-primary);
      }
      
      .demo-button--outlined:hover {
        background-color: var(--spectrum-color-primary-container);
        transform: translateY(-2px);
      }
      
      .demo-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
    </style>
    
    <div class="example-container">
      <h2 class="example-title">🔘 Interactive Button Examples</h2>
      
      <h3 class="example-subtitle">Button Variants</h3>
      <div style="display: flex; gap: var(--spectrum-sys-spacing); flex-wrap: wrap; margin-bottom: var(--spectrum-sys-spacing-large);">
        <button class="demo-button">Primary Button</button>
        <button class="demo-button demo-button--secondary">Secondary Button</button>
        <button class="demo-button demo-button--success">Success Button</button>
        <button class="demo-button demo-button--warning">Warning Button</button>
        <button class="demo-button demo-button--danger">Danger Button</button>
        <button class="demo-button demo-button--outlined">Outlined Button</button>
        <button class="demo-button" disabled>Disabled Button</button>
      </div>
    </div>
  `,
};

export const CardExample: Story = {
  render: () => html`
    ${exampleStyles}
    <style>
      .demo-card {
        display: flex;
        flex-direction: column;
        gap: var(--spectrum-sys-spacing);
        background-color: var(--spectrum-color-surface);
        color: var(--spectrum-color-on-surface);
        padding: var(--spectrum-sys-padding-large);
        margin: var(--spectrum-sys-spacing);
        border: var(--spectrum-sys-border) solid var(--spectrum-color-outline-variant);
        border-radius: var(--spectrum-sys-border-radius);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all var(--spectrum-sys-animation-duration) var(--spectrum-sys-animation-timing-function);
      }
      
      .demo-card:hover {
        border-color: var(--spectrum-color-primary);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .demo-card__header {
        font-size: var(--spectrum-sys-font-size-large);
        font-weight: var(--spectrum-sys-font-weight-bold);
        color: var(--spectrum-color-on-surface);
        margin-bottom: var(--spectrum-sys-spacing-small);
      }
      
      .demo-card__content {
        font-size: var(--spectrum-sys-font-size);
        font-weight: var(--spectrum-sys-font-weight-regular);
        color: var(--spectrum-color-on-surface-variant);
        line-height: 1.6;
      }
      
      .demo-card__footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--spectrum-sys-spacing-small);
        margin-top: var(--spectrum-sys-spacing);
        padding-top: var(--spectrum-sys-spacing);
        border-top: var(--spectrum-sys-border) solid var(--spectrum-color-outline-variant);
      }
      
      .demo-button-small {
        font-family: var(--spectrum-sys-font-family);
        font-size: var(--spectrum-sys-font-size-small);
        padding: calc(var(--spectrum-sys-padding-small) / 2) var(--spectrum-sys-padding-small);
        background-color: var(--spectrum-sys-color-primary);
        color: var(--spectrum-sys-color-on-primary);
        border: none;
        border-radius: var(--spectrum-sys-border-radius);
        cursor: pointer;
        transition: all var(--spectrum-sys-animation-duration-fast) var(--spectrum-sys-animation-timing-function);
      }
      
      .demo-button-small:hover {
        background-color: var(--unops-color-midnight);
      }
    </style>
    
    <div class="example-container">
      <h2 class="example-title">🃏 Card Component Example</h2>
      
      <div style="display: grid; gap: var(--spectrum-sys-spacing); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        <div class="demo-card">
          <div class="demo-card__header">Card Title</div>
          <div class="demo-card__content">
            This is a card component built entirely with CSS variables from the Spectrum design system. 
            It includes spacing, colors, typography, and animation variables for a consistent look and feel.
          </div>
          <div class="demo-card__footer">
            <button class="demo-button-small">Action</button>
            <button class="demo-button-small">Learn More</button>
          </div>
        </div>
        
        <div class="demo-card">
          <div class="demo-card__header">Another Card</div>
          <div class="demo-card__content">
            Hover over the cards to see the smooth animation transitions using CSS variable-based timing functions.
            All colors automatically adapt to theme changes.
          </div>
          <div class="demo-card__footer">
            <button class="demo-button-small">View Details</button>
          </div>
        </div>
        
        <div class="demo-card">
          <div class="demo-card__header">Third Card</div>
          <div class="demo-card__content">
            The spacing, padding, and typography are all controlled by Spectrum design tokens, 
            ensuring consistency across your entire application.
          </div>
          <div class="demo-card__footer">
            <button class="demo-button-small">Explore</button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    ${exampleStyles}
    <style>
      .demo-form {
        max-width: 500px;
        margin: 0 auto;
      }
      
      .demo-form-group {
        margin-bottom: var(--spectrum-sys-spacing);
      }
      
      .demo-label {
        display: block;
        font-family: var(--spectrum-sys-font-family);
        font-size: var(--spectrum-sys-font-size);
        font-weight: var(--spectrum-sys-font-weight-medium);
        color: var(--spectrum-color-on-surface);
        margin-bottom: var(--spectrum-sys-spacing-small);
      }
      
      .demo-input {
        display: block;
        width: 100%;
        font-family: var(--spectrum-sys-font-family);
        font-size: var(--spectrum-sys-font-size);
        font-weight: var(--spectrum-sys-font-weight-regular);
        background-color: var(--spectrum-color-surface);
        color: var(--spectrum-color-on-surface);
        padding: var(--spectrum-sys-padding-small) var(--spectrum-sys-padding);
        border: var(--spectrum-sys-border) solid var(--spectrum-color-outline);
        border-radius: var(--spectrum-sys-border-radius);
        transition: all var(--spectrum-sys-animation-duration-fast) var(--spectrum-sys-animation-timing-function);
        box-sizing: border-box;
      }
      
      .demo-input:focus {
        outline: none;
        border-color: var(--spectrum-sys-color-primary);
        box-shadow: 0 0 0 3px var(--spectrum-color-primary-container);
      }
      
      .demo-input::placeholder {
        color: var(--spectrum-color-on-surface-variant);
        opacity: 0.7;
      }
      
      .demo-input--error {
        border-color: var(--spectrum-color-error);
      }
      
      .demo-input--error:focus {
        box-shadow: 0 0 0 3px var(--spectrum-color-error-container);
      }
      
      .demo-error-message {
        font-size: var(--spectrum-sys-font-size-small);
        color: var(--spectrum-color-error);
        margin-top: var(--spectrum-sys-spacing-small);
      }
      
      .demo-submit-button {
        font-family: var(--spectrum-sys-font-family);
        font-size: var(--spectrum-sys-font-size);
        font-weight: var(--spectrum-sys-font-weight-medium);
        background-color: var(--spectrum-sys-color-primary);
        color: var(--spectrum-sys-color-on-primary);
        padding: var(--spectrum-sys-padding-small) var(--spectrum-sys-padding-large);
        border: none;
        border-radius: var(--spectrum-sys-border-radius);
        cursor: pointer;
        transition: all var(--spectrum-sys-animation-duration) var(--spectrum-sys-animation-timing-function);
        width: 100%;
      }
      
      .demo-submit-button:hover {
        background-color: var(--unops-color-midnight);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    </style>
    
    <div class="example-container">
      <h2 class="example-title">📝 Form Input Examples</h2>
      
      <form class="demo-form">
        <div class="demo-form-group">
          <label class="demo-label" for="name">Name</label>
          <input class="demo-input" type="text" id="name" placeholder="Enter your name">
        </div>
        
        <div class="demo-form-group">
          <label class="demo-label" for="email">Email</label>
          <input class="demo-input" type="email" id="email" placeholder="your.email@example.com">
        </div>
        
        <div class="demo-form-group">
          <label class="demo-label" for="error-example">Input with Error</label>
          <input class="demo-input demo-input--error" type="text" id="error-example" value="invalid@">
          <div class="demo-error-message">Please enter a valid email address</div>
        </div>
        
        <div class="demo-form-group">
          <label class="demo-label" for="message">Message</label>
          <textarea class="demo-input" id="message" rows="4" placeholder="Enter your message"></textarea>
        </div>
        
        <button type="button" class="demo-submit-button">Submit Form</button>
      </form>
    </div>
  `,
};

export const NotificationExample: Story = {
  render: () => html`
    ${exampleStyles}
    <style>
      .demo-notification {
        padding: var(--spectrum-sys-padding);
        border-radius: var(--spectrum-sys-border-radius);
        margin-bottom: var(--spectrum-sys-spacing);
        display: flex;
        align-items: center;
        gap: var(--spectrum-sys-spacing-small);
        font-family: var(--spectrum-sys-font-family);
      }
      
      .demo-notification--success {
        background-color: var(--spectrum-sys-color-success);
        color: var(--spectrum-sys-color-on-success);
        border-left: 4px solid var(--unops-color-green-700);
      }
      
      .demo-notification--warning {
        background-color: var(--spectrum-sys-color-warning);
        color: var(--spectrum-sys-color-on-warning);
        border-left: 4px solid var(--unops-color-orange-700);
      }
      
      .demo-notification--error {
        background-color: var(--spectrum-sys-color-danger);
        color: var(--spectrum-sys-color-on-danger);
        border-left: 4px solid var(--unops-color-red-700);
      }
      
      .demo-notification--info {
        background-color: var(--spectrum-color-primary-container);
        color: var(--spectrum-color-on-primary-container);
        border-left: 4px solid var(--spectrum-sys-color-primary);
      }
      
      .demo-notification__icon {
        font-family: var(--spectrum-sys-icon-font-family);
        font-size: calc(var(--spectrum-sys-icon-font-size) * 1.5);
      }
    </style>
    
    <div class="example-container">
      <h2 class="example-title">🔔 Notification Examples</h2>
      
      <div class="demo-notification demo-notification--success">
        <span class="demo-notification__icon">check_circle</span>
        <div>
          <strong>Success!</strong> Your changes have been saved successfully.
        </div>
      </div>
      
      <div class="demo-notification demo-notification--info">
        <span class="demo-notification__icon">info</span>
        <div>
          <strong>Information:</strong> This feature uses CSS variables from the Spectrum design system.
        </div>
      </div>
      
      <div class="demo-notification demo-notification--warning">
        <span class="demo-notification__icon">warning</span>
        <div>
          <strong>Warning:</strong> Please review your input before proceeding.
        </div>
      </div>
      
      <div class="demo-notification demo-notification--error">
        <span class="demo-notification__icon">error</span>
        <div>
          <strong>Error:</strong> Something went wrong. Please try again.
        </div>
      </div>
    </div>
  `,
};

export const SpacingExample: Story = {
  render: () => html`
    ${exampleStyles}
    <style>
      .spacing-demo {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--spectrum-sys-spacing-large);
      }
      
      .spacing-box {
        background-color: var(--spectrum-color-primary);
        color: var(--spectrum-sys-color-on-primary);
        border-radius: var(--spectrum-sys-border-radius);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--spectrum-sys-font-family);
        font-size: var(--spectrum-sys-font-size-small);
        font-weight: var(--spectrum-sys-font-weight-medium);
      }
      
      .spacing-small {
        padding: var(--spectrum-sys-padding-small);
      }
      
      .spacing-medium {
        padding: var(--spectrum-sys-padding);
      }
      
      .spacing-large {
        padding: var(--spectrum-sys-padding-large);
      }
      
      .spacing-x-large {
        padding: var(--spectrum-sys-padding-x-large);
      }
      
      .gap-demo {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      
      .gap-small {
        gap: var(--spectrum-sys-spacing-small);
      }
      
      .gap-medium {
        gap: var(--spectrum-sys-spacing);
      }
      
      .gap-large {
        gap: var(--spectrum-sys-spacing-large);
      }
    </style>
    
    <div class="example-container">
      <h2 class="example-title">📏 Spacing & Padding Examples</h2>
      
      <h3 class="example-subtitle">Padding Variations</h3>
      <div class="spacing-demo">
        <div class="gap-demo gap-medium">
          <div class="spacing-box spacing-small">Small Padding</div>
          <div class="spacing-box spacing-medium">Medium Padding</div>
          <div class="spacing-box spacing-large">Large Padding</div>
          <div class="spacing-box spacing-x-large">X-Large Padding</div>
        </div>
      </div>
      
      <h3 class="example-subtitle">Gap Spacing (Small)</h3>
      <div class="gap-demo gap-small" style="margin-bottom: var(--spectrum-sys-spacing);">
        <div class="spacing-box spacing-small">Item 1</div>
        <div class="spacing-box spacing-small">Item 2</div>
        <div class="spacing-box spacing-small">Item 3</div>
        <div class="spacing-box spacing-small">Item 4</div>
        <div class="spacing-box spacing-small">Item 5</div>
      </div>
      
      <h3 class="example-subtitle">Gap Spacing (Medium)</h3>
      <div class="gap-demo gap-medium" style="margin-bottom: var(--spectrum-sys-spacing);">
        <div class="spacing-box spacing-small">Item 1</div>
        <div class="spacing-box spacing-small">Item 2</div>
        <div class="spacing-box spacing-small">Item 3</div>
        <div class="spacing-box spacing-small">Item 4</div>
        <div class="spacing-box spacing-small">Item 5</div>
      </div>
      
      <h3 class="example-subtitle">Gap Spacing (Large)</h3>
      <div class="gap-demo gap-large">
        <div class="spacing-box spacing-small">Item 1</div>
        <div class="spacing-box spacing-small">Item 2</div>
        <div class="spacing-box spacing-small">Item 3</div>
        <div class="spacing-box spacing-small">Item 4</div>
        <div class="spacing-box spacing-small">Item 5</div>
      </div>
    </div>
  `,
};

export const TypographyExample: Story = {
  render: () => html`
    ${exampleStyles}
    <style>
      .typo-example {
        font-family: var(--spectrum-sys-font-family);
        color: var(--spectrum-color-on-surface);
        margin-bottom: var(--spectrum-sys-spacing);
      }
      
      .typo-h1 {
        font-size: var(--spectrum-sys-font-size-x-large);
        font-weight: var(--spectrum-sys-font-weight-bold);
      }
      
      .typo-h2 {
        font-size: var(--spectrum-sys-font-size-large);
        font-weight: var(--spectrum-sys-font-weight-bold);
      }
      
      .typo-body {
        font-size: var(--spectrum-sys-font-size);
        font-weight: var(--spectrum-sys-font-weight-regular);
        line-height: 1.6;
      }
      
      .typo-small {
        font-size: var(--spectrum-sys-font-size-small);
        font-weight: var(--spectrum-sys-font-weight-light);
        color: var(--spectrum-color-on-surface-variant);
      }
      
      .typo-bold {
        font-weight: var(--spectrum-sys-font-weight-bold);
      }
      
      .typo-medium {
        font-weight: var(--spectrum-sys-font-weight-medium);
      }
    </style>
    
    <div class="example-container">
      <h2 class="example-title">✏️ Typography Examples</h2>
      
      <div class="typo-example typo-h1">
        Heading 1 - X-Large, Bold
      </div>
      
      <div class="typo-example typo-h2">
        Heading 2 - Large, Bold
      </div>
      
      <div class="typo-example typo-body">
        Body text - This is regular body text using the Spectrum design system typography variables. 
        It demonstrates proper line-height and font sizing for optimal readability.
      </div>
      
      <div class="typo-example typo-body typo-medium">
        Body text - Medium weight for emphasis within body content.
      </div>
      
      <div class="typo-example typo-body typo-bold">
        Body text - Bold weight for strong emphasis.
      </div>
      
      <div class="typo-example typo-small">
        Small text - Used for captions, hints, or secondary information.
      </div>
    </div>
  `,
};





