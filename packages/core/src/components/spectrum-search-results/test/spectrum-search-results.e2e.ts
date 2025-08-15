import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-search-results', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-search-results></spectrum-search-results>');

    const element = await page.find('spectrum-search-results');
    expect(element).toHaveClass('hydrated');
  });
});
