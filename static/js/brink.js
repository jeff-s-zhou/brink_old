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
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/api/brink", status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount(){
        console.log(this.props.params.brinkId);
        this.loadBrinkFromServer(this.props.params.brinkId);
    },

    getInitialState(){
        return {data: {title: "", description: ""}}
    },

    render: function() {
    return (
        <div className="brink">
        <h1>{this.state.data.title}</h1>
        {this.state.data.description}
        </div>
    );
  }
});

//the info for every brink
var BrinkInfo = React.createClass({
    render: function() {
        return (
            <h2>BrinkInfo</h2>
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