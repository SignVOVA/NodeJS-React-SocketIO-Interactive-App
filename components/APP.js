var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({

	getInitialState() {
			return {
				status: 'disconnected',
				title: '',
				anyElement: 'I can be any value'
			}
	},

	componentWillMount() {
			this.socket = io('http://localhost:3000');
			this.socket.on('connect', this.connect);
			// Adding listener for disconnect, when socket disconnect we firethe disconnect event handler.
			// We need to create a disconnect event handler for this.
			this.socket.on('disconnect', this.disconnect);
			// Wire up another listener
			this.socket.on('welcome', this.welcome);
	},

	connect() {
			// This is reffering to the React component
			// Whenever we call setState, React is automatically reinvoke render() below and pass a different status to our render.
			this.setState({ status: 'connected' });
	},

	disconnect() {
		this.setState({ status: 'disconnected' });
	},

	welcome(serverState) {
		this.setState({ title: serverState.title });
	},

	// '{...this.state}' allows us to pass the whole object instead of declated variables
	render() {
			return (
					<div>
							<Header title={this.state.title} status={this.state.status} />
							<RouteHandler {...this.state} />
					</div>
			);
	}

});

module.exports = APP;
