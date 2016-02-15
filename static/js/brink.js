/**
 * Created by Jeffrey on 1/23/2016.
 */

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var JQuery = require('jquery');

//bootstrap
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

//container for a brink
module.exports = Brink = React.createClass({
    loadBrinkFromServer: function(brinkId) {
        JQuery.ajax({
            //TODO: figure out how to pass props through react-router
            //without using the URL
            url: ("/api/brink/" + brinkId),
            contentType: "application/json",
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({title: data.title, description: data.description, flipped: data.flipped});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/brink", status, err.toString());
            }.bind(this)
        });
    },

    loadCommitsFromServer: function(brinkId) {
        JQuery.ajax({
            //we use a special route and not the automagic api because we don't want all the info public
            //and it requires a lot of special processing
            url: ("/get_commits/" + brinkId),
            contentType: "application/json",
            dataType: "json",
            cache: false,
            success: function(data) {
                console.log(data.objects);
                this.setState({flippedCommits: data.objects});
                console.log(this.state.flippedCommits);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/get_commits", status, err.toString());
            }.bind(this)
        });
    },

    handleCommitSubmit: function(commit) {
        JQuery.ajax({
            url: "/commit",
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(commit),
            success: function(data) {
                //reload the commit page
                this.loadCommitsFromServer(commit.brinkId);
                this.setState({flipped: data.flipped});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/brink", status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount(){
        this.loadBrinkFromServer(this.props.params.brinkId);
        this.loadCommitsFromServer(this.props.params.brinkId);
        //need to bind the context of this inside the function
        //TODO: figure out why this doesn't take in the argument
        /*this.setState({intervalId: setInterval(
            function() {this.loadCommitsFromServer(this.props.params.brinkId); }.bind(this), 2000)});*/
    },

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    },

    getInitialState(){
        return {title: "", description: "", flipped:false, flippedCommits: [], intervalId: 0}
    },

    render: function() {
        return (
            <div className="brink">
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            <p>{"flipped: " + this.state.flipped.toString()}</p>
            <Ticker data={this.state.flippedCommits}/>
            <CommitForm onCommitSubmit={this.handleCommitSubmit}
                        brinkId={this.props.params.brinkId} />
            </div>
        );
  }
});

//displays ongoing flipped commits
var Ticker = React.createClass({
    render: function() {
    console.log(this.props.data)
    var commits = this.props.data.map(function(commit) {
            return (
                <CommitEntry
                    key = {commit[1]}
                    entry = {commit[0]}
                />
            );
        });
    return (
        <div className="ticker">
            <ListGroup>
                {commits}
            </ListGroup>
        </div>
    );
  }
});

var CommitEntry = React.createClass({
    render: function() {
        return (
         <div>
            <ListGroupItem>
                {this.props.entry}
            </ListGroupItem>
        </div>
        );
    }
});


//the form for a commit
var CommitForm = React.createClass({
    getInitialState: function() {
        return {name: '', brinkPoint: ''}
    },
    handleNameChange: function(e) {
        this.setState({name: e.target.value});
    },
    handleBrinkPointChange: function(e) {
        this.setState({brinkPoint: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var brinkPoint = this.state.brinkPoint.trim();
        var brinkId = this.props.brinkId;
        if (!name || ! brinkPoint) {
            return;
        }
        this.props.onCommitSubmit({name: name, brinkPoint: brinkPoint, brinkId : brinkId});
        this.setState({name: '', brinkPoint: ''});
    },
    render: function() {
    return (
        <div>
            <h1>Brink Form</h1>
            <form className="commitForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <br />
                <input
                    type="number"
                    value={this.state.brinkPoint}
                    onChange={this.handleBrinkPointChange}
                />
                <br />
                <input type="submit" value="Post" />
            </form>
        </div>
    );
  }
});