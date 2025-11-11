# UNOPS 🌈 Spectrum Design System

Inspired by - [stencil-storybook-boilerplate](https://artursopelnik.github.io/stencil-storybook-boilerplate/)

A robust design systems for React, Remix, Next.js, Vue, Angular or Vanilla JS Application ✨ with [Stencil](https://github.com/ionic-team/stencil), [Storybook](https://github.com/storybookjs/storybook), [Vite](https://github.com/vitejs/vite) and [TypeScript](https://github.com/microsoft/TypeScript). 

For Storybook, we use the most commonly used integration for web components with Lit, Vite and TypeScript, so you
already have a basic implementation of buttons, headers etc. Lit is not required and therefore basically
optional. When writing stories for web components built with Stencil, you don't have to use it, but you can, if you
want, perform more advanced operations using the HTML tag for example.

## 💡 Requirements

- Node.js 20
- Git

## 🚀 Getting Started

To start working with this designsystem, clone this repo to a new directory:

```bash
git clone
```

## 📋 Changelog & Documentation

The Spectrum Design System maintains a comprehensive changelog integrated with Storybook to track all changes, updates, and releases. This system is powered by Cursor AI rules that help maintain consistency and completeness.

### 📍 Changelog Location

- **Primary Changelog**: [`packages/storybook/src/stories/changelog.mdx`](packages/storybook/src/stories/changelog.mdx)
- **Storybook View**: Documentation → Changelog (when running Storybook)
- **Template Reference**: [`packages/storybook/src/stories/changelog-template.md`](packages/storybook/src/stories/changelog-template.md)
- **Cursor Rules**: [`.cursor/rules/changelog.mdc`](.cursor/rules/changelog.mdc)

### 🔄 Changelog Workflow

#### When Generating New Components

1. **Generate the component** using Stencil:
   ```bash
   cd packages/core
   npm run generate spectrum-new-component
   ```

2. **Request changelog update** from Cursor AI:
   ```
   "Update the changelog for the new spectrum-new-component"
   ```

3. **AI will automatically**:
   - Add entry to the "Unreleased" section
   - Follow the established format and conventions
   - Update component dependency map if needed
   - Ensure proper semantic versioning alignment

#### Manual Changelog Updates

For bug fixes, changes, or other updates:

1. **Use the template** in `packages/storybook/src/stories/changelog-template.md`
2. **Follow the format**:
   ```markdown
   ### Category
   - **spectrum-component-name**: Description of change
   ```
3. **Add to appropriate section** in `changelog.mdx`

### 📝 Changelog Format

The changelog follows [Keep a Changelog](https://keepachangelog.com/) standards with these categories:

- **🆕 Added**: New features, components, or functionality
- **🔄 Changed**: Changes to existing functionality  
- **🐛 Fixed**: Bug fixes and patches
- **📝 Deprecated**: Features marked for removal
- **🗑️ Removed**: Removed features or components
- **🔒 Security**: Security-related changes

### 🎯 Version Management

- **Semantic Versioning**: Follows SemVer (`MAJOR.MINOR.PATCH`)
- **Pre-releases**: Format `MAJOR.MINOR.PATCH-alpha.N`
- **Version Source**: `packages/core/package.json`
- **Release Process**: Update changelog → Update package.json → Commit together

### 🤖 AI-Assisted Maintenance

The changelog system includes Cursor AI rules that:
- Maintain consistent formatting across all entries
- Ensure breaking changes are properly marked with `⚠️ BREAKING CHANGE:`
- Validate version alignment with package.json
- Provide migration instructions for breaking changes
- Cross-reference with component dependency maps

### ✅ Pre-Release Checklist

Before publishing any release:
- [ ] All changes since last release documented
- [ ] Version number matches `packages/core/package.json`
- [ ] Breaking changes clearly marked with migration paths
- [ ] Component dependency map updated
- [ ] Date format is dd/mmm/yy (e.g., 11/Nov/25)
- [ ] Grammar and spelling checked
- [ ] Storybook renders changelog correctly

## 📥 Installation

To install the package in your project:

1. **Configure npm to use the GCP Artifact Registry** by creating or updating your `.npmrc` file:
   ```bash
   # Create or update .npmrc file
   echo "@unops-itg-npm:registry=https://europe-west1-npm.pkg.dev/unops-itg-artifacts-prod/unops-itg-npm/" > .npmrc
   ```

2. **Authenticate with GCP Artifact Registry:**
   ```bash
   # Install Google Cloud CLI if you haven't already
   # https://cloud.google.com/sdk/docs/install

   # Login to GCP
   gcloud auth login

   # This command will:
   # 1. Get a fresh GCP access token
   # 2. Use it to authenticate with npm
   # 3. Store the token in your .npmrc file
   gcloud auth print-access-token | npm login --registry=https://europe-west1-npm.pkg.dev/unops-itg-artifacts-prod/unops-itg-npm/ --always-auth
   ```

3. **Install the package:**
   ```bash
   npm install @unops-itg-npm/cpit-spectrum
   ```

## 👩‍💻 Usage

1. Install dependencies: `npm install`
2. Navigate to the stencil core package: `cd /packages/core` and build it with: `npm run build`. To generate a new component, run: 
```bash
npm run generate <sub-folder>
```
4. Go to the Storybook package: `cd /packages/storybook`
    - Use `npm run storybook.run` to monitor only the stories for changes in Storybook.
    - Use `npm run storybook` to also watch for changes in the web component itself.

## 📚 Storybook Development & Deployment

Storybook serves as our component documentation and development environment. This section covers running, building, and deploying Storybook.

### 🚀 Running Storybook Locally

#### Quick Start
Navigate to the Storybook package directory:
```bash
cd packages/storybook
```

#### Development Modes

**1. Stories Only Mode** (Faster startup)
```bash
npm run storybook.run
```
- Monitors only story files for changes
- Best for writing/editing stories
- Faster hot reload
- Port: `http://localhost:6006`

**2. Full Development Mode** (Complete hot reload)
```bash
npm run storybook
```
- Watches both stories AND core component changes
- Automatically rebuilds components when modified
- Best for component development
- Runs concurrently with core package watch mode
- Port: `http://localhost:6006`

#### Prerequisites
Ensure core components are built before running Storybook:
```bash
cd packages/core
npm run build
cd ../storybook
npm run storybook
```

### 🏗️ Building Storybook for Production

#### Standard Build
```bash
cd packages/storybook
npm run build-storybook
```
- Creates optimized static files in `storybook-static/`
- Ready for deployment to any static hosting service

#### CI/CD Build (with base path)
```bash
cd packages/storybook
npm run build-storybook-ci
```
- Builds with custom base path for GitHub Pages deployment
- Sets `BASE_PATH=/stencil-storybook-boilerplate/`
- Configured for automated deployments

#### Preview Built Storybook
```bash
cd packages/storybook
npm run preview-storybook
```
- Serves the built `storybook-static/` folder locally
- Test production build before deployment
- Uses `http-server` on a local port

### 🚀 Deploying Storybook

#### GitHub Pages Deployment
Automated deployment to GitHub Pages:

**Prerequisites:**
1. **GitHub Repository**: Ensure your repository is hosted on GitHub
2. **GitHub Pages Enabled**: Enable GitHub Pages in repository settings
3. **Branch Permissions**: Ensure you have push access to create/update the `gh-pages` branch
4. **Git Configuration**: Verify git is configured with your GitHub credentials

**Setup GitHub Pages (First Time):**
1. Go to your repository's **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **gh-pages** branch (will be created automatically on first deploy)
4. Choose **/ (root)** folder
5. Click **Save**

**Deploy Command:**
```bash
cd packages/storybook
npm run deploy-storybook
```

**What this script does:**
- Uses `@storybook/storybook-deployer` package (`storybook-to-ghpages`)
- Builds Storybook for production automatically
- Creates or updates the `gh-pages` branch in your repository
- Pushes the built static files to the `gh-pages` branch
- GitHub Pages automatically serves the content from this branch

**Deployment Process:**
1. **Build**: Automatically runs `storybook build` 
2. **Commit**: Creates a commit with built files on `gh-pages` branch
3. **Push**: Pushes the `gh-pages` branch to GitHub
4. **Deploy**: GitHub Pages automatically deploys the new content (may take 1-10 minutes)

**Expected Output:**
```bash
> storybook-to-ghpages

Building storybook
Built storybook files to storybook-static/
Deploying to gh-pages branch
Published to https://yourusername.github.io/your-repo-name/
```

**Access Your Deployed Storybook:**
- URL format: `https://[username].github.io/[repository-name]/`
- Example: `https://unops.github.io/cpit-spectrum/`

**Troubleshooting GitHub Pages:**
- **Permission denied**: Ensure you have push access to the repository
- **gh-pages branch not found**: Will be created automatically on first deploy
- **Build fails**: Run `npm run build-storybook` locally first to check for errors
- **Deploy but not updating**: GitHub Pages can take up to 10 minutes to reflect changes
- **404 errors**: Check that GitHub Pages is enabled and pointing to gh-pages branch

#### Manual Static Hosting
For other hosting services (Netlify, Vercel, AWS S3, etc.):
```bash
# 1. Build for production
npm run build-storybook

# 2. Upload the storybook-static/ folder to your hosting service
# The contents of storybook-static/ are your deployable files
```

#### Deployment Checklist
Before deploying:
- [ ] All core components built (`cd packages/core && npm run build`)
- [ ] Stories updated and tested locally
- [ ] Build successful (`npm run build-storybook`)
- [ ] No broken links or missing assets
- [ ] Components render correctly in production build

### 🔧 Storybook Configuration

#### Key Configuration Files
```
packages/storybook/
├── .storybook/
│   ├── main.ts          # Storybook configuration
│   └── preview.ts       # Global decorators and parameters
├── src/stories/         # Story files (.stories.ts)
├── package.json         # Storybook dependencies and scripts
└── vite.config.ts       # Vite configuration for Storybook
```

#### Adding New Stories
Create story files in `packages/storybook/src/stories/components/`:
```typescript
// spectrum-new-component.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/spectrum-new-component',
  component: 'spectrum-new-component',
  parameters: {
    docs: {
      description: {
        component: 'Description of your component...'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <spectrum-new-component>
      Content here
    </spectrum-new-component>
  `
};
```

### 🎯 Storybook Best Practices

#### Story Organization
- Group stories by component type: `Components/spectrum-*`
- Use descriptive story names: `Default`, `WithIcon`, `Loading`, etc.
- Include comprehensive examples and edge cases

#### Documentation
- Add component descriptions in story metadata
- Document all props and their types
- Include usage examples and code snippets
- Link to relevant design system documentation

#### Testing
```bash
# Run Storybook tests
npm run test-storybook
```
- Visual regression testing with Storybook
- Accessibility testing with a11y addon
- Interaction testing with @storybook/test

### 📦 Storybook Dependencies

#### Core Dependencies
- **@storybook/web-components**: Web components support
- **@storybook/web-components-vite**: Vite integration
- **lit**: Template rendering for stories
- **vite**: Build tool and dev server

#### Essential Addons
- **@storybook/addon-essentials**: Controls, docs, actions, etc.
- **@storybook/addon-a11y**: Accessibility testing
- **@storybook/addon-links**: Story navigation
- **@storybook/blocks**: Documentation blocks

#### Development Tools
- **concurrently**: Run multiple commands simultaneously
- **http-server**: Preview built Storybook locally
- **storybook-deployer**: Deploy to GitHub Pages

### 🚨 Troubleshooting

#### Common Issues

**Storybook won't start:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Components not updating:**
```bash
# Rebuild core components
cd packages/core
npm run build
cd ../storybook
npm run storybook
```

**Build failures:**
```bash
# Check for TypeScript errors
npm run build-storybook 2>&1 | grep -i error
```

**Port conflicts:**
```bash
# Change default port (6006)
npx storybook dev -p 6007
```

### 🔗 Related Resources
- [Storybook Documentation](https://storybook.js.org/docs)
- [Web Components in Storybook](https://storybook.js.org/docs/web-components/get-started)
- [Stencil Component Integration](https://stenciljs.com/docs/storybook)
- [Spectrum Component Documentation](?path=/docs/documentation-dependency-map--docs)

## 🐛 Debug Logging

Several Spectrum components support debug logging to help with development and troubleshooting. You can enable debug logging by adding the `debug` attribute to components that support it.

### Components with Debug Support

The following components support debug logging:

- **spectrum-wallpaper**: Logs color extraction, theme generation, and image loading processes
- **spectrum-theme**: Logs theme configuration parsing and validation issues
- **spectrum-collapsible-list**: Logs context menu interactions and item lookup operations
- **spectrum-conversation-panel**: Logs message parsing, action parsing, and URL validation

### How to Enable Debug Logging

Add the `debug` attribute to any supported component:

```html
<!-- Enable debug logging for wallpaper component -->
<spectrum-wallpaper debug background="url('image.jpg')">
</spectrum-wallpaper>

<!-- Enable debug logging for theme component -->
<spectrum-theme debug color="#0070d2">
</spectrum-theme>

<!-- Enable debug logging for collapsible list -->
<spectrum-collapsible-list debug items='[{"label": "Item 1", "id": "1"}]'>
</spectrum-collapsible-list>

<!-- Enable debug logging for conversation panel -->
<spectrum-conversation-panel debug messages='[{"sender": "request", "message": "Hello"}]'>
</spectrum-conversation-panel>
```

### What Gets Logged

When debug mode is enabled, components will log:

- **spectrum-wallpaper**: 
  - Image loading success/failure
  - Color extraction from images and backgrounds
  - Theme generation and application processes
  - CSS custom property applications

- **spectrum-theme**: 
  - Theme configuration parsing errors
  - Invalid configuration warnings

- **spectrum-collapsible-list**: 
  - Context menu interaction issues
  - Item lookup failures
  - Missing DOM element warnings

- **spectrum-conversation-panel**: 
  - Message parsing errors
  - Action configuration parsing errors
  - Invalid URL warnings

### Debug Log Format

All debug logs are prefixed with the component name for easy identification:

```
[spectrum-wallpaper] Image loaded successfully: https://example.com/image.jpg
[spectrum-theme] Invalid theme configuration: SyntaxError: Unexpected token
[spectrum-collapsible-list] Missing icon element for item: {id: "item1", label: "Item 1"}
[spectrum-conversation-panel] Failed to parse messages: SyntaxError: Unexpected end of JSON input
```

### Best Practices

- Only enable debug logging during development
- Remove debug attributes from production code
- Use debug logging to troubleshoot component configuration issues
- Debug logs use appropriate console levels (log, warn, error) based on severity
  
## 👏 Contributing
- Please open an [issue](https://github.com/.../issues) first to discuss what you would like to change.
- Please make sure to update tests as appropriate.

## 📩 Contact
📧 [Ema Rogobete](emamirelar@unops.org) or [Justin Waugh](justinwa@unops.org)

## License
MIT &copy; [UNOPS](https://www.unops.org)

## 📦 Publishing the Core Package

To publish a new version of the core package to the GCP Artifact Registry:

1. **Increment the version** in `packages/core/package.json` (e.g., bump the alpha version).
2. **Navigate to the core package directory:**
   ```bash
   cd packages/core
   ```
3. **Authenticate with GCP Artifact Registry:**
   ```bash
   gcloud auth login
   export NPM_TOKEN=$(gcloud auth print-access-token)  
   ```
4. **Publish the package:**
   ```bash
   npm publish
   ```

> **Note:**
> - The `publish` script has been removed from `package.json` to prevent double publishing.
> - The registry is configured via the root `.npmrc` file.
> - If you see a version error, increment the version again and retry.