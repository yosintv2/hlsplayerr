// Function to shorten URL using TinyURL API
async function shortenUrl(longUrl) {
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${longUrl}`);
        const shortUrl = await response.text();
        if (shortUrl.startsWith('https://tinyurl.com/')) {
            return shortUrl;
        } else {
            throw new Error('Invalid TinyURL response');
        }
    } catch (error) {
        console.error('Error shortening URL:', error);
        return longUrl; // Fallback to original URL if shortening fails
    }
}

// Function to update iframe URL dynamically
async function generateIframeUrl() {
    const liveLink = document.getElementById('livelink').value.trim();
    const playerType = document.getElementById('playerytype').value;
    const iframeUrlField = document.getElementById('iframeUrl');
    const iframeSection = document.getElementById('iframeSection');

    if (liveLink) {
        let baseUrl;
        let plainBaseUrl;
        switch (playerType) {
            case 'player1':
                baseUrl = 'https://hlsplayernet.pages.dev/players/player1.html?url=' + encodeURIComponent(liveLink);
                plainBaseUrl = 'https://hlsplayernet.pages.dev/players/player1.html?url=' + liveLink;
                break;
            case 'player2':
                baseUrl = 'https://hlsplayernet.pages.dev/players/player2.html?url=' + encodeURIComponent(liveLink);
                plainBaseUrl = 'https://hlsplayernet.pages.dev/players/player2.html?url=' + liveLink;
                break;
            case 'player3':
                baseUrl = 'https://hlsplayernet.pages.dev/players/player3.html?url=' + encodeURIComponent(liveLink);
                plainBaseUrl = 'https://hlsplayernet.pages.dev/players/player3.html?url=' + liveLink;
                break;
            case 'player4':
                baseUrl = 'https://hlsplayernet.pages.dev/players/player4.html?url=' + encodeURIComponent(liveLink);
                plainBaseUrl = 'https://hlsplayernet.pages.dev/players/player4.html?url=' + liveLink;
                break;
            case 'player5':
                baseUrl = 'https://hlsplayernet.pages.dev/players/player5.html?url=' + encodeURIComponent(liveLink);
                plainBaseUrl = 'https://hlsplayernet.pages.dev/players/player5.html?url=' + liveLink;
                break;
            case 'player6':
                baseUrl = 'https://hlsplayernet.pages.dev/players/iframe.html?url=' + encodeURIComponent(liveLink);
                plainBaseUrl = 'https://hlsplayernet.pages.dev/players/iframe.html?url=' + liveLink;
                break;
            case 'flv':
                baseUrl = 'https://hlsplayernet.pages.dev/players/flv.html?url=' + encodeURIComponent(liveLink);
                plainBaseUrl = 'https://hlsplayernet.pages.dev/players/flv.html?url=' + liveLink;
                break;
            default:
                baseUrl = '';
                plainBaseUrl = '';
                break;
        }

        // Shorten the plain base URL using TinyURL
        const shortenedUrl = await shortenUrl(plainBaseUrl);

        // Construct the iframe tag with the shortened URL
        const iframeUrl = `<iframe src="${shortenedUrl}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;

        iframeUrlField.value = iframeUrl;
        iframeSection.style.display = 'block';
    } else {
        iframeSection.style.display = 'none';
    }
}

// Function to handle redirect to player page
function redirectToPlayer() {
    // Get the input value and selected player type
    const liveLink = document.getElementById('livelink').value.trim();
    const playerType = document.getElementById('playerytype').value;

    // Validate the input link
    if (!liveLink) {
        alert('Please enter a valid MP4/M3U8/HLS link!');
        return;
    }

    // Determine the player URL based on the selected player
    let basePlayerUrl;
    switch (playerType) {
        case 'player1':
            basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player1.html?url=';
            break;
        case 'player2':
            basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player2.html?url=';
            break;
        case 'player3':
            basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player3.html?url=';
            break;
        case 'player4':
            basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player4.html?url=';
            break;
        case 'player5':
            basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player5.html?url=';
            break;
        case 'player6':
            basePlayerUrl = 'https://hlsplayernet.pages.dev/players/iframe.html?url=';
            break;
        case 'flv':
            basePlayerUrl = 'https://hlsplayernet.pages.dev/players/flv.html?url=';
            break;
        default:
            alert('Invalid player selected!');
            return;
    }

    // Set the href attribute of the link with the selected player URL and user input
    const playerLink = document.getElementById('playerLink');
    playerLink.href = basePlayerUrl + liveLink;
}

// Double-tap to copy iframe URL to clipboard
function copyIframeUrl() {
    const iframeUrlField = document.getElementById('iframeUrl');
    iframeUrlField.select();
    document.execCommand('copy');
    alert('Iframe URL copied to clipboard!');
}
