export const toggleComments = (): void => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');
  if (!showHideBtn || !commentWrapper) return;

  commentWrapper.classList.add('hidden');

  showHideBtn.addEventListener('click', () => {
    const isHidden = commentWrapper.classList.contains('hidden');
    if (isHidden) {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.classList.remove('hidden');
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.classList.add('hidden');
    }
  });
};

export const addComment = (): void => {
  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name') as HTMLInputElement | null;
  const commentField = document.querySelector('#comment') as HTMLInputElement | null;
  const list = document.querySelector('.comment-container') as HTMLElement | null;

  if (form && nameField && commentField && list) {
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      // Set text content from input values
      namePara.textContent = nameField.value;
      commentPara.textContent = commentField.value;

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      // Clear the input fields
      nameField.value = '';
      commentField.value = '';
    });
  }
};
