self.addEventListener('install', function(e) {
	// 在Service Worker激活之前做缓存
	// e.waitUntil在内部的promise返回正确之后才会走到下面的声明周期
	console.log('install')
	e.waitUntil(
		caches.open('app-v1')
		.then(function(cache) {
			console.log('open cache')
			return cache.addAll([
				'./app.js',
				'./serviceWorker.html',
				'./main.css'
			])
		}).catch (function(e) {
			console.error(e)
		})
	)
})

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(res) {
			// 如果命中缓存则从缓存中取
			if(res) {
				return res
			} else {
				// // 否则重新发起请求
				// fetch(url).then (function(res) {
				// 	if(res) {
				// 	// 对于新请求到的资源存储到cache storage中
				// 	} else {

				// 	}
				// })
			}
		})
	)
})

