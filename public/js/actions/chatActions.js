import fetch from "isomorphic-fetch";
import axios from "axios";

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const REQUEST_MESSAGES = "REQUEST_MESSAGES";

export function fetchMessages() {
    console.log("Fetching Messages...");
    return function(dispatch) {
        axios.get("/api/messages")
        .then((response) => {
            console.log(response);
            dispatch({type: "FETCH_MESSAGES_FULFILLED", payload: response.data})
        })
        .catch(function(err) {
            console.log("Error:" , err);
            dispatch({type: "FETCH_MESSAGES_REJECTED", payload: err})
        })
    }
}


export function receiveMessages(chatID, json) {
    return {
        type: RECEIVE_MESSAGES_FULFILLED,
        chatID,
        messages: json.data,
        receivedAt: Date.now()
    }
}
