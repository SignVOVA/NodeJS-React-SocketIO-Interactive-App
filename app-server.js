var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentation';
var audience = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  // Now we add a disonnect event. socket.once - when this socket diconnects. When it happens we can hadle this is the callback funciton
	socket.once('disconnect', function() {

		var member = _.findWhere(audience, { id: this.id });

		if (member) {
			audience.splice(audience.indexOf(member), 1);
			io.sockets.emit('audience', audience);
			console.log("Left: %s (%s audience members)", member.name, audience.length)
		}

    // We are going to use splice to remove that connection from the array.
    // By using the indexOf we find the current connection
    connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s sockets remaining.", connections.length);
	});

	socket.on('join', function(payload) {
		var newMember = {
			id: this.id,
			name: payload.name
		};
		this.emit('joined', newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
		console.log("Audience Joined: %s", payload.name);
	});

  // socket.emit is used to emit events that can be handled by the client
	socket.emit('welcome', {
		title: title
	});
  // This will handle once socket connects, we add the socket id to the array
	connections.push(socket);
    console.log("Connected: %s sockets connected.", connections.length);
});

console.log("Polling server is running at 'http://localhost:3000'");
