import { newSpecPage } from '@stencil/core/testing';
import { UnopsButton } from '../unops-button';

describe('unops-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UnopsButton],
      html: `<unops-button></unops-button>`,
    });
    expect(page.root).toEqualHtml(`
      <unops-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </unops-button>
    `);
  });
});
