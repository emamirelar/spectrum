import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumCollapsibleList } from "@stencil-storybook-boilerplate/core/src/components/spectrum-collapsible-list/spectrum-collapsible-list";

interface CollapsibleListItem {
  label: string;
  icon: string;
  expanded?: boolean;
  action?: string;
  ripple?: boolean;
  children?: CollapsibleListItem[];
}

interface ContextAction {
  label: string;
  icon: string;
  value: string;
  ripple?: boolean;
}

interface SpectrumCollapsibleListArgs {
  items: CollapsibleListItem[];
  contextActions?: ContextAction[];
}

const meta = {
  title: 'Components/SpectrumCollapsibleList',
  tags: ['autodocs'],
  args: {
    items: [
      {
        label: 'Parent Item 1',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Child Item 1.1',
            icon: 'description',
            action: 'child-1-1'
          },
          {
            label: 'Child Item 1.2',
            icon: 'description',
            action: 'child-1-2'
          }
        ]
      },
      {
        label: 'Parent Item 2',
        icon: 'folder',
        children: [
          {
            label: 'Child Item 2.1',
            icon: 'description',
            action: 'child-2-1'
          }
        ]
      }
    ]
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'The nested data structure for the list. Each item can have a label, icon, action, and children.',
      table: {
        type: { 
          summary: 'CollapsibleListItem[]',
          detail: `
            interface CollapsibleListItem {
              label: string;
              icon: string;
              expanded?: boolean;
              action?: string;
              ripple?: boolean;
              children?: CollapsibleListItem[];
            }
          `
        }
      }
    },
    contextActions: {
      control: 'object',
      description: 'Context actions for all leaf nodes. Each action should have a label, icon, and value.',
      table: {
        type: { 
          summary: '{ label: string; icon: string; value: string }[]',
          detail: `
            interface ContextAction {
              label: string;
              icon: string;
              value: string;
              ripple?: boolean;
            }
          `
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A collapsible list component that supports nested items with icons and actions.
          Parent items can be expanded/collapsed, and child items can trigger actions.
          
          Example:
          \`\`\`html
          <spectrum-collapsible-list
            @child-action={(e) => {
              console.log('Child action:', e.detail);
            }}
            @expand-action={(e) => {
              console.log('Expand action:', e.detail);
            }}
            @contract-action={(e) => {
              console.log('Contract action:', e.detail);
            }}
          />
          \`\`\`
        `
      }
    }
  }
} satisfies Meta<SpectrumCollapsibleList>;

export default meta;

const renderList = (args: SpectrumCollapsibleListArgs) => html`
  <div style="width: 340px; height: 320px; margin: 2rem auto; background: none; overflow: auto; scrollbar-gutter: stable;">
    <spectrum-collapsible-list
      .items=${args.items}
      .contextActions=${args.contextActions}
      @child-action=${(e: CustomEvent) => {
        setTimeout(() => action('child-action')(e.detail), 500);
      }}
      @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
      @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
    ></spectrum-collapsible-list>
  </div>
`;

export const Default: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Parent Item 1',
        icon: 'folder',
        expanded: true,
        children: [
          ...Array.from({ length: 20 }, (_, i) => ({
            label: `Child Item 1.${i + 1}`,
            icon: 'description',
            action: `child-1-${i + 1}`
          }))
        ]
      },
      {
        label: 'Parent Item 2',
        icon: 'folder',
        children: [
          {
            label: 'Child Item 2.1',
            icon: 'description',
            action: 'child-2-1'
          }
        ]
      }
    ]
  },
  render: renderList
};

export const SingleLevel: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Item 1',
        icon: 'description',
        action: 'action-1'
      },
      {
        label: 'Item 2',
        icon: 'description',
        action: 'action-2'
      },
      {
        label: 'Item 3',
        icon: 'description',
        action: 'action-3'
      }
    ]
  },
  render: renderList
};

export const DeepNested: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Level 1',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Level 2.1',
            icon: 'folder',
            children: [
              {
                label: 'Level 3.1',
                icon: 'description',
                action: 'level-3-1'
              }
            ]
          },
          {
            label: 'Level 2.2',
            icon: 'description',
            action: 'level-2-2'
          }
        ]
      }
    ]
  },
  render: renderList
};

export const CustomIcons: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        children: [
          {
            label: 'Reports',
            icon: 'description',
            action: 'reports'
          },
          {
            label: 'Presentations',
            icon: 'slideshow',
            action: 'presentations'
          }
        ]
      },
      {
        label: 'Settings',
        icon: 'settings',
        children: [
          {
            label: 'Account',
            icon: 'person',
            action: 'account'
          },
          {
            label: 'Preferences',
            icon: 'tune',
            action: 'preferences'
          }
        ]
      }
    ]
  },
  render: renderList
};

// Pre-expanded items
export const PreExpanded: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Parent Item 1',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Child Item 1.1',
            icon: 'description',
            action: 'child-1-1'
          },
          {
            label: 'Child Item 1.2',
            icon: 'description',
            action: 'child-1-2'
          }
        ]
      },
      {
        label: 'Parent Item 2',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Child Item 2.1',
            icon: 'description',
            action: 'child-2-1'
          }
        ]
      }
    ]
  },
  render: renderList
};

// Example: Child node inherits parent icon
export const InheritParentIcon: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Parent Folder',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Child Inherits Icon',
            icon: 'folder',
            action: 'child-inherit'
          },
          {
            label: 'Child With Own Icon',
            icon: 'description',
            action: 'child-own-icon'
          }
        ]
      }
    ]
  },
  render: renderList
};

// Context actions on leaf nodes with popover menu
export const ContextActions: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Project',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Report.pdf',
            icon: 'picture_as_pdf',
            action: 'open-pdf',
            ripple: true
          },
          {
            label: 'Notes.txt',
            icon: 'description',
            action: 'open-txt',
            ripple: true
          },
          {
            label: 'Presentation.pptx',
            icon: 'slideshow',
            action: 'open-pptx',
            ripple: true
          }
        ]
      },
      {
        label: 'Archive',
        icon: 'folder',
        children: [
          {
            label: 'Old Data.csv',
            icon: 'table_chart',
            action: 'open-csv',
            ripple: true
          }
        ]
      }
    ],
    contextActions: [
      { label: 'Download', icon: 'download', value: 'download', ripple: true },
      { label: 'Share', icon: 'share', value: 'share', ripple: true },
      { label: 'Delete', icon: 'delete', value: 'delete', ripple: true }
    ]
  },
  render: renderList,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates context actions on leaf nodes with ripple effects. Only leaf nodes with actions show the three-dot icon. Clicking the icon opens a native popover menu. Selecting an action emits the **context-action** event with the action value and the node label. All actions have ripple effects enabled for better visual feedback. The context menu has a 500ms delay before closing to make the ripple effect visible.
        `
      }
    }
  }
}; 