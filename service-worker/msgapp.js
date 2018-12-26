if (navigator.serviceWorker) {
	var sendBtn = document.getElementById('send-msg-btn')
	var msgInput = document.getElementById('msg-input')
	var msgBox = document.getElementById('msg-box')

	sendBtn.addEventListener('click', function() {
		// 主页面发送信息到service worker
		navigator.serviceWorker.controller.postMessage(msgInput.value)
	})

	navigator.serviceWorker.addEventListener('message', function(e) {
		msgBox.innerHTML = msgBox.innerHTML += ('<li>' + e.data.message + '</li>')
	})

	navigator.serviceWorker.register('./msgsw.js', {
			scope: './'
		})
		.then(function (res) {
			console.log(res)
		})
		.catch(function (e) {
			console.log(e)
		})
} else {
	alert('Service Worker is not supported')
}