import fetch from "isomorphic-fetch";
import axios from "axios";

export function fetchUser() {
    return {
        type: "FETCH_USER_FULFILLED",
        payload: {
            name: "Ricardo",
            age: 26,
        }
    }
}

export function setUserName(name) {
    return {
        type: "SET_USER_NAME",
        payload: name,
    }
}

export function setUserAge(age) {
    return {
        type: "SET_USER_AGE",
        payload: age,
    }
}

export function setUsers(users) {
    return {
        type: "SET_USERS",
        payload: users
    }
}

export function userOath() {
    console.log("Authentication started...");
    return function(dispatch) {
    fetch.get("localhost:9090/api/oauth/uri").then(function(result) {
        console.log("Something happened...");
        dispatch({type:"SET_USER_URI", payload:result});
        })
    .catch((err) => {console.log("Error: ", err)});
    console.log("End of authentication");
    }
}