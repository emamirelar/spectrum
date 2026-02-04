import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-chart', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart></spectrum-chart>');

    const element = await page.find('spectrum-chart');
    expect(element).toHaveClass('hydrated');
  });

  it('renders canvas element', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart></spectrum-chart>');

    const canvas = await page.find('spectrum-chart canvas');
    expect(canvas).toBeTruthy();
    expect(canvas).toHaveClass('spectrum-chart__canvas');
  });

  it('displays loading state', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart loading="true"></spectrum-chart>');

    const loading = await page.find('spectrum-chart .spectrum-chart__loading');
    expect(loading).toBeTruthy();
    
    const loadingText = await page.find('spectrum-chart .spectrum-chart__loading-text');
    expect(loadingText.textContent).toBe('Loading chart...');
  });

  it('accepts chart type attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart type="bar"></spectrum-chart>');

    const element = await page.find('spectrum-chart');
    const type = await element.getProperty('type');
    expect(type).toBe('bar');
  });

  it('accepts title attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart chart-title="Revenue Chart"></spectrum-chart>');

    const element = await page.find('spectrum-chart');
    const title = await element.getProperty('title');
    expect(title).toBe('Revenue Chart');
  });

  it('accepts config as JSON string', async () => {
    const config = { title: 'Test Chart', showLegend: true };
    const page = await newE2EPage();
    await page.setContent(`<spectrum-chart config='${JSON.stringify(config)}'></spectrum-chart>`);

    const element = await page.find('spectrum-chart');
    const parsedConfig = await element.getProperty('parsedConfig');
    expect(parsedConfig).toEqual(config);
  });

  it('accepts data as JSON string', async () => {
    const data = {
      labels: ['A', 'B', 'C'],
      datasets: [{ label: 'Data', data: [10, 20, 30] }],
    };
    const page = await newE2EPage();
    await page.setContent(`<spectrum-chart data='${JSON.stringify(data)}'></spectrum-chart>`);

    const element = await page.find('spectrum-chart');
    const parsedData = await element.getProperty('parsedData');
    expect(parsedData).toEqual(data);
  });

  it('updates when data changes', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart></spectrum-chart>');

    const element = await page.find('spectrum-chart');
    
    // Set initial data
    await element.setProperty('data', {
      labels: ['A', 'B'],
      datasets: [{ label: 'Data', data: [10, 20] }],
    });
    await page.waitForChanges();
    
    let parsedData = await element.getProperty('parsedData');
    expect(parsedData.labels).toEqual(['A', 'B']);
    
    // Update data
    await element.setProperty('data', {
      labels: ['X', 'Y', 'Z'],
      datasets: [{ label: 'Data', data: [30, 40, 50] }],
    });
    await page.waitForChanges();
    
    parsedData = await element.getProperty('parsedData');
    expect(parsedData.labels).toEqual(['X', 'Y', 'Z']);
  });

  it('applies custom width and height', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart width="800px" height="600px"></spectrum-chart>');

    const chartDiv = await page.find('spectrum-chart .spectrum-chart');
    const style = await chartDiv.getAttribute('style');
    
    expect(style).toContain('width: 800px');
    expect(style).toContain('height: 600px');
  });

  it('handles debug mode', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-chart debug="true"></spectrum-chart>');

    const element = await page.find('spectrum-chart');
    const debug = await element.getProperty('debug');
    expect(debug).toBe(true);
  });
});

