var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Ask = require('./parts/Ask');

/*
 * Audience > Question
 * When the Speaker asks a question we will emit an ask event and send the question to the server
 * Quesiton > app-server
 * The server then gather that question by listening to an ask event and emiting the ask event back to all of the connected sockets
 * APP
 * The APP will listen to that ask event and handle it by setting the state of the current question
 * Audience
 * And then we will display the current question in the audience component by using display and nesting the current question in that disaplay
 */

var Audience = React.createClass({
	render() {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>

					<Display if={this.props.member.name}>

						<Display if={!this.props.currentQuestion}>
							<h1>Welcome {this.props.member.name}</h1>
							<p>{this.props.audience.length} audience members connected</p>
							<p>Questions will appear here.</p>
						</Display>

						<Display if={this.props.currentQuestion}>
							<Ask question={this.props.currentQuestion} />
						</Display>

					</Display>

					<Display if={!this.props.member.name}>
						<h1>Join the session</h1>
					    <Join emit={this.props.emit} />
					</Display>

				</Display>
			</div>
		);
	}
});

module.exports = Audience;
