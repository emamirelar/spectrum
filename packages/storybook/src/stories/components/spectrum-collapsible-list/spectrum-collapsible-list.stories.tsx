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
  id: string;
  ripple?: boolean;
  children?: CollapsibleListItem[];
}

interface ContextAction {
  label: string;
  icon: string;
  action: string;
  id: string;
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
        id: 'parent-1',
        children: [
          {
            label: 'Child Item 1.1',
            icon: 'description',
            action: 'child-1-1',
            id: 'child-1-1'
          },
          {
            label: 'Child Item 1.2',
            icon: 'description',
            action: 'child-1-2',
            id: 'child-1-2'
          }
        ]
      },
      {
        label: 'Parent Item 2',
        icon: 'folder',
        id: 'parent-2',
        children: [
          {
            label: 'Child Item 2.1',
            icon: 'description',
            action: 'child-2-1',
            id: 'child-2-1'
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
              id: string;
              ripple?: boolean;
              children?: CollapsibleListItem[];
            }
          `
        }
      }
    },
    contextActions: {
      control: 'object',
      description: 'Context actions for all leaf nodes. Each action should have a label, icon, and action.',
      table: {
        type: { 
          summary: '{ label: string; icon: string; action: string; id: string }[]',
          detail: `
            interface ContextAction {
              label: string;
              icon: string;
              action: string;
              id: string;
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
        id: 'parent-1',
        children: [
          ...Array.from({ length: 20 }, (_, i) => ({
            label: `Child Item 1.${i + 1}`,
            icon: 'description',
            action: `child-1-${i + 1}`,
            id: `child-1-${i + 1}`
          }))
        ]
      },
      {
        label: 'Parent Item 2',
        icon: 'folder',
        id: 'parent-2',
        children: [
          {
            label: 'Child Item 2.1',
            icon: 'description',
            action: 'child-2-1',
            id: 'child-2-1'
          }
        ]
      }
    ],
    contextActions: [
      {
        label: 'Edit',
        icon: 'edit',
        action: 'edit',
        id: 'edit-action'
      },
      {
        label: 'Delete',
        icon: 'delete',
        action: 'delete',
        id: 'delete-action'
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
        action: 'action-1',
        id: 'item-1'
      },
      {
        label: 'Item 2',
        icon: 'description',
        action: 'action-2',
        id: 'item-2'
      },
      {
        label: 'Item 3',
        icon: 'description',
        action: 'action-3',
        id: 'item-3'
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
        id: 'level-1',
        children: [
          {
            label: 'Level 2.1',
            icon: 'folder',
            id: 'level-2-1',
            children: [
              {
                label: 'Level 3.1',
                icon: 'description',
                action: 'level-3-1',
                id: 'level-3-1'
              }
            ]
          },
          {
            label: 'Level 2.2',
            icon: 'description',
            action: 'level-2-2',
            id: 'level-2-2'
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
        id: 'documents',
        children: [
          {
            label: 'Reports',
            icon: 'description',
            action: 'reports',
            id: 'reports'
          },
          {
            label: 'Presentations',
            icon: 'slideshow',
            action: 'presentations',
            id: 'presentations'
          }
        ]
      },
      {
        label: 'Settings',
        icon: 'settings',
        id: 'settings',
        children: [
          {
            label: 'Account',
            icon: 'person',
            action: 'account',
            id: 'account'
          },
          {
            label: 'Preferences',
            icon: 'tune',
            action: 'preferences',
            id: 'preferences'
          }
        ]
      }
    ]
  },
  render: renderList
};

export const PreExpanded: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Parent Item 1',
        icon: 'folder',
        expanded: true,
        id: 'parent-1',
        children: [
          {
            label: 'Child Item 1.1',
            icon: 'description',
            action: 'child-1-1',
            id: 'child-1-1'
          },
          {
            label: 'Child Item 1.2',
            icon: 'description',
            action: 'child-1-2',
            id: 'child-1-2'
          }
        ]
      },
      {
        label: 'Parent Item 2',
        icon: 'folder',
        expanded: true,
        id: 'parent-2',
        children: [
          {
            label: 'Child Item 2.1',
            icon: 'description',
            action: 'child-2-1',
            id: 'child-2-1'
          }
        ]
      }
    ]
  },
  render: renderList
};

export const InheritParentIcon: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Parent Folder',
        icon: 'folder',
        expanded: true,
        id: 'parent-folder',
        children: [
          {
            label: 'Child Inherits Icon',
            icon: 'folder',
            action: 'child-inherit',
            id: 'child-inherit'
          },
          {
            label: 'Child With Own Icon',
            icon: 'description',
            action: 'child-own-icon',
            id: 'child-own-icon'
          }
        ]
      }
    ]
  },
  render: renderList
};

export const ContextActions: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Project',
        icon: 'folder',
        expanded: true,
        id: 'project',
        children: [
          {
            label: 'Report.pdf',
            icon: 'picture_as_pdf',
            action: 'open-pdf',
            id: 'report-pdf',
            ripple: true
          },
          {
            label: 'Notes.txt',
            icon: 'description',
            action: 'open-txt',
            id: 'notes-txt',
            ripple: true
          },
          {
            label: 'Presentation.pptx',
            icon: 'slideshow',
            action: 'open-pptx',
            id: 'presentation-pptx',
            ripple: true
          }
        ]
      },
      {
        label: 'Archive',
        icon: 'folder',
        id: 'archive',
        children: [
          {
            label: 'Old Data.csv',
            icon: 'table_chart',
            action: 'open-csv',
            id: 'old-data-csv',
            ripple: true
          }
        ]
      }
    ],
    contextActions: [
      { label: 'Download', icon: 'download', action: 'download', id: 'download-action', ripple: true },
      { label: 'Share', icon: 'share', action: 'share', id: 'share-action', ripple: true },
      { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete-action', ripple: true }
    ]
  },
  render: renderList
};

export const WithFiltering: StoryObj<SpectrumCollapsibleListArgs> = {
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        expanded: true,
        id: 'documents',
        children: [
          {
            label: 'Reports',
            icon: 'description',
            action: 'reports',
            id: 'reports'
          },
          {
            label: 'Presentations',
            icon: 'slideshow',
            action: 'presentations',
            id: 'presentations'
          },
          {
            label: 'Meeting Notes',
            icon: 'description',
            action: 'meeting-notes',
            id: 'meeting-notes'
          }
        ]
      },
      {
        label: 'Settings',
        icon: 'settings',
        expanded: true,
        id: 'settings',
        children: [
          {
            label: 'Account',
            icon: 'person',
            action: 'account',
            id: 'account'
          },
          {
            label: 'Preferences',
            icon: 'tune',
            action: 'preferences',
            id: 'preferences'
          }
        ]
      },
      {
        label: 'Reports',
        icon: 'assessment',
        expanded: true,
        id: 'reports-section',
        children: [
          {
            label: 'Financial Reports',
            icon: 'attach_money',
            action: 'financial-reports',
            id: 'financial-reports'
          },
          {
            label: 'Analytics',
            icon: 'insights',
            action: 'analytics',
            id: 'analytics'
          }
        ]
      }
    ],
    filter: 'reports'
  },
  render: renderList
};

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
        id: 'section-1',
        children: [
          { label: 'Item 1.1', icon: 'description', action: 'item-1-1', id: 'item-1-1' },
          { label: 'Item 1.2', icon: 'description', action: 'item-1-2', id: 'item-1-2' }
        ]
      },
      {
        label: 'Section 2',
        icon: 'folder',
        id: 'section-2',
        children: [
          { label: 'Item 2.1', icon: 'description', action: 'item-2-1', id: 'item-2-1' },
          { label: 'Item 2.2', icon: 'description', action: 'item-2-2', id: 'item-2-2' }
        ]
      },
      {
        label: 'Section 3',
        icon: 'folder',
        id: 'section-3',
        children: [
          { label: 'Item 3.1', icon: 'description', action: 'item-3-1', id: 'item-3-1' },
          { label: 'Item 3.2', icon: 'description', action: 'item-3-2', id: 'item-3-2' }
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