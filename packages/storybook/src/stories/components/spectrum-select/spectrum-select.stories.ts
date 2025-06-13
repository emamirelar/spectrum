import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumSelect, SpectrumSelectOption } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-select/spectrum-select";

interface SpectrumSelectArgs {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'base' | 'lg';
  state: 'default' | 'hover' | 'focus' | 'disabled';
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
  debug: boolean;
  action: string;
  options: SpectrumSelectOption[];
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
  searchTitle: string;
}

// Sample options data - Enhanced with descriptions
const basicOptions: SpectrumSelectOption[] = [
  { value: 'option1', label: 'Option 1', description: 'Basic option without icon' },
  { value: 'option2', label: 'Option 2', description: 'Another simple choice' },
  { value: 'option3', label: 'Option 3', description: 'Third selection available' },
  { value: 'option4', label: 'Option 4', disabled: true, description: 'This option is disabled' },
];

const optionsWithIcons: SpectrumSelectOption[] = [
  { value: 'home', label: 'Home', icon: 'home', description: 'Navigate to homepage' },
  { value: 'settings', label: 'Settings', icon: 'settings', description: 'Configure application preferences' },
  { value: 'profile', label: 'Profile', icon: 'person', description: 'Manage your personal information' },
  { value: 'notifications', label: 'Notifications', icon: 'notifications', description: 'Control notification settings' },
  { value: 'help', label: 'Help & Support', icon: 'help', description: 'Get assistance and documentation' },
  { value: 'logout', label: 'Logout', icon: 'logout', disabled: true, description: 'Sign out of your account' },
];

const countryOptions: SpectrumSelectOption[] = [
  { value: 'us', label: 'United States', icon: 'public', description: 'North America, Washington D.C.' },
  { value: 'uk', label: 'United Kingdom', icon: 'public', description: 'Europe, London' },
  { value: 'ca', label: 'Canada', icon: 'public', description: 'North America, Ottawa' },
  { value: 'au', label: 'Australia', icon: 'public', description: 'Oceania, Canberra' },
  { value: 'de', label: 'Germany', icon: 'public', description: 'Europe, Berlin' },
  { value: 'fr', label: 'France', icon: 'public', description: 'Europe, Paris' },
  { value: 'jp', label: 'Japan', icon: 'public', description: 'Asia, Tokyo' },
  { value: 'br', label: 'Brazil', icon: 'public', description: 'South America, Brasília' },
  { value: 'in', label: 'India', icon: 'public', description: 'Asia, New Delhi' },
  { value: 'cn', label: 'China', icon: 'public', description: 'Asia, Beijing' },
];

const statusOptions: SpectrumSelectOption[] = [
  { value: 'active', label: 'Active', icon: 'check_circle', description: 'Currently operational and available, everything is working as expected' },
  { value: 'pending', label: 'Pending', icon: 'schedule', description: 'Awaiting approval or processing, waiting for a decision' },
  { value: 'inactive', label: 'Inactive', icon: 'cancel', description: 'Temporarily disabled or unavailable, not working as expected' },
  { value: 'draft', label: 'Draft', icon: 'edit', description: 'Work in progress, not yet published, not ready for production' },
  { value: 'archived', label: 'Archived', icon: 'archive', description: 'Stored for reference, not active' },
];

const largeCityOptions: SpectrumSelectOption[] = [
  { value: 'ny', label: 'New York', icon: 'location_city', description: 'United States - The Big Apple' },
  { value: 'london', label: 'London', icon: 'location_city', description: 'United Kingdom - Financial district' },
  { value: 'tokyo', label: 'Tokyo', icon: 'location_city', description: 'Japan - Technology hub' },
  { value: 'paris', label: 'Paris', icon: 'location_city', description: 'France - City of lights' },
  { value: 'sydney', label: 'Sydney', icon: 'location_city', description: 'Australia - Harbor city' },
  { value: 'dubai', label: 'Dubai', icon: 'location_city', description: 'UAE - Modern metropolis' },
  { value: 'singapore', label: 'Singapore', icon: 'location_city', description: 'Singapore - Garden city' },
  { value: 'toronto', label: 'Toronto', icon: 'location_city', description: 'Canada - Financial center' },
  { value: 'berlin', label: 'Berlin', icon: 'location_city', description: 'Germany - Historic capital' },
  { value: 'mumbai', label: 'Mumbai', icon: 'location_city', description: 'India - Commercial capital' },
  { value: 'shanghai', label: 'Shanghai', icon: 'location_city', description: 'China - Economic powerhouse' },
  { value: 'saopaulo', label: 'São Paulo', icon: 'location_city', description: 'Brazil - Business center' },
  { value: 'melbourne', label: 'Melbourne', icon: 'location_city', description: 'Australia - Cultural hub' },
  { value: 'amsterdam', label: 'Amsterdam', icon: 'location_city', description: 'Netherlands - Canal city' },
  { value: 'barcelona', label: 'Barcelona', icon: 'location_city', description: 'Spain - Mediterranean jewel' },
];

const meta = {
  title: 'Components/SpectrumSelect',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
          # Spectrum Select Component
          
          A comprehensive select component with advanced features including search, loading states,
          enhanced animations, mobile optimization, and accessibility improvements.
          Based on the Spectrum design system and Material Design 3 patterns.

          ## Features
          
          - **Single & Multiple Selection**: Choose one or multiple options with visual feedback
          - **Search & Filter**: Built-in search functionality with debounced input
          - **Loading States**: Loading spinner and configurable loading text
          - **Button Integration**: Uses spectrum-button as trigger for consistent styling and behavior
          - **Accessibility**: Full keyboard navigation and screen reader support
          - **Mobile Optimization**: Touch-optimized interactions and mobile fullscreen mode
          - **Error Handling**: Error message display with styled error states

          ## Keyboard Navigation

          The spectrum-select component provides comprehensive keyboard navigation support for accessibility and power user workflows.

          ### Opening the Dropdown

          | Key | Action |
          | --- | ------ |
          | \`Enter\` | Opens the dropdown when focused on the select trigger |
          | \`Space\` | Opens the dropdown when focused on the select trigger |
          | \`Arrow Down\` | Opens the dropdown and focuses the first option |
          | \`Arrow Up\` | Opens the dropdown and focuses the first option |

          ### Navigating Options

          | Key | Action |
          | --- | ------ |
          | \`Arrow Down\` | Move focus to the next option in the list |
          | \`Arrow Up\` | Move focus to the previous option in the list |
          | \`Home\` | Move focus to the first option in the list |
          | \`End\` | Move focus to the last option in the list |

          ### Selecting Options

          | Key | Action |
          | --- | ------ |
          | \`Enter\` | Select the currently focused option (closes dropdown in single-select mode) |
          | \`Space\` | Select the currently focused option (closes dropdown in single-select mode) |

          ### Closing the Dropdown

          | Key | Action |
          | --- | ------ |
          | \`Escape\` | Close the dropdown and return focus to the select trigger |
          | \`Tab\` | Close the dropdown and move focus to the next focusable element |
          | \`Shift + Tab\` | Close the dropdown and move focus to the previous focusable element |

          ### Search Mode Navigation

          When the dropdown is searchable (\`searchable={true}\`), additional keyboard behavior is available:

          | Key | Action |
          | --- | ------ |
          | \`Arrow Down\` | Switch focus from search input to first option (if available) |
          | \`Arrow Up\` | Switch focus from search input to last option (if available) |
          | \`Escape\` | Clear search and close dropdown |
          | \`Enter\` | Select first option if only one result matches the search |

          ### Multi-Select Keyboard Behavior

          In multi-select mode (\`multiple={true}\`), the following additional behaviors apply:

          - \`Enter\` or \`Space\` toggles selection without closing the dropdown
          - Selected options remain visually indicated with checkboxes
          - The dropdown stays open to allow multiple selections
          - Use \`Escape\` to close and complete the multi-selection

          ## Accessibility Features

          - **Screen Reader Support**: All options are properly labeled with ARIA attributes
          - **Focus Management**: Visual focus indicators clearly show the current selection
          - **Keyboard Trapping**: Focus remains within the dropdown when open
          - **Live Regions**: Search results are announced to screen readers
          - **Role Declarations**: Proper ARIA roles for listbox and option elements
          - **Minimal Animation**: Reduced motion support for users with vestibular sensitivities

          ## Integration with spectrum-button

          The select component demonstrates the new pattern of using spectrum-button as an internal trigger:
          - Properties pass through directly: variant, size, disabled
          - Button handles all visual states (hover, focus, active) and animations
          - Parent wrapper becomes transparent container
          - Minimal animation enabled for better accessibility

          ## Best Practices

          1. **Focus Management**: Always ensure the select trigger can receive keyboard focus
          2. **Clear Labeling**: Use descriptive option labels for screen reader users
          3. **Logical Order**: Arrange options in a logical sequence for keyboard navigation
          4. **Search Integration**: Enable search for long option lists to improve keyboard usability
          5. **Error Handling**: Provide clear error messages when validation fails
        `
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'base',
    state: 'default',
    disabled: false,
    required: false,
    invalid: false,
    loading: false,
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
    options: basicOptions,
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
    searchTitle: 'Search',
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
    loading: {
      control: 'boolean',
      description: 'Whether the select is in a loading state',
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
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality within the dropdown',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the dropdown (CSS value)',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Show select all option in multiple mode',
    },
    selectAllText: {
      control: 'text',
      description: 'Text for the select all option',
    },
    noResultsText: {
      control: 'text',
      description: 'Message to show when search returns no results',
    },
    loadingText: {
      control: 'text',
      description: 'Text to show when in loading state',
    },
    errorText: {
      control: 'text',
      description: 'Error message to display below the select',
    },
    touchOptimized: {
      control: 'boolean',
      description: 'Enable touch-optimized interactions',
    },
    mobileFullscreen: {
      control: 'boolean',
      description: 'Use fullscreen mode on mobile devices',
    },
    searchTitle: {
      control: 'text',
      description: 'Title for the search input',
    },
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
    ?loading=${args.loading}
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
    ?searchable=${args.searchable}
    search-title=${args.searchTitle}
    search-placeholder=${args.searchPlaceholder}
    max-height=${args.maxHeight}
    ?show-select-all=${args.showSelectAll}
    select-all-text=${args.selectAllText}
    no-results-text=${args.noResultsText}
    loading-text=${args.loadingText}
    error-text=${args.errorText}
    ?touch-optimized=${args.touchOptimized}
    ?mobile-fullscreen=${args.mobileFullscreen}
    @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
    @searchChange=${(e: CustomEvent) => action('searchChange')(e.detail)}
    @dropdownOpen=${() => action('dropdownOpen')()}
    @dropdownClose=${() => action('dropdownClose')()}
  ></spectrum-select>
`;

export const Default: StoryObj<SpectrumSelectArgs> = {
  render: renderSelect
};

// Basic Examples
export const BasicOptions: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Choose an option',
    options: basicOptions
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'A basic select with simple text options and descriptions.',
      },
    },
  },
};

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
        story: 'Select with Material Design icons and helpful descriptions.',
      },
    },
  },
};

// Multiple Selection Examples
export const MultipleSelection: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Select countries',
    options: countryOptions,
    multiple: true,
    selectionsLabel: 'countries selected',
    selectedValues: ['us', 'uk']
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection mode with checkboxes and count badge.',
      },
    },
  },
};

export const MultipleWithSelectAll: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Select statuses',
    options: statusOptions,
    multiple: true,
    selectionsLabel: 'statuses',
    showSelectAll: true,
    selectAllText: 'Select All Statuses'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection with Select All functionality.',
      },
    },
  },
};

// Advanced Features
export const SearchableSelect: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Search and select cities',
    options: largeCityOptions,
    searchable: true,
    searchTitle: 'Find Cities',
    searchPlaceholder: 'Type to search cities...',
    maxHeight: '300px'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Searchable select with large dataset and filtering functionality.',
      },
    },
  },
};

export const SearchableMultiple: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Search and select multiple cities',
    options: largeCityOptions,
    multiple: true,
    searchable: true,
    searchTitle: 'Select Multiple Cities',
    searchPlaceholder: 'Search cities...',
    showSelectAll: true,
    selectionsLabel: 'cities selected',
    maxHeight: '250px',
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Searchable multiple selection with bulk select options.',
      },
    },
  },
};

// Loading and Error States
export const LoadingState: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Loading options...',
    options: [],
    loading: true,
    loadingText: 'Fetching data...',
    variant: 'outline'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Select in loading state with spinner and custom loading text.',
      },
    },
  },
};

export const ErrorState: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Select an option',
    options: basicOptions,
    invalid: true,
    errorText: 'Please select a valid option to continue.',
    required: true
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Select with error state and error message display.',
      },
    },
  },
};

// Size Variations
export const SizeVariations: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 80px; font-weight: 500;">Small:</label>
        <spectrum-select
          size="sm"
          placeholder="Small select"
          .options=${optionsWithIcons}
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 80px; font-weight: 500;">Base:</label>
        <spectrum-select
          size="base"
          placeholder="Base select"
          .options=${optionsWithIcons}
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 80px; font-weight: 500;">Large:</label>
        <spectrum-select
          size="lg"
          placeholder="Large select"
          .options=${optionsWithIcons}
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different size variations: small, base, and large.',
      },
    },
  },
};

// Variant Styles
export const VariantStyles: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Primary:</label>
        <spectrum-select
          variant="primary"
          placeholder="Primary variant"
          .options=${statusOptions}
          touch-optimized
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Secondary:</label>
        <spectrum-select
          variant="secondary"
          placeholder="Secondary variant"
          .options=${statusOptions}
          touch-optimized
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Outline:</label>
        <spectrum-select
          variant="outline"
          placeholder="Outline variant"
          .options=${statusOptions}
          touch-optimized
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Ghost:</label>
        <spectrum-select
          variant="ghost"
          placeholder="Ghost variant"
          .options=${statusOptions}
          touch-optimized
          @selectChange=${(e: CustomEvent) => action('selectChange')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different visual style variants with enhanced ripple effects.',
      },
    },
  },
};

// Mobile Optimization
export const MobileOptimized: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Mobile-optimized select',
    options: largeCityOptions,
    searchable: true,
    touchOptimized: true,
    mobileFullscreen: true,
    maxHeight: '300px',
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized select with touch interactions and fullscreen mode on small screens.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
};

// Form Integration
export const FormIntegration: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Country *</label>
        <spectrum-select
          placeholder="Select your country"
          .options=${countryOptions}
          required
          searchable
          @selectChange=${(e: CustomEvent) => action('countryChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Preferred Cities</label>
        <spectrum-select
          placeholder="Select preferred cities"
          .options=${largeCityOptions}
          multiple
          searchable
          show-select-all
          selections-label="cities"
          max-height="200px"
          @selectChange=${(e: CustomEvent) => action('citiesChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Status</label>
        <spectrum-select
          placeholder="Select status"
          .options=${statusOptions}
          variant="outline"
          @selectChange=${(e: CustomEvent) => action('statusChange')(e.detail)}
        ></spectrum-select>
      </div>
      <button type="submit" style="padding: 12px 24px; border: none; background: #0070d2; color: white; border-radius: 8px; cursor: pointer;">
        Submit Form
      </button>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Complete form integration example with various select configurations.',
      },
    },
  },
};

// Accessibility & Keyboard Navigation
export const KeyboardNavigation: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Try keyboard navigation',
    options: largeCityOptions,
    searchable: true,
    debug: false
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation: Tab to focus, Enter/Space to open, Arrow keys to navigate, Enter to select, Escape to close.',
      },
    },
  },
};

// Performance Test
export const LargeDataset: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Search from large dataset',
    options: [
      ...largeCityOptions,
      ...Array.from({ length: 50 }, (_, i) => ({
        value: `city-${i}`,
        label: `Test City ${i + 1}`,
        icon: 'location_city',
        description: `Generated test city number ${i + 1}`
      }))
    ],
    searchable: true,
    multiple: true,
    showSelectAll: true,
    maxHeight: '250px',
    selectionsLabel: 'locations'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Performance test with large dataset, search functionality, and multiple selection.',
      },
    },
  },
};

// Disabled State
export const DisabledState: StoryObj<SpectrumSelectArgs> = {
  args: {
    placeholder: 'Disabled select',
    options: basicOptions,
    disabled: true,
    selectedValue: 'option2'
  },
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: 'Select in disabled state with proper styling and cursor.',
      },
    },
  },
}; 