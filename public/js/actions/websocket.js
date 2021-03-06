import store from "../store";
import {getFriends} from "./userActions.js";

const ws = new WebSocket("ws://" + location.host + "/websocket");
ws.onopen = function open() {
    console.log("User connected");
}

ws.onmessage = function incoming(e) {

    console.log(e);
    const data = JSON.parse(e.data);

    if (data.type === "message") {
        store.dispatch({
            type:"PUSH_MESSAGE",
            chatID: data.chatID,
            payload: {text:data.message, sentBy:data.sentBy}
        });
    }
    if (data.type === "onlineusersupdate") {
        store.dispatch({
            type:"SET_ONLINE_USERS",
            payload: data.users
        })
    }
    if (data.type === "addedasfriend") {
        getFriends(store.user.user._id);
    }
};

window.onbeforeunload = function(e) {
    ws.send(JSON.stringify({type:"logout", userID:store.user.user._id}))
}

setInterval(function () {
    ws.send("Just keeping the socket open");
}, 25000);

export default ws;
