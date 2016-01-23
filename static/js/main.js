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


var About = React.createClass({
    render: function() {
    return (
        <h1>About</h1>
    );
  }
});

//page containing directory of brinks
var BrinkPage = React.createClass({
    loadBrinkEntriesFromServer: function() {
        JQuery.ajax({
            //TODO: figure out how to pass props through react-router
            url: "/api/brink",
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({data: data.objects});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/brink", status, err.toString());
            }.bind(this)
        });
    },
    handleBrinkSubmit: function(comment) {
        // TODO: submit to the server and refresh
    },
    getInitialState: function() {
        return{data: []};
    },
    componentDidMount: function() {
        this.loadBrinkEntriesFromServer();
        setInterval(this.loadCommentsFromServer, 2000);
    },
    render: function() {
    return (
        <div className="brinkPage">
        <h1>Brinks</h1>
        <BrinkList data={this.state.data}/>
        <BrinkForm onBrinkSubmit={this.handleBrinkSubmit} />
        </div>
    );
  }
});

//list of brinks to be displayed on brinks page
var BrinkList = React.createClass({
    render: function() {
        var brinkEntries = this.props.data.map(function(brinkEntry) {
            return (
                <BrinkEntry key={brinkEntry.id}
                            title={brinkEntry.title}
                            description={brinkEntry.description}>
                </BrinkEntry>
            );
        });
    return (
        <div className="brinkList">
            <h2>Brink List</h2>
            {brinkEntries}
        </div>
    );
  }
});

//entry for each brink
var BrinkEntry = React.createClass({
    render: function() {
    return (
        <div className="brinkEntry">
            <p>Brink Entry</p>
            {this.props.title}
        </div>
    );
  }
});

//brink creation form
var BrinkForm = React.createClass({
    getInitialState: function() {
        return {title: '', description: ''}
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    handleDescriptionChange: function(e) {
        this.setState({description: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var description = this.state.description.trim();
        if (!title || ! description) {
            return;
        }
        this.props.onBrinkSubmit({title: title, description: description});
        this.setState({title: '', description: ''});
    },
    render: function() {
    return (
        <div>
            <h1>Brink Form</h1>
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <br />
                <textarea
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                />
                <br />
                <input type="submit" value="Post" />
            </form>
        </div>
    );
  }
});

//container for a brink
var BrinkContainer = React.createClass({
    render: function() {
    return (
        <h1>BrinkContainer</h1>
    );
  }
});

//the info for every brink
var BrinkInfo = React.createClass({
    render: function() {
        return (
            <h1>BrinkInfo</h1>
        )
    }
})

//the form for a commit
var CommitForm = React.createClass({
    render: function() {
    return (
        <h1>Commit Form</h1>
    );
  }
});

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
        <Route path="brinks" component={BrinkPage}/>
        <Route path="about" component={About} />
    </Route>
  </Router>
), document.getElementById('content')
);
