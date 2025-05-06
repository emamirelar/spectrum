import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface RailItem {
  icon: string;
  label: string;
  action: string;
}

interface SpectrumRailArgs {
  menuItem?: RailItem;
  fabItem?: RailItem;
  topItems: RailItem[];
  bottomItems: RailItem[];
}

const meta = {
  title: 'Components/SpectrumRail',
  tags: ['autodocs'],
  args: {
    menuItem: {
      icon: 'menu_open',
      label: 'Menu',
      action: 'menu'
    },
    fabItem: {
      icon: 'add_circle',
      label: 'Add',
      action: 'add'
    },
    topItems: [
      {
        icon: 'history',
        label: 'Recent',
        action: 'recent'
      }
    ],
    bottomItems: [
      {
        icon: 'help_outline',
        label: 'Help',
        action: 'help'
      },
      {
        icon: 'settings',
        label: 'Settings',
        action: 'settings'
      }
    ]
  },
  argTypes: {
    menuItem: { 
      control: 'object',
      description: 'Optional menu item at the top of the rail. Uses ghost variant button with icon only.',
      table: {
        type: { 
          summary: 'RailItem',
          detail: '{ icon: string; label: string; action: string; }'
        }
      }
    },
    fabItem: { 
      control: 'object',
      description: 'Optional FAB (Floating Action Button) item. Uses primary variant button with icon only.',
      table: {
        type: { 
          summary: 'RailItem',
          detail: '{ icon: string; label: string; action: string; }'
        }
      }
    },
    topItems: { 
      control: 'object',
      description: 'Items in the top section of the rail. Uses ghost variant buttons with icons only.',
      table: {
        type: { 
          summary: 'RailItem[]',
          detail: '{ icon: string; label: string; action: string; }[]'
        }
      }
    },
    bottomItems: { 
      control: 'object',
      description: 'Items in the bottom section of the rail. Uses ghost variant buttons with icons only.',
      table: {
        type: { 
          summary: 'RailItem[]',
          detail: '{ icon: string; label: string; action: string; }[]'
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A vertical navigation rail component that uses Material Icons.
          Each item can emit an action when clicked via the railAction event.
          
          Example:
          \`\`\`html
          <spectrum-rail
            @railAction={(e) => {
              switch(e.detail.action) {
                case 'menu': // Handle menu click
                case 'add': // Handle add click
                case 'recent': // Handle recent click
                // etc...
              }
            }}
          />
          \`\`\`
        `
      }
    }
  }
} satisfies Meta<SpectrumRailArgs>;

export default meta;
type Story = StoryObj<SpectrumRailArgs>;

// Default Rail
export const Default: Story = {
  render: (args) => html`
    <div style="height: 600px; padding: 2rem;">
      <spectrum-rail
        .menuItem=${args.menuItem}
        .fabItem=${args.fabItem}
        .topItems=${args.topItems}
        .bottomItems=${args.bottomItems}
        @railAction=${(e: CustomEvent) => action('railAction')(e.detail)}
      ></spectrum-rail>
    </div>
  `
};

// Minimal Rail
export const MinimalRail: Story = {
  args: {
    topItems: [
      {
        icon: 'history',
        label: 'Recent',
        action: 'recent'
      }
    ],
    bottomItems: [
      {
        icon: 'settings',
        label: 'Settings',
        action: 'settings'
      }
    ]
  }
}; 