import { describe, it, expect, beforeEach } from 'vitest';
import { toggleComments } from './commentSection';

describe('toggleComments', () => {
  let showHideBtn: HTMLButtonElement | null;
  let commentWrapper: HTMLElement | null;

  beforeEach((): void => {
    document.body.innerHTML = `
      <button class="show-hide">Show comments</button>
      <div class="comment-wrapper" id="comment-wrapper"></div>
    `;

    showHideBtn = document.querySelector<HTMLButtonElement>('.show-hide');
    commentWrapper = document.querySelector<HTMLElement>('.comment-wrapper');

    if (showHideBtn === null || commentWrapper === null) {
      throw new Error('Required elements not found in the DOM');
    }

    toggleComments();
  });

  it('should toggle the visibility of the comment section and update aria attributes on click', (): void => {
    if (showHideBtn !== null && commentWrapper !== null) {
      expect(showHideBtn.textContent).toBe('Show comments');
      expect(commentWrapper.style.display).toBe('none');
      expect(showHideBtn.getAttribute('aria-expanded')).toBe('false');

      showHideBtn.click();
      expect(showHideBtn.textContent).toBe('Hide comments');
      expect(commentWrapper.style.display).toBe('block');
      expect(showHideBtn.getAttribute('aria-expanded')).toBe('true');

      showHideBtn.click();
      expect(showHideBtn.textContent).toBe('Show comments');
      expect(commentWrapper.style.display).toBe('none');
      expect(showHideBtn.getAttribute('aria-expanded')).toBe('false');
    }
  });

  it('should toggle visibility and aria attributes on Enter and Space keydown events', (): void => {
    if (showHideBtn !== null && commentWrapper !== null) {
      expect(showHideBtn.getAttribute('aria-expanded')).toBe('false');
      expect(commentWrapper.style.display).toBe('none');

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      showHideBtn.dispatchEvent(enterEvent);
      expect(showHideBtn.textContent).toBe('Hide comments');
      expect(commentWrapper.style.display).toBe('block');
      expect(showHideBtn.getAttribute('aria-expanded')).toBe('true');

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      showHideBtn.dispatchEvent(spaceEvent);
      expect(showHideBtn.textContent).toBe('Show comments');
      expect(commentWrapper.style.display).toBe('none');
      expect(showHideBtn.getAttribute('aria-expanded')).toBe('false');
    }
  });
});
