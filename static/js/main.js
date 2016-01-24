/**
 * Created by Jeffrey on 1/21/2016.
 */
// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var JQuery = require('jquery');

//our own react modules are handled differently
var BrinkDirectory = require('./brink-directory');
var Brink = require('./brink');
var About = require('./about');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>App</h1>
          <ul>
            <li><Link to="/brinks">Brink</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
        <Route path="brinks" component={BrinkDirectory}>
        </Route>
        <Route path="about" component={About} />
        <Route path="brink/:brinkId" component={Brink} />
    </Route>
  </Router>
), document.getElementById('content')
);
