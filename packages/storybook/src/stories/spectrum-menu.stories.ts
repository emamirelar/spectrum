import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

interface SpectrumMenu extends HTMLElement {
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'megamenu';
  mobileBreakpoint: number;
  mobileMenuTitle: string;
  items: Array<{
    label: string;
    href?: string;
    icon?: string;
    disabled?: boolean;
    description?: string;
    children?: Array<{
      label: string;
      href?: string;
      icon?: string;
      disabled?: boolean;
      description?: string;
      children?: Array<{
        label: string;
        href?: string;
        icon?: string;
        disabled?: boolean;
        description?: string;
      }>;
    }>;
  }>;
}

interface SpectrumMenuArgs {
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'megamenu';
  mobileBreakpoint: number;
  mobileMenuTitle: string;
  items: Array<{
    label: string;
    href?: string;
    icon?: string;
    disabled?: boolean;
    description?: string;
    children?: Array<{
      label: string;
      href?: string;
      icon?: string;
      disabled?: boolean;
      description?: string;
      children?: Array<{
        label: string;
        href?: string;
        icon?: string;
        disabled?: boolean;
        description?: string;
      }>;
    }>;
  }>;
}

const defaultItems = [
  {
    label: 'Home',
    href: '/',
    icon: 'home',
  },
  {
    label: 'Products',
    href: '/products',
    icon: 'inventory_2',
    children: [
      {
        label: 'Category 1',
        href: '/products/category-1',
        icon: 'category',
      },
      {
        label: 'Category 2',
        href: '/products/category-2',
        icon: 'category',
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    icon: 'info',
  },
  {
    label: 'Disabled Item',
    href: '/disabled',
    icon: 'block',
    disabled: true,
  },
];

const meta = {
  title: 'Spectrum/Components/SpectrumMenu',
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    variant: 'default',
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Menu',
    items: defaultItems,
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the menu',
    },
    variant: {
      control: 'select',
      options: ['default', 'megamenu'],
      description: 'The variant of the menu',
    },
    mobileBreakpoint: {
      control: 'number',
      description: 'The breakpoint at which the menu switches to mobile view',
    },
    mobileMenuTitle: {
      control: 'text',
      description: 'The title displayed in the mobile menu header',
    },
    items: {
      control: 'object',
      description: 'The menu items configuration. Use the `icon` property for a Material icon name (e.g. "home", "info").',
    },
  },
} satisfies Meta<SpectrumMenu>;

export default meta;

const renderMenu = (args: SpectrumMenuArgs) => html`
  <spectrum-menu
    orientation=${args.orientation}
    variant=${args.variant}
    mobile-breakpoint=${args.mobileBreakpoint}
    mobile-menu-title=${args.mobileMenuTitle}
    .items=${args.items}
  ></spectrum-menu>
`;

export const Default: StoryObj<SpectrumMenuArgs> = {
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: 'A horizontal menu with Material icons and submenus. Use the `icon` property for a Material icon name.',
      },
    },
  },
};

export const HorizontalWithSubmenus: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    mobileBreakpoint: 768,
    items: defaultItems,
  },
  render: (args: SpectrumMenuArgs) => html`
    <div style="
      padding: 2rem;
      background: #f9f9f9;
      min-height: 400px;
    ">
      <h3>Horizontal Menu with Submenus</h3>
      <p>Hover over 'Products' to see the submenu appear below the menu item.</p>
      
      <div style="
        margin: 2rem 0;
        padding: 1rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        position: relative;
        overflow: visible;
      ">
        <spectrum-menu
          orientation=${args.orientation}
          variant=${args.variant}
          mobile-breakpoint=${args.mobileBreakpoint}
          .items=${args.items}
        ></spectrum-menu>
      </div>
      
      <div style="
        padding: 1rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-top: 2rem;
      ">
        <h4>Content Below Menu</h4>
        <p>This content should be covered by the submenu when it appears, demonstrating that the submenu floats above with proper z-index.</p>
        <p>The submenu should appear below the 'Products' menu item when you hover over it.</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A horizontal menu demonstrating submenu positioning below menu items with proper z-index layering.',
      },
    },
  },
};

export const Vertical: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'vertical',
    variant: 'default',
    mobileBreakpoint: 768,
    items: defaultItems,
  },
  render: (args: SpectrumMenuArgs) => html`
    <div style="
      display: flex;
      gap: 2rem;
      height: 400px;
      border: 2px dashed #ccc;
      padding: 1rem;
      background: #f9f9f9;
    ">
      <div style="
        width: 250px;
        height: 100%;
        border: 1px solid #ddd;
        background: white;
        border-radius: 8px;
        position: relative;
      ">
        <spectrum-menu
          orientation=${args.orientation}
          variant=${args.variant}
          mobile-breakpoint=${args.mobileBreakpoint}
          .items=${args.items}
        ></spectrum-menu>
      </div>
      <div style="
        flex: 1;
        padding: 1rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
      ">
        <h3>Main Content Area</h3>
        <p>This demonstrates that the vertical menu is properly contained within its 250px container, while submenus float above this content with high z-index.</p>
        <p>Hover over menu items with submenus to see them appear above this content area.</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A vertical menu layout contained within a 250px wide container. The menu respects its container bounds while submenus float above other content.',
      },
    },
  },
};

export const VerticalContained: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'vertical',
    variant: 'default',
    mobileBreakpoint: 768,
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
      },
      {
        label: 'Products with Long Name',
        href: '/products',
        icon: 'inventory_2',
        children: [
          {
            label: 'Electronics & Gadgets',
            href: '/products/electronics',
            icon: 'devices',
          },
          {
            label: 'Clothing & Accessories',
            href: '/products/clothing',
            icon: 'checkroom',
          },
          {
            label: 'Home & Garden Items',
            href: '/products/home',
            icon: 'home_and_garden',
          },
        ],
      },
      {
        label: 'User Management',
        href: '/users',
        icon: 'people',
        children: [
          {
            label: 'Active Users',
            href: '/users/active',
            icon: 'person',
          },
          {
            label: 'Pending Approvals',
            href: '/users/pending',
            icon: 'pending',
          },
        ],
      },
      {
        label: 'Settings & Configuration',
        href: '/settings',
        icon: 'settings',
      },
      {
        label: 'Reports & Analytics',
        href: '/reports',
        icon: 'analytics',
      },
      {
        label: 'Help & Support',
        href: '/help',
        icon: 'help',
      },
    ],
  },
  render: (args: SpectrumMenuArgs) => html`
    <div style="
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 0;
      height: 500px;
      border: 2px solid #333;
      background: #f0f0f0;
    ">
             <div style="
         background: white;
         border-right: 1px solid #ddd;
         position: relative;
       ">
        <div style="
          padding: 1rem;
          border-bottom: 1px solid #eee;
          background: #fafafa;
          font-weight: 600;
        ">
          Navigation Menu
        </div>
        <spectrum-menu
          orientation=${args.orientation}
          variant=${args.variant}
          mobile-breakpoint=${args.mobileBreakpoint}
          .items=${args.items}
        ></spectrum-menu>
      </div>
      <div style="
        padding: 2rem;
        background: white;
        overflow: auto;
      ">
        <h2>Application Content</h2>
        <p>This layout demonstrates a typical sidebar navigation pattern where:</p>
        <ul>
          <li><strong>Menu is contained</strong> within the 250px sidebar</li>
          <li><strong>Long text is truncated</strong> with ellipsis to fit</li>
          <li><strong>Submenus float above</strong> the main content area with high z-index</li>
          <li><strong>No horizontal overflow</strong> occurs from the menu</li>
        </ul>
        <p>Try hovering over menu items with submenus to see them appear over this content area.</p>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
          <h3>Test Content Below</h3>
          <p>This content should remain clickable even when submenus are visible, as they have proper z-index layering.</p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A realistic sidebar layout showing how the vertical menu behaves in a constrained container with proper text truncation and submenu positioning.',
      },
    },
  },
};

export const WithoutIcons: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    mobileBreakpoint: 768,
    items: defaultItems.map(({ icon, ...item }) => item),
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: 'A menu without icons.',
      },
    },
  },
};

export const WithoutSubmenus: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    mobileBreakpoint: 768,
    items: defaultItems.map(({ children, ...item }) => item),
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: 'A simple menu without nested items.',
      },
    },
  },
};

export const CustomBreakpoint: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    mobileBreakpoint: 1024,
    items: defaultItems,
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: 'A menu with a custom mobile breakpoint of 1024px.',
      },
    },
  },
};

const complexItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Products',
    href: '/products',
    icon: 'inventory_2',
    children: [
      {
        label: 'Electronics',
        href: '/products/electronics',
        icon: 'devices',
        children: [
          {
            label: 'Phones',
            href: '/products/electronics/phones',
            icon: 'smartphone',
          },
          {
            label: 'Laptops',
            href: '/products/electronics/laptops',
            icon: 'laptop',
          },
        ],
      },
      {
        label: 'Clothing',
        href: '/products/clothing',
        icon: 'checkroom',
        children: [
          {
            label: 'Men',
            href: '/products/clothing/men',
            icon: 'man',
          },
          {
            label: 'Women',
            href: '/products/clothing/women',
            icon: 'woman',
          },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'settings',
    children: [
      {
        label: 'Profile',
        href: '/settings/profile',
        icon: 'person',
      },
      {
        label: 'Security',
        href: '/settings/security',
        icon: 'security',
      },
      {
        label: 'Notifications',
        href: '/settings/notifications',
        icon: 'notifications_off',
        disabled: true,
      },
    ],
  },
];

export const ComplexNested: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    mobileBreakpoint: 768,
    items: complexItems,
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: 'A complex menu with multiple levels of nested items, all using Material icons.',
      },
    },
  },
};

export const CustomMobileTitle: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Navigation',
    items: defaultItems,
  },
  render: renderMenu,
  parameters: {
    docs: {
      description: {
        story: 'A menu with a custom mobile menu title. Resize to mobile view to see "Navigation" instead of "Menu".',
      },
    },
  },
};

const megamenuItems = [
  {
    label: 'Products',
    href: '/products',
    icon: 'inventory_2',
    children: [
      {
        label: 'Electronics',
        href: '/products/electronics',
        icon: 'devices',
        description: 'Latest gadgets and electronic devices',
        children: [
          {
            label: 'Smartphones',
            href: '/products/electronics/phones',
            icon: 'smartphone',
            description: 'Latest mobile phones and accessories',
          },
          {
            label: 'Laptops',
            href: '/products/electronics/laptops',
            icon: 'laptop',
            description: 'High-performance laptops and notebooks',
          },
          {
            label: 'Tablets',
            href: '/products/electronics/tablets',
            icon: 'tablet',
            description: 'Portable tablets for work and entertainment',
          },
        ],
      },
      {
        label: 'Fashion',
        href: '/products/fashion',
        icon: 'checkroom',
        description: 'Trendy clothing and accessories',
        children: [
          {
            label: 'Men\'s Clothing',
            href: '/products/fashion/men',
            icon: 'man',
            description: 'Stylish apparel for men',
          },
          {
            label: 'Women\'s Clothing',
            href: '/products/fashion/women',
            icon: 'woman',
            description: 'Fashion-forward clothing for women',
          },
          {
            label: 'Accessories',
            href: '/products/fashion/accessories',
            icon: 'watch',
            description: 'Bags, watches, and jewelry',
          },
        ],
      },
      {
        label: 'Home & Garden',
        href: '/products/home',
        icon: 'home',
        description: 'Everything for your home and garden',
        children: [
          {
            label: 'Furniture',
            href: '/products/home/furniture',
            icon: 'chair',
            description: 'Quality furniture for every room',
          },
          {
            label: 'Kitchen',
            href: '/products/home/kitchen',
            icon: 'kitchen',
            description: 'Kitchen appliances and cookware',
          },
          {
            label: 'Garden',
            href: '/products/home/garden',
            icon: 'yard',
            description: 'Tools and supplies for gardening',
          },
        ],
      },
      {
        label: 'Sports & Outdoors',
        href: '/products/sports',
        icon: 'sports',
        description: 'Gear for active lifestyles',
        children: [
          {
            label: 'Fitness Equipment',
            href: '/products/sports/fitness',
            icon: 'fitness_center',
            description: 'Home gym and fitness gear',
          },
          {
            label: 'Outdoor Gear',
            href: '/products/sports/outdoor',
            icon: 'hiking',
            description: 'Camping and hiking equipment',
          },
          {
            label: 'Team Sports',
            href: '/products/sports/team',
            icon: 'sports_soccer',
            description: 'Equipment for team sports',
          },
        ],
      },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    icon: 'build',
    children: [
      {
        label: 'Installation',
        href: '/services/installation',
        icon: 'construction',
        description: 'Professional installation services',
        children: [
          {
            label: 'Home Installation',
            href: '/services/installation/home',
            icon: 'home_repair_service',
            description: 'In-home setup and installation',
          },
          {
            label: 'Business Setup',
            href: '/services/installation/business',
            icon: 'business',
            description: 'Commercial installation services',
          },
        ],
      },
      {
        label: 'Support',
        href: '/services/support',
        icon: 'support',
        description: '24/7 customer support',
        children: [
          {
            label: 'Technical Support',
            href: '/services/support/technical',
            icon: 'engineering',
            description: 'Expert technical assistance',
          },
          {
            label: 'Live Chat',
            href: '/services/support/chat',
            icon: 'chat',
            description: 'Instant chat support',
          },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    icon: 'info',
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: 'contact_mail',
  },
];

export const Megamenu: StoryObj<SpectrumMenuArgs> = {
  args: {
    orientation: 'horizontal',
    variant: 'megamenu',
    mobileBreakpoint: 768,
    mobileMenuTitle: 'Menu',
    items: megamenuItems,
  },
  render: (args: SpectrumMenuArgs) => html`
    <div style="
      min-height: 600px;
      background: #f9f9f9;
      padding: 2rem;
    ">
      <h3>Megamenu Variant</h3>
      <p>Hover over 'Products' or 'Services' to see the full-width megamenu with rich content, descriptions, and organized columns.</p>
      
      <div style="
        margin: 2rem 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        position: relative;
        overflow: visible;
      ">
        <spectrum-menu
          orientation=${args.orientation}
          variant=${args.variant}
          mobile-breakpoint=${args.mobileBreakpoint}
          mobile-menu-title=${args.mobileMenuTitle}
          .items=${args.items}
        ></spectrum-menu>
      </div>
      
      <div style="
        padding: 2rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-top: 2rem;
      ">
        <h4>Content Below Megamenu</h4>
        <p>This content demonstrates that the megamenu appears as a full-width overlay above the page content.</p>
        <p>The megamenu organizes items into columns with descriptions for better navigation and discovery.</p>
        <ul>
          <li><strong>Full-width layout:</strong> Spans the entire viewport width</li>
          <li><strong>Column organization:</strong> Items are automatically organized into columns</li>
          <li><strong>Rich content:</strong> Supports descriptions and nested categories</li>
          <li><strong>Responsive design:</strong> Adapts to different screen sizes</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A megamenu variant that displays a full-width dropdown with organized columns, descriptions, and rich content for complex navigation structures.',
      },
    },
  },
}; 