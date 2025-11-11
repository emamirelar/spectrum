import { Component, Host, h, Prop, State, Watch, Event, EventEmitter, Method, Listen, Element } from '@stencil/core';

export interface WizardStep {
  /** Unique identifier for the step */
  id: string;
  /** Title of the step */
  title: string;
  /** HTML content for the step (used when slotName is not provided) */
  content?: string;
  /** Optional slot name for rich content with external CSS support */
  slotName?: string;
  /** Optional estimated time to complete in minutes */
  estimatedTime?: number;
  /** Whether this step is completed */
  completed?: boolean;
  /** Whether this step is accessible (can be navigated to) */
  accessible?: boolean;
}

export interface WizardStepChangeEvent {
  action: 'next' | 'previous' | 'select';
  currentStep: number;
  previousStep: number;
  stepId: string;
  totalSteps: number;
}

export interface WizardCompleteEvent {
  action: 'complete';
  totalSteps: number;
  completedSteps: number;
}

/**
 * Spectrum Wizard Component
 * 
 * A step-by-step guided experience component that provides navigation,
 * progress tracking, and optional cookie-based persistence.
 * 
 * Cookie persistence is disabled by default for privacy. Enable it by setting
 * persistProgress={true} and providing a unique wizardId.
 * 
 * @example
 * // Basic wizard with JavaScript array
 * <spectrum-wizard steps={steps}></spectrum-wizard>
 * 
 * @example
 * // Wizard with JSON string (HTML-friendly)
 * <spectrum-wizard 
 *   steps='[{"id":"step1","title":"Welcome","content":"<p>Hello</p>","accessible":true}]'
 *   wizard-id="my-wizard">
 * </spectrum-wizard>
 * 
 * @example
 * // Wizard with cookie persistence enabled
 * <spectrum-wizard 
 *   steps={steps} 
 *   persistProgress={true}
 *   wizardId="my-wizard"
 *   cookieExpirationDays={30}>
 * </spectrum-wizard>
 */
@Component({
  tag: 'spectrum-wizard',
  styleUrl: 'spectrum-wizard.scss',
  shadow: true,
})
export class SpectrumWizard {
  @Element() element: HTMLElement;

  /**
   * Array of wizard steps or JSON string representing the steps
   * @example
   * // JavaScript array
   * component.steps = [{id: 'step1', title: 'Welcome', content: '<p>Hello</p>', accessible: true}];
   * 
   * // JSON string  
   * <spectrum-wizard steps='[{"id":"step1","title":"Welcome","content":"<p>Hello</p>","accessible":true}]'></spectrum-wizard>
   */
  @Prop() steps: WizardStep[] | string = [];

  /**
   * Internal parsed steps array
   */
  @State() private parsedSteps: WizardStep[] = [];

  /**
   * Current active step index (0-based)
   */
  @Prop({ mutable: true }) currentStep: number = 0;

  /**
   * Unique identifier for cookie persistence
   */
  @Prop() wizardId: string = 'spectrum-wizard';

  /**
   * Whether to persist progress in cookies (opt-in)
   */
  @Prop() persistProgress: boolean = false;

  /**
   * Show time indicators for steps
   */
  @Prop() showTimeIndicators: boolean = true;

  /**
   * Allow jumping to any accessible step
   */
  @Prop() allowStepSelection: boolean = true;

  /**
   * Cookie expiration in days
   */
  @Prop() cookieExpirationDays: number = 30;

  /**
   * Whether navigation controls are shown
   */
  @Prop() showNavigation: boolean = true;

  /**
   * Label for the next button
   */
  @Prop() nextButtonLabel: string = 'Next';

  /**
   * Label for the previous button
   */
  @Prop() previousButtonLabel: string = 'Previous';

  /**
   * Label for the complete button
   */
  @Prop() completeButtonLabel: string = 'Complete';

  /**
   * External CSS styles to inject into shadow DOM for styling step content
   * @example
   * <spectrum-wizard external-styles=".custom { color: red; } p { font-size: 1.2rem; }">
   */
  @Prop() externalStyles?: string;

  /**
   * Emitted when step changes
   */
  @Event({
    eventName: 'stepChange',
    composed: true,
    cancelable: true,
    bubbles: true
  }) stepChange: EventEmitter<WizardStepChangeEvent>;

  /**
   * Emitted when wizard is completed
   */
  @Event({
    eventName: 'wizardComplete',
    composed: true,
    cancelable: true,
    bubbles: true
  }) wizardComplete: EventEmitter<WizardCompleteEvent>;

  componentWillLoad() {
    this.parseSteps();
    this.loadProgressFromCookie();
  }

  componentDidLoad() {
    // Ensure parsing happens after attributes are fully set
    this.parseSteps();
    // Inject external styles into shadow DOM
    this.injectExternalStyles();
  }

  @Watch('currentStep')
  onCurrentStepChange(newStep: number, oldStep: number) {
    if (this.persistProgress) {
      this.saveProgressToCookie();
    }
    
    if (this.parsedSteps[newStep]) {
      this.stepChange.emit({
        action: newStep > oldStep ? 'next' : newStep < oldStep ? 'previous' : 'select',
        currentStep: newStep,
        previousStep: oldStep,
        stepId: this.parsedSteps[newStep].id,
        totalSteps: this.parsedSteps.length
      });
    }
  }

  @Watch('steps')
  onStepsChange() {
    this.parseSteps();
  }

  @Watch('externalStyles')
  onExternalStylesChange() {
    this.injectExternalStyles();
  }

  /**
   * Parse steps property whether it's an array or JSON string
   */
  private parseSteps() {
    try {
      if (typeof this.steps === 'string' && this.steps.length > 0) {
        // Parse JSON string
        this.parsedSteps = JSON.parse(this.steps);
      } else if (Array.isArray(this.steps)) {
        // Use array directly
        this.parsedSteps = this.steps;
      } else {
        // Fallback to empty array
        this.parsedSteps = [];
      }
    } catch (error) {
      console.error('Invalid JSON in steps property:', error);
      this.parsedSteps = [];
    }
  }

  /**
   * Inject external CSS styles into shadow DOM using Constructable Stylesheets
   */
  private injectExternalStyles() {
    if (!this.externalStyles || !this.element.shadowRoot) {
      return;
    }

    try {
      // Create a new stylesheet
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(this.externalStyles);
      
      // Adopt the stylesheet into the shadow root
      this.element.shadowRoot.adoptedStyleSheets = [
        ...this.element.shadowRoot.adoptedStyleSheets,
        sheet
      ];
    } catch (error) {
      console.error('Failed to inject external styles into shadow DOM:', error);
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousStep();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextStep();
        break;
      case 'Home':
        event.preventDefault();
        this.goToStep(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToStep(this.parsedSteps.length - 1);
        break;
    }
  }

  /**
   * Navigate to next step
   */
  @Method()
  async nextStep(): Promise<boolean> {
    if (this.canGoNext()) {
      this.markStepCompleted(this.currentStep);
      this.currentStep = this.currentStep + 1;
      return true;
    }
    return false;
  }

  /**
   * Navigate to previous step
   */
  @Method()
  async previousStep(): Promise<boolean> {
    if (this.canGoPrevious()) {
      this.currentStep = this.currentStep - 1;
      return true;
    }
    return false;
  }

  /**
   * Navigate to specific step
   */
  @Method()
  async goToStep(stepIndex: number): Promise<boolean> {
    if (this.canGoToStep(stepIndex)) {
      this.currentStep = stepIndex;
      return true;
    }
    return false;
  }

  /**
   * Complete the wizard
   */
  @Method()
  async completeWizard(): Promise<void> {
    this.markStepCompleted(this.currentStep);
    
    const completedSteps = this.parsedSteps.filter(step => step.completed).length;
    
    this.wizardComplete.emit({
      action: 'complete',
      totalSteps: this.parsedSteps.length,
      completedSteps
    });

    if (this.persistProgress) {
      this.clearProgressCookie();
    }
  }

  /**
   * Reset wizard progress
   */
  @Method()
  async resetProgress(): Promise<void> {
    this.currentStep = 0;
    this.parsedSteps.forEach(step => {
      step.completed = false;
      step.accessible = step === this.parsedSteps[0];
    });
    
    if (this.persistProgress) {
      this.clearProgressCookie();
    }
  }

  /**
   * Get total estimated time for all steps
   */
  @Method()
  async getTotalEstimatedTime(): Promise<number> {
    return this.parsedSteps.reduce((total, step) => total + (step.estimatedTime || 0), 0);
  }

  private canGoNext(): boolean {
    return this.currentStep < this.parsedSteps.length - 1;
  }

  private canGoPrevious(): boolean {
    return this.currentStep > 0;
  }

  private canGoToStep(stepIndex: number): boolean {
    if (stepIndex < 0 || stepIndex >= this.parsedSteps.length) {
      return false;
    }

    if (!this.allowStepSelection) {
      return false;
    }

    const step = this.parsedSteps[stepIndex];
    return step.accessible !== false;
  }

  private markStepCompleted(stepIndex: number): void {
    if (this.parsedSteps[stepIndex]) {
      this.parsedSteps[stepIndex].completed = true;
      
      // Make next step accessible
      if (stepIndex + 1 < this.parsedSteps.length) {
        this.parsedSteps[stepIndex + 1].accessible = true;
      }
      
      // Force re-render
      this.parsedSteps = [...this.parsedSteps];
    }
  }

  private saveProgressToCookie(): void {
    if (!this.persistProgress) return;

    const progress = {
      currentStep: this.currentStep,
      completedSteps: this.parsedSteps.map(step => step.completed),
      timestamp: Date.now()
    };

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + this.cookieExpirationDays);

    document.cookie = `${this.wizardId}-progress=${JSON.stringify(progress)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
  }

  private loadProgressFromCookie(): void {
    if (!this.persistProgress) return;

    const cookies = document.cookie.split(';');
    const progressCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${this.wizardId}-progress=`)
    );

    if (progressCookie) {
      try {
        const progressData = JSON.parse(
          progressCookie.split('=')[1]
        );

        if (progressData.currentStep !== undefined) {
          this.currentStep = Math.min(progressData.currentStep, this.parsedSteps.length - 1);
        }

        if (progressData.completedSteps && Array.isArray(progressData.completedSteps)) {
          progressData.completedSteps.forEach((completed, index) => {
            if (this.parsedSteps[index]) {
              this.parsedSteps[index].completed = completed;
              this.parsedSteps[index].accessible = completed || index <= this.currentStep;
            }
          });
        }

        // Ensure current and previous steps are accessible
        for (let i = 0; i <= this.currentStep; i++) {
          if (this.parsedSteps[i]) {
            this.parsedSteps[i].accessible = true;
          }
        }
      } catch (error) {
        console.warn('Failed to load wizard progress from cookie:', error);
        this.clearProgressCookie();
      }
    }
  }

  private clearProgressCookie(): void {
    document.cookie = `${this.wizardId}-progress=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  }

  private formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  }

  private handleStepClick(stepIndex: number, event: Event): void {
    event.preventDefault();
    
    if (this.canGoToStep(stepIndex)) {
      this.goToStep(stepIndex);
    }
  }

  private handleNextClick = (): void => {
    this.nextStep();
  };

  private handlePreviousClick = (): void => {
    this.previousStep();
  };

  private handleCompleteClick = (): void => {
    this.completeWizard();
  };

  private handlePersistProgressToggle = (event: CustomEvent): void => {
    this.persistProgress = event.detail.checked;
    
    if (!this.persistProgress) {
      // Clear existing cookies when disabling persistence
      this.clearProgressCookie();
    } else {
      // Save current progress when enabling persistence
      this.saveProgressToCookie();
    }
  };

  private renderStepIndicator(step: WizardStep, index: number): any {
    const isActive = index === this.currentStep;
    const isCompleted = step.completed;
    const isAccessible = step.accessible !== false;
    
    const stepClass = {
      'spectrum-wizard__step': true,
      'spectrum-wizard__step--active': isActive,
      'spectrum-wizard__step--completed': isCompleted,
      'spectrum-wizard__step--accessible': isAccessible && this.allowStepSelection,
      'spectrum-wizard__step--inaccessible': !isAccessible
    };

    return (
      <div class={stepClass}>
        <div class="spectrum-wizard__step-indicator">
          <button
            type="button"
            disabled={!isAccessible || !this.allowStepSelection}
            aria-current={isActive ? 'step' : undefined}
            aria-label={`Step ${index + 1}: ${step.title}${isCompleted ? ' (completed)' : ''}`}
            onClick={(event) => this.handleStepClick(index, event)}
            class="spectrum-wizard__step-button"
          >
            <span class="spectrum-wizard__step-number">
              {isCompleted ? (
                <svg class="spectrum-wizard__step-check" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              ) : (
                index + 1
              )}
            </span>
          </button>
          <div class="spectrum-wizard__step-content">
            <span class="spectrum-wizard__step-title">{step.title}</span>
            {this.showTimeIndicators && step.estimatedTime && (
              <spectrum-chip 
                size="small" 
                variant="primary"
                class="spectrum-wizard__step-time-chip"
                label={this.formatTime(step.estimatedTime)}
              ></spectrum-chip>
            )}
          </div>
        </div>
        {index < this.parsedSteps.length - 1 && (
          <div class="spectrum-wizard__step-connector" aria-hidden="true"></div>
        )}
      </div>
    );
  }

  private renderStepContent(): any {
    const currentStepData = this.parsedSteps[this.currentStep];
    
    if (!currentStepData) {
      return <div class="spectrum-wizard__content">No content available</div>;
    }

    return (
      <div class="spectrum-wizard__content">
        <div class="spectrum-wizard__content-header">
          <h2 class="spectrum-wizard__content-title">
            {currentStepData.title}
          </h2>
          {this.showTimeIndicators && currentStepData.estimatedTime && (
            <span class="spectrum-wizard__content-time">
              Estimated time: {this.formatTime(currentStepData.estimatedTime)}
            </span>
          )}
        </div>
        <div class="spectrum-wizard__content-body">
          {currentStepData.slotName ? (
            // Render slotted content - allows external CSS
            <slot name={currentStepData.slotName}></slot>
          ) : (
            // Render HTML string content - uses innerHTML
            <div innerHTML={currentStepData.content}></div>
          )}
        </div>
      </div>
    );
  }

  private renderNavigation(): any {
    if (!this.showNavigation) {
      return null;
    }

    const isFirstStep = this.currentStep === 0;
    const isLastStep = this.currentStep === this.parsedSteps.length - 1;

    return (
      <div class="spectrum-wizard__navigation">
        <spectrum-button
          variant="secondary"
          size="medium"
          disabled={isFirstStep}
          aria-label={this.previousButtonLabel || 'Previous'}
          buttonText={this.previousButtonLabel || 'Previous'}
          onClick={this.handlePreviousClick}
        ></spectrum-button>

        <div class="spectrum-wizard__nav-info">
          Step {this.currentStep + 1} of {this.parsedSteps.length}
        </div>

        {isLastStep ? (
          <spectrum-button
            variant="primary"
            size="medium"
            aria-label={this.completeButtonLabel || 'Complete'}
            buttonText={this.completeButtonLabel || 'Complete'}
            onClick={this.handleCompleteClick}
          ></spectrum-button>
        ) : (
          <spectrum-button
            variant="primary"
            size="medium"
            disabled={!this.canGoNext()}
            aria-label={this.nextButtonLabel || 'Next'}
            buttonText={this.nextButtonLabel || 'Next'}
            onClick={this.handleNextClick}
          ></spectrum-button>
        )}
      </div>
    );
  }

  render() {
    if (!this.parsedSteps || this.parsedSteps.length === 0) {
      return (
        <Host>
          <div class="spectrum-wizard spectrum-wizard--empty">
            <p>No steps configured for this wizard.</p>
          </div>
        </Host>
      );
    }

    const totalTime = this.parsedSteps.reduce((total, step) => total + (step.estimatedTime || 0), 0);

    return (
      <Host>
        <div class="spectrum-wizard" role="tablist" aria-label="Wizard steps">
          {this.showTimeIndicators && totalTime > 0 && (
            <div class="spectrum-wizard__time-summary">
              <div class="spectrum-wizard__time-info">
                <span class="spectrum-wizard__time-label">Total estimated time:</span>
                <spectrum-chip 
                  size="medium" 
                  variant="primary"
                  class="spectrum-wizard__total-time-chip"
                  label={this.formatTime(totalTime)}
                ></spectrum-chip>
              </div>
              <div class="spectrum-wizard__progress-control">
                <spectrum-switch
                  checked={this.persistProgress}
                  variant="positive"
                  size="medium"
                  label="Remember Progress"
                  aria-label="Remember Progress"
                  onSwitchChange={this.handlePersistProgressToggle}
                ></spectrum-switch>
              </div>
            </div>
          )}
          
          <div class="spectrum-wizard__steps" role="tablist">
            {this.parsedSteps.map((step, index) => this.renderStepIndicator(step, index))}
          </div>

          <div class="spectrum-wizard__main" role="tabpanel" aria-labelledby={`step-${this.currentStep}`}>
            {this.renderStepContent()}
            {this.renderNavigation()}
          </div>
        </div>
      </Host>
    );
  }
}
