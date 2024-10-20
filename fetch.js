import { baseUrl } from './main.js';
import { extractBears } from './extract.js';

async function fetchImageUrl(fileName) {
    const imageParams = {
        action: "query",
        titles: `File:${fileName}`,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    };

    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        return Object.values(pages)[0].imageinfo[0].url;
    } catch (error) {
        console.error('Error fetching image URL:', error);
        return null;  // Return null or a placeholder in case of error
    }
}

// Function to fetch the image URLs based on the file names
const title = "List_of_ursids";

const params = {
    action: "parse",
    page: title,
    prop: "wikitext",
    section: "3",
    format: "json",
    origin: "*"
};

function getBearData() {
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            const wikitext = data.parse.wikitext['*'];
            extractBears(wikitext); // No need to handle promises here
        });
}
// Export these functions so they can be used in other modules
export { fetchImageUrl, getBearData };