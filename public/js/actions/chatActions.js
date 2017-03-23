import fetch from "isomorphic-fetch";
import axios from "axios";
import store from "../store";

export function fetchMessages(chatID) {
    console.log("FetchMessages called");
    return function (dispatch) {
        axios.get("/api/chats/" + chatID)
        .then((result) => {
            dispatch({type:"RECEIVE_MESSAGES", "chatID": chatID, payload: result.data});
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
