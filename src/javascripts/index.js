'use strict';

(function() {
  function killLoadingScreen() {
    var el = document.getElementById('loading-screen');
    var classes = el.className.split(' ');
    if (classes.indexOf('stop') === -1) {
      classes.push('stop')
      el.className = classes.join(' ').trim();
    }
  }

  window.addEventListener('load', killLoadingScreen);
})();
