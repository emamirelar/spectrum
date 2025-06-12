import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import mermaid from 'mermaid';

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
  `;

  @property({ type: String })
  chart = '';

  @property({ type: String })
  chartId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  private initialized = false;
  private retryCount = 0;
  private maxRetries = 3;

  async firstUpdated() {
    if (!this.initialized) {
      try {
        // Initialize mermaid with more conservative settings for GitHub Pages
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
          },
        });
        this.initialized = true;
      } catch (error) {
        console.error('Mermaid initialization error:', error);
        this.showFallback();
        return;
      }
    }
    
    if (this.chart) {
      await this.renderChart();
    }
  }

  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('chart') && this.chart && this.initialized) {
      await this.renderChart();
    }
  }

  private async renderChart() {
    const container = this.shadowRoot?.querySelector('.mermaid-container');
    if (!container || !this.chart) return;

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
        return await mermaid.render(this.chartId, this.chart);
      } catch (error) {
        this.retryCount++;
        if (i === this.maxRetries - 1) {
          throw error;
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw new Error('Max retries exceeded');
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
      container.innerHTML = `
        <div class="fallback">
          <strong>Diagram Loading:</strong> Mermaid diagram rendering is currently unavailable<br/>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">
            This appears to be a deployment-specific issue with dynamic imports on GitHub Pages.
            The component dependency information is still available in the text documentation above.
          </p>
        </div>
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