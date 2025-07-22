#!/usr/bin/env node

/**
 * Bulk Component Analyzer
 * 
 * Scans all Spectrum components and generates comprehensive analysis for
 * automated documentation generation and property binding conversion.
 */

const fs = require('fs');
const path = require('path');

const CORE_COMPONENTS_PATH = 'packages/core/src/components';
const STORYBOOK_STORIES_PATH = 'packages/storybook/src/stories/components';

/**
 * Get all component directories
 */
function getAllComponents() {
  return fs.readdirSync(CORE_COMPONENTS_PATH)
    .filter(name => name.startsWith('spectrum-'))
    .filter(name => fs.statSync(path.join(CORE_COMPONENTS_PATH, name)).isDirectory());
}

/**
 * Analyze component for comprehensive metadata
 */
function analyzeComponentDetailed(componentName) {
  const componentPath = path.join(CORE_COMPONENTS_PATH, componentName, `${componentName}.tsx`);
  
  if (!fs.existsSync(componentPath)) {
    return null;
  }

  const content = fs.readFileSync(componentPath, 'utf8');
  
  // Extract comprehensive prop information
  const propRegex = /@Prop\(\s*(\{[^}]*\})?\s*\)\s+([^:]+):\s*([^;=]+)(?:\s*=\s*([^;]+))?;/g;
  const props = [];
  let propMatch;
  
  while ((propMatch = propRegex.exec(content)) !== null) {
    const [, options, name, type, defaultValue] = propMatch;
    
    // Parse prop options
    let reflect = false;
    let mutable = false;
    let attribute = name;
    
    if (options) {
      reflect = options.includes('reflect: true');
      mutable = options.includes('mutable: true');
      const attrMatch = options.match(/attribute:\s*['"]([^'"]+)['"]/);
      if (attrMatch) {
        attribute = attrMatch[1];
      }
    }
    
    props.push({
      name: name.trim(),
      type: type.trim(),
      defaultValue: defaultValue ? defaultValue.trim() : undefined,
      attribute,
      reflect,
      mutable,
      description: '' // To be enhanced with AI/templates
    });
  }

  // Extract events with full metadata
  const eventRegex = /@Event\(\s*\{([^}]*)\}\s*\)\s+([^:]+):\s*EventEmitter<([^>]+)>/g;
  const events = [];
  let eventMatch;
  
  while ((eventMatch = eventRegex.exec(content)) !== null) {
    const [, options, property, payload] = eventMatch;
    
    let eventName = property.trim();
    let composed = false;
    let cancelable = false;
    let bubbles = false;
    
    if (options) {
      const nameMatch = options.match(/eventName:\s*['"]([^'"]+)['"]/);
      if (nameMatch) {
        eventName = nameMatch[1];
      }
      composed = options.includes('composed: true');
      cancelable = options.includes('cancelable: true');
      bubbles = options.includes('bubbles: true');
    }
    
    events.push({
      name: eventName,
      property: property.trim(),
      payload: payload.trim(),
      composed,
      cancelable,
      bubbles
    });
  }

  // Extract methods
  const methodRegex = /@Method\(\)\s+async\s+([^(]+)\([^)]*\):\s*Promise<([^>]+)>/g;
  const methods = [];
  let methodMatch;
  
  while ((methodMatch = methodRegex.exec(content)) !== null) {
    methods.push({
      name: methodMatch[1].trim(),
      returnType: methodMatch[2].trim(),
      async: true
    });
  }

  // Extract component metadata
  const componentRegex = /@Component\(\s*\{([^}]*)\}\s*\)/;
  const componentMatch = content.match(componentRegex);
  let tag = componentName;
  let shadow = false;
  let scoped = false;
  
  if (componentMatch) {
    const options = componentMatch[1];
    const tagMatch = options.match(/tag:\s*['"]([^'"]+)['"]/);
    if (tagMatch) {
      tag = tagMatch[1];
    }
    shadow = options.includes('shadow: true');
    scoped = options.includes('scoped: true');
  }

  // Extract CSS custom properties
  const cssVarMatches = [...content.matchAll(/--([a-z-]+)/g)];
  const cssProperties = [...new Set(cssVarMatches.map(match => `--${match[1]}`))];

  // Extract slots
  const slotMatches = [...content.matchAll(/<slot[^>]*(?:name=['"]([^'"]+)['"])?/g)];
  const slots = slotMatches.map(match => ({
    name: match[1] || 'default',
    description: match[1] ? `Named slot: ${match[1]}` : 'Default slot content'
  }));

  // Check for existing documentation
  const storybookDir = path.join(STORYBOOK_STORIES_PATH, componentName);
  const hasStories = fs.existsSync(path.join(storybookDir, `${componentName}.stories.tsx`)) || 
                     fs.existsSync(path.join(storybookDir, `${componentName}.stories.ts`));
  const hasReadme = fs.existsSync(path.join(storybookDir, 'README.md'));
  const hasDependencies = fs.existsSync(path.join(storybookDir, `${componentName}-dependencies.mdx`));
  const hasUseCases = fs.existsSync(path.join(storybookDir, `${componentName}-use-cases.mdx`));

  return {
    name: componentName,
    tag,
    shadow,
    scoped,
    props,
    events,
    methods,
    slots,
    cssProperties,
    documentation: {
      hasStories,
      hasReadme,
      hasDependencies,
      hasUseCases,
      completeness: [hasStories, hasReadme, hasDependencies, hasUseCases].filter(Boolean).length / 4
    },
    analysis: {
      complexity: props.length + events.length + methods.length,
      hasDefaultProps: props.some(p => p.defaultValue),
      hasEvents: events.length > 0,
      hasMethods: methods.length > 0,
      hasSlots: slots.length > 0
    }
  };
}

/**
 * Generate comprehensive analysis report
 */
function generateAnalysisReport(components) {
  const totalComponents = components.length;
  const documented = components.filter(c => c.documentation.completeness === 1).length;
  const partiallyDocumented = components.filter(c => c.documentation.completeness > 0 && c.documentation.completeness < 1).length;
  const undocumented = components.filter(c => c.documentation.completeness === 0).length;
  
  const report = {
    summary: {
      totalComponents,
      documented,
      partiallyDocumented,
      undocumented,
      documentationCoverage: (documented / totalComponents * 100).toFixed(1)
    },
    components: components.map(c => ({
      name: c.name,
      completeness: c.documentation.completeness,
      propsCount: c.props.length,
      eventsCount: c.events.length,
      methodsCount: c.methods.length,
      complexity: c.analysis.complexity,
      needsWork: c.documentation.completeness < 1
    })),
    recommendations: []
  };

  // Generate recommendations
  const highPriority = components
    .filter(c => c.documentation.completeness === 0 && c.analysis.complexity > 5)
    .sort((a, b) => b.analysis.complexity - a.analysis.complexity);
  
  const mediumPriority = components
    .filter(c => c.documentation.completeness < 1 && c.documentation.completeness > 0)
    .sort((a, b) => (1 - a.documentation.completeness) * 100);

  const lowPriority = components
    .filter(c => c.documentation.completeness === 0 && c.analysis.complexity <= 5)
    .sort((a, b) => b.analysis.complexity - a.analysis.complexity);

  report.recommendations = [
    {
      priority: 'HIGH',
      reason: 'Complex components with no documentation',
      components: highPriority.slice(0, 5).map(c => c.name)
    },
    {
      priority: 'MEDIUM', 
      reason: 'Partially documented components',
      components: mediumPriority.slice(0, 5).map(c => c.name)
    },
    {
      priority: 'LOW',
      reason: 'Simple components without documentation',
      components: lowPriority.slice(0, 5).map(c => c.name)
    }
  ];

  return report;
}

/**
 * Generate batch processing suggestions
 */
function generateBatchSuggestions(components) {
  const undocumented = components.filter(c => c.documentation.completeness < 1);
  
  // Group by complexity
  const simple = undocumented.filter(c => c.analysis.complexity <= 3);
  const medium = undocumented.filter(c => c.analysis.complexity > 3 && c.analysis.complexity <= 8);
  const complex = undocumented.filter(c => c.analysis.complexity > 8);

  return {
    simple: {
      components: simple.map(c => c.name),
      estimatedTime: `${simple.length * 10} minutes`,
      batchCommand: `node scripts/generate-component-docs.js --batch ${simple.map(c => c.name).join(',')}`
    },
    medium: {
      components: medium.map(c => c.name),
      estimatedTime: `${medium.length * 20} minutes`,
      batchCommand: `node scripts/generate-component-docs.js --batch ${medium.map(c => c.name).join(',')}`
    },
    complex: {
      components: complex.map(c => c.name),
      estimatedTime: `${complex.length * 30} minutes`,
      recommendation: 'Handle individually with custom attention'
    }
  };
}

/**
 * Main analysis function
 */
function main() {
  console.log('🔍 Analyzing all Spectrum components...\n');
  
  const allComponents = getAllComponents();
  const analyzed = [];
  
  for (const componentName of allComponents) {
    console.log(`   Analyzing ${componentName}...`);
    const analysis = analyzeComponentDetailed(componentName);
    if (analysis) {
      analyzed.push(analysis);
    }
  }
  
  console.log(`\n✅ Analyzed ${analyzed.length} components\n`);
  
  // Generate reports
  const report = generateAnalysisReport(analyzed);
  const batchSuggestions = generateBatchSuggestions(analyzed);
  
  // Output summary
  console.log('📊 DOCUMENTATION COVERAGE SUMMARY');
  console.log('='.repeat(40));
  console.log(`Total Components: ${report.summary.totalComponents}`);
  console.log(`✅ Fully Documented: ${report.summary.documented}`);
  console.log(`🟡 Partially Documented: ${report.summary.partiallyDocumented}`);
  console.log(`❌ No Documentation: ${report.summary.undocumented}`);
  console.log(`📈 Coverage: ${report.summary.documentationCoverage}%\n`);
  
  // Output recommendations
  console.log('🎯 PRIORITY RECOMMENDATIONS');
  console.log('='.repeat(40));
  for (const rec of report.recommendations) {
    if (rec.components.length > 0) {
      console.log(`${rec.priority} PRIORITY (${rec.reason}):`);
      console.log(`   ${rec.components.join(', ')}\n`);
    }
  }
  
  // Output batch suggestions
  console.log('⚡ BATCH PROCESSING SUGGESTIONS');
  console.log('='.repeat(40));
  console.log('SIMPLE COMPONENTS (Quick wins):');
  console.log(`   Components: ${batchSuggestions.simple.components.join(', ')}`);
  console.log(`   Estimated time: ${batchSuggestions.simple.estimatedTime}`);
  console.log(`   Command: ${batchSuggestions.simple.batchCommand}\n`);
  
  console.log('MEDIUM COMPLEXITY:');
  console.log(`   Components: ${batchSuggestions.medium.components.join(', ')}`);
  console.log(`   Estimated time: ${batchSuggestions.medium.estimatedTime}`);
  console.log(`   Command: ${batchSuggestions.medium.batchCommand}\n`);
  
  if (batchSuggestions.complex.components.length > 0) {
    console.log('COMPLEX COMPONENTS:');
    console.log(`   Components: ${batchSuggestions.complex.components.join(', ')}`);
    console.log(`   Recommendation: ${batchSuggestions.complex.recommendation}\n`);
  }
  
  // Save detailed report
  const detailedReport = {
    timestamp: new Date().toISOString(),
    summary: report.summary,
    components: analyzed,
    recommendations: report.recommendations,
    batchSuggestions
  };
  
  fs.writeFileSync('component-analysis-report.json', JSON.stringify(detailedReport, null, 2));
  console.log('📁 Detailed report saved to: component-analysis-report.json');
  
  // Show next steps
  console.log('\n🚀 NEXT STEPS');
  console.log('='.repeat(40));
  console.log('1. Run batch commands above for quick documentation generation');
  console.log('2. Review and customize generated content for quality');
  console.log('3. Focus on high-priority complex components first');
  console.log('4. Use: node scripts/generate-component-docs.js <component-name> for individual components');
  console.log('5. Use: node scripts/generate-component-docs.js --all for everything at once');
}

if (require.main === module) {
  main();
}

module.exports = { analyzeComponentDetailed, generateAnalysisReport, generateBatchSuggestions }; 