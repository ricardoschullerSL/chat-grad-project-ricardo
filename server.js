var server = require("./server/server");
var oAuthGithub = require("./server/oauth-github");
var MongoClient = require("mongodb").MongoClient;
// var credentials = require("./MongoDB/credentials.js");

var creds = {};

var port = process.env.PORT || 9090;
var dbUri = process.env.DB_URI || creds.DB_URI;
var oauthClientId = process.env.OAUTH_CLIENT_ID || creds.OAUTH_CLIENT_ID;
var oauthSecret = process.env.OAUTH_SECRET || creds.OAUTH_SECRET;

MongoClient.connect(dbUri, function(err, db) {
    if (err) {
        console.log("Failed to connect to db", err);
        return;
    }
    var githubAuthoriser = oAuthGithub(oauthClientId, oauthSecret);
    server(port, db, githubAuthoriser);
    console.log("Server running on port " + port);
});
