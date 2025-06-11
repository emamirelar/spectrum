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
export type * from './components.d.ts';

// Export components
export { SpectrumWallpaper } from './components/spectrum-wallpaper/spectrum-wallpaper';
export { SpectrumButton } from './components/spectrum-button/spectrum-button';
export { SpectrumSearchInput } from './components/spectrum-search-input/spectrum-search-input';
export { SpectrumTheme } from './components/spectrum-theme/spectrum-theme';
export { SpectrumImageGallery } from './components/spectrum-image-gallery/spectrum-image-gallery';
export { SpectrumToast } from './components/spectrum-toast/spectrum-toast';
export { SpectrumSelect } from './components/spectrum-select/spectrum-select';
export { SpectrumAccordion } from './components/spectrum-accordion/spectrum-accordion';

// Export CSS variables for independent use
import './styles/spectrum-variables.css';

// Export component types and interfaces
export type { SpectrumSelectOption } from './components/spectrum-select/spectrum-select';
