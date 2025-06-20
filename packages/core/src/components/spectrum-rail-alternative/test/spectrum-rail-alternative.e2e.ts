import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-rail-alternative', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-rail-alternative></spectrum-rail-alternative>');

    const element = await page.find('spectrum-rail-alternative');
    expect(element).toHaveClass('hydrated');
  });
});
