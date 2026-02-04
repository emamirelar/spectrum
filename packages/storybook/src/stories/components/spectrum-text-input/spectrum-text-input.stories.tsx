import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Theme wrapper decorator
const withTheme = (story: () => unknown) => html`
  <spectrum-theme color="#0070d2">
    <div style="background: var(--spectrum-color-background); min-height: 100vh; padding: 2rem;">
      ${story()}
    </div>
  </spectrum-theme>
`;

const meta: Meta = {
  title: 'Spectrum/Components/SpectrumTextInput',
  component: 'spectrum-text-input',
  decorators: [withTheme],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A versatile text input component supporting various input types, validation states, and Spectrum theming.

## Features
- Multiple input types (text, number, email, password, date, etc.)
- Label and helper text support
- Error state with message
- Leading and trailing icons
- Clearable option
- Size variants (small, medium, large)
- Full keyboard accessibility
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'tel', 'url', 'search', 'date', 'time'],
      description: 'Input type',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default text input with label.
 */
export const Default: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <spectrum-text-input
        label="Full Name"
        placeholder="Enter your name"
        helper-text="Your full legal name"
      ></spectrum-text-input>
    </div>
  `,
};

/**
 * Different input types.
 */
export const InputTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <spectrum-text-input
        type="text"
        label="Text"
        placeholder="Enter text"
      ></spectrum-text-input>
      
      <spectrum-text-input
        type="email"
        label="Email"
        placeholder="user@example.com"
        leading-icon="mail"
      ></spectrum-text-input>
      
      <spectrum-text-input
        type="password"
        label="Password"
        placeholder="Enter password"
        leading-icon="lock"
      ></spectrum-text-input>
      
      <spectrum-text-input
        type="number"
        label="Number"
        placeholder="Enter number"
        min="0"
        max="100"
      ></spectrum-text-input>
      
      <spectrum-text-input
        type="date"
        label="Date"
      ></spectrum-text-input>
      
      <spectrum-text-input
        type="search"
        label="Search"
        placeholder="Search..."
        leading-icon="search"
        clearable
      ></spectrum-text-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Various input types supported by the component.',
      },
    },
  },
};

/**
 * Size variants.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <spectrum-text-input
        size="small"
        label="Small"
        placeholder="Small input"
      ></spectrum-text-input>
      
      <spectrum-text-input
        size="medium"
        label="Medium (Default)"
        placeholder="Medium input"
      ></spectrum-text-input>
      
      <spectrum-text-input
        size="large"
        label="Large"
        placeholder="Large input"
      ></spectrum-text-input>
    </div>
  `,
};

/**
 * With icons.
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <spectrum-text-input
        label="Leading Icon"
        placeholder="Search..."
        leading-icon="search"
      ></spectrum-text-input>
      
      <spectrum-text-input
        label="Trailing Icon"
        placeholder="Enter amount"
        trailing-icon="attach_money"
      ></spectrum-text-input>
      
      <spectrum-text-input
        label="Both Icons"
        placeholder="Enter email"
        leading-icon="mail"
        trailing-icon="check_circle"
      ></spectrum-text-input>
    </div>
  `,
};

/**
 * Clearable input.
 */
export const Clearable: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <spectrum-text-input
        label="Search"
        placeholder="Type to search..."
        value="Some text to clear"
        clearable
        leading-icon="search"
      ></spectrum-text-input>
      <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--spectrum-color-on-surface-variant);">
        The clear button appears when there's a value.
      </p>
    </div>
  `,
};

/**
 * Validation states.
 */
export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <spectrum-text-input
        label="Required Field"
        placeholder="This field is required"
        required
        helper-text="This field must be filled"
      ></spectrum-text-input>
      
      <spectrum-text-input
        label="With Error"
        placeholder="Enter valid email"
        value="invalid-email"
        error-message="Please enter a valid email address"
        type="email"
      ></spectrum-text-input>
      
      <spectrum-text-input
        label="With Helper Text"
        placeholder="Enter password"
        type="password"
        helper-text="Minimum 8 characters with one number"
      ></spectrum-text-input>
    </div>
  `,
};

/**
 * Disabled and readonly states.
 */
export const DisabledAndReadonly: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <spectrum-text-input
        label="Disabled"
        value="Cannot edit this"
        disabled
      ></spectrum-text-input>
      
      <spectrum-text-input
        label="Readonly"
        value="Read only value"
        readonly
      ></spectrum-text-input>
    </div>
  `,
};

/**
 * Number input with constraints.
 */
export const NumberWithConstraints: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <spectrum-text-input
        type="number"
        label="Quantity"
        value="5"
        min="1"
        max="10"
        step="1"
        helper-text="Enter a value between 1 and 10"
      ></spectrum-text-input>
    </div>
  `,
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter value...',
    type: 'text',
    size: 'medium',
    disabled: false,
    required: false,
    clearable: false,
    helperText: 'This is helper text',
    leadingIcon: '',
    trailingIcon: '',
  },
  render: (args) => html`
    <div style="max-width: 400px;">
      <spectrum-text-input
        label=${args.label}
        placeholder=${args.placeholder}
        type=${args.type}
        size=${args.size}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?clearable=${args.clearable}
        helper-text=${args.helperText || ''}
        leading-icon=${args.leadingIcon || ''}
        trailing-icon=${args.trailingIcon || ''}
      ></spectrum-text-input>
    </div>
  `,
};


