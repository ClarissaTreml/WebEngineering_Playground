import { fetchImageUrl } from './fetchingData.js';

const extractBears = async (wikitext) => {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];

    for (const table of speciesTables) {
        const rows = table.split('{{Species table/row');
        for (const row of rows) {
            const nameMatch = row.match(/\|name=\[\[(.*?)]]/);
            const binomialMatch = row.match(/\|binomial=(.*?)\n/);
            const imageMatch = row.match(/\|image=(.*?)\n/);
            const rangeMatch = row.match(/\|range=(.*?)\n/);

            if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
                const fileName = imageMatch[1].trim().replace('File:', '');

                try {
                    const imageUrl = await fetchImageUrl(fileName);
                    const bear = {
                        name: nameMatch[1],
                        binomial: binomialMatch[1],
                        image: imageUrl,
                        range: rangeMatch[1].trim()
                    };
                    bears.push(bear);

                } catch (error) {
                    console.error(`Error fetching image for ${nameMatch[1]}:`, error);
                }
            }
        }
    }

    const moreBearsSection = document.querySelector('.more_bears');
    if (moreBearsSection) {
        bears.forEach((bear) => {
            moreBearsSection.innerHTML += `
                <div>
                    <h3>${bear.name} (${bear.binomial})</h3>
                    <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                    <p><strong>Range:</strong> ${bear.range}</p>
                </div>
            `;
        });
    }
};

export { extractBears };
