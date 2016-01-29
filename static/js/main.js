/**
 * Created by Jeffrey on 1/21/2016.
 */
// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router/lib/Router');
var Route = require('react-router/lib/Route');
var IndexRoute = require('react-router/lib/IndexRoute');
var Link = require('react-router/lib/Link');
var JQuery = require('jquery');

//react bootstrap
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');

//react router-bootstrap
var LinkContainer = require('react-router-bootstrap/lib/LinkContainer');

//our own react modules are handled differently
var BrinkDirectory = require('./brink-directory');
var Brink = require('./brink');
var About = require('./about');
var Home = require('./home');

var App = React.createClass({
  render: function() {
    return (
      <Grid>
          <Row>
              <Col md={1} />
              <Col md={10}>
              <Navbar>
                  <Navbar.Header>
                      <Navbar.Brand>
                          App
                      </Navbar.Brand>
                  </Navbar.Header>
                  <Nav>
                      <LinkContainer to="/about">
                          <NavItem eventKey={1}>
                              About
                          </NavItem>
                      </LinkContainer>
                      <LinkContainer to="/brinks">
                          <NavItem eventKey={2}>
                              Brinks
                          </NavItem>
                      </LinkContainer>

                  </Nav>
              </Navbar>


                {this.props.children}
              </Col>
              <Col md={1} />
          </Row>
      </Grid>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="brinks" component={BrinkDirectory} />
        <Route path="about" component={About} />
        <Route path="brink/:brinkId" component={Brink} />
    </Route>
  </Router>
), document.getElementById('content')
);
