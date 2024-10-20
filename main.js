import { getBearData } from './fetch.js';  // Correct

// Function to fetch the image URLs based on the file names
const baseUrl = "https://en.wikipedia.org/w/api.php";

// Fetch and display the bear data
document.addEventListener('DOMContentLoaded', () => {
    getBearData();
});

// Export these functions so they can be used in other modules
export { baseUrl };