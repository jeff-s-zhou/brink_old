/**
 * Created by Jeffrey on 1/23/2016.
 */

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var JQuery = require('jquery');

var Brink = require('./brink');

//page containing directory of brinks
module.exports = BrinkDirectory = React.createClass({
    loadBrinkEntriesFromServer: function() {
        JQuery.ajax({
            //TODO: figure out how to pass props through react-router
            //without using the URL
            url: "/api/brink",
            contentType: "application/json",
            dataType: "json",
            cache: false,
            success: function(data) {
                //TODO: only has 10 responses because
                //http://flask-restless.readthedocs.org/en/latest/requestformat.html#clientpagination
                //implement pagination
                this.setState({data: data.objects});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/brink", status, err.toString());
            }.bind(this)
        });
    },
    handleBrinkSubmit: function(brink) {
        JQuery.ajax({
            url: "/api/brink",
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(brink),//brink,
            success: function(data) {
                this.setState({data: this.state.data.concat([data])});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/brink", status, err.toString());
            }.bind(this)
        });
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
        <div className="brinkDirectory">
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
                            id={brinkEntry.id}
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
            <Link to={("/brink/" + this.props.id)}>link</Link>
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
        this.props.onBrinkSubmit({title: title, description: description, flipped: false});
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