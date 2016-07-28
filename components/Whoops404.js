import React from 'react'
import Router from 'react-router'
var Link = Router.Link;

class Whoops404 extends React.Component{
	render() {
		return (
			<div id="not-found">
				<h1>Whoops...</h1>
				<p>We cannot find the page that you have requested.
				   Were you looking for one of these: </p>

				<Link to="/">Join as Audience</Link>
				<Link to="/speaker">Start the presentation</Link>
				<Link to="/board">View the board</Link>

			</div>
		);
	}
}

module.exports = Whoops404;
