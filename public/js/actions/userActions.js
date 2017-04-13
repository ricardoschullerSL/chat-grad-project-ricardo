import axios from "axios";
import {FetchAllChats} from "./chatActions.js";

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

export function setOnlineUsers(onlineUsers) {
    return {
        type: "SET_ONLINE_USERS",
        payload: onlineUsers
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

export function getOnlineUsers() {
    return function(dispatch) {
        axios.get("/api/onlineusers")
        .then((result) => {
            dispatch(setOnlineUsers(result.data));
        })
        .catch((error) => {
            dispatch(setError(error.message));
        })
    }
}

export function getRegisteredUsers() {
    return function(dispatch) {
        axios.get("/api/users")
        .then((result) => {
            dispatch(setRegisteredUsers(result.data));
        })
        .catch((error) => {
            dispatch(setError(error.message));
        })
    }
}
export function getUser(userID) {
    return axios.get("/api/users")
        .then((users) => {
            return users.find((user) => user._id === userID);
        })
        .catch((error) => {
            console.log(error);
        });
};
export function addFriend(friendID) {
    return function(dispatch) {
        axios.put("/api/friends/addFriend", { friendID })
        .then((result) => {
            console.log("Added friend: ", result);
            dispatch({type:"SET_FRIENDS", payload:result.data});
            fetchAllChats();

        })
        .catch((error) => {
            console.log(error);
            dispatch(setError(error.message));
        })
    };
};

export function getFriendInfo(friendID) {
    return function(dispatch) {
        axios.get("/api/friends/"+friendID+"/userinfo")
        .then((result) => {
            console.log("Got friend info of", result);
            dispatch({type:"UPDATE_FRIEND_INFO", payload:result.data});
        })
        .catch((error) => {
            dispatch(setError("Error updating friend info"));
        })
    }
}

export function userOath() {
    console.log("Authentication started...");
    return function(dispatch) {
        axios.get("/api/user")
        .then(function(userResult) {
            console.log("User Result is :", userResult.data);
            dispatch({type:"SET_LOGGED_IN", payload: true});
            dispatch(setUser(userResult.data));
            dispatch(setFriends(userResult.data.friends));

        })
        .catch((err) => {
            axios.get("/api/oauth/uri").then(function(result) {
                console.log("Got authentication token");
                dispatch({type:"SET_USER_URI", payload:result.data.uri});

            })
            .catch((err) => {console.log("Error during uri request");});
            console.log("End of authentication");
        })
    };
}
