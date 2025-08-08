import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-cookie-compliance', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-cookie-compliance></spectrum-cookie-compliance>');

    const element = await page.find('spectrum-cookie-compliance');
    expect(element).toHaveClass('hydrated');
  });
});
