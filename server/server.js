var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

module.exports = function(port, db, githubAuthoriser) {
    var app = express();

    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(cookieParser());

    var users = db.collection("users");
    var chats = db.collection("chats");
    var sessions = {};

    app.get("/oauth", function(req, res) {
        githubAuthoriser.authorise(req, function(githubUser, token) {
            if (githubUser) {
                users.findOne({
                    _id: githubUser.login
                }, function(err, user) {
                    if (!user) {
                        // TODO: Wait for this operation to complete
                        users.insertOne({
                            _id: githubUser.login,
                            name: githubUser.name,
                            avatarUrl: githubUser.avatar_url,
                            friends: []
                        });
                    }
                    sessions[token] = {
                        user: { _id: githubUser.login,
                                name: githubUser.name,
                                avatarUrl:githubUser.avatar_url
                            }
                    };
                    res.cookie("sessionToken", token);
                    res.header("Location", "/");
                    res.sendStatus(302);
                });
            }
            else {
                res.sendStatus(400);
            }

        });
    });

    app.get("/api/oauth/uri", function(req, res) {
        res.json({
            uri: githubAuthoriser.oAuthUri
        });
    });

    app.use(function(req, res, next) {
        if (req.cookies.sessionToken) {
            req.session = sessions[req.cookies.sessionToken];
            if (req.session) {
                next();
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    });

    app.get("/api/user", function(req, res) {
        // return user info on login
        users.findOne({
            _id: req.session.user._id
        }, function(err, user) {
            if (!err) {
                res.json(user);
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.get("/api/users", function(req, res) {
        // return array of users registered to the server
        users.find().toArray(function(err, docs) {
            if (!err) {
                res.json(docs.map(function(user) {
                    return {
                        id: user._id,
                        name: user.name,
                        avatarUrl: user.avatarUrl
                    };
                }));
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.get("/api/user/allchats", function(req, res) {
        //return all messages
        chats.find({usersListening: req.session.user._id})
        .toArray(function(err, docs) {
            if (!err) {
                res.json(docs.map(function(chat) {
                    return { chat }}));
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.get("/api/chats/:chatID", function(req, res) {
        // Return messages from chat with _id: chatID
        chats.findOne({
            _id: req.params.chatID
        }, function (err, chat) {
            if(!err) {
                res.json(chat);
            } else {
                res.sendStatus(500);
            }
        });
    });

    app.post("/api/chats/:chatID", function(req, res) {
        // Add message to chat with _id: chatID
        chats.findAndModify(
            { _id: req.params.chatID }, //query
            [["_id", 1]], //sort
            {$push: {messages: req.body.message}}, //update object
            {new: true}, //options
            function(err, object) { //callback

                if(!err) {
                    res.json(object.value);
                } else {
                    res.sendStatus(500);
                }
            }
        );
    });

    app.get("/api/friends/:userID", function(req, res) {
        // Return friends belonging to userID
        users.findOne({
            _id: req.params.userID
        }, function(err, doc) {
                if(!err) {
                    res.json(doc.value.friends);
                } else {
                    res.sendStatus(500);
                }
            }
        );
    });

    app.post("/api/friends/:userID", function(req, res){
        // Add new user to userID.friends
        console.log(req.body)
        users.findAndModify(
            {_id: req.params.userID},
            [["_id", 1]],
            {$push: {friends: req.body}},
            {new: true},
            function(err, doc) {
                if(!err) {
                    res.json(doc.value.friends);
                } else {
                    res.sendStatus(500);

                }
            }
        );
    })

    return app.listen(port);
};
