import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

interface DialogButtonConfig {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
  disabled?: boolean;
  action?: string;
}

interface SpectrumDialogArgs {
  open: boolean;
  dialogTitle?: string;
  dialogId?: string;
  showCloseButton: boolean;
  closeOnOutsideClick: boolean;
  closeOnEscape: boolean;
  buttons: DialogButtonConfig[];
  background: 'opaque' | 'partial-frost' | 'full-frost' | 'transparent';
  size: 'small' | 'medium' | 'large' | 'full' | 'auto';
  width?: string;
  height?: string;
  noPadding: boolean;
  debug: boolean;
  content: string;
}

const meta: Meta<SpectrumDialogArgs> = {
  title: 'Spectrum/Components/SpectrumDialog',
  component: 'spectrum-dialog',
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog component using the HTML dialog element with background shade. Features close functionality, optional title, control bar, and uses spectrum-panel for styling.'
      }
    },
    layout: 'centered'
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open'
    },
    dialogTitle: {
      control: 'text',
      description: 'Optional title for the dialog'
    },
    dialogId: {
      control: 'text',
      description: 'Optional dialog identifier for event handling'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button'
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether clicking outside the dialog should close it'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing Escape should close the dialog'
    },
    buttons: {
      control: 'object',
      description: 'Array of buttons for the control bar'
    },
    background: {
      control: 'select',
      options: ['opaque', 'partial-frost', 'full-frost', 'transparent'],
      description: 'Background level for the dialog panel'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full', 'auto'],
      description: 'Size of the dialog'
    },
    width: {
      control: 'text',
      description: 'Custom width for the dialog'
    },
    height: {
      control: 'text',
      description: 'Custom height for the dialog'
    },
    noPadding: {
      control: 'boolean',
      description: 'Whether to remove padding from the content area'
    },
    debug: {
      control: 'boolean',
      description: 'Whether to enable debug logging'
    },
    content: {
      control: 'text',
      description: 'Content to display in the dialog'
    }
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
    noPadding: false,
    debug: false,
    content: 'This is the dialog content.'
  }
};

export default meta;
type Story = StoryObj<SpectrumDialogArgs>;

const createDialog = (args: SpectrumDialogArgs) => {
  const dialogId = `dialog-${Math.random().toString(36).substr(2, 9)}`;
  
  return html`
    <div>
      <spectrum-button 
        button-text="Open Dialog" 
        variant="primary"
        onclick="document.getElementById('${dialogId}').show()"
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
        .width=${args.width}
        .height=${args.height}
        .noPadding=${args.noPadding}
        .debug=${args.debug}
        @dialogAction=${(e: CustomEvent) => {
          console.log('Dialog action:', e.detail);
          if (e.detail.action === 'close' || e.detail.buttonId === 'close') {
            (document.getElementById(dialogId) as any)?.hide();
          }
        }}
        @dialogClose=${(e: CustomEvent) => {
          console.log('Dialog closed:', e.detail);
        }}
      >
        <div slot="content" .innerHTML=${args.content}></div>
      </spectrum-dialog>
    </div>
  `;
};

export const Default: Story = {
  render: createDialog
};

export const WithControlBar: Story = {
  args: {
    dialogTitle: 'Confirmation Dialog',
    content: 'Are you sure you want to proceed with this action?',
    buttons: [
      { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
      { id: 'confirm', label: 'Confirm', variant: 'primary', action: 'confirm' }
    ]
  },
  render: createDialog
};

export const SmallSize: Story = {
  args: {
    dialogTitle: 'Small Dialog',
    size: 'small',
    content: 'This is a small dialog with minimal content.'
  },
  render: createDialog
};

export const LargeSize: Story = {
  args: {
    dialogTitle: 'Large Dialog',
    size: 'large',
    content: 'This is a large dialog with more space for content. It can accommodate longer text and multiple elements.'
  },
  render: createDialog
};

export const FullSize: Story = {
  args: {
    dialogTitle: 'Full Size Dialog',
    size: 'full',
    content: 'This is a full-size dialog that takes up most of the viewport.'
  },
  render: createDialog
};

export const WithFrostEffect: Story = {
  args: {
    dialogTitle: 'Frost Effect Dialog',
    background: 'partial-frost',
    content: 'This dialog has a frost effect background.'
  },
  render: createDialog
};

export const FullFrostEffect: Story = {
  args: {
    dialogTitle: 'Full Frost Dialog',
    background: 'full-frost',
    content: 'This dialog has a full frost effect background.'
  },
  render: createDialog
};

export const TransparentBackground: Story = {
  args: {
    dialogTitle: 'Transparent Dialog',
    background: 'transparent',
    content: 'This dialog has a transparent background.'
  },
  render: createDialog
};

export const NoCloseButton: Story = {
  args: {
    dialogTitle: 'No Close Button',
    showCloseButton: false,
    content: 'This dialog doesn\'t have a close button. Use the control bar to close.',
    buttons: [
      { id: 'close', label: 'Close', variant: 'primary', action: 'close' }
    ]
  },
  render: createDialog
};

export const NoPadding: Story = {
  args: {
    dialogTitle: 'No Padding Dialog',
    noPadding: true,
    content: 'This dialog has no padding, allowing content to extend to the edges.'
  },
  render: createDialog
};

export const CustomSize: Story = {
  args: {
    dialogTitle: 'Custom Size Dialog',
    width: '600px',
    height: '400px',
    content: 'This dialog has custom width and height dimensions.'
  },
  render: createDialog
};

export const FormDialog: Story = {
  args: {
    dialogTitle: 'Contact Form',
    size: 'large',
    content: 'Form content placeholder',
    buttons: [
      { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
      { id: 'submit', label: 'Send Message', variant: 'primary', action: 'submit' }
    ]
  },
  render: createDialog
};

export const DestructiveAction: Story = {
  args: {
    dialogTitle: 'Delete Item',
    content: 'This action cannot be undone. Are you sure you want to delete this item?',
    closeOnOutsideClick: false,
    buttons: [
      { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
      { id: 'delete', label: 'Delete', variant: 'danger', action: 'delete' }
    ]
  },
  render: createDialog
};

export const MultipleButtons: Story = {
  args: {
    dialogTitle: 'Save Changes',
    content: 'You have unsaved changes. What would you like to do?',
    buttons: [
      { id: 'discard', label: 'Discard', variant: 'ghost', action: 'discard' },
      { id: 'draft', label: 'Save as Draft', variant: 'secondary', action: 'draft' },
      { id: 'publish', label: 'Save & Publish', variant: 'success', action: 'publish' }
    ]
  },
  render: createDialog
};

export const LoadingState: Story = {
  args: {
    dialogTitle: 'Processing...',
    content: 'Please wait while we process your request...',
    showCloseButton: false,
    closeOnOutsideClick: false,
    closeOnEscape: false
  },
  render: createDialog
};

export const NotificationDialog: Story = {
  args: {
    dialogTitle: 'Success!',
    content: 'Your changes have been saved successfully.',
    buttons: [
      { id: 'ok', label: 'OK', variant: 'primary', action: 'ok' }
    ]
  },
  render: createDialog
};

// Use Cases Story
export const UseCases: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; max-width: 800px;">
      <spectrum-button 
        button-text="Basic Dialog" 
        variant="primary"
        onclick="document.getElementById('basic-dialog').show()"
      ></spectrum-button>
      
      <spectrum-button 
        button-text="Confirmation" 
        variant="warning"
        onclick="document.getElementById('confirm-dialog').show()"
      ></spectrum-button>
      
      <spectrum-button 
        button-text="Form Dialog" 
        variant="secondary"
        onclick="document.getElementById('form-dialog').show()"
      ></spectrum-button>
      
      <spectrum-button 
        button-text="Fullscreen" 
        variant="ghost"
        onclick="document.getElementById('fullscreen-dialog').show()"
      ></spectrum-button>
    </div>

    <!-- Basic Dialog -->
    <spectrum-dialog
      id="basic-dialog"
      dialog-title="Welcome"
      dialog-id="basic"
    >
      <div slot="content">
        <p>Welcome to the Spectrum Dialog component!</p>
        <p>This is a basic dialog with just content and a title.</p>
      </div>
    </spectrum-dialog>

    <!-- Confirmation Dialog -->
    <spectrum-dialog
      id="confirm-dialog"
      dialog-title="Delete Item"
      dialog-id="confirm"
      .closeOnOutsideClick=${false}
      .buttons=${[
        { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
        { id: 'delete', label: 'Delete', variant: 'danger', action: 'delete' }
      ]}
      @dialogAction=${(e: CustomEvent) => {
        console.log('Confirmation action:', e.detail);
        if (e.detail.buttonId) {
          (document.getElementById('confirm-dialog') as any)?.hide();
        }
      }}
    >
      <div slot="content">
        <p>Are you sure you want to delete this item?</p>
        <p style="color: #666; font-size: 0.9rem;">This action cannot be undone.</p>
      </div>
    </spectrum-dialog>

    <!-- Form Dialog -->
    <spectrum-dialog
      id="form-dialog"
      dialog-title="Contact Us"
      dialog-id="form"
      size="large"
      .buttons=${[
        { id: 'cancel', label: 'Cancel', variant: 'secondary', action: 'cancel' },
        { id: 'submit', label: 'Send Message', variant: 'primary', action: 'submit' }
      ]}
      @dialogAction=${(e: CustomEvent) => {
        console.log('Form action:', e.detail);
        (document.getElementById('form-dialog') as any)?.hide();
      }}
    >
      <div slot="content">
        <form style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name:</label>
            <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email:</label>
            <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message:</label>
            <textarea rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"></textarea>
          </div>
        </form>
      </div>
    </spectrum-dialog>

    <!-- Fullscreen Dialog -->
    <spectrum-dialog
      id="fullscreen-dialog"
      dialog-title="Gallery View"
      dialog-id="fullscreen"
      size="full"
      background="full-frost"
      .buttons=${[
        { id: 'close', label: 'Close', variant: 'primary', action: 'close' }
      ]}
      @dialogAction=${(e: CustomEvent) => {
        console.log('Fullscreen action:', e.detail);
        (document.getElementById('fullscreen-dialog') as any)?.hide();
      }}
    >
      <div slot="content">
        <div style="text-align: center; padding: 2rem;">
          <h3>Fullscreen Content</h3>
          <p>This dialog takes up most of the viewport and is perfect for image galleries, detailed views, or immersive experiences.</p>
          <div style="
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            height: 300px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            margin: 2rem 0;
          ">
            Placeholder Content
          </div>
        </div>
      </div>
    </spectrum-dialog>
  `
}; 