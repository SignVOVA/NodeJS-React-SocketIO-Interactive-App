/*
 * Adding reusable components into the parts folder.
 * The file will contain header React component.
 */

 var React = require('react');

 var Header = React.createClass ({
      propTypes: {
          title: React.PropTypes.string.isRequired
      },

      //Default React method
      getDefaultProps() {
          return {
            status: 'discunnected'
          }
      },

      render() {
          return (
            <header className="row">
                <div className="col-xs-6">
                  <h2>{this.props.title}</h2>
                </div>
                <div className="col-xs-6">
                  <span id="connection-status" className={this.props.status}></span>
                </div>
            </header>
          );
      }
 });

module.exports = Header;
