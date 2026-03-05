import type { Meta, StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

const meta: Meta = {
  title: 'Documentation/Component Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ColorSwatch {
  label: string;
  variable: string;
  hex: string;
  lightText?: boolean;
}

interface ColorScale {
  name: string;
  swatches: ColorSwatch[];
}

// ---------------------------------------------------------------------------
// Color data
// ---------------------------------------------------------------------------

const BASE_COLORS: ColorSwatch[] = [
  { label: 'White', variable: '--unops-color-white', hex: '#ffffff' },
  { label: 'Black', variable: '--unops-color-black', hex: '#333333', lightText: true },
  { label: 'Gray', variable: '--unops-color-gray', hex: '#f6f6f6' },
  { label: 'Blue', variable: '--unops-color-blue', hex: '#0070d2', lightText: true },
  { label: 'Midnight', variable: '--unops-color-midnight', hex: '#005fb2', lightText: true },
  { label: 'Success', variable: '--unops-color-success', hex: '#2d844a', lightText: true },
  { label: 'Warning', variable: '--unops-color-warning', hex: '#cc6900', lightText: true },
  { label: 'Danger', variable: '--unops-color-danger', hex: '#c41e3a', lightText: true },
];

const THEME_COLORS: ColorSwatch[] = [
  { label: 'Primary', variable: '--spectrum-color-primary', hex: '#0070d2', lightText: true },
  { label: 'On Primary', variable: '--spectrum-color-on-primary', hex: '#ffffff' },
  { label: 'Primary Container', variable: '--spectrum-color-primary-container', hex: '#d0e4ff' },
  { label: 'On Primary Container', variable: '--spectrum-color-on-primary-container', hex: '#001c3a', lightText: true },
  { label: 'Secondary', variable: '--spectrum-color-secondary', hex: '#005fb2', lightText: true },
  { label: 'On Secondary', variable: '--spectrum-color-on-secondary', hex: '#ffffff' },
  { label: 'Secondary Container', variable: '--spectrum-color-secondary-container', hex: '#d1e4ff' },
  { label: 'On Secondary Container', variable: '--spectrum-color-on-secondary-container', hex: '#001c3a', lightText: true },
  { label: 'Tertiary', variable: '--spectrum-color-tertiary', hex: '#7f525d', lightText: true },
  { label: 'On Tertiary', variable: '--spectrum-color-on-tertiary', hex: '#ffffff' },
  { label: 'Tertiary Container', variable: '--spectrum-color-tertiary-container', hex: '#ffd9e2' },
  { label: 'On Tertiary Container', variable: '--spectrum-color-on-tertiary-container', hex: '#321018', lightText: true },
  { label: 'Error', variable: '--spectrum-color-error', hex: '#ba1a1a', lightText: true },
  { label: 'On Error', variable: '--spectrum-color-on-error', hex: '#ffffff' },
  { label: 'Error Container', variable: '--spectrum-color-error-container', hex: '#ffdad6' },
  { label: 'On Error Container', variable: '--spectrum-color-on-error-container', hex: '#410002', lightText: true },
  { label: 'Background', variable: '--spectrum-color-background', hex: '#f6f6f6' },
  { label: 'On Background', variable: '--spectrum-color-on-background', hex: '#333333', lightText: true },
  { label: 'Surface', variable: '--spectrum-color-surface', hex: '#f6f6f6' },
  { label: 'On Surface', variable: '--spectrum-color-on-surface', hex: '#333333', lightText: true },
  { label: 'Surface Variant', variable: '--spectrum-color-surface-variant', hex: '#dfe2eb' },
  { label: 'On Surface Variant', variable: '--spectrum-color-on-surface-variant', hex: '#42474e', lightText: true },
  { label: 'Outline', variable: '--spectrum-color-outline', hex: '#72777f', lightText: true },
  { label: 'Outline Variant', variable: '--spectrum-color-outline-variant', hex: '#c2c7cf' },
  { label: 'Shadow', variable: '--spectrum-color-shadow', hex: '#000000', lightText: true },
  { label: 'Scrim', variable: '--spectrum-color-scrim', hex: '#000000', lightText: true },
  { label: 'Inverse Surface', variable: '--spectrum-color-inverse-surface', hex: '#2f3033', lightText: true },
  { label: 'Inverse On Surface', variable: '--spectrum-color-inverse-on-surface', hex: '#f1f0f4' },
  { label: 'Inverse Primary', variable: '--spectrum-color-inverse-primary', hex: '#a8c8ff' },
];

const SYSTEM_COLORS: ColorSwatch[] = [
  { label: 'Primary', variable: '--spectrum-sys-color-primary', hex: '#0070d2', lightText: true },
  { label: 'On Primary', variable: '--spectrum-sys-color-on-primary', hex: '#ffffff' },
  { label: 'Secondary', variable: '--spectrum-sys-color-secondary', hex: '#005fb2', lightText: true },
  { label: 'On Secondary', variable: '--spectrum-sys-color-on-secondary', hex: '#ffffff' },
  { label: 'Success', variable: '--spectrum-sys-color-success', hex: '#2d844a', lightText: true },
  { label: 'On Success', variable: '--spectrum-sys-color-on-success', hex: '#ffffff' },
  { label: 'Warning', variable: '--spectrum-sys-color-warning', hex: '#cc6900', lightText: true },
  { label: 'On Warning', variable: '--spectrum-sys-color-on-warning', hex: '#ffffff' },
  { label: 'Danger', variable: '--spectrum-sys-color-danger', hex: '#c41e3a', lightText: true },
  { label: 'On Danger', variable: '--spectrum-sys-color-on-danger', hex: '#ffffff' },
  { label: 'Background', variable: '--spectrum-sys-color-background', hex: '#ffffff' },
  { label: 'Surface', variable: '--spectrum-sys-color-surface', hex: '#f6f6f6' },
  { label: 'On Surface', variable: '--spectrum-sys-color-on-surface', hex: '#333333', lightText: true },
  { label: 'Text', variable: '--spectrum-sys-color-text', hex: '#333333', lightText: true },
  { label: 'Primary Container', variable: '--spectrum-sys-color-primary-container', hex: '#d0e4ff' },
  { label: 'On Primary Container', variable: '--spectrum-sys-color-on-primary-container', hex: '#001c3a', lightText: true },
  { label: 'Secondary Container', variable: '--spectrum-sys-color-secondary-container', hex: '#d1e4ff' },
  { label: 'On Secondary Container', variable: '--spectrum-sys-color-on-secondary-container', hex: '#001c3a', lightText: true },
  { label: 'Tertiary', variable: '--spectrum-sys-color-tertiary', hex: '#7f525d', lightText: true },
  { label: 'On Tertiary', variable: '--spectrum-sys-color-on-tertiary', hex: '#ffffff' },
  { label: 'Tertiary Container', variable: '--spectrum-sys-color-tertiary-container', hex: '#ffd9e2' },
  { label: 'On Tertiary Container', variable: '--spectrum-sys-color-on-tertiary-container', hex: '#321018', lightText: true },
  { label: 'Error', variable: '--spectrum-sys-color-error', hex: '#ba1a1a', lightText: true },
  { label: 'On Error', variable: '--spectrum-sys-color-on-error', hex: '#ffffff' },
  { label: 'Error Container', variable: '--spectrum-sys-color-error-container', hex: '#ffdad6' },
  { label: 'On Error Container', variable: '--spectrum-sys-color-on-error-container', hex: '#410002', lightText: true },
  { label: 'Success Container', variable: '--spectrum-sys-color-success-container', hex: '#d2e7cd' },
  { label: 'On Success Container', variable: '--spectrum-sys-color-on-success-container', hex: '#13280e', lightText: true },
  { label: 'Warning Container', variable: '--spectrum-sys-color-warning-container', hex: '#f9d6c3' },
  { label: 'On Warning Container', variable: '--spectrum-sys-color-on-warning-container', hex: '#3a1704', lightText: true },
  { label: 'Surface Variant', variable: '--spectrum-sys-color-surface-variant', hex: '#dfe2eb' },
  { label: 'On Surface Variant', variable: '--spectrum-sys-color-on-surface-variant', hex: '#42474e', lightText: true },
  { label: 'Surface Container', variable: '--spectrum-sys-color-surface-container', hex: '#f0f0f4' },
  { label: 'Surface Container Low', variable: '--spectrum-sys-color-surface-container-low', hex: '#f6f6fa' },
  { label: 'Surface Container Active', variable: '--spectrum-sys-color-surface-container-active', hex: '#e8e8ec' },
  { label: 'Surface Hover', variable: '--spectrum-sys-color-surface-hover', hex: 'rgba(0,0,0,0.04)' },
  { label: 'Surface Active', variable: '--spectrum-sys-color-surface-active', hex: 'rgba(0,0,0,0.08)' },
  { label: 'Surface Subtle', variable: '--spectrum-sys-color-surface-subtle', hex: '#f8f8f8' },
  { label: 'Surface Disabled', variable: '--spectrum-sys-color-surface-disabled', hex: '#e0e0e0' },
  { label: 'On Surface Disabled', variable: '--spectrum-sys-color-on-surface-disabled', hex: '#9e9e9e', lightText: true },
  { label: 'Surface Variant Hover', variable: '--spectrum-sys-color-surface-variant-hover', hex: '#d0d3dc' },
  { label: 'Primary Hover', variable: '--spectrum-sys-color-primary-hover', hex: '#005fb2', lightText: true },
  { label: 'Primary Active', variable: '--spectrum-sys-color-primary-active', hex: '#004d91', lightText: true },
  { label: 'Primary Opacity 08', variable: '--spectrum-sys-color-primary-opacity-08', hex: 'rgba(0,112,210,0.08)' },
  { label: 'Outline', variable: '--spectrum-sys-color-outline', hex: '#72777f', lightText: true },
  { label: 'Outline Variant', variable: '--spectrum-sys-color-outline-variant', hex: '#c2c7cf' },
  { label: 'Inverse Surface', variable: '--spectrum-sys-color-inverse-surface', hex: '#2f3033', lightText: true },
  { label: 'Inverse On Surface', variable: '--spectrum-sys-color-inverse-on-surface', hex: '#f1f0f4' },
  { label: 'Inverse Primary', variable: '--spectrum-sys-color-inverse-primary', hex: '#a8c8ff' },
  { label: 'Neutral 900', variable: '--spectrum-sys-color-neutral-900', hex: '#1a1a1a', lightText: true },
  { label: 'Border Subtle', variable: '--spectrum-sys-color-border-subtle', hex: '#e0e0e0' },
];

function makeScale(name: string, prefix: string): ColorScale {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const hexMap: Record<string, Record<number, string>> = {
    '2blue': { 50: '#bfd9e6', 100: '#99c2d7', 200: '#73abc7', 300: '#4d94b8', 400: '#00669a', 500: '#005783', 600: '#00476c', 700: '#003855', 800: '#00293e', 900: '#001a27' },
    'ocean': { 50: '#d3f0f7', 100: '#b8e7f3', 200: '#9edeee', 300: '#83d5e9', 400: '#4ec3e0', 500: '#42a6be', 600: '#37899d', 700: '#2b6b7b', 800: '#1f4e5a', 900: '#143138' },
    'teal': { 50: '#bfeae5', 100: '#99ddd5', 200: '#73d0c6', 300: '#4dc3b6', 400: '#00a997', 500: '#009080', 600: '#00766a', 700: '#005d53', 800: '#00443c', 900: '#00121e' },
    'orange': { 50: '#f9d6c3', 100: '#f6be9f', 200: '#f2a57a', 300: '#ef8d56', 400: '#eb7432', 500: '#c54e0c', 600: '#a2400a', 700: '#803308', 800: '#5d2506', 900: '#3a1704' },
    'red': { 50: '#f6cac6', 100: '#f0a9a4', 200: '#eb8982', 300: '#e56960', 400: '#e0493e', 500: '#da291c', 600: '#991d14', 700: '#78170f', 800: '#57100b', 900: '#370a07' },
    'green': { 50: '#d2e7cd', 100: '#b7d9af', 200: '#9dca92', 300: '#82bc74', 400: '#67ad56', 500: '#4c9f38', 600: '#418730', 700: '#2a571f', 800: '#1e4016', 900: '#13280e' },
  };

  const map = hexMap[prefix];
  return {
    name,
    swatches: steps.map(step => ({
      label: `${step}`,
      variable: `--unops-color-${prefix}-${step}`,
      hex: map[step],
      lightText: step >= 400,
    })),
  };
}

const COLOR_SCALES: ColorScale[] = [
  makeScale('2Blue', '2blue'),
  makeScale('Ocean', 'ocean'),
  makeScale('Teal', 'teal'),
  makeScale('Orange', 'orange'),
  makeScale('Red', 'red'),
  makeScale('Green', 'green'),
];

const NEUTRAL_COLORS: ColorSwatch[] = [
  { label: 'Neutral Cold', variable: '--unops-color-n-cold', hex: '#EBF1F8' },
  { label: 'Neutral Warm', variable: '--unops-color-n-warm', hex: '#ECEFEF' },
];

interface GradientSwatch {
  label: string;
  variable: string;
  value: string;
}

const GRADIENTS: GradientSwatch[] = [
  { label: 'Gradient 1', variable: '--unops-gradient-1', value: 'linear-gradient(83deg, #00A997 9%, #C4D600 77%, #F8EA44 100%)' },
  { label: 'Gradient 2', variable: '--unops-gradient-2', value: 'linear-gradient(83deg, #4FC3DD 9%, #C4D600 77%, #F8EA44 100%)' },
  { label: 'Gradient 3', variable: '--unops-gradient-3', value: 'radial-gradient(circle at 99.95% 7.97%, #FFA65D 5%, #FFC215 18%, #C4D600 37%, #96C93D 49%, #0092D1 89%)' },
  { label: 'Gradient 4', variable: '--unops-gradient-4', value: 'linear-gradient(87deg, #00A997 15%, #26A2D8 69%, #0092D1 100%)' },
  { label: 'Gradient 5', variable: '--unops-gradient-5', value: 'radial-gradient(circle at 49.15% 18.90%, #F8EA44 10%, #E85C0E 47%, #991E66 93%)' },
  { label: 'Gradient 6', variable: '--unops-gradient-6', value: 'linear-gradient(90deg, #991E66 3%, #C43C3E 52%, #E85C0E 100%)' },
  { label: 'Gradient 7', variable: '--unops-gradient-7', value: 'linear-gradient(90deg, #FFC215 0%, #E85C0E 100%)' },
  { label: 'Gradient 8', variable: '--unops-gradient-8', value: 'linear-gradient(80deg, #991E66 0%, #0092D1 100%)' },
];

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const sharedStyles = html`
  <style>
    .cc-container {
      font-family: var(--spectrum-sys-font-family, 'Noto Sans', sans-serif);
      color: var(--spectrum-color-on-surface, #333);
    }

    .cc-section-title {
      font-size: var(--spectrum-sys-typescale-title-large-size, 22px);
      font-weight: var(--spectrum-sys-font-weight-bold, 700);
      margin: 0 0 0.5rem 0;
      color: var(--spectrum-color-on-surface, #333);
    }

    .cc-section-desc {
      font-size: var(--spectrum-sys-typescale-body-medium-size, 14px);
      color: var(--spectrum-color-on-surface-variant, #42474e);
      margin: 0 0 1.25rem 0;
    }

    .cc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      margin-bottom: 2.5rem;
    }

    .cc-grid--wide {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }

    .cc-swatch {
      border-radius: var(--spectrum-sys-shape-corner-medium, 12px);
      overflow: hidden;
      border: 1px solid var(--spectrum-color-outline-variant, #c2c7cf);
      transition: box-shadow 0.2s ease;
    }

    .cc-swatch:hover {
      box-shadow: var(--spectrum-sys-elevation-2, 0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15));
    }

    .cc-swatch__color {
      height: 80px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      padding: 8px 10px;
      font-size: 12px;
      font-weight: 600;
    }

    .cc-swatch__info {
      padding: 8px 10px;
      background: var(--spectrum-color-surface, #f6f6f6);
    }

    .cc-swatch__var {
      display: block;
      font-size: 11px;
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      color: var(--spectrum-color-on-surface, #333);
      word-break: break-all;
      line-height: 1.4;
    }

    .cc-swatch__hex {
      display: block;
      font-size: 11px;
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      color: var(--spectrum-color-on-surface-variant, #42474e);
      margin-top: 2px;
    }

    .cc-scale-title {
      font-size: var(--spectrum-sys-typescale-title-medium-size, 16px);
      font-weight: var(--spectrum-sys-font-weight-medium, 500);
      margin: 0 0 0.75rem 0;
      color: var(--spectrum-color-on-surface, #333);
    }

    .cc-scale-strip {
      display: flex;
      border-radius: var(--spectrum-sys-shape-corner-medium, 12px);
      overflow: hidden;
      border: 1px solid var(--spectrum-color-outline-variant, #c2c7cf);
      margin-bottom: 2rem;
    }

    .cc-scale-step {
      flex: 1;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 2px;
      text-align: center;
      font-size: 10px;
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      transition: flex 0.2s ease;
    }

    .cc-scale-step:hover {
      flex: 1.8;
    }

    .cc-scale-step__label {
      font-weight: 700;
      font-size: 12px;
    }

    .cc-scale-step__hex {
      opacity: 0;
      transition: opacity 0.15s ease;
      font-size: 9px;
      word-break: break-all;
      max-width: 100%;
      padding: 0 2px;
    }

    .cc-scale-step:hover .cc-scale-step__hex {
      opacity: 1;
    }

    .cc-gradient-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
      margin-bottom: 2.5rem;
    }

    .cc-gradient-card {
      border-radius: var(--spectrum-sys-shape-corner-medium, 12px);
      overflow: hidden;
      border: 1px solid var(--spectrum-color-outline-variant, #c2c7cf);
    }

    .cc-gradient-card__preview {
      height: 120px;
    }

    .cc-gradient-card__info {
      padding: 10px 12px;
      background: var(--spectrum-color-surface, #f6f6f6);
    }

    .cc-gradient-card__var {
      display: block;
      font-size: 12px;
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      color: var(--spectrum-color-on-surface, #333);
      font-weight: 600;
    }

    .cc-gradient-card__value {
      display: block;
      font-size: 10px;
      font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
      color: var(--spectrum-color-on-surface-variant, #42474e);
      margin-top: 4px;
      word-break: break-all;
      line-height: 1.4;
    }

    .cc-divider {
      border: none;
      border-top: 1px solid var(--spectrum-color-outline-variant, #c2c7cf);
      margin: 1rem 0 2rem 0;
    }
  </style>
`;

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

function renderSwatchGrid(swatches: ColorSwatch[], wide = false): TemplateResult {
  return html`
    <div class="cc-grid ${wide ? 'cc-grid--wide' : ''}">
      ${swatches.map(s => html`
        <div class="cc-swatch">
          <div
            class="cc-swatch__color"
            style="background-color: var(${s.variable}, ${s.hex}); color: ${s.lightText ? '#fff' : '#1a1a1a'};"
          >
            ${s.label}
          </div>
          <div class="cc-swatch__info">
            <code class="cc-swatch__var">${s.variable}</code>
            <code class="cc-swatch__hex">${s.hex}</code>
          </div>
        </div>
      `)}
    </div>
  `;
}

function renderScaleStrip(scale: ColorScale): TemplateResult {
  return html`
    <h3 class="cc-scale-title">${scale.name}</h3>
    <div class="cc-scale-strip">
      ${scale.swatches.map(s => html`
        <div
          class="cc-scale-step"
          style="background-color: var(${s.variable}, ${s.hex}); color: ${s.lightText ? '#fff' : '#1a1a1a'};"
        >
          <span class="cc-scale-step__label">${s.label}</span>
          <span class="cc-scale-step__hex">${s.variable}<br>${s.hex}</span>
        </div>
      `)}
    </div>
  `;
}

function renderGradientGrid(gradients: GradientSwatch[]): TemplateResult {
  return html`
    <div class="cc-gradient-grid">
      ${gradients.map(g => html`
        <div class="cc-gradient-card">
          <div
            class="cc-gradient-card__preview"
            style="background: var(${g.variable}, ${g.value});"
          ></div>
          <div class="cc-gradient-card__info">
            <code class="cc-gradient-card__var">${g.variable}</code>
            <code class="cc-gradient-card__value">${g.value}</code>
          </div>
        </div>
      `)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const AllColors: Story = {
  render: () => html`
    ${sharedStyles}
    <div class="cc-container">
      <h2 class="cc-section-title">Base Palette</h2>
      <p class="cc-section-desc">Core UNOPS brand colors defined as <code>--unops-color-*</code> variables.</p>
      ${renderSwatchGrid(BASE_COLORS)}

      <hr class="cc-divider" />

      <h2 class="cc-section-title">Material 3 Theme Tokens</h2>
      <p class="cc-section-desc">Dynamic theme tokens using <code>--spectrum-color-*</code> naming. These update when the theme source color changes.</p>
      ${renderSwatchGrid(THEME_COLORS, true)}

      <hr class="cc-divider" />

      <h2 class="cc-section-title">System Semantic Tokens</h2>
      <p class="cc-section-desc">Semantic tokens using <code>--spectrum-sys-color-*</code> naming, including interactive state variants (hover, active, disabled, container).</p>
      ${renderSwatchGrid(SYSTEM_COLORS, true)}

      <hr class="cc-divider" />

      <h2 class="cc-section-title">Color Scales</h2>
      <p class="cc-section-desc">UNOPS brand color scales from 50 (lightest) to 900 (darkest). Hover a step to reveal the variable name and hex value.</p>
      ${COLOR_SCALES.map(scale => renderScaleStrip(scale))}

      <h3 class="cc-scale-title">Neutrals</h3>
      ${renderSwatchGrid(NEUTRAL_COLORS)}

      <hr class="cc-divider" />

      <h2 class="cc-section-title">Gradients</h2>
      <p class="cc-section-desc">UNOPS brand gradients defined as <code>--unops-gradient-*</code> variables.</p>
      ${renderGradientGrid(GRADIENTS)}
    </div>
  `,
};

export const BaseColors: Story = {
  render: () => html`
    ${sharedStyles}
    <div class="cc-container">
      <h2 class="cc-section-title">Base Palette</h2>
      <p class="cc-section-desc">
        The foundational UNOPS brand colors. These are the raw color values that the semantic and theme tokens reference.
        Defined in <code>spectrum-variables.css</code> as <code>--unops-color-*</code>.
      </p>
      ${renderSwatchGrid(BASE_COLORS)}
    </div>
  `,
};

export const ThemeColors: Story = {
  render: () => html`
    ${sharedStyles}
    <div class="cc-container">
      <h2 class="cc-section-title">Material 3 Theme Tokens</h2>
      <p class="cc-section-desc">
        The full Material 3 color scheme using <code>--spectrum-color-*</code> naming.
        These are dynamically generated by <code>spectrum-theme</code> from a source color and update at runtime.
        Default values shown here come from the static fallbacks in <code>spectrum-variables.css</code>.
      </p>
      ${renderSwatchGrid(THEME_COLORS, true)}
    </div>
  `,
};

export const SystemColors: Story = {
  render: () => html`
    ${sharedStyles}
    <div class="cc-container">
      <h2 class="cc-section-title">System Semantic Tokens</h2>
      <p class="cc-section-desc">
        Semantic system tokens using <code>--spectrum-sys-color-*</code> naming.
        These include the core semantic roles (primary, secondary, success, warning, danger) as well as
        interactive state variants (hover, active, disabled) and container colors used across components.
      </p>
      ${renderSwatchGrid(SYSTEM_COLORS, true)}
    </div>
  `,
};

export const ColorScales: Story = {
  render: () => html`
    ${sharedStyles}
    <div class="cc-container">
      <h2 class="cc-section-title">Color Scales</h2>
      <p class="cc-section-desc">
        Six UNOPS brand color palettes, each with 10 steps from 50 (lightest) to 900 (darkest).
        Defined in <code>spectrum-colors.css</code> as <code>--unops-color-{palette}-{step}</code>.
        Hover over a step to see its variable name and hex value.
      </p>
      ${COLOR_SCALES.map(scale => renderScaleStrip(scale))}

      <h3 class="cc-scale-title">Neutrals</h3>
      <p class="cc-section-desc">Two neutral tones for subtle backgrounds.</p>
      ${renderSwatchGrid(NEUTRAL_COLORS)}
    </div>
  `,
};

export const GradientColors: Story = {
  name: 'Gradients',
  render: () => html`
    ${sharedStyles}
    <div class="cc-container">
      <h2 class="cc-section-title">Gradients</h2>
      <p class="cc-section-desc">
        Eight UNOPS brand gradients defined as <code>--unops-gradient-*</code> variables.
        These can be applied as <code>background</code> values.
      </p>
      ${renderGradientGrid(GRADIENTS)}
    </div>
  `,
};
