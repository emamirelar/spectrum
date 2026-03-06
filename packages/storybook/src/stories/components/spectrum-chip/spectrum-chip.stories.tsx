import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SpectrumChipArgs {
  debug: boolean;
  variant: 'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion';
  size: 'extra-small' | 'small' | 'medium' | 'large';
  selected: boolean;
  disabled: boolean;
  outline: boolean;
  ripple: boolean;
  action: string;
  label: string;
  leadingIcon: string;
  trailingIcon: string;
  showTrailingIcon: boolean;
  sound: boolean;
  haptic: boolean;
}

const VARIANTS = ['primary', 'secondary', 'assist', 'filter', 'input', 'suggestion'] as const;
const SIZES = ['extra-small', 'small', 'medium', 'large'] as const;

const renderChip = (args: SpectrumChipArgs) => html`
  <spectrum-chip
    .debug=${args.debug}
    .variant=${args.variant}
    .size=${args.size}
    .selected=${args.selected}
    .disabled=${args.disabled}
    .outline=${args.outline}
    .ripple=${args.ripple}
    .action=${args.action}
    .label=${args.label}
    .leadingIcon=${args.leadingIcon}
    .trailingIcon=${args.trailingIcon}
    .showTrailingIcon=${args.showTrailingIcon}
    .sound=${args.sound}
    .haptic=${args.haptic}
    @chipAction=${action('chipAction')}
  ></spectrum-chip>
`;

const meta = {
  title: 'Spectrum/Components/SpectrumChip',
  component: 'spectrum-chip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A versatile chip component for tags, filters, and selections with leading/trailing icons, selection states, and interactive behaviors.

### Quick Start
\`\`\`html
<spectrum-chip variant="primary" label="Tag Name"></spectrum-chip>
\`\`\`

### Event System
- **chipAction**: Emitted on click/selection with \`{ action, label }\` payload

### Dependencies
Used by accordion and conversation-panel for interactive tag elements.
        `
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Sample Chip',
    selected: false,
    disabled: false,
    outline: false,
    leadingIcon: 'star',
    trailingIcon: 'close',
    showTrailingIcon: false,
    ripple: true,
    action: 'select',
    sound: false,
    haptic: false,
    debug: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: VARIANTS,
      description: 'Semantic style variant',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: SIZES,
      description: 'Chip size',
      table: { category: 'Appearance', defaultValue: { summary: 'medium' } },
    },
    outline: {
      control: 'boolean',
      description: 'Border-only style',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    selected: {
      control: 'boolean',
      description: 'Toggle selection state',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevent interaction',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Display text',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    leadingIcon: {
      control: 'text',
      description: 'Material Design icon before the label',
      table: { category: 'Icons', defaultValue: { summary: '' } },
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Show trailing icon (typically close/remove)',
      table: { category: 'Icons', defaultValue: { summary: 'false' } },
    },
    trailingIcon: {
      control: 'text',
      description: 'Material Design icon after the label',
      table: { category: 'Icons', defaultValue: { summary: 'close' } },
      if: { arg: 'showTrailingIcon' },
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    action: {
      control: 'text',
      description: 'Action identifier in emitted events',
      table: { category: 'Behavior', defaultValue: { summary: '' } },
    },
    sound: {
      control: 'boolean',
      description: 'Enable click sound',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    haptic: {
      control: 'boolean',
      description: 'Enable haptic feedback',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: { category: 'Advanced', defaultValue: { summary: 'false' } },
    },
  },
  render: renderChip,
} satisfies Meta<SpectrumChipArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

// =================================================================
// PLAYGROUND
// =================================================================

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive — use **Controls** to adjust every property and **Actions** to monitor events.'
      }
    }
  }
};

// =================================================================
// INDIVIDUAL VARIANTS
// =================================================================

export const Primary: Story = { args: { variant: 'primary', label: 'Primary' } };
export const Secondary: Story = { args: { variant: 'secondary', label: 'Secondary' } };
export const Assist: Story = { args: { variant: 'assist', label: 'Assist' } };
export const Filter: Story = { args: { variant: 'filter', label: 'Filter', selected: true } };
export const Input: Story = { args: { variant: 'input', label: 'Input', showTrailingIcon: true } };
export const Suggestion: Story = { args: { variant: 'suggestion', label: 'Suggestion' } };

// =================================================================
// ALL VARIANTS
// =================================================================

export const AllVariants: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
      ${VARIANTS.map(v => html`
        <spectrum-chip
          variant=${v}
          .size=${args.size}
          .outline=${args.outline}
          .disabled=${args.disabled}
          label=${v.charAt(0).toUpperCase() + v.slice(1)}
          ?selected=${v === 'filter'}
          ?show-trailing-icon=${v === 'input'}
          @chipAction=${action('chipAction')}
        ></spectrum-chip>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All six variants at a glance. Change **size**, **outline**, and **disabled** in Controls to see their effect on every variant.'
      }
    }
  }
};

// =================================================================
// ALL SIZES
// =================================================================

export const AllSizes: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      ${SIZES.map(s => html`
        <spectrum-chip
          .variant=${args.variant}
          size=${s}
          .outline=${args.outline}
          label=${s === 'extra-small' ? 'XS' : s.charAt(0).toUpperCase() + s.slice(1)}
          @chipAction=${action('chipAction')}
        ></spectrum-chip>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All four sizes. Switch **variant** in Controls to compare sizing across chip styles.'
      }
    }
  }
};

// =================================================================
// SELECTION & ICONS
// =================================================================

export const SelectionStates: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 0.75rem; align-items: center;">
      <spectrum-chip variant="filter" label="Unselected" .size=${args.size} @chipAction=${action('chipAction')}></spectrum-chip>
      <spectrum-chip variant="filter" label="Selected" selected="true" .size=${args.size} @chipAction=${action('chipAction')}></spectrum-chip>
      <spectrum-chip variant="filter" label="Disabled" disabled="true" .size=${args.size}></spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Filter chips in unselected, selected, and disabled states. Adjust **size** to preview at different scales.'
      }
    }
  }
};

export const IconConfigurations: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
      <spectrum-chip .variant=${args.variant} .size=${args.size} label="Leading" leading-icon="star" @chipAction=${action('chipAction')}></spectrum-chip>
      <spectrum-chip .variant=${args.variant} .size=${args.size} label="Trailing" show-trailing-icon="true" trailing-icon="close" @chipAction=${action('chipAction')}></spectrum-chip>
      <spectrum-chip .variant=${args.variant} .size=${args.size} label="Both" leading-icon="local_offer" show-trailing-icon="true" trailing-icon="expand_more" @chipAction=${action('chipAction')}></spectrum-chip>
      <spectrum-chip .variant=${args.variant} .size=${args.size} label="Outline" outline="true" leading-icon="check" @chipAction=${action('chipAction')}></spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Leading icon, trailing icon, both icons, and outline mode. Change **variant** and **size** in Controls.'
      }
    }
  }
};

// =================================================================
// REAL-WORLD SCENARIOS
// =================================================================

export const ArticleTags: Story = {
  render: () => html`
    <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px;">
      <h4 style="margin: 0 0 0.75rem; color: var(--spectrum-sys-color-on-surface);">Article Tags</h4>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <spectrum-chip variant="primary" size="small" label="JavaScript" leading-icon="code" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="primary" size="small" label="React" leading-icon="web" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="secondary" size="small" label="Tutorial" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="assist" size="small" label="Popular" leading-icon="trending_up" @chipAction=${action('chipAction')}></spectrum-chip>
      </div>
    </div>
  `,
  parameters: {
    docs: { description: { story: 'Categorization tags with semantic variants and leading icons.' } }
  }
};

export const SearchFilters: Story = {
  render: () => html`
    <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px;">
      <h4 style="margin: 0 0 0.75rem; color: var(--spectrum-sys-color-on-surface);">Active Filters</h4>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
        <spectrum-chip variant="filter" label="Electronics" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="filter" label="In Stock" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="filter" label="Free Shipping" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="filter" label="Brand: Apple" @chipAction=${action('chipAction')}></spectrum-chip>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <spectrum-chip variant="suggestion" size="small" label="Under $100" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="suggestion" size="small" label="New Arrivals" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="suggestion" size="small" label="Bestsellers" @chipAction=${action('chipAction')}></spectrum-chip>
      </div>
    </div>
  `,
  parameters: {
    docs: { description: { story: 'Toggleable filter chips with suggested refinements below.' } }
  }
};

export const SkillsInput: Story = {
  render: () => html`
    <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px;">
      <h4 style="margin: 0 0 0.75rem; color: var(--spectrum-sys-color-on-surface);">Skills</h4>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <spectrum-chip variant="input" label="TypeScript" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="input" label="Node.js" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="input" label="MongoDB" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="input" label="AWS" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
      </div>
    </div>
  `,
  parameters: {
    docs: { description: { story: 'Removable input chips for user-entered tags.' } }
  }
};

// =================================================================
// ACCESSIBILITY
// =================================================================

export const KeyboardNavigation: Story = {
  render: () => html`
    <div>
      <p style="color: var(--spectrum-sys-color-on-surface-variant); margin: 0 0 1rem; font-size: 0.875rem;">
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Tab</kbd> to navigate,
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Enter</kbd> /
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Space</kbd> to toggle.
      </p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <spectrum-chip variant="filter" label="Filter 1" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="filter" label="Filter 2" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="input" label="Removable" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <spectrum-chip variant="filter" label="Disabled" disabled="true"></spectrum-chip>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Tab through chips to verify focus indicators and keyboard interaction. Disabled chip should be skipped.'
      }
    }
  }
};
