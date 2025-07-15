import { html } from 'lit';

/**
 * Basic badge configurations demonstrating core functionality
 */

// Basic primary badge
export const basicPrimaryBadge = () => html`
  <spectrum-badge 
    text="New" 
    variant="primary">
  </spectrum-badge>
`;

// Basic secondary badge
export const basicSecondaryBadge = () => html`
  <spectrum-badge 
    text="Draft" 
    variant="secondary">
  </spectrum-badge>
`;

// Basic circular badge (for counts)
export const basicCircularBadge = () => html`
  <spectrum-badge 
    text="5" 
    variant="danger" 
    circular>
  </spectrum-badge>
`;

// Size examples
export const basicSizeExamples = () => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <spectrum-badge text="Small" variant="primary" size="small"></spectrum-badge>
    <spectrum-badge text="Medium" variant="primary" size="medium"></spectrum-badge>
    <spectrum-badge text="Large" variant="primary" size="large"></spectrum-badge>
  </div>
`;

// Slotted content example
export const basicSlottedContent = () => html`
  <spectrum-badge variant="success">
    <span>✓ Complete</span>
  </spectrum-badge>
`; 