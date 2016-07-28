var React = require('react');

class Header extends React.Component{

	render() {
		return (
			<header className="row">
				<div className="col-xs-10">
					<h2>{this.props.title}</h2>
					<p>{this.props.speaker}</p>
				</div>
				<div className="col-xs-2">
					<span id="connection-status" className={this.props.status}></span>
				</div>
			</header>
		);
	}

}

Header.propTypes = {
	title: React.PropTypes.string.isRequired
};

Header.defaultProps = {
	status: 'disconnected'
};

module.exports = Header;
