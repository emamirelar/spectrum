import { html } from 'lit';

export const HeroDefault = () => html`
  <spectrum-hero 
    title="Welcome to Our Platform"
    subtitle="Discover amazing features that will transform your workflow"
    primaryButtonText="Get Started"
    primaryButtonAction="get-started">
  </spectrum-hero>
`;

export const HeroWithBackground = () => html`
  <spectrum-hero 
    backgroundImage="https://picsum.photos/1200/600"
    title="Innovation in Motion"
    subtitle="Experience the future of digital solutions"
    primaryButtonText="Watch Demo"
    primaryButtonAction="watch-demo"
    secondaryButtonText="Learn More"
    secondaryButtonAction="learn-more">
  </spectrum-hero>
`;

export const HeroCompact = () => html`
  <spectrum-hero 
    variant="compact"
    title="Page Header"
    subtitle="Concise hero for internal pages"
    primaryButtonText="Action"
    primaryButtonAction="action">
  </spectrum-hero>
`; 