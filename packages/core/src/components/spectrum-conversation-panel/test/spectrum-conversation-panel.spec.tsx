import { newSpecPage } from '@stencil/core/testing';
import { SpectrumConversationPanel } from '../spectrum-conversation-panel';

describe('spectrum-conversation-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumConversationPanel],
      html: `<spectrum-conversation-panel></spectrum-conversation-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-conversation-panel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-conversation-panel>
    `);
  });
});
