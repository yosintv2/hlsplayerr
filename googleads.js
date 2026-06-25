// Google AdSense - Manual ad initialization
(function() {
  function initAds() {
    var slots = document.querySelectorAll('.ad, .adsbygoogle');
    for (var i = 0; i < slots.length; i++) {
      try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    }
  }
  if (document.readyState === 'complete') initAds();
  else window.addEventListener('load', initAds);
})();
