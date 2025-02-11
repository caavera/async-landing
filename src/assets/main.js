const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCSJ4gkVC6NrvII8umztf0Ow&part=snippet%2Cid&order=date&maxResults=9';

const content = null ?? document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '678a425d4fmshd6a7473f3ec2b0fp1790dajsn046241cc7e73',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0,4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();