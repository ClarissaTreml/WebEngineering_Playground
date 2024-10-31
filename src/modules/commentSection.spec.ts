import { describe, it, expect, beforeEach } from 'vitest';
import { toggleComments } from './commentSection';

describe('toggleComments', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="show-hide">Show comments</button>
      <div class="comment-wrapper hidden"></div>
    `;
  });

  it('should toggle the visibility of the comment section', () => {
    const showHideBtn = document.querySelector('.show-hide') as HTMLButtonElement;
    const commentWrapper = document.querySelector('.comment-wrapper');

    toggleComments();

    // Simulate a button click to show comments
    showHideBtn.click();
    expect(showHideBtn.textContent).toBe('Hide comments');
    expect(commentWrapper!.classList.contains('hidden')).toBe(false);

    // Simulate a button click to hide comments
    showHideBtn.click();
    expect(showHideBtn.textContent).toBe('Show comments');
    expect(commentWrapper!.classList.contains('hidden')).toBe(true);
  });
});
