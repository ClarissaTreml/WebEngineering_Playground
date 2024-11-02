export const toggleComments = (): void => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');
  if (showHideBtn == null || commentWrapper == null) {
    return;
  }

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
  const form = document.querySelector<HTMLFormElement>('.comment-form');
  const nameField = document.querySelector<HTMLInputElement>('#name');
  const commentField = document.querySelector<HTMLInputElement>('#comment');
  const list = document.querySelector<HTMLElement>('.comment-container');

  if (
    form != null &&
    nameField != null &&
    commentField != null &&
    list != null
  ) {
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      namePara.textContent = nameField.value;
      commentPara.textContent = commentField.value;

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameField.value = '';
      commentField.value = '';
    });
  }
};
