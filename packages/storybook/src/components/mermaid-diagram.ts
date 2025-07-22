import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mermaid-diagram')
export class MermaidDiagram extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      margin: 2rem 0;
    }
    
    .mermaid-container {
      overflow: auto;
    }
    
    .error {
      color: #d32f2f;
      padding: 1rem;
      border: 1px solid #d32f2f;
      border-radius: 4px;
      background: #ffebee;
      font-family: monospace;
      text-align: left;
    }

    .fallback {
      color: #1976d2;
      padding: 1rem;
      border: 1px solid #1976d2;
      border-radius: 4px;
      background: #e3f2fd;
      font-family: monospace;
      text-align: left;
    }

    .loading {
      color: #666;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f9f9f9;
      text-align: center;
    }
  `;

  @property({ type: String })
  chart = '';

  @property({ type: String })
  chartId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  private initialized = false;
  private retryCount = 0;
  private maxRetries = 3;
  private mermaidModule: any = null;

  async firstUpdated() {
    // Show loading state while initializing
    this.showLoading();
    
    await this.initializeMermaid();
    
    if (this.chart && this.initialized) {
      await this.renderChart();
    }
  }

  private async initializeMermaid() {
    if (this.initialized) return;

    try {
      // Dynamic import with better error handling for GitHub Pages
      const mermaidModule = await this.loadMermaidModule();
      if (!mermaidModule) {
        throw new Error('Failed to load Mermaid module');
      }

      this.mermaidModule = mermaidModule;
      
      // Initialize mermaid with more conservative settings for GitHub Pages
      this.mermaidModule.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
        // Add error handling for GitHub Pages
        er: {
          useMaxWidth: true,
        },
        sequence: {
          useMaxWidth: true,
        },
      });
      
      this.initialized = true;
      console.log('Mermaid initialized successfully');
    } catch (error) {
      console.error('Mermaid initialization error:', error);
      this.showFallback();
    }
  }

  private async loadMermaidModule() {
    // Try multiple import strategies for better compatibility
    try {
      // First, try standard dynamic import
      const mermaid = await import('mermaid');
      return mermaid.default || mermaid;
    } catch (error) {
      console.warn('Standard import failed, trying alternative:', error);
      
      try {
        // Fallback: try importing as a static module if dynamic import fails
        const { default: mermaid } = await import('mermaid');
        return mermaid;
      } catch (fallbackError) {
        console.error('All import methods failed:', fallbackError);
        return null;
      }
    }
  }

  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('chart') && this.chart && this.initialized) {
      await this.renderChart();
    }
  }

  private async renderChart() {
    const container = this.shadowRoot?.querySelector('.mermaid-container');
    if (!container || !this.chart || !this.mermaidModule) return;

    try {
      // Clear previous content
      container.innerHTML = '';
      
      // Add retry logic for GitHub Pages
      const { svg } = await this.renderWithRetry();
      container.innerHTML = svg;
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      this.showError(error as Error);
    }
  }

  private async renderWithRetry(): Promise<{ svg: string }> {
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await this.mermaidModule.render(this.chartId, this.chart);
      } catch (error) {
        this.retryCount++;
        if (i === this.maxRetries - 1) {
          throw error;
        }
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
    throw new Error('Max retries exceeded');
  }

  private showLoading() {
    const container = this.shadowRoot?.querySelector('.mermaid-container');
    if (container) {
      container.innerHTML = `
        <div class="loading">
          <strong>Loading Diagram...</strong><br/>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">
            Initializing Mermaid diagram renderer...
          </p>
        </div>
      `;
    }
  }

  private showError(error: Error) {
    const container = this.shadowRoot?.querySelector('.mermaid-container');
    if (container) {
      container.innerHTML = `
        <div class="error">
          <strong>Mermaid Error:</strong> Failed to render diagram<br/>
          <pre style="font-size: 0.8rem; margin-top: 0.5rem;">${error.message}</pre>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">
            This might be due to a deployment issue with dynamic imports. 
            The diagram should work correctly in development mode.
          </p>
        </div>
      `;
    }
  }

  private showFallback() {
    const container = this.shadowRoot?.querySelector('.mermaid-container');
    if (container) {
      // Try to extract dependency information from the chart and display it as text
      const dependencyInfo = this.extractDependencyInfo(this.chart);
      
      container.innerHTML = `
        <div class="fallback">
          <strong>Component Dependencies</strong><br/>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">
            Mermaid diagram rendering is currently unavailable on GitHub Pages.
            Here's the dependency information in text format:
          </p>
          ${dependencyInfo}
        </div>
      `;
    }
  }

  private extractDependencyInfo(chart: string): string {
    if (!chart) return '<p><em>No dependency information available.</em></p>';
    
    try {
      // Extract dependency relationships from Mermaid syntax
      const lines = chart.split('\n');
      const dependencies: string[] = [];
      const components: Set<string> = new Set();
      
      lines.forEach(line => {
        // Match dependency arrows: A --> B or A --> |label| B
        const match = line.match(/(\w+(?:-\w+)*)\s*-->\s*(?:\|[^|]*\|\s*)?(\w+(?:-\w+)*)/);
        if (match) {
          const [, from, to] = match;
          components.add(from);
          components.add(to);
          
          // Extract relationship description
          const labelMatch = line.match(/\|([^|]+)\|/);
          const relationship = labelMatch ? labelMatch[1] : 'depends on';
          
          dependencies.push(`• <strong>${to}</strong> ${relationship} <strong>${from}</strong>`);
        }
      });
      
      if (dependencies.length === 0) {
        return '<p><em>No dependencies found in this diagram.</em></p>';
      }
      
      const componentList = Array.from(components).sort().map(comp => 
        `<code>${comp}</code>`
      ).join(', ');
      
      return `
        <div style="margin-top: 1rem;">
          <h4 style="margin-bottom: 0.5rem;">Components:</h4>
          <p style="margin-bottom: 1rem;">${componentList}</p>
          
          <h4 style="margin-bottom: 0.5rem;">Relationships:</h4>
          <ul style="margin: 0; padding-left: 1.5rem; list-style-type: none;">
            ${dependencies.join('<br/>')}
          </ul>
        </div>
      `;
    } catch (error) {
      return `
        <p><em>Could not parse dependency information.</em></p>
        <details style="margin-top: 1rem;">
          <summary>Raw diagram data:</summary>
          <pre style="font-size: 0.8rem; white-space: pre-wrap; margin-top: 0.5rem;">${chart}</pre>
        </details>
      `;
    }
  }

  render() {
    return html`<div class="mermaid-container"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mermaid-diagram': MermaidDiagram;
  }
} 