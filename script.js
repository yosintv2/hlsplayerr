// Function to update iframe URL dynamically
  function generateIframeUrl() {
    const liveLink = document.getElementById('livelink').value.trim();
    const playerType = document.getElementById('playerytype').value;
    const iframeUrlField = document.getElementById('iframeUrl');
    const iframeSection = document.getElementById('iframeSection');

    if (liveLink) {
      let iframeUrl;
      switch (playerType) {
        case 'player1':
          iframeUrl = `<iframe src="https://cr7tv.github.io/player/player1.html?url=${liveLink}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
          break;
        case 'player2':
          iframeUrl = `<iframe src="https://cr7tv.github.io/player/player2.html?url=${liveLink}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
          break;
        case 'player3':
          iframeUrl = `<iframe src="https://cr7tv.github.io/player/player3.html?url=${liveLink}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
          break;
        case 'player4':
          iframeUrl = `<iframe src="https://cr7tv.github.io/player/player4.html?url=${liveLink}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
          break;
        case 'player5':
          iframeUrl = `<iframe src="https://cr7tv.github.io/player/player5.html?url=${liveLink}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
          break;
        case 'player6':
          iframeUrl = `<iframe src="https://cr7tv.github.io/player/iframe.html?url=${liveLink}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
          break;
        case 'flv':
          iframeUrl = `<iframe src="https://cr7tv.github.io/player/flv.html?url=${liveLink}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
          break;
        default:
          iframeUrl = '';
          break;
      }

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
        basePlayerUrl = 'https://cr7tv.github.io/player/player1.html?url=';
        break;
      case 'player2':
        basePlayerUrl = 'https://cr7tv.github.io/player/player2.html?url=';
        break;
      case 'player3':
        basePlayerUrl = 'https://cr7tv.github.io/player/player3.html?url=';
        break;
      case 'player4':
        basePlayerUrl = 'https://cr7tv.github.io/player/player4.html?url=';
        break;
      case 'player5':
        basePlayerUrl = 'https://cr7tv.github.io/player/player5.html?url=';
        break;
      case 'player6':
        basePlayerUrl = 'https://cr7tv.github.io/player/iframe.html?url=';
        break;
      case 'flv':
        basePlayerUrl = 'https://cr7tv.github.io/player/flv.html?url=';
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
