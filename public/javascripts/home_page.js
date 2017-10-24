var coverImageEl = document.getElementById('home-page');
coverImageUrl = window.getComputedStyle(coverImageEl, false)
  .backgroundImage
  .match('http.+jpg')[0]
const loadFirst = [
  coverImageUrl
]

function whenImagesLoaded(imageUrls) {
  return Promise.all(loadFirst.map((url) => {
    return new Promise((fulfill, reject) => {
      image = new Image
      image.src = url;
      image.onload = function() {
        fulfill();
      };
    });
  }));
}

function waitAtLeast(fn, time) {
  var waited = false;
  var readyToFire = false;
  var waitFn = () => {
    readyToFire = true;
    // if minimum time already passed then fire
    if (waited) {
      fn.apply(null, arguments);
    }
  }
  window.setTimeout(() =>{
    waited = true;
    // if fn call attempted then call now now that min time has passed
    if (readyToFire) {
      fn.apply(null, arguments);
    }
  }, time);

  return waitFn;
}

function killLoadingScreen() {
  document.getElementById('loading-screen').className += 'stop';
}

let waitToKillLoadingScreen = waitAtLeast(killLoadingScreen, 2000);
whenImagesLoaded(loadFirst).then(
  // success
  () => {
    waitToKillLoadingScreen();
  },
  // This error cb might execute before all promises resolve
  () => {
    waitToKillLoadingScreen();
  }
);
