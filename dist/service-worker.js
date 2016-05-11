importScripts('sw-toolbox.js');
var CACHE_PREFIX = 'brocsw-v';
var CACHE_VERSION = CACHE_PREFIX+'1463010415006';
toolbox.options.cache.name = CACHE_VERSION;
toolbox.options.debug = true;
var urlsToPrefetch = [
    '/',
    "assets/ember-progressive-webapp.css",
    "assets/ember-progressive-webapp.js",
    "assets/ember-progressive-webapp.map",
    "assets/failed.png",
    "assets/images/demystifying-density.svg",
    "assets/images/design-from-ios.png",
    "assets/images/expressing-brand.svg",
    "assets/images/new-design-tools.svg",
    "assets/images/pixate-and-form.svg",
    "assets/images/splash.svg",
    "assets/images/tooling-up.svg",
    "assets/images/touch/apple-touch-icon.png",
    "assets/images/touch/chrome-splashscreen-icon-384x384.png",
    "assets/images/touch/chrome-touch-icon-192x192.png",
    "assets/images/touch/icon-128x128.png",
    "assets/images/touch/ms-icon-144x144.png",
    "assets/images/touch/ms-touch-icon-144x144-precomposed.png",
    "assets/images/welcome.svg",
    "assets/passed.png",
    "assets/test-loader.js",
    "assets/test-support.css",
    "assets/test-support.js",
    "assets/test-support.map",
    "assets/tests.js",
    "assets/tests.map",
    "assets/vendor.css",
    "assets/vendor.js",
    "assets/vendor.map",
    "crossdomain.xml",
    "data/art.json",
    "data/demystifying-density.json",
    "data/design-from-ios-to-android-and-back-again.json",
    "data/expressing-brand-in-material.json",
    "data/film.json",
    "data/new-design-tools.json",
    "data/pixate-and-form-1-3.json",
    "data/tooling-up.json",
    "data/welcome-to-the-new-google-design.json",
    "index.html",
    "manifest.json",
    "testem.js",
    "tests/index.html"
];
urlsToPrefetch.forEach(function(url) {
  toolbox.router.any(url, toolbox.cacheFirst);
});
toolbox.precache(urlsToPrefetch);
self.addEventListener('install', function(event) {
console.log('Handling install event. Resources to pre-fetch:', urlsToPrefetch);
  if (self.skipWaiting) { self.skipWaiting(); }
});

self.addEventListener('activate', function(event) {
  // Delete all caches handled by broccoli-serviceworker.
  logDebug('Deleting out of date caches, current cache version:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return (cacheName.indexOf('$$$inactive$$$') === -1 && cacheName.indexOf(CACHE_PREFIX) === 0 && cacheName !== CACHE_VERSION);
        }).map(function(cacheName) {
          logDebug('Deleting out of date cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      self.clients.claim();
    })
  );
});

function getFallbackFromCache(request, values, options) {
  logDebug('Fetching from fallback url: '+ options.fallbackURL +'for url: '+request.url);
  var req = new Request(options.fallbackURL, request);
  return toolbox.cacheFirst(req, values, options).then(function(response) {
    if (response) {
      logDebug('Got fallback response from cache',response);
      return response;
    }
  });
}

function fallbackResponse(request, values, options) {
  logDebug('Looking for fallback for:', request.url);
  return new Promise(function(resolve, reject) {
    toolbox.networkFirst(request, values, options).then(function(response) {
      if (response) {
        resolve(response);
      } else {
        logDebug('Network first returned no response, calling fallback from cache.');
        getFallbackFromCache(request, values, options).then(resolve).catch(function(err) {
          logDebug('Fallback failed with:', err);
        });
      }
    }).catch(function(err){
      logDebug('Network first returned err, calling fallback from cache:', err);
      getFallbackFromCache(request, values, options).then(resolve).catch(function(err) {
          logDebug('Fallback2 failed with:', err);
      });
    });
  });
}

function logDebug() {
  if (toolbox.options.debug) {
    if (arguments.length > 1) {
      var consoleArgs = [];
      for (var i=1;i<arguments.length;i++) {
        consoleArgs.push(arguments[i]);
      }
      console.log(arguments[0], consoleArgs);
    } else {
      console.log(arguments[0]);
    }
  }
}
