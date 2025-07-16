import { html } from 'lit';

export const HeroVariantDefault = () => html`
  <spectrum-hero 
    variant="default"
    title="Default Hero"
    subtitle="Standard hero section with medium height"
    primaryButtonText="Action"
    primaryButtonAction="action">
  </spectrum-hero>
`;

export const HeroVariantBanner = () => html`
  <spectrum-hero 
    variant="banner"
    title="Banner Hero"
    subtitle="Horizontal banner style for promotions"
    primaryButtonText="Shop Now"
    primaryButtonAction="shop">
  </spectrum-hero>
`;

export const HeroVariantCompact = () => html`
  <spectrum-hero 
    variant="compact"
    title="Compact Hero"
    subtitle="Reduced height for secondary pages"
    primaryButtonText="Continue"
    primaryButtonAction="continue">
  </spectrum-hero>
`; 