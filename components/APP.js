var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({

		getInitialState() {
				return {
					status: 'discunnected'
				}
		},

		componentWillMount() {
				this.socket = io('http://localhost:3000');
				this.socket.on('connect', this.connect);
				// Adding listener for disconnect, when socket disconnect we firethe disconnect event handler.
				// We need to create a disconnect event handler for this.
				this.socket.on('disconnect', this.disconnect);
		},

		connect() {
				// This is reffering to the React component
				// Whenever we call setState, React is automatically reinvoke render() below and pass a different status to our render.
				this.setState({ status: 'connected'});
		},

		disconnect() {
			this.setState({ status: 'disconnected'});
		},

		render() {
				return (
						<div>
								<Header title="Server Status" status={this.state.status} />
						</div>
				);
		}

});

module.exports = APP;
