/**
 * Created by Jeffrey on 1/23/2016.
 */

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var JQuery = require('jquery');

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

    handleCommitSubmit: function(commit) {
        JQuery.ajax({
            url: "/commit",
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(commit),
            success: function(data) {
                this.setState({flipped: data.flipped});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/brink", status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount(){
        this.loadBrinkFromServer(this.props.params.brinkId);
    },

    getInitialState(){
        return {title: "", description: "", flipped:false}
    },

    render: function() {
        return (
            <div className="brink">
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
            <p>{"flipped: " + this.state.flipped.toString()}</p>
            <CommitForm onCommitSubmit={this.handleCommitSubmit}
                        brinkId={this.props.params.brinkId} />
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