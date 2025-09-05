async function generateIframeUrl() {
    const liveLink = document.getElementById('livelink').value.trim();
    const playerType = document.getElementById('playerytype').value;
    const clearKeyId = document.getElementById('clearKeyId') ? document.getElementById('clearKeyId').value.trim() : '';
    const clearKey = document.getElementById('clearKey') ? document.getElementById('clearKey').value.trim() : '';
    const iframeUrlField = document.getElementById('iframeUrl');
    const iframeSection = document.getElementById('iframeSection');
    if (liveLink) {
        let baseUrl;
        if (playerType === 'dashjs') {
            baseUrl = `https://hlsplayers.pages.dev/mpd?url=${liveLink}${clearKeyId ? `&key1=${clearKeyId}` : ''}${clearKey ? `&key2=${clearKey}` : ''}`;
        } else {
            switch (playerType) {
                case 'player1':
                    baseUrl = 'https://hlsplayers.pages.dev/player1.html?url=' + liveLink;
                    break;
                case 'player2':
                    baseUrl = 'https://hlsplayers.pages.dev/player2.html?url=' + liveLink;
                    break;
                case 'player3':
                    baseUrl = 'https://hlsplayers.pages.dev/player3.html?url=' + liveLink;
                    break;
                case 'player4':
                    baseUrl = 'https://hlsplayers.pages.dev/player4.html?url=' + liveLink;
                    break;
                case 'player5':
                    baseUrl = 'https://hlsplayers.pages.dev/player5.html?url=' + liveLink;
                    break;
                case 'player6':
                    baseUrl = 'https://hlsplayers.pages.dev/iframe.html?url=' + liveLink;
                    break;
                case 'flv':
                    baseUrl = 'https://hlsplayers.pages.dev/flv.html?url=' + liveLink;
                    break;
                case 'mp4':
                    baseUrl = 'https://hlsplayers.pages.dev/mp4.html?url=' + liveLink;
                    break;
                default:
                    baseUrl = '';
                    break;
            }
        }
        // Construct the iframe tag with the base URL directly
        const iframeUrl = `<iframe src="${baseUrl}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
        iframeUrlField.value = iframeUrl;
        iframeSection.style.display = 'block';
    } else {
        iframeSection.style.display = 'none';
    }
}
// Function to handle redirect to player page
function redirectToPlayer() {
    const liveLink = document.getElementById('livelink').value.trim();
    const playerType = document.getElementById('playerytype').value;
    const clearKeyId = document.getElementById('clearKeyId') ? document.getElementById('clearKeyId').value.trim() : '';
    const clearKey = document.getElementById('clearKey') ? document.getElementById('clearKey').value.trim() : '';
    const playerLink = document.getElementById('playerLink');
    const dashPlayerContainer = document.getElementById('dashPlayerContainer');
    const dashVideoPlayer = document.getElementById('dashVideoPlayer');
    if (!liveLink) {
        alert('Please enter a valid MPD/M3U8/MP4 link!');
        return;
    }
    if (playerType === 'dashjs') {
        if (dashPlayerContainer && dashVideoPlayer) {
            dashPlayerContainer.style.display = 'block';
            const player = dashjs.MediaPlayer().create();
            if (clearKeyId && clearKey) {
                player.setProtectionData({
                    "org.w3.clearkey": {
                        "clearkeys": {
                            [clearKeyId]: clearKey
                        }
                    }
                });
            }
            player.initialize(dashVideoPlayer, liveLink, true);
            // Use unencoded values for dashjs
            playerLink.href = `https://hlsplayers.pages.dev/mpd?url=${liveLink}${clearKeyId ? `&key1=${clearKeyId}` : ''}${clearKey ? `&key2=${clearKey}` : ''}`;
            window.open(playerLink.href, '_blank');
        } else {
            alert('DASH player container not found!');
        }
    } else {
        let basePlayerUrl;
        switch (playerType) {
            case 'player1':
                basePlayerUrl = 'https://hlsplayers.pages.dev/player1.html?url=';
                break;
            case 'player2':
                basePlayerUrl = 'https://hlsplayers.pages.dev/player2.html?url=';
                break;
            case 'player3':
                basePlayerUrl = 'https://hlsplayers.pages.dev/player3.html?url=';
                break;
            case 'player4':
                basePlayerUrl = 'https://hlsplayers.pages.dev/player4.html?url=';
                break;
            case 'player5':
                basePlayerUrl = 'https://hlsplayers.pages.dev/player5.html?url=';
                break;
            case 'player6':
                basePlayerUrl = 'https://hlsplayers.pages.dev/iframe.html?url=';
                break;
            case 'flv':
                basePlayerUrl = 'https://hlsplayers.pages.dev/flv.html?url=';
                break;
            case 'mp4':
                basePlayerUrl = 'https://hlsplayers.pages.dev/mp4.html?url=';
                break;
            default:
                alert('Invalid player selected!');
                return;
        }
        if (dashPlayerContainer) dashPlayerContainer.style.display = 'none';
        playerLink.href = basePlayerUrl + liveLink;
        window.open(playerLink.href, '_blank');
    }
}
// Double-tap to copy iframe URL to clipboard
function copyIframeUrl() {
    const iframeUrlField = document.getElementById('iframeUrl');
    iframeUrlField.select();
    document.execCommand('copy');
    alert('Iframe URL copied to clipboard!');
}
