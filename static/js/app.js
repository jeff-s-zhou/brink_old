var app = angular.module("app", []);

app.controller("AppCtrl", function ($http){
    var app = this;

    $http.get("/api/brink").success(function (data) {
        app.brinks = data.objects;
    })

    app.addBrink = function () {
        $http.post("/api/brink", {"title":"new" + app.brinks.length, "description":"described"})
            .success(function (data) {
                app.brinks.push(data);
            })
    }

    $http.get("/api/commit").success(function (data) {
        app.commits = data.objects;
    })

    app.addCommit = function () {
        $http.post("/commit", {"name":app.name, "brinkPoint":app.brinkPoint, "brinkId":1})
            .success(function (data) {
                app.commits.push(data);
            })
    }


})