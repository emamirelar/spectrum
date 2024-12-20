import { newE2EPage } from '@stencil/core/testing';

describe('unops-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<unops-button></unops-button>');

    const element = await page.find('unops-button');
    expect(element).toHaveClass('hydrated');
  });
});
