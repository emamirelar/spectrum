import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-wizard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-wizard></spectrum-wizard>');

    const element = await page.find('spectrum-wizard');
    expect(element).toHaveClass('hydrated');
  });
});
