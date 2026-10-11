// Service du jeu : il garde tous les fichiers en mémoire pour jouer sans internet. Généré par outils/preparer_web.py.
const CACHE = 'ranch-6e515756eaf6';
const FICHIERS = ["./", "./assets/amy.json", "./assets/cheval-licence.txt", "./assets/cheval.json", "./assets/humain.json", "./assets/textures/Hair_baseColor.png", "./assets/textures/Hair_normal.jpg", "./assets/textures/Horse_baseColor.jpg", "./assets/textures/Horse_normal.jpg", "./assets/textures/Horseshoe_baseColor.jpg", "./assets/textures/Horseshoe_normal.jpg", "./assets/textures/Saddle_baseColor.jpg", "./assets/textures/Saddle_normal.jpg", "./assets/textures/amy_0_image.jpg", "./assets/textures/amy_1_image.jpg", "./assets/textures/humain_0_image.jpg", "./assets/textures/humain_10_image.png", "./assets/textures/humain_11_image.jpg", "./assets/textures/humain_1_image.jpg", "./assets/textures/humain_2_image.jpg", "./assets/textures/humain_3_image.jpg", "./assets/textures/humain_4_image.jpg", "./assets/textures/humain_5_image.jpg", "./assets/textures/humain_6_image.jpg", "./assets/textures/humain_7_image.jpg", "./assets/textures/humain_8_image.png", "./assets/textures/humain_9_image.jpg", "./icones/icone-192.png", "./icones/icone-512.png", "./index.html", "./manifest.webmanifest", "./vendor/three/LICENSE", "./vendor/three/build/three.module.js", "./vendor/three/examples/jsm/loaders/GLTFLoader.js", "./vendor/three/examples/jsm/utils/BufferGeometryUtils.js", "./vendor/three/examples/jsm/utils/SkeletonUtils.js"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(rep => {
    // polices Google : gardées aussi, pour le prochain lancement hors ligne
    if (rep.ok && /fonts\.(googleapis|gstatic)\.com/.test(e.request.url)) { const copie = rep.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); }
    return rep;
  }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
