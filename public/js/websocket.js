var W3CWebSocket = require("websocket").w3cwebsocket;

var ws = new W3CWebSocket("ws://localhost:9090/", "echo-protocol");

ws.onopen = function() {
    console.log("WebSocket Client Connected");
};

ws.onmessage = function(e) {
    if (typeof e.data === "string") {
        console.log("Received: ", e.data);
    }
};
