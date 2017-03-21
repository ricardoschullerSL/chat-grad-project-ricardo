import axios from "axios";

export function fetchUser() {
    return {
        type: "FETCH_USER_FULFILLED",
        payload: {
            name: "Ricardo",
            age: 26,
        }
    };
}

export function setUserName(name) {
    return {
        type: "SET_USER_NAME",
        payload: name,
    };
}

export function setUserAge(age) {
    return {
        type: "SET_USER_AGE",
        payload: age,
    };
}

export function setUsers(users) {
    return {
        type: "SET_USERS",
        payload: users
    };
}

export function userOath() {
    console.log("Authentication started...");
    return function(dispatch) {
        console.log("Before the GET request");
        axios.get("/api/user")
        .then(function(userResult) {
            console.log("User Result is :", userResult.data);
            dispatch({type:"SET_USER", payload: userResult.data});
        })
        .catch((err) => {
            console.log("Error": err);
            axios.get("/api/oauth/uri").then(function(result) {
                console.log("Got authentication token");
                dispatch({type:"SET_USER_URI", payload:result.data.uri});
            })
            .catch((err) => {console.log("Error during uri request");});
            console.log("End of authentication");
        })
    };
}
