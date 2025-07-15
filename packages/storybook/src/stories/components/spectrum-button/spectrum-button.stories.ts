import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Import example components
import { 
  basicPrimaryButton, 
  basicSecondaryButton, 
  basicDisabledButton, 
  basicIconOnlyButton, 
  basicFabButton 
} from './Examples/BasicExamples';
import { 
  allVariants, 
  allOutlineVariants, 
  fabVariants 
} from './Examples/VariantExamples';
import { 
  feedbackFeatures, 
  iconExamples, 
  sizeExamples, 
  animationExamples, 
  stateExamples 
} from './Examples/FeatureExamples';
import { 
  formButtons, 
  navigationButtons, 
  mediaControls, 
  toolbarActions, 
  ctaButtons, 
  socialActions, 
  loadingStates, 
  accessibilityExamples 
} from './Examples/UsageExamples';

/**
 * ## Spectrum Button Component
 * 
 * A versatile, interactive button component that provides a comprehensive set of variants, sizes, and features.
 * The button component is the foundation for user interactions and is used throughout the Spectrum component system.
 * 
 * ### Key Features
 * - **8 Visual Variants**: Primary, Secondary, Success, Warning, Danger, Ghost, Outline, and FAB
 * - **3 Sizes**: Small (sm), Base (default), and Large (lg)
 * - **Icon Support**: Left icons, right icons, and icon-only configurations
 * - **Interactive Feedback**: Sound effects, haptic feedback, and visual ripple animations
 * - **Accessibility**: Full keyboard navigation, ARIA support, and screen reader compatibility
 * - **Customization**: Debug mode, custom actions, and flexible styling options
 * 
 * ### Usage Guidelines
 * - Use **Primary** for main actions (save, submit, continue)
 * - Use **Secondary** for secondary actions (cancel, back)
 * - Use **Danger** for destructive actions (delete, remove)
 * - Use **Success** for positive confirmations (approve, complete)
 * - Use **Ghost** for subtle actions or toolbar buttons
 * - Use **FAB** for floating action buttons in interfaces
 * 
 * ### Component Dependencies
 * 
 * ```mermaid
 * graph TD;
 *   spectrum-conversation-panel --> spectrum-button
 *   spectrum-hero --> spectrum-button
 *   spectrum-image-gallery --> spectrum-button
 *   spectrum-rail --> spectrum-button
 *   spectrum-rail-item --> spectrum-button
 *   spectrum-search-input --> spectrum-button
 *   spectrum-select --> spectrum-button
 *   style spectrum-button fill:#f9f,stroke:#333,stroke-width:4px
 * ```
 * 
 * The button component is used by multiple other components in the Spectrum system, making it a critical foundation component.
 */

// Component interface for TypeScript support
interface SpectrumButtonElement extends HTMLElement {
  buttonText: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'fab';
  size: 'sm' | 'base' | 'lg';
  outline: boolean;
  iconOnly: boolean;
  disabled: boolean;
  ripple: boolean;
  minimalAnimation: boolean;
  showButtonText: boolean;
  showLeftIcon: boolean;
  leftIcon: string;
  showRightIcon: boolean;
  rightIcon: string;
  debug: boolean;
  action: string;
  sound: boolean;
  haptic: boolean;
  state: 'default' | 'hover' | 'active' | 'disabled';
}

// Story arguments interface
interface SpectrumButtonArgs extends SpectrumButtonElement {}

const meta: Meta<SpectrumButtonArgs> = {
  title: 'Spectrum/Components/SpectrumButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Spectrum Button component provides a comprehensive button implementation with multiple variants, 
interactive features, and accessibility support. It serves as the foundation for user interactions 
across the Spectrum component system.

### Basic Usage

\`\`\`html
<spectrum-button 
  button-text="Click me" 
  variant="primary">
</spectrum-button>
\`\`\`

### With Icons

\`\`\`html
<spectrum-button 
  button-text="Save" 
  variant="primary"
  show-left-icon
  left-icon="save">
</spectrum-button>
\`\`\`

### Interactive Features

\`\`\`html
<spectrum-button 
  button-text="Interactive" 
  variant="primary"
  sound
  haptic
  ripple>
</spectrum-button>
\`\`\`
        `
      }
    }
  },
  args: {
    buttonText: 'Click me',
    variant: 'primary',
    size: 'base',
    outline: false,
    iconOnly: false,
    disabled: false,
    ripple: false,
    minimalAnimation: false,
    showButtonText: true,
    showLeftIcon: false,
    leftIcon: '',
    showRightIcon: false,
    rightIcon: '',
    debug: false,
    action: '',
    sound: false,
    haptic: false,
    state: 'default'
  },
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'The text to display on the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'outline', 'fab'],
      description: 'The visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'primary'" }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'base'" }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show an outline style instead of filled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether to show only the icon (hides text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on click',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    minimalAnimation: {
      control: 'boolean',
      description: 'Disable transform animations while keeping other animations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showButtonText: {
      control: 'boolean',
      description: 'Whether to show the button text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Whether to show the left icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    leftIcon: {
      control: 'text',
      description: 'The Material Icon name for the left icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Whether to show the right icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    rightIcon: {
      control: 'text',
      description: 'The Material Icon name for the right icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to show component boundaries and console logs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    action: {
      control: 'text',
      description: 'Optional action value to emit with the button click event',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Enable sound effect when button is clicked',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'Enable haptic feedback when button is clicked (mobile devices)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'The current state of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'default'" }
      }
    }
  }
} satisfies Meta<SpectrumButtonArgs>;

export default meta;
type Story = StoryObj<SpectrumButtonArgs>;

// Interactive render function for playground
const renderButton = (args: SpectrumButtonArgs) => html`
  <spectrum-button
    button-text=${args.buttonText}
    variant=${args.variant}
    size=${args.size}
    ?outline=${args.outline}
    ?icon-only=${args.iconOnly}
    ?disabled=${args.disabled}
    ?ripple=${args.ripple}
    ?minimal-animation=${args.minimalAnimation}
    ?show-button-text=${args.showButtonText}
    ?show-left-icon=${args.showLeftIcon}
    left-icon=${args.leftIcon}
    ?show-right-icon=${args.showRightIcon}
    right-icon=${args.rightIcon}
    ?debug=${args.debug}
    action=${args.action}
    ?sound=${args.sound}
    ?haptic=${args.haptic}
    state=${args.state}
    @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
  ></spectrum-button>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all button properties and configurations.
 * Use the controls panel to experiment with different combinations.
 */
export const Playground: Story = {
  render: renderButton,
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel below to experiment with all button properties and see how they interact with each other.'
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic button in primary style - the most common button variant.
 */
export const SpectrumPrimary: Story = {
  render: basicPrimaryButton,
  parameters: {
    docs: {
      description: {
        story: 'The primary button variant is used for main actions like "Save", "Submit", or "Continue". It uses the primary theme color and has the highest visual prominence.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Primary Button" 
  variant="primary" 
  size="base">
</spectrum-button>`
      }
    }
  }
};

/**
 * Secondary button for less prominent actions.
 */
export const SpectrumSecondary: Story = {
  render: basicSecondaryButton,
  parameters: {
    docs: {
      description: {
        story: 'The secondary button variant is used for secondary actions like "Cancel" or "Back". It has less visual prominence than the primary button.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Secondary Button" 
  variant="secondary" 
  size="base">
</spectrum-button>`
      }
    }
  }
};

/**
 * Disabled button state showing non-interactive appearance.
 */
export const SpectrumDisabled: Story = {
  render: basicDisabledButton,
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons are non-interactive and use reduced opacity and different cursor styles to indicate their state.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Disabled Button" 
  variant="primary" 
  disabled>
</spectrum-button>`
      }
    }
  }
};

/**
 * Icon-only button without text.
 */
export const SpectrumIconOnly: Story = {
  render: basicIconOnlyButton,
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons are useful for toolbar actions or when space is limited. They should have clear, recognizable icons.'
      },
      source: {
        code: `<spectrum-button 
  variant="primary" 
  icon-only 
  show-left-icon 
  left-icon="settings">
</spectrum-button>`
      }
    }
  }
};

/**
 * Floating Action Button (FAB) for primary actions.
 */
export const SpectrumFAB: Story = {
  render: basicFabButton,
  parameters: {
    docs: {
      description: {
        story: 'Floating Action Buttons (FAB) are used for the primary action in a view. They are typically circular and contain an icon.'
      },
      source: {
        code: `<spectrum-button 
  variant="fab" 
  size="lg" 
  icon-only 
  show-left-icon 
  left-icon="add" 
  ripple>
</spectrum-button>`
      }
    }
  }
};

// =================================================================
// VARIANT SHOWCASE
// =================================================================

/**
 * All available button variants in their default (filled) style.
 */
export const SpectrumAllVariants: Story = {
  render: allVariants,
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all button variants. Each variant has semantic meaning and should be used appropriately: Primary (main actions), Secondary (secondary actions), Success (positive actions), Warning (caution actions), Danger (destructive actions), Ghost (subtle actions).'
      },
      source: {
        code: `<!-- Primary variant -->
<spectrum-button button-text="Primary" variant="primary"></spectrum-button>

<!-- Secondary variant -->
<spectrum-button button-text="Secondary" variant="secondary"></spectrum-button>

<!-- Success variant -->
<spectrum-button button-text="Success" variant="success"></spectrum-button>

<!-- Warning variant -->
<spectrum-button button-text="Warning" variant="warning"></spectrum-button>

<!-- Danger variant -->
<spectrum-button button-text="Danger" variant="danger"></spectrum-button>

<!-- Ghost variant -->
<spectrum-button button-text="Ghost" variant="ghost"></spectrum-button>`
      }
    }
  }
};

/**
 * All button variants with outline styling.
 */
export const SpectrumOutlineVariants: Story = {
  render: allOutlineVariants,
  parameters: {
    docs: {
      description: {
        story: 'Outline variants use borders instead of filled backgrounds, providing a lighter visual weight while maintaining semantic meaning.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Primary Outline" 
  variant="primary" 
  outline>
</spectrum-button>`
      }
    }
  }
};

/**
 * Floating Action Button variations and sizes.
 */
export const SpectrumFABVariants: Story = {
  render: fabVariants,
  parameters: {
    docs: {
      description: {
        story: 'FAB buttons come in different sizes and can be used as icon-only buttons or extended with text labels.'
      },
      source: {
        code: `<!-- Small FAB -->
<spectrum-button 
  variant="fab" 
  size="sm" 
  icon-only 
  show-left-icon 
  left-icon="edit" 
  ripple>
</spectrum-button>

<!-- Extended FAB with text -->
<spectrum-button 
  variant="fab" 
  size="base" 
  button-text="Extended FAB" 
  show-left-icon 
  left-icon="create" 
  ripple>
</spectrum-button>`
      }
    }
  }
};

// =================================================================
// FEATURE DEMONSTRATIONS
// =================================================================

/**
 * Interactive feedback features: sound, haptic, and ripple effects.
 */
export const SpectrumFeedbackFeatures: Story = {
  render: feedbackFeatures,
  parameters: {
    docs: {
      description: {
        story: 'Buttons can provide multiple types of feedback: sound effects (audio), haptic feedback (vibration on mobile), and visual ripple animations. These enhance user experience and provide confirmation of interactions.'
      },
      source: {
        code: `<!-- Sound effect -->
<spectrum-button 
  button-text="Sound Only" 
  variant="primary" 
  sound>
</spectrum-button>

<!-- Haptic feedback -->
<spectrum-button 
  button-text="Haptic Only" 
  variant="secondary" 
  haptic>
</spectrum-button>

<!-- All effects combined -->
<spectrum-button 
  button-text="All Effects" 
  variant="warning" 
  sound 
  haptic 
  ripple>
</spectrum-button>`
      }
    }
  }
};

/**
 * Different icon configurations and placements.
 */
export const SpectrumIconExamples: Story = {
  render: iconExamples,
  parameters: {
    docs: {
      description: {
        story: 'Icons can be placed on the left, right, both sides, or used alone. Icons help users quickly identify button functions and improve usability.'
      },
      source: {
        code: `<!-- Left icon -->
<spectrum-button 
  button-text="Left Icon" 
  variant="primary" 
  show-left-icon 
  left-icon="add">
</spectrum-button>

<!-- Both icons -->
<spectrum-button 
  button-text="Both Icons" 
  variant="primary" 
  show-left-icon 
  left-icon="download" 
  show-right-icon 
  right-icon="open_in_new">
</spectrum-button>`
      }
    }
  }
};

/**
 * Button size variations: small, base, and large.
 */
export const SpectrumSizes: Story = {
  render: sizeExamples,
  parameters: {
    docs: {
      description: {
        story: 'Buttons come in three sizes to fit different interface needs: small for compact spaces, base for standard use, and large for prominent actions.'
      },
      source: {
        code: `<!-- Small size -->
<spectrum-button 
  button-text="Small" 
  variant="primary" 
  size="sm">
</spectrum-button>

<!-- Base size (default) -->
<spectrum-button 
  button-text="Base" 
  variant="primary" 
  size="base">
</spectrum-button>

<!-- Large size -->
<spectrum-button 
  button-text="Large" 
  variant="primary" 
  size="lg">
</spectrum-button>`
      }
    }
  }
};

/**
 * Animation options: full animations vs minimal animations.
 */
export const SpectrumAnimations: Story = {
  render: animationExamples,
  parameters: {
    docs: {
      description: {
        story: 'Buttons support different animation levels. Minimal animation mode disables transform animations while keeping color transitions and other effects for users who prefer reduced motion.'
      },
      source: {
        code: `<!-- Full animations -->
<spectrum-button 
  button-text="Full Animation" 
  variant="primary" 
  ripple>
</spectrum-button>

<!-- Minimal animations -->
<spectrum-button 
  button-text="Minimal Animation" 
  variant="secondary" 
  minimal-animation 
  ripple>
</spectrum-button>`
      }
    }
  }
};

/**
 * Different button states and action configurations.
 */
export const SpectrumStates: Story = {
  render: stateExamples,
  parameters: {
    docs: {
      description: {
        story: 'Buttons can have different states and emit custom actions when clicked. The action property allows you to identify which button was clicked in event handlers.'
      },
      source: {
        code: `<!-- Normal button -->
<spectrum-button 
  button-text="Normal" 
  variant="primary">
</spectrum-button>

<!-- Disabled button -->
<spectrum-button 
  button-text="Disabled" 
  variant="primary" 
  disabled>
</spectrum-button>

<!-- Button with custom action -->
<spectrum-button 
  button-text="With Action" 
  variant="success" 
  action="custom-action">
</spectrum-button>`
      }
    }
  }
};

// =================================================================
// REAL-WORLD USAGE EXAMPLES
// =================================================================

/**
 * Common form button patterns.
 */
export const SpectrumFormButtons: Story = {
  render: formButtons,
  parameters: {
    docs: {
      description: {
        story: 'Common patterns for form actions showing semantic button usage with appropriate variants and icons.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Save" 
  variant="primary" 
  show-left-icon 
  left-icon="save">
</spectrum-button>
<spectrum-button 
  button-text="Cancel" 
  variant="secondary">
</spectrum-button>
<spectrum-button 
  button-text="Delete" 
  variant="danger" 
  show-left-icon 
  left-icon="delete">
</spectrum-button>`
      }
    }
  }
};

/**
 * Navigation button patterns.
 */
export const SpectrumNavigationButtons: Story = {
  render: navigationButtons,
  parameters: {
    docs: {
      description: {
        story: 'Navigation patterns showing directional buttons with appropriate icons and styling.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Back" 
  variant="ghost" 
  show-left-icon 
  left-icon="arrow_back">
</spectrum-button>
<spectrum-button 
  button-text="Continue" 
  variant="primary" 
  show-right-icon 
  right-icon="arrow_forward">
</spectrum-button>`
      }
    }
  }
};

/**
 * Media control button patterns.
 */
export const SpectrumMediaControls: Story = {
  render: mediaControls,
  parameters: {
    docs: {
      description: {
        story: 'Media control patterns using icon-only buttons with different variants and the prominent play button.'
      },
      source: {
        code: `<spectrum-button 
  variant="ghost" 
  icon-only 
  show-left-icon 
  left-icon="skip_previous">
</spectrum-button>
<spectrum-button 
  variant="primary" 
  icon-only 
  show-left-icon 
  left-icon="play_arrow" 
  size="lg" 
  ripple>
</spectrum-button>`
      }
    }
  }
};

/**
 * Toolbar action patterns.
 */
export const SpectrumToolbarActions: Story = {
  render: toolbarActions,
  parameters: {
    docs: {
      description: {
        story: 'Compact toolbar pattern using small ghost buttons with icons, including visual separators between button groups.'
      },
      source: {
        code: `<spectrum-button 
  variant="ghost" 
  icon-only 
  show-left-icon 
  left-icon="edit" 
  size="sm">
</spectrum-button>
<spectrum-button 
  variant="ghost" 
  icon-only 
  show-left-icon 
  left-icon="content_copy" 
  size="sm">
</spectrum-button>`
      }
    }
  }
};

/**
 * Call-to-action button patterns.
 */
export const SpectrumCTAButtons: Story = {
  render: ctaButtons,
  parameters: {
    docs: {
      description: {
        story: 'Call-to-action patterns showing prominent buttons for user conversion and engagement.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Get Started" 
  variant="primary" 
  size="lg" 
  show-right-icon 
  right-icon="arrow_forward" 
  ripple>
</spectrum-button>
<spectrum-button 
  button-text="Learn More" 
  variant="outline" 
  show-right-icon 
  right-icon="open_in_new">
</spectrum-button>`
      }
    }
  }
};

/**
 * Social action button patterns.
 */
export const SpectrumSocialActions: Story = {
  render: socialActions,
  parameters: {
    docs: {
      description: {
        story: 'Social interaction patterns with appropriate icons and styling for engagement actions.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Like" 
  variant="ghost" 
  show-left-icon 
  left-icon="favorite_border">
</spectrum-button>
<spectrum-button 
  button-text="Share" 
  variant="primary" 
  show-left-icon 
  left-icon="share">
</spectrum-button>`
      }
    }
  }
};

/**
 * Loading state simulation patterns.
 */
export const SpectrumLoadingStates: Story = {
  render: loadingStates,
  parameters: {
    docs: {
      description: {
        story: 'Loading state patterns showing how to handle button states during async operations.'
      },
      source: {
        code: `<!-- Normal state -->
<spectrum-button 
  button-text="Submit" 
  variant="primary">
</spectrum-button>

<!-- Loading state -->
<spectrum-button 
  button-text="Submitting..." 
  variant="primary" 
  disabled 
  show-left-icon 
  left-icon="hourglass_empty">
</spectrum-button>

<!-- Success state -->
<spectrum-button 
  button-text="Success!" 
  variant="success" 
  show-left-icon 
  left-icon="check">
</spectrum-button>`
      }
    }
  }
};

/**
 * Accessibility-focused button examples.
 */
export const SpectrumAccessibilityExamples: Story = {
  render: accessibilityExamples,
  parameters: {
    docs: {
      description: {
        story: 'Examples showing proper accessibility implementation with meaningful actions and clear labeling.'
      },
      source: {
        code: `<spectrum-button 
  button-text="Add to Cart" 
  variant="primary" 
  show-left-icon 
  left-icon="add_shopping_cart" 
  action="add-to-cart">
</spectrum-button>
<spectrum-button 
  variant="primary" 
  icon-only 
  show-left-icon 
  left-icon="close" 
  action="close-dialog">
</spectrum-button>`
      }
    }
  }
};

