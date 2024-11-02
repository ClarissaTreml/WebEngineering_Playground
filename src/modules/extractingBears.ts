import { fetchImageUrl } from './fetchingData';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export const extractBears = async (wikitext: string): Promise<void> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)]]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (
        nameMatch !== null &&
        binomialMatch !== null &&
        imageMatch !== null &&
        rangeMatch !== null
      ) {
        const fileName: string = imageMatch[1].trim().replace('File:', '');

        try {
          const imageUrl: string = await fetchImageUrl(fileName);
          const bear: Bear = {
            name: nameMatch[1],
            binomial: binomialMatch[1],
            image: imageUrl,
            range: rangeMatch[1].trim(),
          };
          bears.push(bear);
        } catch (error) {
          console.error(`Error fetching image for ${nameMatch[1]}:`, error);
        }
      }
    }
  }

  const moreBearsSection = document.querySelector('.more_bears');
  if (moreBearsSection !== null) {
    bears.forEach((bear: Bear) => {
      (moreBearsSection as HTMLElement).innerHTML += `
      <div>
        <h3>${bear.name} (${bear.binomial})</h3>
        <img src="${bear.image}" alt="${bear.name}" style="...">
        <p><strong>Range:</strong> ${bear.range}</p>
      </div>
    `;
    });
  }
};
