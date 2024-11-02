export const toggleComments = () => {
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
        }
        else {
            showHideBtn.textContent = 'Show comments';
            commentWrapper.classList.add('hidden');
        }
    });
};
export const addComment = () => {
    const form = document.querySelector('.comment-form');
    const nameField = document.querySelector('#name');
    const commentField = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');
    if (form != null &&
        nameField != null &&
        commentField != null &&
        list != null) {
        form.addEventListener('submit', (e) => {
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
