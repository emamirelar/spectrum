import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Sound and haptic feedback examples
export const feedbackFeatures = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Sound Only"
        variant="primary"
        sound
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>🔊 Sound Effect</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Haptic Only"
        variant="secondary"
        haptic
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>📳 Haptic Feedback</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Ripple Only"
        variant="success"
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>💫 Ripple Effect</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="All Effects"
        variant="warning"
        sound
        haptic
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>🎯 Complete Feedback</small>
    </div>
  </div>
`;

// Icon configurations
export const iconExamples = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Left Icon"
        variant="primary"
        show-left-icon
        left-icon="add"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Left Icon</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Right Icon"
        variant="primary"
        show-right-icon
        right-icon="arrow_forward"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Right Icon</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Both Icons"
        variant="primary"
        show-left-icon
        left-icon="download"
        show-right-icon
        right-icon="open_in_new"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Both Icons</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        variant="primary"
        icon-only
        show-left-icon
        left-icon="settings"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Icon Only</small>
    </div>
  </div>
`;

// Size variations
export const sizeExamples = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Small"
        variant="primary"
        size="sm"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Small (sm)</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Base"
        variant="primary"
        size="base"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Base (default)</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Large"
        variant="primary"
        size="lg"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Large (lg)</small>
    </div>
  </div>
`;

// Animation examples
export const animationExamples = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Full Animation"
        variant="primary"
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Default Animations</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Minimal Animation"
        variant="secondary"
        minimal-animation
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Minimal Animation</small>
    </div>
  </div>
`;

// State examples
export const stateExamples = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Normal"
        variant="primary"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Normal State</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Disabled"
        variant="primary"
        disabled
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Disabled State</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="With Action"
        variant="success"
        action="custom-action"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Custom Action</small>
    </div>
  </div>
`; 