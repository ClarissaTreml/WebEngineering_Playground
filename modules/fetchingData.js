import { extractBears } from './extractingBears.js';

const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const fetchImageUrl = async (fileName) => {
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
        if (!res.ok) {
            throw new Error(`Failed to fetch image URL for ${fileName}`);
        }
        const data = await res.json();
        const pages = data.query.pages;
        return Object.values(pages)[0].imageinfo[0].url;

    } catch (error) {
        console.error('Error fetching image URL:', error);
        return 'media/imagePlaceholder.png';
    }
};

const getBearData = async () => {
    const params = {
        action: "parse",
        page: title,
        prop: "wikitext",
        section: "3",
        format: "json",
        origin: "*"
    };

    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch bear data.');
        }
        const data = await res.json();
        const wikitext = data.parse.wikitext['*'];
        await extractBears(wikitext);

    } catch (error) {
        console.error('An error occurred when fetching the bear data:', error);
    }
};

export { fetchImageUrl, getBearData };