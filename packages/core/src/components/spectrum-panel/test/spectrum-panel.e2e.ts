import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-panel></spectrum-panel>');

    const element = await page.find('spectrum-panel');
    expect(element).toHaveClass('hydrated');
  });
});
