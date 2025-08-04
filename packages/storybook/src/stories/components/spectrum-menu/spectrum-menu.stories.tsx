import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumMenu Component
 * 
 * The menu component provides a responsive and accessible navigation solution with support for both horizontal and vertical orientations, megamenu variant with rich content, and mobile-responsive design with hamburger menu functionality.
 * 
 * ### Key Features
 * - **Dual Orientation**: Horizontal header menus and vertical sidebar navigation
 * - **Megamenu Variant**: Full-width dropdowns with rich content, descriptions, and icons
 * - **Mobile Responsive**: Automatic hamburger menu for mobile devices
 * - **Material Icons**: Full support for Material Design icons throughout
 * - **Nested Navigation**: Multi-level submenus with hierarchical organization
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * 
 * ### Usage Guidelines
 * - Use for: Primary navigation, header menus, sidebar navigation, complex site structures
 * - Perfect for: Corporate websites, e-commerce sites, documentation, multi-section applications
 * - Avoid when: Simple single-page applications, minimal navigation needs
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **itemClick**: Emitted when menu items are clicked with item details and navigation context
 */

// Menu item interfaces
interface MenuItem {
  label: string;
  href?: string;
  icon?: string;
  disabled?: boolean;
  description?: string;
  children?: MenuItem[];
}

// Component interfaces for TypeScript support
interface SpectrumMenuElement extends HTMLElement {
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'megamenu';
  items: MenuItem[];
  mobileBreakpoint: number;
  mobileMenuTitle: string;
  directNavigation: boolean;
  navigationColor: string;
}

// Story arguments interface
interface SpectrumMenuArgs extends SpectrumMenuElement {}

// Sample menu data for different scenarios
const basicNavItems: MenuItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '/about', icon: 'info' },
  { label: 'Services', href: '/services', icon: 'design_services' },
  { label: 'Portfolio', href: '/portfolio', icon: 'work' },
  { label: 'Contact', href: '/contact', icon: 'contact_mail' }
];

const eCommerceNavItems: MenuItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  {
    label: 'Shop',
    href: '/shop',
    icon: 'shopping_bag',
    children: [
      { label: 'All Products', href: '/shop/all', icon: 'inventory_2' },
      { label: 'Electronics', href: '/shop/electronics', icon: 'devices' },
      { label: 'Clothing', href: '/shop/clothing', icon: 'checkroom' },
      { label: 'Home & Garden', href: '/shop/home-garden', icon: 'home' },
      { label: 'Sports', href: '/shop/sports', icon: 'sports_soccer' }
    ]
  },
  {
    label: 'Categories',
    href: '/categories',
    icon: 'category',
    children: [
      { label: 'New Arrivals', href: '/categories/new', icon: 'new_releases' },
      { label: 'Best Sellers', href: '/categories/bestsellers', icon: 'trending_up' },
      { label: 'Sale Items', href: '/categories/sale', icon: 'local_offer' },
      { label: 'Clearance', href: '/categories/clearance', icon: 'sell' }
    ]
  },
  { label: 'Deals', href: '/deals', icon: 'local_offer' },
  { label: 'Customer Service', href: '/support', icon: 'support_agent' }
];

const megamenuItems: MenuItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  {
    label: 'Products',
    href: '/products',
    icon: 'inventory_2',
    children: [
      {
        label: 'Software Solutions',
        href: '/products/software',
        icon: 'code',
        description: 'Enterprise software and development tools',
        children: [
          { label: 'Development Tools', href: '/products/software/dev-tools', icon: 'build' },
          { label: 'Project Management', href: '/products/software/pm-tools', icon: 'assignment' },
          { label: 'Analytics Platform', href: '/products/software/analytics', icon: 'analytics' }
        ]
      },
      {
        label: 'Cloud Services',
        href: '/products/cloud',
        icon: 'cloud',
        description: 'Scalable cloud infrastructure and services',
        children: [
          { label: 'Hosting Solutions', href: '/products/cloud/hosting', icon: 'dns' },
          { label: 'Storage Services', href: '/products/cloud/storage', icon: 'storage' },
          { label: 'Database Management', href: '/products/cloud/database', icon: 'database' }
        ]
      },
      {
        label: 'Security Suite',
        href: '/products/security',
        icon: 'security',
        description: 'Comprehensive security and compliance tools',
        children: [
          { label: 'Threat Detection', href: '/products/security/detection', icon: 'verified_user' },
          { label: 'Access Control', href: '/products/security/access', icon: 'key' },
          { label: 'Compliance Tools', href: '/products/security/compliance', icon: 'policy' }
        ]
      },
      {
        label: 'AI & Machine Learning',
        href: '/products/ai',
        icon: 'psychology',
        description: 'Intelligent automation and ML platforms',
        children: [
          { label: 'AutoML Platform', href: '/products/ai/automl', icon: 'auto_fix_high' },
          { label: 'Natural Language Processing', href: '/products/ai/nlp', icon: 'chat' },
          { label: 'Computer Vision', href: '/products/ai/vision', icon: 'visibility' }
        ]
      }
    ]
  },
  {
    label: 'Solutions',
    href: '/solutions',
    icon: 'lightbulb',
    children: [
      {
        label: 'Enterprise',
        href: '/solutions/enterprise',
        icon: 'business',
        description: 'Solutions for large organizations',
        children: [
          { label: 'Digital Transformation', href: '/solutions/enterprise/transformation', icon: 'transform' },
          { label: 'Workflow Automation', href: '/solutions/enterprise/automation', icon: 'smart_toy' }
        ]
      },
      {
        label: 'Small Business',
        href: '/solutions/small-business',
        icon: 'storefront',
        description: 'Tailored solutions for growing businesses',
        children: [
          { label: 'Startup Packages', href: '/solutions/small-business/startup', icon: 'rocket_launch' },
          { label: 'Growth Tools', href: '/solutions/small-business/growth', icon: 'trending_up' }
        ]
      }
    ]
  },
  { label: 'Resources', href: '/resources', icon: 'library_books' },
  { label: 'Support', href: '/support', icon: 'support_agent' }
];

const sidebarNavItems: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: 'analytics',
    children: [
      { label: 'Overview', href: '/analytics/overview', icon: 'insights' },
      { label: 'Traffic', href: '/analytics/traffic', icon: 'traffic' },
      { label: 'Conversions', href: '/analytics/conversions', icon: 'trending_up' },
      { label: 'Revenue', href: '/analytics/revenue', icon: 'monetization_on' }
    ]
  },
  {
    label: 'Content',
    href: '/content',
    icon: 'article',
    children: [
      { label: 'Posts', href: '/content/posts', icon: 'post_add' },
      { label: 'Media Library', href: '/content/media', icon: 'photo_library' },
      { label: 'Categories', href: '/content/categories', icon: 'category' },
      { label: 'Tags', href: '/content/tags', icon: 'local_offer' }
    ]
  },
  {
    label: 'Users',
    href: '/users',
    icon: 'people',
    children: [
      { label: 'All Users', href: '/users/all', icon: 'group' },
      { label: 'Administrators', href: '/users/admins', icon: 'admin_panel_settings' },
      { label: 'Moderators', href: '/users/moderators', icon: 'gavel' },
      { label: 'Permissions', href: '/users/permissions', icon: 'security' }
    ]
  },
  { label: 'Settings', href: '/settings', icon: 'settings' },
  { label: 'Help', href: '/help', icon: 'help' }
];

const meta: Meta<SpectrumMenuArgs> = {
  title: 'Spectrum/Components/SpectrumMenu', // [[memory:3543783]]
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-menu\` component provides a comprehensive navigation solution with multiple variants and responsive behavior.

### Menu Item Structure

#### Basic Menu Item
\`\`\`typescript
interface MenuItem {
  label: string;           // Display text
  href?: string;           // Navigation link
  icon?: string;           // Material Design icon name
  disabled?: boolean;      // Disable interaction
  description?: string;    // Rich description (megamenu only)
  children?: MenuItem[];   // Nested submenu items
}
\`\`\`

### Variants

#### Default Menu
- **Standard dropdowns**: Hover/click to reveal submenus
- **Compact design**: Optimized for space efficiency
- **Simple hierarchy**: Clean nested menu structure

#### Megamenu Variant
- **Full-width dropdowns**: Rich content with descriptions
- **Multi-column layout**: Organized content in columns
- **Enhanced content**: Icons, descriptions, and groupings
- **Complex hierarchies**: Support for deep menu structures

### Responsive Behavior
- **Desktop**: Full horizontal or vertical menu display
- **Mobile**: Automatic hamburger menu conversion
- **Customizable breakpoint**: Define mobile switch point
- **Touch-friendly**: Optimized for mobile interaction

### Material Icons
Supports all Material Design icons. Include the font in your project:
\`\`\`html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
\`\`\`

### Accessibility Features
- **Keyboard navigation**: Full arrow key and tab support
- **Screen reader support**: Proper ARIA labels and roles
- **Focus management**: Clear focus indicators and trapping
- **Mobile accessibility**: Touch-friendly with proper sizing

### Navigation Modes

#### Event-Only Navigation (Default)
\`\`\`html
<spectrum-menu .items=\${menuItems}></spectrum-menu>
\`\`\`
- Only emits \`itemClick\` events when menu items are clicked
- Perfect for SPAs with client-side routing (React Router, Vue Router, etc.)
- Allows custom navigation logic, analytics, and conditional navigation

#### Direct Navigation
\`\`\`html
<spectrum-menu .items=\${menuItems} direct-navigation="true"></spectrum-menu>
\`\`\`
- Clicking menu items navigates directly to their \`href\` URLs in the same tab
- Still emits \`itemClick\` events for analytics/logging
- Perfect for traditional websites and external links

### Basic Usage
\`\`\`html
<spectrum-menu
  orientation="horizontal"
  variant="default"
  .items=\${menuItems}
  mobile-breakpoint="768"
  mobile-menu-title="Navigation"
  direct-navigation="false">
</spectrum-menu>
\`\`\`
        `
      }
    }
  },
  args: {
    orientation: 'horizontal',
    variant: 'default',
    items: basicNavItems,
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Navigation',
    directNavigation: false,
    navigationColor: undefined
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Menu layout orientation for desktop display',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' }
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'megamenu'],
      description: 'Menu variant affecting dropdown style and content richness',
      table: {
        type: { summary: "'default' | 'megamenu'" },
        defaultValue: { summary: 'default' }
      }
    },
    items: {
      control: { type: 'object' },
      description: 'Menu items array with hierarchical structure and metadata',
      table: {
        type: { summary: 'MenuItem[]' },
        defaultValue: { summary: '[]' }
      }
    },
    mobileBreakpoint: {
      control: { type: 'number', min: 320, max: 1200, step: 10 },
      description: 'Screen width breakpoint for mobile menu activation',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '768' }
      }
    },
    mobileMenuTitle: {
      control: 'text',
      description: 'Title displayed in mobile menu header',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Menu' }
      }
    },
    directNavigation: {
      control: 'boolean',
      description: 'Enable direct browser navigation when menu items are clicked. When true, clicking navigates to href in same tab. When false, only emits itemClick event.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    navigationColor: {
      control: 'color',
      description: 'Override the default menu text color. Accepts any valid CSS color value (hex, rgb, hsl, css variables).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumMenuArgs>;

// Interactive render function
const renderMenu = (args: SpectrumMenuArgs) => {
  return html`
    <div style="width: 100%; min-height: 300px;">
      <spectrum-menu
        orientation=${args.orientation}
        variant=${args.variant}
        .items=${args.items}
        mobile-breakpoint=${args.mobileBreakpoint}
        mobile-menu-title=${args.mobileMenuTitle}
        ?direct-navigation=${args.directNavigation}
        navigation-color=${args.navigationColor}
        @itemClick=${(e: CustomEvent) => action('itemClick')(e.detail)}
      ></spectrum-menu>
    </div>
  `;
};

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring all menu component features and configurations.
 * Adjust the controls to see how different settings affect menu behavior and appearance.
 */
export const Playground: Story = {
  render: renderMenu
};

/**
 * Basic horizontal navigation menu perfect for website headers and primary navigation.
 * Features clean design with icons and simple dropdown submenus.
 */
export const HorizontalNavigation: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    items: basicNavItems,
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Main Navigation'
  },
  render: renderMenu
};

/**
 * E-commerce navigation with nested categories and structured product organization.
 * Demonstrates multi-level navigation perfect for online stores.
 */
export const ECommerceNavigation: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    items: eCommerceNavItems,
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Shop Menu'
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: `
E-commerce navigation with product categories and shopping features:
- **Shop section** with product categories and filters
- **Categories** for different browsing methods
- **Customer service** links for support
- **Nested organization** for complex product hierarchies

Perfect for online stores, marketplaces, and retail websites.
        `
      }
    }
  }
};

/**
 * Megamenu variant showcasing rich content with descriptions, icons, and multi-column layout.
 * Ideal for complex sites with extensive content and service offerings.
 */
export const MegamenuDemo: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'megamenu',
    items: megamenuItems,
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Enterprise Menu'
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: `
Megamenu demonstration with rich content and descriptions:
- **Full-width dropdowns** with organized content columns
- **Rich descriptions** for each section and subsection
- **Material icons** throughout for visual hierarchy
- **Multi-level hierarchy** supporting complex site structures
- **Enterprise focus** with business-oriented categories

Perfect for corporate websites, SaaS platforms, and complex applications.
        `
      }
    }
  }
};

/**
 * Vertical sidebar navigation optimized for admin panels and dashboard interfaces.
 * Compact design with collapsible sections and clear hierarchy.
 */
export const VerticalSidebar: Story = {
  args: {
    orientation: 'vertical',
    variant: 'default',
    items: sidebarNavItems,
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Dashboard Menu'
  },
  render: (args) => html`
    <div style="display: flex; height: 500px; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
      <div style="width: 280px; background: var(--spectrum-sys-color-surface-container); border-right: 1px solid var(--spectrum-sys-color-outline);">
        <spectrum-menu
          orientation=${args.orientation}
          variant=${args.variant}
          .items=${args.items}
          mobile-breakpoint=${args.mobileBreakpoint}
          mobile-menu-title=${args.mobileMenuTitle}
          @itemClick=${(e: CustomEvent) => action('sidebar-itemClick')(e.detail)}
        ></spectrum-menu>
      </div>
      <div style="flex: 1; padding: 2rem; background: var(--spectrum-sys-color-surface); display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; color: var(--spectrum-sys-color-on-surface-variant);">
          <h3 style="margin-bottom: 0.5rem;">Main Content Area</h3>
          <p>Click menu items to see navigation events in the Actions panel</p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Vertical sidebar navigation for admin panels and dashboards:
- **280px fixed width** sidebar with content area
- **Nested sections** for analytics, content, and user management
- **Clean hierarchy** with clear visual organization
- **Admin-focused** with dashboard and management features

Perfect for admin panels, dashboards, and backend interfaces.
        `
      }
    }
  }
};

/**
 * Mobile-responsive demonstration showing how menus adapt to smaller screens.
 * Features hamburger menu conversion at configurable breakpoints.
 */
export const MobileResponsive: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    items: eCommerceNavItems,
    mobileBreakpoint: 900, // Higher breakpoint to demonstrate mobile in desktop view
    mobileMenuTitle: 'Mobile Menu'
  },
  render: (args) => html`
    <div style="border: 2px solid var(--spectrum-sys-color-outline); border-radius: 8px; background: var(--spectrum-sys-color-surface);">
      <div style="padding: 1rem; border-bottom: 1px solid var(--spectrum-sys-color-outline); background: var(--spectrum-sys-color-surface-container);">
        <h3 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">Mobile Responsive Menu (breakpoint: 900px)</h3>
        <p style="margin: 0.5rem 0 0 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
          Resize your browser window or change the breakpoint to see mobile behavior
        </p>
      </div>
      <div style="padding: 1rem;">
        <spectrum-menu
          orientation=${args.orientation}
          variant=${args.variant}
          .items=${args.items}
          mobile-breakpoint=${args.mobileBreakpoint}
          mobile-menu-title=${args.mobileMenuTitle}
          @itemClick=${(e: CustomEvent) => action('mobile-itemClick')(e.detail)}
        ></spectrum-menu>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Mobile responsiveness demonstration:
- **Configurable breakpoint** (set to 900px to demo in desktop)
- **Hamburger menu** appears below breakpoint
- **Touch-friendly** mobile interface
- **Automatic conversion** from horizontal to mobile layout
- **Custom mobile title** for branded mobile experience

Resize your browser window to see the mobile transformation in action.
        `
      }
    }
  }
};

/**
 * Accessibility demonstration highlighting keyboard navigation and screen reader support.
 * Shows focus management and ARIA implementation.
 */
export const AccessibilityDemo: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'megamenu',
    items: megamenuItems.slice(0, 3), // Fewer items for clearer demo
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Accessible Menu'
  },
  render: (args) => html`
    <div style="padding: 2rem; border: 2px solid var(--spectrum-sys-color-primary); border-radius: 8px; background: var(--spectrum-sys-color-surface);">
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-primary-container);">♿ Accessibility Features</h3>
        <ul style="margin: 0; padding-left: 1.5rem; color: var(--spectrum-sys-color-on-primary-container);">
          <li><strong>Keyboard Navigation:</strong> Use Tab, Arrow keys, Enter, and Escape</li>
          <li><strong>Screen Reader:</strong> Full ARIA support with roles and labels</li>
          <li><strong>Focus Management:</strong> Clear focus indicators and logical flow</li>
          <li><strong>Mobile Accessibility:</strong> Touch-friendly sizing and interaction</li>
        </ul>
      </div>
      <spectrum-menu
        orientation=${args.orientation}
        variant=${args.variant}
        .items=${args.items}
        mobile-breakpoint=${args.mobileBreakpoint}
        mobile-menu-title=${args.mobileMenuTitle}
        @itemClick=${(e: CustomEvent) => action('accessibility-itemClick')(e.detail)}
      ></spectrum-menu>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Accessibility features demonstration:
- **Keyboard Navigation**: Tab through items, use arrow keys for submenus
- **Enter/Space**: Activate menu items and toggle dropdowns
- **Escape**: Close open dropdowns and menus
- **Screen Reader Support**: Proper ARIA roles, labels, and descriptions
- **Focus Management**: Clear visual focus indicators
- **Mobile Accessibility**: Touch-friendly targets and gestures

Try navigating with your keyboard to experience the accessibility features.
        `
      }
    }
  }
};

/**
 * Minimal navigation menu for simple sites with basic requirements.
 * Clean design focusing on essential navigation elements only.
 */
export const MinimalNavigation: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    items: [
      { label: 'Home', href: '/', icon: 'home' },
      { label: 'About', href: '/about', icon: 'info' },
      { label: 'Contact', href: '/contact', icon: 'contact_mail' }
    ],
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Menu'
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: `
Minimal navigation for simple websites:
- **Essential pages only**: Home, About, Contact
- **Clean icons**: Material Design icons for visual clarity
- **Simple structure**: No nested submenus for simplicity
- **Lightweight**: Perfect for portfolios, landing pages, small business sites

Ideal for simple websites that don't need complex navigation structures.
        `
      }
    }
  }
};

/**
 * Navigation behavior demonstration showing the difference between event-based and direct navigation modes.
 * Toggle the directNavigation control to switch between modes.
 */
export const NavigationModes: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    items: [
      { label: 'Storybook Home', href: 'https://storybook.js.org/', icon: 'home' },
      { label: 'GitHub', href: 'https://github.com/', icon: 'code' },
      { label: 'Google', href: 'https://google.com/', icon: 'search' }
    ],
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Navigation',
    directNavigation: false
  },
  render: (args) => html`
    <div style="padding: 2rem; border: 2px solid var(--spectrum-sys-color-outline); border-radius: 8px; background: var(--spectrum-sys-color-surface);">
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px;">
        <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">🔗 Navigation Mode: ${args.directNavigation ? 'Direct Navigation' : 'Event Only'}</h3>
        <div style="color: var(--spectrum-sys-color-on-surface-variant);">
          ${args.directNavigation ? html`
            <p style="margin: 0;"><strong>Direct Navigation Enabled:</strong></p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
              <li>Clicking menu items will navigate to their URLs in the same tab</li>
              <li>The itemClick event is still emitted for logging/analytics</li>
              <li>Perfect for traditional website navigation</li>
            </ul>
          ` : html`
            <p style="margin: 0;"><strong>Event Only Mode (Default):</strong></p>
            <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
              <li>Clicking menu items only emits itemClick events</li>
              <li>No automatic navigation - you handle the events</li>
              <li>Perfect for SPAs and custom navigation logic</li>
              <li>Check the Actions panel below to see the events</li>
            </ul>
          `}
        </div>
      </div>
      
      <spectrum-menu
        orientation=${args.orientation}
        variant=${args.variant}
        .items=${args.items}
        mobile-breakpoint=${args.mobileBreakpoint}
        mobile-menu-title=${args.mobileMenuTitle}
        ?direct-navigation=${args.directNavigation}
        @itemClick=${(e: CustomEvent) => action('navigation-itemClick')(e.detail)}
      ></spectrum-menu>
      
      <div style="margin-top: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 6px;">
        <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">💡 Try This:</h4>
        <ol style="margin: 0; padding-left: 1.5rem; color: var(--spectrum-sys-color-on-surface-variant);">
          <li>Toggle the <strong>directNavigation</strong> control in the Controls panel above</li>
          <li>Click the menu items to see the different behaviors</li>
          <li>When directNavigation is false, watch the Actions panel for events</li>
          <li>When directNavigation is true, clicking will navigate to the actual URLs</li>
        </ol>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Navigation behavior modes demonstration:

### Event Only Mode (Default: directNavigation = false)
- **Event-driven**: Only emits \`itemClick\` events when menu items are clicked
- **No automatic navigation**: You handle the events to implement custom navigation logic
- **SPA-friendly**: Perfect for single-page applications using client-side routing
- **Custom handling**: Allows for analytics, confirmation dialogs, or conditional navigation

### Direct Navigation Mode (directNavigation = true)
- **Automatic navigation**: Clicking menu items navigates directly to their \`href\` URLs
- **Traditional behavior**: Works like standard HTML links in the same tab
- **Event still emitted**: The \`itemClick\` event is still fired for analytics/logging
- **Simple setup**: No custom event handling required for basic navigation

### Use Cases
- **Event Only**: React Router, Vue Router, Angular Router, analytics tracking, conditional navigation
- **Direct Navigation**: Traditional websites, documentation sites, external links, simple brochure sites

Toggle the \`directNavigation\` control to experience both modes!
        `
      }
    }
  }
};

/**
 * Navigation color customization demonstration showing how to override the default menu text color.
 * Use the navigationColor prop to apply custom branding colors to menu text.
 */
export const NavigationColor: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    items: [
      { label: 'Home', href: '/', icon: 'home' },
      { label: 'Products', href: '/products', icon: 'inventory_2' },
      { label: 'Services', href: '/services', icon: 'design_services' },
      { label: 'About', href: '/about', icon: 'info' },
      { label: 'Contact', href: '/contact', icon: 'contact_mail' }
    ],
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Navigation',
    directNavigation: false,
    navigationColor: '#ff6600'
  },
  render: (args) => html`
    <div style="padding: 2rem; border: 2px solid var(--spectrum-sys-color-outline); border-radius: 8px; background: var(--spectrum-sys-color-surface);">
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px;">
        <h3 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">🎨 Custom Navigation Color</h3>
        <div style="color: var(--spectrum-sys-color-on-surface-variant);">
          <p style="margin: 0 0 1rem 0;"><strong>Current Navigation Color:</strong> <span style="background: ${args.navigationColor || 'transparent'}; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">${args.navigationColor || 'None'}</span></p>
          <p style="margin: 0;"><strong>Usage:</strong> The navigationColor prop allows you to customize the menu text color for branding purposes while maintaining all other theme properties.</p>
        </div>
      </div>
      
      <spectrum-menu
        orientation=${args.orientation}
        variant=${args.variant}
        .items=${args.items}
        mobile-breakpoint=${args.mobileBreakpoint}
        mobile-menu-title=${args.mobileMenuTitle}
        ?direct-navigation=${args.directNavigation}
        navigation-color=${args.navigationColor}
        @itemClick=${(e: CustomEvent) => action('navigation-color-itemClick')(e.detail)}
      ></spectrum-menu>
      
      <div style="margin-top: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 6px;">
        <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">💡 Color Examples:</h4>
        <div style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">
          <p style="margin: 0 0 0.5rem 0;">Try these color values in the Controls panel:</p>
          <ul style="margin: 0; padding-left: 1.5rem; font-family: monospace;">
            <li><strong>#ff6600</strong> - Orange (current)</li>
            <li><strong>#2563eb</strong> - Blue</li>
            <li><strong>#dc2626</strong> - Red</li>
            <li><strong>#059669</strong> - Green</li>
            <li><strong>#7c3aed</strong> - Purple</li>
            <li><strong>var(--spectrum-sys-color-primary)</strong> - Theme primary</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
### Navigation Color Feature

The \`navigationColor\` prop allows you to customize the menu text color while preserving all other theme properties and behaviors.

**Key Features:**
- **Custom Branding**: Apply your brand colors to menu text
- **CSS Variable Override**: Uses CSS custom properties for efficient styling
- **Theme Preservation**: Only overrides text color, maintains all other theme properties
- **Consistent Application**: Affects all menu text including icons and labels

**Usage Examples:**
\`\`\`html
<!-- Hex color -->
<spectrum-menu navigation-color="#ff6600" items="..."></spectrum-menu>

<!-- RGB color -->
<spectrum-menu navigation-color="rgb(255, 102, 0)" items="..."></spectrum-menu>

<!-- CSS variable -->
<spectrum-menu navigation-color="var(--brand-primary)" items="..."></spectrum-menu>
\`\`\`

**When to Use:**
- Corporate branding requirements
- Design system color compliance
- Themed menu variations
- Brand color consistency across components

The navigation color feature works in all orientations, variants, and responsive states while maintaining accessibility and usability.
        `
      }
    }
  }
};