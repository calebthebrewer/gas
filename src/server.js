var express = require('express')
var app = express()
var server = require('http').Server(app)

app.set('port', process.env.PORT || 4000)

app.use(bodyParser())

server.listen(app.get('port'), function () {
	console.log('Doin\' something fun over at :' + app.get('port'))
})
