var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};

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
		} else if (this.id === speaker.id) {
			console.log("%s has left. '%s' is over.", speaker.name, title);
			speaker = {};
			title = "Untitled Presentation";
			io.sockets.emit('end', { title: title, speaker: '' });
		}
    // We are going to use splice to remove that connection from the array. By using the indexOf we find the current connection
    connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s sockets remaining.", connections.length);
	});

	socket.on('join', function(payload) {
		var newMember = {
			id: this.id,
			name: payload.name,
			type: 'audience'
		};
		this.emit('joined', newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
		console.log("Audience Joined: %s", payload.name);
	});

	socket.on('start', function(payload) {
		speaker.name = payload.name;
		speaker.id = this.id;
		speaker.type = 'speaker';
		title = payload.title;
		this.emit('joined', speaker);
		// Two - when the user starts the presentation.
		io.sockets.emit('start', { title: title, speaker: speaker.name });
		console.log("Presentation Started: '%s' by %s", title, speaker.name);
	});

  // socket.emit is used to emit events that can be handled by the client
	socket.emit('welcome', {
		title: title,
		// One - when the user joins the presentation
		audience: audience,
		speaker: speaker.name
	});

  // This will handle once socket connects, we add the socket id to the array
	connections.push(socket);
    console.log("Connected: %s sockets connected.", connections.length);
});

console.log("Polling server is running at 'http://localhost:3000'");
