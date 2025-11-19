'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "ccdedb042d84498debfe8fc4aa600baa",
"version.json": "1f30dd58a4c4de7cea3a050a7d722cf4",
"index.html": "947fabb7fbd8a154e7d5b16bcf47f43c",
"/": "947fabb7fbd8a154e7d5b16bcf47f43c",
"main.dart.js": "0dbaee49bdc49046f1a9c59fe9fa8e4f",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"logo.jpg": "24bf7f4ecbeeb78a3b19dca89b28a6f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "b2d0da2876d97d3bbfb8448532f7069f",
"assets/AssetManifest.json": "23566c6d7754fcb0a661a07e9631f5d1",
"assets/NOTICES": "11570910d00f4cb19166555a748fdc11",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/AssetManifest.bin.json": "e3014c194d6d6fb1c81ebe7d7c539fe6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dfda514c91b419fc20f8a334770ae3ba",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "46a35906e7d628e05db041f44c2c189b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "8f147a1e2231fc0682dd85859d7c3738",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "58d83c275faceb286f7724ce62ffca42",
"assets/fonts/MaterialIcons-Regular.otf": "d29536a3db0c939a30c9715d17a83675",
"assets/assets/images/kick_tracker.png": "68cfc2cf85f95f1a3e3a22deefbe29c8",
"assets/assets/images/is_it_safe.png": "ce2af946c693bdd9f0d1a78d2ee25cc8",
"assets/assets/images/shopping_check_list.png": "c255f78d998f1a2252e6b587c2795cd2",
"assets/assets/images/reminder.png": "7f0c10fc45bc859020a64688a5b3db2e",
"assets/assets/images/ovulation_calculator.png": "4ff01276d6966e0348018961828167d0",
"assets/assets/images/contraction_timer.png": "5c4268f214a83fde61a9b5830609f825",
"assets/assets/images/plantLeaf.png": "4a89c7d505919f34e036da9756b1ed23",
"assets/assets/images/due_date_calculator.png": "ca6cb877c9bdb4cb94ddab1ff79c6928",
"assets/assets/images/notes.png": "49b9b95d929edd8991ea6c17473af6d4",
"assets/assets/images/diaper_tracking.png": "6309d99cf6aaba31986c02d29cde6784",
"assets/assets/images/weight_gain_calculator.png": "d48567c95c5ce80e5edf3ab7728451c1",
"assets/assets/images/fetus.png": "1d998eaee9d6b3bc19c3e8e67c4ccd28",
"assets/assets/images/calendar.png": "5274820739c1a0c64cdac4bd2d92fe07",
"assets/assets/images/symptoms_tracking.png": "f34bc7fafdcff550e8561e2888dfa526",
"assets/assets/images/conceive.png": "53ee136cdc02d1cd5304712b6513d47d",
"assets/assets/images/appointments.png": "30443526938d04817a6b4f9129c262b0",
"assets/assets/images/leaf.png": "1bfec6f69b6e2cead9c433b8f35c5761",
"assets/assets/images/check_up.png": "a9adb0dd273c9571448b6c24aaa57c15",
"assets/assets/images/bumpie.png": "b39ebdc6c064356751b204b233a72611",
"assets/assets/images/baby.png": "50c8e0e2761938f1b66a4a8e9b1deea1",
"assets/assets/images/period_date.png": "b0998b969dcff033682b1ef722a09023",
"assets/assets/images/memories.png": "3c447966da554a70b02817fe50f49640",
"assets/assets/images/baby_feet.png": "a48c6e9a7634c385a747e86c88ce6327",
"assets/assets/animation/flower.json": "652422c7ece3863a360dcdb2d85bc1ca",
"assets/assets/logo/icon_ios.png": "8d1cfcc2efaf31f161c75c9579761897",
"assets/assets/logo/logo.png": "a3008fee3d0313985802e3df85b08aa1",
"assets/assets/logo/icon_android.png": "aaaad08227595c0e9a7e45c58559f383",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
