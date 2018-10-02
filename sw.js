let staticCache = 'restaurant-static-v1';

self.addEventListener('install', function (event) {

	//andamento da instalação
	event.waitUntil(
		caches.open(staticCache).then(function (cache) {
			return cache.addAll(
				[
					'/',
					'index.html',
					'restaurant.html',

					'css/styles.css',
					'css/index.css',
					'css/restaurant_info.css',

					'js/dbhelper.js',
					'js/main.js',
					'js/restaurant_info.js',
					'js/sw_registration.js',
					'data/restaurants.json',

					'img/1.jpg',
					'img/2.jpg',
					'img/3.jpg',
					'img/4.jpg',
					'img/5.jpg',
					'img/6.jpg',
					'img/7.jpg',
					'img/8.jpg',
					'img/9.jpg',
					'img/10.jpg',
				]
			)
		})
	)
})

self.addEventListener('fetch', function (event) {
	console.log(event.request);

	event.respondWith(
		caches.match(event.request).then(response => {

			if (response) return response;

			return fetch(event.request).then(response => {
				if (response.status === 404) {
					return;
				}
				return caches.open(staticCache).then(cache => {
					cache.put(event.request.url, response.clone);
					return response;
				})
			})
		}).catch(error => {
			console.log(error);
			return;
		})

	);
})

// event.respondWith(
// 	fetch(event.request).then(function (response) {
// 		if (response.status === 404) {
// 			return new fetch('img/1.jpg.');
// 		}
// 		return response;
// 	}).catch(function (params) {
// 		return new Response('Falha ao conectar com o servidor.');
// 	})