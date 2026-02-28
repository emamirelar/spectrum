import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-tooltip text="Tip"><span>trigger</span></spectrum-tooltip>');
    const element = await page.find('spectrum-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
