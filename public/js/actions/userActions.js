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

export function setUser(user) {
    return {
        type: "SET_USER",
        payload: user
    }
}

export function setError(error) {
    if (typeof error !== "string") {
        error.toString();
    }
    return {
        type: "SET_ERROR",
        payload: error
    }
}

export function setFriends(friends) {
    return {
        type: "SET_FRIENDS",
        payload: friends
    }
}

export function getFriends(userID) {
    return function(dispatch) {
        axios.get("/api/friends/" + userID)
        .then((result) => {
            dispatch(setFriends(result.data));
        })
        .catch((error) => {
            dispatch(setError(error.message));
        });

    };

}

export function addFriend(userID, { friendID, chatID }) {
    return function(dispatch) {
        axios.post("/api/friends/" + userID, { friendID, chatID })
        .then((result) => {
            console.log("Added friend: ", result);
            dispatch(setFriends(result.data));
        })
        .catch((error) => {
            dispatch(setError(error.message));
        })
    }
}

export function userOath() {
    console.log("Authentication started...");
    return function(dispatch) {
        console.log("Before the GET request");
        axios.get("/api/user")
        .then(function(userResult) {
            console.log("User Result is :", userResult.data);
            dispatch(setUser(userResult.data));
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
        return dispatch;
    };
}
