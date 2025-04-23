import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-conversation-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-conversation-panel></spectrum-conversation-panel>');

    const element = await page.find('spectrum-conversation-panel');
    expect(element).toHaveClass('hydrated');
  });
});
