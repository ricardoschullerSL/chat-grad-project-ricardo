var http = require("http");
var express = require("express");
var url = require("url");
var WebSocket = require("ws");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cookie = require("cookie");
var ObjectID = require("mongodb").ObjectID;


var chatCutOff = 50;


module.exports = function(port, db, githubAuthoriser) {
    var app = express();

    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(cookieParser());


    var server = http.createServer(app);
    var wss = new WebSocket.Server({
        server: server,
        path: "/websocket"
     });

    var users = db.collection("users");
    var chats = db.collection("chats");
    var sessions = {};
    var usersOnline = [];

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    wss.on("connection", function (ws) {
        if (ws.upgradeReq.headers.cookie !== undefined) {
            var cookies = cookie.parse(ws.upgradeReq.headers.cookie);
            var sessionToken = cookies.sessionToken;
            console.log(sessionToken);
            if (sessions[sessionToken]) {
                var user = sessions[sessionToken].user;
                sessions[sessionToken].websocket = ws;
                usersOnline.push({userID:user._id, websocket:ws});

                var users = usersOnline.map(function(user) {
                    return {
                        userID: user.userID
                    }
                });
                console.log(users);
                wss.broadcast(JSON.stringify({
                    type:"onlineusersupdate",
                    users: users
                }));
                ws.send(JSON.stringify({
                    type:"login",
                    data:"You are logged in."
                }));
            };
        }

        console.log((new Date()) + ", user connected");
        ws.on("message", function incoming(message) {
            console.log("User sent: ", message);
        });

        ws.onclose = function () {
            if (ws.upgradeReq.headers.cookie !== undefined) {
                var sessionToken = cookie.parse(ws.upgradeReq.headers.cookie).sessionToken;
                if (sessions[sessionToken]) {
                    var user = sessions[sessionToken].user;
                    var newUsersOnline = usersOnline.filter(function(usr) {
                        return usr.userID !== user._id;
                    });

                    var users = newUsersOnline.map(function(user) {
                        return { userID: user.userID }
                    });
                    usersOnline = newUsersOnline;
                    sessions[sessionToken] = null;
                    wss.broadcast(JSON.stringify({
                        type:"onlineusersupdate",
                        users: users
                    }));
                };
            };
        };
    });


    function pushMessageToUsers(message, usersListening, chatID, sender) {
        usersListening.forEach(function(userID) {
            var user = usersOnline.find((user) => {
                return user.userID === userID});
            if (user !== undefined) {
                user.websocket.send(JSON.stringify({
                    type:"message",
                    chatID: chatID,
                    message: message,
                    sentBy: sender
                }), (error) => {
                    if (error) {
                        console.log("Error while sending message to ", userID, error);
                    }
                });
            }


        });
    };


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


    app.get("/api/onlineusers", function(res, res) {
        // return array of online users
        if (usersOnline.length > 0) {
            res.json(usersOnline.map(function(user) {
                return {
                    userID: user.userID
                }
            }));
        } else {
            res.sendStatus(500);
        }
    })

    app.get("/api/user/allchats", function(req, res) {
        //return all chats belonging to user
        chats.find({usersListening: req.session.user._id})
        .toArray(function(err, docs) {
            console.log(docs);
            if (!err) {
                res.json(docs.map(function(chat) {
                    if (chat.messages.length > chatCutOff) {
                        chat.messages.splice(0, chat.messages.length - chatCutOff);
                    }
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

        chats.findOneAndUpdate(
            {"_id": req.params.chatID}, //query
            {$push: {messages: {text:req.body.message,
                                sentBy:req.session.user._id}}}, //update object
            {returnOriginal: false},
            function(err, object) { //callback
                if(!err) {
                    pushMessageToUsers(req.body.message, object.value.usersListening,
                         req.params.chatID, req.session.user._id);
                    res.sendStatus(200);
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

    app.get("/api/friends/:friendID/userinfo", function(req, res) {
        users.findOne({
            _id: req.params.friendID
        }, function(err, doc) {
            if(!err) {
                console.log(doc.value);
                var userinfo = {
                    name: doc.value.user.name,
                    avatarUrl: doc.value.user.avatarUrl
                };
                res.json(userinfo);

            } else {
                res.sendStatus(500);
            }
        });
    });

    app.put("/api/friends/addFriend", function(req, res) {
        // Add new friend to userID.friends
        var userID = req.session.user._id;
        var friendID = req.body.friendID;
        var chatID = userID < friendID ? userID +"+"+ friendID : friendID +"+"+ userID;

        users.findOneAndUpdate({_id:friendID},
            {$addToSet: {friends: {
                _id:userID,
                avatarUrl: req.session.user.avatarUrl,
                name: req.session.user.name,
                chatID: chatID
            }}
        })
        .then((doc) => {
            users.findOneAndUpdate({_id:userID},
                {$addToSet: {friends: {
                    _id:doc.value._id,
                    avatarUrl: doc.value.avatarUrl,
                    name: doc.value.name,
                    chatID: chatID
                }
            }})
            .then(() => {
                chats.insertOne({
                    _id: chatID,
                    messages: [],
                    usersListening: [userID, friendID]
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        })
        .catch((err) => {
            console.log("Error: " + err);
            res.status(500).send(err);
        })
    });

    return server.listen(port);
};
