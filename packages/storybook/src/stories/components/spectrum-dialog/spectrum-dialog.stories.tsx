import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface DialogButtonConfig {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
  disabled?: boolean;
  action?: string;
}

interface SpectrumDialogArgs {
  open: boolean;
  dialogTitle: string;
  dialogId: string;
  showCloseButton: boolean;
  closeOnOutsideClick: boolean;
  closeOnEscape: boolean;
  buttons: DialogButtonConfig[];
  background: 'opaque' | 'partial-frost' | 'full-frost' | 'transparent';
  size: 'small' | 'medium' | 'large' | 'full' | 'auto';
  width: string;
  height: string;
  noPadding: boolean;
  debug: boolean;
  content: string;
}

let dialogCounter = 0;
const nextId = () => `sb-dialog-${++dialogCounter}`;

const createDialog = (args: SpectrumDialogArgs) => {
  const dialogId = nextId();

  return html`
    <div>
      <spectrum-button
        button-text="Open Dialog"
        variant="primary"
        show-button-text="true"
        @buttonAction=${() => {
          const el = document.getElementById(dialogId) as any;
          el?.show?.();
        }}
      ></spectrum-button>

      <spectrum-dialog
        id="${dialogId}"
        .open=${args.open}
        .dialogTitle=${args.dialogTitle}
        .dialogId=${args.dialogId}
        .showCloseButton=${args.showCloseButton}
        .closeOnOutsideClick=${args.closeOnOutsideClick}
        .closeOnEscape=${args.closeOnEscape}
        .buttons=${args.buttons}
        .background=${args.background}
        .size=${args.size}
        .width=${args.width || undefined}
        .height=${args.height || undefined}
        .noPadding=${args.noPadding}
        .debug=${args.debug}
        @dialogAction=${(e: CustomEvent) => {
          action('dialogAction')(e.detail);
          if (e.detail.action === 'close' || e.detail.action === 'cancel' || e.detail.buttonId === 'close') {
            (document.getElementById(dialogId) as any)?.hide?.();
          }
        }}
        @dialogClose=${(e: CustomEvent) => action('dialogClose')(e.detail)}
      >
        <div slot="content">
          <p style="margin: 0;">${args.content}</p>
        </div>
      </spectrum-dialog>
    </div>
  `;
};

const meta = {
  title: 'Spectrum/Components/SpectrumDialog',
  component: 'spectrum-dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A modal dialog built on the native HTML \`<dialog>\` element with backdrop shade, focus trapping, and flexible content.

### Quick Start
\`\`\`html
<spectrum-dialog dialog-title="Title" id="my-dialog">
  <div slot="content">Content here</div>
</spectrum-dialog>
<script>document.getElementById('my-dialog').show();</script>
\`\`\`

### Event System
- **dialogAction**: Emitted on button clicks with \`{ action, buttonId }\` payload
- **dialogClose**: Emitted when the dialog closes

### Dependencies
Uses **spectrum-button** for the control bar and **spectrum-panel** for styling.
        `
      }
    },
    layout: 'centered',
  },
  args: {
    open: false,
    dialogTitle: 'Dialog Title',
    dialogId: 'example-dialog',
    showCloseButton: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    buttons: [],
    background: 'opaque',
    size: 'medium',
    width: '',
    height: '',
    noPadding: false,
    debug: false,
    content: 'This is the dialog content. Customize it via the Controls panel.',
  },
  argTypes: {
    dialogTitle: {
      control: 'text',
      description: 'Header title text',
      table: { category: 'Content', defaultValue: { summary: '' } },
    },
    content: {
      control: 'text',
      description: 'Body content text (for playground)',
      table: { category: 'Content' },
    },
    buttons: {
      control: 'object',
      description: 'Control bar buttons array',
      table: { category: 'Content', defaultValue: { summary: '[]' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large', 'full', 'auto'],
      description: 'Preset size',
      table: { category: 'Appearance', defaultValue: { summary: 'medium' } },
    },
    background: {
      control: 'inline-radio',
      options: ['opaque', 'partial-frost', 'full-frost', 'transparent'],
      description: 'Panel background style',
      table: { category: 'Appearance', defaultValue: { summary: 'opaque' } },
    },
    width: {
      control: 'text',
      description: 'Custom width (CSS value)',
      table: { category: 'Appearance', defaultValue: { summary: '' } },
    },
    height: {
      control: 'text',
      description: 'Custom height (CSS value)',
      table: { category: 'Appearance', defaultValue: { summary: '' } },
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove content area padding',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show X close button in header',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Close when clicking the backdrop',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on Escape key',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    open: {
      control: 'boolean',
      description: 'Open state (usually controlled programmatically)',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    dialogId: {
      control: 'text',
      description: 'Identifier included in events',
      table: { category: 'Advanced', defaultValue: { summary: '' } },
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: { category: 'Advanced', defaultValue: { summary: 'false' } },
    },
  },
  render: createDialog,
} satisfies Meta<SpectrumDialogArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

// =================================================================
// PLAYGROUND
// =================================================================

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click **Open Dialog** to launch. Use **Controls** to configure title, size, background, buttons, close behavior, and more. All events log to the **Actions** panel.'
      }
    }
  }
};

// =================================================================
// SIZES
// =================================================================

export const Small: Story = {
  args: { dialogTitle: 'Small Dialog', size: 'small', content: 'Compact dialog for quick confirmations.' },
};

export const Medium: Story = {
  args: { dialogTitle: 'Medium Dialog', size: 'medium', content: 'Standard dialog for most use cases.' },
};

export const Large: Story = {
  args: { dialogTitle: 'Large Dialog', size: 'large', content: 'Spacious dialog for forms and detailed content.' },
};

export const Full: Story = {
  args: { dialogTitle: 'Full Size Dialog', size: 'full', content: 'Full-viewport dialog for immersive experiences.' },
};

// =================================================================
// BACKGROUNDS
// =================================================================

export const PartialFrost: Story = {
  args: { dialogTitle: 'Frost Effect', background: 'partial-frost', content: 'Semi-transparent frosted glass background.' },
};

export const FullFrost: Story = {
  args: { dialogTitle: 'Full Frost', background: 'full-frost', content: 'Fully frosted glass background.' },
};

export const Transparent: Story = {
  args: { dialogTitle: 'Transparent', background: 'transparent', content: 'Transparent background showing content behind.' },
};

// =================================================================
// BUTTON CONFIGURATIONS
// =================================================================

export const Confirmation: Story = {
  args: {
    dialogTitle: 'Confirm Action',
    content: 'Are you sure you want to proceed?',
    buttons: [
      { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
      { id: 'confirm', label: 'Confirm', variant: 'primary', action: 'confirm' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Standard confirmation with Cancel/Confirm buttons.' } }
  }
};

export const DestructiveAction: Story = {
  args: {
    dialogTitle: 'Delete Item',
    content: 'This action cannot be undone. Are you sure you want to delete this item?',
    closeOnOutsideClick: false,
    buttons: [
      { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
      { id: 'delete', label: 'Delete', variant: 'danger', action: 'delete' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Destructive action with disabled outside-click to prevent accidental dismissal.' } }
  }
};

export const SaveChanges: Story = {
  args: {
    dialogTitle: 'Save Changes',
    content: 'You have unsaved changes. What would you like to do?',
    buttons: [
      { id: 'discard', label: 'Discard', variant: 'ghost', action: 'discard' },
      { id: 'draft', label: 'Save as Draft', variant: 'secondary', action: 'draft' },
      { id: 'publish', label: 'Save & Publish', variant: 'success', action: 'publish' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Three-button pattern for save/discard/publish workflows.' } }
  }
};

export const Notification: Story = {
  args: {
    dialogTitle: 'Success!',
    content: 'Your changes have been saved successfully.',
    buttons: [
      { id: 'ok', label: 'OK', variant: 'primary', action: 'ok' },
    ],
  },
  parameters: {
    docs: { description: { story: 'Simple notification with a single dismissal button.' } }
  }
};

// =================================================================
// SPECIAL CONFIGURATIONS
// =================================================================

export const NoCloseButton: Story = {
  args: {
    dialogTitle: 'No Close Button',
    showCloseButton: false,
    content: 'You must use the button below to close this dialog.',
    buttons: [
      { id: 'close', label: 'Close', variant: 'primary', action: 'close' },
    ],
  },
};

export const NoPadding: Story = {
  args: {
    dialogTitle: 'Edge-to-Edge Content',
    noPadding: true,
    content: 'Content extends to the dialog edges — useful for images or embedded components.',
  },
};

export const CustomSize: Story = {
  args: {
    dialogTitle: 'Custom Dimensions',
    width: '600px',
    height: '400px',
    content: 'Dialog with explicit width and height values.',
  },
};

export const LoadingState: Story = {
  args: {
    dialogTitle: 'Processing...',
    content: 'Please wait while we process your request.',
    showCloseButton: false,
    closeOnOutsideClick: false,
    closeOnEscape: false,
  },
  parameters: {
    docs: { description: { story: 'Locked dialog during async operations — no close mechanisms available.' } }
  }
};

// =================================================================
// REAL-WORLD: USE CASES GALLERY
// =================================================================

export const UseCasesGallery: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
      <spectrum-button button-text="Basic" variant="primary" show-button-text="true"
        @buttonAction=${() => (document.getElementById('uc-basic') as any)?.show()}></spectrum-button>
      <spectrum-button button-text="Confirmation" variant="warning" show-button-text="true"
        @buttonAction=${() => (document.getElementById('uc-confirm') as any)?.show()}></spectrum-button>
      <spectrum-button button-text="Form" variant="secondary" show-button-text="true"
        @buttonAction=${() => (document.getElementById('uc-form') as any)?.show()}></spectrum-button>
      <spectrum-button button-text="Fullscreen" variant="ghost" show-button-text="true"
        @buttonAction=${() => (document.getElementById('uc-full') as any)?.show()}></spectrum-button>
    </div>

    <spectrum-dialog id="uc-basic" dialog-title="Welcome" dialog-id="basic"
      @dialogAction=${(e: CustomEvent) => action('dialogAction')(e.detail)}
      @dialogClose=${(e: CustomEvent) => action('dialogClose')(e.detail)}>
      <div slot="content">
        <p style="margin: 0;">Welcome to the Spectrum Dialog component!</p>
      </div>
    </spectrum-dialog>

    <spectrum-dialog id="uc-confirm" dialog-title="Delete Item" dialog-id="confirm"
      .closeOnOutsideClick=${false}
      .buttons=${[
        { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
        { id: 'delete', label: 'Delete', variant: 'danger', action: 'delete' },
      ]}
      @dialogAction=${(e: CustomEvent) => {
        action('dialogAction')(e.detail);
        (document.getElementById('uc-confirm') as any)?.hide();
      }}
      @dialogClose=${(e: CustomEvent) => action('dialogClose')(e.detail)}>
      <div slot="content">
        <p style="margin: 0;">Are you sure? This cannot be undone.</p>
      </div>
    </spectrum-dialog>

    <spectrum-dialog id="uc-form" dialog-title="Contact Us" dialog-id="form" size="large"
      .buttons=${[
        { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
        { id: 'submit', label: 'Send', variant: 'primary', action: 'submit' },
      ]}
      @dialogAction=${(e: CustomEvent) => {
        action('dialogAction')(e.detail);
        (document.getElementById('uc-form') as any)?.hide();
      }}
      @dialogClose=${(e: CustomEvent) => action('dialogClose')(e.detail)}>
      <div slot="content">
        <form style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name</label>
            <input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid var(--spectrum-sys-color-outline, #ccc); border-radius: 4px; box-sizing: border-box;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message</label>
            <textarea rows="3" style="width: 100%; padding: 0.5rem; border: 1px solid var(--spectrum-sys-color-outline, #ccc); border-radius: 4px; resize: vertical; box-sizing: border-box;"></textarea>
          </div>
        </form>
      </div>
    </spectrum-dialog>

    <spectrum-dialog id="uc-full" dialog-title="Gallery View" dialog-id="fullscreen" size="full" background="full-frost"
      .buttons=${[{ id: 'close', label: 'Close', variant: 'primary', action: 'close' }]}
      @dialogAction=${(e: CustomEvent) => {
        action('dialogAction')(e.detail);
        (document.getElementById('uc-full') as any)?.hide();
      }}
      @dialogClose=${(e: CustomEvent) => action('dialogClose')(e.detail)}>
      <div slot="content">
        <div style="text-align: center; padding: 2rem;">
          <h3 style="margin: 0 0 1rem;">Fullscreen Experience</h3>
          <div style="background: linear-gradient(45deg, #667eea, #764ba2); height: 200px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem;">
            Immersive Content Area
          </div>
        </div>
      </div>
    </spectrum-dialog>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Four common dialog patterns in one view: basic info, destructive confirmation, form input, and fullscreen gallery. Click each button to preview.'
      }
    }
  }
};
