import { html } from 'lit';

export const HeroCarousel = () => html`
  <spectrum-hero carousel="true" autoplay="true" autoplayInterval="5000">
    <spectrum-hero-slide 
      backgroundImage="https://picsum.photos/1200/600?random=1"
      title="First Feature"
      subtitle="Discover our innovative solutions"
      primaryButtonText="Explore"
      primaryButtonAction="explore-1">
    </spectrum-hero-slide>
    <spectrum-hero-slide 
      backgroundImage="https://picsum.photos/1200/600?random=2"
      title="Second Feature"
      subtitle="Streamline your workflow"
      primaryButtonText="Try Now"
      primaryButtonAction="try-2">
    </spectrum-hero-slide>
  </spectrum-hero>
`;

export const HeroFullScreen = () => html`
  <spectrum-hero 
    variant="full-screen"
    backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    title="Full Screen Impact"
    subtitle="Maximum visual impact for landing pages"
    primaryButtonText="Get Started"
    primaryButtonAction="get-started"
    textAlign="center">
  </spectrum-hero>
`; 