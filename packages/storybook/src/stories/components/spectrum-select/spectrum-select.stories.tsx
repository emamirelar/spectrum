import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

// Define local interfaces for better type safety
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

// Sample data sets for different use cases
const basicOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1', description: 'Basic choice without icon' },
  { value: 'option2', label: 'Option 2', description: 'Another simple selection' },
  { value: 'option3', label: 'Option 3', description: 'Third available option' },
  { value: 'option4', label: 'Option 4', disabled: true, description: 'This option is disabled' },
];

const navigationOptions: SelectOption[] = [
  { value: 'home', label: 'Home', icon: 'home', description: 'Navigate to homepage' },
  { value: 'profile', label: 'Profile', icon: 'person', description: 'Manage personal information' },
  { value: 'settings', label: 'Settings', icon: 'settings', description: 'Configure application preferences' },
  { value: 'notifications', label: 'Notifications', icon: 'notifications', description: 'Control notification settings' },
  { value: 'help', label: 'Help & Support', icon: 'help', description: 'Get assistance and documentation' },
  { value: 'logout', label: 'Logout', icon: 'logout', disabled: true, description: 'Sign out of account' },
];

const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Active', icon: 'check_circle', description: 'Currently operational and available' },
  { value: 'pending', label: 'Pending', icon: 'schedule', description: 'Awaiting approval or processing' },
  { value: 'inactive', label: 'Inactive', icon: 'cancel', description: 'Temporarily disabled or unavailable' },
  { value: 'draft', label: 'Draft', icon: 'edit', description: 'Work in progress, not yet published' },
  { value: 'archived', label: 'Archived', icon: 'archive', description: 'Stored for reference, not active' },
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States', icon: 'flag', description: 'North America, Washington D.C.' },
  { value: 'uk', label: 'United Kingdom', icon: 'flag', description: 'Europe, London' },
  { value: 'ca', label: 'Canada', icon: 'flag', description: 'North America, Ottawa' },
  { value: 'au', label: 'Australia', icon: 'flag', description: 'Oceania, Canberra' },
  { value: 'de', label: 'Germany', icon: 'flag', description: 'Europe, Berlin' },
  { value: 'fr', label: 'France', icon: 'flag', description: 'Europe, Paris' },
  { value: 'jp', label: 'Japan', icon: 'flag', description: 'Asia, Tokyo' },
  { value: 'br', label: 'Brazil', icon: 'flag', description: 'South America, Brasília' },
  { value: 'in', label: 'India', icon: 'flag', description: 'Asia, New Delhi' },
  { value: 'cn', label: 'China', icon: 'flag', description: 'Asia, Beijing' },
];

const cityOptions: SelectOption[] = [
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
  title: 'Spectrum/Components/SpectrumSelect',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Select Component

A comprehensive dropdown selection component with advanced features including search functionality, multiple selection, loading states, and accessibility support. Built on Spectrum design system principles with Material Design 3 integration.

## Key Features

### **Selection Modes**
- **Single Selection**: Choose one option from the dropdown list
- **Multiple Selection**: Select multiple options with visual checkboxes and count badges
- **Select All**: Bulk selection functionality for multiple mode
- **Searchable**: Built-in search and filtering for large datasets

### **Enhanced User Experience**
- **Material Design Icons**: Visual indicators for better option recognition
- **Descriptions**: Optional detailed descriptions for each option
- **Loading States**: Spinner and configurable loading messages
- **Error Handling**: Error state display with validation messages
- **Mobile Optimization**: Touch-friendly interactions and fullscreen mode

### **Integration with spectrum-button**
- Uses spectrum-button as internal trigger for consistent styling
- Properties pass through directly: variant, size, disabled
- Button handles all visual states and animations
- Maintains design system consistency

## Usage Guidelines

### **When to Use**
- Form inputs requiring selection from predefined options
- Navigation menus with multiple choices
- Filtering interfaces with status or category selection
- Multi-select scenarios like tag selection or preferences
- Large datasets requiring search functionality

### **Selection Best Practices**
- Use single selection for mutually exclusive choices
- Enable search for lists with more than 7-10 options
- Provide clear option labels and helpful descriptions
- Group related options logically
- Use icons to improve visual scanning

### **Accessibility Considerations**
- All options are keyboard navigable (Arrow keys, Enter, Escape)
- Screen reader support with proper ARIA attributes
- Focus management and visual indicators
- Reduced motion support for sensitive users

## Event System

### **Selection Events**
- **selectChange**: Emitted when selection changes with full option details
- **searchChange**: Fires during search input for real-time filtering
- **dropdownOpen/Close**: Lifecycle events for dropdown state changes

### **Event Payload Structure**
Each selectChange event includes:
- **value**: Selected option value(s)
- **label**: Human-readable label
- **option**: Complete option object
- **selectedValues**: Array of all selected values (multiple mode)
- **selectedOptions**: Array of all selected option objects (multiple mode)

## Data Structure

### **SelectOption Interface**
Each option should include:
- **value** (required): Unique identifier for the option
- **label** (required): Display text for the option  
- **icon** (optional): Material Design icon name
- **description** (optional): Additional context or help text
- **disabled** (optional): Whether the option can be selected

## Performance Features

### **Efficient Rendering**
- Virtual scrolling for large datasets (when enabled)
- Debounced search to reduce filtering overhead  
- Smart option filtering and highlighting
- Optimized re-rendering for selection changes

### **Mobile Responsiveness**
- Touch-optimized hit areas and interactions
- Fullscreen mode on smaller devices
- Responsive dropdown positioning
- Gesture-friendly scrolling

## Integration Patterns

### **Form Integration**
Perfect for form controls requiring validation, required field handling, and error state display.

### **Filter Components**
Ideal for search interfaces, data tables, and content filtering where users need to select criteria.

### **Navigation Menus**
Suitable for user preferences, settings panels, and contextual navigation options.

        `
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'base',
    disabled: false,
    required: false,
    invalid: false,
    loading: false,
    placeholder: 'Select an option',
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
    options: basicOptions,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant of the select component',
    },
    size: {
      control: 'select', 
      options: ['sm', 'base', 'lg'],
      description: 'Size variant affecting padding and font size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled and non-interactive',
    },
    required: {
      control: 'boolean',
      description: 'Whether selection is required for form validation',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the select is in an error state',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading spinner and disable interaction',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown when no option is selected',
    },
    selectedValue: {
      control: 'text',
      description: 'Currently selected value (single selection mode)',
    },
    selectedValues: {
      control: 'object',
      description: 'Array of selected values (multiple selection mode)',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection with checkboxes',
    },
    selectionsLabel: {
      control: 'text',
      description: 'Label for the selection count in multiple mode',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the icon from selected option',
    },
    showDropdownIcon: {
      control: 'boolean',
      description: 'Whether to show the dropdown arrow indicator',
    },
    dropdownIcon: {
      control: 'text',
      description: 'Material Design icon for the dropdown arrow',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality within dropdown',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input field',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the dropdown (CSS value)',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Show select all option in multiple selection mode',
    },
    selectAllText: {
      control: 'text',
      description: 'Text label for the select all option',
    },
    noResultsText: {
      control: 'text',
      description: 'Message displayed when search returns no results',
    },
    loadingText: {
      control: 'text',
      description: 'Text displayed during loading state',
    },
    errorText: {
      control: 'text',
      description: 'Error message displayed below the select',
    },
    touchOptimized: {
      control: 'boolean',
      description: 'Enable touch-friendly interactions and sizing',
    },
    mobileFullscreen: {
      control: 'boolean',
      description: 'Use fullscreen mode on mobile devices',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to show component boundaries',
    },
    options: {
      control: 'object',
      description: 'Array of SelectOption objects for the dropdown',
    },
  }
} satisfies Meta;

export default meta;

// Helper function to render the select component
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

// Main playground story
export const Playground: StoryObj<SpectrumSelectArgs> = {
  render: renderSelect,
  parameters: {
    docs: {
      description: {
        story: `
Interactive playground for testing all spectrum-select features and configurations.

**Try These Interactions:**
- Toggle between single and multiple selection modes
- Enable search functionality for large option lists  
- Test different variants and sizes
- Experiment with loading and error states
- Adjust mobile optimization settings

**Event Monitoring:**
All user interactions emit events that are logged in the Actions panel below.
        `
      }
    }
  }
};

// Variant demonstrations
export const Variants: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Primary:</label>
        <spectrum-select
          variant="primary"
          placeholder="Primary variant"
          .options=${navigationOptions}
          @selectChange=${(e: CustomEvent) => action('primaryChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Secondary:</label>
        <spectrum-select
          variant="secondary"
          placeholder="Secondary variant"
          .options=${navigationOptions}
          @selectChange=${(e: CustomEvent) => action('secondaryChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Outline:</label>
        <spectrum-select
          variant="outline"
          placeholder="Outline variant"
          .options=${navigationOptions}
          @selectChange=${(e: CustomEvent) => action('outlineChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 100px; font-weight: 500;">Ghost:</label>
        <spectrum-select
          variant="ghost"
          placeholder="Ghost variant"
          .options=${navigationOptions}
          @selectChange=${(e: CustomEvent) => action('ghostChange')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different visual style variants demonstrating the spectrum-button integration.

**Variant Characteristics:**
- **Primary**: Solid background with high contrast for main actions
- **Secondary**: Reduced prominence for supporting actions  
- **Outline**: Border-only style for subtle selections
- **Ghost**: Minimal styling that blends with background

Each variant inherits hover, focus, and active states from the underlying spectrum-button component.
        `
      }
    }
  },
};

// Size variations
export const Sizes: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 80px; font-weight: 500;">Small:</label>
        <spectrum-select
          size="sm"
          placeholder="Small select"
          .options=${statusOptions}
          @selectChange=${(e: CustomEvent) => action('smallChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 80px; font-weight: 500;">Base:</label>
        <spectrum-select
          size="base"
          placeholder="Base select"
          .options=${statusOptions}
          @selectChange=${(e: CustomEvent) => action('baseChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <label style="width: 80px; font-weight: 500;">Large:</label>
        <spectrum-select
          size="lg"
          placeholder="Large select"
          .options=${statusOptions}
          @selectChange=${(e: CustomEvent) => action('largeChange')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Size variations demonstrating different scale options for various UI contexts.

**Size Guidelines:**
- **Small (sm)**: Compact interfaces, toolbars, dense layouts
- **Base**: Standard forms, general purpose selections  
- **Large (lg)**: Touch interfaces, accessibility needs, emphasis

All sizes maintain proper proportions for icons, text, and interactive areas.
        `
      }
    }
  },
};

// Multiple selection examples
export const MultipleSelection: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0;">Basic Multiple Selection</h4>
        <spectrum-select
          placeholder="Select countries"
          .options=${countryOptions}
          .multiple=${true}
          selections-label="countries selected"
          .selectedValues=${['us', 'uk']}
          @selectChange=${(e: CustomEvent) => action('countriesChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0;">With Select All</h4>
        <spectrum-select
          placeholder="Select statuses"
          .options=${statusOptions}
          .multiple=${true}
          selections-label="statuses"
          .showSelectAll=${true}
          select-all-text="Select All Statuses"
          @selectChange=${(e: CustomEvent) => action('statusesChange')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0;">Searchable Multiple</h4>
        <spectrum-select
          placeholder="Search and select cities"
          .options=${cityOptions}
          .multiple=${true}
          .searchable=${true}
          .showSelectAll=${true}
          selections-label="cities selected"
          search-placeholder="Type to filter cities..."
          max-height="250px"
          @selectChange=${(e: CustomEvent) => action('citiesChange')(e.detail)}
          @searchChange=${(e: CustomEvent) => action('citySearch')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Multiple selection modes with checkboxes, count badges, and bulk selection features.

**Multiple Selection Features:**
- **Checkbox Indicators**: Visual selection state for each option
- **Count Badges**: Shows number of selected items in trigger button
- **Select All**: Bulk selection/deselection functionality
- **Search Integration**: Filter large lists while maintaining selections
- **Persistent Dropdown**: Stays open for continuous selection

**User Experience Benefits:**
- Clear visual feedback for selected states
- Efficient bulk operations for large datasets
- Maintains selection context during search
- Descriptive selection summaries
        `
      }
    }
  },
};

// Search functionality
export const SearchableSelects: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0;">Single Selection with Search</h4>
        <spectrum-select
          placeholder="Search cities"
          .options=${cityOptions}
          .searchable=${true}
          search-placeholder="Type to filter cities..."
          max-height="200px"
          @selectChange=${(e: CustomEvent) => action('citySelect')(e.detail)}
          @searchChange=${(e: CustomEvent) => action('citySearch')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0;">Multiple Selection with Search</h4>
        <spectrum-select
          placeholder="Select navigation items"
          .options=${navigationOptions}
          .multiple=${true}
          .searchable=${true}
          search-placeholder="Search navigation..."
          selections-label="items selected"
          @selectChange=${(e: CustomEvent) => action('navSelect')(e.detail)}
          @searchChange=${(e: CustomEvent) => action('navSearch')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0;">Large Dataset Search</h4>
        <spectrum-select
          placeholder="Search from large dataset"
          .options=${[...cityOptions, ...Array.from({ length: 30 }, (_, i) => ({
            value: `item-${i}`,
            label: `Generated Item ${i + 1}`,
            icon: 'star',
            description: `Auto-generated option ${i + 1}`
          }))]}
          .searchable=${true}
          search-placeholder="Type to filter options..."
          max-height="300px"
          no-results-text="No matches found - try different keywords"
          @selectChange=${(e: CustomEvent) => action('largeDatasetSelect')(e.detail)}
          @searchChange=${(e: CustomEvent) => action('largeDatasetSearch')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Search functionality for efficient navigation of large option lists.

**Search Capabilities:**
- **Real-time Filtering**: Options filter as you type
- **Case-insensitive Matching**: Finds options regardless of capitalization
- **Label and Description Search**: Searches both primary text and descriptions
- **No Results Handling**: Customizable message when no matches found
- **Search Event Emission**: Real-time search term updates

**Performance Optimizations:**
- Debounced search to reduce filtering overhead
- Efficient string matching algorithms
- Maintained scroll position during filtering
- Smart highlighting of matching terms
        `
      }
    }
  },
};

// State demonstrations
export const StateExamples: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0;">Loading State</h4>
        <spectrum-select
          placeholder="Loading options..."
          .options=${[]}
          .loading=${true}
          loading-text="Fetching data from server..."
          variant="outline"
          @selectChange=${(e: CustomEvent) => action('loadingSelect')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0;">Error State</h4>
        <spectrum-select
          placeholder="Select an option"
          .options=${basicOptions}
          .invalid=${true}
          .required=${true}
          error-text="Please select a valid option to continue."
          @selectChange=${(e: CustomEvent) => action('errorSelect')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0;">Disabled State</h4>
        <spectrum-select
          placeholder="Disabled select"
          .options=${basicOptions}
          .disabled=${true}
          selected-value="option2"
          @selectChange=${(e: CustomEvent) => action('disabledSelect')(e.detail)}
        ></spectrum-select>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0;">Required Field</h4>
        <spectrum-select
          placeholder="Required selection *"
          .options=${statusOptions}
          .required=${true}
          @selectChange=${(e: CustomEvent) => action('requiredSelect')(e.detail)}
        ></spectrum-select>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different component states for various interaction scenarios and form validation.

**State Behaviors:**
- **Loading**: Shows spinner, disables interaction, displays loading message
- **Error**: Red styling, error message below, validation feedback
- **Disabled**: Grayed out appearance, no interaction, clear visual indication
- **Required**: Form validation support, accessible labeling

**Accessibility Features:**
- Screen reader announcements for state changes
- Proper ARIA attributes for each state
- Keyboard navigation preserved where applicable
- Clear visual and semantic indicators
        `
      }
    }
  },
};

// Form integration example
export const FormIntegration: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="max-width: 500px;">
      <h3 style="margin: 0 0 24px 0;">User Profile Form</h3>
      <form style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
            Country * <span style="color: #666; font-weight: normal;">(Required)</span>
          </label>
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
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
            Preferred Cities <span style="color: #666; font-weight: normal;">(Optional)</span>
          </label>
          <spectrum-select
            placeholder="Select cities you'd like to visit"
            .options=${cityOptions}
            .multiple=${true}
            .searchable=${true}
            .showSelectAll=${true}
            selections-label="cities selected"
            search-placeholder="Search cities..."
            max-height="200px"
            @selectChange=${(e: CustomEvent) => action('citiesSelection')(e.detail)}
          ></spectrum-select>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
            Account Status <span style="color: #666; font-weight: normal;">(Current)</span>
          </label>
          <spectrum-select
            placeholder="Select status"
            .options=${statusOptions}
            variant="outline"
            selected-value="active"
            @selectChange=${(e: CustomEvent) => action('statusSelection')(e.detail)}
          ></spectrum-select>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
            Navigation Preferences <span style="color: #666; font-weight: normal;">(Accessibility)</span>
          </label>
          <spectrum-select
            placeholder="Select preferred navigation style"
            .options=${navigationOptions}
            variant="ghost"
            @selectChange=${(e: CustomEvent) => action('navigationSelection')(e.detail)}
          ></spectrum-select>
        </div>
        
        <button 
          type="submit" 
          style="
            padding: 12px 24px; 
            border: none; 
            background: #0070d2; 
            color: white; 
            border-radius: 8px; 
            cursor: pointer;
            font-weight: 500;
            margin-top: 16px;
          "
          @click=${(e: Event) => {
            e.preventDefault();
            action('formSubmit')('Form submission attempted');
          }}
        >
          Save Profile Settings
        </button>
      </form>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Complete form integration demonstrating various select configurations in a real-world context.

**Form Features Demonstrated:**
- **Required Fields**: Country selection with validation
- **Multi-select**: Cities with search and bulk selection
- **Pre-selected Values**: Account status with current value
- **Different Variants**: Visual hierarchy through variant selection
- **Accessibility**: Proper labeling and form semantics

**Integration Benefits:**
- Consistent styling across all form elements
- Unified event handling and validation
- Responsive design for various screen sizes
- Clear visual hierarchy and user guidance
        `
      }
    }
  },
};

// Accessibility example
export const AccessibilityExample: StoryObj<SpectrumSelectArgs> = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3 style="margin: 0 0 16px 0;">Accessibility Features Demo</h3>
      <p style="color: #666; margin: 0 0 24px 0; line-height: 1.5;">
        This example demonstrates keyboard navigation, screen reader support, and accessible design patterns.
        <strong>Try using Tab, Arrow keys, Enter, and Escape to navigate.</strong>
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <label 
            id="keyboard-nav-label"
            style="display: block; margin-bottom: 8px; font-weight: 500;"
          >
            🎯 Keyboard Navigation Test
          </label>
          <p style="color: #666; font-size: 14px; margin: 0 0 8px 0;">
            Tab to focus → Enter/Space to open → Arrow keys to navigate → Enter to select → Escape to close
          </p>
          <spectrum-select
            placeholder="Try keyboard navigation"
            .options=${navigationOptions}
            .searchable=${true}
            aria-labelledby="keyboard-nav-label"
            @selectChange=${(e: CustomEvent) => action('keyboardNavSelect')(e.detail)}
            @dropdownOpen=${() => action('dropdownOpen')('Dropdown opened via keyboard')}
            @dropdownClose=${() => action('dropdownClose')('Dropdown closed via keyboard')}
          ></spectrum-select>
        </div>
        
        <div>
          <label 
            id="screen-reader-label"
            style="display: block; margin-bottom: 8px; font-weight: 500;"
          >
            🔊 Screen Reader Support
          </label>
          <p style="color: #666; font-size: 14px; margin: 0 0 8px 0;">
            Options are properly announced with descriptions and selection states
          </p>
          <spectrum-select
            placeholder="Screen reader friendly select"
            .options=${statusOptions}
            .multiple=${true}
            aria-labelledby="screen-reader-label"
            aria-describedby="screen-reader-help"
            @selectChange=${(e: CustomEvent) => action('screenReaderSelect')(e.detail)}
          ></spectrum-select>
          <div 
            id="screen-reader-help" 
            style="color: #666; font-size: 12px; margin-top: 4px;"
          >
            Multiple selection enabled. Use spacebar to toggle individual options.
          </div>
        </div>
        
        <div>
          <label 
            id="high-contrast-label"
            style="display: block; margin-bottom: 8px; font-weight: 500;"
          >
            🎨 High Contrast Mode
          </label>
          <p style="color: #666; font-size: 14px; margin: 0 0 8px 0;">
            Maintains visibility and contrast in high contrast mode and dark themes
          </p>
          <spectrum-select
            placeholder="High contrast compatible"
            .options=${cityOptions}
            .searchable=${true}
            variant="outline"
            aria-labelledby="high-contrast-label"
            @selectChange=${(e: CustomEvent) => action('highContrastSelect')(e.detail)}
          ></spectrum-select>
        </div>
        
        <div>
          <label 
            id="reduced-motion-label"
            style="display: block; margin-bottom: 8px; font-weight: 500;"
          >
            ⚡ Reduced Motion Support
          </label>
          <p style="color: #666; font-size: 14px; margin: 0 0 8px 0;">
            Respects user's reduced motion preferences for animations and transitions
          </p>
          <spectrum-select
            placeholder="Reduced motion friendly"
            .options=${basicOptions}
            aria-labelledby="reduced-motion-label"
            @selectChange=${(e: CustomEvent) => action('reducedMotionSelect')(e.detail)}
          ></spectrum-select>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-top: 24px;">
        <h4 style="margin: 0 0 12px 0; color: #333;">♿ Accessibility Checklist</h4>
        <ul style="margin: 0; color: #666; line-height: 1.6;">
          <li>✅ Full keyboard navigation support</li>
          <li>✅ Screen reader compatibility with ARIA attributes</li>
          <li>✅ High contrast mode support</li>
          <li>✅ Reduced motion preferences respected</li>
          <li>✅ Focus management and visual indicators</li>
          <li>✅ Proper semantic markup and labeling</li>
          <li>✅ Touch-friendly hit areas (44px minimum)</li>
          <li>✅ Clear error messages and validation feedback</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive demonstration of accessibility features and keyboard navigation patterns.

**Keyboard Navigation:**
- **Tab**: Focus the select trigger
- **Enter/Space**: Open dropdown when trigger is focused
- **Arrow Keys**: Navigate through options
- **Home/End**: Jump to first/last option
- **Enter/Space**: Select focused option
- **Escape**: Close dropdown and return focus

**Screen Reader Support:**
- Proper ARIA roles and attributes
- Option descriptions announced
- Selection state changes communicated
- Search functionality accessible
- Error states properly announced

**Visual Accessibility:**
- High contrast mode compatibility
- Clear focus indicators
- Sufficient color contrast ratios
- Reduced motion support for sensitive users
- Touch-friendly interaction areas

This component meets WCAG 2.1 AA accessibility standards.
        `
      }
    }
  },
};