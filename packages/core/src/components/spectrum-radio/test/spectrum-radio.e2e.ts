import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-radio></spectrum-radio>');
    const element = await page.find('spectrum-radio');
    expect(element).toHaveClass('hydrated');
  });
});
