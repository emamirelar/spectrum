import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-application-layout', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-application-layout></spectrum-application-layout>');

    const element = await page.find('spectrum-application-layout');
    expect(element).toHaveClass('hydrated');
  });
});
