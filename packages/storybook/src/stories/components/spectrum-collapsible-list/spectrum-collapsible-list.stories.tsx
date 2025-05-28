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
  filter?: string;
  mutuallyExclusive?: boolean;
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
    ],
    mutuallyExclusive: true
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
    },
    filter: {
      control: 'text',
      description: 'Filter the list based on a keyword'
    },
    mutuallyExclusive: {
      control: 'boolean',
      description: 'Controls whether expanding one parent collapses other parents at the same level',
      defaultValue: true
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A collapsible list component that supports nested items with icons and actions.
          Parent items can be expanded/collapsed, and child items can trigger actions.
          
          By default, the list operates in "mutually exclusive" mode where expanding one parent
          automatically collapses other parents at the same level. This can be disabled by setting
          the \`mutuallyExclusive\` property to \`false\`.
          
          Example:
          \`\`\`html
          <spectrum-collapsible-list
            .mutuallyExclusive=${true}
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
      .filter=${args.filter}
      .mutuallyExclusive=${args.mutuallyExclusive}
      @child-action=${(e: CustomEvent) => {
        setTimeout(() => action('child-action')(e.detail), 500);
      }}
      @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
      @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
      @context-action=${(e: CustomEvent) => action('context-action')(e.detail)}
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
    ],
    contextActions: [
      {
        label: 'Edit',
        icon: 'edit',
        value: 'edit'
      },
      {
        label: 'Delete',
        icon: 'delete',
        value: 'delete'
      }
    ]
  },
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        @child-action=${(e: CustomEvent) => action('Child Action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('Expand Action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('Contract Action')(e.detail)}
        @context-action=${(e: CustomEvent) => action('Context Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
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

export const WithFiltering: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        expanded: true,
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
          },
          {
            label: 'Meeting Notes',
            icon: 'description',
            action: 'meeting-notes'
          }
        ]
      },
      {
        label: 'Settings',
        icon: 'settings',
        expanded: true,
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
      },
      {
        label: 'Reports',  // This parent matches the filter
        icon: 'assessment',
        expanded: true,
        children: [
          {
            label: 'Financial Reports',
            icon: 'attach_money',
            action: 'financial-reports'
          },
          {
            label: 'Analytics',
            icon: 'insights',
            action: 'analytics'
          }
        ]
      }
    ],
    filter: 'reports'
  },
  render: renderList,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates filtering functionality. When a filter value is provided:
- Items (parent or child) with labels containing the filter text are shown
- Parent items with matching children are shown with only their matching children
- Parent items without matching children and that don't match themselves are hidden
- The filter is case-insensitive for better user experience
        `
      }
    }
  }
};

// Example showing both mutually exclusive and non-exclusive behavior
export const ExpansionBehavior: StoryObj<SpectrumCollapsibleListArgs> = {
  render: (args) => html`
    <div style="display: flex; gap: 40px; justify-content: center;">
      <div style="width: 340px;">
        <h3 style="text-align: center; margin-bottom: 10px;">Mutually Exclusive (Default)</h3>
        <div style="height: 320px; background: none; overflow: auto; scrollbar-gutter: stable;">
          <spectrum-collapsible-list
            .items=${args.items}
            .mutuallyExclusive=${true}
            @expand-action=${(e: CustomEvent) => action('expand-action (exclusive)')(e.detail)}
            @contract-action=${(e: CustomEvent) => action('contract-action (exclusive)')(e.detail)}
          ></spectrum-collapsible-list>
        </div>
      </div>
      <div style="width: 340px;">
        <h3 style="text-align: center; margin-bottom: 10px;">Non-Exclusive</h3>
        <div style="height: 320px; background: none; overflow: auto; scrollbar-gutter: stable;">
          <spectrum-collapsible-list
            .items=${args.items}
            .mutuallyExclusive=${false}
            @expand-action=${(e: CustomEvent) => action('expand-action (non-exclusive)')(e.detail)}
            @contract-action=${(e: CustomEvent) => action('contract-action (non-exclusive)')(e.detail)}
          ></spectrum-collapsible-list>
        </div>
      </div>
    </div>
  `,
  args: {
    items: [
      {
        label: 'Section 1',
        icon: 'folder',
        children: [
          { label: 'Item 1.1', icon: 'description', action: 'item-1-1' },
          { label: 'Item 1.2', icon: 'description', action: 'item-1-2' }
        ]
      },
      {
        label: 'Section 2',
        icon: 'folder',
        children: [
          { label: 'Item 2.1', icon: 'description', action: 'item-2-1' },
          { label: 'Item 2.2', icon: 'description', action: 'item-2-2' }
        ]
      },
      {
        label: 'Section 3',
        icon: 'folder',
        children: [
          { label: 'Item 3.1', icon: 'description', action: 'item-3-1' },
          { label: 'Item 3.2', icon: 'description', action: 'item-3-2' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the two expansion behaviors:
- **Mutually Exclusive (Default)**: When one parent item is expanded, other parents at the same level are automatically collapsed.
- **Non-Exclusive**: Multiple parent items can be expanded simultaneously.

The \`mutuallyExclusive\` property controls this behavior, defaulting to \`true\`.
        `
      }
    }
  }
}; 