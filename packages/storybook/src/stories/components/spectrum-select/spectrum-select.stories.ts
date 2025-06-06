import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumSelect, SpectrumSelectOption } from "@stencil-storybook-boilerplate/core/src/components/spectrum-select/spectrum-select";

interface SpectrumSelectArgs {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'base' | 'lg';
  state: 'default' | 'hover' | 'focus' | 'disabled';
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  placeholder: string;
  selectedValue: string;
  selectedValues: string[];
  multiple: boolean;
  selectionsLabel: string;
  showIcon: boolean;
  showDropdownIcon: boolean;
  dropdownIcon: string;
  debug: boolean;
  action: string;
  options: SpectrumSelectOption[];
}

// Sample options data
const basicOptions: SpectrumSelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
];

const optionsWithIcons: SpectrumSelectOption[] = [
  { value: 'home', label: 'Home', icon: 'home' },
  { value: 'settings', label: 'Settings', icon: 'settings' },
  { value: 'profile', label: 'Profile', icon: 'person' },
  { value: 'notifications', label: 'Notifications', icon: 'notifications' },
  { value: 'help', label: 'Help & Support', icon: 'help' },
  { value: 'logout', label: 'Logout', icon: 'logout', disabled: true },
];

const countryOptions: SpectrumSelectOption[] = [
  { value: 'us', label: 'United States', icon: 'public' },
  { value: 'uk', label: 'United Kingdom', icon: 'public' },
  { value: 'ca', label: 'Canada', icon: 'public' },
  { value: 'au', label: 'Australia', icon: 'public' },
  { value: 'de', label: 'Germany', icon: 'public' },
  { value: 'fr', label: 'France', icon: 'public' },
  { value: 'jp', label: 'Japan', icon: 'public' },
];

const statusOptions: SpectrumSelectOption[] = [
  { value: 'active', label: 'Active', icon: 'check_circle' },
  { value: 'pending', label: 'Pending', icon: 'schedule' },
  { value: 'inactive', label: 'Inactive', icon: 'cancel' },
  { value: 'draft', label: 'Draft', icon: 'edit' },
];

const meta = {
  title: 'Components/SpectrumSelect',
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'base',
    state: 'default',
    disabled: false,
    required: false,
    invalid: false,
    placeholder: 'Select an option',
    selectedValue: '',
    selectedValues: [],
    multiple: false,
    selectionsLabel: '',
    showIcon: true,
    showDropdownIcon: true,
    dropdownIcon: 'expand_more',
    debug: false,
    action: 'custom',
    options: basicOptions
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style variant of the select',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The size of the select component',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'disabled'],
      description: 'The current state of the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the select is in an invalid state',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text when no option is selected',
    },
    selectedValue: {
      control: 'text',
      description: 'The currently selected value',
    },
    selectedValues: {
      control: 'object',
      description: 'The currently selected values',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether the select allows multiple selections',
    },
    selectionsLabel: {
      control: 'text',
      description: 'The label for selected values',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the leading icon from selected option',
    },
    showDropdownIcon: {
      control: 'boolean',
      description: 'Whether to show the dropdown arrow icon',
    },
    dropdownIcon: {
      control: 'text',
      description: 'The icon to use for the dropdown arrow',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to show component boundaries',
    },
    action: {
      control: 'text',
      description: 'Optional action to emit with the selection change',
    },
    options: {
      control: 'object',
      description: 'Array of options to display in the select',
    }
  }
} satisfies Meta<SpectrumSelect>;

export default meta;

const renderSelect = (args: SpectrumSelectArgs) => html`
  <spectrum-select
    variant=${args.variant}
    size=${args.size}
    state=${args.state}
    ?disabled=${args.disabled}
    ?required=${args.required}
    ?invalid=${args.invalid}
    placeholder=${args.placeholder}
    selected-value=${args.selectedValue}
    selected-values=${args.selectedValues}
    ?multiple=${args.multiple}
    selections-label=${args.selectionsLabel}
    ?show-icon=${args.showIcon}
    ?show-dropdown-icon=${args.showDropdownIcon}
    dropdown-icon=${args.dropdownIcon}
    ?debug=${args.debug}
    action=${args.action}
    .options=${args.options}
    @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
  ></spectrum-select>
`;

export const Default: StoryObj<SpectrumSelectArgs> = {
  render: renderSelect
};

// Basic Options
export const BasicOptions: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Choose an option',
    options: basicOptions
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'A basic select with simple text options.',
      },
    },
  },
};

// With Icons
export const WithIcons: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Select a page',
    options: optionsWithIcons,
    selectedValue: 'home'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Select options with icons that appear both in the dropdown and in the selected state.',
      },
    },
  },
};

// Country Selector
export const CountrySelector: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Select your country',
    options: countryOptions,
    variant: 'outline'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Example of a country selector with consistent icons.',
      },
    },
  },
};

// Status Selector
export const StatusSelector: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Select status',
    options: statusOptions,
    selectedValue: 'active',
    variant: 'secondary'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Status selector with meaningful icons for each state.',
      },
    },
  },
};

// Size Variations
export const SizeVariations: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <spectrum-select
        size="sm"
        placeholder="Small select"
        .options=${basicOptions}
        @selectChange=${(e: CustomEvent) => action('selectChange-sm')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        size="base"
        placeholder="Base select"
        .options=${basicOptions}
        @selectChange=${(e: CustomEvent) => action('selectChange-base')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        size="lg"
        placeholder="Large select"
        .options=${basicOptions}
        @selectChange=${(e: CustomEvent) => action('selectChange-lg')(e.detail)}
      ></spectrum-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the select component.',
      },
    },
  },
};

// Variant Showcase
export const VariantShowcase: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <spectrum-select
        variant="primary"
        placeholder="Primary variant"
        .options=${optionsWithIcons}
        @selectChange=${(e: CustomEvent) => action('selectChange-primary')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        variant="secondary"
        placeholder="Secondary variant"
        .options=${optionsWithIcons}
        @selectChange=${(e: CustomEvent) => action('selectChange-secondary')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        variant="outline"
        placeholder="Outline variant"
        .options=${optionsWithIcons}
        @selectChange=${(e: CustomEvent) => action('selectChange-outline')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        variant="ghost"
        placeholder="Ghost variant"
        .options=${optionsWithIcons}
        @selectChange=${(e: CustomEvent) => action('selectChange-ghost')(e.detail)}
      ></spectrum-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available visual variants of the select component.',
      },
    },
  },
};

// States
export const States: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <spectrum-select
        placeholder="Default state"
        .options=${basicOptions}
        @selectChange=${(e: CustomEvent) => action('selectChange-default')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        placeholder="Disabled state"
        .options=${basicOptions}
        disabled
      ></spectrum-select>
      
      <spectrum-select
        placeholder="Invalid state"
        .options=${basicOptions}
        invalid
        @selectChange=${(e: CustomEvent) => action('selectChange-invalid')(e.detail)}
      ></spectrum-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different states of the select component including disabled and invalid.',
      },
    },
  },
};

// Without Icons
export const WithoutIcons: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Select without icons',
    options: basicOptions,
    showIcon: false
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Select component with icons disabled, showing only text.',
      },
    },
  },
};

// Custom Dropdown Icon
export const CustomDropdownIcon: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Custom dropdown icon',
    options: optionsWithIcons,
    dropdownIcon: 'keyboard_arrow_down'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Select with a custom dropdown arrow icon.',
      },
    },
  },
};

// Required Field
export const RequiredField: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Required field *',
    options: basicOptions,
    required: true,
    invalid: false
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Select marked as required for form validation.',
      },
    },
  },
};

// =============== MULTISELECT STORIES ===============

// Basic Multiselect
export const BasicMultiselect: StoryObj<SpectrumSelectArgs> = {
  args: {
    multiple: true,
    placeholder: 'Select multiple options',
    selectionsLabel: 'options',
    options: basicOptions,
    selectedValues: ['option1', 'option3']
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Basic multiselect showing count and selections label.',
      },
    },
  },
};

// Multiselect with Icons
export const MultiselectWithIcons: StoryObj<SpectrumSelectArgs> = {
  args: {
    multiple: true,
    placeholder: 'Select navigation pages',
    selectionsLabel: 'pages',
    options: optionsWithIcons,
    selectedValues: ['home', 'settings'],
    variant: 'outline'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Multiselect with icons showing checkboxes in dropdown.',
      },
    },
  },
};

// Country Multiselect
export const CountryMultiselect: StoryObj<SpectrumSelectArgs> = {
  args: {
    multiple: true,
    placeholder: 'Select countries',
    selectionsLabel: 'countries',
    options: countryOptions,
    selectedValues: ['us', 'uk', 'ca'],
    variant: 'secondary'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Country selector in multiselect mode with custom selections label.',
      },
    },
  },
};

// Skills Multiselect
const skillsOptions: SpectrumSelectOption[] = [
  { value: 'javascript', label: 'JavaScript', icon: 'code' },
  { value: 'typescript', label: 'TypeScript', icon: 'code' },
  { value: 'react', label: 'React', icon: 'web' },
  { value: 'vue', label: 'Vue.js', icon: 'web' },
  { value: 'angular', label: 'Angular', icon: 'web' },
  { value: 'nodejs', label: 'Node.js', icon: 'storage' },
  { value: 'python', label: 'Python', icon: 'code' },
  { value: 'design', label: 'UI/UX Design', icon: 'palette' },
];

export const SkillsMultiselect: StoryObj<SpectrumSelectArgs> = {
  args: {
    multiple: true,
    placeholder: 'Select your skills',
    selectionsLabel: 'skills',
    options: skillsOptions,
    selectedValues: ['javascript', 'react', 'nodejs'],
    variant: 'primary'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Skills selector showing how count badge replaces the leading icon.',
      },
    },
  },
};

// Multiselect Size Variations
export const MultiselectSizeVariations: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <spectrum-select
        size="sm"
        multiple
        placeholder="Small multiselect"
        selections-label="items"
        .selectedValues=${['option1', 'option2']}
        .options=${basicOptions}
        @selectChange=${(e: CustomEvent) => action('multiselect-sm')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        size="base"
        multiple
        placeholder="Base multiselect"
        selections-label="items"
        .selectedValues=${['option1', 'option2', 'option3']}
        .options=${basicOptions}
        @selectChange=${(e: CustomEvent) => action('multiselect-base')(e.detail)}
      ></spectrum-select>
      
      <spectrum-select
        size="lg"
        multiple
        placeholder="Large multiselect"
        selections-label="items"
        .selectedValues=${['option1']}
        .options=${basicOptions}
        @selectChange=${(e: CustomEvent) => action('multiselect-lg')(e.detail)}
      ></spectrum-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the multiselect component showing count badges.',
      },
    },
  },
};

// Multiselect vs Single Comparison
export const MultiselectVsSingle: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Single Selection</h4>
        <spectrum-select
          placeholder="Select one country"
          .options=${countryOptions}
          selected-value="us"
          @selectChange=${(e: CustomEvent) => action('single-select')(e.detail)}
        ></spectrum-select>
      </div>
      
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Multiple Selection</h4>
        <spectrum-select
          multiple
          placeholder="Select multiple countries"
          selections-label="countries"
          .selectedValues=${['us', 'uk', 'ca']}
          .options=${countryOptions}
          @selectChange=${(e: CustomEvent) => action('multi-select')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of single vs multiple selection modes.',
      },
    },
  },
}; 