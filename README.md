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