import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-avatar></spectrum-avatar>');

    const element = await page.find('spectrum-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
