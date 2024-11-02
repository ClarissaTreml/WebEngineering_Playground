import { extractBears } from './extractingBears';
const baseUrl = 'https://en.wikipedia.org/w/api.php';
const title = 'List_of_ursids';
export const fetchImageUrl = async (fileName) => {
    const imageParams = {
        action: 'query',
        titles: `File:${fileName}`,
        prop: 'imageinfo',
        iiprop: 'url',
        format: 'json',
        origin: '*',
    };
    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch image URL for ${fileName}`);
        }
        // Step 2: Cast the JSON response as QueryResponse
        const data = await res.json();
        // Step 3: Access the pages object and get the URL
        const pages = data.query.pages;
        return Object.values(pages)[0].imageinfo[0].url;
    }
    catch (error) {
        console.error('Error fetching image URL:', error);
        return 'media/imagePlaceholder.png';
    }
};
export const getBearData = async () => {
    const params = {
        action: 'parse',
        page: title,
        prop: 'wikitext',
        section: '3',
        format: 'json',
        origin: '*',
    };
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch bear data.');
        }
        const data = await res.json(); // Use the defined interface instead of `any`
        const wikitext = data.parse.wikitext['*']; // TypeScript recognizes this as a string
        await extractBears(wikitext);
    }
    catch (error) {
        console.error('An error occurred when fetching the bear data:', error);
    }
};
