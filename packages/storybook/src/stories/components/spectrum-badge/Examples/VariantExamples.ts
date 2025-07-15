import { html } from 'lit';

/**
 * Comprehensive showcase of all badge variants
 */

// All variants in standard form
export const allVariants = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <spectrum-badge text="Primary" variant="primary"></spectrum-badge>
    <spectrum-badge text="Secondary" variant="secondary"></spectrum-badge>
    <spectrum-badge text="Success" variant="success"></spectrum-badge>
    <spectrum-badge text="Warning" variant="warning"></spectrum-badge>
    <spectrum-badge text="Danger" variant="danger"></spectrum-badge>
  </div>
`;

// All variants in circular form
export const circularVariants = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <spectrum-badge text="1" variant="primary" circular></spectrum-badge>
    <spectrum-badge text="2" variant="secondary" circular></spectrum-badge>
    <spectrum-badge text="3" variant="success" circular></spectrum-badge>
    <spectrum-badge text="4" variant="warning" circular></spectrum-badge>
    <spectrum-badge text="5" variant="danger" circular></spectrum-badge>
  </div>
`;

// Status variants with meaningful labels
export const statusVariants = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <spectrum-badge text="Active" variant="primary"></spectrum-badge>
    <spectrum-badge text="Inactive" variant="secondary"></spectrum-badge>
    <spectrum-badge text="Approved" variant="success"></spectrum-badge>
    <spectrum-badge text="Pending" variant="warning"></spectrum-badge>
    <spectrum-badge text="Rejected" variant="danger"></spectrum-badge>
  </div>
`;

// Notification count variants
export const notificationVariants = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <spectrum-badge text="0" variant="secondary" circular></spectrum-badge>
    <spectrum-badge text="1" variant="primary" circular></spectrum-badge>
    <spectrum-badge text="9" variant="warning" circular></spectrum-badge>
    <spectrum-badge text="99+" variant="danger" circular></spectrum-badge>
  </div>
`;

// Size comparison across variants
export const variantSizeComparison = () => html`
  <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; text-align: center;">
    <!-- Headers -->
    <div><strong>Primary</strong></div>
    <div><strong>Secondary</strong></div>
    <div><strong>Success</strong></div>
    <div><strong>Warning</strong></div>
    <div><strong>Danger</strong></div>
    
    <!-- Small size -->
    <spectrum-badge text="Small" variant="primary" size="small"></spectrum-badge>
    <spectrum-badge text="Small" variant="secondary" size="small"></spectrum-badge>
    <spectrum-badge text="Small" variant="success" size="small"></spectrum-badge>
    <spectrum-badge text="Small" variant="warning" size="small"></spectrum-badge>
    <spectrum-badge text="Small" variant="danger" size="small"></spectrum-badge>
    
    <!-- Medium size -->
    <spectrum-badge text="Medium" variant="primary" size="medium"></spectrum-badge>
    <spectrum-badge text="Medium" variant="secondary" size="medium"></spectrum-badge>
    <spectrum-badge text="Medium" variant="success" size="medium"></spectrum-badge>
    <spectrum-badge text="Medium" variant="warning" size="medium"></spectrum-badge>
    <spectrum-badge text="Medium" variant="danger" size="medium"></spectrum-badge>
    
    <!-- Large size -->
    <spectrum-badge text="Large" variant="primary" size="large"></spectrum-badge>
    <spectrum-badge text="Large" variant="secondary" size="large"></spectrum-badge>
    <spectrum-badge text="Large" variant="success" size="large"></spectrum-badge>
    <spectrum-badge text="Large" variant="warning" size="large"></spectrum-badge>
    <spectrum-badge text="Large" variant="danger" size="large"></spectrum-badge>
  </div>
`; 