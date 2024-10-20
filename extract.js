import { fetchImageUrl } from './fetch.js';  // Import fetchImageUrl from fetch.js

// Function to extract bear data from the wikitext
function extractBears(wikitext) {
    const speciesTables = wikitext.split('{{Species table/end}}');
    const bears = [];

    speciesTables.forEach(function(table) {
        const rows = table.split('{{Species table/row');
        rows.forEach(function(row) {
            const nameMatch = row.match(/\|name=\[\[(.*?)]]/);
            const binomialMatch = row.match(/\|binomial=(.*?)\n/);
            const imageMatch = row.match(/\|image=(.*?)\n/);
            const rangeMatch = row.match(/\|range=(.*?)\n/);  // Assuming range is formatted like this

            if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
                const fileName = imageMatch[1].trim().replace('File:', '');

                fetchImageUrl(fileName).then(function(imageUrl) {
                    const bear = {
                        name: nameMatch[1],
                        binomial: binomialMatch[1],
                        image: imageUrl,
                        range: rangeMatch[1].trim()  // Extracted range value
                    };
                    bears.push(bear);

                    if (bears.length === rows.length) {
                        const moreBearsSection = document.querySelector('.more_bears');
                        bears.forEach(function(bear) {
                            moreBearsSection.innerHTML += `
                  <div>
                      <h3>${bear.name} (${bear.binomial})</h3>
                      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
                      <p><strong>Range:</strong> ${bear.range}</p>
                  </div>
              `;
                        });
                    }
                });
            }
        });
    });
}

// Export this function to use in main.js
export { extractBears };
