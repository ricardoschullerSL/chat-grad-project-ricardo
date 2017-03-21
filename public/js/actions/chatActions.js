import fetch from "isomorphic-fetch";
import axios from "axios";
import store from "../store";

export function fetchMessages() {
    console.log("FetchMessages called");
    return function (dispatch) {
        axios.get("/api/messages")
        .then((result) => {
            dispatch({type:"RECEIVE_MESSAGES", payload: result.data});
        });
    };
};

export function sendMessage(message) {
    console.log("SendMessage called");
    return function(dispatch) {
        axios.post("/api/messages", { message })
        .then((result) => {
            dispatch({type:"RECEIVE_MESSAGES", payload: result.data});
        })
        .catch((err) => {console.log(err)})
    }
}
