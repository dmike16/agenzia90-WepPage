/**
 * Service worker template -- Parsed using Google Worbox
 */
 importScripts('./workbox-sw.js');

 const workbox = new WorkboxSW({
   skipWaiting: true,
   clientsClaim: true
 });

 //register router for google fonts
 const route = new workbox.routing.ExpressRoute({
   path : 'https://fonts.googleapis.com/:file',
   handler: workboxSW.strategies.staleWhileRevalidate()
 });
 const router = new workbox.routing.Router();
 router.registerRoute({route});

 //will be filled by workbox-build.injectManifest()
 workbox.precache([]);
