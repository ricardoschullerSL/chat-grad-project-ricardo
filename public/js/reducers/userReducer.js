export default function(state={
    user: {
        avatarUrl: "",
        _id: "",
        name: "",
    },
    uri: "",
    error: "",
    friends: [],
    activeChatID: "chat0",
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
        case "SET_FRIENDS": {
            return {
                ...state,
                friends: action.payload
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
