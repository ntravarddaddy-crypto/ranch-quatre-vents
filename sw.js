// Service du jeu : il garde tous les fichiers en mémoire pour jouer sans internet. Généré par outils/preparer_web.py.
// Chaque fichier est rangé sous son empreinte (« fichier?v=empreinte ») : une nouvelle version ne retélécharge
// que les fichiers changés, et toujours depuis le serveur (cache: 'reload'), jamais depuis le cache de Chrome :
// GitHub Pages fait garder les fichiers 10 minutes, et une mise à jour reprenait l'ancienne page (2026-10-11).
const VERSION = 'c9a397e524b7';
const EMPREINTES = {
"./index.html": "b05b0e0d5b0a",
"./manifest.webmanifest": "3b2711e91796",
"./assets/amy.json": "f415bdd20ad5",
"./assets/cheval-licence.txt": "680f93fa92ea",
"./assets/cheval.json": "462cff784ce7",
"./assets/humain.json": "0fd7e0336d28",
"./assets/textures/Hair_baseColor.png": "9fa21d141edc",
"./assets/textures/Hair_normal.jpg": "baa371f89b80",
"./assets/textures/Horse_baseColor.jpg": "de09e1c5a494",
"./assets/textures/Horse_normal.jpg": "204a024fe726",
"./assets/textures/Horseshoe_baseColor.jpg": "61ee68a43c07",
"./assets/textures/Horseshoe_normal.jpg": "779451cab55a",
"./assets/textures/Saddle_baseColor.jpg": "60f3e2a23049",
"./assets/textures/Saddle_normal.jpg": "6660d0cc7482",
"./assets/textures/amy_0_image.jpg": "26b2cc001e65",
"./assets/textures/amy_1_image.jpg": "fcb95597547a",
"./assets/textures/humain_0_image.jpg": "bbaa8bbe15d7",
"./assets/textures/humain_10_image.png": "0fdac9148a7e",
"./assets/textures/humain_11_image.jpg": "9e2eda5b8856",
"./assets/textures/humain_1_image.jpg": "b07fc6bc57d8",
"./assets/textures/humain_2_image.jpg": "aba04eb7b205",
"./assets/textures/humain_3_image.jpg": "9e2eda5b8856",
"./assets/textures/humain_4_image.jpg": "36c25c9f181d",
"./assets/textures/humain_5_image.jpg": "0c2ab7a5c8cd",
"./assets/textures/humain_6_image.jpg": "6adb0a78f467",
"./assets/textures/humain_7_image.jpg": "a10a3a4259f3",
"./assets/textures/humain_8_image.png": "e30c2a6f163f",
"./assets/textures/humain_9_image.jpg": "38cf76298bf7",
"./icones/icone-192.png": "d9712a67e27a",
"./icones/icone-512.png": "8d3ea1fb0b96",
"./vendor/three/LICENSE": "852e0e869916",
"./vendor/three/build/three.module.js": "76dea8151bc9",
"./vendor/three/examples/jsm/loaders/GLTFLoader.js": "d073b438e6a0",
"./vendor/three/examples/jsm/utils/BufferGeometryUtils.js": "9be041e96308",
"./vendor/three/examples/jsm/utils/SkeletonUtils.js": "83748c5072a5"
};
const FICHIERS = 'ranch-fichiers', POLICES = 'ranch-polices';
const cle = f => f + '?v=' + EMPREINTES[f];
self.addEventListener('install', e => { e.waitUntil((async () => {
  const c = await caches.open(FICHIERS);
  for (const f of Object.keys(EMPREINTES)) {
    if (await c.match(cle(f))) continue;
    const rep = await fetch(f, { cache: 'reload' });
    if (!rep.ok) throw new Error(f + ' : ' + rep.status);
    await c.put(cle(f), rep);
  }
  await self.skipWaiting();
})()); });
self.addEventListener('activate', e => { e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== FICHIERS && k !== POLICES) await caches.delete(k); // anciennes versions
  const c = await caches.open(FICHIERS), gardees = new Set(Object.keys(EMPREINTES).map(f => new URL(cle(f), self.registration.scope).href));
  for (const r of await c.keys()) if (!gardees.has(r.url)) await c.delete(r);
  await self.clients.claim();
})()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url), portee = self.registration.scope;
  if (e.request.url.startsWith(portee)) {
    let f = './' + url.pathname.slice(new URL(portee).pathname.length);
    if (f === './' || f.endsWith('/')) f = './index.html';
    if (EMPREINTES[f]) { e.respondWith(caches.open(FICHIERS).then(c => c.match(cle(f))).then(r => r || fetch(e.request))); return; }
  }
  if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) // polices Google : gardées aussi, pour jouer hors ligne
    e.respondWith(caches.open(POLICES).then(c => c.match(e.request).then(r => r || fetch(e.request).then(rep => { if (rep.ok) c.put(e.request, rep.clone()); return rep; }))));
});
