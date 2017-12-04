'use strict';

(function() {
  function killLoadingScreen() {
    var el = document.getElementById('loading-screen');
    if (!el.classList.contains('stop')) {
      el.classList.add('stop');
    }
  }

  window.addEventListener('load', killLoadingScreen);
})();
