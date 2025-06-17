import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-app-layout', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-app-layout></spectrum-app-layout>');

    const element = await page.find('spectrum-app-layout');
    expect(element).toHaveClass('hydrated');
  });
});
