const CACHE_NAME = "Galih Anggoro Prasetya";
const urlsToCache = [
  "/",
  "/assets/certificates/certificate-1.jpeg",
  "/assets/certificates/certificate-2.jpeg",
  "/assets/certificates/certificate-3.pdf",
  "/assets/certificates/certificate-4.pdf",
  "/assets/certificates/certificate-5.pdf",
  "/assets/certificates/certificate-6.pdf",
  "/assets/certificates/certificate-7.pdf",
  "/assets/img/bootstrap.webp",
  "/assets/img/burp-suite.webp",
  "/assets/img/css.webp",
  "/assets/img/favicon.png",
  "/assets/img/html.webp",
  "/assets/img/icon-192x192.png",
  "/assets/img/icon-512x512.png",
  "/assets/img/javascript.webp",
  "/assets/img/jquery.webp",
  "/assets/img/laravel.webp",
  "/assets/img/linux.webp",
  "/assets/img/metasploit.webp",
  "/assets/img/my-profile.webp",
  "/assets/img/mysql-workbench.webp",
  "/assets/img/mysql.webp",
  "/assets/img/nmap.webp",
  "/assets/img/php.webp",
  "/assets/img/postman.webp",
  "/assets/img/project1.webp",
  "/assets/img/project2.webp",
  "/assets/img/project3.webp",
  "/assets/img/project4.webp",
  "/assets/img/project5.webp",
  "/assets/img/project6.webp",
  "/assets/img/project7.webp",
  "/assets/img/python.webp",
  "/assets/img/sqlmap.webp",
  "/assets/img/wireshark.webp",
  "/assets/particles.js",
  "/assets/particles.json",
  "/assets/script.js",
  "/assets/style.css",
  "/assets/vanilla-tilt.min.js",
];

// Install event: lakukan penginstallan service worker dan cache file
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache:", error);
      })
  );
});

// Activate event: mulai service worker dan hapus cache lama jika ada
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("Failed to activate:", error);
      })
  );
});

// Fetch event: tangani permintaan jaringan dan memuat static assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
