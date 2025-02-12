const API = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PL6NdkXsPL07Il2hEQGcLI4dg_LTg7xA2L&part=snippet&maxResults=10';

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
                    <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank">
                        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" class="w-full">
                        </div>
                    </a>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank" class="hover:underline">
                                ${video.snippet.title}
                            </a>
                        </h3>
                    </div>
                </div>
            `).slice(0,8).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();