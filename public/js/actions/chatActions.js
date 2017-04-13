import axios from "axios";
import store from "../store";

export function changeActiveChatID(chatID) {
    return {
            type:"SET_CHAT_ID",
            payload:chatID
        };
};

export function scrollMessageWindowToBottom() {
    var chatWindow = document.getElementById("messageWindow");
    chatWindow.scrollTop = chatWindow.scrollHeight;
};

export function fetchAllChats() {
    console.log("FetchAllChats called");
    return function (dispatch) {
        axios.get("/api/user/allchats")
        .then((result) => {
            console.log("All messages result is,", result);
            let chat = {};
            let chatList = []
            for (let i = 0; i < result.data.length; i++) {
                chat[result.data[i].chat._id] = result.data[i].chat;
                chatList.push(result.data[i].chat._id);
            }
            dispatch({type:"RECEIVE_ALL_CHATS", payload: chat});
            dispatch({type:"SET_CHAT_LIST", payload:chatList});
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
