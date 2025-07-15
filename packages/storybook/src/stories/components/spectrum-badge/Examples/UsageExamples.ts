import { html } from 'lit';

/**
 * Real-world usage patterns and combinations
 */

// Navigation with notification badges
export const navigationUsage = () => html`
  <nav style="background: #f8f9fa; padding: 1rem; border-radius: 8px; display: flex; gap: 2rem;">
    <div style="position: relative; display: inline-block;">
      <span style="padding: 0.5rem 1rem; background: white; border-radius: 4px; margin-right: 0.5rem;">Dashboard</span>
    </div>
    <div style="position: relative; display: inline-block;">
      <span style="padding: 0.5rem 1rem; background: white; border-radius: 4px; margin-right: 0.5rem;">Messages</span>
      <spectrum-badge text="5" variant="danger" circular size="small" style="position: absolute; top: -8px; right: -8px;"></spectrum-badge>
    </div>
    <div style="position: relative; display: inline-block;">
      <span style="padding: 0.5rem 1rem; background: white; border-radius: 4px; margin-right: 0.5rem;">Notifications</span>
      <spectrum-badge text="12" variant="warning" circular size="small" style="position: absolute; top: -8px; right: -8px;"></spectrum-badge>
    </div>
    <div style="position: relative; display: inline-block;">
      <span style="padding: 0.5rem 1rem; background: white; border-radius: 4px; margin-right: 0.5rem;">Tasks</span>
      <spectrum-badge text="99+" variant="danger" circular size="small" style="position: absolute; top: -8px; right: -8px;"></spectrum-badge>
    </div>
  </nav>
`;

// Card with status badges
export const cardStatusUsage = () => html`
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem; background: white;">
      <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
        <h3 style="margin: 0;">Project Alpha</h3>
        <spectrum-badge text="Active" variant="success"></spectrum-badge>
      </div>
      <p style="color: #666; margin: 0;">Development in progress with all systems operational.</p>
    </div>
    
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem; background: white;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="margin: 0;">Project Beta</h3>
        <spectrum-badge text="Pending" variant="warning"></spectrum-badge>
      </div>
      <p style="color: #666; margin: 0;">Waiting for approval before proceeding to next phase.</p>
    </div>
    
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 1rem; background: white;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="margin: 0;">Project Gamma</h3>
        <spectrum-badge text="Completed" variant="success"></spectrum-badge>
      </div>
      <p style="color: #666; margin: 0;">Successfully delivered and deployed to production.</p>
    </div>
  </div>
`;

// User list with role badges
export const userRoleUsage = () => html`
  <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background: #f8f9fa; padding: 1rem; border-bottom: 1px solid #e0e0e0;">
      <h3 style="margin: 0;">Team Members</h3>
    </div>
    <div style="padding: 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f0f0f0;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 40px; height: 40px; background: #e3f2fd; border-radius: 50%; display: flex; align-items: center; justify-content: center;">JD</div>
          <div>
            <div style="font-weight: 500;">John Doe</div>
            <div style="font-size: 0.9rem; color: #666;">john.doe@company.com</div>
          </div>
        </div>
        <spectrum-badge text="Admin" variant="danger"></spectrum-badge>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f0f0f0;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 40px; height: 40px; background: #e8f5e8; border-radius: 50%; display: flex; align-items: center; justify-content: center;">SM</div>
          <div>
            <div style="font-weight: 500;">Sarah Miller</div>
            <div style="font-size: 0.9rem; color: #666;">sarah.miller@company.com</div>
          </div>
        </div>
        <spectrum-badge text="Editor" variant="primary"></spectrum-badge>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 40px; height: 40px; background: #fff3e0; border-radius: 50%; display: flex; align-items: center; justify-content: center;">MJ</div>
          <div>
            <div style="font-weight: 500;">Mike Johnson</div>
            <div style="font-size: 0.9rem; color: #666;">mike.johnson@company.com</div>
          </div>
        </div>
        <spectrum-badge text="Viewer" variant="secondary"></spectrum-badge>
      </div>
    </div>
  </div>
`;

// E-commerce product badges
export const ecommerceUsage = () => html`
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background: white; position: relative;">
      <div style="position: absolute; top: 0.5rem; right: 0.5rem; z-index: 1;">
        <spectrum-badge text="Sale" variant="danger"></spectrum-badge>
      </div>
      <div style="height: 150px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        Product Image
      </div>
      <div style="padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0;">Wireless Headphones</h4>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold;">$99.99</span>
          <spectrum-badge text="Free Shipping" variant="success" size="small"></spectrum-badge>
        </div>
      </div>
    </div>
    
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background: white; position: relative;">
      <div style="position: absolute; top: 0.5rem; right: 0.5rem; z-index: 1;">
        <spectrum-badge text="New" variant="primary"></spectrum-badge>
      </div>
      <div style="height: 150px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        Product Image
      </div>
      <div style="padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0;">Smart Watch</h4>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold;">$299.99</span>
          <spectrum-badge text="Limited" variant="warning" size="small"></spectrum-badge>
        </div>
      </div>
    </div>
    
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background: white; position: relative;">
      <div style="height: 150px; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        Product Image
      </div>
      <div style="padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0;">Bluetooth Speaker</h4>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold;">$79.99</span>
          <spectrum-badge text="Best Seller" variant="success" size="small"></spectrum-badge>
        </div>
      </div>
    </div>
  </div>
`;

// Dashboard metrics with badges
export const dashboardMetricsUsage = () => html`
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">1,234</div>
      <div style="color: #666; margin-bottom: 1rem;">Total Users</div>
      <spectrum-badge text="+12%" variant="success"></spectrum-badge>
    </div>
    
    <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">$45,678</div>
      <div style="color: #666; margin-bottom: 1rem;">Revenue</div>
      <spectrum-badge text="+8%" variant="success"></spectrum-badge>
    </div>
    
    <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">89.5%</div>
      <div style="color: #666; margin-bottom: 1rem;">Uptime</div>
      <spectrum-badge text="-2%" variant="warning"></spectrum-badge>
    </div>
    
    <div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <div style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">24</div>
      <div style="color: #666; margin-bottom: 1rem;">Open Issues</div>
      <spectrum-badge text="Critical" variant="danger"></spectrum-badge>
    </div>
  </div>
`;

// Mobile app notification patterns
export const mobileNotificationUsage = () => html`
  <div style="max-width: 300px; margin: 0 auto; background: #f8f9fa; border-radius: 12px; padding: 1rem;">
    <h4 style="margin-top: 0; text-align: center;">Mobile App Layout</h4>
    <div style="background: white; border-radius: 8px; padding: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="margin: 0;">Inbox</h3>
        <spectrum-badge text="8" variant="danger" circular></spectrum-badge>
      </div>
      
      <div style="border-bottom: 1px solid #f0f0f0; padding: 0.75rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 500;">Meeting Reminder</div>
            <div style="font-size: 0.8rem; color: #666;">Team standup in 15 minutes</div>
          </div>
          <spectrum-badge text="●" variant="primary" circular size="small"></spectrum-badge>
        </div>
      </div>
      
      <div style="border-bottom: 1px solid #f0f0f0; padding: 0.75rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 500;">System Alert</div>
            <div style="font-size: 0.8rem; color: #666;">Server maintenance scheduled</div>
          </div>
          <spectrum-badge text="●" variant="warning" circular size="small"></spectrum-badge>
        </div>
      </div>
      
      <div style="padding: 0.75rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 500;">Welcome Message</div>
            <div style="font-size: 0.8rem; color: #666;">Thanks for joining our platform!</div>
          </div>
          <spectrum-badge text="●" variant="success" circular size="small"></spectrum-badge>
        </div>
      </div>
    </div>
  </div>
`;

// Accessibility examples
export const accessibilityUsage = () => html`
  <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
    <h4 style="margin-top: 0;">Accessibility Considerations</h4>
    
    <div style="margin-bottom: 2rem;">
      <h5>High Contrast Examples</h5>
      <div style="background: black; padding: 1rem; border-radius: 4px; margin-bottom: 1rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <spectrum-badge text="Critical" variant="danger"></spectrum-badge>
          <spectrum-badge text="Warning" variant="warning"></spectrum-badge>
          <spectrum-badge text="Success" variant="success"></spectrum-badge>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 2rem;">
      <h5>Size Accessibility</h5>
      <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">
        Large badges for better visibility and touch targets on mobile devices.
      </p>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <spectrum-badge text="Easy to Read" variant="primary" size="large"></spectrum-badge>
        <spectrum-badge text="12" variant="danger" size="large" circular></spectrum-badge>
      </div>
    </div>
    
    <div>
      <h5>Meaningful Content</h5>
      <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">
        Use descriptive text rather than just colors to convey meaning.
      </p>
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <spectrum-badge text="✓ Approved" variant="success"></spectrum-badge>
        <spectrum-badge text="⚠ Review Required" variant="warning"></spectrum-badge>
        <spectrum-badge text="✗ Rejected" variant="danger"></spectrum-badge>
      </div>
    </div>
  </div>
`; 