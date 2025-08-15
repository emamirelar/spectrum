# Storybook Deployment Guide

This guide explains how to deploy Storybook to GitHub Pages while managing performance optimizations during development.

## Overview

The Storybook setup includes performance optimizations for development that disable heavy story files. For deployment, we need to ensure all stories are included in the published version.

## Available Scripts

### Development Scripts
- `npm run storybook` - Fast development mode (uses existing story state)
- `npm run storybook.fast` - Ultra-fast mode (disables heavy stories)
- `npm run storybook.dev` - Full development mode (includes core component rebuilding)
- `npm run storybook.restore` - Restore all disabled stories

### Build Scripts
- `npm run build-storybook` - Build complete Storybook (all stories restored)
- `npm run build-storybook-gh` - Build for GitHub Pages (all stories restored)
- `npm run build-storybook-ci` - Build for CI/CD (all stories restored)

### Deployment Scripts
- `npm run deploy-storybook` - Deploy to GitHub Pages (all stories restored)
- `npm run deploy-storybook-fast` - Deploy then return to fast mode for continued development

## Deployment Workflows

### Standard GitHub Pages Deployment
```bash
cd packages/storybook
npm run deploy-storybook
```

**What happens:**
1. ✅ Restores all stories (ensures complete documentation)
2. 🏗️ Builds Storybook with all components
3. 🚀 Deploys to GitHub Pages
4. 📝 Leaves all stories enabled for continued development

### GitHub Pages Deployment with Fast Mode Resume
```bash
cd packages/storybook
npm run deploy-storybook-fast
```

**What happens:**
1. ✅ Restores all stories
2. 🏗️ Builds and deploys complete Storybook
3. ⚡ Re-enables fast mode for continued development
4. 🎯 Perfect for active development cycles

### Manual CI/CD Deployment
```bash
cd packages/storybook
npm run build-storybook-ci
# Upload dist folder to your hosting platform
```

## Story Management During Development

### Enable Fast Mode (Development)
```bash
npm run storybook.fast
```
- Disables 4 heaviest story files (~6400 lines total)
- Reduces startup time by 60-80%
- Reduces hot reload time by 70-90%

### Restore All Stories
```bash
npm run storybook.restore
```
- Re-enables all story files
- Required before any deployment
- Use when you need to work with heavy components

### Check Current State
```bash
# Check if heavy stories are disabled (should show .backup files)
ls -la src/stories/components/*/spectrum-*.stories.tsx.backup

# Check if all stories are enabled (should show no .backup files)
ls -la src/stories/components/*/spectrum-*.stories.tsx.backup 2>/dev/null || echo "All stories enabled"
```

## Heavy Story Files
The following files are disabled in fast mode due to their size and complexity:

1. **spectrum-rail.stories.tsx** (1,602 lines)
   - Complex navigation examples with extensive data sets
   - Multiple state configurations and interaction patterns

2. **spectrum-conversation-panel.stories.tsx** (1,337 lines)
   - Rich messaging interfaces with source citations
   - Complex state management examples

3. **spectrum-image-gallery.stories.tsx** (1,441 lines)
   - Multiple gallery configurations with large datasets
   - Upload and interaction examples

4. **spectrum-theme.stories.tsx** (1,407 lines)
   - Comprehensive theming examples
   - Multiple color palette demonstrations

## Best Practices

### For Active Development
1. Use `npm run storybook.fast` for daily development
2. Only restore stories when working on those specific components
3. Use `npm run deploy-storybook-fast` to maintain development speed

### For Releases
1. Always use `npm run deploy-storybook` or `npm run build-storybook-gh`
2. Verify deployment includes all expected components
3. Test critical user flows in the deployed version

### For CI/CD Pipelines
1. Use `npm run build-storybook-ci` in automated deployments
2. The restore step is automatically included
3. No manual story management required

## Troubleshooting

### Stories Missing from Deployment
**Problem**: Some components missing from deployed Storybook
**Solution**: Ensure you used a build script that includes restore:
```bash
npm run storybook.restore
npm run build-storybook-gh
```

### Slow Development Experience
**Problem**: Storybook takes too long to start/reload
**Solution**: Use fast mode for development:
```bash
npm run storybook.fast
```

### Performance Mode Not Working
**Problem**: Fast mode script fails
**Solution**: Check if backup files exist and clean state:
```bash
npm run storybook.restore
npm run storybook.fast
```

## Script Dependencies

All deployment scripts automatically handle story restoration, so you don't need to manually manage story states during deployment workflows. The scripts are designed to be safe and idempotent - running them multiple times won't cause issues.