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
		},

		connect() {
				// This is reffering to the React component
				// Whenever we call setState, React is automatically reinvoke render() below and pass a different status to our render.
				this.setState({ status: 'connected'});
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
