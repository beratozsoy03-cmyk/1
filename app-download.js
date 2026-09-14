/* Premium Yönetim — Uygulamayı İndir: cihaz algılama ve mağaza yönlendirme */
(function () {
  var STORE_LINKS = {
    ios: 'https://apps.apple.com/app/premium-site-y%C3%B6netimi/id6766459421',
    android: 'https://play.google.com/store/apps/details?id=com.apsiyon.premiumyonetim'
  };

  function detectPlatform() {
    var ua = navigator.userAgent || navigator.vendor || '';
    if (/android/i.test(ua)) return 'android';
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
    // iPadOS 13+ Safari raporlarken kendini Mac gibi tanıtır; dokunmatik ile ayırt et
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'ios';
    return 'desktop';
  }

  function openStore(platform) {
    var url = platform === 'android' ? STORE_LINKS.android : STORE_LINKS.ios;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function closePopover() {
    var existing = document.querySelector('.app-store-popover');
    if (existing) existing.remove();
    document.removeEventListener('click', onDocClick, true);
  }

  function onDocClick(e) {
    var pop = document.querySelector('.app-store-popover');
    if (pop && !pop.contains(e.target)) closePopover();
  }

  function showPopover(anchorBtn) {
    closePopover();
    var wrap = anchorBtn.closest('.app-download-wrap') || anchorBtn.parentElement;
    var pop = document.createElement('div');
    pop.className = 'app-store-popover';
    pop.setAttribute('role', 'menu');

    var iosOpt = document.createElement('button');
    iosOpt.type = 'button';
    iosOpt.className = 'app-store-popover-option';
    iosOpt.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 1.5c.1 1-.3 2-1 2.8-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 1-2.7.7-.8 1.9-1.4 2.8-1.4zM20.6 17.2c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.2-4 3.2-1.5 0-1.9-1-3.9-1s-2.5 1-4 1c-1.7 0-2.9-1.6-3.9-3-2.7-3.8-3-8.3-1.3-10.7 1.2-1.7 3-2.7 4.7-2.7 1.7 0 2.8 1 4.2 1 1.3 0 2.2-1 4.2-1 1.5 0 3.1.8 4.2 2.2-3.7 2-3.1 7.3.3 8.3z"/></svg><span>iPhone / iPad</span>';
    iosOpt.addEventListener('click', function (e) {
      e.stopPropagation();
      openStore('ios');
      closePopover();
    });

    var androidOpt = document.createElement('button');
    androidOpt.type = 'button';
    androidOpt.className = 'app-store-popover-option';
    androidOpt.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.3 8.2v7.6c0 .5.4.9.9.9h1v3a1.4 1.4 0 0 0 2.8 0v-3h2v3a1.4 1.4 0 0 0 2.8 0v-3h1c.5 0 .9-.4.9-.9V8.2H6.3zM4.6 8.2c-.7 0-1.3.6-1.3 1.3v5.6a1.3 1.3 0 0 0 2.6 0V9.5c0-.7-.6-1.3-1.3-1.3zm14.8 0c-.7 0-1.3.6-1.3 1.3v5.6a1.3 1.3 0 0 0 2.6 0V9.5c0-.7-.6-1.3-1.3-1.3zM8.9 4.3l-.9-1.6a.3.3 0 0 1 .5-.3l.9 1.6a6.6 6.6 0 0 1 5.2 0l.9-1.6a.3.3 0 0 1 .5.3l-.9 1.6a5.9 5.9 0 0 1 2.9 4.6H6a5.9 5.9 0 0 1 2.9-4.6zM9.6 6.7a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2zm4.8 0a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2z"/></svg><span>Android</span>';
    androidOpt.addEventListener('click', function (e) {
      e.stopPropagation();
      openStore('android');
      closePopover();
    });

    pop.appendChild(iosOpt);
    pop.appendChild(androidOpt);
    wrap.appendChild(pop);

    setTimeout(function () {
      document.addEventListener('click', onDocClick, true);
    }, 0);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.app-download-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var platform = detectPlatform();
        if (platform === 'ios' || platform === 'android') {
          openStore(platform);
        } else {
          showPopover(btn);
        }
      });
    });
  });
})();
