import { newSpecPage } from '@stencil/core/testing';
import { SpectrumChart } from '../spectrum-chart';

describe('spectrum-chart', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart></spectrum-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-chart class="chart-host">
        <div class="spectrum-chart" style="width: 100%; height: 400px;">
          <canvas class="spectrum-chart__canvas"></canvas>
        </div>
      </spectrum-chart>
    `);
  });

  it('renders with title', async () => {
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart chart-title="Test Chart"></spectrum-chart>`,
    });
    expect(page.rootInstance.title).toBe('Test Chart');
  });

  it('respects chart type prop', async () => {
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart type="bar"></spectrum-chart>`,
    });
    expect(page.rootInstance.type).toBe('bar');
  });

  it('renders loading state', async () => {
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart loading="true"></spectrum-chart>`,
    });
    
    const loading = await page.root.querySelector('.spectrum-chart__loading');
    expect(loading).toBeTruthy();
  });

  it('parses JSON string config', async () => {
    const config = { title: 'Sales Chart', showLegend: true };
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart config='${JSON.stringify(config)}'></spectrum-chart>`,
    });
    
    expect(page.rootInstance.parsedConfig).toEqual(config);
  });

  it('parses JSON string data', async () => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{ label: 'Sales', data: [100, 200, 150] }],
    };
    
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart data='${JSON.stringify(data)}'></spectrum-chart>`,
    });
    
    expect(page.rootInstance.parsedData).toEqual(data);
  });

  it('converts simple array to chart data', async () => {
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart></spectrum-chart>`,
    });
    
    page.rootInstance.data = [10, 20, 30];
    await page.waitForChanges();
    
    expect(page.rootInstance.parsedData.datasets.length).toBe(1);
    expect(page.rootInstance.parsedData.datasets[0].data).toEqual([10, 20, 30]);
  });

  it('respects debug prop', async () => {
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart debug="true"></spectrum-chart>`,
    });
    expect(page.rootInstance.debug).toBe(true);
  });

  it('respects custom width and height', async () => {
    const page = await newSpecPage({
      components: [SpectrumChart],
      html: `<spectrum-chart width="600px" height="300px"></spectrum-chart>`,
    });
    
    const chartDiv = await page.root.querySelector('.spectrum-chart');
    expect(chartDiv.getAttribute('style')).toContain('width: 600px');
    expect(chartDiv.getAttribute('style')).toContain('height: 300px');
  });
});

