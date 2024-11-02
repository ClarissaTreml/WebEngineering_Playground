import { getBearData } from './modules/fetchingData';
import { addComment, toggleComments } from './modules/commentSection';
document.addEventListener('DOMContentLoaded', () => {
    toggleComments();
    addComment();
    void (async () => {
        try {
            await getBearData();
        }
        catch (error) {
            console.error('Error loading bear data:', error);
        }
    })();
});
