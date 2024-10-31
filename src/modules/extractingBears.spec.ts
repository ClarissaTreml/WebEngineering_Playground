import { describe, it, expect, vi } from 'vitest';
import { extractBears } from './extractingBears';
import { fetchImageUrl } from './fetchingData';

vi.mock('./fetchingData', () => ({
  fetchImageUrl: vi.fn().mockResolvedValue('mocked-image-url'),
}));

describe('extractBears', () => {
  it('should create bear objects from wikitext', async () => {
    const wikitext = `
      {{Species table/row
      |name=[[Grizzly Bear]]
      |binomial=Ursus arctos horribilis
      |image=File:Grizzly.jpg
      |range=North America
      }}
      {{Species table/end}}
    `;

    document.body.innerHTML = '<div class="more_bears"></div>';

    await extractBears(wikitext);

    const moreBearsSection = document.querySelector('.more_bears');
    expect(moreBearsSection).not.toBeNull();
    expect(moreBearsSection!.innerHTML).toContain('Grizzly Bear');
    expect(moreBearsSection!.innerHTML).toContain('Ursus arctos horribilis');
    expect(moreBearsSection!.innerHTML).toContain('mocked-image-url');
    expect(moreBearsSection!.innerHTML).toContain('North America');
  });
});
