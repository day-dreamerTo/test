self.addEventListener('message', function(e) {
	// clients是serviceWorker管理的页面
	var promise = self.clients.matchAll().then(function(clientList) {
		var senderId = e.source ? e.source.id : 'unknown'
		clientList.forEach(function(client) {
			// 如果当前页面是发送消息的页面就什么都不做
			if(client.id == senderId) {
				return
			} else {
				// 对于其他页面:serviceWorker就发送消息到页面
				client.postMessage({
					client: senderId,
					message: e.data
				})
			}
		})
	}) 
	e.waitUntil(promise)
})