import { describe, it, expect, beforeEach } from 'vitest';
import { toggleComments } from './commentSection';

describe('toggleComments', () => {
  let showHideBtn: HTMLButtonElement;
  let commentWrapper: HTMLElement;

  beforeEach((): void => {
    document.body.innerHTML = `
      <button class="show-hide">Show comments</button>
      <div class="comment-wrapper hidden"></div>
    `;

    // Use `!` to assert non-null after querying the elements.
    showHideBtn = document.querySelector('.show-hide')!;
    commentWrapper = document.querySelector('.comment-wrapper')!;
  });

  it('should toggle the visibility of the comment section', (): void => {
    toggleComments();

    // Simulate a button click to show comments
    showHideBtn.click();
    expect(showHideBtn.textContent).toBe('Hide comments');
    expect(commentWrapper.classList.contains('hidden')).toBe(false);

    // Simulate a button click to hide comments
    showHideBtn.click();
    expect(showHideBtn.textContent).toBe('Show comments');
    expect(commentWrapper.classList.contains('hidden')).toBe(true);
  });
});
