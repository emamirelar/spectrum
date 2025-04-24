import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';

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
    menuItem: { control: 'object' },
    fabItem: { control: 'object' },
    topItems: { control: 'object' },
    bottomItems: { control: 'object' },
  },
} as Meta;

const Template: StoryFn = (args) => {
  return html`
    <div style="height: 600px; padding: 2rem;">
      <spectrum-rail
        .menuItem=${args.menuItem}
        .fabItem=${args.fabItem}
        .topItems=${args.topItems}
        .bottomItems=${args.bottomItems}
        @railAction=${(e: RailActionEvent) => console.log('Rail action:', e.detail)}
      ></spectrum-rail>
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = {
  menuItem: {
    icon: 'menu',
    label: 'Menu',
    action: 'menu'
  },
  fabItem: {
    icon: 'add',
    label: 'Add',
    action: 'add'
  },
  topItems: [
    {
      icon: 'schedule',
      label: 'Recent',
      action: 'recent'
    }
  ],
  bottomItems: [
    {
      icon: 'help',
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
      icon: 'schedule',
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