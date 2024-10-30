import { getBearData } from './modules/fetchingData.js';
import { addComment, toggleComments } from './modules/commentSection.js';

document.addEventListener('DOMContentLoaded', async () => {
    toggleComments();
    addComment();

    try {
        await getBearData();
    } catch (error) {
        console.error('Error loading bear data:', error);
    }
});
