import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// All button variants showcase
export const allVariants = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <spectrum-button
      button-text="Primary"
      variant="primary"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Secondary"
      variant="secondary"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Success"
      variant="success"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Warning"
      variant="warning"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Danger"
      variant="danger"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Ghost"
      variant="ghost"
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// All outline variants
export const allOutlineVariants = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <spectrum-button
      button-text="Primary Outline"
      variant="primary"
      outline
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Secondary Outline"
      variant="secondary"
      outline
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Success Outline"
      variant="success"
      outline
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Warning Outline"
      variant="warning"
      outline
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Danger Outline"
      variant="danger"
      outline
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
    <spectrum-button
      button-text="Ghost Outline"
      variant="ghost"
      outline
      @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// FAB variants showcase
export const fabVariants = () => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        variant="fab"
        size="sm"
        icon-only
        show-left-icon
        left-icon="edit"
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Small FAB</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        variant="fab"
        size="base"
        icon-only
        show-left-icon
        left-icon="add"
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Medium FAB</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        variant="fab"
        size="lg"
        icon-only
        show-left-icon
        left-icon="favorite"
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Large FAB</small>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <spectrum-button
        variant="fab"
        size="base"
        button-text="Extended FAB"
        show-left-icon
        left-icon="create"
        ripple
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
      ></spectrum-button>
      <small>Extended FAB</small>
    </div>
  </div>
`; 