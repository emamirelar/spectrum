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
  `;

  @property({ type: String })
  chart = '';

  @property({ type: String })
  chartId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  private initialized = false;

  async firstUpdated() {
    if (!this.initialized) {
      // Initialize mermaid once
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
    }
    
    if (this.chart) {
      await this.renderChart();
    }
  }

  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('chart') && this.chart) {
      await this.renderChart();
    }
  }

  private async renderChart() {
    const container = this.shadowRoot?.querySelector('.mermaid-container');
    if (!container || !this.chart) return;

    try {
      // Clear previous content
      container.innerHTML = '';
      
      // Render the mermaid chart
      const { svg } = await mermaid.render(this.chartId, this.chart);
      container.innerHTML = svg;
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      container.innerHTML = `
        <div class="error">
          <strong>Mermaid Error:</strong> Failed to render diagram<br/>
          <pre style="font-size: 0.8rem; margin-top: 0.5rem;">${(error as Error).message}</pre>
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