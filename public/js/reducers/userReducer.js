export default function(state={
    user: {
        avatarUrl: "",
        _id: "",
        name: "",
        friends: [],
    },
    uri: "",
    error: "",
}, action) {
    switch(action.type) {
        case "SET_USER_NAME": {
            return {
                ...state,
                user: {...state.user, name: action.payload},
            }
        }
        case "SET_USER_AGE": {
            return {
                ...state,
                user: {...state.user, age: action.payload},
            }
        }
        case "SET_USER": {
            return {
                ...state,
                user: action.payload,
            }
        }
        case "SET_USERS": {
            return {
                ...state,
                users: action.payload,
            }
        }
        case "SET_USER_URI": {
            return {
                ...state,
                uri: action.payload,
            }
        }
        case "PUSH_FRIEND": {
            let newFriendArray = state.user.friends.concat(action.payload);
            return {
                ...state,
                user: {
                    ...state.user,
                    friends: newFriendArray
                }
            }
        }
        case "SET_FRIENDS": {
            return {
                ...state,
                user: {...state.user , friends: action.payload }
            }
        }
        case "SET_ERROR": {
            return {
                ...state,
                error: action.payload
            }
        }
    }
    return state;
};
