import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
// import {Route, IndexRoute, MemoryRouter } from "react-router";
import Layout from "./components/Layout";
import { Provider } from "react-redux";

import store from "./store";

const app = document.getElementById("app");


ReactDOM.render(<Provider store={store}>
    <Layout /></Provider>, app);


/*(function() {
    var app = angular.module("ChatApp", []);

    app.controller("ChatController", function($scope, $http) {
        $scope.loggedIn = false;

        $http.get("/api/user").then(function(userResult) {
            $scope.loggedIn = true;
            $scope.user = userResult.data;
            $http.get("/api/users").then(function(result) {
                $scope.users = result.data;
            });
        }, function() {
            $http.get("/api/oauth/uri").then(function(result) {
                $scope.loginUri = result.data.uri;
            });
        });
    });
})();
*/
