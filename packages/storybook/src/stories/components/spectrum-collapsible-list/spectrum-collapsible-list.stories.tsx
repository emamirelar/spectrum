import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumCollapsibleList } from "@stencil-storybook-boilerplate/core/src/components/spectrum-collapsible-list/spectrum-collapsible-list";

interface SpectrumCollapsibleListArgs {
  items: any[];
  contextActions: { label: string; icon: string; value: string }[];
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
      description: 'The nested data structure for the list',
      table: {
        type: { summary: 'CollapsibleListItem[]' }
      }
    },
    contextActions: {
      control: 'object',
      description: 'Context actions for all leaf nodes. Each action should have a label, icon, and value.',
      table: {
        type: { summary: '{ label: string; icon: string; value: string }[]' }
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
} satisfies Meta<SpectrumCollapsibleListArgs>;

export default meta;

type Story = StoryObj<SpectrumCollapsibleListArgs>;

// Default story with nested items
export const Default: Story = {
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
  render: (args) => html`
    <div style="width: 340px; height: 320px; margin: 2rem auto; background: none; overflow: auto; scrollbar-gutter: stable;">
      <spectrum-collapsible-list
        .items=${args.items}
        @child-action=${(e: CustomEvent) => action('child-action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// Single level list
export const SingleLevel: Story = {
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
  render: (args) => html`
    <div style="width: 340px; margin: 2rem auto; background: none;">
      <spectrum-collapsible-list
        .items=${args.items}
        @child-action=${(e: CustomEvent) => action('child-action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// Deep nested list
export const DeepNested: Story = {
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
  render: (args) => html`
    <div style="width: 340px; margin: 2rem auto; background: none;">
      <spectrum-collapsible-list
        .items=${args.items}
        @child-action=${(e: CustomEvent) => action('child-action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// Custom icons
export const CustomIcons: Story = {
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Report.pdf',
            icon: 'picture_as_pdf',
            action: 'open-pdf'
          },
          {
            label: 'Spreadsheet.xlsx',
            icon: 'table_chart',
            action: 'open-xlsx'
          },
          {
            label: 'Presentation.pptx',
            icon: 'slideshow',
            action: 'open-pptx'
          }
        ]
      }
    ]
  },
  render: (args) => html`
    <div style="width: 340px; margin: 2rem auto; background: none;">
      <spectrum-collapsible-list
        .items=${args.items}
        @child-action=${(e: CustomEvent) => action('child-action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// Pre-expanded items
export const PreExpanded: Story = {
  args: {
    items: [
      {
        label: 'Section 1',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Item 1.1',
            icon: 'description',
            action: 'item-1-1'
          }
        ]
      },
      {
        label: 'Section 2',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Item 2.1',
            icon: 'description',
            action: 'item-2-1'
          }
        ]
      }
    ]
  },
  render: (args) => html`
    <div style="width: 340px; margin: 2rem auto; background: none;">
      <spectrum-collapsible-list
        .items=${args.items}
        @child-action=${(e: CustomEvent) => action('child-action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// Example: Child node inherits parent icon
export const InheritParentIcon: Story = {
  args: {
    items: [
      {
        label: 'Parent Folder',
        icon: 'folder',
        expanded: true,
        children: [
          {
            label: 'Child Inherits Icon',
            // No icon specified, should inherit 'folder' from parent
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
  render: (args) => html`
    <div style="width: 340px; margin: 2rem auto; background: none;">
      <spectrum-collapsible-list
        .items=${args.items}
        @child-action=${(e: CustomEvent) => action('child-action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// Context actions on leaf nodes with popover menu
export const ContextActions: Story = {
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
            action: 'open-pdf'
          },
          {
            label: 'Notes.txt',
            icon: 'description',
            action: 'open-txt'
          },
          {
            label: 'Presentation.pptx',
            icon: 'slideshow',
            action: 'open-pptx'
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
            action: 'open-csv'
          }
        ]
      }
    ],
    contextActions: [
      { label: 'Download', icon: 'download', value: 'download' },
      { label: 'Share', icon: 'share', value: 'share' },
      { label: 'Delete', icon: 'delete', value: 'delete' }
    ]
  },
  render: (args) => html`
    <div style="width: 340px; margin: 2rem auto; background: none;">
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        @child-action=${(e: CustomEvent) => action('child-action')(e.detail)}
        @expand-action=${(e: CustomEvent) => action('expand-action')(e.detail)}
        @contract-action=${(e: CustomEvent) => action('contract-action')(e.detail)}
        @context-action=${(e: CustomEvent) => action('context-action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates context actions on leaf nodes. Only leaf nodes with actions show the three-dot icon. Clicking the icon opens a native popover menu. Selecting an action emits the **context-action** event with the action value and the node label.
        `
      }
    }
  }
}; 