if (navigator.serviceWorker) {
	navigator.serviceWorker.register('./serviceWorker.js', {
		scope: './'	
	})
	.then ( function (res) {
		console.log(res)
	})
	.catch ( function (e) {
		console.log(e)
	})
} else {
	alert('Service Worker is not supported')
}