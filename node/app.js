var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var mime = require('./mime').types
var config = require('./config')
var PORT = 8000

var server = http.createServer(function (request, response) {
	var pathname = url.parse(request.url).pathname
	var realPath = 'assets' + pathname
	// 取后缀名
	var ext = path.extname(realPath)
	ext = ext ? ext.slice(1) : 'unknown'
	var contentType = mime[ext] || 'text/plain'

	//  200 from disk cache
	if (ext.match(config.Expires.fileMatch)) {
		var expires = new Date()
		expires.setTime(expires.getTime() + config.Expires.maxAge * 1000)
		response.setHeader('Expires', expires.toUTCString())
		response.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge)
	}

	fs.stat(realPath, function (err, stat) {
		var lastModified = stat.mtime.toUTCString()
		response.setHeader('Last-Modified', lastModified)
		if (request.headers['if-modified-since'] && lastModified == request.headers['if-modified-since']) {
			response.writeHead(304, 'Not Modified')
			response.end()
		} else {
			// 缓存策略是在读取文件之前做的事
			fs.exists(realPath, function (exists) {
				if (!exists) {
					response.writeHead(404, {
						'Content-Type': 'text/plain'
					})
					response.write('This request url' + pathname + 'was not fount')
					response.end()
				} else {
					fs.readFile(realPath, 'binary', function (err, file) {
						if (err) {
							response.writeHead(500, {
								'Content-Type': 'text/plain'
							})
							response.end()
						} else {
							response.writeHead(200, {
								'Content-Type': contentType
							})
							// 这里可以进行gzip的压缩优化
							response.write(file, 'binary')
							response.end()
						}
					})
				}

			})
		}
	})
})

server.listen(PORT)
console.log('Server running at port :' + PORT)