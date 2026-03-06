import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  description?: string;
}

interface SpectrumSelectArgs {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'base' | 'lg';
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  loading: boolean;
  placeholder: string;
  selectedValue: string;
  selectedValues: string[];
  multiple: boolean;
  selectionsLabel: string;
  showIcon: boolean;
  showDropdownIcon: boolean;
  dropdownIcon: string;
  searchable: boolean;
  searchPlaceholder: string;
  maxHeight: string;
  showSelectAll: boolean;
  selectAllText: string;
  noResultsText: string;
  loadingText: string;
  errorText: string;
  touchOptimized: boolean;
  mobileFullscreen: boolean;
  debug: boolean;
  options: SelectOption[];
}

const basicOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1', description: 'Basic choice without icon' },
  { value: 'option2', label: 'Option 2', description: 'Another simple selection' },
  { value: 'option3', label: 'Option 3', description: 'Third available option' },
  { value: 'option4', label: 'Option 4', disabled: true, description: 'This option is disabled' },
];

const navigationOptions: SelectOption[] = [
  { value: 'home', label: 'Home', icon: 'home', description: 'Navigate to homepage' },
  { value: 'profile', label: 'Profile', icon: 'person', description: 'Manage personal info' },
  { value: 'settings', label: 'Settings', icon: 'settings', description: 'Configure preferences' },
  { value: 'notifications', label: 'Notifications', icon: 'notifications', description: 'Notification settings' },
  { value: 'help', label: 'Help & Support', icon: 'help', description: 'Get assistance' },
  { value: 'logout', label: 'Logout', icon: 'logout', disabled: true, description: 'Sign out' },
];

const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Active', icon: 'check_circle', description: 'Currently operational' },
  { value: 'pending', label: 'Pending', icon: 'schedule', description: 'Awaiting approval' },
  { value: 'inactive', label: 'Inactive', icon: 'cancel', description: 'Temporarily disabled' },
  { value: 'draft', label: 'Draft', icon: 'edit', description: 'Work in progress' },
  { value: 'archived', label: 'Archived', icon: 'archive', description: 'Stored for reference' },
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States', icon: 'flag' },
  { value: 'uk', label: 'United Kingdom', icon: 'flag' },
  { value: 'ca', label: 'Canada', icon: 'flag' },
  { value: 'au', label: 'Australia', icon: 'flag' },
  { value: 'de', label: 'Germany', icon: 'flag' },
  { value: 'fr', label: 'France', icon: 'flag' },
  { value: 'jp', label: 'Japan', icon: 'flag' },
  { value: 'br', label: 'Brazil', icon: 'flag' },
  { value: 'in', label: 'India', icon: 'flag' },
  { value: 'cn', label: 'China', icon: 'flag' },
];

const cityOptions: SelectOption[] = [
  { value: 'ny', label: 'New York', icon: 'location_city', description: 'US — The Big Apple' },
  { value: 'london', label: 'London', icon: 'location_city', description: 'UK — Financial district' },
  { value: 'tokyo', label: 'Tokyo', icon: 'location_city', description: 'Japan — Tech hub' },
  { value: 'paris', label: 'Paris', icon: 'location_city', description: 'France — City of lights' },
  { value: 'sydney', label: 'Sydney', icon: 'location_city', description: 'Australia — Harbor city' },
  { value: 'dubai', label: 'Dubai', icon: 'location_city', description: 'UAE — Modern metropolis' },
  { value: 'singapore', label: 'Singapore', icon: 'location_city', description: 'SG — Garden city' },
  { value: 'toronto', label: 'Toronto', icon: 'location_city', description: 'Canada — Financial center' },
  { value: 'berlin', label: 'Berlin', icon: 'location_city', description: 'Germany — Historic capital' },
  { value: 'mumbai', label: 'Mumbai', icon: 'location_city', description: 'India — Commercial capital' },
  { value: 'shanghai', label: 'Shanghai', icon: 'location_city', description: 'China — Economic hub' },
  { value: 'saopaulo', label: 'São Paulo', icon: 'location_city', description: 'Brazil — Business center' },
  { value: 'melbourne', label: 'Melbourne', icon: 'location_city', description: 'Australia — Cultural hub' },
  { value: 'amsterdam', label: 'Amsterdam', icon: 'location_city', description: 'NL — Canal city' },
  { value: 'barcelona', label: 'Barcelona', icon: 'location_city', description: 'Spain — Mediterranean jewel' },
];

const renderSelect = (args: SpectrumSelectArgs) => html`
  <spectrum-select
    variant=${args.variant}
    size=${args.size}
    .disabled=${args.disabled}
    .required=${args.required}
    .invalid=${args.invalid}
    .loading=${args.loading}
    placeholder=${args.placeholder}
    selected-value=${args.selectedValue}
    .selectedValues=${args.selectedValues}
    .multiple=${args.multiple}
    selections-label=${args.selectionsLabel}
    .showIcon=${args.showIcon}
    .showDropdownIcon=${args.showDropdownIcon}
    dropdown-icon=${args.dropdownIcon}
    .searchable=${args.searchable}
    search-placeholder=${args.searchPlaceholder}
    max-height=${args.maxHeight}
    .showSelectAll=${args.showSelectAll}
    select-all-text=${args.selectAllText}
    no-results-text=${args.noResultsText}
    loading-text=${args.loadingText}
    error-text=${args.errorText}
    .touchOptimized=${args.touchOptimized}
    .mobileFullscreen=${args.mobileFullscreen}
    .debug=${args.debug}
    .options=${args.options}
    @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
    @searchChange=${(e: CustomEvent) => action('searchChange')(e.detail)}
    @dropdownOpen=${() => action('dropdownOpen')()}
    @dropdownClose=${() => action('dropdownClose')()}
  ></spectrum-select>
`;

const meta = {
  title: 'Spectrum/Components/SpectrumSelect',
  component: 'spectrum-select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A comprehensive dropdown selection component with search, multiple selection, loading states, and accessibility.

### Quick Start
\`\`\`html
<spectrum-select
  placeholder="Choose..."
  .options=\${[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]}
></spectrum-select>
\`\`\`

### Event System
- **selectChange**: Selection changed — payload includes \`value\`, \`label\`, \`option\`, and arrays for multi-select
- **searchChange**: Search term updated
- **dropdownOpen / dropdownClose**: Lifecycle events

### Dependencies
Uses **spectrum-button** as trigger for consistent styling.
        `
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'base',
    placeholder: 'Select an option',
    options: basicOptions,
    disabled: false,
    required: false,
    invalid: false,
    loading: false,
    selectedValue: '',
    selectedValues: [],
    multiple: false,
    selectionsLabel: 'items selected',
    showIcon: true,
    showDropdownIcon: true,
    dropdownIcon: 'expand_more',
    searchable: false,
    searchPlaceholder: 'Search options...',
    maxHeight: '200px',
    showSelectAll: false,
    selectAllText: 'Select All',
    noResultsText: 'No results found',
    loadingText: 'Loading...',
    errorText: '',
    touchOptimized: true,
    mobileFullscreen: false,
    debug: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant (passed to the trigger button)',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'base', 'lg'],
      description: 'Size of the trigger button',
      table: { category: 'Appearance', defaultValue: { summary: 'base' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the selected option\'s icon in the trigger',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
    showDropdownIcon: {
      control: 'boolean',
      description: 'Show the dropdown arrow indicator',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
    dropdownIcon: {
      control: 'text',
      description: 'Material icon for the dropdown arrow',
      table: { category: 'Appearance', defaultValue: { summary: 'expand_more' } },
      if: { arg: 'showDropdownIcon' },
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum dropdown height (CSS value)',
      table: { category: 'Appearance', defaultValue: { summary: '200px' } },
    },
    placeholder: {
      control: 'text',
      description: 'Text shown when nothing is selected',
      table: { category: 'Content', defaultValue: { summary: 'Select an option' } },
    },
    options: {
      control: 'object',
      description: 'Array of SelectOption objects',
      table: { category: 'Content' },
    },
    selectionsLabel: {
      control: 'text',
      description: 'Label for selection count in multi-select',
      table: { category: 'Content', defaultValue: { summary: 'items selected' } },
      if: { arg: 'multiple' },
    },
    noResultsText: {
      control: 'text',
      description: 'Message when search returns nothing',
      table: { category: 'Content', defaultValue: { summary: 'No results found' } },
      if: { arg: 'searchable' },
    },
    loadingText: {
      control: 'text',
      description: 'Text shown during loading',
      table: { category: 'Content', defaultValue: { summary: 'Loading...' } },
      if: { arg: 'loading' },
    },
    errorText: {
      control: 'text',
      description: 'Error message below the select',
      table: { category: 'Content', defaultValue: { summary: '' } },
      if: { arg: 'invalid' },
    },
    selectedValue: {
      control: 'text',
      description: 'Currently selected value (single mode)',
      table: { category: 'State', defaultValue: { summary: '' } },
    },
    selectedValues: {
      control: 'object',
      description: 'Selected values array (multi mode)',
      table: { category: 'State', defaultValue: { summary: '[]' } },
      if: { arg: 'multiple' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required for form validation',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Show error styling',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multi-selection with checkboxes',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search/filter within dropdown',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder for the search input',
      table: { category: 'Behavior', defaultValue: { summary: 'Search options...' } },
      if: { arg: 'searchable' },
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Show "Select All" option in multi mode',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
      if: { arg: 'multiple' },
    },
    selectAllText: {
      control: 'text',
      description: 'Label for the Select All option',
      table: { category: 'Behavior', defaultValue: { summary: 'Select All' } },
      if: { arg: 'showSelectAll' },
    },
    touchOptimized: {
      control: 'boolean',
      description: 'Enable larger touch targets for mobile',
      table: { category: 'Mobile', defaultValue: { summary: 'true' } },
    },
    mobileFullscreen: {
      control: 'boolean',
      description: 'Use fullscreen mode on small screens',
      table: { category: 'Mobile', defaultValue: { summary: 'false' } },
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: { category: 'Advanced', defaultValue: { summary: 'false' } },
    },
  },
  render: renderSelect,
} satisfies Meta<SpectrumSelectArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

// =================================================================
// PLAYGROUND
// =================================================================

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: `Fully interactive — use **Controls** to toggle between single/multi select, enable search, change variants and sizes, test loading/error states. All events log to **Actions**.`
      }
    }
  }
};

// =================================================================
// VARIANTS
// =================================================================

export const AllVariants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      ${(['primary', 'secondary', 'outline', 'ghost'] as const).map(v => html`
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <label style="width: 80px; font-weight: 500; font-size: 0.875rem; text-transform: capitalize;">${v}:</label>
          <spectrum-select
            variant=${v}
            .size=${args.size}
            placeholder="${v} variant"
            .options=${navigationOptions}
            @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
          ></spectrum-select>
        </div>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All four variants side-by-side. Adjust **size** in Controls to compare across scales.'
      }
    }
  }
};

// =================================================================
// SIZES
// =================================================================

export const AllSizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      ${(['sm', 'base', 'lg'] as const).map(s => html`
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <label style="width: 60px; font-weight: 500; font-size: 0.875rem;">${s === 'sm' ? 'Small' : s === 'base' ? 'Base' : 'Large'}:</label>
          <spectrum-select
            .variant=${args.variant}
            size=${s}
            placeholder="${s} size"
            .options=${statusOptions}
            @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
          ></spectrum-select>
        </div>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All three sizes. Switch **variant** in Controls to preview different combinations.'
      }
    }
  }
};

// =================================================================
// MULTI-SELECT
// =================================================================

export const MultipleSelection: Story = {
  args: {
    multiple: true,
    searchable: true,
    showSelectAll: true,
    options: countryOptions,
    placeholder: 'Select countries',
    selectionsLabel: 'countries selected',
    selectedValues: ['us', 'uk'],
    maxHeight: '250px',
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select with search, Select All, and pre-selected values. Toggle **showSelectAll** and **searchable** in Controls.'
      }
    }
  }
};

// =================================================================
// SEARCHABLE
// =================================================================

export const SearchableLargeDataset: Story = {
  args: {
    searchable: true,
    options: [...cityOptions, ...Array.from({ length: 30 }, (_, i) => ({
      value: `gen-${i}`,
      label: `Generated Item ${i + 1}`,
      icon: 'star',
      description: `Auto-generated option ${i + 1}`,
    }))],
    placeholder: 'Search from 45 options',
    maxHeight: '300px',
    noResultsText: 'No matches — try different keywords',
  },
  parameters: {
    docs: {
      description: {
        story: 'Searchable single-select with 45 options. Type to filter in real-time.'
      }
    }
  }
};

// =================================================================
// STATES
// =================================================================

export const LoadingState: Story = {
  args: {
    loading: true,
    loadingText: 'Fetching data from server...',
    options: [],
    placeholder: 'Loading options...',
    variant: 'outline',
  },
};

export const ErrorState: Story = {
  args: {
    invalid: true,
    required: true,
    errorText: 'Please select a valid option to continue.',
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    selectedValue: 'option2',
  },
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem;">Loading</label>
        <spectrum-select .loading=${true} loading-text="Fetching..." .options=${[]} variant="outline"
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}></spectrum-select>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem;">Error</label>
        <spectrum-select .invalid=${true} .required=${true} error-text="Selection required" .options=${basicOptions} placeholder="Select..."
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}></spectrum-select>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem;">Disabled</label>
        <spectrum-select .disabled=${true} selected-value="option2" .options=${basicOptions}
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}></spectrum-select>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem;">Required</label>
        <spectrum-select .required=${true} placeholder="Required *" .options=${statusOptions}
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All component states: loading, error, disabled, and required.'
      }
    }
  }
};

// =================================================================
// REAL-WORLD: FORM
// =================================================================

export const FormIntegration: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <h3 style="margin: 0 0 1.5rem;">User Profile</h3>
      <form style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Country *</label>
          <spectrum-select
            placeholder="Select your country"
            .options=${countryOptions}
            .required=${true}
            .searchable=${true}
            search-placeholder="Search countries..."
            @selectChange=${(e: CustomEvent) => action('countrySelection')(e.detail)}
          ></spectrum-select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Preferred Cities</label>
          <spectrum-select
            placeholder="Select cities"
            .options=${cityOptions}
            .multiple=${true}
            .searchable=${true}
            .showSelectAll=${true}
            selections-label="cities"
            search-placeholder="Search cities..."
            max-height="200px"
            @selectChange=${(e: CustomEvent) => action('citiesSelection')(e.detail)}
          ></spectrum-select>
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Account Status</label>
          <spectrum-select
            placeholder="Select status"
            .options=${statusOptions}
            variant="outline"
            selected-value="active"
            @selectChange=${(e: CustomEvent) => action('statusSelection')(e.detail)}
          ></spectrum-select>
        </div>
      </form>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Complete form with required searchable single-select, multi-select with bulk selection, and pre-selected outline variant.'
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY
// =================================================================

export const KeyboardNavigation: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <p style="color: var(--spectrum-sys-color-on-surface-variant); margin: 0 0 1rem; font-size: 0.875rem;">
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Tab</kbd> to focus,
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Enter</kbd> to open,
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Arrow</kbd> keys to navigate,
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Escape</kbd> to close.
      </p>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <spectrum-select
          placeholder="Try keyboard navigation"
          .options=${navigationOptions}
          .searchable=${true}
          @selectChange=${(e: CustomEvent) => action('keyboardSelect')(e.detail)}
          @dropdownOpen=${() => action('dropdownOpen')()}
          @dropdownClose=${() => action('dropdownClose')()}
        ></spectrum-select>
        <spectrum-select
          placeholder="Multi-select (Space to toggle)"
          .options=${statusOptions}
          .multiple=${true}
          @selectChange=${(e: CustomEvent) => action('multiKeyboardSelect')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation: Tab to focus, Enter/Space to open, Arrow keys to move, Enter to select, Escape to close.'
      }
    }
  }
};
