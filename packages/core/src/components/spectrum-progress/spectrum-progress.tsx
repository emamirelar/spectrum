import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'spectrum-progress',
  styleUrl: 'spectrum-progress.scss',
  shadow: true,
})
export class SpectrumProgress {
  @Prop() variant: 'circular' | 'linear' = 'linear';
  @Prop() value?: number;
  @Prop() size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large' = 'base';
  @Prop() disabled: boolean = false;
  @Prop() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  @Prop() label?: string;
  @Prop() showLabel: boolean = false;

  private getMappedSize(): string {
    switch (this.size) {
      case 'small': return 'sm';
      case 'large': return 'lg';
      case 'medium': return 'base';
      default: return this.size;
    }
  }

  private isIndeterminate(): boolean {
    return this.value === undefined || this.value === null;
  }

  private getClampedValue(): number {
    if (this.isIndeterminate()) return 0;
    return Math.max(0, Math.min(100, this.value!));
  }

  private renderLinear() {
    const pct = this.getClampedValue();
    const indeterminate = this.isIndeterminate();

    return (
      <div class="spectrum-progress__track">
        <div
          class={{
            'spectrum-progress__bar': true,
            'spectrum-progress__bar--indeterminate': indeterminate,
          }}
          style={indeterminate ? {} : { width: `${pct}%` }}
        />
      </div>
    );
  }

  private renderCircular() {
    const indeterminate = this.isIndeterminate();
    const pct = this.getClampedValue();
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (pct / 100) * circumference;

    return (
      <svg class="spectrum-progress__svg" viewBox="0 0 44 44">
        <circle
          class="spectrum-progress__circle-bg"
          cx="22" cy="22" r={radius}
          fill="none"
          stroke-width="4"
        />
        <circle
          class={{
            'spectrum-progress__circle-fg': true,
            'spectrum-progress__circle-fg--indeterminate': indeterminate,
          }}
          cx="22" cy="22" r={radius}
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
          stroke-dasharray={circumference.toString()}
          stroke-dashoffset={indeterminate ? (circumference * 0.75).toString() : offset.toString()}
        />
      </svg>
    );
  }

  render() {
    const indeterminate = this.isIndeterminate();
    const pct = this.getClampedValue();

    const classes: { [key: string]: boolean } = {
      'spectrum-progress': true,
      [`spectrum-progress--${this.variant}`]: true,
      [`spectrum-progress--${this.getMappedSize()}`]: true,
      [`spectrum-progress--${this.color}`]: true,
      'spectrum-progress--indeterminate': indeterminate,
      'spectrum-progress--disabled': this.disabled,
    };

    const ariaAttrs: any = {
      role: 'progressbar',
      'aria-label': this.label || 'Progress',
    };
    if (!indeterminate) {
      ariaAttrs['aria-valuenow'] = pct;
      ariaAttrs['aria-valuemin'] = 0;
      ariaAttrs['aria-valuemax'] = 100;
    }

    return (
      <Host>
        <div class={classes} {...ariaAttrs}>
          {this.variant === 'circular' ? this.renderCircular() : this.renderLinear()}
          {this.showLabel && !indeterminate && (
            <span class="spectrum-progress__label">{Math.round(pct)}%</span>
          )}
        </div>
      </Host>
    );
  }
}
