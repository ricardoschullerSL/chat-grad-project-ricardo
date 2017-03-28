import fetch from "isomorphic-fetch";
import axios from "axios";
import store from "../store";

export function changeChatID(chatID) {
    return function (dispatch) {
        dispatch({
            type:"SET_CHAT_ID",
            payload:chatID
        });
    };
};

export function fetchMessages() {
    console.log("FetchMessages called");
    return function (dispatch) {
        axios.get("/api/user/allchats")
        .then((result) => {
            console.log("All messages result is,", result);
            let chat = {};
            for (let i = 0; i < result.data.length; i++) {
                chat[result.data[i].chat._id] = result.data[i].chat;
            }
            dispatch({type:"RECEIVE_ALL_MESSAGES", payload: chat});
        });
    };
};

export function sendMessage(message, chatID) {
    console.log("SendMessage called");
    return function(dispatch) {
        axios.post("/api/chats/" + chatID, { message })
        .then((result) => {
            dispatch({type:"RECEIVE_MESSAGES", "chatID": chatID, payload: result.data});
        })
        .catch((err) => {console.log(err)})
    }
}
