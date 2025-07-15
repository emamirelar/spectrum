import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Basic button examples for reuse across stories
export const basicPrimaryButton = () => html`
  <spectrum-button
    button-text="Primary Button"
    variant="primary"
    size="base"
    @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
  ></spectrum-button>
`;

export const basicSecondaryButton = () => html`
  <spectrum-button
    button-text="Secondary Button"
    variant="secondary"
    size="base"
    @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
  ></spectrum-button>
`;

export const basicDisabledButton = () => html`
  <spectrum-button
    button-text="Disabled Button"
    variant="primary"
    size="base"
    disabled
    @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
  ></spectrum-button>
`;

export const basicIconOnlyButton = () => html`
  <spectrum-button
    variant="primary"
    size="base"
    icon-only
    show-left-icon
    left-icon="settings"
    @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
  ></spectrum-button>
`;

export const basicFabButton = () => html`
  <spectrum-button
    variant="fab"
    size="lg"
    icon-only
    show-left-icon
    left-icon="add"
    ripple
    @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
  ></spectrum-button>
`; 