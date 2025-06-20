import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'spectrum-rail-alternative',
  styleUrl: 'spectrum-rail-alternative.scss',
  shadow: true,
})
export class SpectrumRailAlternative {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
