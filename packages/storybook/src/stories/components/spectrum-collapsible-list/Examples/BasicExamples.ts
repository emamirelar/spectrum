import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Basic Data Structures
// ==============================================

export const basicItems = [
  {
    label: 'Documents',
    icon: 'folder',
    id: 'documents',
    expanded: true,
    children: [
      {
        label: 'Project Proposal.pdf',
        icon: 'description',
        action: 'open',
        id: 'doc-1'
      },
      {
        label: 'Meeting Notes.docx',
        icon: 'description',
        action: 'open',
        id: 'doc-2'
      },
      {
        label: 'Budget Spreadsheet.xlsx',
        icon: 'table_chart',
        action: 'open',
        id: 'doc-3'
      }
    ]
  },
  {
    label: 'Images',
    icon: 'folder',
    id: 'images',
    children: [
      {
        label: 'logo.png',
        icon: 'image',
        action: 'preview',
        id: 'img-1'
      },
      {
        label: 'banner.jpg',
        icon: 'image',
        action: 'preview',
        id: 'img-2'
      }
    ]
  },
  {
    label: 'Archive',
    icon: 'folder',
    id: 'archive',
    children: [
      {
        label: 'old_project.zip',
        icon: 'archive',
        action: 'download',
        id: 'archive-1'
      }
    ]
  }
];

export const simpleHierarchy = [
  {
    label: 'Frontend',
    icon: 'web',
    id: 'frontend',
    children: [
      {
        label: 'Components',
        icon: 'view_module',
        action: 'navigate',
        id: 'components'
      },
      {
        label: 'Pages',
        icon: 'pages',
        action: 'navigate',
        id: 'pages'
      },
      {
        label: 'Assets',
        icon: 'folder',
        action: 'navigate',
        id: 'assets'
      }
    ]
  },
  {
    label: 'Backend',
    icon: 'dns',
    id: 'backend',
    children: [
      {
        label: 'API Routes',
        icon: 'api',
        action: 'navigate',
        id: 'api'
      },
      {
        label: 'Database',
        icon: 'storage',
        action: 'navigate',
        id: 'database'
      }
    ]
  }
];

export const basicContextActions = [
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
  },
  {
    label: 'Rename',
    icon: 'drive_file_rename_outline',
    action: 'rename',
    id: 'rename-action'
  }
];

// ==============================================
// Basic Examples
// ==============================================

export const CollapsibleListDefault = {
  args: {
    items: basicItems,
    contextActions: [],
    filter: '',
    mutuallyExclusive: true,
    debug: false
  },
  render: (args: any) => html`
    <spectrum-collapsible-list
      .items=${args.items}
      .contextActions=${args.contextActions}
      .filter=${args.filter}
      .mutuallyExclusive=${args.mutuallyExclusive}
      .debug=${args.debug}
      @childAction=${(e: CustomEvent) => action('Child Action')(e.detail)}
      @expandAction=${(e: CustomEvent) => action('Expand Action')(e.detail)}
      @contractAction=${(e: CustomEvent) => action('Contract Action')(e.detail)}
      @contextAction=${(e: CustomEvent) => action('Context Action')(e.detail)}
      @itemRenamed=${(e: CustomEvent) => action('Item Renamed')(e.detail)}
    ></spectrum-collapsible-list>
  `
};

export const CollapsibleListWithContext = {
  args: {
    items: basicItems,
    contextActions: basicContextActions,
    filter: '',
    mutuallyExclusive: true,
    debug: false
  },
  render: CollapsibleListDefault.render
};

export const CollapsibleListSimple = {
  args: {
    items: simpleHierarchy,
    contextActions: [],
    filter: '',
    mutuallyExclusive: true,
    debug: false
  },
  render: CollapsibleListDefault.render
};

export const CollapsibleListNonExclusive = {
  args: {
    items: basicItems,
    contextActions: [],
    filter: '',
    mutuallyExclusive: false,
    debug: false
  },
  render: CollapsibleListDefault.render
};

// ==============================================
// State Examples
// ==============================================

export const CollapsibleListStates = {
  args: CollapsibleListDefault.args,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Default State (Mutually Exclusive)</h4>
        <spectrum-collapsible-list
          .items=${basicItems}
          .mutuallyExclusive=${true}
          @childAction=${(e: CustomEvent) => action('Default - Child Action')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('Default - Expand Action')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('Default - Contract Action')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Multiple Expansion Allowed</h4>
        <spectrum-collapsible-list
          .items=${basicItems}
          .mutuallyExclusive=${false}
          @childAction=${(e: CustomEvent) => action('Non-Exclusive - Child Action')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('Non-Exclusive - Expand Action')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('Non-Exclusive - Contract Action')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">With Context Actions</h4>
        <spectrum-collapsible-list
          .items=${basicItems}
          .contextActions=${basicContextActions}
          @childAction=${(e: CustomEvent) => action('Context - Child Action')(e.detail)}
          @contextAction=${(e: CustomEvent) => action('Context - Context Action')(e.detail)}
          @itemRenamed=${(e: CustomEvent) => action('Context - Item Renamed')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
    </div>
  `
};

// ==============================================
// Filtering Examples
// ==============================================

export const CollapsibleListFiltered = {
  args: {
    items: basicItems,
    contextActions: [],
    filter: 'pdf',
    mutuallyExclusive: true,
    debug: false
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Filtering for items containing "pdf" - only matching items and their parents are shown.
      </p>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .filter=${args.filter}
        .mutuallyExclusive=${args.mutuallyExclusive}
        .debug=${args.debug}
        @childAction=${(e: CustomEvent) => action('Filtered - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Filtered - Expand Action')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Filtered - Contract Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Simple Structure Examples
// ==============================================

export const FlatList = {
  args: {
    items: [
      {
        label: 'Single Item',
        icon: 'description',
        action: 'open',
        id: 'single-1'
      }
    ],
    contextActions: basicContextActions
  },
  render: (args: any) => html`
    <div>
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Single Item List</h4>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        @childAction=${(e: CustomEvent) => action('Flat - Child Action')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Flat - Context Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

export const EmptyList = {
  args: {
    items: [],
    contextActions: []
  },
  render: (args: any) => html`
    <div>
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Empty List</h4>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
      ></spectrum-collapsible-list>
      <p style="margin-top: 1rem; color: var(--spectrum-color-on-surface-variant); font-style: italic;">
        An empty list shows no items (component handles empty state gracefully).
      </p>
    </div>
  `
};

// ==============================================
// Debug Mode Example
// ==============================================

export const CollapsibleListDebug = {
  args: {
    items: basicItems,
    contextActions: basicContextActions,
    filter: '',
    mutuallyExclusive: true,
    debug: true
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; padding: 0.5rem; background: var(--spectrum-color-warning-container); color: var(--spectrum-color-on-warning-container); border-radius: 4px; font-size: 0.9rem;">
        📝 Debug mode enabled - check the browser console for detailed logs of all interactions
      </p>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .filter=${args.filter}
        .mutuallyExclusive=${args.mutuallyExclusive}
        .debug=${args.debug}
        @childAction=${(e: CustomEvent) => action('Debug - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Debug - Expand Action')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Debug - Contract Action')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Debug - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => action('Debug - Item Renamed')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
}; 