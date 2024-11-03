export const toggleComments = (): void => {
  const showHideBtn = document.querySelector<HTMLElement>('.show-hide');
  const commentWrapper =
    document.querySelector<HTMLElement>('.comment-wrapper');

  if (showHideBtn !== null && commentWrapper !== null) {
    commentWrapper.style.display = 'none';

    showHideBtn.addEventListener('click', () => {
      const isHidden = commentWrapper.style.display === 'none';
      if (isHidden) {
        commentWrapper.style.display = 'block';
        showHideBtn.textContent = 'Hide comments';
        showHideBtn.setAttribute('aria-expanded', 'true');
      } else {
        commentWrapper.style.display = 'none';
        showHideBtn.textContent = 'Show comments';
        showHideBtn.setAttribute('aria-expanded', 'false');
      }
    });

    showHideBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        showHideBtn.click();
        event.preventDefault();
      }
    });

    showHideBtn.setAttribute('aria-expanded', 'false');
    showHideBtn.setAttribute('aria-controls', 'comment-wrapper');
  } else {
    console.error('Required elements not found in the DOM');
  }
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
