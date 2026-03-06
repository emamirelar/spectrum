import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SpectrumButtonArgs {
  debug: boolean;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'fab';
  size: 'sm' | 'base' | 'medium' | 'lg';
  outline: boolean;
  iconOnly: boolean;
  disabled: boolean;
  ripple: boolean;
  action: string;
  customStyle: any;
  minimalAnimation: boolean;
  showButtonText: boolean;
  buttonText: string;
  showLeftIcon: boolean;
  leftIcon: string;
  showRightIcon: boolean;
  rightIcon: string;
  sound: boolean;
  haptic: boolean;
  state: 'default' | 'hover' | 'active' | 'disabled';
}

const VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'outline', 'fab'] as const;
const SIZES = ['sm', 'medium', 'lg'] as const;

const renderButton = (args: SpectrumButtonArgs) => html`
  <spectrum-button
    .debug=${args.debug}
    .variant=${args.variant}
    .size=${args.size}
    .outline=${args.outline}
    .iconOnly=${args.iconOnly}
    .disabled=${args.disabled}
    .ripple=${args.ripple}
    .action=${args.action}
    .customStyle=${args.customStyle}
    .minimalAnimation=${args.minimalAnimation}
    .showButtonText=${args.showButtonText}
    .buttonText=${args.buttonText}
    .showLeftIcon=${args.showLeftIcon}
    .leftIcon=${args.leftIcon}
    .showRightIcon=${args.showRightIcon}
    .rightIcon=${args.rightIcon}
    .sound=${args.sound}
    .haptic=${args.haptic}
    .state=${args.state}
    @buttonAction=${action('buttonAction')}
  ></spectrum-button>
`;

const meta = {
  title: 'Spectrum/Components/SpectrumButton',
  component: 'spectrum-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and states supporting icons, text, and various interactive states.

### Quick Start
\`\`\`html
<spectrum-button variant="primary" button-text="Click Me" show-button-text="true"></spectrum-button>
\`\`\`

### Event System
- **buttonAction**: Emitted on click with \`{ action, label }\` payload

### Dependencies
Used by 7+ components: conversation-panel, hero, image-gallery, rail, search-input, select, cookie-compliance
        `
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'medium',
    buttonText: 'Click Me',
    showButtonText: true,
    showLeftIcon: false,
    leftIcon: 'favorite',
    showRightIcon: false,
    rightIcon: 'arrow_forward',
    iconOnly: false,
    outline: false,
    disabled: false,
    ripple: true,
    state: 'default',
    action: 'click',
    sound: false,
    haptic: false,
    minimalAnimation: false,
    customStyle: '',
    debug: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: VARIANTS,
      description: 'Visual style variant',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'base', 'medium', 'lg'],
      description: 'Button size',
      table: { category: 'Appearance', defaultValue: { summary: 'medium' } },
    },
    outline: {
      control: 'boolean',
      description: 'Render as outlined (border-only) style',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'Force a visual state for preview',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevent interaction and grey out',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    buttonText: {
      control: 'text',
      description: 'Label text displayed inside the button',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    showButtonText: {
      control: 'boolean',
      description: 'Toggle text visibility',
      table: { category: 'Content', defaultValue: { summary: 'true' } },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Show only the icon (no text)',
      table: { category: 'Content', defaultValue: { summary: 'false' } },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show leading icon',
      table: { category: 'Icons', defaultValue: { summary: 'false' } },
    },
    leftIcon: {
      control: 'text',
      description: 'Material Design icon name for leading position',
      table: { category: 'Icons', defaultValue: { summary: '' } },
      if: { arg: 'showLeftIcon' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Show trailing icon',
      table: { category: 'Icons', defaultValue: { summary: 'false' } },
    },
    rightIcon: {
      control: 'text',
      description: 'Material Design icon name for trailing position',
      table: { category: 'Icons', defaultValue: { summary: '' } },
      if: { arg: 'showRightIcon' },
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect on click',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    action: {
      control: 'text',
      description: 'Action identifier included in emitted events',
      table: { category: 'Behavior', defaultValue: { summary: '' } },
    },
    sound: {
      control: 'boolean',
      description: 'Enable click sound effect',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    haptic: {
      control: 'boolean',
      description: 'Enable haptic feedback on mobile',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    minimalAnimation: {
      control: 'boolean',
      description: 'Reduce animations for prefers-reduced-motion',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    customStyle: {
      control: 'object',
      description: 'Custom CSS styles object',
      table: { category: 'Advanced', defaultValue: { summary: '{}' } },
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug console logging',
      table: { category: 'Advanced', defaultValue: { summary: 'false' } },
    },
  },
  render: renderButton,
} satisfies Meta<SpectrumButtonArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

// =================================================================
// PLAYGROUND — Fully interactive, every arg wired to Controls
// =================================================================

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive playground — use the **Controls** panel to tweak every property and the **Actions** panel to monitor events.'
      }
    }
  }
};

// =================================================================
// VARIANTS
// =================================================================

export const Primary: Story = {
  args: { variant: 'primary', buttonText: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', buttonText: 'Secondary' },
};

export const Success: Story = {
  args: { variant: 'success', buttonText: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', buttonText: 'Warning' },
};

export const Danger: Story = {
  args: { variant: 'danger', buttonText: 'Danger' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', buttonText: 'Ghost' },
};

export const Outline: Story = {
  args: { variant: 'outline', buttonText: 'Outline' },
};

export const FAB: Story = {
  args: { variant: 'fab', buttonText: 'FAB' },
};

// =================================================================
// ALL VARIANTS — side-by-side comparison, still editable via Controls
// =================================================================

export const AllVariants: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
      ${VARIANTS.map(v => html`
        <spectrum-button
          variant=${v}
          .size=${args.size}
          .outline=${args.outline}
          .disabled=${args.disabled}
          .ripple=${args.ripple}
          button-text=${v.charAt(0).toUpperCase() + v.slice(1)}
          show-button-text="true"
          @buttonAction=${action('buttonAction')}
        ></spectrum-button>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `All eight variants rendered side-by-side. Adjust **size**, **outline**, and **disabled** in Controls to see how they affect every variant simultaneously.`
      }
    }
  }
};

// =================================================================
// SIZES
// =================================================================

export const Small: Story = {
  args: { size: 'sm', buttonText: 'Small' },
};

export const Medium: Story = {
  args: { size: 'medium', buttonText: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', buttonText: 'Large' },
};

export const AllSizes: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      ${SIZES.map(s => html`
        <spectrum-button
          .variant=${args.variant}
          size=${s}
          .outline=${args.outline}
          .disabled=${args.disabled}
          .ripple=${args.ripple}
          button-text=${s === 'sm' ? 'Small' : s === 'medium' ? 'Medium' : 'Large'}
          show-button-text="true"
          @buttonAction=${action('buttonAction')}
        ></spectrum-button>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All three sizes in a row. Change **variant** in Controls to compare sizing across variants.'
      }
    }
  }
};

// =================================================================
// ICON CONFIGURATIONS
// =================================================================

export const WithLeftIcon: Story = {
  args: {
    showLeftIcon: true,
    leftIcon: 'save',
    buttonText: 'Save',
  },
};

export const WithRightIcon: Story = {
  args: {
    showRightIcon: true,
    rightIcon: 'arrow_forward',
    buttonText: 'Next',
  },
};

export const WithBothIcons: Story = {
  args: {
    showLeftIcon: true,
    leftIcon: 'download',
    showRightIcon: true,
    rightIcon: 'expand_more',
    buttonText: 'Download',
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
    showButtonText: false,
  },
};

export const IconGallery: Story = {
  render: (args) => {
    const icons = [
      { icon: 'favorite', label: 'Like' },
      { icon: 'share', label: 'Share' },
      { icon: 'edit', label: 'Edit' },
      { icon: 'delete', label: 'Delete' },
      { icon: 'add', label: 'Add' },
      { icon: 'search', label: 'Search' },
      { icon: 'settings', label: 'Settings' },
      { icon: 'refresh', label: 'Refresh' },
    ];
    return html`
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
        ${icons.map(({ icon, label }) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
            <spectrum-button
              .variant=${args.variant}
              .size=${args.size}
              icon-only="true"
              show-left-icon="true"
              left-icon=${icon}
              @buttonAction=${action('buttonAction')}
            ></spectrum-button>
            <small style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.7rem;">${label}</small>
          </div>
        `)}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Common icon-only buttons. Switch **variant** and **size** in Controls to preview different looks.'
      }
    }
  }
};

// =================================================================
// STATES
// =================================================================

export const Disabled: Story = {
  args: { disabled: true, buttonText: 'Disabled' },
};

export const OutlineMode: Story = {
  args: { outline: true, buttonText: 'Outlined' },
};

export const AllStates: Story = {
  render: (args) => html`
    <div style="display: grid; grid-template-columns: 120px repeat(4, auto); gap: 0.75rem; align-items: center;">
      <div></div>
      ${(['default', 'hover', 'active', 'disabled'] as const).map(s =>
        html`<div style="font-size: 0.75rem; font-weight: 600; color: var(--spectrum-sys-color-on-surface-variant); text-transform: uppercase; text-align: center;">${s}</div>`
      )}
      ${VARIANTS.map(v => html`
        <div style="font-size: 0.8rem; font-weight: 500; color: var(--spectrum-sys-color-on-surface-variant); text-transform: capitalize;">${v}</div>
        ${(['default', 'hover', 'active', 'disabled'] as const).map(s => html`
          <div style="display: flex; justify-content: center;">
            <spectrum-button
              variant=${v}
              state=${s === 'disabled' ? 'default' : s}
              ?disabled=${s === 'disabled'}
              button-text=${v.charAt(0).toUpperCase() + v.slice(1)}
              show-button-text="true"
              .size=${args.size}
              @buttonAction=${action('buttonAction')}
            ></spectrum-button>
          </div>
        `)}
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Complete matrix: every variant in every state. Adjust **size** in Controls to scale the entire grid.'
      }
    }
  }
};

// =================================================================
// REAL-WORLD SCENARIOS — composable patterns
// =================================================================

export const FormActions: Story = {
  render: (args) => html`
    <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px;">
      <h4 style="margin: 0 0 1rem; color: var(--spectrum-sys-color-on-surface);">Form Actions</h4>
      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; align-items: center;">
        <spectrum-button variant="ghost" button-text="Cancel" show-button-text="true" .size=${args.size} @buttonAction=${action('cancel')}></spectrum-button>
        <spectrum-button variant="secondary" button-text="Save Draft" show-button-text="true" show-left-icon="true" left-icon="save" .size=${args.size} @buttonAction=${action('saveDraft')}></spectrum-button>
        <spectrum-button variant="primary" button-text="Submit" show-button-text="true" show-right-icon="true" right-icon="send" .size=${args.size} @buttonAction=${action('submit')}></spectrum-button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Primary–secondary–tertiary hierarchy. Toggle **size** to test at different scales.'
      }
    }
  }
};

export const DataToolbar: Story = {
  render: (args) => html`
    <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px;">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
        <spectrum-button variant="primary" size="sm" button-text="Create New" show-button-text="true" show-left-icon="true" left-icon="add" @buttonAction=${action('create')}></spectrum-button>
        <spectrum-button variant="outline" size="sm" button-text="Import" show-button-text="true" show-left-icon="true" left-icon="upload" @buttonAction=${action('import')}></spectrum-button>
        <spectrum-button variant="outline" size="sm" button-text="Export" show-button-text="true" show-left-icon="true" left-icon="download" @buttonAction=${action('export')}></spectrum-button>
        <div style="flex: 1;"></div>
        <spectrum-button variant="ghost" size="sm" icon-only="true" show-left-icon="true" left-icon="refresh" @buttonAction=${action('refresh')}></spectrum-button>
        <spectrum-button variant="ghost" size="sm" icon-only="true" show-left-icon="true" left-icon="filter_list" @buttonAction=${action('filter')}></spectrum-button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Typical data management toolbar with grouped actions, spacer, and icon-only utility buttons.'
      }
    }
  }
};

export const DestructiveConfirm: Story = {
  render: () => html`
    <div style="padding: 1.5rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; max-width: 420px;">
      <h4 style="margin: 0 0 0.5rem; color: var(--spectrum-sys-color-on-surface);">Delete Item</h4>
      <p style="margin: 0 0 1.25rem; color: var(--spectrum-sys-color-on-surface-variant);">
        This action cannot be undone. Are you sure?
      </p>
      <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
        <spectrum-button variant="ghost" button-text="Cancel" show-button-text="true" @buttonAction=${action('cancel')}></spectrum-button>
        <spectrum-button variant="danger" button-text="Delete" show-button-text="true" show-left-icon="true" left-icon="delete" @buttonAction=${action('delete')}></spectrum-button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Destructive action confirmation pattern with clear safe/dangerous choices.'
      }
    }
  }
};

export const Pagination: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; align-items: center;">
      <spectrum-button variant="outline" button-text="Previous" show-button-text="true" show-left-icon="true" left-icon="arrow_back" @buttonAction=${action('prev')}></spectrum-button>
      ${[1, 2, 3].map(n => html`
        <spectrum-button variant=${n === 2 ? 'primary' : 'ghost'} size="sm" button-text="${n}" show-button-text="true" @buttonAction=${action(`page-${n}`)}></spectrum-button>
      `)}
      <spectrum-button variant="outline" button-text="Next" show-button-text="true" show-right-icon="true" right-icon="arrow_forward" @buttonAction=${action('next')}></spectrum-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls with active page highlight and directional icons.'
      }
    }
  }
};

// =================================================================
// SPECIAL FEATURES
// =================================================================

export const SpecialFeatures: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-start;">
      ${[
        { text: 'Ripple', props: 'ripple="true"', note: 'Click to see ripple' },
        { text: 'Minimal', props: 'minimal-animation="true"', note: 'Reduced motion' },
        { text: 'Sound', props: 'sound="true"', note: 'Audio feedback' },
        { text: 'Haptic', props: 'haptic="true"', note: 'Mobile vibration' },
      ].map(f => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.35rem;">
          <spectrum-button variant="primary" button-text=${f.text} show-button-text="true"
            ?ripple=${f.text === 'Ripple'}
            ?minimal-animation=${f.text === 'Minimal'}
            ?sound=${f.text === 'Sound'}
            ?haptic=${f.text === 'Haptic'}
            @buttonAction=${action('buttonAction')}
          ></spectrum-button>
          <small style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.7rem;">${f.note}</small>
        </div>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Advanced interaction features: ripple effect, reduced motion, sound, and haptic feedback.'
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY
// =================================================================

export const KeyboardNavigation: Story = {
  render: () => html`
    <div>
      <p style="color: var(--spectrum-sys-color-on-surface-variant); margin: 0 0 1rem; font-size: 0.875rem;">
        Press <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Tab</kbd> to navigate between buttons,
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Enter</kbd> or
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Space</kbd> to activate.
      </p>
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <spectrum-button variant="primary" button-text="First" show-button-text="true" @buttonAction=${action('first')}></spectrum-button>
        <spectrum-button variant="secondary" button-text="Second" show-button-text="true" @buttonAction=${action('second')}></spectrum-button>
        <spectrum-button variant="outline" button-text="Third" show-button-text="true" @buttonAction=${action('third')}></spectrum-button>
        <spectrum-button variant="primary" button-text="Disabled" show-button-text="true" disabled="true"></spectrum-button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Tab through the buttons to verify visible focus indicators and proper keyboard activation. The disabled button should be skipped.'
      }
    }
  }
};
