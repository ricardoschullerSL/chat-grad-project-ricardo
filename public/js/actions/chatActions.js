import fetch from "isomorphic-fetch";
import axios from "axios";
import store from "../store";

export function changeActiveChatID(chatID) {
    return {
            type:"SET_CHAT_ID",
            payload:chatID
        };
};

export function fetchAllChats() {
    console.log("FetchAllChats called");
    return function (dispatch) {
        axios.get("/api/user/allchats")
        .then((result) => {
            console.log("All messages result is,", result);
            let chat = {};
            for (let i = 0; i < result.data.length; i++) {
                chat[result.data[i].chat._id] = result.data[i].chat;
            }
            dispatch({type:"RECEIVE_ALL_CHATS", payload: chat});
        });
    };
};

export function sendMessage(message, chatID) {
    console.log("SendMessage called");
    return function(dispatch) {
        axios.post("/api/chats/" + chatID, { message })
        .then((result) => {
            // dispatch({type:"PUSH_MESSAGE", chatID: chatID, payload: message});
        })
        .catch((err) => {console.log(err)})
    }
}

const ws = new WebSocket("ws://" + location.host + "/websocket");
console.log(location);
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
};
