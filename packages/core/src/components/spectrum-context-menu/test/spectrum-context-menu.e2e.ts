import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-context-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-context-menu></spectrum-context-menu>');

    const element = await page.find('spectrum-context-menu');
    expect(element).toHaveClass('hydrated');
  });
});
