const LANG_CODES = ['es', 'fr', 'de', 'hi', 'ja', 'pt'];
const IS_FILE = window.location.protocol === 'file:';
const HAS_LANG_SEGMENT = LANG_CODES.some((code) => window.location.pathname.includes(`/${code}/`));
const LOCAL_PREFIX = HAS_LANG_SEGMENT ? '../' : './';
const ROOT_PREFIX = IS_FILE ? LOCAL_PREFIX : '/';
const HOST_PREFIX = IS_FILE ? '' : 'https://hlsplayers.pages.dev';

const PLAYER_MAP = {
  player1: `${ROOT_PREFIX}player1.html?url=`,
  player2: `${ROOT_PREFIX}player2.html?url=`,
  player3: `${ROOT_PREFIX}player3.html?url=`,
  player4: `${ROOT_PREFIX}player4.html?url=`,
  player5: `${ROOT_PREFIX}player5.html?url=`,
  player6: `${ROOT_PREFIX}iframe.html?url=`,
  flv: `${ROOT_PREFIX}flvplayer.html?url=`,
  mp4: `${ROOT_PREFIX}mp4.html?url=`,
  dashjs: `${ROOT_PREFIX}mpd.html?url=`
};

function buildPlayerUrl() {
  const liveLink = document.getElementById('livelink')?.value.trim();
  const playerType = document.getElementById('playerytype')?.value;
  if (!liveLink || !PLAYER_MAP[playerType]) return '';
  return `${PLAYER_MAP[playerType]}${liveLink}`;
}

function generateIframeUrl() {
  const iframeUrlField = document.getElementById('iframeUrl');
  const iframeSection = document.getElementById('iframeSection');
  const copyBtn = document.getElementById('copyBtn');
  if (!iframeUrlField || !iframeSection) return;

  const targetUrl = buildPlayerUrl();
  if (!targetUrl) {
    iframeSection.style.display = 'none';
    if (copyBtn) copyBtn.style.display = 'none';
    return;
  }

  const src = IS_FILE ? targetUrl : `${HOST_PREFIX}${targetUrl}`;
  iframeUrlField.value = `<iframe src="${src}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
  iframeSection.style.display = 'block';
  if (copyBtn) copyBtn.style.display = 'block';
}

function redirectToPlayer() {
  const targetUrl = buildPlayerUrl();
  if (!targetUrl) {
    alert('Please enter a valid video URL.');
    return;
  }
  const href = IS_FILE ? targetUrl : `${HOST_PREFIX}${targetUrl}`;
  window.open(href, '_blank', 'noopener,noreferrer');
}

function copyIframeUrl() {
  const iframeUrlField = document.getElementById('iframeUrl');
  if (!iframeUrlField || !iframeUrlField.value) return;
  navigator.clipboard.writeText(iframeUrlField.value).then(() => {
    alert('Embed code copied.');
  }).catch(() => {
    iframeUrlField.select();
    document.execCommand('copy');
    alert('Embed code copied.');
  });
}
