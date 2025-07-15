import { html } from 'lit';

/**
 * Feature demonstrations for spectrum-badge component
 */

// Circular badge feature
export const circularFeature = () => html`
  <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
    <div style="text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0;">Standard</h4>
      <spectrum-badge text="New" variant="primary"></spectrum-badge>
    </div>
    <div style="text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0;">Circular</h4>
      <spectrum-badge text="5" variant="primary" circular></spectrum-badge>
    </div>
    <div style="text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0;">Single Char</h4>
      <spectrum-badge text="!" variant="warning" circular></spectrum-badge>
    </div>
    <div style="text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0;">Icon Placeholder</h4>
      <spectrum-badge text="★" variant="success" circular></spectrum-badge>
    </div>
  </div>
`;

// Slotted content features
export const slottedContentFeatures = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <spectrum-badge variant="primary">
      <span>✓ Verified</span>
    </spectrum-badge>
    <spectrum-badge variant="success">
      <span>★ Premium</span>
    </spectrum-badge>
    <spectrum-badge variant="warning">
      <span>⚠ Alert</span>
    </spectrum-badge>
    <spectrum-badge variant="danger">
      <span>✗ Failed</span>
    </spectrum-badge>
  </div>
`;

// Size variations feature
export const sizeFeatures = () => html`
  <div style="display: flex; gap: 2rem; align-items: center;">
    <div style="text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
      <div style="display: flex; gap: 0.5rem; flex-direction: column; align-items: center;">
        <spectrum-badge text="Badge" variant="primary" size="small"></spectrum-badge>
        <spectrum-badge text="3" variant="danger" size="small" circular></spectrum-badge>
      </div>
    </div>
    <div style="text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
      <div style="display: flex; gap: 0.5rem; flex-direction: column; align-items: center;">
        <spectrum-badge text="Badge" variant="primary" size="medium"></spectrum-badge>
        <spectrum-badge text="5" variant="danger" size="medium" circular></spectrum-badge>
      </div>
    </div>
    <div style="text-align: center;">
      <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
      <div style="display: flex; gap: 0.5rem; flex-direction: column; align-items: center;">
        <spectrum-badge text="Badge" variant="primary" size="large"></spectrum-badge>
        <spectrum-badge text="9" variant="danger" size="large" circular></spectrum-badge>
      </div>
    </div>
  </div>
`;

// Notification count progression
export const notificationCountProgression = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <div style="text-align: center;">
      <div style="margin-bottom: 0.5rem;">No notifications</div>
      <spectrum-badge text="0" variant="secondary" circular></spectrum-badge>
    </div>
    <div style="text-align: center;">
      <div style="margin-bottom: 0.5rem;">Few notifications</div>
      <spectrum-badge text="3" variant="primary" circular></spectrum-badge>
    </div>
    <div style="text-align: center;">
      <div style="margin-bottom: 0.5rem;">Many notifications</div>
      <spectrum-badge text="12" variant="warning" circular></spectrum-badge>
    </div>
    <div style="text-align: center;">
      <div style="margin-bottom: 0.5rem;">Too many!</div>
      <spectrum-badge text="99+" variant="danger" circular></spectrum-badge>
    </div>
  </div>
`;

// Status indicator patterns
export const statusIndicatorPatterns = () => html`
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
    <div>
      <h4>System Status</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <spectrum-badge text="Online" variant="success" size="small"></spectrum-badge>
          <span>System operational</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <spectrum-badge text="Maintenance" variant="warning" size="small"></spectrum-badge>
          <span>Scheduled downtime</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <spectrum-badge text="Offline" variant="danger" size="small"></spectrum-badge>
          <span>Service unavailable</span>
        </div>
      </div>
    </div>
    <div>
      <h4>User Status</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <spectrum-badge text="●" variant="success" circular size="small"></spectrum-badge>
          <span>Active</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <spectrum-badge text="●" variant="warning" circular size="small"></spectrum-badge>
          <span>Away</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <spectrum-badge text="●" variant="secondary" circular size="small"></spectrum-badge>
          <span>Offline</span>
        </div>
      </div>
    </div>
  </div>
`;

// Debug mode demonstration
export const debugFeature = () => html`
  <div style="background: #f5f5f5; padding: 1rem; border-radius: 4px;">
    <h4 style="margin-top: 0;">Debug Mode (Check Console)</h4>
    <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">
      These badges have debug mode enabled. Open browser console to see debug output.
    </p>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <spectrum-badge text="Debug" variant="primary" debug></spectrum-badge>
      <spectrum-badge text="5" variant="danger" circular debug></spectrum-badge>
    </div>
  </div>
`; 