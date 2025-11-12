/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */

export { format } from './utils/utils';
export { getSpectrumVersion, getSpectrumInfo, logSpectrumVersion, SPECTRUM_VERSION } from './utils/version';
export type * from './components.d.ts';

// Export components
export { SpectrumWallpaper } from './components/spectrum-wallpaper/spectrum-wallpaper';
export { SpectrumButton } from './components/spectrum-button/spectrum-button';
export { SpectrumChip } from './components/spectrum-chip/spectrum-chip';
export { SpectrumSearchInput } from './components/spectrum-search-input/spectrum-search-input';
export { SpectrumTheme } from './components/spectrum-theme/spectrum-theme';
export { SpectrumPanel } from './components/spectrum-panel/spectrum-panel';
export { SpectrumImageGallery } from './components/spectrum-image-gallery/spectrum-image-gallery';
export { SpectrumToast } from './components/spectrum-toast/spectrum-toast';
export { SpectrumSelect } from './components/spectrum-select/spectrum-select';
export { SpectrumSwitch } from './components/spectrum-switch/spectrum-switch';
export { SpectrumAccordion } from './components/spectrum-accordion/spectrum-accordion';
export { SpectrumHero } from './components/spectrum-hero/spectrum-hero';
export { SpectrumBadge } from './components/spectrum-badge/spectrum-badge';
export { SpectrumMenu } from './components/spectrum-menu/spectrum-menu';
export { SpectrumDialog } from './components/spectrum-dialog/spectrum-dialog';
export { SpectrumSearchResults } from './components/spectrum-search-results/spectrum-search-results';
export { SpectrumCard } from './components/spectrum-card/spectrum-card';
export { SpectrumWizard } from './components/spectrum-wizard/spectrum-wizard';
export { SpectrumMediaLibrary } from './components/spectrum-media-library/spectrum-media-library';

// Export CSS variables for independent use
import './styles/spectrum-variables.css';

// Export component types and interfaces
export type { SpectrumSelectOption } from './components/spectrum-select/spectrum-select';
export type { HeroSlide } from './components/spectrum-hero/spectrum-hero';
export type { BackgroundLevel } from './components/spectrum-panel/spectrum-panel';
export type { BadgeVariant, BadgeSize } from './components/spectrum-badge/spectrum-badge';
export type { SearchResult, SearchResultsData, PaginationOptions, SearchResultActionPayload, PaginationActionPayload, SearchResultsTranslations } from './components/spectrum-search-results/spectrum-search-results';
export type { CardVariant, CardSize } from './components/spectrum-card/spectrum-card';
export type { WizardStep, WizardStepChangeEvent, WizardCompleteEvent } from './components/spectrum-wizard/spectrum-wizard';
export type { MediaItem, MediaActionPayload } from './components/spectrum-media-library/spectrum-media-library';
