import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-accordion></spectrum-accordion>');

    const element = await page.find('spectrum-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
