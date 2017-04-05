const express = require("express");
const http = require("http");
const url = require("url");
const WebSocket = require("ws");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");



module.exports = function(port, db, githubAuthoriser) {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.use(cookieParser());


    const server = http.createServer(app);
    const wss = new WebSocket.Server({
        server: server,
        path: "/websocket"
     });

    var users = db.collection("users");
    var chats = db.collection("chats");
    var sessions = {};
    var websockets = [];
    var usersOnline = [];

    wss.on("connection", function connection(ws) {

        const location = url.parse(ws.upgradeReq.url, true);
        const sessionToken = ws.upgradeReq.headers.cookie.toString().slice(-40);
        if (sessions[sessionToken]) {
            const user = sessions[sessionToken].user;
            ws.userID = user._id;
            websockets.push(ws);
            usersOnline.push(user._id);
            ws.send(JSON.stringify({type:"login", data:"You are logged in."}));

        }

        console.log((new Date()) + ", user connected");
        ws.on("message", function incoming(message) {
            console.log("Received message: ", message);
        });

        ws.on("close", function close(ws) {
            console.log((new Date()) + ", user disconnected");

        });
    });


    function pushMessageToUsers(message, usersListening, chatID, sender) {
        console.log("usersListening is :", usersListening);
        usersListening.forEach(function(userID) {
            console.log("User: ", userID);
            console.log("usersOnline: ", usersOnline);
            if (usersOnline.indexOf(userID) > -1) {
                console.log("User is online");
                userWebSocket = websockets.find(function(wsUser) {
                    console.log("userWebSocket found!");
                    return wsUser.userID === userID
                })
                console.log("Message is:", message);
                userWebSocket.send(JSON.stringify({
                    type:"message",
                    chatID: chatID,
                    message: message,
                    sentBy: sender
                }));
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

    app.get("/api/user/allchats", function(req, res) {
        //return all chats belonging to user
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
            {$push: {messages: {text:req.body.message,
                                sentBy:req.session.user._id}}}, //update object
            {new: true}, //options
            function(err, object) { //callback
                if(!err) {
                    console.log(req.body.message, object.value.usersListening);
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

    app.put("/api/friends/addFriend", function(req, res) {
        // Add new friend to userID.friends
        let userID = req.session.user._id;
        let friendID = req.body.friendID;
        console.log(req.session, req.body);
        let chatID = userID < friendID ? userID + friendID : friendID + userID;
        let promiseObject = {user: {
            friendID: userID,
            name: req.session.user.name,
            avatarUrl: req.session.user.avatarUrl,
            chatID: chatID
        }};
        users.findAndModify(
            { _id: friendID }, //query
            [["_id", 1]], //sort
            {$addToSet: {friends: promiseObject.user}}, //update object
            {new: true})
        .then(function(doc) {
            promiseObject.friend = {
                    friendID: doc.value._id,
                    name: doc.value.name,
                    avatarUrl: doc.value.avatarUrl,
                    chatID: chatID
                }
            return promiseObject;
        })
        .then(function(promiseObject) {
            users.findAndModify(
                {_id: promiseObject.user.friendID},
                [["_id",1]],
                {$addToSet: {friends: promiseObject.friend}}
            );
            chats.insertOne({
                    _id: chatID,
                    messages: [],
                    usersListening: [userID, friendID]
            })
            .catch((err) => {res.sendStatus(500)});

        })
        .catch(function(err) {
            console.log("Caught error:", err.message);
            res.status(500).send(err)});
    });

    return server.listen(port, function listening() {
        console.log("Listening on %d", server.address().port);
    });
};
