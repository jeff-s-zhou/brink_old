/**
 * Created by Jeffrey on 1/21/2016.
 */
// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link

var About = React.createClass({
    render: function() {
    return (
        <h1>About</h1>
    );
  }
});

var Inbox = React.createClass({
    render: function() {
    return (
        <h1>Inbox</h1>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>App</h1>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
), document.body
);
