/**
 * Spectrum Component Library Version Information
 */

// Import package.json to get the actual version
import packageInfo from '../../package.json';

// Version is now read directly from package.json
export const SPECTRUM_VERSION = packageInfo.version;

/**
 * Get the current version of the Spectrum component library
 * @returns {string} The semantic version string
 */
export function getSpectrumVersion(): string {
  return SPECTRUM_VERSION;
}

/**
 * Get detailed version information about the Spectrum component library
 * @returns {object} Version information including name, version, and build details
 */
export function getSpectrumInfo() {
  return {
    name: packageInfo.name,
    version: SPECTRUM_VERSION,
    description: packageInfo.description,
    buildDate: new Date().toISOString(),
    components: 'spectrum-*'
  };
}

/**
 * Log the current Spectrum version to console
 * Useful for debugging and version verification
 */
export function logSpectrumVersion(): void {
  console.log(`Spectrum Components v${SPECTRUM_VERSION}`);
  console.log('For more info, call getSpectrumInfo()');
}

// Version logging is now handled by spectrum-theme component in debug mode 