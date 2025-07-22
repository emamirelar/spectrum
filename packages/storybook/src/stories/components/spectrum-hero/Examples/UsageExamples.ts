import { html } from 'lit';

export const LandingPageHero = () => html`
  <spectrum-hero 
    backgroundImage="https://picsum.photos/1200/600?business"
    title="Transform Your Business"
    subtitle="Enterprise solutions that drive growth and innovation"
    primaryButtonText="Start Free Trial"
    primaryButtonAction="start-trial"
    secondaryButtonText="Schedule Demo"
    secondaryButtonAction="schedule-demo"
    overlay="true"
    overlayOpacity="0.4">
  </spectrum-hero>
`;

export const ProductShowcase = () => html`
  <spectrum-hero 
    backgroundImage="https://picsum.photos/1200/600?tech"
    title="Next-Gen Technology"
    subtitle="Revolutionary features that change everything"
    primaryButtonText="Learn More"
    primaryButtonAction="learn-more"
    variant="banner"
    textAlign="left"
    contentPosition="center">
  </spectrum-hero>
`; 