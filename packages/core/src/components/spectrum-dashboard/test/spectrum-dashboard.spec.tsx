import { newSpecPage } from '@stencil/core/testing';
import { SpectrumDashboard } from '../spectrum-dashboard';

describe('spectrum-dashboard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumDashboard],
      html: `<spectrum-dashboard></spectrum-dashboard>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-dashboard class="dashboard-host">
        <div class="spectrum-dashboard">
          <slot></slot>
        </div>
      </spectrum-dashboard>
    `);
  });

  it('renders with content', async () => {
    const page = await newSpecPage({
      components: [SpectrumDashboard],
      html: `<spectrum-dashboard>Dashboard Content</spectrum-dashboard>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('respects debug prop', async () => {
    const page = await newSpecPage({
      components: [SpectrumDashboard],
      html: `<spectrum-dashboard debug="true"></spectrum-dashboard>`,
    });
    expect(page.rootInstance.debug).toBe(true);
  });
});



