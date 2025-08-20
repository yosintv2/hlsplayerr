// List of allowed domains
const allowedDomains = ['hls-player.net', 'hlsplayernet.pages.dev'];

// Function to check if current domain is allowed
function isDomainAllowed() {
    const currentDomain = window.location.hostname;
    return allowedDomains.includes(currentDomain);
}

// Function to redirect to main site if domain is not allowed
function redirectIfNotAllowed() {
    if (!isDomainAllowed()) {
        window.location.href = 'https://www.hls-player.net';
        return false;
    }
    return true;
}

// Function to shorten URL using TinyURL API
async function shortenUrl(longUrl) {
    if (!redirectIfNotAllowed()) {
        return longUrl; // Return original URL to prevent further processing
    }
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
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
    if (!redirectIfNotAllowed()) {
        return;
    }

    const liveLink = document.getElementById('livelink').value.trim();
    const playerType = document.getElementById('playerytype').value;
    const clearKeyId = document.getElementById('clearKeyId') ? document.getElementById('clearKeyId').value.trim() : '';
    const clearKey = document.getElementById('clearKey') ? document.getElementById('clearKey').value.trim() : '';
    const iframeUrlField = document.getElementById('iframeUrl');
    const iframeSection = document.getElementById('iframeSection');

    if (liveLink) {
        let baseUrl;
        let plainBaseUrl;
        if (playerType === 'dashjs') {
            plainBaseUrl = `https://hlsplayernet.pages.dev/players/mpd?url=${liveLink}${clearKeyId ? `&key1=${clearKeyId}` : ''}${clearKey ? `&key2=${clearKey}` : ''}`;
            baseUrl = plainBaseUrl; // Use the provided MPD player URL directly
        } else {
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
    if (!redirectIfNotAllowed()) {
        return;
    }

    const liveLink = document.getElementById('livelink').value.trim();
    const playerType = document.getElementById('playerytype').value;
    const clearKeyId = document.getElementById('clearKeyId') ? document.getElementById('clearKeyId').value.trim() : '';
    const clearKey = document.getElementById('clearKey') ? document.getElementById('clearKey').value.trim() : '';
    const playerLink = document.getElementById('playerLink');

    if (!liveLink) {
        alert('Please enter a valid MPD/M3U8/MP4 link!');
        return;
    }

    let basePlayerUrl;
    if (playerType === 'dashjs') {
        basePlayerUrl = `https://hlsplayernet.pages.dev/players/mpd?url=${liveLink}${clearKeyId ? `&key1=${clearKeyId}` : ''}${clearKey ? `&key2=${clearKey}` : ''}`;
    } else {
        switch (playerType) {
            case 'player1':
                basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player1.html?url=' + liveLink;
                break;
            case 'player2':
                basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player2.html?url=' + liveLink;
                break;
            case 'player3':
                basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player3.html?url=' + liveLink;
                break;
            case 'player4':
                basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player4.html?url=' + liveLink;
                break;
            case 'player5':
                basePlayerUrl = 'https://hlsplayernet.pages.dev/players/player5.html?url=' + liveLink;
                break;
            case 'player6':
                basePlayerUrl = 'https://hlsplayernet.pages.dev/players/iframe.html?url=' + liveLink;
                break;
            case 'flv':
                basePlayerUrl = 'https://hlsplayernet.pages.dev/players/flv.html?url=' + liveLink;
                break;
            default:
                alert('Invalid player selected!');
                return;
        }
    }

    playerLink.href = basePlayerUrl;
    window.open(playerLink.href, '_blank');
}

// Double-tap to copy iframe URL to clipboard
function copyIframeUrl() {
    if (!redirectIfNotAllowed()) {
        return;
    }

    const iframeUrlField = document.getElementById('iframeUrl');
    iframeUrlField.select();
    document.execCommand('copy');
    alert('Iframe URL copied to clipboard!');
}
