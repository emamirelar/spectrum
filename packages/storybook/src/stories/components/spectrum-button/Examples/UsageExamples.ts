import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Common button patterns for forms
export const formButtons = () => html`
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <spectrum-button
      button-text="Save"
      variant="primary"
      show-left-icon
      left-icon="save"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Cancel"
      variant="secondary"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Delete"
      variant="danger"
      show-left-icon
      left-icon="delete"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// Navigation buttons
export const navigationButtons = () => html`
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
    <spectrum-button
      button-text="Back"
      variant="ghost"
      show-left-icon
      left-icon="arrow_back"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Continue"
      variant="primary"
      show-right-icon
      right-icon="arrow_forward"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Skip"
      variant="ghost"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// Media controls
export const mediaControls = () => html`
  <div style="display: flex; gap: 8px; align-items: center;">
    <spectrum-button
      variant="ghost"
      icon-only
      show-left-icon
      left-icon="skip_previous"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      variant="primary"
      icon-only
      show-left-icon
      left-icon="play_arrow"
      size="lg"
      ripple
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      variant="ghost"
      icon-only
      show-left-icon
      left-icon="skip_next"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      variant="ghost"
      icon-only
      show-left-icon
      left-icon="volume_up"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// Toolbar actions
export const toolbarActions = () => html`
  <div style="display: flex; gap: 4px; align-items: center; padding: 8px; background: #f5f5f5; border-radius: 8px;">
    <spectrum-button
      variant="ghost"
      icon-only
      show-left-icon
      left-icon="edit"
      size="sm"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      variant="ghost"
      icon-only
      show-left-icon
      left-icon="content_copy"
      size="sm"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      variant="ghost"
      icon-only
      show-left-icon
      left-icon="share"
      size="sm"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <div style="width: 1px; height: 20px; background: #ccc; margin: 0 4px;"></div>
    <spectrum-button
      variant="ghost"
      icon-only
      show-left-icon
      left-icon="delete"
      size="sm"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// Call-to-action buttons
export const ctaButtons = () => html`
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
    <spectrum-button
      button-text="Get Started"
      variant="primary"
      size="lg"
      show-right-icon
      right-icon="arrow_forward"
      ripple
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Learn More"
      variant="outline"
      show-right-icon
      right-icon="open_in_new"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Download App"
      variant="success"
      show-left-icon
      left-icon="download"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// Social actions
export const socialActions = () => html`
  <div style="display: flex; gap: 8px; align-items: center;">
    <spectrum-button
      button-text="Like"
      variant="ghost"
      show-left-icon
      left-icon="favorite_border"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Share"
      variant="primary"
      show-left-icon
      left-icon="share"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Comment"
      variant="ghost"
      show-left-icon
      left-icon="comment"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// Loading states simulation
export const loadingStates = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Submit"
        variant="primary"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Normal State</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Submitting..."
        variant="primary"
        disabled
        show-left-icon
        left-icon="hourglass_empty"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Loading State</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        button-text="Success!"
        variant="success"
        show-left-icon
        left-icon="check"
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Success State</small>
    </div>
  </div>
`;

// Accessibility examples with proper labeling
export const accessibilityExamples = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <spectrum-button
      button-text="Add to Cart"
      variant="primary"
      show-left-icon
      left-icon="add_shopping_cart"
      action="add-to-cart"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      variant="primary"
      icon-only
      show-left-icon
      left-icon="close"
      action="close-dialog"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="External Link"
      variant="outline"
      show-right-icon
      right-icon="launch"
      action="external-link"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`; 