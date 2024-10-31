export const toggleComments = (): void => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');

  // Early return if elements are not found
  if (!showHideBtn || !commentWrapper) return;

  // Initially hide the comment wrapper by adding the 'hidden' class
  commentWrapper.classList.add('hidden');

  // Toggle visibility on button click
  showHideBtn.addEventListener('click', () => {
    const isHidden = commentWrapper.classList.contains('hidden');

    // Update button text and toggle visibility
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

  // Early return if elements are not found
  if (!form || !nameField || !commentField || !list) return;

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    // Create elements for the new comment
    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');

    // Set text content from input values with optional chaining in case values are null
    namePara.textContent = nameField?.value ?? '';
    commentPara.textContent = commentField?.value ?? '';

    // Append the new comment to the list
    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    // Clear the input fields if they are not null
    if (nameField) nameField.value = '';
    if (commentField) commentField.value = '';
  });
};
