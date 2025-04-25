import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';

interface RailActionEvent extends CustomEvent {
  detail: {
    action: string;
    label: string;
  };
}

export default {
  title: 'Components/SpectrumRail',
  component: 'spectrum-rail',
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
    },
    onRailAction: {
      action: 'railAction',
      description: 'Event emitted when a rail item is clicked',
      table: {
        type: { summary: 'CustomEvent<{ action: string; label: string; }>' }
      }
    }
  },
  parameters: {
    actions: {
      handles: ['railAction']
    },
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
} as Meta;

const Template: StoryFn = (args) => {
  const handleRailAction = (e: RailActionEvent) => {
    action('railAction')({
      action: e.detail.action,
      label: e.detail.label
    });
  };

  return html`
    <div style="height: 600px; padding: 2rem;">
      <spectrum-rail
        .menuItem=${args.menuItem}
        .fabItem=${args.fabItem}
        .topItems=${args.topItems}
        .bottomItems=${args.bottomItems}
        @railAction=${handleRailAction}
      ></spectrum-rail>
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = {
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
};

export const MinimalRail = Template.bind({});
MinimalRail.args = {
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
}; 