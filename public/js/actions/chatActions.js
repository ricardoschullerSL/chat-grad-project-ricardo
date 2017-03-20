import fetch from "isomorphic-fetch";
import axios from "axios";
import store from "../store";

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const REQUEST_MESSAGES = "REQUEST_MESSAGES";

export function fetchMessages() {
    console.log("FetchMessages called");
    return function (dispatch) {
        axios.get("/api/messages")
        .then((result) => {
            console.log(result.data);
        });
    };
};
